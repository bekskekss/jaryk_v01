"use client"

import Link from "next/link"
import {
  ShieldAlert,
  BookOpen,
  MapPin,
  MessageCircle,
  Phone,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDiscreet } from "@/components/discreet-provider"
import { getLabel } from "@/lib/discreet-labels"
import { useLanguage } from "@/hooks/use-language"
import { supportContacts } from "@/data/support-contacts"

export default function HomePage() {
  const { isDiscreet } = useDiscreet()
  const { t, locale } = useLanguage()
  
  const quickActions = [
    {
      href: "/hub",
      icon: BookOpen,
      label: t.nav.hub,
      description: t.home.hubDesc,
      colorClass: "bg-jaryk-violet-light text-jaryk-violet",
    },
    {
      href: "/centers",
      icon: MapPin,
      label: t.nav.centers,
      description: t.home.centersDesc,
      colorClass: "bg-jaryk-teal-light text-jaryk-teal",
    },
    {
      href: "/chat",
      icon: MessageCircle,
      label: t.nav.chat,
      description: t.home.chatDesc,
      colorClass: "bg-jaryk-violet-light text-jaryk-violet",
    },
  ]
  
  const emergencyContacts = supportContacts.filter(
    (c) => c.category === "emergency" || c.category === "hotline"
  ).slice(0, 3)

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-6 lg:px-8 lg:pt-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl text-balance">
          {t.home.greeting}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.home.subtitle}
        </p>
      </header>

      {/* SOS Card */}
      <Link href="/sos" className="group block">
        <Card className="border-jaryk-sos/20 bg-jaryk-sos/5 py-0 transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-jaryk-sos shadow-sm">
              <ShieldAlert
                className="size-7 text-jaryk-sos-foreground"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">
                {t.nav.sos}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {t.home.sosDesc}
              </p>
            </div>
            <ChevronRight
              className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </CardContent>
        </Card>
      </Link>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t.home.quickActions}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href} className="group block">
                <Card className="py-0 transition-shadow hover:shadow-md h-full">
                  <CardContent className="flex items-center gap-3 p-4 sm:flex-col sm:items-start sm:gap-3 sm:p-5">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${action.colorClass}`}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {getLabel(action.label, isDiscreet)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Emergency Contacts */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t.home.emergencyContacts}
          </h2>
          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link href="/centers">{t.common.viewAll}</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {emergencyContacts.map((contact) => (
            <Card key={contact.id} className="py-0">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-jaryk-teal-light">
                  <Phone className="size-4 text-jaryk-teal" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {isDiscreet
                      ? contact.nameDiscreet
                      : locale === "ru"
                        ? contact.nameRu ?? contact.name
                        : contact.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {locale === "ru" ? contact.availableRu ?? contact.available : contact.available}
                  </p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="shrink-0 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                  aria-label={`${t.home.call} ${isDiscreet
                    ? contact.nameDiscreet
                    : locale === "ru"
                      ? contact.nameRu ?? contact.name
                      : contact.name}`}
                >
                  {t.home.call}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
