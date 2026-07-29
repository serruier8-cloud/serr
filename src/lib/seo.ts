export function generateMetaTitle(params: {
  locale: string
  locationName?: string
  serviceName?: string
  cityName?: string
  page?: "home" | "city" | "location" | "service" | "location_service"
}): string {
  const { locale, locationName, serviceName, cityName = "Marrakech" } = params

  const titles: Record<string, Record<string, string>> = {
    fr: {
      home: "Serrurier Marrakech - Dépannage Serrurerie 7j/7 | Urgence 30 min",
      city: `Serrurier ${cityName} - Dépannage Serrurerie 7j/7 | Intervention Rapide`,
      location: `Serrurier ${locationName} ${cityName} - Dépannage ${locationName} 7j/7`,
      service: `${serviceName} ${cityName} - Serrurier 7j/7 | Devis Gratuit`,
      location_service: `${serviceName} ${locationName} ${cityName} - Intervention Rapide 30 min`,
    },
    ar: {
      home: "سراج مراكش - إصلاح الأقفال 7/7 | طوارئ 30 دقيقة",
      city: `سراج ${cityName} - إصلاح الأقفال 7/7 | تدخل سريع`,
      location: `سراج ${locationName} ${cityName} - إصلاح ${locationName} 7/7`,
      service: `${serviceName} ${cityName} - سراج 7/7 | تقدير مجاني`,
      location_service: `${serviceName} ${locationName} ${cityName} - تدخل سريع 30 دقيقة`,
    },
    en: {
      home: "Locksmith Marrakech - 24/7 Emergency Locksmith | 30 min Response",
      city: `Locksmith ${cityName} - 24/7 Emergency Service | Fast Response`,
      location: `Locksmith ${locationName} ${cityName} - 24/7 Emergency Service`,
      service: `${serviceName} ${cityName} - 24/7 Locksmith | Free Quote`,
      location_service: `${serviceName} ${locationName} ${cityName} - Fast 30 min Response`,
    },
  }

  const lang = locale as keyof typeof titles
  const pageKey = params.page || "home"
  return titles[lang]?.[pageKey] || titles.fr.home
}

export function generateMetaDescription(params: {
  locale: string
  locationName?: string
  serviceName?: string
  cityName?: string
  arrivalTime?: number
  page?: "home" | "city" | "location" | "service" | "location_service"
}): string {
  const { locale, locationName, serviceName, cityName = "Marrakech", arrivalTime = 30 } = params

  const descs: Record<string, Record<string, string>> = {
    fr: {
      home: `🔑 Serrurier Marrakech - Dépannage serrurerie 7j/7. Intervention rapide ${arrivalTime} min. Ouverture porte, changement serrure, blindage. Devis gratuit. Artisans qualifiés et certifiés. Urgence 24h/24.`,
      city: `🔑 Serrurier professionnel à ${cityName}. Intervention ${arrivalTime} min. Ouverture de porte, changement de serrure, blindage. Devis gratuit 7j/7. Serruriers qualifiés dans toute ${cityName}.`,
      location: `🔑 Serrurier professionnel ${locationName} ${cityName}. Intervention rapide ${arrivalTime} min. Ouverture porte, changement serrure, blindage. Devis gratuit 7j/7. Artisans certifiés.`,
      service: `🔑 ${serviceName} à ${cityName}. Intervention rapide ${arrivalTime} min. Devis gratuit. Serruriers professionnels 7j/7. Dépannage urgence. Prix transparents.`,
      location_service: `🔑 ${serviceName} ${locationName} ${cityName}. Intervention rapide ${arrivalTime} min. Devis gratuit. Serruriers qualifiés 7j/7. Dépannage urgence dans tout ${locationName}.`,
    },
    ar: {
      home: `🔑 سراج مراكش - إصلاح الأقفال 7/7. تدخل سريع ${arrivalTime} دقيقة. فتح أبواب، تغيير أقفال، تدريع. تقدير مجاني. حرفيون مؤهلون ومعتمدون. طوارئ 24/7.`,
      city: `🔑 سراج محترف في ${cityName}. تدخل ${arrivalTime} دقيقة. فتح أبواب، تغيير أقفال، تدريع. تقدير مجاني 7/7. سراجون مؤهلون في جميع أنحاء ${cityName}.`,
      location: `🔑 سراج محترف ${locationName} ${cityName}. تدخل سريع ${arrivalTime} دقيقة. فتح أبواب، تغيير أقفال، تدريع. تقدير مجاني 7/7. حرفيون معتمدون.`,
      service: `🔑 ${serviceName} في ${cityName}. تدخل سريع ${arrivalTime} دقيقة. تقدير مجاني. سراجون محترفون 7/7. إصلاح طوارئ. أسعار شفافة.`,
      location_service: `🔑 ${serviceName} ${locationName} ${cityName}. تدخل سريع ${arrivalTime} دقيقة. تقدير مجاني. سراجون مؤهلون 7/7. إصلاح طوارئ في جميع أنحاء ${locationName}.`,
    },
    en: {
      home: `🔑 Locksmith Marrakech - 24/7 emergency locksmith. Fast ${arrivalTime} min response. Door opening, lock change, door reinforcement. Free quote. Qualified certified craftsmen. Emergency 24/7.`,
      city: `🔑 Professional locksmith in ${cityName}. ${arrivalTime} min response. Door opening, lock change, reinforcement. Free quote 24/7. Qualified locksmiths across ${cityName}.`,
      location: `🔑 Professional locksmith ${locationName} ${cityName}. Fast ${arrivalTime} min response. Door opening, lock change, reinforcement. Free quote 24/7. Certified craftsmen.`,
      service: `🔑 ${serviceName} in ${cityName}. Fast ${arrivalTime} min response. Free quote. Professional locksmiths 24/7. Emergency repair. Transparent pricing.`,
      location_service: `🔑 ${serviceName} ${locationName} ${cityName}. Fast ${arrivalTime} min response. Free quote. Qualified locksmiths 24/7. Emergency repair across ${locationName}.`,
    },
  }

  const lang = locale as keyof typeof descs
  const pageKey = params.page || "home"
  return descs[lang]?.[pageKey] || descs.fr.home
}

export function generateOpenGraph(params: {
  locale: string
  title: string
  description: string
  url?: string
  image?: string | null
}) {
  return {
    title: params.title,
    description: params.description,
    locale: params.locale === "ar" ? "ar_MA" : params.locale === "en" ? "en_US" : "fr_FR",
    siteName: "Serrurier Marrakech",
    ...(params.url && { url: params.url }),
    ...(params.image != null && { images: [{ url: params.image, width: 1200, height: 630 }] }),
  }
}
