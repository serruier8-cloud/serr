import {
  SMART_LOCK_PRODUCTS,
  SMART_LOCK_TYPES,
  SMART_LOCK_BRANDS,
  SMART_LOCK_FEATURES,
  SMART_LOCK_SERVICES,
  SMART_LOCK_SERVICE_PRICES,
  SMART_LOCK_INSTALL_STEPS,
} from "@/lib/smart-lock-content"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SmartLockContentProps {
  locale: "fr" | "ar" | "en"
  locationName?: string
}

export function SmartLockContent({ locale, locationName = "Marrakech" }: SmartLockContentProps) {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {locale === "fr" ? `Produits de serrures intelligentes disponibles à ${locationName}` : locale === "ar" ? `أقفال ذكية متوفرة في ${locationName}` : `Smart lock products available in ${locationName}`}
        </h2>
        <p className="text-muted-foreground mb-6">
          {locale === "fr"
            ? "Découvrez les serrures intelligentes de grandes marques disponibles sur le marché marocain à Marrakech : Yale, Samsung, Xiaomi, August, Nuki et Ultraloq. Prix indicatifs, installation incluse."
            : locale === "ar"
              ? "اكتشف الأقفال الذكية من كبرى العلامات التجارية المتوفرة في السوق المغربية بمراكش: Yale، Samsung، Xiaomi، August، Nuki وUltraloq. أسعار تقريبية والتركيب مشمول."
              : "Discover smart locks from leading brands available on the Moroccan market in Marrakech: Yale, Samsung, Xiaomi, August, Nuki and Ultraloq. Indicative prices, installation included."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SMART_LOCK_PRODUCTS.map((product) => (
            <Card key={product.id} className="overflow-hidden h-full flex flex-col card-hover">
              <div className="relative h-48 bg-gradient-to-br from-muted to-card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={`${product.brand} ${product.model}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="secondary">{product.brand}</Badge>
                  <span className="text-sm font-semibold text-primary">{product.priceFrom} MAD</span>
                </div>
                <h3 className="font-semibold mb-1.5">{product.name[locale]}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{product.description[locale]}</p>
                <ul className="space-y-1.5 mb-3 mt-auto">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
                      <span>{f[locale]}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {locale === "fr" ? `Types de serrures intelligentes à ${locationName}` : locale === "ar" ? `أنواع الأقفال الذكية في ${locationName}` : `Types of smart locks in ${locationName}`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SMART_LOCK_TYPES.map((type) => (
            <Card key={type.id} className="overflow-hidden h-full flex flex-col card-hover">
              <div className="relative h-44 bg-gradient-to-br from-muted to-card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={type.image} alt={type.name[locale]} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <CardContent className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{type.name[locale]}</h3>
                  <Badge variant="outline">{type.priceRange[locale]}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{type.description[locale]}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {type.access.map((a, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{a[locale]}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {locale === "fr" ? "Marques de serrures intelligentes disponibles" : locale === "ar" ? "علامات الأقفال الذكية المتوفرة" : "Smart lock brands available"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {SMART_LOCK_BRANDS.map((brand) => (
            <Badge key={brand} variant="secondary" className="px-3 py-1.5 text-sm">{brand}</Badge>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {locale === "fr" ? `Avantages d'une serrure intelligente à ${locationName}` : locale === "ar" ? `مزايا القفل الذكي في ${locationName}` : `Benefits of a smart lock in ${locationName}`}
        </h2>
        <Card>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {SMART_LOCK_FEATURES[locale].map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {locale === "fr" ? `Prix d'installation et de réparation à ${locationName}` : locale === "ar" ? `أسعار التركيب والإصلاح في ${locationName}` : `Installation and repair prices in ${locationName}`}
        </h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 font-medium text-sm">
                  {locale === "fr" ? "Prestation" : locale === "ar" ? "الخدمة" : "Service"}
                </th>
                <th className="text-right p-3 font-medium text-sm">
                  {locale === "fr" ? "Prix TTC" : locale === "ar" ? "السعر شامل" : "Price inc. VAT"}
                </th>
              </tr>
            </thead>
            <tbody>
              {SMART_LOCK_SERVICES.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 text-sm">{s[locale]}</td>
                  <td className="p-3 text-sm text-right font-medium">{SMART_LOCK_SERVICE_PRICES[i]} MAD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {locale === "fr" ? "* Prix indicatifs, un devis gratuit vous sera fourni après évaluation." : locale === "ar" ? "* أسعار تقريبية، سيُمنح لك تقدير مجاني بعد التقييم." : "* Indicative prices, a free quote will be provided after assessment."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          {locale === "fr" ? `Étapes d'installation de votre serrure intelligente à ${locationName}` : locale === "ar" ? `خطوات تركيب قفلك الذكي في ${locationName}` : `Steps to install your smart lock in ${locationName}`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SMART_LOCK_INSTALL_STEPS.map((step, i) => (
            <Card key={i} className="h-full card-hover">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-lg p-2 shrink-0 w-10 h-10 flex items-center justify-center font-bold text-primary">
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{step[locale]}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}