"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import { toast } from "sonner"

export function ReviewForm({ locksmithId }: { locksmithId: string }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [authorName, setAuthorName] = useState("")
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) {
      toast.error("Veuillez sélectionner une note")
      return
    }
    setLoading(true)
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment, authorName, locksmithId }),
    })
    if (res.ok) {
      toast.success("Merci pour votre avis ! Il sera publié après modération.")
      setRating(0)
      setAuthorName("")
      setComment("")
    } else {
      toast.error("Erreur lors de l'envoi")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6">
      <h3 className="font-semibold">Donnez votre avis</h3>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button key={i} type="button" onClick={() => setRating(i + 1)} onMouseEnter={() => setHover(i + 1)} onMouseLeave={() => setHover(0)} className="p-1">
            <Star className={`h-6 w-6 ${(hover || rating) > i ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
          </button>
        ))}
      </div>
      <Input placeholder="Votre nom (optionnel)" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
      <textarea className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Votre commentaire..." value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button type="submit" disabled={loading}>{loading ? "Envoi..." : "Publier l'avis"}</Button>
    </form>
  )
}
