import { XLogoIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

const socials = [
  { label: "X (Twitter)", href: "https://twitter.com/danielson7_", icon: XLogoIcon },
  { label: "GitHub", href: "https://github.com/danielrobertson", icon: GithubLogoIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/danielrobertson4/", icon: LinkedinLogoIcon },
]

export default function Socials() {
  return (
    <ul className="flex gap-5 mt-6">
      {socials.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link flex items-center justify-center p-2 -m-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 active:scale-[0.96]"
          >
            <Icon size={24} weight="light" />
          </a>
        </li>
      ))}
    </ul>
  )
}
