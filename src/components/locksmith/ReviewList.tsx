import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Review {
  id: string
  rating: number
  comment: string | null
  authorName: string | null
  createdAt: Date
}

export function ReviewList({ reviews, locale = "fr" }: { reviews: Review[]; locale?: string }) {
  if (reviews.length === 0) {
    return <p className="text-muted-foreground text-sm">
      {locale === "ar" ? "لا توجد آراء حالياً. كن أول من يقدم رأيه!" : locale === "en" ? "No reviews yet. Be the first to share your opinion!" : "Aucun avis pour le moment. Soyez le premier à donner votre avis !"}
    </p>
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.authorName || (locale === "ar" ? "مجهول" : locale === "en" ? "Anonymous" : "Anonyme")}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
