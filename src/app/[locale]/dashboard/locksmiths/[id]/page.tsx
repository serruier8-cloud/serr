import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Star, Globe, ArrowLeft } from "lucide-react"

export default async function LocksmithDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const t = await getTranslations({ locale, namespace: "dashboard" })
  const prefix = `/${locale}`

  const locksmith = await prisma.locksmith.findUnique({
    where: { id },
    include: {
      city: true,
      locations: { include: { location: true } },
      services: { include: { service: true } },
      reviews: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  })
  if (!locksmith) notFound()

  return (
    <div>
      <Link href={`${prefix}/dashboard/locksmiths`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="h-4 w-4" /> {locale === "ar" ? "رجوع" : locale === "en" ? "Back" : "Retour"}
      </Link>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{locksmith.companyName}</h1>
            {locksmith.isApproved && <Badge variant="success">{locale === "ar" ? "مقبول" : locale === "en" ? "Approved" : "Approuvé"}</Badge>}
            {locksmith.isFeatured && <Badge>{locale === "ar" ? "مميز" : locale === "en" ? "Featured" : "En vedette"}</Badge>}
          </div>
          <p className="text-muted-foreground">@{locksmith.slug}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold mb-2">{locale === "ar" ? "المعلومات" : locale === "en" ? "Information" : "Informations"}</h3>
            <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> {locksmith.address || locksmith.city.name}</p>
            <p className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /> {locksmith.phone}</p>
            {locksmith.email && <p className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /> {locksmith.email}</p>}
            {locksmith.website && <p className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-muted-foreground" /> {locksmith.website}</p>}
            <p className="text-sm">⭐ {locksmith.rating.toFixed(1)} ({locksmith.reviewCount} {locale === "ar" ? "تقييم" : locale === "en" ? "reviews" : "avis"})</p>
            <p className="text-sm">🚗 {locale === "ar" ? "نصف القطر:" : locale === "en" ? "Radius:" : "Rayon:"} {locksmith.coverageRadius} km</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{locale === "ar" ? "الخدمات" : locale === "en" ? "Services" : "Services"} ({locksmith.services.length})</h3>
            <div className="flex flex-wrap gap-2">
              {locksmith.services.map(s => (
                <Badge key={s.serviceId} variant="secondary">{locale === "ar" ? s.service.nameAr : locale === "en" ? s.service.nameEn : s.service.nameFr}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{locale === "ar" ? "الأحياء" : locale === "en" ? "Districts" : "Quartiers"} ({locksmith.locations.length})</h3>
            <div className="flex flex-wrap gap-2">
              {locksmith.locations.map(l => (
                <Badge key={l.locationId} variant="outline">{l.location.name}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {locksmith.reviews.length > 0 && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">{locale === "ar" ? "آراء حديثة" : locale === "en" ? "Recent reviews" : "Avis récents"}</h3>
            <div className="space-y-3">
              {locksmith.reviews.map(r => (
                <div key={r.id} className="border-b pb-3 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{r.authorName || (locale === "ar" ? "مجهول" : locale === "en" ? "Anonymous" : "Anonyme")}</span>
                    <span className="text-yellow-500">{'⭐'.repeat(r.rating)}</span>
                    <span className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString(locale === "ar" ? "ar-MA" : locale === "en" ? "en-US" : "fr-FR")}</span>
                  </div>
                  {r.comment && <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
