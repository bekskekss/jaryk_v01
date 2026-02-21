"use client"

import { User, Settings as SettingsIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export default function ProfilePage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-24 lg:pb-6 lg:px-8 lg:pt-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.nav.profile}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.profile.subtitle}
        </p>
      </header>

      <div className="mx-auto w-full max-w-sm flex flex-col items-center gap-6 text-center pt-12">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-jaryk-violet-light">
          <User className="size-8 text-jaryk-violet" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">
            {t.profile.comingSoon}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            {t.empty.comingSoon}
          </p>
        </div>

        <Link href="/settings" className="w-full">
          <Button className="w-full gap-2">
            <SettingsIcon className="size-4" aria-hidden="true" />
            {t.nav.settings}
          </Button>
        </Link>
      </div>
    </div>
  )
}
