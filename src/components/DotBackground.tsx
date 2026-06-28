"use client"

import { cn } from "@/lib/utils"
import { DotPattern } from "@/components/ui/dot-pattern"

export default function DotBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
        style={{ maskPosition: "center 60%" }}
      />
    </div>
  )
}
