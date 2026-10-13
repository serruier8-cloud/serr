"use client"

import { motion } from "motion/react"
import { Phone, ClipboardCheck, Wrench, BadgeCheck } from "lucide-react"
import { StaggerContainer, staggerItemVariants } from "@/components/motion/StaggerContainer"

interface HowItWorksSectionProps {
  locale: "fr" | "ar" | "en"
}

const STEPS: Record<"fr" | "ar" | "en", Array<{ title: string; desc: string }>> = {
  fr: [
    { title: "Vous appelez", desc: "Contactez-nous 24h/24. Un conseiller évalue votre besoin immédiatement." },
    { title: "Devis gratuit", desc: "Prix fixe annoncé au téléphone, sans frais cachés ni surprise." },
    { title: "Intervention rapide", desc: "Un serrurier arrive en 30 minutes avec tout le matériel nécessaire." },
    { title: "Travail garanti", desc: "Prestation terminée, vérifiée et garantie. Paiement après intervention." },
  ],
  ar: [
    { title: "تتصل بنا", desc: "اتصل بنا 24/7. مستشار يقيّم حاجتك فورًا." },
    { title: "تقييم مجاني", desc: "سعر ثابت يُعلن عبر الهاتف، بدون رسوم خفية أو مفاجآت." },
    { title: "تدخل سريع", desc: "سراج يصل في غضون 30 دقيقة مع كل المعدات اللازمة." },
    { title: "عمل مضمون", desc: "خدمة منجزة ومتحقق منها ومضمونة. الدفع بعد التدخل." },
  ],
  en: [
    { title: "You call", desc: "Contact us 24/7. An advisor assesses your need immediately." },
    { title: "Free quote", desc: "Fixed price given over the phone, no hidden fees or surprises." },
    { title: "Fast response", desc: "A locksmith arrives in 30 minutes with all the necessary equipment." },
    { title: "Guaranteed work", desc: "Job completed, verified and guaranteed. Pay after the intervention." },
  ],
}

const ICONS = [Phone, ClipboardCheck, Wrench, BadgeCheck]

export function HowItWorksSection({ locale }: HowItWorksSectionProps) {
  const steps = STEPS[locale]
  const title = locale === "ar" ? "كيف نعمل؟" : locale === "en" ? "How it works" : "Comment ça marche ?"
  const subtitle = locale === "ar"
    ? "من مكالمتك إلى نهاية التدخل، عملية بسيطة وشفافة"
    : locale === "en"
    ? "From your call to the end of the job, a simple and transparent process"
    : "De votre appel à la fin de l'intervention, un processus simple et transparent"

  return (
    <section className="bg-muted/30 py-20 gradient-mesh">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>

        <div className="relative">
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 origin-left"
          />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = ICONS[i]
              return (
                <motion.div key={i} variants={staggerItemVariants} className="relative text-center">
                  <div className="relative mx-auto mb-5 w-20 h-20">
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 rotate-6" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                      <Icon className="h-9 w-9 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-gold text-white text-sm font-bold rounded-full h-7 w-7 flex items-center justify-center shadow-md">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1.5">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
