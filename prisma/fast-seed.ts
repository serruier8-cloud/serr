import { PrismaClient, LocationType } from "@prisma/client"
import * as fs from "fs"

const prisma = new PrismaClient()

async function main() {
  // Read the original seed file and extract loc() calls
  const content = fs.readFileSync("prisma/seed.ts", "utf-8")
  const regex = /loc\([\s\S]*?\)/g
  const matches = content.match(regex) || []

  // Parse loc() calls: loc("slug", "name", Type, arrond, postalCode, lat, lng)
  const locations = matches.map((m: string) => {
    const parts = m.match(/loc\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*"([^"]+)"\s*,\s*([^,]+)\s*,\s*([^)]+)/)
    if (!parts) return null
    return {
      slug: parts[1], name: parts[2], type: parts[3].trim().replace("LocationType.", "") as LocationType,
      arrondissement: parts[4].trim() === "null" ? null : parts[4].trim().replace(/"/g, ""),
      postalCode: parts[5], latitude: parseFloat(parts[6]), longitude: parseFloat(parts[7]),
    }
  }).filter(Boolean) as any[]

  // Get city
  const city = await prisma.city.findFirst({ where: { slug: "marrakech" } })
  if (!city) throw new Error("City not found - run original seed first")

  // Get existing location slugs
  const existing = await prisma.location.findMany({ select: { slug: true } })
  const existingSlugs = new Set(existing.map((l: any) => l.slug))

  // Find missing locations
  const missing = locations.filter((l: any) => !existingSlugs.has(l.slug))
  console.log(`Found ${missing.length} missing locations out of ${locations.length} total`)

  if (missing.length > 0) {
    const data = missing.map((l: any) => {
      const name = l.name
      return {
        slug: l.slug, name, type: l.type as LocationType,
        arrondissement: l.arrondissement, postalCode: l.postalCode,
        latitude: l.latitude, longitude: l.longitude, cityId: city.id,
        metaTitleFr: `Serrurier ${name} Marrakech - Dépannage Serrurerie 7j/7`,
        metaTitleAr: `سراج ${name} مراكش - إصلاح الأقفال 7/7`,
        metaTitleEn: `Locksmith ${name} Marrakech - 24/7 Emergency Locksmith`,
        metaDescFr: `Serrurier professionnel à ${name} Marrakech. Intervention rapide 30 min.`,
        metaDescAr: `سراج محترف في ${name} مراكش. تدخل سريع 30 دقيقة.`,
        metaDescEn: `Professional locksmith in ${name} Marrakech. Fast 30 min response.`,
        introFr: `Serrurier professionnel à ${name} Marrakech.`,
        introAr: `سراج محترف في ${name} مراكش.`,
        introEn: `Professional locksmith in ${name} Marrakech.`,
      }
    })
    const { count } = await prisma.location.createMany({ data, skipDuplicates: true })
    console.log(`Inserted ${count} missing locations`)
  }

  console.log("All locations done!")
}

main().catch(console.error).finally(() => prisma.$disconnect())
