"use client"

import Link from "next/link"
import {
  Shield,
  Phone,
  BookOpen,
  MapPin,
  MessageCircle,
  Lock,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function AboutPage() {
  const { t } = useLanguage()

  const features = [
    { icon: Shield, ...t.about.features.sos },
    { icon: Phone, ...t.about.features.contacts },
    { icon: BookOpen, ...t.about.features.education },
    { icon: MapPin, ...t.about.features.map },
    { icon: MessageCircle, ...t.about.features.chat },
    { icon: Lock, ...t.about.features.discreet },
  ]

  return (
    <div className="relative min-h-dvh bg-background">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.common.back}
          </Link>
        </Button>
        <LanguageSwitcher />
      </div>

      <div className="mx-auto max-w-2xl px-6 py-12 pt-20 sm:pt-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            {t.about.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {t.about.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-foreground">
                    {feature.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <Button asChild size="lg" className="w-full rounded-xl h-12 text-base">
            <Link href="/auth">{t.about.getStarted}</Link>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            {t.about.noAccountRequired}
          </p>
        </div>
      </div>
    </div>
  )
}
