import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { LayoutDashboard, Wrench, MapPin, Star, MessageSquare, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await auth()
  if (!session?.user) {
    redirect(`/${locale}/login`)
  }
  const t = await getTranslations({ locale, namespace: "dashboard" })
  const at = await getTranslations({ locale, namespace: "auth" })
  const prefix = `/${locale}`

  const sidebarLinks = [
    { href: `${prefix}/dashboard`, label: t("home"), icon: LayoutDashboard },
    { href: `${prefix}/dashboard/locksmiths`, label: t("locksmiths"), icon: Wrench },
    { href: `${prefix}/dashboard/locations`, label: t("locations"), icon: MapPin },
    { href: `${prefix}/dashboard/services`, label: t("services"), icon: Star },
    { href: `${prefix}/dashboard/reviews`, label: t("reviews"), icon: MessageSquare },
  ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden md:flex w-64 flex-col border-r bg-muted/30 p-4">
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Link href={`${prefix}/login`}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive">
              <LogOut className="h-4 w-4" />
              {at("logout")}
            </Button>
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
