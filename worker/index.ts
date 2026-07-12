const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 5000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  token?: unknown;
  website?: unknown; // honeypot — real users never fill this
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

async function verifyTurnstile(env: Env, token: string, ip: string): Promise<boolean> {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  });
  const outcome = (await response.json()) as { success: boolean; "error-codes"?: string[] };
  if (!outcome.success) {
    console.warn("Turnstile verification failed:", outcome["error-codes"]);
  }
  return outcome.success;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

  const { success: withinLimit } = await env.CONTACT_RATE_LIMITER.limit({ key: ip });
  if (!withinLimit) {
    return json(429, { error: "Too many requests. Please try again in a minute." });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json<ContactPayload>();
  } catch {
    return json(400, { error: "Invalid request body." });
  }

  if (typeof payload.website === "string" && payload.website.length > 0) {
    return json(200, { ok: true });
  }

  const name = typeof payload.name === "string" ? singleLine(payload.name) : "";
  const email = typeof payload.email === "string" ? singleLine(payload.email) : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const token = typeof payload.token === "string" ? payload.token : "";

  if (!name || name.length > MAX_NAME_LENGTH) {
    return json(400, { error: "Please provide your name." });
  }
  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return json(400, { error: "Please provide a valid email address." });
  }
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return json(400, { error: `Please provide a message under ${MAX_MESSAGE_LENGTH} characters.` });
  }
  if (!token) {
    return json(400, { error: "Please complete the verification challenge." });
  }

  if (!(await verifyTurnstile(env, token, ip))) {
    return json(403, { error: "Verification failed. Please try again." });
  }

  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `<p><strong>Name:</strong> ${escapeHtml(name)}<br/><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`;

  try {
    await env.EMAIL.send({
      to: env.CONTACT_TO_ADDRESS,
      from: { email: env.CONTACT_FROM_ADDRESS, name: "danielrobertson.me contact form" },
      replyTo: email,
      subject: `Contact form: ${name}`,
      text,
      html,
    });
  } catch (error) {
    const code = error instanceof Error && "code" in error ? (error as { code: string }).code : "unknown";
    console.error(`Email send failed (${code}):`, error);
    return json(502, { error: "Something went wrong sending your message. Please try again later." });
  }

  return json(200, { ok: true });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return json(405, { error: "Method not allowed." });
      }
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
