"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import type { Locale } from "@/components/language-provider"
import { cn } from "@/lib/utils"

const locales: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
]

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage()

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Globe className="size-4 text-muted-foreground" aria-hidden="true" />
      <div className="flex rounded-lg border bg-muted/50 p-0.5" role="radiogroup" aria-label="Language">
        {locales.map((l) => (
          <button
            key={l.value}
            role="radio"
            aria-checked={locale === l.value}
            onClick={() => setLocale(l.value)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              locale === l.value
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  )
}
