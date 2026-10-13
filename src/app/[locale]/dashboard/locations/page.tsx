import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "dashboard" })

  const locations = await prisma.location.findMany({
    where: { city: { slug: "marrakech" } },
    include: { _count: { select: { locksmiths: true } } },
    orderBy: { name: "asc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("locations")} — {locations.length}</h1>
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium text-sm text-muted-foreground">
            <span>{locale === "ar" ? "الاسم" : locale === "en" ? "Name" : "Nom"}</span>
            <span>{locale === "ar" ? "النوع" : locale === "en" ? "Type" : "Type"}</span>
            <span>{locale === "ar" ? "المقاطعة" : locale === "en" ? "Arrondissement" : "Arrondissement"}</span>
            <span>{locale === "ar" ? "السراجون" : locale === "en" ? "Locksmiths" : "Serruriers"}</span>
          </div>
          {locations.map(l => (
            <div key={l.id} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0 text-sm hover:bg-muted/50">
              <span className="flex items-center gap-2"><MapPin className="h-3 w-3 text-muted-foreground" /> {l.name}</span>
              <span><Badge variant="outline">{locale === "ar" ? (l.type === "ARRONDISSEMENT" ? "مقاطعة" : l.type === "QUARTIER" ? "حي" : l.type.replace(/_/g, " ")) : locale === "en" ? (l.type === "ARRONDISSEMENT" ? "Arrondissement" : l.type === "QUARTIER" ? "District" : l.type.replace(/_/g, " ")) : l.type.replace(/_/g, " ")}</Badge></span>
              <span className="text-muted-foreground">{l.arrondissement || "-"}</span>
              <span>{l._count.locksmiths}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
