import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getArrivalTime } from "@/lib/utils"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph } from "@/lib/seo"
import { generateServiceIntro, generateServiceFAQ } from "@/lib/content"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { EmergencyCTA } from "@/components/locksmith/EmergencyCTA"
import { FAQSection } from "@/components/locksmith/FAQSection"
import { PriceGuide } from "@/components/locksmith/PriceGuide"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { buildFAQSchema } from "@/components/locksmith/RichSchema"
import { LocationMap } from "@/components/map/LocationMap"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string; service: string }>
}) {
  const { locale, city, slug, service } = await params
  const location = await prisma.location.findFirst({ where: { slug, city: { slug: city } } })
  const svc = await prisma.locksmithService.findUnique({ where: { slug: service } })
  if (!location || !svc) return {}
  const name = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
  const arrivalTime = getArrivalTime(31.6295, -7.9811, location.latitude, location.longitude)
  const title = generateMetaTitle({ locale, serviceName: name, locationName: location.name, page: "location_service" })
  const description = generateMetaDescription({ locale, serviceName: name, locationName: location.name, arrivalTime, page: "location_service" })
  return { title, description, openGraph: generateOpenGraph({ locale, title, description }) }
}

export default async function LocationServicePage({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string; service: string }>
}) {
  const { locale, city, slug, service } = await params
  const cityData = await prisma.city.findUnique({ where: { slug: city } })
  if (!cityData) notFound()
  const location = await prisma.location.findUnique({ where: { cityId_slug: { cityId: cityData.id, slug } } })
  if (!location) notFound()
  const svc = await prisma.locksmithService.findUnique({ where: { slug: service } })
  if (!svc) notFound()

  const serviceName = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
  const arrivalTime = getArrivalTime(31.6295, -7.9811, location.latitude, location.longitude)
  const serviceIntro = generateServiceIntro(locale, serviceName, location.name, cityData.name)

  const nearbyLocations = await prisma.location.findMany({
    where: { cityId: cityData.id, id: { not: location.id }, latitude: { gte: location.latitude - 0.05, lte: location.latitude + 0.05 }, longitude: { gte: location.longitude - 0.05, lte: location.longitude + 0.05 } },
    take: 6, orderBy: { name: "asc" },
  })

  const allServices = await prisma.locksmithService.findMany({ take: 10, orderBy: { nameFr: "asc" }, where: { id: { not: svc.id } } })
  const faqItems = generateServiceFAQ(locale, serviceName, location.name, arrivalTime)
  const priceItems = [{ service: serviceName, priceFrom: svc.priceFrom || 150, priceTo: svc.priceFrom ? svc.priceFrom * 2 : 350 }]

  return (
    <>
      <SchemaOrg schema={buildFAQSchema({ items: faqItems })} />
      <div className="container py-8">
        <Breadcrumbs items={[
          { label: "Marrakech", href: `/${locale === "fr" ? "" : locale}/marrakech` },
          { label: location.name, href: `/${locale === "fr" ? "" : locale}/marrakech/${slug}` },
          { label: serviceName },
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{serviceName} {location.name} Marrakech</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary"><MapPin className="h-3 w-3 mr-1" /> {location.name}</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Arrivée ~{arrivalTime} min</Badge>
              <Badge variant="success">24h/24 - 7j/7</Badge>
            </div>
            <p className="text-muted-foreground mb-6">{serviceIntro}</p>
            <EmergencyCTA locationName={location.name} />
          </div>
          <div className="lg:col-span-1">
            <LocationMap center={[location.latitude, location.longitude]} zoom={15} markers={[{ lat: location.latitude, lng: location.longitude, title: location.name }]} className="h-[250px]" />
          </div>
        </div>
        <section className="mb-12"><PriceGuide items={priceItems} /></section>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">Services associés</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allServices.map((s) => (
              <Link key={s.id} href={`/${locale === "fr" ? "" : locale}/marrakech/${slug}/${s.slug}`} className="text-sm hover:text-primary p-3 rounded border hover:bg-muted transition-colors">
                {locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr}
              </Link>
            ))}
          </div>
        </section>
        {nearbyLocations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Quartiers à proximité de {location.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {nearbyLocations.map((loc) => (
                <Link key={loc.id} href={`/${locale === "fr" ? "" : locale}/marrakech/${loc.slug}`} className="text-sm hover:text-primary p-2 rounded border hover:bg-muted transition-colors">{loc.name}</Link>
              ))}
            </div>
          </section>
        )}
        <section className="mb-12"><FAQSection items={faqItems} /></section>
      </div>
    </>
  )
}

export const revalidate = 3600
