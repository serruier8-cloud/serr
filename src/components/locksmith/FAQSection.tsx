"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FAQItem[]
  title?: string
}

export function FAQSection({ items, title = "Questions fréquentes" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-muted/50 transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown className={cn("h-5 w-5 transition-transform", openIndex === i && "rotate-180")} />
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 text-sm text-muted-foreground">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
