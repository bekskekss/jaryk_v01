"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ShieldAlert, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDiscreet } from "@/components/discreet-provider"
import { useLanguage } from "@/hooks/use-language"
import { getLabel } from "@/lib/discreet-labels"

type SosState = "confirm" | "sending" | "sent"

export default function SosPage() {
  const [state, setState] = useState<SosState>("confirm")
  const { isDiscreet } = useDiscreet()
  const { t } = useLanguage()

  const handleSend = useCallback(() => {
    setState("sending")
    // Simulate sending alert (in production: real API call + geolocation)
    setTimeout(() => {
      setState("sent")
    }, 2000)
  }, [])

  const handleCancel = useCallback(() => {
    // Only available before sending
    if (typeof window !== "undefined") {
      window.history.back()
    }
  }, [])

  // Confirmation Screen
  if (state === "confirm") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-8 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="self-start -ml-2"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.common.back}
          </Button>

          <div className="flex size-28 items-center justify-center rounded-full bg-jaryk-sos/10">
            <div className="flex size-20 items-center justify-center rounded-full bg-jaryk-sos/20">
              <ShieldAlert className="size-10 text-jaryk-sos" aria-hidden="true" />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t.nav.sos}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {t.sos.confirmDesc}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            <Button
              onClick={handleSend}
              size="lg"
              className="w-full rounded-xl h-14 text-base font-semibold bg-jaryk-sos text-jaryk-sos-foreground hover:bg-jaryk-sos/90"
              aria-label={t.sos.confirm}
            >
              {t.sos.confirm}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleCancel}
              className="w-full rounded-xl h-12 text-base"
            >
              {t.common.cancel}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            {t.sos.info}
          </p>
        </div>
      </div>
    )
  }

  // Sending Screen
  if (state === "sending") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 text-center">
          <div className="flex size-28 items-center justify-center rounded-full bg-jaryk-sos/10 animate-pulse">
            <Loader2 className="size-10 text-jaryk-sos animate-spin" aria-hidden="true" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-foreground">
              {t.sos.sending}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.sos.sendingDesc}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Sent Screen
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-8 text-center">
        <div className="flex size-28 items-center justify-center rounded-full bg-jaryk-teal/10">
          <CheckCircle2 className="size-14 text-jaryk-teal" aria-hidden="true" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t.sos.sent}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t.sos.sentDesc}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Button
            asChild
            size="lg"
            className="w-full rounded-xl h-12 text-base"
          >
            <Link href="/home">{t.sos.backHome}</Link>
          </Button>
          <a
            href="tel:112"
            className="inline-flex h-12 items-center justify-center rounded-xl border bg-card px-6 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            {t.sos.callEmergency}
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          {t.sos.emergencyWarning}
        </p>
      </div>
    </div>
  )
}
