import Link from "next/link"
import { Phone, AlarmClock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EmergencyCTAProps {
  locationName?: string
  locale?: string
}

export function EmergencyCTA({ locationName }: EmergencyCTAProps) {
  return (
    <Card className="bg-red-600 text-white p-8 border-none">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 rounded-full p-3">
            <AlarmClock className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">
              {locationName ? `Urgence à ${locationName} ?` : "Urgence serrurerie ?"}
            </h3>
            <p className="text-red-100">Intervention rapide en 30 minutes - 7j/7</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="tel:+212600000000">
            <Button size="xl" className="bg-white text-red-600 hover:bg-red-50 gap-2">
              <Phone className="h-5 w-5" />
              Appeler l'urgence
            </Button>
          </Link>
          <Link href="https://wa.me/212600000000" target="_blank">
            <Button size="xl" variant="whatsapp" className="gap-2">
              WhatsApp
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-6 mt-4 text-sm text-red-100 justify-center md:justify-start">
        <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> Service 24h/24</span>
        <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> Devis gratuit</span>
      </div>
    </Card>
  )
}
