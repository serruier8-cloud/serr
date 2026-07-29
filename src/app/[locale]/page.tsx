import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/prisma"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph } from "@/lib/seo"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { buildLocalBusinessSchema } from "@/components/locksmith/RichSchema"
import { HeroSection } from "@/components/home/HeroSection"
import { StatsSection } from "@/components/home/StatsSection"
import { ServiceSection } from "@/components/home/ServiceSection"
import { QuartierSection } from "@/components/home/QuartierSection"
import { WhyChooseSection } from "@/components/home/WhyChooseSection"
import { FAQSectionWrapper } from "@/components/home/FAQSectionWrapper"
import { EmergencySection } from "@/components/home/EmergencySection"

const POPULAR_QUARTIERS = [
  { name: "Massira 1", slug: "massira-1" },
  { name: "Mhamid", slug: "mhamid" },
  { name: "Targa", slug: "targa" },
  { name: "Daoudiate", slug: "daoudiate" },
  { name: "Amerchich", slug: "amerchich" },
  { name: "Semlalia", slug: "semlalia" },
  { name: "Palmeraie", slug: "palmeraie" },
  { name: "Hay Hassani", slug: "hay-hassani" },
  { name: "Gueliz", slug: "gueliz" },
  { name: "Médina", slug: "medina" },
  { name: "Sidi Youssef", slug: "sidi-youssef-ben-ali" },
  { name: "Ennakhil", slug: "ennakhil" },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const title = generateMetaTitle({ locale, page: "home" })
  const description = generateMetaDescription({ locale, page: "home" })
  return {
    title,
    description,
    openGraph: generateOpenGraph({ locale, title, description, url: "https://serruiermarrakech.ma" }),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home" })
  const services = await prisma.locksmithService.findMany({
    take: 12,
    orderBy: { nameFr: "asc" },
    select: { slug: true, nameFr: true, nameAr: true, nameEn: true, priceFrom: true, descriptionFr: true, descriptionAr: true, descriptionEn: true },
  })

  const mappedServices = services.map((s) => ({
    slug: s.slug,
    name: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr,
    description: (locale === "ar" ? s.descriptionAr : locale === "en" ? s.descriptionEn : s.descriptionFr)?.slice(0, 120) || undefined,
    priceFrom: s.priceFrom ?? undefined,
  }))

  const city = await prisma.city.findFirst({ where: { slug: "marrakech" } })
  const locationCount = await prisma.location.count({ where: { cityId: city?.id } })
  const locksmithCount = await prisma.locksmith.count()
  const serviceCount = await prisma.locksmithService.count()

  const localBusinessSchema = buildLocalBusinessSchema({
    name: "Serrurier Marrakech",
    description: "Service de serrurerie professionnel à Marrakech. Intervention rapide 30 min. Devis gratuit. 7j/7.",
    url: "https://serruiermarrakech.ma",
    telephone: "+212600000000",
    address: { addressLocality: "Marrakech, Maroc" },
    geo: { latitude: 31.6295, longitude: -7.9811 },
    priceRange: "$$",
    openingHours: [],
    aggregateRating: { ratingValue: 4.8, reviewCount: 150 },
    areaServed: ["Marrakech"],
  })

  const whyChooseItems = [
    { title: t("fastIntervention"), desc: t("fastInterventionDesc"), icon: "Clock" },
    { title: t("bestPrices"), desc: t("bestPricesDesc"), icon: "Shield" },
    { title: t("certified"), desc: t("certifiedDesc"), icon: "Star" },
    { title: t("available247"), desc: t("available247Desc"), icon: "Phone" },
  ]

  return (
    <>
      <SchemaOrg schema={localBusinessSchema} />

      <HeroSection
        locale={locale}
        heroTitle={t("heroTitle")}
        heroSubtitle={t("heroSubtitle")}
        info={`${serviceCount} services · ${locationCount} quartiers · ${locksmithCount} serruriers partenaires`}
      />

      <StatsSection />

      <ServiceSection services={mappedServices} locale={locale} title={t("allServices")} />

      <QuartierSection quartiers={POPULAR_QUARTIERS} locale={locale} title={t("popularQuartiers")} />

      <WhyChooseSection items={whyChooseItems} title={t("whyChooseUs")} subtitle={t("whyChooseUsDesc")} />

      <FAQSectionWrapper
        items={[
          { question: "Quels sont vos délais d'intervention à Marrakech ?", answer: "Nous intervenons généralement en 30 minutes dans tout Marrakech, 24h/24 et 7j/7. Notre réseau de serruriers couvre l'ensemble des quartiers de la ville." },
          { question: "Proposez-vous un devis gratuit ?", answer: "Oui, nous offrons un devis gratuit et sans engagement pour toutes nos prestations de serrurerie à Marrakech." },
          { question: "Quels modes de paiement acceptez-vous ?", answer: "Nous acceptons les espèces, les cartes bancaires et les virements. Le paiement s'effectue après l'intervention." },
          { question: "Intervenez-vous dans tous les quartiers de Marrakech ?", answer: "Oui, nous couvrons l'ensemble de Marrakech et ses environs : Massira, Mhamid, Gueliz, Médina, Daoudiate, Targa, Amerchich, Palmeraie et plus de 600 quartiers." },
          { question: "Êtes-vous disponibles les jours fériés ?", answer: "Oui, nous sommes disponibles 7j/7 y compris les jours fériés, les week-ends et la nuit. Notre service d'urgence fonctionne 24h/24." },
        ]}
        title="Questions fréquentes"
      />

      <EmergencySection />
    </>
  )
}

export const revalidate = 3600
