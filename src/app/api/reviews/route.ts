import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locksmithId = searchParams.get("locksmithId")
  const locationId = searchParams.get("locationId")
  const where: Prisma.ReviewWhereInput = {}
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
  } catch {
    return NextResponse.json({ error: "Erreur lors de la soumission" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const id = String(body.id || "")
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })

    const review = await prisma.review.update({
      where: { id },
      data: { isApproved: Boolean(body.isApproved) },
    })

    if (review.locksmithId) {
      const { _count, _avg } = await prisma.review.aggregate({
        where: { locksmithId: review.locksmithId, isApproved: true },
        _count: { _all: true },
        _avg: { rating: true },
      })
      await prisma.locksmith.update({
        where: { id: review.locksmithId },
        data: { reviewCount: _count._all, rating: Math.round((_avg.rating || 0) * 10) / 10 },
      })
    }

    return NextResponse.json(review)
  } catch {
    return NextResponse.json({ error: "Erreur de mise à jour" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })
    await prisma.review.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Erreur de suppression" }, { status: 500 })
  }
}
