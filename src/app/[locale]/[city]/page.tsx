import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph } from "@/lib/seo"
import { generateServiceIntro } from "@/lib/content"
import { EmergencyCTA } from "@/components/locksmith/EmergencyCTA"
import { ServiceList } from "@/components/locksmith/ServiceList"
import { FAQSection } from "@/components/locksmith/FAQSection"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { buildLocalBusinessSchema, buildFAQSchema } from "@/components/locksmith/RichSchema"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>
}) {
  const { locale, city } = await params
  const cityData = await prisma.city.findUnique({ where: { slug: city } })
  if (cityData) {
    const title = generateMetaTitle({ locale, locationName: cityData.name, page: "city" })
    const description = generateMetaDescription({ locale, locationName: cityData.name, page: "city" })
    return { title, description, openGraph: generateOpenGraph({ locale, title, description }) }
  }
  const svc = await prisma.locksmithService.findUnique({ where: { slug: city } })
  if (svc) {
    const name = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
    const title = generateMetaTitle({ locale, serviceName: name, page: "service" })
    const description = generateMetaDescription({ locale, serviceName: name, page: "service" })
    return { title, description, openGraph: generateOpenGraph({ locale, title, description }) }
  }
  return {}
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>
}) {
  const { locale, city } = await params
  const cityData = await prisma.city.findUnique({
    where: { slug: city },
    include: { locations: { orderBy: { name: "asc" } } },
  })
  const svc = cityData ? null : await prisma.locksmithService.findUnique({ where: { slug: city } })
  if (!cityData && !svc) notFound()

  if (svc) {
    const defaultCity = await prisma.city.findFirst({ where: { slug: "marrakech" } })
    if (!defaultCity) notFound()
    const serviceName = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
    const serviceIntro = generateServiceIntro(locale, serviceName, defaultCity.name)
    const allServices = await prisma.locksmithService.findMany({ take: 10, orderBy: { nameFr: "asc" }, where: { id: { not: svc.id } } })
    const quartiers = await prisma.location.findMany({ where: { cityId: defaultCity.id, type: "QUARTIER" }, take: 24, orderBy: { name: "asc" } })
    const locationCount = await prisma.location.count({ where: { cityId: defaultCity.id } })
    const faqItems = [
      { question: `Proposez-vous ${serviceName.toLowerCase()} à Marrakech ?`, answer: `Oui, nous proposons ${serviceName.toLowerCase()} dans toute la ville de Marrakech avec intervention rapide en 30 minutes. Notre équipe de serruriers qualifiés couvre l'ensemble des quartiers.` },
      { question: `Quel est le prix de ${serviceName.toLowerCase()} à Marrakech ?`, answer: svc.priceFrom ? `Le prix de ${serviceName.toLowerCase()} à Marrakech commence à partir de ${svc.priceFrom} MAD. Le devis est gratuit et sans engagement.` : "Le prix varie selon le type d'intervention. Contactez-nous pour un devis gratuit." },
      { question: "Quel est le délai d'intervention ?", answer: "Notre serrurier arrive généralement en 30 minutes dans tout Marrakech. Nous priorisons les appels d'urgence." },
      { question: "Intervenez-vous dans tous les quartiers ?", answer: `Oui, nous couvrons l'ensemble des ${locationCount} quartiers de Marrakech pour ${serviceName.toLowerCase()}.` },
    ]

    return (
      <>
        <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "Service", name: serviceName, description: `${serviceName} à Marrakech`, provider: { "@type": "LocalBusiness", name: "Serrurier Marrakech" }, areaServed: { "@type": "City", name: "Marrakech" }, ...(svc.priceFrom && { offers: { "@type": "Offer", price: svc.priceFrom, priceCurrency: "MAD" } }) }} />
        <SchemaOrg schema={buildFAQSchema({ items: faqItems })} />
        <div className="container py-8">
          <Breadcrumbs items={[{ label: serviceName }]} />
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{serviceName} Marrakech</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary"><MapPin className="h-3 w-3 mr-1" /> Marrakech</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Arrivée ~30 min</Badge>
              <Badge variant="success">24h/24 - 7j/7</Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl">{serviceIntro}</p>
          </div>
          <div className="mb-8">
            <EmergencyCTA locationName="Marrakech" />
          </div>
          {svc.priceFrom && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Prix indicatif</h2>
              <Card className="inline-block">
                <CardContent className="p-4">
                  <p className="text-lg font-semibold">{serviceName} : à partir de <span className="text-primary">{svc.priceFrom} MAD</span></p>
                  <p className="text-sm text-muted-foreground">Devis gratuit · Intervention rapide · Travail garanti</p>
                </CardContent>
              </Card>
            </section>
          )}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Tous nos services de serrurerie</h2>
            <ServiceList services={allServices.map(s => ({ slug: s.slug, name: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr, priceFrom: s.priceFrom ?? undefined }))} />
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Quartiers où nous intervenons</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {quartiers.map((loc) => (
                <Link key={loc.id} href={`/${locale === "fr" ? "" : locale}/marrakech/${loc.slug}`} className="text-sm hover:text-primary p-2 rounded hover:bg-muted transition-colors">{loc.name}</Link>
              ))}
            </div>
          </section>
          <section className="mb-8">
            <FAQSection items={faqItems} />
          </section>
        </div>
      </>
    )
  }

  const services = await prisma.locksmithService.findMany({ take: 12, orderBy: { nameFr: "asc" } })
  const mappedServices = services.map((s) => ({ slug: s.slug, name: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr, priceFrom: s.priceFrom ?? undefined }))
  const arrondissements = cityData!.locations.filter((l) => l.type === "ARRONDISSEMENT")
  const quartiers = cityData!.locations.filter((l) => l.type === "QUARTIER")
  const locationCount = cityData!.locations.length

  const citySchema = buildLocalBusinessSchema({
    name: `Serrurier ${cityData!.name}`,
    description: `Service de serrurerie professionnel dans toute la ville de ${cityData!.name}`,
    url: `https://serruiermarrakech.ma/marrakech`,
    telephone: "+212600000000",
    address: { addressLocality: `${cityData!.name}, Maroc` },
    geo: { latitude: cityData!.latitude, longitude: cityData!.longitude },
    areaServed: cityData!.locations.slice(0, 20).map(l => l.name),
  })

  return (
    <>
      <SchemaOrg schema={citySchema} />
      <div className="container py-8">
        <Breadcrumbs items={[{ label: cityData!.name }]} />
        <h1 className="text-4xl font-bold mb-4">Serrurier {cityData!.name}</h1>
        <p className="text-muted-foreground text-lg mb-2">Service de serrurerie professionnel dans toute la ville de {cityData!.name}. Intervention rapide 30 min. Devis gratuit.</p>
        <p className="text-sm text-muted-foreground mb-8">{locationCount} quartiers couverts · 30 services disponibles · Serruriers qualifiés 7j/7</p>
        {arrondissements.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Arrondissements de {cityData!.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {arrondissements.map((arr) => (
                <Link key={arr.id} href={`/${locale === "fr" ? "" : locale}/marrakech/${arr.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow"><CardContent className="p-4"><p className="font-semibold">{arr.name}</p></CardContent></Card>
                </Link>
              ))}
            </div>
          </section>
        )}
        {quartiers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Quartiers de {cityData!.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {quartiers.map((q) => (
                <Link key={q.id} href={`/${locale === "fr" ? "" : locale}/marrakech/${q.slug}`} className="text-sm hover:text-primary p-2 rounded hover:bg-muted transition-colors border">{q.name}</Link>
              ))}
            </div>
          </section>
        )}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Nos services à {cityData!.name}</h2>
          <ServiceList services={mappedServices} />
        </section>
        <section className="mb-12">
          <EmergencyCTA locationName={cityData!.name} />
        </section>
      </div>
    </>
  )
}

export const revalidate = 3600
