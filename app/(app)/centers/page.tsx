"use client"

import { MapPin } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function CentersPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-jaryk-teal-light">
          <MapPin className="size-8 text-jaryk-teal" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-foreground">
          {t.nav.centers}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.empty.comingSoon}
        </p>
      </div>
    </div>
  )
}
