"use client"

import { motion } from "motion/react"
import { Clock, Shield, Star, Phone, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StaggerContainer, staggerItemVariants } from "@/components/motion/StaggerContainer"

const iconMap: Record<string, LucideIcon> = { Clock, Shield, Star, Phone }

interface WhyItem {
  title: string
  desc: string
  icon: string
}

export function WhyChooseSection({ items, title, subtitle }: { items: WhyItem[]; title: string; subtitle: string }) {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => {
          const Icon = iconMap[item.icon]
          return (
            <motion.div key={i} variants={staggerItemVariants}>
              <Card className="text-center card-hover border-border/60 h-full">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-4 w-fit mx-auto mb-4">
                    {Icon && <Icon className="h-8 w-8 text-primary" />}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </StaggerContainer>
    </section>
  )
}
