import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locksmithId = searchParams.get("locksmithId")
  const locationId = searchParams.get("locationId")
  const where: any = {}
  if (locksmithId) where.locksmithId = locksmithId
  if (locationId) where.locationId = locationId
  const reviews = await prisma.review.findMany({
    where: { ...where, isApproved: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  })
  return NextResponse.json(reviews)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const review = await prisma.review.create({
      data: {
        rating: parseInt(body.rating),
        comment: body.comment || null,
        authorName: body.authorName || null,
        authorEmail: body.authorEmail || null,
        locksmithId: body.locksmithId,
        locationId: body.locationId || null,
        isApproved: false,
      },
    })
    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la soumission" }, { status: 500 })
  }
}
