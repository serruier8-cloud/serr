import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph, generateHreflang } from "@/lib/seo"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { EmergencyCTA } from "@/components/locksmith/EmergencyCTA"
import { ReviewList } from "@/components/locksmith/ReviewList"
import { ReviewForm } from "@/components/locksmith/ReviewForm"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { buildLocalBusinessSchema } from "@/components/locksmith/RichSchema"
import { LocationMap } from "@/components/map/LocationMap"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Star, Shield, Clock, MapPin, CheckCircle, Globe } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const locksmith = await prisma.locksmith.findUnique({ where: { slug } })
  if (!locksmith) return {}

  const title = locksmith.companyName
  const desc = (locale === "ar" ? locksmith.descriptionAr : locale === "en" ? locksmith.descriptionEn : locksmith.descriptionFr)?.slice(0, 160) || (locale === "ar" ? `سراج ${locksmith.companyName} في مراكش. تدخل سريع.` : locale === "en" ? `Locksmith ${locksmith.companyName} in Marrakech. Fast response.` : `Serrurier ${locksmith.companyName} à Marrakech. Intervention rapide.`)
  return { title, description: desc, openGraph: generateOpenGraph({ locale, title, description: desc }), alternates: { canonical: `https://www.serruriermarrakech.ma/${locale}/s/${slug}`, languages: generateHreflang(`s/${slug}`) } }
}

export default async function LocksmithProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  const locksmith = await prisma.locksmith.findUnique({
    where: { slug },
    include: {
      city: true,
      locations: { include: { location: true } },
      services: { include: { service: true } },
      reviews: { where: { isApproved: true }, orderBy: { createdAt: "desc" }, take: 20 },
      workingHours: { orderBy: { day: "asc" } },
    },
  })
  if (!locksmith) notFound()

  const prefix = `/${locale}`
  const DAYS = locale === "ar" ? ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"] : locale === "en" ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] : ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

  const descriptionFr = locksmith.descriptionFr || `Serrurier ${locksmith.companyName} basé à ${locksmith.city.name}. ${locksmith.experience || 10} ans d'expérience. Intervention rapide dans tous les quartiers de Marrakech.`
  const descriptionAr = locksmith.descriptionAr || `سراج ${locksmith.companyName} في ${locksmith.city.name}. ${locksmith.experience || 10} سنوات خبرة. تدخل سريع في جميع أحياء مراكش.`
  const descriptionEn = locksmith.descriptionEn || `Locksmith ${locksmith.companyName} based in ${locksmith.city.name}. ${locksmith.experience || 10} years experience. Fast response in all neighborhoods of Marrakech.`

  const schema = buildLocalBusinessSchema({
    name: locksmith.companyName,
    description: locale === "ar" ? descriptionAr : locale === "en" ? descriptionEn : descriptionFr,
    url: `https://www.serruriermarrakech.ma/${prefix === "" ? "" : prefix.slice(1)}/s/${slug}`,
    telephone: locksmith.phone,
    address: { addressLocality: `${locksmith.address || locksmith.city.name}, Maroc` },
    geo: { latitude: locksmith.latitude, longitude: locksmith.longitude },
    priceRange: "$$",
    ...(locksmith.reviewCount > 0 && {
      aggregateRating: { ratingValue: locksmith.rating, reviewCount: locksmith.reviewCount },
    }),
    areaServed: locksmith.locations.map(l => l.location.name),
  })

  return (
    <>
      <SchemaOrg schema={schema} />
      <div className="container py-8">
        <Breadcrumbs items={[
          { label: "Marrakech", href: `/${locale}/marrakech` },
          { label: locksmith.companyName },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{locksmith.companyName}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  {locksmith.isVerified && (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> {locale === "ar" ? "متحقق منه" : locale === "en" ? "Verified" : "Vérifié"}
                    </Badge>
                  )}
                  {locksmith.emergencyAvailable && (
                    <Badge variant="destructive" className="animate-pulse">{locale === "ar" ? "طوارئ 24/24" : locale === "en" ? "24/7 Emergency" : "Urgence 24h/24"}</Badge>
                  )}
                  {locksmith.available247 && <Badge>7j/7</Badge>}
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    {locksmith.rating.toFixed(1)} ({locksmith.reviewCount} {locale === "ar" ? "تقييم" : locale === "en" ? "reviews" : "avis"})
                  </span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              {locale === "fr" ? descriptionFr : locale === "en" ? descriptionEn : descriptionAr}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href={`tel:${locksmith.phone}`}>
                <Button size="lg" variant="emergency" className="gap-2">
                  <Phone className="h-5 w-5" />
                  {locksmith.phone}
                </Button>
              </Link>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">{locale === "ar" ? "الخدمات المقترحة" : locale === "en" ? "Offered services" : "Services proposés"}</h2>
              <div className="flex flex-wrap gap-2">
                {locksmith.services.map(s => (
                  <Link key={s.serviceId} href={`/${locale}/marrakech/${locksmith.locations[0]?.location.slug || "massira-1"}/${s.service.slug}`}>
                    <Badge variant="secondary" className="text-sm py-1 px-3 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {locale === "ar" ? s.service.nameAr : locale === "en" ? s.service.nameEn : s.service.nameFr}
                    </Badge>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">{locale === "ar" ? "مناطق التدخل" : locale === "en" ? "Service areas" : "Zones d'intervention"}</h2>
              <div className="flex flex-wrap gap-2">
                {locksmith.locations.map(l => (
                  <Link key={l.locationId} href={`/${locale}/marrakech/${l.location.slug}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors">
                      <MapPin className="h-3 w-3 mr-1" /> {l.location.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </section>

            {locksmith.workingHours.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">{locale === "ar" ? "ساعات العمل" : locale === "en" ? "Opening hours" : "Horaires d'ouverture"}</h2>
                <Card>
                  <CardContent className="p-4">
                    {locksmith.workingHours.map(wh => (
                      <div key={wh.id} className="flex justify-between py-1 text-sm border-b last:border-0">
                        <span className="font-medium">{DAYS[wh.day] || (locale === "ar" ? `اليوم ${wh.day}` : locale === "en" ? `Day ${wh.day}` : `Jour ${wh.day}`)}</span>
                        <span className="text-muted-foreground">
                          {wh.isClosed ? (locale === "ar" ? "مغلق" : locale === "en" ? "Closed" : "Fermé") : `${wh.open || "N/A"} - ${wh.close || "N/A"}`}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <LocationMap
              center={[locksmith.latitude, locksmith.longitude]}
              zoom={15}
              markers={[{ lat: locksmith.latitude, lng: locksmith.longitude, title: locksmith.companyName }]}
              className="h-[250px]"
              locateUser
            />
            <Card>
              <CardContent className="p-4 space-y-3">
                <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> {locksmith.address || locksmith.city.name}</p>
                <p className="flex items-center gap-2 text-sm"><Shield className="h-4 w-4 text-muted-foreground" /> {locksmith.experience || 10}+ {locale === "ar" ? "سنوات خبرة" : locale === "en" ? "years experience" : "ans d'expérience"}</p>
                <p className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /> {locale === "ar" ? "نصف القطر:" : locale === "en" ? "Radius:" : "Rayon:"} {locksmith.coverageRadius} km</p>
                {locksmith.website && (
                  <a href={locksmith.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Globe className="h-4 w-4" /> {locale === "ar" ? "الموقع الإلكتروني" : locale === "en" ? "Website" : "Site web"}
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mb-12">
          <EmergencyCTA locationName={locksmith.companyName} locale={locale} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{locale === "ar" ? "آراء العملاء" : locale === "en" ? "Customer reviews" : "Avis clients"}</h2>
          <ReviewList reviews={locksmith.reviews} locale={locale} />
          <div className="mt-8">
            <ReviewForm locksmithId={locksmith.id} locale={locale} />
          </div>
        </section>
      </div>
    </>
  )
}

export const revalidate = 3600
