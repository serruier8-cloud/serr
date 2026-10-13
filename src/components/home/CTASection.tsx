"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Phone, MessageCircle, ShieldCheck, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateInView } from "@/components/motion/AnimateInView"

interface CTASectionProps {
  locale: "fr" | "ar" | "en"
}

export function CTASection({ locale }: CTASectionProps) {
  const title = locale === "ar"
    ? "هل تحتاج إلى سراج الآن؟"
    : locale === "en"
    ? "Need a locksmith right now?"
    : "Besoin d'un serrurier maintenant ?"
  const subtitle = locale === "ar"
    ? "فريقنا في خدمتك 24/7. تدخل في أقل من 30 دقيقة في جميع أنحاء مراكش."
    : locale === "en"
    ? "Our team is at your service 24/7. Response in under 30 minutes across Marrakech."
    : "Notre équipe est à votre service 24h/24. Intervention en moins de 30 minutes partout à Marrakech."
  const callLabel = locale === "ar" ? "اتصل الآن" : locale === "en" ? "Call now" : "Appeler maintenant"
  const waLabel = locale === "ar" ? "راسلنا على واتساب" : locale === "en" ? "WhatsApp us" : "WhatsApp"

  const items = [
    { icon: Clock, label: locale === "ar" ? "30 دقيقة" : locale === "en" ? "30 minutes" : "30 minutes" },
    { icon: ShieldCheck, label: locale === "ar" ? "ضمان العمل" : locale === "en" ? "Guaranteed work" : "Travail garanti" },
    { icon: MapPin, label: locale === "ar" ? "كل الأحياء" : locale === "en" ? "All districts" : "Tous les quartiers" },
  ]

  return (
    <section className="container py-20">
      <AnimateInView>
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 md:p-16 text-center shadow-2xl shadow-primary/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,oklch(0.65_0.15_255/0.15),transparent)]" />
          <motion.div
            aria-hidden
            animate={{ y: [0, -25, 0], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-gold/20 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, 25, 0], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
          />

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">{title}</h2>
            <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8">{subtitle}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Link href="tel:+212715758801">
                <Button size="xl" className="gap-2 bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/20">
                  <Phone className="h-5 w-5" />
                  {callLabel}
                </Button>
              </Link>
              <Link href="https://wa.me/212715758801" target="_blank">
                <Button size="xl" variant="whatsapp" className="gap-2 shadow-lg">
                  <MessageCircle className="h-5 w-5" />
                  {waLabel}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 text-white/80 text-sm"
                >
                  <item.icon className="h-4 w-4 text-gold-light" />
                  {item.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimateInView>
    </section>
  )
}
