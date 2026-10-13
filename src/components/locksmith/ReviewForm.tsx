"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { toast } from "sonner"

export function ReviewForm({ locksmithId, locationId, locale = "fr" }: { locksmithId?: string; locationId?: string; locale?: string }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [authorName, setAuthorName] = useState("")
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) {
      toast.error(locale === "ar" ? "يرجى اختيار تقييم" : locale === "en" ? "Please select a rating" : "Veuillez sélectionner une note")
      return
    }
    setLoading(true)
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment, authorName, locksmithId, locationId }),
    })
    if (res.ok) {
      toast.success(locale === "ar" ? "شكراً على رأيك! سيتم نشره بعد المراجعة." : locale === "en" ? "Thank you for your review! It will be published after moderation." : "Merci pour votre avis ! Il sera publié après modération.")
      setRating(0)
      setAuthorName("")
      setComment("")
    } else {
      toast.error(locale === "ar" ? "خطأ في الإرسال" : locale === "en" ? "Error submitting" : "Erreur lors de l'envoi")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6">
      <h3 className="font-semibold">{locale === "ar" ? "قدم رأيك" : locale === "en" ? "Leave a review" : "Donnez votre avis"}</h3>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button key={i} type="button" onClick={() => setRating(i + 1)} onMouseEnter={() => setHover(i + 1)} onMouseLeave={() => setHover(0)} className="p-1">
            <Star className={`h-6 w-6 ${(hover || rating) > i ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
          </button>
        ))}
      </div>
      <Input placeholder={locale === "ar" ? "اسمك (اختياري)" : locale === "en" ? "Your name (optional)" : "Votre nom (optionnel)"} value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
      <textarea className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder={locale === "ar" ? "تعليقك..." : locale === "en" ? "Your comment..." : "Votre commentaire..."} value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button type="submit" disabled={loading}>{loading ? (locale === "ar" ? "جاري الإرسال..." : locale === "en" ? "Sending..." : "Envoi...") : (locale === "ar" ? "نشر التقييم" : locale === "en" ? "Publish review" : "Publier l'avis")}</Button>
    </form>
  )
}
