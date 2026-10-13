import { getTranslations } from "next-intl/server"
import { ContactForm } from "@/components/locksmith/ContactForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return {
    title: locale === "ar" ? "اتصل بنا" : locale === "en" ? "Contact Us" : "Contactez-nous",
    description: locale === "ar" ? "تواصل مع فريق السراجين المحترفين في مراكش. تقدير مجاني. تدخل سريع 7 أيام في الأسبوع." : locale === "en" ? "Contact our team of professional locksmiths in Marrakech. Free quote. Fast response 7 days a week." : "Contactez notre équipe de serruriers professionnels à Marrakech. Devis gratuit. Intervention rapide 7j/7.",
    alternates: {
      canonical: `https://www.serruriermarrakech.ma/${locale}/contact`,
      languages: { fr: "https://www.serruriermarrakech.ma/fr/contact", ar: "https://www.serruriermarrakech.ma/ar/contact", en: "https://www.serruriermarrakech.ma/en/contact", "x-default": "https://www.serruriermarrakech.ma/fr/contact" },
    },
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = (fr: string, ar: string, en: string) => (locale === "ar" ? ar : locale === "en" ? en : fr)

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-center mb-2">{t("Contactez-nous", "اتصل بنا", "Contact us")}</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
        {t("Besoin d'un serrurier à Marrakech ? Appelez-nous ou envoyez-nous un message. Intervention rapide 7j/7.", "هل تحتاج إلى سراج في مراكش؟ اتصل بنا أو أرسل لنا رسالة. تدخل سريع 7 أيام في الأسبوع.", "Need a locksmith in Marrakech? Call us or send us a message. Fast response 7 days a week.")}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="lg:col-span-2">
          <ContactForm locale={locale} />
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("Nos coordonnées", "معلومات الاتصال", "Our contact details")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t("Téléphone", "الهاتف", "Phone")}</p>
                  <a href="tel:+212715758801" className="text-sm text-primary hover:underline">+212 715-758801</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t("Email", "البريد الإلكتروني", "Email")}</p>
                  <a href="mailto:contact@serruiermarrakech.ma" className="text-sm text-primary hover:underline">contact@serruiermarrakech.ma</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t("Adresse", "العنوان", "Address")}</p>
                  <p className="text-sm text-muted-foreground">Marrakech, Maroc</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{t("Horaires", "ساعات العمل", "Opening hours")}</p>
                  <p className="text-sm text-muted-foreground">24h/24 - 7j/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export const revalidate = 3600
