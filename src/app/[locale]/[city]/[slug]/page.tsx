import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getArrivalTime } from "@/lib/utils"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph, generateHreflang } from "@/lib/seo"
import { generateLocationIntro, generateServiceIntro, generateServiceFAQ, generateLocationSections } from "@/lib/content"
import { resolveServiceSlug } from "@/lib/service-slugs"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { EmergencyCTA } from "@/components/locksmith/EmergencyCTA"
import { ServiceList } from "@/components/locksmith/ServiceList"
import { FAQSection } from "@/components/locksmith/FAQSection"
import { PriceGuide } from "@/components/locksmith/PriceGuide"
import { PriceEstimator } from "@/components/locksmith/PriceEstimator"
import { LeadCapture } from "@/components/locksmith/LeadCapture"
import { ReviewList } from "@/components/locksmith/ReviewList"
import { ReviewForm } from "@/components/locksmith/ReviewForm"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { SmartLockContent } from "@/components/locksmith/SmartLockContent"
import { buildLocalBusinessSchema, buildFAQSchema, buildBreadcrumbSchema } from "@/components/locksmith/RichSchema"
import { isSmartLockSlug, getSmartLockFAQ } from "@/lib/smart-lock-content"
import { LocationMap } from "@/components/map/LocationMap"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string }>
}) {
  const { locale, city, slug } = await params
  const resolvedCity = city
  const canonical = `https://www.serruriermarrakech.ma/${locale}/${resolvedCity}/${slug}`
  const languages = generateHreflang(`${resolvedCity}/${slug}`)
  let cityData = await prisma.city.findUnique({ where: { slug: city } })
  if (!cityData) cityData = await prisma.city.findUnique({ where: { slug: "marrakech" } })
  if (!cityData) return {}

  const location = await prisma.location.findUnique({ where: { cityId_slug: { cityId: cityData.id, slug } } })
  if (location) {
    const arrivalTime = getArrivalTime(31.6295, -7.9811, location.latitude, location.longitude)
    const title = generateMetaTitle({ locale, locationName: location.name, page: "location" })
    const description = generateMetaDescription({ locale, locationName: location.name, arrivalTime, page: "location" })
    return { title, description, openGraph: generateOpenGraph({ locale, title, description }), alternates: { canonical, languages } }
  }

  const svc = await prisma.locksmithService.findUnique({ where: { slug: resolveServiceSlug(slug) } })
  if (svc) {
    const name = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
    const title = generateMetaTitle({ locale, serviceName: name, locationName: cityData.name, page: "service" })
    const description = generateMetaDescription({ locale, serviceName: name, locationName: cityData.name, page: "service" })
    return { title, description, openGraph: generateOpenGraph({ locale, title, description }), alternates: { canonical, languages } }
  }
  return {}
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string }>
}) {
  const { locale, city, slug } = await params
  let cityData = await prisma.city.findUnique({ where: { slug: city } })
  if (!cityData) cityData = await prisma.city.findUnique({ where: { slug: "marrakech" } })
  if (!cityData) notFound()

  const location = await prisma.location.findUnique({
    where: { cityId_slug: { cityId: cityData.id, slug } },
    include: { children: { take: 20, orderBy: { name: "asc" } } },
  })
  const svc = location ? null : await prisma.locksmithService.findUnique({ where: { slug: resolveServiceSlug(slug) } })
  if (!location && !svc) notFound()

  if (svc) {
    const serviceName = locale === "ar" ? svc.nameAr : locale === "en" ? svc.nameEn : svc.nameFr
    const serviceIntro = generateServiceIntro(locale, serviceName, cityData.name)
    const allServices = await prisma.locksmithService.findMany({ take: 10, orderBy: { nameFr: "asc" }, where: { id: { not: svc.id } } })
    const arrivalTime = getArrivalTime(31.6295, -7.9811, cityData.latitude, cityData.longitude)
    const priceFrom = svc.priceFrom || 150
    const faqItems = generateServiceFAQ(locale, serviceName, cityData.name, arrivalTime, priceFrom)
    const smartFAQs = isSmartLockSlug(svc.slug) ? getSmartLockFAQ(locale as "fr" | "ar" | "en", serviceName, cityData.name) : []
    const priceItems = [{ service: serviceName, priceFrom, priceTo: priceFrom * 2 }]
    const estimatorServices = [
      { slug: svc.slug, name: serviceName, priceFrom: svc.priceFrom },
      ...allServices.map((s) => ({
        slug: s.slug,
        name: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr,
        priceFrom: s.priceFrom,
      })),
    ]

    return (
      <div className="container py-8">
        <Breadcrumbs items={[{ label: cityData.name, href: `/${locale}/${cityData.slug}` }, { label: serviceName }]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{serviceName} {cityData.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary"><MapPin className="h-3 w-3 mr-1" /> {cityData.name}</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> {locale === "ar" ? "وصول ~" : locale === "en" ? "Arrival ~" : "Arrivée ~"}{arrivalTime} min</Badge>
              <Badge variant="success">24h/24 - 7j/7</Badge>
            </div>
            <p className="text-muted-foreground mb-6">{serviceIntro}</p>
            <EmergencyCTA locationName={cityData.name} locale={locale} />
          </div>
          <div className="lg:col-span-1">
            <LocationMap center={[cityData.latitude, cityData.longitude]} zoom={12} markers={[{ lat: cityData.latitude, lng: cityData.longitude, title: cityData.name }]} className="h-[250px]" />
          </div>
        </div>
        <section className="mb-12"><PriceGuide items={priceItems} locale={locale} /></section>
        <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PriceEstimator services={estimatorServices} locale={locale} locationName={cityData.name} />
          </div>
          <div>
            <LeadCapture locale={locale} locationSlug={cityData.slug} serviceName={serviceName} />
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">{locale === "ar" ? "خدمات ذات صلة" : locale === "en" ? "Related services" : "Services associés"}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allServices.map((s) => (
              <Link key={s.id} href={`/${locale}/${cityData.slug}/${s.slug}`} className="text-sm hover:text-primary p-3 rounded border hover:bg-muted transition-colors">
                {locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr}
              </Link>
            ))}
          </div>
        </section>
        {isSmartLockSlug(svc.slug) && <SmartLockContent locale={locale as "fr" | "ar" | "en"} locationName={cityData.name} />}
        <section className="mb-12"><FAQSection items={[...faqItems, ...smartFAQs]} title={locale === "ar" ? `أسئلة شائعة عن ${serviceName} في ${cityData.name}` : locale === "en" ? `FAQ about ${serviceName} in ${cityData.name}` : `FAQ ${serviceName} à ${cityData.name}`} /></section>
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
  const locationSections = generateLocationSections(locale, location!.name, arrivalTime, location!.arrondissement)

  const locationReviews = await prisma.review.findMany({
    where: { locationId: location!.id, isApproved: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  const priceItems = services.slice(0, 10).map((s) => ({
    service: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr,
    priceFrom: s.priceFrom || 150, priceTo: s.priceFrom ? s.priceFrom * 2 : 350,
  }))

  const faqItems = [
    { question: locale === "ar" ? `ما هي مدة تدخلكم في ${location!.name}؟` : locale === "en" ? `What is your response time in ${location!.name}?` : `Quels sont vos délais d'intervention à ${location!.name} ?`, answer: locale === "ar" ? `نتدخل عادة في غضون ${arrivalTime} دقيقة في حي ${location!.name}، 24 ساعة طوال أيام الأسبوع، بما في ذلك أيام العطل.` : locale === "en" ? `We usually respond within ${arrivalTime} minutes in ${location!.name}, 24/7, including holidays.` : `Nous intervenons généralement en ${arrivalTime} minutes dans le quartier ${location!.name}, 24h/24 et 7j/7, y compris les jours fériés.` },
    { question: locale === "ar" ? `ما هي خدمات السراجة التي تقدمونها في ${location!.name}؟` : locale === "en" ? `Which locksmith services do you offer in ${location!.name}?` : `Quels services de serrurerie proposez-vous à ${location!.name} ?`, answer: locale === "ar" ? `نقدم جميع أنواع خدمات السراجة في ${location!.name}: فتح الأبواب، تغيير الأقفال، تدريع الأبواب، نسخ المفاتيح، سراجة السيارات والمزيد.` : locale === "en" ? `We offer all types of locksmith services in ${location!.name}: door opening, lock replacement, door reinforcement, key copying, car locksmith and much more.` : `Nous proposons tous types de services de serrurerie à ${location!.name} : ouverture de porte, changement de serrure, blindage de porte, copie de clés, serrurerie automobile et bien plus encore.` },
    { question: locale === "ar" ? `هل تقدمون خدمة الطوارئ في ${location!.name}؟` : locale === "en" ? `Do you offer an emergency service in ${location!.name}?` : `Proposez-vous un service d'urgence à ${location!.name} ?`, answer: locale === "ar" ? `نعم، نضمن خدمة طوارئ 24 ساعة في حي ${location!.name}. تدخل سريع خلال ${arrivalTime} دقيقة.` : locale === "en" ? `Yes, we provide 24-hour emergency service in ${location!.name}. Fast response within ${arrivalTime} minutes.` : `Oui, nous assurons un service d'urgence 24h/24 dans le quartier ${location!.name}. Intervention rapide en ${arrivalTime} minutes.` },
    { question: locale === "ar" ? `هل التقدير مجاني في ${location!.name}؟` : locale === "en" ? `Is the quote free in ${location!.name}?` : `Le devis est-il gratuit à ${location!.name} ?`, answer: locale === "ar" ? "نعم، نقدم تقديراً مجانياً وبدون التزام لجميع خدماتنا في السراجة." : locale === "en" ? "Yes, we offer a free and no-obligation quote for all our locksmith services." : "Oui, nous offrons un devis gratuit et sans engagement pour toutes nos prestations de serrurerie." },
    { question: locale === "ar" ? `هل تتدخلون يوم الأحد والأعياد في ${location!.name}؟` : locale === "en" ? `Do you work on Sundays and holidays in ${location!.name}?` : `Intervenez-vous le dimanche et les jours fériés à ${location!.name} ?`, answer: locale === "ar" ? `نعم، نحن متاحون 7 أيام في الأسبوع في ${location!.name}، بما في ذلك أيام الأحد والأعياد، دون أي زيادة في السعر.` : locale === "en" ? `Yes, we are available 7 days a week in ${location!.name}, including Sundays and holidays, with no price surcharge.` : `Oui, nous sommes disponibles 7j/7 dans le quartier ${location!.name}, y compris les dimanches et jours fériés, sans supplément de prix.` },
    { question: locale === "ar" ? `كيف يتم الدفع مقابل خدماتكم في ${location!.name}؟` : locale === "en" ? `How do I pay for your services in ${location!.name}?` : `Comment payer vos services à ${location!.name} ?`, answer: locale === "ar" ? "الدفع في نهاية التدخل نقدًا أو بالتحويل، والسعر مؤكد قبل بدء العمل." : locale === "en" ? "Payment at the end of the intervention, in cash or by bank transfer, with the price confirmed before work begins." : "Paiement à la fin de l'intervention, en espèces ou par virement, avec un prix confirmé avant le début des travaux." },
  ]

  const localBusinessSchema = buildLocalBusinessSchema({
    name: `Serrurier ${location!.name} Marrakech`,
    description: `Service de serrurerie professionnel dans le quartier ${location!.name} à Marrakech`,
    url: `https://www.serruriermarrakech.ma/marrakech/${slug}`,
    telephone: "+212715758801",
    address: { addressLocality: `${location!.name}, Marrakech` },
    geo: { latitude: location!.latitude, longitude: location!.longitude },
    areaServed: [location!.name, ...nearbyLocations.map(l => l.name)],
    aggregateRating: undefined,
  })

  const breadcrumbSchema = buildBreadcrumbSchema({
    items: [
      { label: locale === "ar" ? "الرئيسية" : locale === "en" ? "Home" : "Accueil", url: `https://www.serruriermarrakech.ma/${locale}` },
      { label: cityData.name, url: `https://www.serruriermarrakech.ma/${locale}/${cityData.slug}` },
      { label: location!.name },
    ],
  })

  const faqTitle = locale === "ar" ? `أسئلة شائعة عن السراج في ${location!.name}` : locale === "en" ? `FAQ about the locksmith in ${location!.name}` : `FAQ serrurier ${location!.name} Marrakech`

  return (
    <>
      <SchemaOrg schema={localBusinessSchema} />
      <SchemaOrg schema={buildFAQSchema({ items: faqItems })} />
      <SchemaOrg schema={breadcrumbSchema} />
      <div className="container py-8">
        <Breadcrumbs items={[{ label: "Marrakech", href: `/${locale}/marrakech` }, { label: location!.name }]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{locale === "ar" ? `سراج ${location!.name} مراكش` : locale === "en" ? `Locksmith ${location!.name} Marrakech` : `Serrurier ${location!.name} Marrakech`}</h1>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary"><MapPin className="h-3 w-3 mr-1" /> {location!.arrondissement || "Marrakech"}</Badge>
              <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> {locale === "ar" ? "وصول ~" : locale === "en" ? "Arrival ~" : "Arrivée ~"}{arrivalTime} min</Badge>
              {location!.postalCode && <Badge variant="outline">{locale === "ar" ? "الرمز البريدي:" : locale === "en" ? "Postal code:" : "Code postal:"} {location!.postalCode}</Badge>}
            </div>
            <p className="text-muted-foreground mb-6">{introText}</p>
            <EmergencyCTA locationName={location!.name} locale={locale} />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <LocationMap
              center={[location!.latitude, location!.longitude]}
              zoom={15}
              markers={[{ lat: location!.latitude, lng: location!.longitude, title: location!.name }]}
              className="h-[300px]"
              locateUser
            />
            <PriceEstimator services={mappedServices} locale={locale} locationName={location!.name} />
            <LeadCapture locale={locale} locationSlug={location!.slug} />
          </div>
        </div>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{locationSections.h2}</h2>
          {locationSections.h3s.map((h3, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{h3.title}</h3>
              {h3.paragraphs.map((p, j) => (
                <p key={j} className="text-muted-foreground mb-2">{p}</p>
              ))}
            </div>
          ))}
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{locale === "ar" ? `خدماتنا في ${location!.name}` : locale === "en" ? `Our services in ${location!.name}` : `Nos services à ${location!.name}`}</h2>
          <ServiceList services={mappedServices} locationSlug={slug} locale={locale} />
        </section>
        <section className="mb-12"><PriceGuide items={priceItems} locale={locale} /></section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{locale === "ar" ? "آراء العملاء" : locale === "en" ? "Customer reviews" : "Avis clients"}</h2>
          <ReviewList reviews={locationReviews} locale={locale} />
          <div className="mt-8">
            <ReviewForm locationId={location!.id} locale={locale} />
          </div>
        </section>
        {nearbyLocations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{locale === "ar" ? `أحياء قريبة من ${location!.name}` : locale === "en" ? `Districts near ${location!.name}` : `Quartiers à proximité de ${location!.name}`}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {nearbyLocations.map((loc) => (
                <Link key={loc.id} href={`/${locale}/marrakech/${loc.slug}`} className="text-sm hover:text-primary p-2 rounded hover:bg-muted transition-colors border">{loc.name}</Link>
              ))}
            </div>
          </section>
        )}
        <section className="mb-12"><FAQSection items={faqItems} title={faqTitle} /></section>
      </div>
    </>
  )
}

export const revalidate = 3600
