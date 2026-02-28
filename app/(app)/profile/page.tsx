"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Settings as SettingsIcon, ShieldAlert, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/hooks/use-auth"
import { useDiscreet } from "@/components/discreet-provider"

type SavedContact = {
  id: string
  name: string
  phone: string
}

const SOS_CONTACTS_KEY = "jaryk-sos-contacts"

export default function ProfilePage() {
  const { t } = useLanguage()
  const { isDiscreet } = useDiscreet()
  const { state, isGuest, updateProfile, signOut } = useAuth()
  const router = useRouter()

  const [savedContacts, setSavedContacts] = useState<SavedContact[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [nameDraft, setNameDraft] = useState("")
  const [emailDraft, setEmailDraft] = useState("")
  const [phoneDraft, setPhoneDraft] = useState("")

  useEffect(() => {
    if (!state.profile) {
      setNameDraft("")
      setEmailDraft("")
      setPhoneDraft("")
      return
    }

    setNameDraft(state.profile.name)
    setEmailDraft(state.profile.email)
    setPhoneDraft(state.profile.phone)
  }, [state.profile])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SOS_CONTACTS_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as SavedContact[]
      if (Array.isArray(parsed)) {
        setSavedContacts(parsed.filter((item) => item?.name && item?.phone))
      }
    } catch {
      // localStorage unavailable or corrupted
    }
  }, [])

  const displayName = useMemo(() => {
    if (isGuest) return t.profile.guestUser
    return state.profile?.name || t.profile.notSet
  }, [isGuest, state.profile?.name, t.profile.guestUser, t.profile.notSet])

  const displayEmail = useMemo(() => {
    if (isGuest) return t.profile.guestEmail
    return state.profile?.email || t.profile.notSet
  }, [isGuest, state.profile?.email, t.profile.guestEmail, t.profile.notSet])

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false)
    setNameDraft(state.profile?.name ?? "")
    setEmailDraft(state.profile?.email ?? "")
    setPhoneDraft(state.profile?.phone ?? "")
  }, [state.profile])

  const handleSaveProfile = useCallback(() => {
    if (isGuest) return

    updateProfile({
      name: nameDraft,
      email: emailDraft,
      phone: phoneDraft,
    })
    setIsEditing(false)
  }, [emailDraft, isGuest, nameDraft, phoneDraft, updateProfile])

  const handleSignOut = useCallback(() => {
    signOut()
    router.replace("/")
  }, [router, signOut])

  return (
    <div className="flex flex-col gap-4 px-4 pt-6 pb-24 lg:pb-6 lg:px-8 lg:pt-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.nav.profile}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.profile.subtitle}
        </p>
      </header>

      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-jaryk-violet-light">
            <User className="size-7 text-jaryk-violet" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-foreground">{displayName}</p>
            <p className="truncate text-sm text-muted-foreground">{displayEmail}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {isGuest ? t.profile.guestUser : t.profile.member}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{t.profile.personalInfo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {isGuest ? (
            <div className="rounded-xl border bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">{t.auth.guestNote}</p>
              <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/auth">{t.auth.signIn}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href="/auth">{t.auth.signUp}</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">{t.profile.name}</p>
                {isEditing ? (
                  <Input
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    placeholder={t.profile.name}
                  />
                ) : (
                  <p className="text-sm text-foreground">{state.profile?.name || t.profile.notSet}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">{t.profile.email}</p>
                {isEditing ? (
                  <Input
                    value={emailDraft}
                    onChange={(e) => setEmailDraft(e.target.value)}
                    placeholder={t.profile.email}
                    type="email"
                  />
                ) : (
                  <p className="text-sm text-foreground">{state.profile?.email || t.profile.notSet}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">{t.profile.phone}</p>
                {isEditing ? (
                  <Input
                    value={phoneDraft}
                    onChange={(e) => setPhoneDraft(e.target.value)}
                    placeholder={t.profile.phone}
                  />
                ) : (
                  <p className="text-sm text-foreground">{state.profile?.phone || t.profile.notSet}</p>
                )}
              </div>

              {isEditing ? (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={handleSaveProfile}
                    disabled={!nameDraft.trim() || !emailDraft.trim()}
                  >
                    {t.common.save}
                  </Button>
                  <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={handleCancelEdit}>
                    {t.common.cancel}
                  </Button>
                </div>
              ) : (
                <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setIsEditing(true)}>
                  {t.profile.edit}
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            {isDiscreet ? t.profile.emergencyContactDiscreet : t.profile.emergencyContact}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {savedContacts.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t.sos.noSavedContacts}</p>
          ) : (
            <div className="space-y-2">
              {savedContacts.slice(0, 3).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
                  <p className="truncate text-sm text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.phone}</p>
                </div>
              ))}
            </div>
          )}
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/sos">
              <ShieldAlert className="size-4" aria-hidden="true" />
              {t.profile.addContact}
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full lg:w-[250px] lg:self-start lg:rounded-2xl lg:border-border/70 lg:shadow-md">
        <CardContent className="flex flex-col gap-2 p-3.5">
          <Button asChild className="w-full">
            <Link href="/settings">
              <SettingsIcon className="size-4" aria-hidden="true" />
              {t.nav.settings}
            </Link>
          </Button>
          {!isGuest && (
            <Button type="button" variant="outline" className="w-full" onClick={handleSignOut}>
              <LogOut className="size-4" aria-hidden="true" />
              {t.auth.signOut}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
