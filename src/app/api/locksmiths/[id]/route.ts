import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const locksmith = await prisma.locksmith.findUnique({
    where: { id },
    include: {
      city: true,
      locations: { include: { location: true } },
      services: { include: { service: true } },
      workingHours: true,
      reviews: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  })
  if (!locksmith) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(locksmith)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Non autoris\u00e9" }, { status: 401 })
  const { id } = await params
  try {
    const body = await request.json()
    const locksmith = await prisma.locksmith.update({
      where: { id },
      data: {
        companyName: body.companyName,
        phone: body.phone,
        whatsapp: body.whatsapp || null,
        website: body.website || null,
        descriptionFr: body.descriptionFr || null,
        descriptionAr: body.descriptionAr || null,
        descriptionEn: body.descriptionEn || null,
        experience: body.experience ? parseInt(body.experience) : null,
        emergencyAvailable: body.emergencyAvailable || false,
        available247: body.available247 || false,
        coverageRadius: body.coverageRadius ? parseFloat(body.coverageRadius) : 10,
        latitude: parseFloat(body.latitude),
        longitude: parseFloat(body.longitude),
        address: body.address || null,
        isApproved: body.isApproved !== undefined ? body.isApproved : undefined,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : undefined,
        isVerified: body.isVerified !== undefined ? body.isVerified : undefined,
      },
    })
    return NextResponse.json(locksmith)
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise \u00e0 jour" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Non autoris\u00e9" }, { status: 401 })
  const { id } = await params
  try {
    await prisma.locksmithLocation.deleteMany({ where: { locksmithId: id } })
    await prisma.serviceAssignment.deleteMany({ where: { locksmithId: id } })
    await prisma.workingHour.deleteMany({ where: { locksmithId: id } })
    await prisma.review.deleteMany({ where: { locksmithId: id } })
    await prisma.locksmith.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 })
  }
}
