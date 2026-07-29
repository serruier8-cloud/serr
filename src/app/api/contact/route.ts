import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, service, location } = body
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }
    await prisma.review.create({
      data: {
        rating: 5,
        comment: `[CONTACT] De: ${name} (${email}, ${phone || "N/A"}) - Service: ${service || "N/A"} - Lieu: ${location || "N/A"} - Message: ${message}`,
        authorName: name,
        authorEmail: email,
        locksmithId: body.locksmithId || (await prisma.locksmith.findFirst({ where: { isFeatured: true } }))?.id || "",
        isApproved: false,
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 })
  }
}
