"use client"

import Link from "next/link"
import { Shield, Heart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function WelcomePage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-12">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-10 text-center">
        {/* Language switcher */}
        <LanguageSwitcher className="self-end" />

        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary shadow-sm">
            <Shield className="size-8 text-primary-foreground" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
              {t.welcome.heading}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {t.welcome.tagline}
            </p>
          </div>
        </div>

        {/* Value propositions */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-start gap-3 rounded-xl bg-card p-4 text-left shadow-sm border">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-jaryk-violet-light">
              <Shield className="size-5 text-jaryk-violet" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{t.welcome.feature1Title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                {t.welcome.feature1Desc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-card p-4 text-left shadow-sm border">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-jaryk-teal-light">
              <BookOpen className="size-5 text-jaryk-teal" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{t.welcome.feature2Title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                {t.welcome.feature2Desc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-card p-4 text-left shadow-sm border">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-jaryk-violet-light">
              <Heart className="size-5 text-jaryk-violet" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{t.welcome.feature3Title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                {t.welcome.feature3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col gap-3">
          <Button asChild size="lg" className="w-full rounded-xl h-12 text-base">
            <Link href="/auth">{t.welcome.getStarted}</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full rounded-xl h-12 text-base">
            <Link href="/about">{t.welcome.learnMore}</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {t.welcome.privacyNote}
        </p>
      </div>
    </div>
  )
}
