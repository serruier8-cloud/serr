import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/prisma"
import { generateMetaTitle, generateMetaDescription, generateOpenGraph, generateHreflang } from "@/lib/seo"
import { SchemaOrg } from "@/components/locksmith/SchemaOrg"
import { buildLocalBusinessSchema } from "@/components/locksmith/RichSchema"
import { HeroSection } from "@/components/home/HeroSection"
import { StatsSection } from "@/components/home/StatsSection"
import { ServiceSection } from "@/components/home/ServiceSection"
import { QuartierSection } from "@/components/home/QuartierSection"
import { WhyChooseSection } from "@/components/home/WhyChooseSection"
import { FAQSectionWrapper } from "@/components/home/FAQSectionWrapper"
import { EmergencySection } from "@/components/home/EmergencySection"
import { SmartLockSection } from "@/components/home/SmartLockSection"
import { HowItWorksSection } from "@/components/home/HowItWorksSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { FeatureSplitSection } from "@/components/home/FeatureSplitSection"
import { BrandsMarquee } from "@/components/home/BrandsMarquee"
import { CTASection } from "@/components/home/CTASection"
import { LastLocationBanner } from "@/components/search/LastLocationBanner"

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
    openGraph: generateOpenGraph({ locale, title, description, url: "https://www.serruriermarrakech.ma" }),
    alternates: {
      canonical: `https://www.serruriermarrakech.ma/${locale}`,
      languages: generateHreflang(""),
    },
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
    url: "https://www.serruriermarrakech.ma",
    telephone: "+212715758801",
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

      <LastLocationBanner locale={locale} />

      <StatsSection locale={locale as "fr" | "ar" | "en"} />

      <ServiceSection services={mappedServices} locale={locale} title={t("allServices")} />

      <SmartLockSection locale={locale as "fr" | "ar" | "en"} />

      <FeatureSplitSection locale={locale as "fr" | "ar" | "en"} />

      <QuartierSection quartiers={POPULAR_QUARTIERS} locale={locale} title={t("popularQuartiers")} />

      <HowItWorksSection locale={locale as "fr" | "ar" | "en"} />

      <WhyChooseSection items={whyChooseItems} title={t("whyChooseUs")} subtitle={t("whyChooseUsDesc")} />

      <TestimonialsSection locale={locale as "fr" | "ar" | "en"} />

      <BrandsMarquee locale={locale as "fr" | "ar" | "en"} />

      <FAQSectionWrapper
        locale={locale as "fr" | "ar" | "en"}
        items={[
          { question: locale === "ar" ? "ما هي مدة تدخلكم في مراكش؟" : locale === "en" ? "What is your response time in Marrakech?" : "Quels sont vos délais d'intervention à Marrakech ?", answer: locale === "ar" ? "نتدخل عادة في غضون 30 دقيقة في جميع أنحاء مراكش، 24 ساعة طوال أيام الأسبوع. يغطي شبكة السراجين لدينا جميع أحياء المدينة." : locale === "en" ? "We usually respond within 30 minutes across Marrakech, 24/7. Our locksmith network covers all districts of the city." : "Nous intervenons généralement en 30 minutes dans tout Marrakech, 24h/24 et 7j/7. Notre réseau de serruriers couvre l'ensemble des quartiers de la ville." },
          { question: locale === "ar" ? "هل تقدمون تقديراً مجانياً؟" : locale === "en" ? "Do you offer a free quote?" : "Proposez-vous un devis gratuit ?", answer: locale === "ar" ? "نعم، نقدم تقديراً مجانياً وبدون التزام لجميع خدماتنا في السراجة بمراكش." : locale === "en" ? "Yes, we offer a free and no-obligation quote for all our locksmith services in Marrakech." : "Oui, nous offrons un devis gratuit et sans engagement pour toutes nos prestations de serrurerie à Marrakech." },
          { question: locale === "ar" ? "ما هي طرق الدفع المقبولة؟" : locale === "en" ? "Which payment methods do you accept?" : "Quels modes de paiement acceptez-vous ?", answer: locale === "ar" ? "نقبل الدفع نقداً وبالبطاقات البنكية والتحويلات. يتم الدفع بعد التدخل." : locale === "en" ? "We accept cash, bank cards and transfers. Payment is made after the intervention." : "Nous acceptons les espèces, les cartes bancaires et les virements. Le paiement s'effectue après l'intervention." },
          { question: locale === "ar" ? "هل تتدخلون في جميع أحياء مراكش؟" : locale === "en" ? "Do you operate in all districts of Marrakech?" : "Intervenez-vous dans tous les quartiers de Marrakech ?", answer: locale === "ar" ? "نعم، نغطي مراكش بأكملها وضواحيها: المسيرة، المحاميد، جيليز، المدينة القديمة، الداوديات، تركة، العامريش، النخيل وأكثر من 600 حي." : locale === "en" ? "Yes, we cover all of Marrakech and its surroundings: Massira, Mhamid, Gueliz, Médina, Daoudiate, Targa, Amerchich, Palmeraie and more than 600 districts." : "Oui, nous couvrons l'ensemble de Marrakech et ses environs : Massira, Mhamid, Gueliz, Médina, Daoudiate, Targa, Amerchich, Palmeraie et plus de 600 quartiers." },
          { question: locale === "ar" ? "هل تتوفرون في أيام العطل؟" : locale === "en" ? "Are you available on holidays?" : "Êtes-vous disponibles les jours fériés ?", answer: locale === "ar" ? "نعم، نحن متوفرون طوال أيام الأسبوع بما في ذلك أيام العطل وعطلات نهاية الأسبوع والليل. تعمل خدمة الطوارئ لدينا على مدار الساعة." : locale === "en" ? "Yes, we are available 7 days a week including holidays, weekends and nights. Our emergency service operates 24/7." : "Oui, nous sommes disponibles 7j/7 y compris les jours fériés, les week-ends et la nuit. Notre service d'urgence fonctionne 24h/24." },
        ]}
        title={locale === "ar" ? "أسئلة شائعة" : locale === "en" ? "Frequently asked questions" : "Questions fréquentes"}
      />

      <CTASection locale={locale as "fr" | "ar" | "en"} />

      <EmergencySection locale={locale as "fr" | "ar" | "en"} />
    </>
  )
}

export const revalidate = 3600
