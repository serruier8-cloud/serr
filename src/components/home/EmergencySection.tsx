"use client"

import { motion } from "motion/react"
import { Phone, AlarmClock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EmergencySection({ locale }: { locale: "fr" | "ar" | "en" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="container py-20"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(1_0_0/0.1),transparent)]" />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="bg-white/15 rounded-2xl p-4 hidden md:block">
              <AlarmClock className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                {locale === "ar" ? "حالة سراجية طارئة؟" : locale === "en" ? "Locksmith emergency?" : "Urgence serrurerie ?"}
              </h3>
              <p className="text-white/80 mt-1">
                {locale === "ar" ? "تدخل سريع في 30 دقيقة - 7 أيام في الأسبوع - تقدير مجاني" : locale === "en" ? "Fast response in 30 minutes - 7 days a week - Free quote" : "Intervention rapide en 30 minutes - 7j/7 - Devis gratuit"}
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> {locale === "ar" ? "خدمة 24 ساعة" : locale === "en" ? "24h/24 service" : "Service 24h/24"}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {locale === "ar" ? "تقدير مجاني" : locale === "en" ? "Free quote" : "Devis gratuit"}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="tel:+212715758801">
              <Button size="xl" className="bg-white text-red-600 hover:bg-red-50 hover:shadow-xl gap-2 shadow-lg">
                <Phone className="h-5 w-5" />
                {locale === "ar" ? "اتصل بالطوارئ" : locale === "en" ? "Call emergency" : "Appeler l'urgence"}
              </Button>
            </Link>
            <Link href="https://wa.me/212715758801" target="_blank">
              <Button size="xl" variant="whatsapp" className="gap-2 shadow-lg">
                WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
