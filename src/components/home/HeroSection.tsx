"use client"

import { motion } from "motion/react"
import { Phone, MessageCircle, ShieldCheck, Clock, MapPin, Star, ChevronDown, Zap, Wrench } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/search/SearchBar"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  locale: string
  heroTitle: string
  heroSubtitle: string
  info: string
}

function FloatingBadge({
  className,
  icon: Icon,
  title,
  subtitle,
  delay,
  duration = 6,
}: {
  className: string
  icon: typeof Clock
  title: string
  subtitle: string
  delay: number
  duration?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`absolute z-10 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl shadow-black/10"
      >
        <div className="bg-primary/20 rounded-xl p-2.5">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="text-left">
          <p className="font-bold text-white text-sm leading-tight">{title}</p>
          <p className="text-white/70 text-xs">{subtitle}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function HeroSection({ locale, heroTitle, heroSubtitle, info }: HeroSectionProps) {
  return (
    <section className="gradient-hero text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.65_0.15_255/0.1),transparent)]" />

      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 0.35, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
        className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-gold/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
      />

      <FloatingBadge
        className="hidden xl:flex top-28 left-10"
        icon={Clock}
        title="Intervention 30 min"
        subtitle="Dans tout Marrakech"
        delay={0.7}
      />
      <FloatingBadge
        className="hidden xl:flex top-40 right-10"
        icon={ShieldCheck}
        title="Devis 100% gratuit"
        subtitle="Sans engagement"
        delay={0.9}
      />
      <FloatingBadge
        className="hidden lg:flex bottom-24 left-16"
        icon={Star}
        title="4.8/5"
        subtitle="+150 avis clients"
        delay={1.1}
      />
      <FloatingBadge
        className="hidden lg:flex bottom-32 right-16"
        icon={MapPin}
        title="+600 quartiers"
        subtitle="Couverture totale"
        delay={1.3}
      />

      <div className="container relative py-28 md:py-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-6 border border-white/10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            {locale === "ar" ? "متوفر 24 ساعة - 7 أيام" : locale === "en" ? "Available 24/7" : "Disponible 24h/24 - 7j/7"}
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight"
        >
          {heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl text-white/70 mb-3 max-w-2xl mx-auto"
        >
          {heroSubtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-white/50 mb-10 text-sm"
        >
          {info}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SearchBar locale={locale} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
        >
          <Link href="tel:+212715758801">
            <Button size="xl" className="gap-2 shadow-lg shadow-primary/30 bg-white text-primary hover:bg-white/90 hover:shadow-primary/40">
              <Phone className="h-5 w-5" />
              {locale === "ar" ? "اتصل الآن" : locale === "en" ? "Call now" : "Appeler maintenant"}
            </Button>
          </Link>
          <Link href="https://wa.me/212715758801" target="_blank">
            <Button size="xl" variant="whatsapp" className="gap-2 shadow-lg">
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Button>
          </Link>
          <Link href={`/${locale}/services`}>
            <Button
              size="xl"
              variant="ghost"
              className="gap-2 text-white hover:bg-white/10 hover:text-white border border-white/20"
            >
              <Wrench className="h-5 w-5" />
              {locale === "ar" ? "استعرض الخدمات" : locale === "en" ? "Browse services" : "Voir les services"}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-sm text-white/60"
        >
          <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-gold-light" /> {locale === "ar" ? "تدخل سريع" : locale === "en" ? "Fast response" : "Intervention express"}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold-light" /> {locale === "ar" ? "ضمان العمل" : locale === "en" ? "Work guaranteed" : "Travail garanti"}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold-light" /> {locale === "ar" ? "7 أيام في الأسبوع" : locale === "en" ? "7 days a week" : "7j/7"}</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-6 w-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
