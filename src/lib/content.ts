const PROBLEM_TEMPLATES_FR: Record<string, string[]> = {
  ouverture_porte: [
    "Vous avez perdu vos clés ? {location} propose une ouverture de porte rapide et sans dommage.",
    "Clé cassée dans la serrure à {location} ? Nos serruriers interviennent en urgence.",
    "Porte claquée à {location} ? Pas de panique, nous intervenons en 30 minutes.",
    "Serrure bloquée à {location} ? Notre équipe de serruriers vous dépanné rapidement.",
  ],
  changement_serrure: [
    "Votre serrure est endommagée à {location} ? Nous la remplaçons par un modèle haute sécurité.",
    "Déménagement à {location} ? Faites changer vos serrures pour plus de sécurité.",
    "Votre cylindre est usé à {location} ? Un changement de serrure s'impose pour votre sécurité.",
    "Après une effraction à {location} ? Changez votre serrure rapidement avec nos experts.",
  ],
  blindage_porte: [
    "Renforcez votre porte à {location} avec un blindage professionnel.",
    "Vous voulez sécuriser votre domicile à {location} ? Le blindage de porte est la solution.",
    "Porte d'entrée fragile à {location} ? Faites-la blinder par nos artisans qualifiés.",
    "La porte de votre appartement à {location} mérite une protection renforcée.",
  ],
}

const PROBLEM_TEMPLATES_AR: Record<string, string[]> = {
  ouverture_porte: [
    "فقدت مفاتيحك في {location}؟ نفتح الأبواب بسرعة وبدون تلف.",
    "مفتاح مكسور في القفل في {location}؟ سراجونا يتدخلون في حالات الطوارئ.",
    "باب مغلق في {location}؟ لا تقلق، نتدخل في 30 دقيقة.",
    "قفل عالق في {location}؟ فريق السراجين لدينا يصلحه بسرعة.",
  ],
  changement_serrure: [
    "قفلك تالف في {location}؟ نستبدله بنموذج عالي الأمان.",
    "انتقال إلى {location}؟ غير أقفالك لمزيد من الأمان.",
    "أسطوانتك مهترئة في {location}؟ تغيير القفل ضروري لسلامتك.",
    "بعد اقتحام في {location}؟ غير قفلك بسرعة مع خبرائنا.",
  ],
  blindage_porte: [
    "عزز بابك في {location}بتدريع احترافي.",
    "تريد تأمين منزلك في {location}؟ تدريع الباب هو الحل.",
    "باب أمامي ضعيف في {location}؟ قم بتدريعه من قبل حرفيينا المؤهلين.",
    "باب شقتك في {location} يستحق حماية معززة.",
  ],
}

const PROBLEM_TEMPLATES_EN: Record<string, string[]> = {
  ouverture_porte: [
    "Lost your keys in {location}? We offer fast, damage-free door opening.",
    "Broken key in the lock at {location}? Our locksmiths respond urgently.",
    "Slammed door at {location}? Don't panic, we arrive within 30 minutes.",
    "Lock jammed at {location}? Our locksmith team will fix it quickly.",
  ],
  changement_serrure: [
    "Your lock is damaged at {location}? We replace it with a high-security model.",
    "Moving to {location}? Get your locks changed for better security.",
    "Worn cylinder at {location}? A lock change is essential for your safety.",
    "After a break-in at {location}? Change your lock quickly with our experts.",
  ],
  blindage_porte: [
    "Reinforce your door at {location} with professional door reinforcement.",
    "Want to secure your home in {location}? Door reinforcement is the solution.",
    "Weak front door at {location}? Get it reinforced by our qualified craftsmen.",
    "Your apartment door at {location} deserves reinforced protection.",
  ],
}

const TEMPLATES: Record<string, Record<string, string[]>> = {
  fr: PROBLEM_TEMPLATES_FR,
  ar: PROBLEM_TEMPLATES_AR,
  en: PROBLEM_TEMPLATES_EN,
}

function slugToKey(slug: string): string {
  if (slug.includes("ouverture-porte") || slug.includes("porte-claquee") || slug.includes("porte-verrouillee") || slug.includes("cle-cassee") || slug.includes("cle-perdue")) {
    return "ouverture_porte"
  }
  if (slug.includes("changement-serrure") || slug.includes("serrure-multipoints") || slug.includes("serrure-haute-securite") || slug.includes("cylindre") || slug.includes("barillet") || slug.includes("reparation-serrure") || slug.includes("installation-serrure")) {
    return "changement_serrure"
  }
  if (slug.includes("blindage") || slug.includes("porte-blindee")) {
    return "blindage_porte"
  }
  return "ouverture_porte"
}

export function generateProblemDescription(locale: string, serviceSlug: string, locationName: string): string {
  const lang = locale as keyof typeof TEMPLATES
  const key = slugToKey(serviceSlug)
  const templates = TEMPLATES[lang]?.[key]
  if (!templates || templates.length === 0) return ""
  const index = (serviceSlug.length + locationName.length) % templates.length
  return templates[index].replace("{location}", locationName)
}

export function generateServiceIntro(locale: string, serviceName: string, locationName: string, cityName: string = "Marrakech"): string {
  const intros: Record<string, string> = {
    fr: `Vous recherchez un service de ${serviceName.toLowerCase()} à ${locationName} ${cityName} ? Notre équipe de serruriers professionnels intervient rapidement dans tout le quartier ${locationName} et ses environs. Que ce soit pour une urgence ou un rendez-vous programmé, nous garantissons un travail de qualité avec des prix transparents et un devis gratuit.`,
    ar: `هل تبحث عن خدمة ${serviceName} في ${locationName} ${cityName}؟ فريق السراجين المحترفين لدينا يتدخل بسرعة في جميع أنحاء حي ${locationName} والمناطق المجاورة. سواء كانت حالة طارئة أو موعدًا مبرمجًا، نضمن عملاً عالي الجودة بأسعار شفافة وتقدير مجاني.`,
    en: `Looking for ${serviceName.toLowerCase()} service in ${locationName} ${cityName}? Our team of professional locksmiths responds quickly throughout ${locationName} and surrounding areas. Whether for an emergency or scheduled appointment, we guarantee quality work with transparent pricing and a free quote.`,
  }
  return intros[locale] || intros.fr
}

export function generateServiceFAQ(locale: string, serviceName: string, locationName: string, arrivalTime: number): Array<{ question: string; answer: string }> {
  const faqsFR = [
    { q: `Proposez-vous ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Oui, nous proposons ${serviceName.toLowerCase()} dans tout le quartier ${locationName} et ses environs. Notre équipe de serruriers qualifiés intervient 7j/7 avec un délai de ${arrivalTime} minutes seulement.` },
    { q: `Quel est le prix de ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Le prix de ${serviceName.toLowerCase()} à ${locationName} commence à partir de 150 MAD. Le devis est gratuit et sans engagement. Nous vous communiquons le prix exact avant toute intervention.` },
    { q: `Quel est le délai d'intervention pour ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Notre serrurier arrive généralement en ${arrivalTime} minutes dans le quartier ${locationName}. Nous priorisons les interventions d'urgence pour vous dépanner le plus rapidement possible.` },
    { q: `Êtes-vous disponibles 7j/7 pour ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Oui, nous sommes disponibles 24h/24 et 7j/7, y compris les jours fériés et les week-ends pour ${serviceName.toLowerCase()} à ${locationName}.` },
    { q: `Intervenez-vous dans tout ${locationName} pour ${serviceName.toLowerCase()} ?`, a: `Oui, nous couvrons l'ensemble du quartier ${locationName} ainsi que les zones résidentielles et commerciales environnantes pour ${serviceName.toLowerCase()}.` },
  ]

  const faqsAR = [
    { q: `هل تقدمون ${serviceName} في ${locationName}؟`, a: `نعم، نقدم ${serviceName} في جميع أنحاء حي ${locationName} والمناطق المجاورة. فريق السراجين المؤهلين لدينا يتدخل 7/7 خلال ${arrivalTime} دقيقة فقط.` },
    { q: `ما هو سعر ${serviceName} في ${locationName}؟`, a: `سعر ${serviceName} في ${locationName} يبدأ من 150 درهم. التقدير مجاني وبدون التزام. نبلغك بالسعر الدقيق قبل أي تدخل.` },
    { q: `ما هو وقت التدخل لـ ${serviceName} في ${locationName}؟`, a: `يصل سراجنا عادة في غضون ${arrivalTime} دقيقة في حي ${locationName}. نعطي الأولوية لحالات الطوارئ لمساعدتك في أسرع وقت ممكن.` },
    { q: `هل أنتم متاحون 7/7 لـ ${serviceName} في ${locationName}؟`, a: `نعم، نحن متاحون 24/7 و 7 أيام في الأسبوع، بما في ذلك العطلات وعطلات نهاية الأسبوع لـ ${serviceName} في ${locationName}.` },
    { q: `هل تتدخلون في جميع أنحاء ${locationName} لـ ${serviceName}؟`, a: `نعم، نغطي حي ${locationName} بأكمله بالإضافة إلى المناطق السكنية والتجارية المحيطة لـ ${serviceName}.` },
  ]

  const faqsEN = [
    { q: `Do you offer ${serviceName.toLowerCase()} in ${locationName}?`, a: `Yes, we offer ${serviceName.toLowerCase()} throughout ${locationName} and surrounding areas. Our team of qualified locksmiths responds 24/7 within ${arrivalTime} minutes only.` },
    { q: `What is the price for ${serviceName.toLowerCase()} in ${locationName}?`, a: `The price for ${serviceName.toLowerCase()} in ${locationName} starts from 150 MAD. The quote is free with no obligation. We provide the exact price before any intervention.` },
    { q: `How fast can you respond for ${serviceName.toLowerCase()} in ${locationName}?`, a: `Our locksmith typically arrives within ${arrivalTime} minutes in ${locationName}. We prioritize emergency calls to help you as quickly as possible.` },
    { q: `Are you available 24/7 for ${serviceName.toLowerCase()} in ${locationName}?`, a: `Yes, we are available 24/7 and 365 days a year, including holidays and weekends for ${serviceName.toLowerCase()} in ${locationName}.` },
    { q: `Do you cover all of ${locationName} for ${serviceName.toLowerCase()}?`, a: `Yes, we cover the entire ${locationName} area as well as surrounding residential and commercial zones for ${serviceName.toLowerCase()}.` },
  ]

  const faqs: Record<string, Array<{ q: string; a: string }>> = { fr: faqsFR, ar: faqsAR, en: faqsEN }
  return (faqs[locale] || faqsFR).map(f => ({ question: f.q, answer: f.a }))
}

export function generateLocationIntro(locale: string, locationName: string, arrondissement: string | null, arrivalTime: number): string {
  const intros: Record<string, string> = {
    fr: `Bienvenue sur la page du serrurier professionnel à ${locationName}, l'un des quartiers les plus dynamiques de Marrakech${arrondissement ? ` situé dans l'arrondissement ${arrondissement}` : ""}. Notre équipe de serruriers qualifiés intervient rapidement dans tout ${locationName} et ses environs avec un temps d'arrivée estimé de ${arrivalTime} minutes. Que vous habitiez dans une résidence, un lotissement ou un immeuble, nous sommes à votre service 7j/7 pour tous vos besoins de serrurerie.`,
    ar: `مرحبًا بكم في صفحة السراج المحترف في ${locationName}، أحد أكثر الأحياء حيوية في مراكش${arrondissement ? ` الواقعة في مقاطعة ${arrondissement}` : ""}. فريق السراجين المؤهلين لدينا يتدخل بسرعة في جميع أنحاء ${locationName} والمناطق المجاورة بوقت وصول يقدر بـ ${arrivalTime} دقيقة. سواء كنت تقيم في مجمع سكني أو عمارة، نحن في خدمتك 7/7 لجميع احتياجات الأقفال الخاصة بك.`,
    en: `Welcome to the page of the professional locksmith in ${locationName}, one of the most dynamic neighborhoods of Marrakech${arrondissement ? ` located in the ${arrondissement} district` : ""}. Our team of qualified locksmiths responds quickly throughout ${locationName} and surrounding areas with an estimated arrival time of ${arrivalTime} minutes. Whether you live in a residence, housing complex, or apartment building, we are at your service 24/7 for all your locksmith needs.`,
  }
  return intros[locale] || intros.fr
}
