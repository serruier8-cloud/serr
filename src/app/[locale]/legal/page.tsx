import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return {
    title: locale === "ar" ? "الإشعارات القانونية" : locale === "en" ? "Legal Notices" : "Mentions légales",
    description: locale === "ar" ? "الإشعارات القانونية لموقع صانع أقفال مراكش." : locale === "en" ? "Legal notices of the Serrurier Marrakech website." : "Mentions légales du site Serrurier Marrakech.",
    alternates: {
      canonical: `https://www.serruriermarrakech.ma/${locale}/legal`,
      languages: { fr: "https://www.serruriermarrakech.ma/fr/legal", ar: "https://www.serruriermarrakech.ma/ar/legal", en: "https://www.serruriermarrakech.ma/en/legal", "x-default": "https://www.serruriermarrakech.ma/fr/legal" },
    },
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6 space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">{children}</div>
      </CardContent>
    </Card>
  )
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const content = {
    fr: {
      title: "Mentions légales",
      intro: "Le présent site est édité par Serrurier Marrakech, service de serrurerie professionnel opérant dans la ville de Marrakech, Maroc.",
      editor: "Éditeur du site",
      editorBody: "Serrurier Marrakech\nAdresse : Marrakech, Maroc\nTéléphone : +212 715-758801\nEmail : contact@serruiermarrakech.ma",
      hosting: "Hébergement",
      hostingBody: "Le site est hébergé sur l'infrastructure de Vercel Inc. (vercel.com).",
      director: "Directeur de la publication",
      directorBody: "Le directeur de la publication est le responsable éditorial du site Serrurier Marrakech.",
      liability: "Responsabilité",
      liabilityBody: "Serrurier Marrakech s'efforce d'assurer l'exactitude des informations publiées sur ce site. Les tarifs indiqués sont fournis à titre indicatif et peuvent varier selon la nature de l'intervention. Serrurier Marrakech ne saurait être tenu responsable en cas d'erreur, d'omission ou de modification des informations.",
      intellectualProperty: "Propriété intellectuelle",
      intellectualPropertyBody: "L'ensemble des contenus présents sur ce site (textes, images, logos, structure) est protégé par le droit d'auteur. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.",
      law: "Droit applicable",
      lawBody: "Le présent site est soumis au droit marocain. Tout litige relatif à son utilisation relève de la compétence des tribunaux de Marrakech.",
    },
    ar: {
      title: "الإشعارات القانونية",
      intro: "يتم نشر هذا الموقع من طرف صانع أقفال مراكش، خدمة سراج مهنية تعمل في مدينة مراكش، المغرب.",
      editor: "ناشر الموقع",
      editorBody: "صانع أقفال مراكش\nالعنوان: مراكش، المغرب\nالهاتف: +212 715-758801\nالبريد الإلكتروني: contact@serruiermarrakech.ma",
      hosting: "الاستضافة",
      hostingBody: "يتم استضافة الموقع على بنية Vercel Inc. التحتية (vercel.com).",
      director: "مدير النشر",
      directorBody: "مدير النشر هو المسؤول التحريري عن موقع صانع أقفال مراكش.",
      liability: "المسؤولية",
      liabilityBody: "يسعى صانع أقفال مراكش إلى ضمان دقة المعلومات المنشورة على هذا الموقع. الأسعار المعروضة استرشادية وقد تختلف حسب طبيعة التدخل. لا يتحمل صانع أقفال مراكش المسؤولية في حالة وجود خطأ أو حذف أو تعديل للمعلومات.",
      intellectualProperty: "الملكية الفكرية",
      intellectualPropertyBody: "جميع المحتويات الموجودة على هذا الموقع (نصوص، صور، شعارات، هيكل) محمية بموجب حقوق النشر. أي نسخ، حتى جزئي، دون إذن كتابي مسبق ممنوع.",
      law: "القانون المطبق",
      lawBody: "يخضع هذا الموقع للقانون المغربي. أي نزاع يتعلق باستخدامه يقع ضمن اختصاص محاكم مراكش.",
    },
    en: {
      title: "Legal Notices",
      intro: "This website is published by Serrurier Marrakech, a professional locksmith service operating in the city of Marrakech, Morocco.",
      editor: "Site publisher",
      editorBody: "Serrurier Marrakech\nAddress: Marrakech, Morocco\nPhone: +212 715-758801\nEmail: contact@serruiermarrakech.ma",
      hosting: "Hosting",
      hostingBody: "The website is hosted on Vercel Inc. infrastructure (vercel.com).",
      director: "Publication director",
      directorBody: "The publication director is the editorial manager of the Serrurier Marrakech website.",
      liability: "Liability",
      liabilityBody: "Serrurier Marrakech strives to ensure the accuracy of the information published on this website. Prices shown are indicative and may vary depending on the nature of the intervention. Serrurier Marrakech cannot be held responsible for any error, omission or modification of information.",
      intellectualProperty: "Intellectual property",
      intellectualPropertyBody: "All content on this website (texts, images, logos, structure) is protected by copyright. Any reproduction, even partial, without prior written authorization is prohibited.",
      law: "Applicable law",
      lawBody: "This website is subject to Moroccan law. Any dispute relating to its use falls within the jurisdiction of the courts of Marrakech.",
    },
  }[locale as "fr" | "ar" | "en"]

  return (
    <div className="container py-12 max-w-3xl">
      <Breadcrumbs items={[{ label: content.title }]} />
      <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
      <p className="text-muted-foreground mb-8">{content.intro}</p>
      <div className="space-y-6">
        <Section title={content.editor}>
          <p style={{ whiteSpace: "pre-line" }}>{content.editorBody}</p>
        </Section>
        <Section title={content.hosting}>
          <p>{content.hostingBody}</p>
        </Section>
        <Section title={content.director}>
          <p>{content.directorBody}</p>
        </Section>
        <Section title={content.liability}>
          <p>{content.liabilityBody}</p>
        </Section>
        <Section title={content.intellectualProperty}>
          <p>{content.intellectualPropertyBody}</p>
        </Section>
        <Section title={content.law}>
          <p>{content.lawBody}</p>
        </Section>
      </div>
    </div>
  )
}

export const revalidate = 3600
