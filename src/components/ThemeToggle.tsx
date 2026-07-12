import { SunIcon, MoonIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#18181b" : "#fafafa")
    setDark(isDark)
  }

  return (
    <button
      onClick={toggle}
      className="theme-toggle p-2.5 rounded-lg hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 active:scale-[0.96]"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="relative w-5 h-5">
        <SunIcon
          size={20}
          className={`absolute inset-0 text-zinc-700 transition-[opacity,scale,filter] duration-300 ${dark ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
        />
        <MoonIcon
          size={20}
          className={`absolute inset-0 text-zinc-100 transition-[opacity,scale,filter] duration-300 ${dark ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
        />
      </div>
    </button>
  )
}
