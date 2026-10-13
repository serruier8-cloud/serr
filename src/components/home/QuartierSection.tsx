"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { StaggerContainer, staggerItemVariants } from "@/components/motion/StaggerContainer"

interface QuartierItem {
  name: string
  slug: string
}

export function QuartierSection({ quartiers, locale, title }: { quartiers: QuartierItem[]; locale: string; title: string }) {
  return (
    <section className="bg-muted/30 py-20 gradient-mesh">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {locale === "ar"
              ? "نتدخل في جميع أحياء مراكش وضواحيها"
              : locale === "en"
              ? "We operate in all districts of Marrakech and its surroundings"
              : "Nous intervenons dans tous les quartiers de Marrakech et ses environs"}
          </p>
        </div>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {quartiers.map((q) => (
            <motion.div key={q.slug} variants={staggerItemVariants}>
              <Link href={`/${locale}/marrakech/${q.slug}`}>
                <Card className="card-hover cursor-pointer border-border/60">
                  <CardContent className="p-4 text-center">
                    <div className="bg-primary/5 rounded-xl p-2.5 w-fit mx-auto mb-2.5">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <p className="font-medium text-sm">{q.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Marrakech</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
