"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export function ContactForm({ locale = "fr" }: { locale?: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", service: "", location: "" })
  const [loading, setLoading] = useState(false)
  const t = (fr: string, ar: string, en: string) => (locale === "ar" ? ar : locale === "en" ? en : fr)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      toast.success(t("Message envoyé ! Nous vous répondrons dans les plus brefs délais.", "تم إرسال الرسالة! سنرد عليك في أقرب وقت.", "Message sent! We will get back to you shortly."))
      setForm({ name: "", email: "", phone: "", message: "", service: "", location: "" })
    } else {
      toast.error(t("Erreur lors de l'envoi", "خطأ في الإرسال", "Error sending"))
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Envoyez-nous un message", "أرسل لنا رسالة", "Send us a message")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder={t("Votre nom *", "اسمك *", "Your name *")} value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required />
            <Input type="email" placeholder={t("Votre email *", "بريدك الإلكتروني *", "Your email *")} value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder={t("Votre téléphone", "هاتفك", "Your phone")} value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
            <Input placeholder={t("Service recherché", "الخدمة المطلوبة", "Service requested")} value={form.service} onChange={e => setForm(f => ({...f, service: e.target.value}))} />
          </div>
          <Input placeholder={t("Quartier / Lieu", "الحي / المكان", "District / Location")} value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} />
          <textarea className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder={t("Votre message *", "رسالتك *", "Your message *")} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("Envoi en cours...", "جاري الإرسال...", "Sending...") : t("Envoyer le message", "إرسال الرسالة", "Send message")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
