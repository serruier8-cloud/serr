import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name || "").trim()
    const phone = String(body.phone || "").trim()

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "invalid name" }, { status: 400 })
    }
    if (!phone || phone.length < 6) {
      return NextResponse.json({ error: "invalid phone" }, { status: 400 })
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        service: body.service ? String(body.service).slice(0, 120) : null,
        message: body.message ? String(body.message).slice(0, 500) : null,
        locationSlug: body.locationSlug ? String(body.locationSlug).slice(0, 120) : null,
        locale: body.locale ? String(body.locale).slice(0, 8) : "fr",
      },
    })

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "error creating lead" }, { status: 500 })
  }
}
