import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getArrivalTime } from "@/lib/utils"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph } from "@/lib/seo"
import { generateLocationIntro, generateServiceIntro, generateServiceFAQ } from "@/lib/content"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { EmergencyCTA } from "@/components/locksmith/EmergencyCTA"
import { ServiceList } from "@/components/locksmith/ServiceList"
import { FAQSection } from "@/components/locksmith/FAQSection"
import { PriceGuide } from "@/components/locksmith/PriceGuide"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { buildLocalBusinessSchema, buildFAQSchema } from "@/components/locksmith/RichSchema"
import { LocationMap } from "@/components/map/LocationMap"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string }>
}) {
  const { locale, city, slug } = await params
  const cityData = await prisma.city.findUnique({ where: { slug: city } })
  if (!cityData) return {}

  const location = await prisma.location.findUnique({ where: { cityId_slug: { cityId: cityData.id, slug } } })
  if (location) {
    const arrivalTime = getArrivalTime(31.6295, -7.9811, location.latitude, location.longitude)
    const title = generateMetaTitle({ locale, locationName: location.name, page: "location" })
    const description = generateMetaDescription({ locale, locationName: location.name, arrivalTime, page: "location" })
    return { title, description, openGraph: generateOpenGraph({ locale, title, description }) }
  }

  const svc = await prisma.locksmithService.findUnique({ where: { slug } })
  if (svc) {
    const name = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
    const title = generateMetaTitle({ locale, serviceName: name, locationName: cityData.name, page: "service" })
    const description = generateMetaDescription({ locale, serviceName: name, locationName: cityData.name, page: "service" })
    return { title, description, openGraph: generateOpenGraph({ locale, title, description }) }
  }
  return {}
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string }>
}) {
  const { locale, city, slug } = await params
  const cityData = await prisma.city.findUnique({ where: { slug: city } })
  if (!cityData) notFound()

  const location = await prisma.location.findUnique({
    where: { cityId_slug: { cityId: cityData.id, slug } },
    include: { children: { take: 20, orderBy: { name: "asc" } } },
  })
  const svc = location ? null : await prisma.locksmithService.findUnique({ where: { slug } })
  if (!location && !svc) notFound()

  if (svc) {
    const serviceName = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
    const serviceIntro = generateServiceIntro(locale, serviceName, cityData.name)
    const allServices = await prisma.locksmithService.findMany({ take: 10, orderBy: { nameFr: "asc" }, where: { id: { not: svc.id } } })
    const arrivalTime = getArrivalTime(31.6295, -7.9811, cityData.latitude, cityData.longitude)
    const faqItems = generateServiceFAQ(locale, serviceName, cityData.name, arrivalTime)
    const priceItems = [{ service: serviceName, priceFrom: svc.priceFrom || 150, priceTo: svc.priceFrom ? svc.priceFrom * 2 : 350 }]

    return (
      <div className="container py-8">
        <Breadcrumbs items={[{ label: cityData.name, href: `/${locale === "fr" ? "" : locale}/${cityData.slug}` }, { label: serviceName }]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{serviceName} {cityData.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary"><MapPin className="h-3 w-3 mr-1" /> {cityData.name}</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Arrivée ~{arrivalTime} min</Badge>
              <Badge variant="success">24h/24 - 7j/7</Badge>
            </div>
            <p className="text-muted-foreground mb-6">{serviceIntro}</p>
            <EmergencyCTA locationName={cityData.name} />
          </div>
          <div className="lg:col-span-1">
            <LocationMap center={[cityData.latitude, cityData.longitude]} zoom={12} markers={[{ lat: cityData.latitude, lng: cityData.longitude, title: cityData.name }]} className="h-[250px]" />
          </div>
        </div>
        <section className="mb-12"><PriceGuide items={priceItems} /></section>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">Services associés</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allServices.map((s) => (
              <Link key={s.id} href={`/${locale === "fr" ? "" : locale}/${cityData.slug}/${s.slug}`} className="text-sm hover:text-primary p-3 rounded border hover:bg-muted transition-colors">
                {locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr}
              </Link>
            ))}
          </div>
        </section>
        <section className="mb-12"><FAQSection items={faqItems} /></section>
      </div>
    )
  }

  const services = await prisma.locksmithService.findMany({ take: 30, orderBy: { nameFr: "asc" } })
  const mappedServices = services.map((s) => ({
    slug: s.slug, name: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr, description: (locale === "ar" ? s.descriptionAr : locale === "en" ? s.descriptionEn : s.descriptionFr) || undefined, priceFrom: s.priceFrom ?? undefined,
  }))

  const nearbyLocations = await prisma.location.findMany({
    where: { cityId: cityData.id, id: { not: location!.id }, latitude: { gte: location!.latitude - 0.05, lte: location!.latitude + 0.05 }, longitude: { gte: location!.longitude - 0.05, lte: location!.longitude + 0.05 } },
    take: 8, orderBy: { name: "asc" },
  })

  const arrivalTime = getArrivalTime(31.6295, -7.9811, location!.latitude, location!.longitude)
  const introText = generateLocationIntro(locale, location!.name, location!.arrondissement, arrivalTime)

  const priceItems = services.slice(0, 10).map((s) => ({
    service: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr,
    priceFrom: s.priceFrom || 150, priceTo: s.priceFrom ? s.priceFrom * 2 : 350,
  }))

  const faqItems = [
    { question: `Quels sont vos délais d'intervention à ${location!.name} ?`, answer: `Nous intervenons généralement en ${arrivalTime} minutes dans le quartier ${location!.name}, 24h/24 et 7j/7, y compris les jours fériés.` },
    { question: `Quels services de serrurerie proposez-vous à ${location!.name} ?`, answer: `Nous proposons tous types de services de serrurerie à ${location!.name} : ouverture de porte, changement de serrure, blindage de porte, copie de clés, serrurerie automobile et bien plus encore.` },
    { question: `Proposez-vous un service d'urgence à ${location!.name} ?`, answer: `Oui, nous assurons un service d'urgence 24h/24 dans le quartier ${location!.name}. Intervention rapide en ${arrivalTime} minutes.` },
    { question: `Le devis est-il gratuit à ${location!.name} ?`, answer: "Oui, nous offrons un devis gratuit et sans engagement pour toutes nos prestations de serrurerie." },
  ]

  const localBusinessSchema = buildLocalBusinessSchema({
    name: `Serrurier ${location!.name} Marrakech`,
    description: `Service de serrurerie professionnel dans le quartier ${location!.name} à Marrakech`,
    url: `https://serruiermarrakech.ma/marrakech/${slug}`,
    telephone: "+212600000000",
    address: { addressLocality: `${location!.name}, Marrakech` },
    geo: { latitude: location!.latitude, longitude: location!.longitude },
    areaServed: [location!.name, ...nearbyLocations.map(l => l.name)],
    aggregateRating: undefined,
  })

  return (
    <>
      <SchemaOrg schema={localBusinessSchema} />
      <SchemaOrg schema={buildFAQSchema({ items: faqItems })} />
      <div className="container py-8">
        <Breadcrumbs items={[{ label: "Marrakech", href: `/${locale === "fr" ? "" : locale}/marrakech` }, { label: location!.name }]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">Serrurier {location!.name} Marrakech</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary"><MapPin className="h-3 w-3 mr-1" /> {location!.arrondissement || "Marrakech"}</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Arrivée ~{arrivalTime} min</Badge>
              {location!.postalCode && <Badge variant="outline">Code postal: {location!.postalCode}</Badge>}
            </div>
            <p className="text-muted-foreground mb-6">{introText}</p>
            <EmergencyCTA locationName={location!.name} />
          </div>
          <div className="lg:col-span-1">
            <LocationMap center={[location!.latitude, location!.longitude]} zoom={15} markers={[{ lat: location!.latitude, lng: location!.longitude, title: location!.name }]} className="h-[300px]" />
          </div>
        </div>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Nos services à {location!.name}</h2>
          <ServiceList services={mappedServices} locationSlug={slug} locale={locale} />
        </section>
        <section className="mb-12"><PriceGuide items={priceItems} /></section>
        {nearbyLocations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Quartiers à proximité de {location!.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {nearbyLocations.map((loc) => (
                <Link key={loc.id} href={`/${locale === "fr" ? "" : locale}/marrakech/${loc.slug}`} className="text-sm hover:text-primary p-2 rounded hover:bg-muted transition-colors border">{loc.name}</Link>
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
