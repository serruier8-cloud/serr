"use client"

import { motion } from "motion/react"
import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { StaggerContainer, staggerItemVariants } from "@/components/motion/StaggerContainer"

interface TestimonialsSectionProps {
  locale: "fr" | "ar" | "en"
}

const TESTIMONIALS: Record<
  "fr" | "ar" | "en",
  Array<{ name: string; role: string; text: string; initials: string }>
> = {
  fr: [
    { name: "Karim B.", role: "Quartier Gueliz", text: "Serrure bloquée un dimanche soir, le serrurier est arrivé en 25 minutes. Travail propre, prix annoncé au téléphone respecté. Je recommande vivement.", initials: "KB" },
    { name: "Sophie L.", role: "Quartier Médina", text: "Installation d'une serrure intelligente Yale parfaitement réalisée. Équipe professionnelle et ponctuelle, configuration de l'application incluse.", initials: "SL" },
    { name: "Youssef M.", role: "Quartier Massira", text: "Après un cambriolage, j'ai fait changer toutes les serrures et blindé la porte. Conseil honnête, pas de vente inutile. Très satisfait.", initials: "YM" },
    { name: "Amal R.", role: "Quartier Targa", text: "Devis gratuit au téléphone, intervention rapide et propre. Serrurier poli et efficace. Prix correct pour un dépannage de nuit.", initials: "AR" },
    { name: "Jean-Pierre D.", role: "Quartier Palmeraie", text: "Excellente expérience pour l'ouverture de ma voiture sans aucune rayure. Vraiment des professionnels, je les ai gardés pour toutes mes serrures.", initials: "JD" },
    { name: "Fatima Z.", role: "Quartier Daoudiate", text: "Serrure intelligente Samsung installée en moins d'une heure. L'équipe m'a tout expliqué et m'a même aidée avec l'application. Merci !", initials: "FZ" },
  ],
  ar: [
    { name: "كريم ب.", role: "حي جيليز", text: "قفل مقفل ليلة الأحد، وصل السراج في 25 دقيقة. عمل نظيف وسعر معلن عبر الهاتف محترم. أنصح به بشدة.", initials: "KB" },
    { name: "صوفي ل.", role: "حي المدينة", text: "تركيب قفل Yale الذكي تم بشكل مثالي. فريق محترف وفي الموعد مع إعداد التطبيق مشمول.", initials: "SL" },
    { name: "يوسف م.", role: "حي المسيرة", text: "بعد السطو، غيّرت كل الأقفال ودرعت الباب. نصيحة صادقة دون بيع غير ضروري. راضٍ جدًا.", initials: "YM" },
    { name: "أمل ر.", role: "حي تاركة", text: "تقييم مجاني عبر الهاتف، تدخل سريع ونظيف. سراج مهذب وفعال. سعر مناسب لتدخل ليلي.", initials: "AR" },
    { name: "جان بيير د.", role: "حي النخيل", text: "تجربة ممتازة لفتح سيارتي دون أي خدش. محترفون حقيقيون، احتفظت بهم لكل أقفالي.", initials: "JD" },
    { name: "فاطمة ز.", role: "حي الداوديات", text: "قفل Samsung الذكي تم تركيبه في أقل من ساعة. الشرح كامل وساعدوني حتى مع التطبيق. شكرًا!", initials: "FZ" },
  ],
  en: [
    { name: "Karim B.", role: "Gueliz district", text: "Lock jammed on a Sunday night, the locksmith arrived in 25 minutes. Clean job, phone price respected. Highly recommended.", initials: "KB" },
    { name: "Sophie L.", role: "Medina district", text: "Perfect Yale smart lock installation. Professional and punctual team, app setup included.", initials: "SL" },
    { name: "Youssef M.", role: "Massira district", text: "After a burglary I replaced all locks and reinforced my door. Honest advice, no unnecessary upselling. Very satisfied.", initials: "YM" },
    { name: "Amal R.", role: "Targa district", text: "Free phone quote, fast and clean intervention. Polite and efficient locksmith. Fair price for a night call-out.", initials: "AR" },
    { name: "Jean-Pierre D.", role: "Palmeraie district", text: "Great experience opening my car with zero scratches. Real professionals, I kept them for all my locks.", initials: "JD" },
    { name: "Fatima Z.", role: "Daoudiate district", text: "Samsung smart lock installed in under an hour. They explained everything and even helped with the app. Thank you!", initials: "FZ" },
  ],
}

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const testimonials = TESTIMONIALS[locale]
  const title = locale === "ar" ? "آراء عملائنا" : locale === "en" ? "What our clients say" : "Ils nous font confiance"
  const subtitle = locale === "ar"
    ? "أكثر من 150 عميلاً راضياً في مراكش"
    : locale === "en"
    ? "More than 150 satisfied clients in Marrakech"
    : "Plus de 150 clients satisfaits à Marrakech"

  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Star className="h-4 w-4 fill-current" />
          {locale === "ar" ? "4.8/5" : locale === "en" ? "4.8/5" : "4.8/5"}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <motion.div key={t.name} variants={staggerItemVariants}>
            <Card className="h-full card-hover border-border/60 relative overflow-hidden">
              <Quote className="absolute top-4 right-4 h-10 w-10 text-primary/10" />
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">“{t.text}”</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  )
}
