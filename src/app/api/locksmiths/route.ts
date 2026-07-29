import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  const locksmiths = await prisma.locksmith.findMany({
    include: {
      city: { select: { name: true, slug: true } },
      services: { include: { service: { select: { nameFr: true, slug: true } } } },
      _count: { select: { reviews: true } },
    },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(locksmiths)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Non autoris\u00e9" }, { status: 401 })
  }
  try {
    const body = await request.json()
    const locksmith = await prisma.locksmith.create({
      data: {
        companyName: body.companyName,
        slug: body.slug,
        email: body.email,
        phone: body.phone,
        whatsapp: body.whatsapp || null,
        website: body.website || null,
        descriptionFr: body.descriptionFr || null,
        descriptionAr: body.descriptionAr || null,
        descriptionEn: body.descriptionEn || null,
        logo: body.logo || null,
        experience: body.experience ? parseInt(body.experience) : null,
        emergencyAvailable: body.emergencyAvailable || false,
        available247: body.available247 || false,
        coverageRadius: body.coverageRadius ? parseFloat(body.coverageRadius) : 10,
        latitude: parseFloat(body.latitude),
        longitude: parseFloat(body.longitude),
        address: body.address || null,
        cityId: body.cityId,
        isApproved: false,
        isFeatured: false,
        isVerified: false,
      },
    })
    if (body.locationIds?.length) {
      await prisma.locksmithLocation.createMany({
        data: body.locationIds.map((id: string) => ({ locksmithId: locksmith.id, locationId: id })),
      })
    }
    if (body.serviceIds?.length) {
      await prisma.serviceAssignment.createMany({
        data: body.serviceIds.map((id: string) => ({ locksmithId: locksmith.id, serviceId: id })),
      })
    }
    return NextResponse.json(locksmith, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erreur lors de la cr\u00e9ation" }, { status: 500 })
  }
}
