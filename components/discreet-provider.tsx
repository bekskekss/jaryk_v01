"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

interface DiscreetContextValue {
  isDiscreet: boolean
  toggleDiscreet: () => void
  setDiscreet: (value: boolean) => void
}

const DiscreetContext = createContext<DiscreetContextValue>({
  isDiscreet: false,
  toggleDiscreet: () => {},
  setDiscreet: () => {},
})

const STORAGE_KEY = "jaryk-discreet"

export function DiscreetProvider({ children }: { children: ReactNode }) {
  const [isDiscreet, setIsDiscreet] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === "true") {
        setIsDiscreet(true)
        document.documentElement.classList.add("discreet")
      }
    } catch {
      // localStorage unavailable
    }
    setMounted(true)
  }, [])

  const setDiscreet = useCallback((value: boolean) => {
    setIsDiscreet(value)
    try {
      localStorage.setItem(STORAGE_KEY, String(value))
    } catch {
      // localStorage unavailable
    }
    if (value) {
      document.documentElement.classList.add("discreet")
    } else {
      document.documentElement.classList.remove("discreet")
    }
  }, [])

  const toggleDiscreet = useCallback(() => {
    setDiscreet(!isDiscreet)
  }, [isDiscreet, setDiscreet])

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <DiscreetContext.Provider value={{ isDiscreet, toggleDiscreet, setDiscreet }}>
      {children}
    </DiscreetContext.Provider>
  )
}

export function useDiscreet() {
  const context = useContext(DiscreetContext)
  return context
}
