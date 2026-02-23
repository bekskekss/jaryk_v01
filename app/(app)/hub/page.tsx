"use client"

import { BookOpen, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { articles, articleCategoryLabels } from "@/data/articles"
import { useDiscreet } from "@/components/discreet-provider"
import { getLabel } from "@/lib/discreet-labels"
import { useLanguage } from "@/hooks/use-language"

export default function HubPage() {
  const { t } = useLanguage()
  const { isDiscreet } = useDiscreet()

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-6 lg:px-8 lg:pt-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl text-balance">
          {getLabel(t.hub.title, isDiscreet, t.hub.titleDiscreet)}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {getLabel(t.hub.subtitle, isDiscreet, t.hub.subtitleDiscreet)}
        </p>
      </header>

      <section className="flex flex-wrap gap-2">
        {Object.entries(articleCategoryLabels).map(([key, value]) => (
          <Badge key={key} variant="secondary" className="rounded-full px-3 py-1">
            {getLabel(value.label, isDiscreet, value.labelDiscreet)}
          </Badge>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {articles.map((article) => (
          <Card key={article.id} className="py-0 transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-lg bg-jaryk-violet-light px-2.5 py-1 text-xs font-medium text-jaryk-violet">
                  <BookOpen className="size-3.5" aria-hidden="true" />
                  {getLabel(
                    articleCategoryLabels[article.category].label,
                    isDiscreet,
                    articleCategoryLabels[article.category].labelDiscreet
                  )}
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  {article.readTime} {t.hub.readTime}
                </span>
              </div>
              <h2 className="text-base font-semibold text-foreground">
                {getLabel(article.title, isDiscreet, article.titleDiscreet)}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {getLabel(article.summary, isDiscreet, article.summaryDiscreet)}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
