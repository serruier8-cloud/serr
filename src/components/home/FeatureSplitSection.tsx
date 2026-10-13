"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ShieldCheck, Wifi, Fingerprint, BatteryCharging, Smartphone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimateInView } from "@/components/motion/AnimateInView"
import { StaggerContainer, staggerItemVariants } from "@/components/motion/StaggerContainer"

interface FeatureSplitSectionProps {
  locale: "fr" | "ar" | "en"
}

const FEATURES: Record<"fr" | "ar" | "en", Array<{ title: string; desc: string }>> = {
  fr: [
    { title: "Ouverture sans clé", desc: "Empreinte, code, smartphone, carte RFID ou reconnaissance faciale." },
    { title: "Contrôle à distance", desc: "Ouvrez et surveillez votre porte depuis votre téléphone, où que vous soyez." },
    { title: "Batterie longue durée", desc: "8 à 12 mois d'autonomie avec alertes en cas de batterie faible." },
    { title: "Installation 30-60 min", desc: "Compatibilité 99% des portes, sans perçage supplémentaire." },
  ],
  ar: [
    { title: "فتح بدون مفتاح", desc: "بصمة، رمز، هاتف، بطاقة RFID أو التعرف على الوجه." },
    { title: "تحكم عن بعد", desc: "افتح وراقب بابك من هاتفك أينما كنت." },
    { title: "بطارية طويلة الأمد", desc: "8 إلى 12 شهرًا من الاستقلالية مع تنبيهات عند انخفاض البطارية." },
    { title: "تركيب 30-60 دقيقة", desc: "توافق مع 99% من الأبواب، بدون ثقب إضافي." },
  ],
  en: [
    { title: "Keyless entry", desc: "Fingerprint, code, smartphone, RFID card or face recognition." },
    { title: "Remote control", desc: "Open and monitor your door from your phone, wherever you are." },
    { title: "Long battery life", desc: "8 to 12 months of autonomy with low battery alerts." },
    { title: "30-60 min install", desc: "99% door compatibility, no extra drilling." },
  ],
}

const ICONS = [Fingerprint, Smartphone, BatteryCharging, Wifi]

export function FeatureSplitSection({ locale }: FeatureSplitSectionProps) {
  const features = FEATURES[locale]
  const eyebrow = locale === "ar" ? "الأمان الحديث" : locale === "en" ? "Modern security" : "Sécurité moderne"
  const title = locale === "ar"
    ? "اطمئن على منزلك بتقنية القفل الذكي"
    : locale === "en"
    ? "Protect your home with smart lock technology"
    : "Sécurisez votre maison avec la serrure intelligente"
  const subtitle = locale === "ar"
    ? "تحكم كامل في دخول منزلك: افهم من يدخل ومتى، وامنح وصولًا مؤقتًا، وستكون محميًا حتى في غيابك."
    : locale === "en"
    ? "Full control over who enters your home: know who comes and when, grant temporary access, and stay protected even when you're away."
    : "Un contrôle total sur qui entre chez vous : sachez qui vient et quand, accordez des accès temporaires et restez protégé même en votre absence."
  const cta = locale === "ar" ? "اطلب تركيب قفل ذكي" : locale === "en" ? "Book a smart lock installation" : "Réserver une installation"
  const trust = locale === "ar" ? "ضمان سنتين · تركيب احترافي" : locale === "en" ? "2-year warranty · Professional installation" : "Garantie 2 ans · Installation professionnelle"

  return (
    <section className="bg-gradient-to-b from-background to-muted/40 py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateInView direction="right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-gold/20 blur-3xl rounded-3xl" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/71/Yale_Smart_lock_Facial_recognition_system_door_lockC.jpg"
                  alt="Smart lock security"
                  loading="lazy"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{trust}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-5 -right-5 bg-card rounded-2xl px-4 py-3 shadow-xl border border-border/60 hidden sm:flex items-center gap-3"
              >
                <div className="bg-green-100 rounded-lg p-2">
                  <Wifi className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{locale === "ar" ? "متصلة" : locale === "en" ? "Connected" : "Connecté"}</p>
                  <p className="text-xs text-muted-foreground">{locale === "ar" ? "WiFi + بلوتوث" : locale === "en" ? "WiFi + Bluetooth" : "WiFi + Bluetooth"}</p>
                </div>
              </motion.div>
            </div>
          </AnimateInView>

          <div>
            <AnimateInView direction="left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <ShieldCheck className="h-4 w-4" />
                {eyebrow}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{subtitle}</p>
            </AnimateInView>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((f, i) => {
                const Icon = ICONS[i]
                return (
                  <motion.div key={i} variants={staggerItemVariants}>
                    <div className="flex items-start gap-3 bg-card rounded-2xl border border-border/60 p-4 h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                      <div className="bg-primary/10 rounded-xl p-2.5 shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-0.5">{f.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </StaggerContainer>

            <AnimateInView delay={0.1}>
              <div className="flex flex-wrap items-center gap-3">
                <Link href={`/${locale}/serrure-intelligente`}>
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                    {cta}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
                <Link href={`/${locale}/prix-serrurier`}>
                  <Button size="lg" variant="ghost" className="gap-2">
                    {locale === "ar" ? "تعرف على الأسعار" : locale === "en" ? "See prices" : "Voir les prix"}
                  </Button>
                </Link>
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  )
}
