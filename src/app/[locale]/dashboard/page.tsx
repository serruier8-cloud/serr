import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { Wrench, MapPin, Star, Users, ArrowRight } from "lucide-react"

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "dashboard" })
  const prefix = locale === "fr" ? "" : `/${locale}`

  const [locksmithCount, locationCount, serviceCount, reviewCount, recentLocksmiths] = await Promise.all([
    prisma.locksmith.count(),
    prisma.location.count(),
    prisma.locksmithService.count(),
    prisma.review.count(),
    prisma.locksmith.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { city: { select: { name: true } }, _count: { select: { reviews: true } } },
    }),
  ])

  const stats = [
    { label: t("locksmiths"), value: locksmithCount, icon: Users, href: `${prefix}/dashboard/locksmiths` },
    { label: t("locations"), value: locationCount, icon: MapPin, href: `${prefix}/dashboard/locations` },
    { label: t("services"), value: serviceCount, icon: Wrench, href: `${prefix}/dashboard/services` },
    { label: t("reviews"), value: reviewCount, icon: Star, href: `${prefix}/dashboard/locksmiths` },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{t("recentLocksmiths")}</CardTitle>
          <Link href={`${prefix}/dashboard/locksmiths`} className="text-sm text-primary hover:underline flex items-center gap-1">
            {t("viewAll")} <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          {recentLocksmiths.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4">{t("noLocksmiths")}</p>
          ) : (
            <div className="space-y-3">
              {recentLocksmiths.map(l => (
                <Link key={l.id} href={`${prefix}/dashboard/locksmiths/${l.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{l.companyName}</p>
                    <p className="text-sm text-muted-foreground">{l.city.name} · {l.phone}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">⭐ {l.rating.toFixed(1)}</div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
