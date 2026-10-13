"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Phone, Mail, MapPin, Clock, Shield, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const t = useTranslations("footer")
  const c = useTranslations("common")
  const locale = useLocale()
  const prefix = `/${locale}`

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border/40 bg-gradient-to-b from-background to-muted/30">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href={prefix} className="flex items-center gap-2.5 font-bold text-xl group">
              <div className="bg-primary/10 rounded-lg p-1.5 transition-colors group-hover:bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              {locale === "ar" ? (
                <span className="text-gradient">صانع أقفال مراكش</span>
              ) : (
                <>
                  <span className="text-gradient">{locale === "en" ? "Locksmith" : "Serrurier"}</span>
                  <span>Marrakech</span>
                </>
              )}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link href="https://wa.me/212715758801" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="sm">
                  WhatsApp
                </Button>
              </Link>
              <Link href="tel:+212715758801">
                <Button variant="emergency" size="sm">
                  <Phone className="h-4 w-4 mr-1" /> {t("emergency")}
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">{t("quickLinks")}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href={`${prefix}/marrakech`} className="text-muted-foreground hover:text-foreground transition-colors">{t("quartiers")}</Link></li>
              <li><Link href={`${prefix}/services`} className="text-muted-foreground hover:text-foreground transition-colors">{t("services")}</Link></li>
              <li><Link href={`${prefix}/blog`} className="text-muted-foreground hover:text-foreground transition-colors">{t("blog")}</Link></li>
              <li><Link href={`${prefix}/contact`} className="text-muted-foreground hover:text-foreground transition-colors">{t("contact")}</Link></li>
              <li><Link href={`${prefix}/legal`} className="text-muted-foreground hover:text-foreground transition-colors">{t("legal")}</Link></li>
              <li><Link href={`${prefix}/privacy`} className="text-muted-foreground hover:text-foreground transition-colors">{t("privacy")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">{t("services")}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href={`${prefix}/marrakech/ouverture-porte`} className="text-muted-foreground hover:text-foreground transition-colors">{locale === "ar" ? "فتح الأبواب" : locale === "en" ? "Door opening" : "Ouverture de porte"}</Link></li>
              <li><Link href={`${prefix}/marrakech/changement-serrure`} className="text-muted-foreground hover:text-foreground transition-colors">{locale === "ar" ? "تغيير الأقفال" : locale === "en" ? "Lock replacement" : "Changement de serrure"}</Link></li>
              <li><Link href={`${prefix}/marrakech/blindage-porte`} className="text-muted-foreground hover:text-foreground transition-colors">{locale === "ar" ? "تدريع الأبواب" : locale === "en" ? "Door reinforcement" : "Blindage de porte"}</Link></li>
              <li><Link href={`${prefix}/marrakech/serrure-haute-securite`} className="text-muted-foreground hover:text-foreground transition-colors">{locale === "ar" ? "أقفال عالية الأمان" : locale === "en" ? "High-security locks" : "Serrure haute sécurité"}</Link></li>
              <li><Link href={`${prefix}/marrakech/depannage-urgence`} className="text-muted-foreground hover:text-foreground transition-colors">{locale === "ar" ? "تدخل الطوارئ" : locale === "en" ? "Emergency service" : "Dépannage d'urgence"}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">{t("contactUs")}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2 mt-[-2px]">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">{locale === "ar" ? "الهاتف" : locale === "en" ? "Phone" : "Téléphone"}</p>
                  <a href="tel:+212715758801" className="font-medium hover:text-primary transition-colors">+212 715-758801</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2 mt-[-2px]">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Email</p>
                  <a href="mailto:contact@serruiermarrakech.ma" className="font-medium hover:text-primary transition-colors">contact@serruiermarrakech.ma</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2 mt-[-2px]">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">{locale === "ar" ? "العنوان" : locale === "en" ? "Address" : "Adresse"}</p>
                  <p className="font-medium">Marrakech, Maroc</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2 mt-[-2px]">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">{locale === "ar" ? "التوفر" : locale === "en" ? "Availability" : "Disponibilité"}</p>
                  <p className="font-medium">24h/24 - 7j/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Serrurier Marrakech. {c("allRights")}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>{locale === "ar" ? "العودة إلى الأعلى" : locale === "en" ? "Back to top" : "Haut de page"}</span>
            <div className="bg-muted rounded-lg p-1.5 transition-colors group-hover:bg-primary/20">
              <ArrowUp className="h-4 w-4 text-primary" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
