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
      city: `Serrurier ${cityName} - Dépannage Serrurerie 7j/7 | Intervention Rapide 30 min`,
      location: `Serrurier ${locationName} ${cityName} - Dépannage 7j/7 | Devis Gratuit`,
      service: `${serviceName} ${cityName} - Serrurier 7j/7 | Devis Gratuit`,
      location_service: `${serviceName} ${locationName} ${cityName} - Serrurier 7j/7 | Devis Gratuit`,
    },
    ar: {
      home: "سراج مراكش - إصلاح الأقفال 7/7 | طوارئ 30 دقيقة",
      city: `سراج ${cityName} - إصلاح الأقفال 7/7 | تدخل سريع 30 دقيقة`,
      location: `سراج ${locationName} ${cityName} - إصلاح 7/7 | تقدير مجاني`,
      service: `${serviceName} ${cityName} - سراج 7/7 | تقدير مجاني`,
      location_service: `${serviceName} ${locationName} ${cityName} - سراج 7/7 | تقدير مجاني`,
    },
    en: {
      home: "Locksmith Marrakech - 24/7 Emergency Locksmith | 30 min Response",
      city: `Locksmith ${cityName} - 24/7 Emergency Service | 30 min Response`,
      location: `Locksmith ${locationName} ${cityName} - 24/7 Service | Free Quote`,
      service: `${serviceName} ${cityName} - 24/7 Locksmith | Free Quote`,
      location_service: `${serviceName} ${locationName} ${cityName} - 24/7 Locksmith | Free Quote`,
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
  priceFrom?: number
  page?: "home" | "city" | "location" | "service" | "location_service"
}): string {
  const { locale, locationName, serviceName, cityName = "Marrakech", arrivalTime = 30, priceFrom } = params

  const descs: Record<string, Record<string, string>> = {
    fr: {
      home: `Serrurier Marrakech - Dépannage serrurerie 7j/7. Intervention rapide ${arrivalTime} min. Ouverture porte, changement serrure, blindage. Devis gratuit. Artisans qualifiés et certifiés. Urgence 24h/24.`,
      city: `Serrurier professionnel à ${cityName}. Intervention ${arrivalTime} min. Ouverture de porte, changement de serrure, blindage. Devis gratuit 7j/7. Serruriers qualifiés dans toute ${cityName}.`,
      location: `Serrurier professionnel ${locationName} ${cityName}. Intervention rapide ${arrivalTime} min. Ouverture porte, changement serrure, blindage. Devis gratuit 7j/7. Artisans certifiés.`,
      service: `${serviceName} à ${cityName} dès ${priceFrom ?? 150} MAD. Intervention rapide ${arrivalTime} min, 7j/7. Devis gratuit. Serruriers professionnels qualifiés. Prix transparents.`,
      location_service: `${serviceName} à ${locationName} ${cityName} dès ${priceFrom ?? 150} MAD. Intervention ${arrivalTime} min, 7j/7. Devis gratuit. Serruriers qualifiés dans tout ${locationName}.`,
    },
    ar: {
      home: `صانع أقفال مراكش - إصلاح الأقفال 7/7. تدخل سريع ${arrivalTime} دقيقة. فتح أبواب، تغيير أقفال، تدريع. تقدير مجاني. حرفيون مؤهلون ومعتمدون. طوارئ 24/7.`,
      city: `سراج محترف في ${cityName}. تدخل ${arrivalTime} دقيقة. فتح أبواب، تغيير أقفال، تدريع. تقدير مجاني 7/7. سراجون مؤهلون في جميع أنحاء ${cityName}.`,
      location: `سراج محترف ${locationName} ${cityName}. تدخل سريع ${arrivalTime} دقيقة. فتح أبواب، تغيير أقفال، تدريع. تقدير مجاني 7/7. حرفيون معتمدون.`,
      service: `${serviceName} في ${cityName} من ${priceFrom ?? 150} درهم. تدخل سريع ${arrivalTime} دقيقة، 7/7. تقدير مجاني. سراجون محترفون مؤهلون. أسعار شفافة.`,
      location_service: `${serviceName} في ${locationName} ${cityName} من ${priceFrom ?? 150} درهم. تدخل ${arrivalTime} دقيقة، 7/7. تقدير مجاني. سراجون مؤهلون في جميع أنحاء ${locationName}.`,
    },
    en: {
      home: `Locksmith Marrakech - 24/7 emergency locksmith. Fast ${arrivalTime} min response. Door opening, lock change, door reinforcement. Free quote. Qualified certified craftsmen. Emergency 24/7.`,
      city: `Professional locksmith in ${cityName}. ${arrivalTime} min response. Door opening, lock change, reinforcement. Free quote 24/7. Qualified locksmiths across ${cityName}.`,
      location: `Professional locksmith ${locationName} ${cityName}. Fast ${arrivalTime} min response. Door opening, lock change, reinforcement. Free quote 24/7. Certified craftsmen.`,
      service: `${serviceName} in ${cityName} from ${priceFrom ?? 150} MAD. Fast ${arrivalTime} min response, 24/7. Free quote. Qualified professional locksmiths. Transparent pricing.`,
      location_service: `${serviceName} in ${locationName} ${cityName} from ${priceFrom ?? 150} MAD. ${arrivalTime} min response, 24/7. Free quote. Qualified locksmiths across ${locationName}.`,
    },
  }

  const lang = locale as keyof typeof descs
  const pageKey = params.page || "home"
  return descs[lang]?.[pageKey] || descs.fr.home
}

export function generateHreflang(path: string) {
  const base = "https://www.serruriermarrakech.ma"
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "")
  const suffix = clean ? `/${clean}` : ""
  return {
    fr: `${base}/fr${suffix}`,
    ar: `${base}/ar${suffix}`,
    en: `${base}/en${suffix}`,
    "x-default": `${base}/fr${suffix}`,
  }
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