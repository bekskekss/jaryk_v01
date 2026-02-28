"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, BookOpen, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { articleCategoryLabels, articles } from "@/data/articles"
import { useDiscreet } from "@/components/discreet-provider"
import { useLanguage } from "@/hooks/use-language"

export default function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>()
  const { t, locale } = useLanguage()
  const { isDiscreet } = useDiscreet()

  const article = articles.find((item) => item.id === articleId)

  if (!article) {
    return (
      <div className="flex flex-col gap-6 px-4 pt-6 pb-6 lg:px-8 lg:pt-8">
        <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
          <Link href="/hub">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.common.back}
          </Link>
        </Button>
        <p className="text-sm text-muted-foreground">{t.hub.noArticles}</p>
      </div>
    )
  }

  const category = articleCategoryLabels[article.category]
  const title = isDiscreet
    ? (locale === "ru" ? article.titleDiscreetRu : article.titleDiscreet)
    : (locale === "ru" ? article.titleRu : article.title)
  const summary = isDiscreet
    ? (locale === "ru" ? article.summaryDiscreetRu : article.summaryDiscreet)
    : (locale === "ru" ? article.summaryRu : article.summary)
  const categoryLabel = isDiscreet
    ? (locale === "ru" ? category.labelDiscreetRu : category.labelDiscreet)
    : (locale === "ru" ? category.labelRu : category.label)
  const content = locale === "ru" ? article.contentRu : article.content

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-6 lg:px-8 lg:pt-8">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link href="/hub">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t.common.back}
        </Link>
      </Button>

      <header>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="inline-flex items-center gap-1 rounded-full px-3 py-1">
            <BookOpen className="size-3.5" aria-hidden="true" />
            {categoryLabel}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock3 className="size-3.5" aria-hidden="true" />
            {article.readTime} {t.hub.readTime}
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl text-balance">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{summary}</p>
      </header>

      <article className="rounded-2xl border bg-card p-5 md:p-6">
        <div className="space-y-4">
          {content.split("\n\n").map((paragraph, index) => (
            <p key={`${article.id}-p-${index}`} className="text-sm leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  )
}
