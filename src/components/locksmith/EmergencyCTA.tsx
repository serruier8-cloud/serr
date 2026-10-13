import Link from "next/link"
import { Phone, AlarmClock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EmergencyCTAProps {
  locationName?: string
  locale?: string
}

export function EmergencyCTA({ locationName, locale = "fr" }: EmergencyCTAProps) {
  const waMessage = encodeURIComponent(
    locationName
      ? locale === "ar"
        ? `مرحباً، أحتاج سراجاً في ${locationName}. هل يمكنكم التدخل؟`
        : locale === "en"
        ? `Hello, I need a locksmith in ${locationName}. Can you come?`
        : `Bonjour, j'ai besoin d'un serrurier à ${locationName}. Pouvez-vous intervenir ?`
      : locale === "ar"
      ? "مرحباً، أحتاج سراجاً في مراكش."
      : locale === "en"
      ? "Hello, I need a locksmith in Marrakech."
      : "Bonjour, j'ai besoin d'un serrurier à Marrakech."
  )
  return (
    <Card className="bg-red-600 text-white p-8 border-none">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-full p-3">
            <AlarmClock className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">
              {locationName
                ? locale === "ar" ? `حالة طارئة في ${locationName}؟` : locale === "en" ? `Emergency in ${locationName}?` : `Urgence à ${locationName} ?`
                : locale === "ar" ? "حالة سراجية طارئة؟" : locale === "en" ? "Locksmith emergency?" : "Urgence serrurerie ?"}
            </h3>
            <p className="text-red-100">
              {locale === "ar" ? "تدخل سريع في 30 دقيقة - 7 أيام في الأسبوع" : locale === "en" ? "Fast response in 30 minutes - 7 days a week" : "Intervention rapide en 30 minutes - 7j/7"}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="tel:+212715758801">
            <Button size="xl" className="bg-white text-red-600 hover:bg-red-50 gap-2">
              <Phone className="h-5 w-5" />
              {locale === "ar" ? "اتصل بالطوارئ" : locale === "en" ? "Call emergency" : "Appeler l'urgence"}
            </Button>
          </Link>
          <Link href={`https://wa.me/212715758801?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
            <Button size="xl" variant="whatsapp" className="gap-2">
              WhatsApp
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-6 mt-4 text-sm text-red-100 justify-center md:justify-start">
        <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> {locale === "ar" ? "خدمة 24 ساعة" : locale === "en" ? "24h/24 service" : "Service 24h/24"}</span>
        <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {locale === "ar" ? "تقدير مجاني" : locale === "en" ? "Free quote" : "Devis gratuit"}</span>
      </div>
    </Card>
  )
}
