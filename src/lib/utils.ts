import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function formatPrice(price: number, locale: string = "fr"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-MA" : locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getArrivalTime(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const km = R * c
  return Math.round((km / 30) * 60 + 10)
}

export function generateMetaTitle(base: string, location: string, service?: string, locale: string = "fr"): string {
  const titles: Record<string, string> = {
    fr: service
      ? `Serrurier ${location} - ${service} | Dépannage 7j/7`
      : `Serrurier ${location} - Dépannage Serrurerie 7j/7 | Urgence`,
    ar: service
      ? `سراج ${location} - ${service} | إصلاح 7/7`
      : `سراج ${location} - إصلاح الأقفال 7/7 | طوارئ`,
    en: service
      ? `Locksmith ${location} - ${service} | 24/7 Emergency Service`
      : `Locksmith ${location} - Lock Repair 24/7 | Emergency`,
  }
  return titles[locale] || titles.fr
}

export function generateMetaDescription(location: string, service?: string, locale: string = "fr"): string {
  const descs: Record<string, string> = {
    fr: service
      ? `🔑 Serrurier ${location} - ${service}. Intervention rapide 30 min. Devis gratuit. Dépannage 7j/7 et jours fériés. Artisans qualifiés et certifiés.`
      : `🔑 Serrurier ${location}. Dépannage serrurerie 7j/7. Intervention 30 min. Devis gratuit. Ouverture de porte, changement serrure, blindage. Artisans certifiés.`,
    ar: service
      ? `🔑 سراج ${location} - ${service}. تدخل سريع 30 دقيقة. تقدير مجاني. إصلاح 7/7 وأيام العطل. حرفيون مؤهلون ومعتمدون.`
      : `🔑 سراج ${location}. إصلاح الأقفال 7/7. تدخل 30 دقيقة. تقدير مجاني. فتح الأبواب، تغيير الأقفال، تدريع. حرفيون معتمدون.`,
    en: service
      ? `🔑 Locksmith ${location} - ${service}. Fast 30 min response. Free quote. 24/7 emergency service including holidays. Qualified certified craftsmen.`
      : `🔑 Locksmith ${location}. Lock repair 24/7. 30 min response. Free quote. Door opening, lock change, door reinforcement. Certified craftsmen.`,
  }
  return descs[locale] || descs.fr
}
