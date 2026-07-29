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
  areaServed: string
  priceRange?: string
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
}

export function buildLocalBusinessSchema(data: LocalBusinessData) {
  const schema: any = {
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
    priceRange: data.priceRange || "$$",
    ...(data.image && { image: data.image }),
    ...(data.openingHours && { openingHoursSpecification: data.openingHours.map(h => ({ "@type": "OpeningHoursSpecification", ...JSON.parse(h) })) }),
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
    provider: { "@type": "LocalBusiness", name: data.provider },
    areaServed: { "@type": "City", name: data.areaServed },
    ...(data.priceRange && { offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", price: data.priceRange } } }),
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
