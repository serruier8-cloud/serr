import { getBaseSitemapUrls, getComboSitemapUrls, buildUrlsetXml, COMBO_CHUNK_SIZE } from "@/lib/sitemap-data"

export const revalidate = 3600

export async function GET() {
  const [base, combos] = await Promise.all([getBaseSitemapUrls(), getComboSitemapUrls()])
  const urls = [...base, ...combos.slice(0, COMBO_CHUNK_SIZE)]
  return new Response(buildUrlsetXml("fr", urls), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}