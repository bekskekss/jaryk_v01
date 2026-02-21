"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { en, type Messages } from "@/messages/en"
import { ru } from "@/messages/ru"

export type Locale = 'en' | 'ru'

const messages: Record<Locale, Messages> = { en, ru }

interface LanguageContextValue {
  locale: Locale
  t: Messages
  setLocale: (locale: Locale) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  t: en,
  setLocale: () => {},
})

const STORAGE_KEY = "jaryk-locale"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
      if (stored && (stored === "en" || stored === "ru")) {
        setLocaleState(stored)
      }
    } catch {
      // localStorage unavailable
    }
    setMounted(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
    } catch {
      // localStorage unavailable
    }
    document.documentElement.lang = newLocale
  }, [])

  // Prevent flash of wrong language
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ locale, t: messages[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
