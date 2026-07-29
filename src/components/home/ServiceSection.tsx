"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Wrench } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StaggerContainer, staggerItemVariants } from "@/components/motion/StaggerContainer"

interface ServiceItem {
  slug: string
  name: string
  description?: string
  priceFrom?: number
}

export function ServiceSection({ services, locale, title }: { services: ServiceItem[]; locale: string; title: string }) {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Découvrez tous nos services de serrurerie professionnelle à Marrakech
        </p>
      </div>
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <motion.div key={service.slug} variants={staggerItemVariants}>
            <Link href={`/${locale === "fr" ? "" : locale}/marrakech/${service.slug}`}>
              <Card className="h-full card-hover cursor-pointer border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 shrink-0 transition-colors">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm mb-1.5">{service.name}</h3>
                      {service.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{service.description}</p>
                      )}
                      {service.priceFrom != null && (
                        <Badge variant="secondary" className="mt-3 text-xs font-medium">
                          À partir de {service.priceFrom} MAD
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  )
}
