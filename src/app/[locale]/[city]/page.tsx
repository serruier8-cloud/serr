import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph, generateHreflang } from "@/lib/seo"
import { generateServiceIntro, generateServiceSections } from "@/lib/content"
import { resolveServiceSlug } from "@/lib/service-slugs"
import { EmergencyCTA } from "@/components/locksmith/EmergencyCTA"
import { ServiceList } from "@/components/locksmith/ServiceList"
import { FAQSection } from "@/components/locksmith/FAQSection"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { SmartLockContent } from "@/components/locksmith/SmartLockContent"
import { buildLocalBusinessSchema, buildFAQSchema, buildBreadcrumbSchema, buildServiceSchema } from "@/components/locksmith/RichSchema"
import { isSmartLockSlug, getSmartLockFAQ } from "@/lib/smart-lock-content"
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
  const canonical = `https://www.serruriermarrakech.ma/${locale}/${city}`
  const languages = generateHreflang(city)
  const cityData = await prisma.city.findUnique({ where: { slug: city } })
  if (cityData) {
    const title = generateMetaTitle({ locale, locationName: cityData.name, page: "city" })
    const description = generateMetaDescription({ locale, locationName: cityData.name, page: "city" })
    return { title, description, openGraph: generateOpenGraph({ locale, title, description }), alternates: { canonical, languages } }
  }
  const svc = await prisma.locksmithService.findUnique({ where: { slug: resolveServiceSlug(city) } })
  if (svc) {
    const name = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
    const title = generateMetaTitle({ locale, serviceName: name, page: "service" })
    const description = generateMetaDescription({ locale, serviceName: name, page: "service" })
    return { title, description, openGraph: generateOpenGraph({ locale, title, description }), alternates: { canonical, languages } }
  }
  const arrond = await prisma.location.findFirst({ where: { slug: city, type: "ARRONDISSEMENT" } })
  if (arrond) {
    const title = generateMetaTitle({ locale, locationName: arrond.name, page: "location" })
    const description = generateMetaDescription({ locale, locationName: arrond.name, page: "location" })
    return { title, description, openGraph: generateOpenGraph({ locale, title, description }), alternates: { canonical, languages } }
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
  const svc = cityData ? null : await prisma.locksmithService.findUnique({ where: { slug: resolveServiceSlug(city) } })
  const arrondLocation = (!cityData && !svc) ? await prisma.location.findFirst({ where: { slug: city, type: "ARRONDISSEMENT" }, include: { city: true } }) : null
  if (!cityData && !svc && !arrondLocation) notFound()

  if (svc) {
    const defaultCity = await prisma.city.findFirst({ where: { slug: "marrakech" } })
    if (!defaultCity) notFound()
    const serviceName = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
    const serviceIntro = generateServiceIntro(locale, serviceName, defaultCity.name)
    const priceFrom = svc.priceFrom || 150
    const sections = generateServiceSections(locale, serviceName, svc.slug, defaultCity.name, defaultCity.name, 30, priceFrom)
    const allServices = await prisma.locksmithService.findMany({ take: 10, orderBy: { nameFr: "asc" }, where: { id: { not: svc.id } } })
    const quartiers = await prisma.location.findMany({ where: { cityId: defaultCity.id, type: "QUARTIER" }, take: 24, orderBy: { name: "asc" } })
    const locationCount = await prisma.location.count({ where: { cityId: defaultCity.id } })
    const faqItems = [
      { question: locale === "ar" ? `هل تقدمون ${serviceName} في مراكش؟` : locale === "en" ? `Do you offer ${serviceName} in Marrakech?` : `Proposez-vous ${serviceName} à Marrakech ?`, answer: locale === "ar" ? `نعم، نقدم ${serviceName} في جميع أنحاء مدينة مراكش مع تدخل سريع في 30 دقيقة. يغطي فريق السراجين المؤهلين لدينا جميع الأحياء.` : locale === "en" ? `Yes, we offer ${serviceName} across the city of Marrakech with fast response in 30 minutes. Our team of qualified locksmiths covers all districts.` : `Oui, nous proposons ${serviceName} dans toute la ville de Marrakech avec intervention rapide en 30 minutes. Notre équipe de serruriers qualifiés couvre l'ensemble des quartiers.` },
      { question: locale === "ar" ? `ما هو سعر ${serviceName} في مراكش؟` : locale === "en" ? `What is the price of ${serviceName} in Marrakech?` : `Quel est le prix de ${serviceName} à Marrakech ?`, answer: svc.priceFrom ? (locale === "ar" ? `يبدأ سعر ${serviceName} في مراكش من ${svc.priceFrom} درهم. التقدير مجاني وبدون التزام.` : locale === "en" ? `The price of ${serviceName} in Marrakech starts from ${svc.priceFrom} MAD. The quote is free and no-obligation.` : `Le prix de ${serviceName} à Marrakech commence à partir de ${svc.priceFrom} MAD. Le devis est gratuit et sans engagement.`) : (locale === "ar" ? "يختلف السعر حسب نوع التدخل. اتصل بنا للحصول على تقدير مجاني." : locale === "en" ? "The price varies depending on the type of intervention. Contact us for a free quote." : "Le prix varie selon le type d'intervention. Contactez-nous pour un devis gratuit.") },
      { question: locale === "ar" ? "ما هو وقت التدخل؟" : locale === "en" ? "What is the response time?" : "Quel est le délai d'intervention ?", answer: locale === "ar" ? "يصل السراج عادة في غضون 30 دقيقة في جميع أنحاء مراكش. نعطي الأولوية لمكالمات الطوارئ." : locale === "en" ? "Our locksmith usually arrives within 30 minutes across Marrakech. We prioritize emergency calls." : "Notre serrurier arrive généralement en 30 minutes dans tout Marrakech. Nous priorisons les appels d'urgence." },
      { question: locale === "ar" ? "هل تتدخلون في جميع الأحياء؟" : locale === "en" ? "Do you operate in all districts?" : "Intervenez-vous dans tous les quartiers ?", answer: locale === "ar" ? `نعم، نغطي جميع أحياء مراكش البالغ عددها ${locationCount} لخدمة ${serviceName}.` : locale === "en" ? `Yes, we cover all ${locationCount} districts of Marrakech for ${serviceName}.` : `Oui, nous couvrons l'ensemble des ${locationCount} quartiers de Marrakech pour ${serviceName}.` },
      ...(isSmartLockSlug(svc.slug) ? getSmartLockFAQ(locale as "fr" | "ar" | "en", serviceName, "Marrakech") : []),
    ]

    return (
      <>
        <SchemaOrg schema={buildServiceSchema({
          name: `${serviceName} ${defaultCity.name}`,
          description: `${serviceName} à ${defaultCity.name}, intervention rapide 30 min, 7j/7. Devis gratuit. Prix à partir de ${priceFrom} MAD.`,
          provider: "Serrurier Marrakech",
          providerUrl: `https://www.serruriermarrakech.ma/${locale}`,
          providerTelephone: "+212715758801",
          areaServed: defaultCity.name,
          priceFrom,
          currency: "MAD",
          serviceType: serviceName,
        })} />
        <SchemaOrg schema={buildLocalBusinessSchema({
          name: `Serrurier ${defaultCity.name}`,
          description: `Service de serrurerie professionnel dans toute la ville de ${defaultCity.name}`,
          url: `https://www.serruriermarrakech.ma/marrakech`,
          telephone: "+212715758801",
          address: { addressLocality: `${defaultCity.name}, Maroc` },
          geo: { latitude: defaultCity.latitude, longitude: defaultCity.longitude },
          areaServed: quartiers.slice(0, 20).map(q => q.name),
        })} />
        <SchemaOrg schema={buildBreadcrumbSchema({
          items: [
            { label: locale === "ar" ? "الرئيسية" : locale === "en" ? "Home" : "Accueil", url: `https://www.serruriermarrakech.ma/${locale}` },
            { label: serviceName },
          ],
        })} />
        <SchemaOrg schema={buildFAQSchema({ items: faqItems })} />
        <div className="container py-8">
          <Breadcrumbs items={[{ label: serviceName }]} />
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{serviceName} Marrakech</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary"><MapPin className="h-3 w-3 mr-1" /> Marrakech</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> {locale === "ar" ? "وصول ~30 دقيقة" : locale === "en" ? "Arrival ~30 min" : "Arrivée ~30 min"}</Badge>
              <Badge variant="success">24h/24 - 7j/7</Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl">{serviceIntro}</p>
          </div>
          <section className="mb-8">
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
          <div className="mb-8">
            <EmergencyCTA locationName="Marrakech" locale={locale} />
          </div>
          {svc.priceFrom && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">{locale === "ar" ? "سعر تقريبي" : locale === "en" ? "Indicative price" : "Prix indicatif"}</h2>
              <Card className="inline-block">
                <CardContent className="p-4">
                  <p className="text-lg font-semibold">{serviceName} : {locale === "ar" ? "ابتداءً من" : locale === "en" ? "from" : "à partir de"} <span className="text-primary">{svc.priceFrom} MAD</span></p>
                  <p className="text-sm text-muted-foreground">
                    {locale === "ar" ? "تقدير مجاني · تدخل سريع · عمل مضمون" : locale === "en" ? "Free quote · Fast response · Guaranteed work" : "Devis gratuit · Intervention rapide · Travail garanti"}
                  </p>
                </CardContent>
              </Card>
            </section>
          )}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">{locale === "ar" ? "جميع خدماتنا في السراجة" : locale === "en" ? "All our locksmith services" : "Tous nos services de serrurerie"}</h2>
            <ServiceList services={allServices.map(s => ({ slug: s.slug, name: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr, priceFrom: s.priceFrom ?? undefined }))} locale={locale} />
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">{locale === "ar" ? "الأحياء التي نتدخل فيها" : locale === "en" ? "Districts we operate in" : "Quartiers où nous intervenons"}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {quartiers.map((loc) => (
                <Link key={loc.id} href={`/${locale}/marrakech/${loc.slug}`} className="text-sm hover:text-primary p-2 rounded hover:bg-muted transition-colors">{loc.name}</Link>
              ))}
            </div>
          </section>
          {isSmartLockSlug(svc.slug) && <SmartLockContent locale={locale as "fr" | "ar" | "en"} />}
          <section className="mb-8">
            <FAQSection items={faqItems} title={locale === "ar" ? `أسئلة شائعة عن ${serviceName} في ${defaultCity.name}` : locale === "en" ? `FAQ about ${serviceName} in ${defaultCity.name}` : `FAQ ${serviceName} à ${defaultCity.name}`} />
          </section>
        </div>
      </>
    )
  }

  const services = await prisma.locksmithService.findMany({ take: 12, orderBy: { nameFr: "asc" } })
  const mappedServices = services.map((s) => ({ slug: s.slug, name: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr, priceFrom: s.priceFrom ?? undefined }))

  if (arrondLocation) {
    const quartiers = await prisma.location.findMany({ where: { cityId: arrondLocation.cityId, arrondissement: arrondLocation.name }, orderBy: { name: "asc" } })
    return (
      <div className="container py-8">
        <Breadcrumbs items={[{ label: arrondLocation.name }]} />
        <h1 className="text-4xl font-bold mb-4">{locale === "ar" ? `سراج ${arrondLocation.name} مراكش` : locale === "en" ? `Locksmith ${arrondLocation.name} Marrakech` : `Serrurier ${arrondLocation.name} Marrakech`}</h1>
        <p className="text-muted-foreground text-lg mb-2">
          {locale === "ar" ? `خدمة سراجة احترافية في مقاطعة ${arrondLocation.name} بمراكش. تدخل سريع. تقدير مجاني.` : locale === "en" ? `Professional locksmith service in the ${arrondLocation.name} district of Marrakech. Fast response. Free quote.` : `Service de serrurerie professionnel dans l'arrondissement ${arrondLocation.name} à Marrakech. Intervention rapide. Devis gratuit.`}
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          {locale === "ar" ? `${quartiers.length} أحياء · 30 خدمة متاحة · سراجون مؤهلون 7 أيام في الأسبوع` : locale === "en" ? `${quartiers.length} districts · 30 services available · Qualified locksmiths 7 days a week` : `${quartiers.length} quartiers · 30 services disponibles · Serruriers qualifiés 7j/7`}
        </p>
        {quartiers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{locale === "ar" ? `أحياء ${arrondLocation.name}` : locale === "en" ? `Districts of ${arrondLocation.name}` : `Quartiers de ${arrondLocation.name}`}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {quartiers.map((q) => (
                <Link key={q.id} href={`/${locale}/marrakech/${q.slug}`} className="text-sm hover:text-primary p-2 rounded hover:bg-muted transition-colors border">{q.name}</Link>
              ))}
            </div>
          </section>
        )}
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{locale === "ar" ? `خدماتنا في ${arrondLocation.name}` : locale === "en" ? `Our services in ${arrondLocation.name}` : `Nos services dans ${arrondLocation.name}`}</h2>
            <ServiceList services={mappedServices} locale={locale} />
        </section>
        <section className="mb-12">
          <EmergencyCTA locationName={arrondLocation.name} locale={locale} />
        </section>
      </div>
    )
  }

  const arrondissements = cityData!.locations.filter((l) => l.type === "ARRONDISSEMENT")
  const quartiers = cityData!.locations.filter((l) => l.type === "QUARTIER")
  const locationCount = cityData!.locations.length

  const citySchema = buildLocalBusinessSchema({
    name: `Serrurier ${cityData!.name}`,
    description: `Service de serrurerie professionnel dans toute la ville de ${cityData!.name}`,
    url: `https://www.serruriermarrakech.ma/marrakech`,
    telephone: "+212715758801",
    address: { addressLocality: `${cityData!.name}, Maroc` },
    geo: { latitude: cityData!.latitude, longitude: cityData!.longitude },
    areaServed: cityData!.locations.slice(0, 20).map(l => l.name),
  })

  return (
    <>
      <SchemaOrg schema={citySchema} />
      <div className="container py-8">
        <Breadcrumbs items={[{ label: cityData!.name }]} />
        <h1 className="text-4xl font-bold mb-4">{locale === "ar" ? `سراج ${cityData!.name}` : locale === "en" ? `Locksmith ${cityData!.name}` : `Serrurier ${cityData!.name}`}</h1>
        <p className="text-muted-foreground text-lg mb-2">
          {locale === "ar" ? `خدمة سراجة احترافية في جميع أنحاء مدينة ${cityData!.name}. تدخل سريع خلال 30 دقيقة. تقدير مجاني.` : locale === "en" ? `Professional locksmith service across the city of ${cityData!.name}. Fast response in 30 minutes. Free quote.` : `Service de serrurerie professionnel dans toute la ville de ${cityData!.name}. Intervention rapide 30 min. Devis gratuit.`}
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          {locale === "ar" ? `${locationCount} أحياء مغطاة · 30 خدمة متاحة · سراجون مؤهلون 7 أيام في الأسبوع` : locale === "en" ? `${locationCount} districts covered · 30 services available · Qualified locksmiths 7 days a week` : `${locationCount} quartiers couverts · 30 services disponibles · Serruriers qualifiés 7j/7`}
        </p>
        {arrondissements.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{locale === "ar" ? `مقاطعات ${cityData!.name}` : locale === "en" ? `Arrondissements of ${cityData!.name}` : `Arrondissements de ${cityData!.name}`}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {arrondissements.map((arr) => (
                <Link key={arr.id} href={`/${locale}/marrakech/${arr.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow"><CardContent className="p-4"><p className="font-semibold">{arr.name}</p></CardContent></Card>
                </Link>
              ))}
            </div>
          </section>
        )}
        {quartiers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{locale === "ar" ? `أحياء ${cityData!.name}` : locale === "en" ? `Districts of ${cityData!.name}` : `Quartiers de ${cityData!.name}`}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {quartiers.map((q) => (
                <Link key={q.id} href={`/${locale}/marrakech/${q.slug}`} className="text-sm hover:text-primary p-2 rounded hover:bg-muted transition-colors border">{q.name}</Link>
              ))}
            </div>
          </section>
        )}
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{locale === "ar" ? `خدماتنا في ${cityData!.name}` : locale === "en" ? `Our services in ${cityData!.name}` : `Nos services à ${cityData!.name}`}</h2>
            <ServiceList services={mappedServices} locale={locale} />
        </section>
        <section className="mb-12">
          <EmergencyCTA locationName={cityData!.name} locale={locale} />
        </section>
      </div>
    </>
  )
}

export const revalidate = 3600
