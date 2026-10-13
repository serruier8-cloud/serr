import { prisma } from "@/lib/prisma"
import { ServiceList } from "@/components/locksmith/ServiceList"
import { EmergencyCTA } from "@/components/locksmith/EmergencyCTA"
import { PriceEstimator } from "@/components/locksmith/PriceEstimator"
import { LeadCapture } from "@/components/locksmith/LeadCapture"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { buildFAQSchema } from "@/components/locksmith/RichSchema"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const title = locale === "ar" ? "خدمات السراج في مراكش" : locale === "en" ? "Locksmith Services in Marrakech" : "Services de serrurerie à Marrakech"
  const description = locale === "ar"
    ? "جميع خدمات السراج في مراكش: فتح الأبواب، تغيير الأقفال، تركيب قفل ذكي والمزيد. تدخل سريع 7/7."
    : locale === "en"
    ? "All locksmith services in Marrakech: door opening, lock replacement, smart lock installation and more. Fast response 7/7."
    : "Tous nos services de serrurerie à Marrakech : ouverture de porte, changement de serrure, installation de serrure intelligente et plus. Intervention rapide 7j/7."
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.serruriermarrakech.ma/${locale}/services`,
      languages: { fr: "https://www.serruriermarrakech.ma/fr/services", ar: "https://www.serruriermarrakech.ma/ar/services", en: "https://www.serruriermarrakech.ma/en/services", "x-default": "https://www.serruriermarrakech.ma/fr/services" },
    },
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const services = await prisma.locksmithService.findMany({
    orderBy: { nameFr: "asc" },
  })

  const mappedServices = services.map((s) => ({
    slug: s.slug,
    name: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr,
    description: (locale === "ar" ? s.descriptionAr : locale === "en" ? s.descriptionEn : s.descriptionFr) ?? undefined,
    priceFrom: s.priceFrom ?? undefined,
  }))

  const faqItems = [
    { question: locale === "ar" ? "ما هي خدماتكم؟" : locale === "en" ? "What services do you offer?" : "Quels services proposez-vous ?", answer: locale === "ar" ? "نقدم جميع خدمات السراج في مراكش بما في ذلك فتح الأبواب وتغيير الأقفال وتركيب أقفال ذكية." : locale === "en" ? "We offer all locksmith services in Marrakech including door opening, lock replacement and smart lock installation." : "Nous proposons tous les services de serrurerie à Marrakech, y compris l'ouverture de porte, le changement de serrure et l'installation de serrures intelligentes." },
    { question: locale === "ar" ? "هل التدخل سريع؟" : locale === "en" ? "Is your response fast?" : "Votre intervention est-elle rapide ?", answer: locale === "ar" ? "نصل إلى موقعك عادة في غضون 30 دقيقة، 24 ساعة طوال أيام الأسبوع." : locale === "en" ? "We usually arrive within 30 minutes, 24 hours a day, 7 days a week." : "Nous arrivons généralement en 30 minutes, 24h/24 et 7j/7." },
    { question: locale === "ar" ? "هل التقدير مجاني؟" : locale === "en" ? "Is the quote free?" : "Le devis est-il gratuit ?", answer: locale === "ar" ? "نعم، نقدم تقديراً مجانياً وبدون التزام." : locale === "en" ? "Yes, we provide a free and no-obligation quote." : "Oui, nous offrons un devis gratuit et sans engagement." },
  ]

  return (
    <>
      <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "ItemList", name: locale === "ar" ? "خدمات السراج في مراكش" : locale === "en" ? "Locksmith Services in Marrakech" : "Services de serrurerie à Marrakech", itemListElement: mappedServices.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name })) }} />
      <SchemaOrg schema={buildFAQSchema({ items: faqItems })} />
      <div className="container py-8">
        <Breadcrumbs items={[{ label: locale === "ar" ? "خدماتنا" : locale === "en" ? "Services" : "Nos services" }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{locale === "ar" ? "خدمات السراج في مراكش" : locale === "en" ? "Locksmith Services in Marrakech" : "Services de serrurerie à Marrakech"}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {locale === "ar"
              ? "اكتشف جميع خدماتنا المهنية للسراج في مراكش، مع تدخل سريع في جميع الأحياء."
              : locale === "en"
              ? "Discover all our professional locksmith services in Marrakech, with fast response in every neighborhood."
              : "Découvrez tous nos services de serrurerie professionnels à Marrakech, avec intervention rapide dans tous les quartiers."}
          </p>
        </div>
        <div className="mb-8">
          <EmergencyCTA locationName="Marrakech" locale={locale} />
        </div>
        <section className="mb-8">
          <ServiceList services={mappedServices} locale={locale} />
        </section>
        <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PriceEstimator services={mappedServices} locale={locale} locationName="Marrakech" />
          </div>
          <div>
            <LeadCapture locale={locale} />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">{locale === "ar" ? "أسئلة شائعة" : locale === "en" ? "Frequently asked questions" : "Questions fréquentes"}</h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-lg border bg-card p-4">
                <p className="font-medium mb-1">{item.question}</p>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export const revalidate = 3600
