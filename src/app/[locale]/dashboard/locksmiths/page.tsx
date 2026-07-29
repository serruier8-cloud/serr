import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Star, MapPin, Phone } from "lucide-react"

export default async function LocksmithsListPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "dashboard" })
  const prefix = locale === "fr" ? "" : `/${locale}`

  const locksmiths = await prisma.locksmith.findMany({
    include: {
      city: { select: { name: true } },
      _count: { select: { reviews: true, services: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t("locksmiths")}</h1>
        <Link href={`${prefix}/dashboard/locksmiths/new`}>
          <Button className="gap-2"><Plus className="h-4 w-4" /> {t("addLocksmith")}</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {locksmiths.map((l) => (
          <Card key={l.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{l.companyName}</h3>
                  {l.isApproved && <Badge variant="success">Approuvé</Badge>}
                  {l.isFeatured && <Badge>En vedette</Badge>}
                  {l.isVerified && <Badge variant="secondary">Vérifié</Badge>}
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {l.city.name}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {l.phone}</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {l.rating.toFixed(1)} ({l._count.reviews})</span>
                  <span>{l._count.services} services</span>
                </div>
              </div>
              <Link href={`${prefix}/dashboard/locksmiths/${l.id}`}>
                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
              </Link>
            </CardContent>
          </Card>
        ))}
        {locksmiths.length === 0 && (
          <p className="text-center text-muted-foreground py-12">{t("noLocksmiths")}</p>
        )}
      </div>
    </div>
  )
}
