import Link from "next/link"
import { Star, Phone, MapPin, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface LocksmithCardProps {
  id: string
  companyName: string
  slug: string
  rating: number
  reviewCount: number
  phone: string
  description?: string
  emergencyAvailable?: boolean
  available247?: boolean
  isVerified?: boolean
  locations?: { name: string; slug: string }[]
}

export function LocksmithCard({
  companyName,
  slug,
  rating,
  reviewCount,
  phone,
  description,
  emergencyAvailable,
  available247,
  isVerified,
  locations,
}: LocksmithCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary/10 text-primary text-lg">
              {companyName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/serrurier/${slug}`} className="font-semibold text-lg hover:text-primary truncate">
                {companyName}
              </Link>
              {isVerified && (
                <Badge variant="success" className="shrink-0">
                  <Shield className="h-3 w-3 mr-1" /> Vérifié
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
            )}
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {rating.toFixed(1)} ({reviewCount} avis)
              </span>
              {emergencyAvailable && <Badge variant="emergency">Urgence</Badge>}
              {available247 && <Badge variant="warning">24h/24</Badge>}
            </div>
            {locations && locations.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {locations.slice(0, 3).map((loc) => (
                  <Link key={loc.slug} href={`/marrakech/${loc.slug}`} className="text-xs text-primary hover:underline">
                    <MapPin className="h-3 w-3 inline mr-0.5" />{loc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href={`tel:${phone}`}>
            <Button variant="default" size="sm" className="shrink-0">
              <Phone className="h-4 w-4 mr-1" /> Appeler
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
