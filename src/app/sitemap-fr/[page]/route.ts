import { getComboSitemapUrls, buildUrlsetXml, COMBO_CHUNK_SIZE } from "@/lib/sitemap-data"

export const revalidate = 3600

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params
  const index = Number(page)
  if (!Number.isInteger(index) || index < 1) {
    return new Response("Not found", { status: 404 })
  }
  const combos = await getComboSitemapUrls()
  const start = index * COMBO_CHUNK_SIZE
  const urls = combos.slice(start, start + COMBO_CHUNK_SIZE)
  if (urls.length === 0) {
    return new Response("Not found", { status: 404 })
  }
  return new Response(buildUrlsetXml("fr", urls), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}