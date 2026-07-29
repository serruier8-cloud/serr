"use client"

import { motion } from "motion/react"
import { SearchBar } from "@/components/search/SearchBar"

interface HeroSectionProps {
  locale: string
  heroTitle: string
  heroSubtitle: string
  info: string
}

export function HeroSection({ locale, heroTitle, heroSubtitle, info }: HeroSectionProps) {
  return (
    <section className="gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.65_0.15_255/0.1),transparent)]" />
      <div className="container relative py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white/80 mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Disponible 24h/24 - 7j/7
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
      </div>
    </section>
  )
}
