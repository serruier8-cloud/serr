"use client"

import { motion } from "motion/react"
import { AnimatedCounter } from "@/components/motion/AnimatedCounter"
import { Users, MapPin, Clock, Star } from "lucide-react"

interface StatItem {
  icon: typeof Users
  to: number
  suffix: string
  decimals?: number
  label: string
}

const STATS: StatItem[] = [
  { icon: Users, to: 50, suffix: "+", label: "Serruriers partenaires" },
  { icon: MapPin, to: 600, suffix: "+", label: "Quartiers couverts" },
  { icon: Clock, to: 30, suffix: " min", label: "Intervention rapide" },
  { icon: Star, to: 4.8, suffix: "/5", decimals: 1, label: "Note moyenne" },
]

export function StatsSection() {
  return (
    <section className="border-b border-border/40 gradient-mesh">
      <div className="container py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center group"
            >
              <div className="bg-primary/5 rounded-2xl p-4 w-fit mx-auto mb-3 transition-colors group-hover:bg-primary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <p className="text-3xl md:text-4xl font-bold tracking-tight">
                <AnimatedCounter to={stat.to} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </p>
              <p className="text-sm text-muted-foreground mt-1.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
