import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const locations = await prisma.location.findMany({
    where: { city: { slug: "marrakech" } },
    select: { id: true, name: true, slug: true, type: true, parentId: true },
    orderBy: { name: "asc" },
  })
  return NextResponse.json(locations)
}
