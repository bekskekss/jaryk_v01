"use client"

import { X } from "lucide-react"
import { quickExit } from "@/lib/quick-exit"
import { useLanguage } from "@/components/language-provider"

export function QuickExitButton() {
  const { t } = useLanguage()

  return (
    <button
      onClick={quickExit}
      aria-label="Quick Exit - Leave this site immediately"
      title="Quick Exit"
      className="fixed top-3 right-3 z-50 flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:bg-foreground hover:text-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:top-4 lg:right-4"
    >
      <X className="size-3.5" aria-hidden="true" />
      <span className="sr-only lg:not-sr-only">{t.quickExit}</span>
    </button>
  )
}
