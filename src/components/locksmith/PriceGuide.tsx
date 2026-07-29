interface PriceItem {
  service: string
  priceFrom: number
  priceTo?: number
}

interface PriceGuideProps {
  items: PriceItem[]
  title?: string
}

export function PriceGuide({ items, title = "Guide des prix" }: PriceGuideProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-3 font-medium text-sm">Service</th>
              <th className="text-right p-3 font-medium text-sm">Prix</th>
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
      <p className="text-xs text-muted-foreground mt-2">* Prix indicatifs, un devis gratuit vous sera fourni</p>
    </section>
  )
}
