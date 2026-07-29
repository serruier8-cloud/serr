import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph } from "@/lib/seo"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

function renderContent(content: string | null, locale: string) {
  if (!content) return null
  return content.split("\n\n").map((paragraph, i) => (
    <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
  ))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article) return {}
  const title = locale === "ar" ? article.titleAr : locale === "en" ? article.titleEn : article.titleFr
  const description = (locale === "ar" ? article.excerptAr : locale === "en" ? article.excerptEn : article.excerptFr) ?? ""
  return {
    title,
    description,
    openGraph: generateOpenGraph({ locale, title, description, image: article.imageUrl ?? undefined }),
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article || !article.published) notFound()

  const title = locale === "ar" ? article.titleAr : locale === "en" ? article.titleEn : article.titleFr
  const content = locale === "ar" ? article.contentAr : locale === "en" ? article.contentEn : article.contentFr
  const imageUrl = article.imageUrl

  return (
    <article className="container py-8 max-w-3xl mx-auto">
      {imageUrl && (
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground mb-8">
        {locale === "ar" ? article.excerptAr : locale === "en" ? article.excerptEn : article.excerptFr}
      </p>
      <Card className="mb-8">
        <CardContent className="p-4 text-sm text-muted-foreground">
          <time>{new Date(article.createdAt).toLocaleDateString(locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-FR")}</time>
          {article.category && (
            <span className="ml-4">
              {locale === "ar" ? "التصنيف" : locale === "en" ? "Category" : "Catégorie"}: {article.category}
            </span>
          )}
        </CardContent>
      </Card>
      <div className="prose prose-lg max-w-none">
        {renderContent(content, locale)}
      </div>
    </article>
  )
}

export const revalidate = 3600