"use client"

import { Settings } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useDiscreet } from "@/components/discreet-provider"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function SettingsPage() {
  const { isDiscreet, toggleDiscreet } = useDiscreet()
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-24 lg:pb-6 lg:px-8 lg:pt-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.nav.settings}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.settings.subtitle}
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.settings.discreet}</CardTitle>
          <CardDescription>
            {t.settings.discreetDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Switch
              id="discreet-mode"
              checked={isDiscreet}
              onCheckedChange={toggleDiscreet}
              aria-label="Toggle discreet mode"
            />
            <Label htmlFor="discreet-mode" className="text-sm font-medium">
              {isDiscreet ? t.common.on : t.common.off}
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.settings.language}</CardTitle>
          <CardDescription>
            {t.settings.languageDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LanguageSwitcher />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.settings.notifications}</CardTitle>
          <CardDescription>
            {t.settings.comingSoon}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{t.common.phase3}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.settings.privacy}</CardTitle>
          <CardDescription>
            {t.settings.comingSoon}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{t.common.phase3}</p>
        </CardContent>
      </Card>
    </div>
  )
}
