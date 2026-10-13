interface LocalBusinessData {
  name: string
  description: string
  url: string
  telephone: string
  address: { addressLocality: string; addressCountry?: string; postalCode?: string; streetAddress?: string }
  geo: { latitude: number; longitude: number }
  image?: string
  priceRange?: string
  openingHours?: string[]
  aggregateRating?: { ratingValue: number; reviewCount: number }
  areaServed?: string[]
}

interface ServiceData {
  name: string
  description: string
  provider: string
  providerUrl?: string
  providerTelephone?: string
  areaServed: string
  priceRange?: string
  priceFrom?: number
  currency?: string
  serviceType?: string
}

interface FAQData {
  items: Array<{ question: string; answer: string }>
}

interface BreadcrumbData {
  items: Array<{ label: string; url?: string }>
}

interface ProductData {
  name: string
  description: string
  price: number
  currency: string
  category: string
  areaServed: string
  brand?: string
}

const OPENING_HOURS_24_7 = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
]

export function buildLocalBusinessSchema(data: LocalBusinessData) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    address: {
      "@type": "PostalAddress",
      addressLocality: data.address.addressLocality,
      addressCountry: data.address.addressCountry || "MA",
      ...(data.address.postalCode && { postalCode: data.address.postalCode }),
      ...(data.address.streetAddress && { streetAddress: data.address.streetAddress }),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    },
    priceRange: data.priceRange || "MAD 150 - MAD 800",
    ...(data.image && { image: data.image }),
    openingHoursSpecification: data.openingHours ? data.openingHours.map(h => ({ "@type": "OpeningHoursSpecification", ...JSON.parse(h) })) : OPENING_HOURS_24_7,
    ...(data.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.aggregateRating.ratingValue,
        reviewCount: data.aggregateRating.reviewCount,
      },
    }),
    ...(data.areaServed && { areaServed: data.areaServed.map(a => ({ "@type": "City", name: a })) }),
  }
  return schema
}

export function buildServiceSchema(data: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    ...(data.serviceType && { serviceType: data.serviceType }),
    provider: {
      "@type": "LocalBusiness",
      name: data.provider,
      ...(data.providerUrl && { url: data.providerUrl }),
      ...(data.providerTelephone && { telephone: data.providerTelephone }),
    },
    areaServed: { "@type": "City", name: data.areaServed },
    hoursAvailable: OPENING_HOURS_24_7,
    ...((data.priceRange || data.priceFrom) && {
      offers: {
        "@type": "Offer",
        priceCurrency: data.currency || "MAD",
        ...(data.priceFrom != null && { price: data.priceFrom }),
        ...(data.priceRange && { priceSpecification: { "@type": "PriceSpecification", price: data.priceRange } }),
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
    }),
  }
}

export function buildFAQSchema(data: FAQData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}

export function buildBreadcrumbSchema(data: BreadcrumbData) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.url && { item: item.url }),
    })),
  }
}

export function buildProductSchema(data: ProductData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    ...(data.brand && { brand: { "@type": "Brand", name: data.brand } }),
    offers: {
      "@type": "Offer",
      price: data.price,
      priceCurrency: data.currency,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      category: data.category,
      areaServed: data.areaServed,
    },
  }
}