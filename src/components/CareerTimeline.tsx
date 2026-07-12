const history = [
  { company: "Cloudflare", title: "Senior UI Engineer", date: "2023", color: "#f28021" },
  { company: "Project44", title: "Design Systems UX Engineer", date: "2023" },
  { company: "Dongguk University", title: "Korean Level 1", date: "2022", location: "Seoul, South Korea" },
  { company: "Leafly", title: "Senior Software Engineer", date: "2019" },
  { company: "IBM", title: "Software Engineer", date: "2015" },
  { company: "Blackbaud", title: "Software Engineer Intern", date: "2014" },
  { company: "uShip", title: "Software Engineer Intern", date: "2013" },
  { company: "University of Texas at Austin", title: "Bachelor of Science, Computer Science", date: "2010–2015" },
]

export default function CareerTimeline() {
  return (
    <div className="relative">
      <h2 className="sr-only">Career timeline</h2>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200/70 dark:bg-zinc-800 -translate-x-1/2"
      />

      <div className="flex flex-col">
        {history.map((entry, i) => {
          const isLeft = i % 2 === 0
          const delay = `${i * 80}ms`

          return (
            <div
              key={`${entry.company}-${entry.title}`}
              className="timeline-entry relative grid grid-cols-[1fr_1fr] items-start py-5"
              style={{ animationDelay: delay }}
            >
              <div
                className="absolute left-1/2 top-6 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600"
                style={entry.color ? { backgroundColor: entry.color } : undefined}
              />

              {isLeft ? (
                <>
                  <div className="pr-8 text-right">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {entry.company}
                    </h3>
                    <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {entry.title}
                    </span>
                    {"location" in entry && (
                      <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-1 italic">
                        {entry.location}
                      </span>
                    )}
                  </div>
                  <div className="pl-8 pt-px">
                    <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                      {entry.date}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="pr-8 text-right pt-px">
                    <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                      {entry.date}
                    </span>
                  </div>
                  <div className="pl-8">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {entry.company}
                    </h3>
                    <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {entry.title}
                    </span>
                    {"location" in entry && (
                      <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-1 italic">
                        {entry.location}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
