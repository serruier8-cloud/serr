"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Phone, User, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./LanguageSwitcher"

export function Header() {
  const t = useTranslations("nav")
  const at = useTranslations("auth")
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const prefix = locale === "fr" ? "" : `/${locale}`

  const navLinks = [
    { href: `/${locale === "fr" ? "" : locale}`, label: t("home") },
    { href: `${prefix}/marrakech`, label: t("locations") },
    { href: `${prefix}/blog`, label: t("blog") },
    { href: `${prefix}/contact`, label: t("contact") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href={`/${locale === "fr" ? "" : locale}`}
          className="flex items-center gap-2.5 font-bold text-xl group"
        >
          <div className="bg-primary/10 rounded-lg p-1.5 transition-colors group-hover:bg-primary/20">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="text-gradient">{locale === "ar" ? "سراج" : "Serrurier"}</span>
          <span className="hidden sm:inline">{locale === "ar" ? "مراكش" : "Marrakech"}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {session ? (
            <Link href={`${prefix}/dashboard`}>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">{at("dashboard")}</span>
              </Button>
            </Link>
          ) : (
            <Link href={`${prefix}/login`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">{at("login")}</span>
              </Button>
            </Link>
          )}

          <Link href="tel:+212600000000">
            <Button
              variant="emergency"
              size="sm"
              className="hidden sm:flex gap-2"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">06 00 00 00 00</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="py-2 px-3">
                <LanguageSwitcher />
              </div>
              {session ? (
                <Link href={`${prefix}/dashboard`} onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <User className="h-4 w-4" />
                    {at("dashboard")}
                  </Button>
                </Link>
              ) : (
                <Link href={`${prefix}/login`} onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <User className="h-4 w-4" />
                    {at("login")}
                  </Button>
                </Link>
              )}
              <Link href="tel:+212600000000" onClick={() => setIsOpen(false)}>
                <Button variant="emergency" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Urgence 24h/24
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
