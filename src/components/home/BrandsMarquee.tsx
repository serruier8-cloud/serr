"use client"

import { motion } from "motion/react"
import { SMART_LOCK_BRANDS } from "@/lib/smart-lock-content"
import { BadgeCheck } from "lucide-react"

interface BrandsMarqueeProps {
  locale: "fr" | "ar" | "en"
}

export function BrandsMarquee({ locale }: BrandsMarqueeProps) {
  const title = locale === "ar"
    ? "العلامات التجارية المتوفرة لدى شركائنا"
    : locale === "en"
    ? "Brands available from our partners"
    : "Les marques disponibles chez nos partenaires"

  const brands = [...SMART_LOCK_BRANDS, ...SMART_LOCK_BRANDS]

  return (
    <section className="border-y border-border/40 bg-muted/20 py-8 overflow-hidden">
      <div className="container mb-6">
        <p className="text-center text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
          <BadgeCheck className="h-4 w-4 text-primary" />
          {title}
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex gap-10 whitespace-nowrap w-max"
          animate={{ x: locale === "ar" ? [0, 400, 0] : [0, -400, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {brands.map((brand, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-primary transition-colors cursor-default select-none"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
