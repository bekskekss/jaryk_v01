"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useAuth } from "@/hooks/use-auth"

export default function AuthPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { signIn, continueAsGuest } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const completeAuth = useCallback((profile: { name: string; email: string; phone: string }) => {
    setIsLoading(true)
    setTimeout(() => {
      signIn(profile)
      setIsLoading(false)
      router.push("/home")
    }, 800)
  }, [router, signIn])

  const handleSignInSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = String(formData.get("signin-email") ?? "").trim()

    if (!email) return

    const fallbackName = email.split("@")[0] || t.profile.member
    completeAuth({
      name: fallbackName,
      email,
      phone: "",
    })
  }, [completeAuth, t.profile.member])

  const handleSignUpSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = String(formData.get("signup-name") ?? "").trim()
    const email = String(formData.get("signup-email") ?? "").trim()
    const phone = String(formData.get("signup-phone") ?? "").trim()

    if (!name || !email) return

    completeAuth({
      name,
      email,
      phone,
    })
  }, [completeAuth])

  const handleContinueAsGuest = useCallback(() => {
    continueAsGuest()
    router.push("/home")
  }, [continueAsGuest, router])

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.auth.back}
          </Link>
        </Button>
        <LanguageSwitcher />
      </div>

      <div className="mx-auto w-full max-w-sm pt-10 sm:pt-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t.auth.welcome}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {t.auth.subtitle}
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="signin" className="flex-1">{t.auth.signIn}</TabsTrigger>
            <TabsTrigger value="signup" className="flex-1">{t.auth.signUp}</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-6">
            <form onSubmit={handleSignInSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="signin-email">{t.auth.email}</Label>
                <Input
                  id="signin-email"
                  name="signin-email"
                  type="email"
                  placeholder={t.auth.emailPlaceholder}
                  required
                  autoComplete="email"
                  className="rounded-xl h-11"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="signin-password">{t.auth.password}</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    name="signin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.auth.passwordPlaceholder}
                    required
                    autoComplete="current-password"
                    className="rounded-xl h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-2 w-full rounded-xl h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? t.auth.signingIn : t.auth.signInBtn}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="signup-name">{t.auth.fullName}</Label>
                <Input
                  id="signup-name"
                  name="signup-name"
                  type="text"
                  placeholder={t.auth.namePlaceholder}
                  required
                  autoComplete="name"
                  className="rounded-xl h-11"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="signup-email">{t.auth.email}</Label>
                <Input
                  id="signup-email"
                  name="signup-email"
                  type="email"
                  placeholder={t.auth.emailPlaceholder}
                  required
                  autoComplete="email"
                  className="rounded-xl h-11"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="signup-password">{t.auth.password}</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    name="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.auth.createPassword}
                    required
                    autoComplete="new-password"
                    className="rounded-xl h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="signup-phone">{t.auth.phone}</Label>
                <Input
                  id="signup-phone"
                  name="signup-phone"
                  type="tel"
                  placeholder={t.auth.phonePlaceholder}
                  autoComplete="tel"
                  className="rounded-xl h-11"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-2 w-full rounded-xl h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? t.auth.creatingAccount : t.auth.createAccount}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-xl h-12 text-base"
            onClick={handleContinueAsGuest}
            disabled={isLoading}
          >
            {t.auth.continueGuest}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground leading-relaxed">
            {t.auth.guestNote}
          </p>
        </div>
      </div>
    </div>
  )
}
