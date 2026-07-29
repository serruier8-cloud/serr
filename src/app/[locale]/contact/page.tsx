import { getTranslations } from "next-intl/server"
import { ContactForm } from "@/components/locksmith/ContactForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return {
    title: locale === "ar" ? "اتصل بنا | سراج مراكش" : locale === "en" ? "Contact Us | Locksmith Marrakech" : "Contactez-nous | Serrurier Marrakech",
    description: "Contactez notre équipe de serruriers professionnels à Marrakech. Devis gratuit. Intervention rapide 7j/7.",
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-center mb-2">Contactez-nous</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
        Besoin d'un serrurier à Marrakech ? Appelez-nous ou envoyez-nous un message. Intervention rapide 7j/7.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nos coordonnées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <a href="tel:+212600000000" className="text-sm text-primary hover:underline">06 00 00 00 00</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:contact@serruiermarrakech.ma" className="text-sm text-primary hover:underline">contact@serruiermarrakech.ma</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-sm text-muted-foreground">Marrakech, Maroc</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Horaires</p>
                  <p className="text-sm text-muted-foreground">24h/24 - 7j/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export const revalidate = 3600
