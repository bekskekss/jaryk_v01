"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type AccountMode = "guest" | "user"

export interface AccountProfile {
  name: string
  email: string
  phone: string
}

interface AuthState {
  mode: AccountMode
  profile: AccountProfile | null
}

interface AuthContextValue {
  state: AuthState
  isGuest: boolean
  signIn: (profile: AccountProfile) => void
  continueAsGuest: () => void
  updateProfile: (next: Partial<AccountProfile>) => void
  signOut: () => void
}

const STORAGE_KEY = "jaryk-auth-state"

const guestState: AuthState = {
  mode: "guest",
  profile: null,
}

const defaultContextValue: AuthContextValue = {
  state: guestState,
  isGuest: true,
  signIn: () => {},
  continueAsGuest: () => {},
  updateProfile: () => {},
  signOut: () => {},
}

const AuthContext = createContext<AuthContextValue>(defaultContextValue)

function sanitizeProfile(profile: AccountProfile): AccountProfile {
  return {
    name: profile.name.trim(),
    email: profile.email.trim().toLowerCase(),
    phone: profile.phone.trim(),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(guestState)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return

      const parsed = JSON.parse(raw) as AuthState
      if (parsed.mode === "user" && parsed.profile) {
        setState({
          mode: "user",
          profile: sanitizeProfile(parsed.profile),
        })
      }
    } catch {
      // localStorage unavailable or corrupted
    }
  }, [])

  const persistState = useCallback((nextState: AuthState) => {
    setState(nextState)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
    } catch {
      // localStorage unavailable
    }
  }, [])

  const signIn = useCallback((profile: AccountProfile) => {
    persistState({
      mode: "user",
      profile: sanitizeProfile(profile),
    })
  }, [persistState])

  const continueAsGuest = useCallback(() => {
    persistState(guestState)
  }, [persistState])

  const updateProfile = useCallback((next: Partial<AccountProfile>) => {
    setState((prev) => {
      if (prev.mode !== "user" || !prev.profile) return prev

      const merged = sanitizeProfile({
        ...prev.profile,
        ...next,
      })

      const nextState: AuthState = {
        mode: "user",
        profile: merged,
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
      } catch {
        // localStorage unavailable
      }

      return nextState
    })
  }, [])

  const signOut = useCallback(() => {
    continueAsGuest()
  }, [continueAsGuest])

  const value = useMemo<AuthContextValue>(() => ({
    state,
    isGuest: state.mode === "guest",
    signIn,
    continueAsGuest,
    updateProfile,
    signOut,
  }), [state, signIn, continueAsGuest, updateProfile, signOut])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
