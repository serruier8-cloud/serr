import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph } from "@/lib/seo"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const title = locale === "ar" ? "المدونة" : locale === "en" ? "Blog" : "Blog"
  const description = locale === "ar" ? "مقالات ومعلومات عن خدمات السراجة في مراكش" : locale === "en" ? "Articles and information about locksmith services in Marrakech" : "Articles et informations sur les services de serrurerie à Marrakech"
  return { title, description, openGraph: generateOpenGraph({ locale, title, description }), alternates: { canonical: `https://www.serruriermarrakech.ma/${locale}/blog`, languages: { fr: "https://www.serruriermarrakech.ma/fr/blog", ar: "https://www.serruriermarrakech.ma/ar/blog", en: "https://www.serruriermarrakech.ma/en/blog", "x-default": "https://www.serruriermarrakech.ma/fr/blog" } } }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  if (articles.length === 0) notFound()

  const title = locale === "ar" ? "المدونة" : locale === "en" ? "Blog" : "Blog"

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-8">
        {locale === "ar" ? "مقالات ومعلومات عن خدمات السراجة في مراكش" : locale === "en" ? "Articles and information about locksmith services in Marrakech" : "Articles et informations sur les services de serrurerie à Marrakech"}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const title = locale === "ar" ? article.titleAr : locale === "en" ? article.titleEn : article.titleFr
          const excerpt = locale === "ar" ? article.excerptAr : locale === "en" ? article.excerptEn : article.excerptFr
          return (
            <Link key={article.id} href={`/${locale}/blog/${article.slug}`}>
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                {article.imageUrl && (
                  <div className="relative h-48">
                    <Image src={article.imageUrl} alt={title} fill className="object-cover" />
                  </div>
                )}
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export const revalidate = 3600