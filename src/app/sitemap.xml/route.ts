import { buildSitemapIndexXml } from "@/lib/sitemap-data"

export const revalidate = 3600

export async function GET() {
  const xml = await buildSitemapIndexXml()
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}