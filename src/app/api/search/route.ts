import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || ""
  const locale = request.nextUrl.searchParams.get("locale") || "fr"

  if (q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const [locations, services] = await Promise.all([
    prisma.location.findMany({
      where: {
        name: { contains: q, mode: "insensitive" },
        city: { slug: "marrakech" },
      },
      select: { id: true, name: true, slug: true, type: true },
      take: 10,
    }),
    prisma.locksmithService.findMany({
      where: {
        OR: [
          { nameFr: { contains: q, mode: "insensitive" } },
          { nameAr: { contains: q, mode: "insensitive" } },
          { nameEn: { contains: q, mode: "insensitive" } },
        ],
      },
      select: { id: true, nameFr: true, nameAr: true, nameEn: true, slug: true },
      take: 5,
    }),
  ])

  const results = [
    ...locations.map((l) => ({
      id: l.id,
      name: l.name,
      slug: l.slug,
      type: "location" as const,
      subtype: l.type,
    })),
    ...services.map((s) => ({
      id: s.id,
      name: locale === "ar" ? s.nameAr : locale === "en" ? s.nameEn : s.nameFr,
      slug: s.slug,
      type: "service" as const,
      subtype: locale === "ar" ? "خدمة" : locale === "en" ? "Service" : "Service",
    })),
  ]

  return NextResponse.json({ results })
}
