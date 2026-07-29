"use client"

import { motion } from "motion/react"
import { Phone, AlarmClock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EmergencySection() {
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
                Urgence serrurerie ?
              </h3>
              <p className="text-white/80 mt-1">Intervention rapide en 30 minutes - 7j/7 - Devis gratuit</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> Service 24h/24</span>
                <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> Devis gratuit</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="tel:+212600000000">
              <Button size="xl" className="bg-white text-red-600 hover:bg-red-50 hover:shadow-xl gap-2 shadow-lg">
                <Phone className="h-5 w-5" />
                Appeler l'urgence
              </Button>
            </Link>
            <Link href="https://wa.me/212600000000" target="_blank">
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
