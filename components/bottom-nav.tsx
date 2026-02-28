"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ShieldAlert,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDiscreet } from "@/components/discreet-provider"
import { useLanguage } from "@/hooks/use-language"

type NavKey = "home" | "hub" | "sos" | "chat" | "centers" | "profile"

const navItems: { href: string; icon: typeof Home; key: NavKey }[] = [
  { href: "/home", icon: Home, key: "home" },
  { href: "/centers", icon: MapPin, key: "centers" },
  { href: "/sos", icon: ShieldAlert, key: "sos" },
  { href: "/chat", icon: MessageCircle, key: "chat" },
  { href: "/profile", icon: User, key: "profile" },
]

export function BottomNav() {
  const pathname = usePathname()
  const { isDiscreet } = useDiscreet()
  const { t } = useLanguage()

  function getNavLabel(key: NavKey): string {
    return isDiscreet ? t.navDiscreet[key] : t.nav[key]
  }

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur-sm lg:hidden"
    >
      <ul className="grid grid-cols-5 items-stretch px-1 py-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/")
          const isSos = item.key === "sos"
          const Icon = item.icon
          const label = getNavLabel(item.key)

          return (
            <li key={item.href} className="min-w-0">
              <Link
                href={item.href}
                className={cn(
                  "flex w-full flex-col items-center gap-0.5 rounded-lg px-1 py-2 text-center text-[10px] font-medium leading-tight transition-colors",
                  isSos
                    ? "text-jaryk-sos"
                    : isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "size-5",
                    isSos
                      ? "text-jaryk-sos"
                      : isActive
                        ? "text-primary"
                        : ""
                  )}
                  aria-hidden="true"
                />
                <span className="max-w-full truncate">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
