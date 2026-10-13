"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Smartphone, Fingerprint, Wifi, KeyRound, ArrowRight, Sparkles } from "lucide-react"
import { SMART_LOCK_PRODUCTS } from "@/lib/smart-lock-content"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StaggerContainer, staggerItemVariants } from "@/components/motion/StaggerContainer"

interface SmartLockSectionProps {
  locale: "fr" | "ar" | "en"
}

const TYPE_ICONS: Record<string, typeof Smartphone> = {
  "yale-linus-l2": Smartphone,
  "samsung-shp-dp728": Fingerprint,
  "xiaomi-smart-lock-e10": Wifi,
}

export function SmartLockSection({ locale }: SmartLockSectionProps) {
  const featured = SMART_LOCK_PRODUCTS.slice(0, 3)

  const title = locale === "ar" ? "الأقفال الذكية" : locale === "en" ? "Smart Locks" : "Serrures intelligentes"
  const subtitle = locale === "ar"
    ? "الأسعار، الموديلات والعلامات التجارية المتوفرة في السوق المغربية بمراكش — Yale, Samsung, Xiaomi, August, Nuki, Ultraloq."
    : locale === "en"
    ? "Prices, models and brands available on the Moroccan market in Marrakech — Yale, Samsung, Xiaomi, August, Nuki, Ultraloq."
    : "Prix, modèles et marques disponibles sur le marché marocain à Marrakech — Yale, Samsung, Xiaomi, August, Nuki, Ultraloq."
  const ctaText = locale === "ar" ? "اكتشف جميع الأقفال الذكية" : locale === "en" ? "Discover all smart locks" : "Découvrir toutes les serrures intelligentes"
  const priceFrom = locale === "ar" ? "ابتداءً من" : locale === "en" ? "From" : "À partir de"

  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4"
        >
          <Sparkles className="h-4 w-4" />
          {locale === "ar" ? "التكنولوجيا الذكية" : locale === "en" ? "Smart technology" : "Technologie intelligente"}
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {featured.map((product) => {
          const Icon = TYPE_ICONS[product.id] || Smartphone
          return (
            <motion.div key={product.id} variants={staggerItemVariants}>
              <Card className="overflow-hidden h-full flex flex-col card-hover border-border/60">
                <div className="relative h-56 bg-gradient-to-br from-muted to-card overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.model}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge className="bg-white/90 backdrop-blur text-foreground border-none shadow-sm">{product.brand}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="destructive" className="shadow-lg">
                      {priceFrom} {product.priceFrom} MAD
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-primary/10 rounded-lg p-1.5">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold">{product.name[locale]}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{product.description[locale]}</p>
                  <ul className="space-y-1.5 mb-4">
                    {product.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
                        <span>{f[locale]}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/serrure-intelligente`} className="mt-auto">
                    <Button variant="outline" className="w-full gap-2">
                      {locale === "ar" ? "المزيد من التفاصيل" : locale === "en" ? "More details" : "Plus de détails"}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </StaggerContainer>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link href={`/${locale}/serrure-intelligente`}>
          <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
            {ctaText}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </Link>
        <Link href={`/${locale}/marrakech/installation-serrure-connectee`}>
          <Button size="lg" variant="outline" className="gap-2">
            <KeyRound className="h-4 w-4" />
            {locale === "ar" ? "تركيب احترافي" : locale === "en" ? "Professional installation" : "Installation professionnelle"}
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}
