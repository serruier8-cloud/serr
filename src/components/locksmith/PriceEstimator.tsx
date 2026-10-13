"use client"

import { useMemo, useState } from "react"
import { Calculator, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export interface EstimatorService {
  slug: string
  name: string
  priceFrom: number | null | undefined
}

const DOOR_TYPES = [
  { id: "standard", factor: 1 },
  { id: "reinforced", factor: 1.4 },
  { id: "metal", factor: 1.6 },
  { id: "emergency", factor: 1.3 },
]

export function PriceEstimator({ services, locale = "fr", locationName }: { services: EstimatorService[]; locale?: string; locationName?: string }) {
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug || "")
  const [doorType, setDoorType] = useState("standard")

  const service = services.find((s) => s.slug === serviceSlug)
  const estimate = useMemo(() => {
    if (!service?.priceFrom) return null
    const factor = DOOR_TYPES.find((d) => d.id === doorType)?.factor || 1
    return {
      from: Math.round(service.priceFrom * factor),
      to: Math.round(service.priceFrom * factor * 2),
    }
  }, [service, doorType])

  const waMessage = encodeURIComponent(
    locale === "ar"
      ? `مرحباً، أريد تقديراً لخدمة ${service?.name || ""}${locationName ? ` في ${locationName}` : " في مراكش"}.`
      : locale === "en"
      ? `Hello, I'd like a quote for ${service?.name || ""}${locationName ? ` in ${locationName}` : " in Marrakech"}.`
      : `Bonjour, je souhaite un devis pour ${service?.name || ""}${locationName ? ` à ${locationName}` : " à Marrakech"}.`
  )

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          {locale === "ar" ? "تقدير فوري للأسعار" : locale === "en" ? "Instant price estimate" : "Estimation de prix instantanée"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {locale === "ar"
            ? "احصل على فكرة عن تكلفة التدخل قبل الاتصال"
            : locale === "en"
            ? "Get an idea of the intervention cost before calling"
            : "Ayez une idée du coût d'intervention avant d'appeler"}
        </p>

        <label className="block text-sm font-medium mb-1.5">
          {locale === "ar" ? "الخدمة" : locale === "en" ? "Service" : "Service"}
        </label>
        <select
          value={serviceSlug}
          onChange={(e) => setServiceSlug(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3"
        >
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>

        <label className="block text-sm font-medium mb-1.5">
          {locale === "ar" ? "نوع الباب" : locale === "en" ? "Door type" : "Type de porte"}
        </label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {DOOR_TYPES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDoorType(d.id)}
              className={`rounded-md border px-3 py-2 text-sm transition-colors ${doorType === d.id ? "border-primary bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}
            >
              {locale === "ar"
                ? (d.id === "standard" ? "عادية" : d.id === "reinforced" ? "مقواة" : d.id === "metal" ? "معدنية" : "طوارئ")
                : locale === "en"
                ? (d.id === "standard" ? "Standard" : d.id === "reinforced" ? "Reinforced" : d.id === "metal" ? "Metal" : "Emergency")
                : (d.id === "standard" ? "Standard" : d.id === "reinforced" ? "Blindée" : d.id === "metal" ? "Métallique" : "Urgence")}
            </button>
          ))}
        </div>

        {estimate && (
          <div className="rounded-lg bg-muted/50 p-4 mb-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{locale === "ar" ? "النطاق التقديري" : locale === "en" ? "Estimated range" : "Fourchette estimée"}</p>
            <p className="text-2xl font-bold text-primary">
              {estimate.from} - {estimate.to} MAD
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === "ar"
                ? "يعتمد السعر النهائي على الوضع. تقدير مجاني عند الاتصال."
                : locale === "en"
                ? "Final price depends on the situation. Free quote on call."
                : "Prix final selon la situation. Devis gratuit au téléphone."}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <a href="tel:+212715758801">
            <Button className="w-full gap-2">
              <Phone className="h-4 w-4" />
              {locale === "ar" ? "اتصال" : locale === "en" ? "Call" : "Appeler"}
            </Button>
          </a>
          <a href={`https://wa.me/212715758801?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" className="w-full gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
