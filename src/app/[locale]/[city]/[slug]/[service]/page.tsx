import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getArrivalTime } from "@/lib/utils"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph, generateHreflang } from "@/lib/seo"
import { generateServiceIntro, generateServiceFAQ, generateProblemDescription, generateServiceSections } from "@/lib/content"
import { resolveServiceSlug } from "@/lib/service-slugs"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { EmergencyCTA } from "@/components/locksmith/EmergencyCTA"
import { FAQSection } from "@/components/locksmith/FAQSection"
import { PriceGuide } from "@/components/locksmith/PriceGuide"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { SmartLockContent } from "@/components/locksmith/SmartLockContent"
import { buildFAQSchema, buildServiceSchema, buildLocalBusinessSchema, buildBreadcrumbSchema, buildProductSchema } from "@/components/locksmith/RichSchema"
import { isSmartLockSlug, getSmartLockFAQ } from "@/lib/smart-lock-content"
import { LocationMap } from "@/components/map/LocationMap"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

const BASE_URL = "https://www.serruriermarrakech.ma"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string; service: string }>
}) {
  const { locale, city, slug, service } = await params
  const canonical = `${BASE_URL}/${locale}/${city}/${slug}/${service}`
  const languages = generateHreflang(`${city}/${slug}/${service}`)
  let cityData = await prisma.city.findUnique({ where: { slug: city } })
  if (!cityData) cityData = await prisma.city.findUnique({ where: { slug: "marrakech" } })
  if (!cityData) return {}
  const location = await prisma.location.findUnique({ where: { cityId_slug: { cityId: cityData.id, slug } } })
  const svc = await prisma.locksmithService.findUnique({ where: { slug: resolveServiceSlug(service) } })
  if (!location || !svc) return {}
  const name = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
  const arrivalTime = getArrivalTime(31.6295, -7.9811, location.latitude, location.longitude)
  const title = generateMetaTitle({ locale, serviceName: name, locationName: location.name, page: "location_service" })
  const description = generateMetaDescription({ locale, serviceName: name, locationName: location.name, arrivalTime, priceFrom: svc.priceFrom || undefined, page: "location_service" })
  return { title, description, openGraph: generateOpenGraph({ locale, title, description }), alternates: { canonical, languages } }
}

export default async function LocationServicePage({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string; service: string }>
}) {
  const { locale, city, slug, service } = await params
  let cityData = await prisma.city.findUnique({ where: { slug: city } })
  if (!cityData) cityData = await prisma.city.findUnique({ where: { slug: "marrakech" } })
  if (!cityData) notFound()
  const location = await prisma.location.findUnique({ where: { cityId_slug: { cityId: cityData.id, slug } } })
  if (!location) notFound()
  const svc = await prisma.locksmithService.findUnique({ where: { slug: resolveServiceSlug(service) } })
  if (!svc) notFound()

  const serviceName = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
  const arrivalTime = getArrivalTime(31.6295, -7.9811, location.latitude, location.longitude)
  const priceFrom = svc.priceFrom || 150
  const serviceIntro = generateServiceIntro(locale, serviceName, location.name, cityData.name)
  const problemDesc = generateProblemDescription(locale, svc.slug, location.name)
  const sections = generateServiceSections(locale, serviceName, svc.slug, location.name, cityData.name, arrivalTime, priceFrom)

  const nearbyLocations = await prisma.location.findMany({
    where: { cityId: cityData.id, id: { not: location.id }, latitude: { gte: location.latitude - 0.05, lte: location.latitude + 0.05 }, longitude: { gte: location.longitude - 0.05, lte: location.longitude + 0.05 } },
    take: 6, orderBy: { name: "asc" },
  })

  const allServices = await prisma.locksmithService.findMany({ take: 10, orderBy: { nameFr: "asc" }, where: { id: { not: svc.id } } })
  const faqItems = generateServiceFAQ(locale, serviceName, location.name, arrivalTime, priceFrom)
  const smartFAQs = isSmartLockSlug(svc.slug) ? getSmartLockFAQ(locale as "fr" | "ar" | "en", serviceName, location.name) : []
  const priceItems = [{ service: serviceName, priceFrom, priceTo: priceFrom * 2 }]

  const faqTitle = locale === "ar" ? `أسئلة شائعة عن ${serviceName} في ${location.name}` : locale === "en" ? `FAQ about ${serviceName} in ${location.name}` : `FAQ ${serviceName} à ${location.name}`
  const relatedTitle = locale === "ar" ? `خدمات سراجة أخرى في ${location.name}` : locale === "en" ? `Other locksmith services in ${location.name}` : `Autres services de serrurerie à ${location.name}`
  const priceTitle = locale === "ar" ? `سعر ${serviceName} في ${location.name}` : locale === "en" ? `${serviceName} prices in ${location.name}` : `Prix de ${serviceName} à ${location.name}`

  const basePath = `${BASE_URL}/${locale}/${city}`
  const breadcrumbSchema = buildBreadcrumbSchema({
    items: [
      { label: locale === "ar" ? "الرئيسية" : locale === "en" ? "Home" : "Accueil", url: `${BASE_URL}/${locale}` },
      { label: cityData.name, url: basePath },
      { label: location.name, url: `${basePath}/${slug}` },
      { label: serviceName },
    ],
  })
  const serviceSchema = buildServiceSchema({
    name: `${serviceName} ${location.name} ${cityData.name}`,
    description: `${serviceName} à ${location.name} ${cityData.name}, intervention rapide ${arrivalTime} min, 7j/7. Devis gratuit. Prix à partir de ${priceFrom} MAD.`,
    provider: "Serrurier Marrakech",
    providerUrl: `${BASE_URL}/${locale}`,
    providerTelephone: "+212715758801",
    areaServed: `${location.name}, ${cityData.name}`,
    priceFrom,
    currency: "MAD",
    serviceType: serviceName,
  })
  const localBusinessSchema = buildLocalBusinessSchema({
    name: `Serrurier ${location.name} ${cityData.name}`,
    description: `${serviceName} et dépannage serrurerie dans le quartier ${location.name} à ${cityData.name}, 7j/7`,
    url: `${basePath}/${slug}`,
    telephone: "+212715758801",
    address: { addressLocality: `${location.name}, ${cityData.name}` },
    geo: { latitude: location.latitude, longitude: location.longitude },
    areaServed: [location.name, ...nearbyLocations.map(l => l.name)],
  })

  return (
    <>
      <SchemaOrg schema={buildFAQSchema({ items: [...faqItems, ...smartFAQs] })} />
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={localBusinessSchema} />
      <SchemaOrg schema={breadcrumbSchema} />
      {isSmartLockSlug(svc.slug) && (
        <SchemaOrg schema={buildProductSchema({ name: serviceName, description: `${serviceName} ${location.name} ${cityData.name}`, price: priceFrom, currency: "MAD", category: "Smart lock", areaServed: `${location.name}, ${cityData.name}` })} />
      )}
      <div className="container py-8">
        <Breadcrumbs items={[
          { label: cityData.name, href: `/${locale}/${city}` },
          { label: location.name, href: `/${locale}/${city}/${slug}` },
          { label: serviceName },
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{serviceName} {location.name} Marrakech</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary"><MapPin className="h-3 w-3 mr-1" /> {location.name}</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> {locale === "ar" ? "وصول ~" : locale === "en" ? "Arrival ~" : "Arrivée ~"}{arrivalTime} min</Badge>
              <Badge variant="success">24h/24 - 7j/7</Badge>
            </div>
            <p className="text-muted-foreground mb-4">{serviceIntro}</p>
            {problemDesc && <p className="text-muted-foreground mb-6">{problemDesc}</p>}
            <EmergencyCTA locationName={location.name} locale={locale} />
          </div>
          <div className="lg:col-span-1">
            <LocationMap center={[location.latitude, location.longitude]} zoom={15} markers={[{ lat: location.latitude, lng: location.longitude, title: location.name }]} className="h-[250px]" />
          </div>
        </div>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{sections.h2}</h2>
          {sections.h3s.map((h3, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{h3.title}</h3>
              {h3.paragraphs.map((p, j) => (
                <p key={j} className="text-muted-foreground mb-2">{p}</p>
              ))}
            </div>
          ))}
        </section>
        <section className="mb-12"><PriceGuide items={priceItems} locale={locale} title={priceTitle} /></section>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">{relatedTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allServices.map((s) => (
              <Link key={s.id} href={`/${locale}/marrakech/${slug}/${s.slug}`} className="text-sm hover:text-primary p-3 rounded border hover:bg-muted transition-colors">
                {locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr}
              </Link>
            ))}
          </div>
        </section>
        {nearbyLocations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{locale === "ar" ? `أحياء قريبة من ${location.name}` : locale === "en" ? `Districts near ${location.name}` : `Quartiers à proximité de ${location.name}`}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {nearbyLocations.map((loc) => (
                <Link key={loc.id} href={`/${locale}/marrakech/${loc.slug}`} className="text-sm hover:text-primary p-2 rounded border hover:bg-muted transition-colors">{loc.name}</Link>
              ))}
            </div>
          </section>
        )}
        {isSmartLockSlug(svc.slug) && <SmartLockContent locale={locale as "fr" | "ar" | "en"} locationName={location.name} />}
        <section className="mb-12"><FAQSection items={[...faqItems, ...smartFAQs]} title={faqTitle} /></section>
      </div>
    </>
  )
}

export const revalidate = 3600