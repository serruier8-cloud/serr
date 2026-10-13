"use client"

import { AnimateInView } from "@/components/motion/AnimateInView"
import { FAQSection } from "@/components/locksmith/FAQSection"

interface FAQItem {
  question: string
  answer: string
}

export function FAQSectionWrapper({ items, title, locale }: { items: FAQItem[]; title: string; locale: "fr" | "ar" | "en" }) {
  return (
    <section className="bg-muted/20 py-20">
      <div className="container">
        <AnimateInView>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {locale === "ar"
                ? "كل ما تحتاج معرفته عن خدماتنا في السراجة بمراكش"
                : locale === "en"
                ? "Everything you need to know about our locksmith services in Marrakech"
                : "Tout ce que vous devez savoir sur nos services de serrurerie à Marrakech"}
            </p>
          </div>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <FAQSection items={items} title={title} />
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
