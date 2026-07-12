import { useEffect, useRef, useState } from "react"
import { XLogoIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

const socials = [
  { label: "X (Twitter)", href: "https://twitter.com/danielson7_", icon: XLogoIcon },
  { label: "GitHub", href: "https://github.com/danielrobertson", icon: GithubLogoIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/danielrobertson4/", icon: LinkedinLogoIcon },
]

// Falls back to Cloudflare's "always passes" test key so the flow works in local dev
const TURNSTILE_SITE_KEY =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      getResponse: (widgetId: string) => string | undefined
    }
  }
}

type Status = "idle" | "submitting" | "success" | "error"

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && widgetIdRef.current === null) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
          appearance: "interaction-only",
        })
      }
    }

    if (window.turnstile) {
      renderWidget()
      return
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`
    )
    if (!script) {
      script = document.createElement("script")
      script.src = TURNSTILE_SCRIPT_SRC
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
    script.addEventListener("load", renderWidget)
    return () => script?.removeEventListener("load", renderWidget)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "submitting") return

    const form = e.currentTarget
    const formData = new FormData(form)
    const token = widgetIdRef.current
      ? window.turnstile?.getResponse(widgetIdRef.current)
      : undefined

    setStatus("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
          token,
        }),
      })

      if (response.ok) {
        setStatus("success")
        form.reset()
      } else {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        setErrorMessage(body?.error ?? "Something went wrong. Please try again.")
        setStatus("error")
      }
    } catch {
      setErrorMessage("Network error. Please try again.")
      setStatus("error")
    }

    if (widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current)
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg bg-white dark:bg-zinc-950 px-4 md:px-10 py-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Get in touch
        </h1>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          Reach out and I'll get back to you as soon as I can.
        </p>
      </div>

      {status === "success" ? (
        <div className="py-10">
          <p className="rounded-md bg-zinc-100 dark:bg-zinc-900 px-4 py-6 text-center text-sm text-zinc-700 dark:text-zinc-300">
            Thanks for reaching out — your message has been sent.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="py-10 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-400"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={200}
                placeholder="Jane Doe"
                className="block w-full rounded-md bg-white dark:bg-zinc-900 px-4 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 focus:ring-2 focus:ring-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-400"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={320}
                placeholder="hello@example.com"
                className="block w-full rounded-md bg-white dark:bg-zinc-900 px-4 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 focus:ring-2 focus:ring-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-400"
            >
              Message
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                maxLength={5000}
                placeholder="Enter your message here"
                className="block w-full rounded-md bg-white dark:bg-zinc-900 px-4 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 focus:ring-2 focus:ring-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Honeypot — hidden from real users, bots tend to fill it */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div ref={turnstileRef} />

          {status === "error" && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full bg-zinc-900 dark:bg-zinc-100 px-4 py-2 flex items-center justify-center text-sm font-medium text-white dark:text-zinc-900 transition hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
            >
              {status === "submitting" ? "Sending…" : "Submit"}
            </button>
          </div>
        </form>
      )}

      <div className="flex items-center justify-center gap-5">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex items-center justify-center p-2 -m-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 active:scale-[0.96]"
          >
            <Icon size={20} weight="light" />
          </a>
        ))}
      </div>
    </div>
  )
}
