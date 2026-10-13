import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { haversineKm } from "@/lib/geo"

export async function GET(request: NextRequest) {
  const lat = Number(request.nextUrl.searchParams.get("lat"))
  const lng = Number(request.nextUrl.searchParams.get("lng"))

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: "invalid coordinates" }, { status: 400 })
  }

  const city = await prisma.city.findFirst({ where: { slug: "marrakech" } })
  if (!city) {
    return NextResponse.json({ error: "city not found" }, { status: 404 })
  }

  const [locations, locksmiths] = await Promise.all([
    prisma.location.findMany({
      where: { cityId: city.id },
      select: { id: true, name: true, slug: true, type: true, latitude: true, longitude: true },
    }),
    prisma.locksmith.findMany({
      where: { cityId: city.id, isApproved: true },
      select: {
        id: true,
        companyName: true,
        slug: true,
        phone: true,
        whatsapp: true,
        latitude: true,
        longitude: true,
        rating: true,
        reviewCount: true,
        emergencyAvailable: true,
      },
    }),
  ])

  const ranked = locations
    .map((l) => ({ ...l, distanceKm: haversineKm(lat, lng, l.latitude, l.longitude) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)

  const preferredTypes = ["QUARTIER", "ARRONDISSEMENT", "LOTISSEMENT", "SECTEUR"]
  const preferred = ranked.find((l) => preferredTypes.includes(l.type)) || ranked[0]
  if (!preferred) {
    return NextResponse.json({ error: "no location found" }, { status: 404 })
  }

  const nearestLocksmiths = locksmiths
    .map((l) => ({
      id: l.id,
      companyName: l.companyName,
      slug: l.slug,
      phone: l.phone,
      whatsapp: l.whatsapp || l.phone,
      rating: l.rating,
      reviewCount: l.reviewCount,
      emergencyAvailable: l.emergencyAvailable,
      distanceKm: Math.round(haversineKm(lat, lng, l.latitude, l.longitude) * 10) / 10,
      etaMinutes: Math.max(10, Math.round(haversineKm(lat, lng, l.latitude, l.longitude) * 1.5 + 8)),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 3)

  return NextResponse.json({
    found: true,
    distanceKm: Math.round(preferred.distanceKm * 10) / 10,
    inMarrakechArea: preferred.distanceKm < 40,
    location: {
      id: preferred.id,
      name: preferred.name,
      slug: preferred.slug,
      type: preferred.type,
    },
    locksmiths: nearestLocksmiths,
  })
}
