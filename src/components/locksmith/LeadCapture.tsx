"use client"

import { useState } from "react"
import { PhoneCall, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export function LeadCapture({ locale = "fr", locationSlug, serviceName }: { locale?: string; locationSlug?: string; serviceName?: string }) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (name.trim().length < 2 || phone.trim().length < 6) {
      toast.error(locale === "ar" ? "يرجى إدخال الاسم ورقم هاتف صحيح" : locale === "en" ? "Please enter your name and a valid phone number" : "Veuillez saisir votre nom et un numéro de téléphone valide")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, locationSlug, service: serviceName, locale }),
      })
      if (res.ok) {
        toast.success(locale === "ar" ? "شكراً لك! سنتصل بك خلال دقائق." : locale === "en" ? "Thank you! We will call you back within minutes." : "Merci ! Nous vous rappelons sous quelques minutes.")
        setName("")
        setPhone("")
      } else {
        toast.error(locale === "ar" ? "حدث خطأ، حاول مرة أخرى" : locale === "en" ? "An error occurred, please retry" : "Une erreur est survenue, veuillez réessayer")
      }
    } catch {
      toast.error(locale === "ar" ? "حدث خطأ، حاول مرة أخرى" : locale === "en" ? "An error occurred, please retry" : "Une erreur est survenue, veuillez réessayer")
    }
    setLoading(false)
  }

  return (
    <Card className="border-primary/30">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
          <PhoneCall className="h-5 w-5 text-primary" />
          {locale === "ar" ? "معاودة الاتصال" : locale === "en" ? "Call me back" : "Rappel gratuit"}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {locale === "ar"
            ? "اترك رقمك وسنتصل بك خلال دقائق"
            : locale === "en"
            ? "Leave your number and we'll call you back within minutes"
            : "Laissez votre numéro et nous vous rappelons sous quelques minutes"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder={locale === "ar" ? "اسمك" : locale === "en" ? "Your name" : "Votre nom"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="tel"
            placeholder={locale === "ar" ? "رقم هاتفك" : locale === "en" ? "Your phone number" : "Votre numéro de téléphone"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading
              ? (locale === "ar" ? "جاري الإرسال..." : locale === "en" ? "Sending..." : "Envoi...")
              : (locale === "ar" ? "اطلب معاودة الاتصال" : locale === "en" ? "Request a call back" : "Demander un rappel")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
