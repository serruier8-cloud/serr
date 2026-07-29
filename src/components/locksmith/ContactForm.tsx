"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", service: "", location: "" })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      toast.success("Message envoyé ! Nous vous répondrons dans les plus brefs délais.")
      setForm({ name: "", email: "", phone: "", message: "", service: "", location: "" })
    } else {
      toast.error("Erreur lors de l'envoi")
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envoyez-nous un message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="Votre nom *" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required />
            <Input type="email" placeholder="Votre email *" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="Votre téléphone" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
            <Input placeholder="Service recherché" value={form.service} onChange={e => setForm(f => ({...f, service: e.target.value}))} />
          </div>
          <Input placeholder="Quartier / Lieu" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} />
          <textarea className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Votre message *" value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer le message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
