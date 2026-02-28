"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { ShieldAlert, CheckCircle2, ArrowLeft, Loader2, Phone, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDiscreet } from "@/components/discreet-provider"
import { useLanguage } from "@/hooks/use-language"
import { Input } from "@/components/ui/input"

type SosState = "confirm" | "sending" | "sent"
type SavedContact = { id: string; name: string; phone: string }

const SOS_CONTACTS_KEY = "jaryk-sos-contacts"
const MAX_SOS_CONTACTS = 5

export default function SosPage() {
  const [state, setState] = useState<SosState>("confirm")
  const [contacts, setContacts] = useState<SavedContact[]>([])
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const { isDiscreet } = useDiscreet()
  const { t } = useLanguage()
  const hasReachedContactLimit = contacts.length >= MAX_SOS_CONTACTS

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SOS_CONTACTS_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as SavedContact[]
      if (Array.isArray(parsed)) {
        setContacts(parsed.filter((item) => item?.name && item?.phone))
      }
    } catch {
      // localStorage unavailable or corrupted
    }
  }, [])

  const persistContacts = useCallback((nextContacts: SavedContact[]) => {
    setContacts(nextContacts)
    try {
      localStorage.setItem(SOS_CONTACTS_KEY, JSON.stringify(nextContacts))
    } catch {
      // localStorage unavailable
    }
  }, [])

  const handleAddContact = useCallback(() => {
    const name = contactName.trim()
    const phone = contactPhone.trim()

    if (!name || !phone || contacts.length >= MAX_SOS_CONTACTS) {
      return
    }

    persistContacts([
      ...contacts,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        phone,
      },
    ])

    setContactName("")
    setContactPhone("")
  }, [contactName, contactPhone, contacts, persistContacts])

  const handleRemoveContact = useCallback((id: string) => {
    persistContacts(contacts.filter((contact) => contact.id !== id))
  }, [contacts, persistContacts])

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
      <div className="flex flex-1 flex-col px-4 pt-4 pb-8 sm:px-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="-ml-2 mb-4 w-fit"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t.common.back}
        </Button>

        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-8 text-center">
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
              {isDiscreet ? t.sos.confirmDescDiscreet : t.sos.confirmDesc}
            </p>
          </div>

          <div className="w-full rounded-xl border bg-card p-4 text-left">
            <p className="mb-3 text-sm font-medium text-foreground">{t.sos.savedContacts}</p>

            {contacts.length === 0 ? (
              <p className="mb-3 text-xs text-muted-foreground">{t.sos.noSavedContacts}</p>
            ) : (
              <ul className="mb-3 flex flex-col gap-2">
                {contacts.map((contact) => (
                  <li key={contact.id} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{contact.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{contact.phone}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveContact(contact.id)}
                      aria-label={t.sos.removeContact}
                    >
                      <Trash2 className="size-4 text-muted-foreground" aria-hidden="true" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            <div className="grid grid-cols-1 gap-2">
              <Input
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={t.profile.contactName}
                aria-label={t.profile.contactName}
              />
              <Input
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder={t.profile.contactPhone}
                aria-label={t.profile.contactPhone}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddContact}
                disabled={!contactName.trim() || !contactPhone.trim() || hasReachedContactLimit}
                className="w-full"
              >
                <Plus className="size-4" aria-hidden="true" />
                {t.profile.addContact}
              </Button>

              {hasReachedContactLimit && (
                <p className="text-xs text-muted-foreground">
                  {t.sos.maxContactsReached.replace("{max}", String(MAX_SOS_CONTACTS))}
                </p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <Button
              onClick={handleSend}
              size="lg"
              className="w-full rounded-xl h-14 text-base font-semibold bg-jaryk-sos text-jaryk-sos-foreground hover:bg-jaryk-sos/90"
              aria-label={t.sos.confirm}
              disabled={contacts.length === 0}
            >
              {isDiscreet ? t.sos.confirmDiscreet : t.sos.confirm}
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
            {hasReachedContactLimit
              ? t.sos.maxContactsReached.replace("{max}", String(MAX_SOS_CONTACTS))
              : contacts.length === 0
              ? t.sos.addAtLeastOneContact
              : (isDiscreet ? t.sos.infoDiscreet : t.sos.info)}
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
              {isDiscreet ? t.sos.sendingDiscreet : t.sos.sending}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isDiscreet ? t.sos.sendingDescDiscreet : t.sos.sendingDesc}
            </p>
          </div>

          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="size-3.5" aria-hidden="true" />
            {t.sos.contactsNotified.replace("{count}", String(contacts.length))}
          </p>
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
            {isDiscreet ? t.sos.sentDiscreet : t.sos.sent}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {isDiscreet ? t.sos.sentDescDiscreet : t.sos.sentDesc}
          </p>
        </div>

        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Phone className="size-3.5" aria-hidden="true" />
          {t.sos.contactsNotified.replace("{count}", String(contacts.length))}
        </p>

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
