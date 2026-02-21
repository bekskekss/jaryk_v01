"use client"

import { MessageCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function ChatPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-jaryk-violet-light">
          <MessageCircle className="size-8 text-jaryk-violet" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-bold text-foreground">
          {t.nav.chat}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.empty.comingSoon}
        </p>
        <div className="mt-4 w-full rounded-xl border bg-muted/50 p-4">
          <p className="text-xs text-muted-foreground">
            {t.empty.chatUnavailable}
          </p>
        </div>
      </div>
    </div>
  )
}
