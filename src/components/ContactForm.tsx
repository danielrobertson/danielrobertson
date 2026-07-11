import { XLogoIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

const socials = [
  { label: "X (Twitter)", href: "https://twitter.com/danielson7_", icon: XLogoIcon },
  { label: "GitHub", href: "https://github.com/danielrobertson", icon: GithubLogoIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/danielrobertson4/", icon: LinkedinLogoIcon },
]

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
              placeholder="Enter your message here"
              className="block w-full rounded-md bg-white dark:bg-zinc-900 px-4 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 focus:ring-2 focus:ring-zinc-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-full bg-zinc-900 dark:bg-zinc-100 px-4 py-2 flex items-center justify-center text-sm font-medium text-white dark:text-zinc-900 transition hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98]"
          >
            Submit
          </button>
        </div>
      </form>

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
