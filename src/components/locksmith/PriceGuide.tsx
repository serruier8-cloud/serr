interface PriceItem {
  service: string
  priceFrom: number
  priceTo?: number
}

interface PriceGuideProps {
  items: PriceItem[]
  title?: string
  locale?: string
}

export function PriceGuide({ items, title, locale = "fr" }: PriceGuideProps) {
  const t = (fr: string, ar: string, en: string) => (locale === "ar" ? ar : locale === "en" ? en : fr)
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title ?? t("Guide des prix", "دليل الأسعار", "Price guide")}</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-3 font-medium text-sm">{t("Service", "الخدمة", "Service")}</th>
              <th className="text-right p-3 font-medium text-sm">{t("Prix", "السعر", "Price")}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-3 text-sm">{item.service}</td>
                <td className="p-3 text-sm text-right font-medium">
                  {item.priceFrom} MAD
                  {item.priceTo ? ` - ${item.priceTo} MAD` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{t("* Prix indicatifs, un devis gratuit vous sera fourni", "* أسعار تقريبية، سيُمنح لك تقدير مجاني", "* Indicative prices, a free quote will be provided")}</p>
    </section>
  )
}
