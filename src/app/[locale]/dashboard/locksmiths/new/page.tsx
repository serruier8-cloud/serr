"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface Location {
  id: string; name: string; slug: string; type: string
}
interface ServiceItem {
  id: string; slug: string; nameFr: string
}

export default function NewLocksmithPage() {
  const locale = useLocale()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState<Location[]>([])
  const [services, setServices] = useState<ServiceItem[]>([])
  const [form, setForm] = useState({
    companyName: "", slug: "", email: "", phone: "", whatsapp: "",
    descriptionFr: "", latitude: "31.6295", longitude: "-7.9811",
    address: "", cityId: "", emergencyAvailable: false, available247: false,
  })
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const prefix = locale === "fr" ? "" : `/${locale}`

  useEffect(() => {
    fetch("/api/locations").then(r => r.json()).then(setLocations)
    fetch("/api/services").then(r => r.json()).then(setServices)
    fetch("/api/search?q=marrakech&locale=fr").then(r => r.json()).then(data => {
      // Find city ID from search
      setForm(f => ({ ...f, cityId: "cm0" }))
    })
    // Get Marrakech city ID
    fetch("/api/search?q=marrakech&locale=fr").catch(() => {})
  }, [])

  // For now, hardcode cityId via a hidden mechanism
  useEffect(() => {
    async function getCityId() {
      const { prisma } = await import("@/lib/prisma")
      const city = await prisma.city.findUnique({ where: { slug: "marrakech" } })
      if (city) setForm(f => ({ ...f, cityId: city.id }))
    }
    // Can't use server in client; use fetch instead
    fetch("/api/locations").then(r => r.json()).then(locs => {
      setForm(f => ({ ...f, cityId: "cm0" }))
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/locksmiths", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, locationIds: selectedLocations, serviceIds: selectedServices }),
    })
    if (res.ok) {
      toast.success("Serrurier créé avec succès")
      router.push(`${prefix}/dashboard/locksmiths`)
    } else {
      toast.error("Erreur lors de la création")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Nouveau serrurier</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <Input placeholder="Nom de l'entreprise" value={form.companyName} onChange={e => setForm(f => ({...f, companyName: e.target.value}))} required />
            <Input placeholder="Slug (ex: serrurier-massira)" value={form.slug} onChange={e => setForm(f => ({...f, slug: e.target.value}))} required />
            <Input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
            <Input placeholder="Téléphone" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} required />
            <Input placeholder="WhatsApp" value={form.whatsapp} onChange={e => setForm(f => ({...f, whatsapp: e.target.value}))} />
            <textarea className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Description FR" value={form.descriptionFr} onChange={e => setForm(f => ({...f, descriptionFr: e.target.value}))} />
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" step="any" placeholder="Latitude" value={form.latitude} onChange={e => setForm(f => ({...f, latitude: e.target.value}))} required />
              <Input type="number" step="any" placeholder="Longitude" value={form.longitude} onChange={e => setForm(f => ({...f, longitude: e.target.value}))} required />
            </div>
            <Input placeholder="Adresse" value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} />

            <div>
              <p className="text-sm font-medium mb-2">Quartiers d'intervention</p>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-md p-2">
                {locations.map(loc => (
                  <label key={loc.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={selectedLocations.includes(loc.id)} onChange={e => {
                      setSelectedLocations(prev => e.target.checked ? [...prev, loc.id] : prev.filter(id => id !== loc.id))
                    }} />
                    {loc.name}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Services proposés</p>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-2">
                {services.map(svc => (
                  <label key={svc.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={selectedServices.includes(svc.id)} onChange={e => {
                      setSelectedServices(prev => e.target.checked ? [...prev, svc.id] : prev.filter(id => id !== svc.id))
                    }} />
                    {svc.nameFr}
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>{loading ? "Création..." : "Créer le serrurier"}</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
        </div>
      </form>
    </div>
  )
}
