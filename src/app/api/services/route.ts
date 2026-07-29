import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const services = await prisma.locksmithService.findMany({
    orderBy: { nameFr: "asc" },
  })
  return NextResponse.json(services)
}
