"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ReviewActions({ id, locale = "fr" }: { id: string; locale?: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)

  async function approve() {
    setBusy("approve")
    const res = await fetch("/api/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isApproved: true }),
    })
    if (res.ok) {
      toast.success(locale === "ar" ? "تمت الموافقة على التقييم" : locale === "en" ? "Review approved" : "Avis approuvé")
      router.refresh()
    } else {
      toast.error(locale === "ar" ? "حدث خطأ" : locale === "en" ? "An error occurred" : "Une erreur est survenue")
    }
    setBusy(null)
  }

  async function remove() {
    setBusy("delete")
    const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success(locale === "ar" ? "تم حذف التقييم" : locale === "en" ? "Review deleted" : "Avis supprimé")
      router.refresh()
    } else {
      toast.error(locale === "ar" ? "حدث خطأ" : locale === "en" ? "An error occurred" : "Une erreur est survenue")
    }
    setBusy(null)
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="gold" onClick={approve} disabled={busy !== null} className="gap-1.5">
        {busy === "approve" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
        {locale === "ar" ? "موافقة" : locale === "en" ? "Approve" : "Approuver"}
      </Button>
      <Button size="sm" variant="outline" onClick={remove} disabled={busy !== null} className="gap-1.5 text-destructive">
        {busy === "delete" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        {locale === "ar" ? "حذف" : locale === "en" ? "Delete" : "Supprimer"}
      </Button>
    </div>
  )
}
