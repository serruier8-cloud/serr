import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench } from "lucide-react"

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "dashboard" })

  const services = await prisma.locksmithService.findMany({
    include: { _count: { select: { locksmiths: true } } },
    orderBy: { nameFr: "asc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("services")} — {services.length}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map(s => (
          <Card key={s.id}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{s.nameFr}</h3>
                <p className="text-sm text-muted-foreground">{s.nameAr} · {s.nameEn}</p>
                <div className="flex items-center gap-2 mt-1">
                  {s.priceFrom && <Badge variant="secondary">À partir de {s.priceFrom} MAD</Badge>}
                  <Badge variant="outline">{s._count.locksmiths} serruriers</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
