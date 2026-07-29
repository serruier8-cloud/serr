import Link from "next/link"
import { Wrench } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ServiceItem {
  slug: string
  name: string
  description?: string
  priceFrom?: number
}

interface ServiceListProps {
  services: ServiceItem[]
  locationSlug?: string
  locale?: string
}

export function ServiceList({ services, locationSlug }: ServiceListProps) {
  const prefix = locationSlug ? `/marrakech/${locationSlug}` : "/marrakech"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <Link key={service.slug} href={`${prefix}/${service.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2 shrink-0">
                  <Wrench className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">{service.name}</h3>
                  {service.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                  )}
                  {service.priceFrom && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      À partir de {service.priceFrom} MAD
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
