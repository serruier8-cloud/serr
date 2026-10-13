import { prisma } from "@/lib/prisma"

export const BASE_URL = "https://www.serruriermarrakech.ma"
export const LOCALES = ["fr", "ar", "en"] as const
export type Locale = (typeof LOCALES)[number]

export const COMBO_CHUNK_SIZE = 8000

export interface SitemapUrl {
  path: string
  changefreq: "daily" | "weekly" | "monthly" | "yearly" | "always" | "hourly" | "never"
  priority: number
  lastmod: string
}

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function getBaseSitemapUrls(): Promise<SitemapUrl[]> {
  const today = new Date().toISOString().split("T")[0]

  const [services, locations, articles] = await Promise.all([
    prisma.locksmithService.findMany({ select: { slug: true }, orderBy: { slug: "asc" } }),
    prisma.location.findMany({
      where: { city: { slug: "marrakech" } },
      select: { slug: true },
      orderBy: { slug: "asc" },
    }),
    prisma.article.findMany({ where: { published: true }, select: { slug: true }, orderBy: { slug: "asc" } }),
  ])
  const serviceSlugs = services.map((s) => s.slug)
  const locationSlugs = locations.map((l) => l.slug)
  const articleSlugs = articles.map((a) => a.slug)

  const staticPaths: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1.0 },
    { path: "/login", priority: 0.8 },
    { path: "/register", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/legal", priority: 0.8 },
    { path: "/privacy", priority: 0.8 },
    { path: "/marrakech", priority: 0.8 },
  ]

  const staticEntries: SitemapUrl[] = staticPaths.map((p) => ({
    ...p,
    changefreq: "weekly",
    lastmod: today,
  }))

  const serviceEntries: SitemapUrl[] = serviceSlugs.map((slug) => ({
    path: `/${slug}`,
    changefreq: "weekly",
    priority: 0.7,
    lastmod: today,
  }))

  const locationEntries: SitemapUrl[] = locationSlugs.map((slug) => ({
    path: `/marrakech/${slug}`,
    changefreq: "weekly",
    priority: 0.6,
    lastmod: today,
  }))

  const articleEntries: SitemapUrl[] = articleSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: 0.6,
    lastmod: today,
  }))

  return [...staticEntries, ...serviceEntries, ...locationEntries, ...articleEntries]
}

export async function getComboSitemapUrls(): Promise<SitemapUrl[]> {
  const today = new Date().toISOString().split("T")[0]

  const [services, locations] = await Promise.all([
    prisma.locksmithService.findMany({ select: { slug: true }, orderBy: { slug: "asc" } }),
    prisma.location.findMany({
      where: { city: { slug: "marrakech" } },
      select: { slug: true },
      orderBy: { slug: "asc" },
    }),
  ])
  const serviceSlugs = services.map((s) => s.slug)
  const locationSlugs = locations.map((l) => l.slug)

  return serviceSlugs.flatMap((slug) =>
    locationSlugs.map((loc) => ({
      path: `/marrakech/${loc}/${slug}`,
      changefreq: "weekly",
      priority: 0.5,
      lastmod: today,
    }))
  )
}

export async function getComboChunkCount(): Promise<number> {
  const combos = await getComboSitemapUrls()
  return Math.ceil(combos.length / COMBO_CHUNK_SIZE)
}

export function buildUrlsetXml(locale: Locale, urls: SitemapUrl[]): string {
  const lines = urls.map((u) => {
    const alternates = LOCALES.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${escapeXml(u.path)}"/>`
    ).join("\n")
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/fr${escapeXml(u.path)}"/>`
    return `  <url>
    <loc>${BASE_URL}/${locale}${escapeXml(u.path)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
${alternates}
${xDefault}
  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${lines.join("\n")}
</urlset>`
}

export async function buildSitemapIndexXml(): Promise<string> {
  const today = new Date().toISOString().split("T")[0]
  const chunkCount = await getComboChunkCount()
  const sitemaps = LOCALES.flatMap((l) => [
    { loc: `${BASE_URL}/sitemap-${l}.xml`, lastmod: today },
    ...Array.from({ length: chunkCount }, (_, i) => ({ loc: `${BASE_URL}/sitemap-${l}/${i}`, lastmod: today })),
  ]).map(
    (s) => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
  ).join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`
}