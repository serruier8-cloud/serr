import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return {
    title: locale === "ar" ? "سياسة الخصوصية" : locale === "en" ? "Privacy Policy" : "Politique de confidentialité",
    description: locale === "ar" ? "سياسة الخصوصية لموقع صانع أقفال مراكش." : locale === "en" ? "Privacy policy of the Serrurier Marrakech website." : "Politique de confidentialité du site Serrurier Marrakech.",
    alternates: {
      canonical: `https://www.serruriermarrakech.ma/${locale}/privacy`,
      languages: { fr: "https://www.serruriermarrakech.ma/fr/privacy", ar: "https://www.serruriermarrakech.ma/ar/privacy", en: "https://www.serruriermarrakech.ma/en/privacy", "x-default": "https://www.serruriermarrakech.ma/fr/privacy" },
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

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const content = {
    fr: {
      title: "Politique de confidentialité",
      intro: "La présente politique de confidentialité décrit la manière dont Serrurier Marrakech collecte, utilise et protège les données personnelles des visiteurs de son site.",
      collect: "Données collectées",
      collectBody: "Nous collectons uniquement les informations que vous nous transmettez volontairement : nom, numéro de téléphone, adresse email et message lors d'une demande de devis ou de contact. Nous collectons également des données de navigation anonymisées (pages visitées, durée de visite) à des fins statistiques.",
      use: "Utilisation des données",
      useBody: "Les données collectées sont utilisées exclusivement pour répondre à vos demandes, établir des devis et améliorer la qualité de nos services. Elles ne sont jamais vendues ni cédées à des tiers.",
      cookies: "Cookies",
      cookiesBody: "Ce site peut utiliser des cookies de mesure d'audience et de préférences de langue. Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies.",
      rights: "Vos droits",
      rightsBody: "Conformément à la loi marocaine 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition sur vos données. Pour l'exercer, contactez-nous à : contact@serruiermarrakech.ma",
      contact: "Contact",
      contactBody: "Pour toute question relative à cette politique de confidentialité : contact@serruiermarrakech.ma ou +212 715-758801.",
    },
    ar: {
      title: "سياسة الخصوصية",
      intro: "تصف سياسة الخصوصية هذه كيفية جمع صانع أقفال مراكش واستخدامه وحمايته للبيانات الشخصية لزوار موقعه.",
      collect: "البيانات المجمعة",
      collectBody: "نجمع فقط المعلومات التي ترسلها إلينا طواعية: الاسم ورقم الهاتف والبريد الإلكتروني والرسالة عند طلب عرض سعر أو التواصل. كما نجمع بيانات تصفح مجهولة (الصفحات المزارة ومدة الزيارة) لأغراض إحصائية.",
      use: "استخدام البيانات",
      useBody: "تستخدم البيانات المجمعة حصرياً للرد على طلباتك وإعداد عروض الأسعار وتحسين جودة خدماتنا. لا يتم بيعها أو تحويلها أبداً إلى أطراف ثالثة.",
      cookies: "ملفات الارتباط",
      cookiesBody: "قد يستخدم هذا الموقع ملفات ارتباط لقياس الجمهور وتفضيلات اللغة. يمكنك في أي وقت إعداد متصفحك لرفض ملفات الارتباط.",
      rights: "حقوقك",
      rightsBody: "وفقاً للقانون المغربي 09-08 المتعلق بحماية الأشخاص الطبيعيين فيما يخص معالجة المعطيات ذات الطابع الشخصي، يحق لك الوصول إلى بياناتك وتصحيحها والاعتراض عليها. لممارسة ذلك، اتصل بنا على: contact@serruiermarrakech.ma",
      contact: "اتصل بنا",
      contactBody: "لأي سؤال يتعلق بسياسة الخصوصية هذه: contact@serruiermarrakech.ma أو +212 715-758801.",
    },
    en: {
      title: "Privacy Policy",
      intro: "This privacy policy describes how Serrurier Marrakech collects, uses and protects the personal data of visitors to its website.",
      collect: "Data collected",
      collectBody: "We only collect information you voluntarily provide: name, phone number, email address and message when requesting a quote or contacting us. We also collect anonymized browsing data (pages visited, visit duration) for statistical purposes.",
      use: "Use of data",
      useBody: "Collected data is used exclusively to respond to your requests, prepare quotes and improve the quality of our services. It is never sold or transferred to third parties.",
      cookies: "Cookies",
      cookiesBody: "This website may use cookies for audience measurement and language preferences. You can configure your browser to refuse cookies at any time.",
      rights: "Your rights",
      rightsBody: "In accordance with Moroccan law 09-08 on the protection of individuals with regard to the processing of personal data, you have the right to access, rectify and object to your data. To exercise this right, contact us at: contact@serruiermarrakech.ma",
      contact: "Contact",
      contactBody: "For any question relating to this privacy policy: contact@serruiermarrakech.ma or +212 715-758801.",
    },
  }[locale as "fr" | "ar" | "en"]

  return (
    <div className="container py-12 max-w-3xl">
      <Breadcrumbs items={[{ label: content.title }]} />
      <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
      <p className="text-muted-foreground mb-8">{content.intro}</p>
      <div className="space-y-6">
        <Section title={content.collect}>
          <p>{content.collectBody}</p>
        </Section>
        <Section title={content.use}>
          <p>{content.useBody}</p>
        </Section>
        <Section title={content.cookies}>
          <p>{content.cookiesBody}</p>
        </Section>
        <Section title={content.rights}>
          <p>{content.rightsBody}</p>
        </Section>
        <Section title={content.contact}>
          <p>{content.contactBody}</p>
        </Section>
      </div>
    </div>
  )
}

export const revalidate = 3600
