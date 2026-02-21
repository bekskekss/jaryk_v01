"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ShieldAlert,
  MapPin,
  MessageCircle,
  BookOpen,
  User,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDiscreet } from "@/components/discreet-provider"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"

type NavKey = "home" | "hub" | "sos" | "chat" | "centers" | "profile" | "settings"

const sidebarItems: { href: string; icon: typeof Home; key: NavKey }[] = [
  { href: "/home", icon: Home, key: "home" },
  { href: "/hub", icon: BookOpen, key: "hub" },
  { href: "/sos", icon: ShieldAlert, key: "sos" },
  { href: "/chat", icon: MessageCircle, key: "chat" },
  { href: "/centers", icon: MapPin, key: "centers" },
  { href: "/profile", icon: User, key: "profile" },
  { href: "/settings", icon: Settings, key: "settings" },
]

export function DesktopSidebar() {
  const pathname = usePathname()
  const { isDiscreet } = useDiscreet()
  const { t } = useLanguage()

  function getNavLabel(key: NavKey): string {
    return isDiscreet ? t.navDiscreet[key] : t.nav[key]
  }

  const appName = isDiscreet ? t.appNameDiscreet : t.appName

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-card">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">
            {appName[0]}
          </span>
        </div>
        <span className="text-lg font-semibold tracking-tight text-foreground">
          {appName}
        </span>
      </div>

      <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-1 p-4">
        {sidebarItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/")
          const Icon = item.icon
          const label = getNavLabel(item.key)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-5" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-col gap-3 border-t p-4">
        <LanguageSwitcher />
        <p className="text-xs text-muted-foreground">
          {isDiscreet ? "v1.0" : "JARYK v1.0"}
        </p>
      </div>
    </aside>
  )
}
