import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/lib/routing"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SessionProvider } from "@/components/layout/SessionProvider"
import { Toaster } from "sonner"

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const locales = ["fr", "ar", "en"]
  const baseUrl = "https://serruiermarrakech.ma"

  const alternates: Record<string, string> = {}
  for (const l of locales) {
    alternates[l === "fr" ? "fr" : l] = `${baseUrl}${l === "fr" ? "" : `/${l}`}`
  }
  alternates["x-default"] = `${baseUrl}`

  return {
    alternates: {
      languages: alternates,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) notFound()

  const messages = await getMessages()

  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages}>
        <div dir={locale === "ar" ? "rtl" : "ltr"} className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </div>
      </NextIntlClientProvider>
    </SessionProvider>
  )
}
