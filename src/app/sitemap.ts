import { prisma } from "@/lib/prisma"

const BASE_URL = "https://serruiermarrakech.ma"

export default async function sitemap() {
  const locales = ["fr", "ar", "en"] as const

  const staticPages = [
    "",
    "/login",
    "/register",
    "/contact",
    "/marrakech",
  ]

  const staticEntries = staticPages.flatMap((path) => {
    const entries = locales.map((locale) => ({
      url: `${BASE_URL}${locale === "fr" ? "" : `/${locale}`}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l === "fr" ? "fr" : l === "ar" ? "ar" : "en", `${BASE_URL}${l === "fr" ? "" : `/${l}`}${path}`])
        ),
      },
    }))
    return entries
  })

  const services = await prisma.locksmithService.findMany({ select: { slug: true } })
  const serviceEntries = services.flatMap((s) =>
    locales.map((locale) => ({
      url: `${BASE_URL}${locale === "fr" ? "" : `/${locale}`}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l === "fr" ? "fr" : l === "ar" ? "ar" : "en", `${BASE_URL}${l === "fr" ? "" : `/${l}`}/${s.slug}`])
        ),
      },
    }))
  )

  const locations = await prisma.location.findMany({
    where: { city: { slug: "marrakech" } },
    select: { slug: true },
  })
  const locationEntries = locations.map((loc) => ({
    url: `${BASE_URL}/marrakech/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const comboEntries = services.flatMap((s) =>
    locations.slice(0, 10).flatMap((loc) =>
      locales.map((locale) => ({
        url: `${BASE_URL}${locale === "fr" ? "" : `/${locale}`}/marrakech/${loc.slug}/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }))
    )
  )

  return [
    ...staticEntries,
    ...serviceEntries,
    ...locationEntries,
    ...comboEntries,
  ]
}
