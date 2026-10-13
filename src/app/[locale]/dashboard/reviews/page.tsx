import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ReviewActions } from "@/components/dashboard/ReviewActions"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Phone } from "lucide-react"

export default async function DashboardReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "dashboard" })
  const prefix = `/${locale}`

  const reviews = await prisma.review.findMany({
    orderBy: [{ isApproved: "asc" }, { createdAt: "desc" }],
    take: 100,
    include: {
      locksmith: { select: { companyName: true, slug: true, phone: true } },
      location: { select: { name: true } },
    },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{t("reviews")}</h1>
      <p className="text-muted-foreground mb-8">
        {locale === "ar"
          ? "وافق على تقييمات العملاء أو احذفها قبل نشرها"
          : locale === "en"
          ? "Approve or delete customer reviews before publication"
          : "Approuvez ou supprimez les avis clients avant publication"}
      </p>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          {locale === "ar" ? "لا توجد آراء حالياً" : locale === "en" ? "No reviews yet" : "Aucun avis pour le moment"}
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{r.authorName || (locale === "ar" ? "مجهول" : locale === "en" ? "Anonymous" : "Anonyme")}</span>
                      <span className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < r.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
                        ))}
                      </span>
                      {!r.isApproved && <Badge variant="outline">{locale === "ar" ? "قيد المراجعة" : locale === "en" ? "Pending" : "En attente"}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{r.comment || (locale === "ar" ? "بدون تعليق" : locale === "en" ? "No comment" : "Sans commentaire")}</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-3 flex-wrap">
                      <Link href={`${prefix}/s/${r.locksmith.slug}`} className="hover:text-primary">🔧 {r.locksmith.companyName}</Link>
                      {r.location && <span>📍 {r.location.name}</span>}
                      <span>🕐 {new Date(r.createdAt).toLocaleDateString(locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-FR")}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> {r.locksmith.phone}</span>
                    <ReviewActions id={r.id} locale={locale} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
