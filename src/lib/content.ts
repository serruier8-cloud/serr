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
  const s = slug.toLowerCase()
  if (s.includes("ouverture-porte") || s.includes("porte-claquee") || s.includes("porte-verrouillee") || s.includes("cle-cassee") || s.includes("cle-perdue") || s.includes("door-opening") || s.includes("slammed-door") || s.includes("locked-door") || s.includes("broken-key") || s.includes("lost-key")) {
    return "ouverture_porte"
  }
  if (s.includes("changement-serrure") || s.includes("serrure-multipoints") || s.includes("serrure-haute-securite") || s.includes("cylindre") || s.includes("barillet") || s.includes("reparation-serrure") || s.includes("installation-serrure") || s.includes("lock-change") || s.includes("multi-point") || s.includes("high-security") || s.includes("european-cylinder") || s.includes("lock-barrel") || s.includes("lock-repair") || s.includes("lock-installation") || s.includes("electronic-lock") || s.includes("smart-lock")) {
    return "changement_serrure"
  }
  if (s.includes("blindage") || s.includes("porte-blindee") || s.includes("door-reinforcement") || s.includes("reinforced-door")) {
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

export function generateServiceFAQ(locale: string, serviceName: string, locationName: string, arrivalTime: number, priceFrom: number = 150): Array<{ question: string; answer: string }> {
  const faqsFR = [
    { q: `Proposez-vous ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Oui, nous proposons ${serviceName.toLowerCase()} dans tout le quartier ${locationName} et ses environs. Notre équipe de serruriers qualifiés intervient 7j/7 avec un délai de ${arrivalTime} minutes seulement.` },
    { q: `Quel est le prix de ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Le prix de ${serviceName.toLowerCase()} à ${locationName} commence à partir de ${priceFrom} MAD. Le devis est gratuit et sans engagement. Nous vous communiquons le prix exact avant toute intervention.` },
    { q: `Quel est le délai d'intervention pour ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Notre serrurier arrive généralement en ${arrivalTime} minutes dans le quartier ${locationName}. Nous priorisons les interventions d'urgence pour vous dépanner le plus rapidement possible.` },
    { q: `Êtes-vous disponibles 7j/7 pour ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Oui, nous sommes disponibles 24h/24 et 7j/7, y compris les jours fériés et les week-ends pour ${serviceName.toLowerCase()} à ${locationName}.` },
    { q: `Intervenez-vous dans tout ${locationName} pour ${serviceName.toLowerCase()} ?`, a: `Oui, nous couvrons l'ensemble du quartier ${locationName} ainsi que les zones résidentielles et commerciales environnantes pour ${serviceName.toLowerCase()}.` },
    { q: `Intervenez-vous le dimanche et les jours fériés pour ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Oui, notre équipe assure ${serviceName.toLowerCase()} à ${locationName} 7j/7, y compris les dimanches et jours fériés, sans supplément de prix.` },
    { q: `Comment payer ${serviceName.toLowerCase()} à ${locationName} ?`, a: `Le paiement s'effectue à la fin de l'intervention, en espèces ou par virement. Le devis est gratuit et le prix est confirmé avant le début de ${serviceName.toLowerCase()} à ${locationName}.` },
  ]

  const faqsAR = [
    { q: `هل تقدمون ${serviceName} في ${locationName}؟`, a: `نعم، نقدم ${serviceName} في جميع أنحاء حي ${locationName} والمناطق المجاورة. فريق السراجين المؤهلين لدينا يتدخل 7/7 خلال ${arrivalTime} دقيقة فقط.` },
    { q: `ما هو سعر ${serviceName} في ${locationName}؟`, a: `سعر ${serviceName} في ${locationName} يبدأ من ${priceFrom} درهم. التقدير مجاني وبدون التزام. نبلغك بالسعر الدقيق قبل أي تدخل.` },
    { q: `ما هو وقت التدخل لـ ${serviceName} في ${locationName}؟`, a: `يصل سراجنا عادة في غضون ${arrivalTime} دقيقة في حي ${locationName}. نعطي الأولوية لحالات الطوارئ لمساعدتك في أسرع وقت ممكن.` },
    { q: `هل أنتم متاحون 7/7 لـ ${serviceName} في ${locationName}؟`, a: `نعم، نحن متاحون 24/7 و 7 أيام في الأسبوع، بما في ذلك العطلات وعطلات نهاية الأسبوع لـ ${serviceName} في ${locationName}.` },
    { q: `هل تتدخلون في جميع أنحاء ${locationName} لـ ${serviceName}؟`, a: `نعم، نغطي حي ${locationName} بأكمله بالإضافة إلى المناطق السكنية والتجارية المحيطة لـ ${serviceName}.` },
    { q: `هل تتدخلون أيام الأحد والأعياد لـ ${serviceName} في ${locationName}؟`, a: `نعم، فريقنا يضمن ${serviceName} في ${locationName} 7/7 بما في ذلك أيام الأحد والأعياد، دون أي زيادة في السعر.` },
    { q: `كيف يتم الدفع مقابل ${serviceName} في ${locationName}؟`, a: `يتم الدفع في نهاية التدخل نقدًا أو بالتحويل. التقدير مجاني ويتم تأكيد السعر قبل بدء ${serviceName} في ${locationName}.` },
  ]

  const faqsEN = [
    { q: `Do you offer ${serviceName.toLowerCase()} in ${locationName}?`, a: `Yes, we offer ${serviceName.toLowerCase()} throughout ${locationName} and surrounding areas. Our team of qualified locksmiths responds 24/7 within ${arrivalTime} minutes only.` },
    { q: `What is the price for ${serviceName.toLowerCase()} in ${locationName}?`, a: `The price for ${serviceName.toLowerCase()} in ${locationName} starts from ${priceFrom} MAD. The quote is free with no obligation. We provide the exact price before any intervention.` },
    { q: `How fast can you respond for ${serviceName.toLowerCase()} in ${locationName}?`, a: `Our locksmith typically arrives within ${arrivalTime} minutes in ${locationName}. We prioritize emergency calls to help you as quickly as possible.` },
    { q: `Are you available 24/7 for ${serviceName.toLowerCase()} in ${locationName}?`, a: `Yes, we are available 24/7 and 365 days a year, including holidays and weekends for ${serviceName.toLowerCase()} in ${locationName}.` },
    { q: `Do you cover all of ${locationName} for ${serviceName.toLowerCase()}?`, a: `Yes, we cover the entire ${locationName} area as well as surrounding residential and commercial zones for ${serviceName.toLowerCase()}.` },
    { q: `Do you work on Sundays and holidays for ${serviceName.toLowerCase()} in ${locationName}?`, a: `Yes, our team provides ${serviceName.toLowerCase()} in ${locationName} 24/7, including Sundays and public holidays, with no price surcharge.` },
    { q: `How do I pay for ${serviceName.toLowerCase()} in ${locationName}?`, a: `Payment is made at the end of the intervention, in cash or by bank transfer. The quote is free and the price is confirmed before ${serviceName.toLowerCase()} in ${locationName} begins.` },
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

export type SeoContentSection = {
  h2: string
  h3s: Array<{ title: string; paragraphs: string[] }>
}

function serviceCategory(slug: string): string {
  const s = slug.toLowerCase()
  if (/urgence|disponible-maintenant|en-moins-de-30|intervention-immediate|sos|rapide|portail/.test(s)) return "urgence"
  if (/extraction-cle|retirer-cle|cle-cassee|reparation-apres-cle/.test(s)) return "cle_cassee"
  if (/prix|tarif|devis|cout|pas-cher|economique/.test(s)) return "prix"
  if (/coffre/.test(s)) return "coffre_fort"
  if (/automobile|voiture|telecommande/.test(s)) return "automobile"
  if (/connectee|intelligente|bluetooth|wifi|serrure-code|biometrique|empreinte|controle-acces/.test(s)) return "serrure_connectee"
  if (/blindage|porte-blindee|renforcer|securiser/.test(s)) return "blindage_porte"
  if (/ouverture|porte-claquee|porte-verrouillee|porte-fermee|porte-bloquee|porte-sans-casse|garage/.test(s)) return "ouverture_porte"
  if (/perte-de-cles|cle-perdue|refaire-cle-perdue|serrurier-cle-perdue/.test(s)) return "perte_cles"
  if (/changement|remplacement|multipoints|haute-securite|cylindre|barillet|pose-serrure|a2p|anti-effraction|serrure-professionnelle|installation-serrure/.test(s)) return "changement_serrure"
  if (/reparation|serrure-cassee|serrure-bloquee|serrure-tourne|serrure-difficile|serrure-grippee/.test(s)) return "reparation"
  if (/entreprise|commerce|bureau|appartement|maison|residence|immeuble/.test(s)) return "entreprise"
  if (/reproduction|double-de-cle|refaire-cle|badge/.test(s)) return "copie"
  return "general"
}

const CATEGORY_H2: Record<string, Record<string, string>> = {
  fr: {
    ouverture_porte: "Serrurier {service} à {location} : intervention rapide et sans casse",
    changement_serrure: "Serrurier {service} à {location} : installation et remplacement de serrures",
    blindage_porte: "Blindage et sécurisation de porte à {location}",
    serrure_connectee: "Serrures connectées et intelligentes à {location}",
    automobile: "Serrurier automobile à {location} : clés et serrures de véhicule",
    coffre_fort: "Serrurier coffre-fort à {location} : ouverture et installation",
    urgence: "Serrurier d'urgence à {location} : intervention 24h/24 et 7j/7",
    perte_cles: "Clés perdues à {location} : nos solutions rapides",
    cle_cassee: "Clé cassée à {location} : extraction et réparation",
    reparation: "Réparation de serrure à {location} : remise en état professionnelle",
    prix: "Prix et tarifs serrurier à {location} : devis gratuit",
    entreprise: "Serrurier professionnel à {location} : particuliers et professionnels",
    copie: "Copie et reproduction de clés à {location}",
    general: "Serrurier {service} à {location} : professionnel 7j/7",
  },
  en: {
    ouverture_porte: "Locksmith {service} in {location}: fast, damage-free intervention",
    changement_serrure: "Locksmith {service} in {location}: lock installation and replacement",
    blindage_porte: "Door reinforcement and security in {location}",
    serrure_connectee: "Smart and connected locks in {location}",
    automobile: "Automotive locksmith in {location}: car keys and locks",
    coffre_fort: "Safe locksmith in {location}: opening and installation",
    urgence: "Emergency locksmith in {location}: 24/7 response",
    perte_cles: "Lost keys in {location}: our fast solutions",
    cle_cassee: "Broken key in {location}: extraction and repair",
    reparation: "Lock repair in {location}: professional restoration",
    prix: "Locksmith prices in {location}: free quote",
    entreprise: "Professional locksmith in {location}: homes and businesses",
    copie: "Key copying and duplication in {location}",
    general: "Locksmith {service} in {location}: professional 24/7",
  },
  ar: {
    ouverture_porte: "سراج {service} في {location}: تدخل سريع وبدون كسر",
    changement_serrure: "سراج {service} في {location}: تركيب واستبدال الأقفال",
    blindage_porte: "تدريع وتأمين الأبواب في {location}",
    serrure_connectee: "أقفال ذكية ومتصلة في {location}",
    automobile: "سراج سيارات في {location}: مفاتيح وأقفال المركبات",
    coffre_fort: "سراج خزائن في {location}: فتح وتركيب",
    urgence: "سراج طوارئ في {location}: تدخل 24/7",
    perte_cles: "مفاتيح مفقودة في {location}: حلولنا السريعة",
    cle_cassee: "مفتاح مكسور في {location}: إخراج وإصلاح",
    reparation: "إصلاح الأقفال في {location}: إعادة تأهيل احترافية",
    prix: "أسعار السراج في {location}: تقدير مجاني",
    entreprise: "سراج محترف في {location}: أفراد وشركات",
    copie: "نسخ وتكرار المفاتيح في {location}",
    general: "سراج {service} في {location}: محترف 7/7",
  },
}

const SHARED_H3: Record<string, Array<{ title: string; paragraphs: string[] }>> = {
  fr: [
    {
      title: "Pourquoi choisir notre {service} à {location} ?",
      paragraphs: [
        "Notre équipe de serruriers professionnels assure le service de {service} à {location} avec un délai d'intervention de 30 minutes seulement, 7j/7, y compris les jours fériés. Chaque artisan est qualifié, assuré et équipé pour intervenir sans endommager votre porte.",
        "Nous garantissons des prix transparents pour {service} à {location} : le devis est gratuit et le tarif exact vous est communiqué avant le début de l'intervention. Aucun frais caché, aucune surprise.",
      ],
    },
    {
      title: "Comment se déroule notre intervention de {service} à {location} ?",
      paragraphs: [
        "1. Vous nous appelez pour {service} à {location} et nous confirmons immédiatement le tarif et le délai. 2. Un serrurier qualifié se déplace à {location} avec le matériel nécessaire. 3. Il réalise le diagnostic puis effectue {service}. 4. Vous recevez une facture claire et le travail est garanti.",
      ],
    },
    {
      title: "Combien coûte {service} à {location} ?",
      paragraphs: [
        `Le prix de {service} à {location} commence à partir de {price} MAD, selon la complexité de l'intervention et le matériel utilisé. Le devis est gratuit et sans engagement : contactez-nous pour obtenir votre tarif précis en quelques minutes, avec une intervention en ${"30"} minutes maximum dans {location}.`,
      ],
    },
  ],
  en: [
    {
      title: "Why choose our {service} in {location}?",
      paragraphs: [
        "Our team of professional locksmiths provides {service} in {location} with a response time of just 30 minutes, 24/7, including holidays. Every craftsman is qualified, insured and equipped to intervene without damaging your door.",
        "We guarantee transparent pricing for {service} in {location}: the quote is free and the exact price is communicated before the intervention begins. No hidden fees, no surprises.",
      ],
    },
    {
      title: "How does our {service} in {location} work?",
      paragraphs: [
        "1. You call us for {service} in {location} and we immediately confirm the price and response time. 2. A qualified locksmith travels to {location} with the necessary equipment. 3. He carries out the diagnosis then performs {service}. 4. You receive a clear invoice and the work is guaranteed.",
      ],
    },
    {
      title: "How much does {service} cost in {location}?",
      paragraphs: [
        "The price of {service} in {location} starts from {price} MAD, depending on the complexity of the intervention and the material used. The quote is free and no-obligation: contact us to get your exact price within minutes, with an intervention within 30 minutes maximum in {location}.",
      ],
    },
  ],
  ar: [
    {
      title: "لماذا تختار {service} في {location}؟",
      paragraphs: [
        "فريق السراجين المحترفين لدينا يضمن خدمة {service} في {location} بوقت تدخل لا يتجاوز 30 دقيقة، 7 أيام في الأسبوع بما في ذلك العطلات. كل حرفي مؤهل ومؤمن ومجهز للتدخل دون إلحاق الضرر ببابك.",
        "نضمن أسعارًا شفافة لخدمة {service} في {location}: التقدير مجاني ويتم إبلاغك بالسعر الدقيق قبل بدء التدخل. لا رسوم خفية، لا مفاجآت.",
      ],
    },
    {
      title: "كيف يتم تدخلنا لـ {service} في {location}؟",
      paragraphs: [
        "1. تتصل بنا لطلب {service} في {location} ونؤكد لك فورًا السعر والمدة. 2. ينتقل سراج مؤهل إلى {location} بالمعدات اللازمة. 3. يقوم بالتشخيص ثم ينفذ {service}. 4. تحصل على فاتورة واضحة والعمل مضمون.",
      ],
    },
    {
      title: "كم تكلفة {service} في {location}؟",
      paragraphs: [
        "يبدأ سعر {service} في {location} من {price} درهم، حسب تعقيد التدخل والمعدات المستخدمة. التقدير مجاني وبدون التزام: اتصل بنا للحصول على سعرك الدقيق في دقائق، مع تدخل في غضون 30 دقيقة كحد أقصى في {location}.",
      ],
    },
  ],
}

const CATEGORY_H3: Record<string, Record<string, { title: string; paragraphs: string[] }>> = {
  fr: {
    ouverture_porte: {
      title: "Quand faire appel à {service} à {location} ?",
      paragraphs: [
        "Porte claquée, clé perdue ou cassée, serrure bloquée : de nombreuses situations nécessitent {service} à {location}. Notre serrurier intervient en moins de 30 minutes et ouvre votre porte sans casse, quelle que soit la marque de votre serrure.",
      ],
    },
    changement_serrure: {
      title: "Quels types de serrures installons-nous à {location} ?",
      paragraphs: [
        "Pour {service} à {location}, nous posons des serrures multipoints, des cylindres européens haute sécurité, des serrures certifiées A2P et des barillets de grandes marques. Nous conseillons le niveau de sécurité adapté à votre porte et à votre budget.",
      ],
    },
    blindage_porte: {
      title: "Protection renforcée pour votre porte à {location}",
      paragraphs: [
        "Le blindage de porte à {location} comprend la pose de plaques de blindage, le renforcement des gonds et le remplacement de la serrure par un modèle haute sécurité. Un serrurier expert évalue votre porte et propose la solution la plus efficace contre les effractions.",
      ],
    },
    serrure_connectee: {
      title: "Serrure connectée à {location} : confort et sécurité",
      paragraphs: [
        "Nos experts installent et programment vos serrures connectées à {location} : ouverture par code, empreinte digitale, bluetooth ou Wi-Fi, contrôle à distance depuis votre smartphone. Installation incluse et démonstration complète.",
      ],
    },
    automobile: {
      title: "Dépannage automobile à {location} : clés et serrures de voiture",
      paragraphs: [
        "Clé perdue ou cassée, télécommande défectueuse, portière verrouillée : notre serrurier automobile à {location} programme et remplace vos clés de voiture sur place, toutes marques confondues, en moins de 30 minutes.",
      ],
    },
    coffre_fort: {
      title: "Coffre-fort à {location} : ouverture, réparation et installation",
      paragraphs: [
        "Oubli de combinaison, clé perdue, mécanisme grippé : nos spécialistes ouvrent votre coffre-fort à {location} sans dommage, réparent le mécanisme et installent de nouveaux coffres avec fixation sécurisée.",
      ],
    },
    urgence: {
      title: "Intervention d'urgence à {location} : 24h/24 et 7j/7",
      paragraphs: [
        "En cas d'urgence à {location}, notre serrurier se déplace immédiatement, de jour comme de nuit, le dimanche et les jours fériés. Intervention en moins de 30 minutes avec tarif annoncé avant le déplacement et devis gratuit.",
      ],
    },
    perte_cles: {
      title: "Clés perdues à {location} : nos solutions rapides",
      paragraphs: [
        "Vous avez perdu vos clés à {location} ? Nous ouvrons votre porte sans casse, refaisons vos clés sur place et, si nécessaire, remplaçons votre serrure pour garantir votre sécurité. Intervention rapide 7j/7.",
      ],
    },
    cle_cassee: {
      title: "Clé cassée à {location} : extraction sans dommage",
      paragraphs: [
        "Une clé cassée dans la serrure à {location} nécessite une extraction minutieuse pour éviter d'endommager le mécanisme. Nos serruriers retirent le fragment, vérifient la serrure et la réparent ou la remplacent si nécessaire.",
      ],
    },
    reparation: {
      title: "Réparation de serrure à {location} : remise en état professionnelle",
      paragraphs: [
        "Serrure cassée, bloquée ou grippée à {location} : notre serrurier diagnostique le problème, remplace les pièces défectueuses et remet votre serrure en parfait état de fonctionnement avec une garantie sur le travail.",
      ],
    },
    prix: {
      title: "Tarifs serrurier à {location} : des prix clairs et sans surprise",
      paragraphs: [
        "Les tarifs serrurier à {location} sont annoncés avant chaque intervention : devis gratuit, prix à partir de {price} MAD et aucune majoration le week-end ou les jours fériés. Vous savez exactement ce que vous payez.",
      ],
    },
    entreprise: {
      title: "Serrurier professionnel à {location} pour particuliers et entreprises",
      paragraphs: [
        "Appartements, maisons, résidences, bureaux et commerces : notre serrurier intervient à {location} pour tous les types de locaux. Installation de serrures professionnelles, contrôle d'accès et sécurisation de vos locaux.",
      ],
    },
    copie: {
      title: "Copie de clés à {location} : rapide et précise",
      paragraphs: [
        "Copie de clés, doubles, reproduction de badges et de clés de voiture : notre serrurier à {location} réalise vos copies en quelques minutes avec une précision garantie, sur place ou à l'atelier.",
      ],
    },
    general: {
      title: "Un service de serrurerie de confiance à {location}",
      paragraphs: [
        "Quel que soit votre besoin de {service} à {location}, notre équipe intervient rapidement avec du matériel professionnel et des artisans certifiés. Devis gratuit, prix transparents et travail garanti 7j/7.",
      ],
    },
  },
  en: {
    ouverture_porte: {
      title: "When to call for {service} in {location}?",
      paragraphs: [
        "Slammed door, lost or broken key, jammed lock: many situations require {service} in {location}. Our locksmith responds in under 30 minutes and opens your door without damage, regardless of your lock brand.",
      ],
    },
    changement_serrure: {
      title: "Which locks do we install in {location}?",
      paragraphs: [
        "For {service} in {location}, we install multi-point locks, high-security European cylinders, A2P certified locks and barrels from leading brands. We recommend the security level that fits your door and budget.",
      ],
    },
    blindage_porte: {
      title: "Reinforced protection for your door in {location}",
      paragraphs: [
        "Door reinforcement in {location} includes steel plates, hinge reinforcement and replacement of the lock with a high-security model. An expert locksmith assesses your door and recommends the most effective anti-break-in solution.",
      ],
    },
    serrure_connectee: {
      title: "Smart lock in {location}: comfort and security",
      paragraphs: [
        "Our experts install and program your smart locks in {location}: opening by code, fingerprint, bluetooth or Wi-Fi, remote control from your smartphone. Installation included with full demonstration.",
      ],
    },
    automobile: {
      title: "Automotive assistance in {location}: car keys and locks",
      paragraphs: [
        "Lost or broken key, faulty remote, locked door: our automotive locksmith in {location} programs and replaces your car keys on site, all brands, in under 30 minutes.",
      ],
    },
    coffre_fort: {
      title: "Safe in {location}: opening, repair and installation",
      paragraphs: [
        "Forgotten combination, lost key, seized mechanism: our specialists open your safe in {location} without damage, repair the mechanism and install new safes with secure anchoring.",
      ],
    },
    urgence: {
      title: "Emergency response in {location}: 24/7",
      paragraphs: [
        "In an emergency in {location}, our locksmith moves immediately, day and night, on Sundays and holidays. Response in under 30 minutes with the price announced before departure and a free quote.",
      ],
    },
    perte_cles: {
      title: "Lost keys in {location}: our fast solutions",
      paragraphs: [
        "Lost your keys in {location}? We open your door without damage, remake your keys on site and, if needed, replace your lock to guarantee your security. Fast 24/7 response.",
      ],
    },
    cle_cassee: {
      title: "Broken key in {location}: damage-free extraction",
      paragraphs: [
        "A broken key in the lock in {location} requires careful extraction to avoid damaging the mechanism. Our locksmiths remove the fragment, check the lock and repair or replace it if needed.",
      ],
    },
    reparation: {
      title: "Lock repair in {location}: professional restoration",
      paragraphs: [
        "Broken, jammed or seized lock in {location}: our locksmith diagnoses the issue, replaces defective parts and restores your lock to perfect working condition with a work guarantee.",
      ],
    },
    prix: {
      title: "Locksmith rates in {location}: clear pricing, no surprises",
      paragraphs: [
        "Locksmith rates in {location} are announced before every intervention: free quote, prices from {price} MAD and no weekend or holiday surcharges. You know exactly what you pay.",
      ],
    },
    entreprise: {
      title: "Professional locksmith in {location} for homes and businesses",
      paragraphs: [
        "Apartments, houses, residences, offices and shops: our locksmith works in {location} for all types of premises. Professional lock installation, access control and premises security.",
      ],
    },
    copie: {
      title: "Key copying in {location}: fast and precise",
      paragraphs: [
        "Key copies, duplicates, badge and car key reproduction: our locksmith in {location} makes your copies within minutes with guaranteed precision, on site or at the workshop.",
      ],
    },
    general: {
      title: "A trustworthy locksmith service in {location}",
      paragraphs: [
        "Whatever your {service} needs in {location}, our team responds quickly with professional equipment and certified craftsmen. Free quote, transparent pricing and guaranteed work 24/7.",
      ],
    },
  },
  ar: {
    ouverture_porte: {
      title: "متى تحتاج إلى {service} في {location}؟",
      paragraphs: [
        "باب مغلق، مفتاح مفقود أو مكسور، قفل عالق: حالات كثيرة تتطلب {service} في {location}. سراجنا يتدخل في أقل من 30 دقيقة ويفتح بابك دون كسر، مهما كانت ماركة قفلك.",
      ],
    },
    changement_serrure: {
      title: "ما أنواع الأقفال التي نركبها في {location}؟",
      paragraphs: [
        "لخدمة {service} في {location}، نركب أقفالًا متعددة النقاط، أسطوانات أوروبية عالية الأمان، أقفال معتمدة A2P وبراغي من ماركات كبرى. ننصحك بمستوى الأمان المناسب لبابك وميزانيتك.",
      ],
    },
    blindage_porte: {
      title: "حماية معززة لبابك في {location}",
      paragraphs: [
        "تدريع الأبواب في {location} يشمل تركيب صفائح فولاذية، تعزيز المفصلات واستبدال القفل بنموذج عالي الأمان. خبير السراجة يقيّم بابك ويقترح الحل الأكثر فعالية ضد الاقتحام.",
      ],
    },
    serrure_connectee: {
      title: "قفل ذكي في {location}: راحة وأمان",
      paragraphs: [
        "خبراؤنا يركبون ويبرمجون أقفالك الذكية في {location}: فتح بالرمز أو بصمة الإصبع أو البلوتوث أو الواي فاي، مع تحكم عن بعد من هاتفك. التركيب مشمول مع شرح كامل.",
      ],
    },
    automobile: {
      title: "مساعدة سيارات في {location}: مفاتيح وأقفال المركبات",
      paragraphs: [
        "مفتاح مفقود أو مكسور، جهاز تحكم معطل، باب مقفل: سراج السيارات لدينا في {location} يبرمج ويستبدل مفاتيح سيارتك في الموقع، جميع الماركات، في أقل من 30 دقيقة.",
      ],
    },
    coffre_fort: {
      title: "خزنة في {location}: فتح وإصلاح وتركيب",
      paragraphs: [
        "نسيان الرمز، مفتاح مفقود، آلية متيبسة: متخصصونا يفتحون خزنتك في {location} دون ضرر، يصلحون الآلية ويتركون خزائن جديدة مع تثبيت آمن.",
      ],
    },
    urgence: {
      title: "تدخل الطوارئ في {location}: 24/7",
      paragraphs: [
        "في حالة الطوارئ في {location}، ينتقل سراجنا فورًا ليلًا ونهارًا، أيام الأحد والعطلات. تدخل في أقل من 30 دقيقة مع إعلان السعر قبل التنقل وتقدير مجاني.",
      ],
    },
    perte_cles: {
      title: "مفاتيح مفقودة في {location}: حلولنا السريعة",
      paragraphs: [
        "فقدت مفاتيحك في {location}؟ نفتح بابك دون كسر، نعيد صنع مفاتيحك في الموقع، وإذا لزم الأمر نستبدل قفلك لضمان أمانك. تدخل سريع 7/7.",
      ],
    },
    cle_cassee: {
      title: "مفتاح مكسور في {location}: إخراج دون ضرر",
      paragraphs: [
        "مفتاح مكسور في القفل في {location} يتطلب إخراجًا دقيقًا لتجنب إتلاف الآلية. سراجونا يزيلون القطعة، يفحصون القفل ويصلحونه أو يستبدلونه عند الحاجة.",
      ],
    },
    reparation: {
      title: "إصلاح الأقفال في {location}: إعادة تأهيل احترافية",
      paragraphs: [
        "قفل مكسور أو عالق أو متيبس في {location}: سراجنا يشخص المشكلة، يستبدل القطع المعطوبة ويعيد قفلك إلى حالة عمل مثالية مع ضمان على العمل.",
      ],
    },
    prix: {
      title: "أسعار السراج في {location}: أسعار واضحة دون مفاجآت",
      paragraphs: [
        "أسعار السراج في {location} تُعلن قبل كل تدخل: تقدير مجاني، أسعار من {price} درهم، بدون زيادة في عطلة نهاية الأسبوع أو الأعياد. تعرف بالضبط ما تدفعه.",
      ],
    },
    entreprise: {
      title: "سراج محترف في {location} للأفراد والشركات",
      paragraphs: [
        "شقق، منازل، مجمعات سكنية، مكاتب ومحلات: سراجنا يتدخل في {location} لجميع أنواع المباني. تركيب أقفال احترافية، تحكم في الوصول وتأمين مبانيها.",
      ],
    },
    copie: {
      title: "نسخ المفاتيح في {location}: سريع ودقيق",
      paragraphs: [
        "نسخ المفاتيح، نسخ ثانية، تكرار البطاقات ومفاتيح السيارات: سراجنا في {location} ينجز نسخك في دقائق بدقة مضمونة، في الموقع أو في الورشة.",
      ],
    },
    general: {
      title: "خدمة سراجة موثوقة في {location}",
      paragraphs: [
        "مهما كانت حاجتك لـ {service} في {location}، فريقنا يتدخل بسرعة بمعدات احترافية وحرفيين معتمدين. تقدير مجاني، أسعار شفافة وعمل مضمون 7/7.",
      ],
    },
  },
}

export function generateServiceSections(
  locale: string,
  serviceName: string,
  serviceSlug: string,
  locationName: string,
  cityName: string = "Marrakech",
  arrivalTime: number = 30,
  priceFrom: number = 150,
): SeoContentSection {
  const lang = (locale === "fr" || locale === "ar" || locale === "en" ? locale : "fr") as "fr" | "ar" | "en"
  const cat = serviceCategory(serviceSlug)
  const fill = (s: string) =>
    s.replaceAll("{service}", serviceName).replaceAll("{location}", locationName).replaceAll("{city}", cityName).replaceAll("{price}", String(priceFrom)).replaceAll("{time}", String(arrivalTime))
  const h2 = fill(CATEGORY_H2[lang][cat] || CATEGORY_H2[lang].general)
  const h3s = [...SHARED_H3[lang], CATEGORY_H3[lang][cat] || CATEGORY_H3[lang].general].map((h) => ({
    title: fill(h.title),
    paragraphs: h.paragraphs.map(fill),
  }))
  return { h2, h3s }
}

export function generateLocationSections(locale: string, locationName: string, arrivalTime: number, arrondissement: string | null = null): SeoContentSection {
  const sections: Record<string, SeoContentSection> = {
    fr: {
      h2: `Serrurier ${locationName} Marrakech : un service de serrurerie complet`,
      h3s: [
        {
          title: `Nos services de serrurerie à ${locationName}`,
          paragraphs: [
            `Le serrurier ${locationName} Marrakech intervient pour l'ouverture de porte, le changement de serrure, le blindage, la copie de clés, la serrurerie automobile et l'ouverture de coffre-fort. Toutes les interventions sont réalisées par des artisans qualifiés, avec du matériel professionnel.`,
          ],
        },
        {
          title: `Pourquoi choisir votre serrurier à ${locationName} ?`,
          paragraphs: [
            `Notre serrurier à ${locationName} garantit une arrivée en ${arrivalTime} minutes maximum, des prix transparents annoncés avant l'intervention et un devis gratuit. Disponible 7j/7, y compris les nuits, dimanches et jours fériés, nous couvrons tout le quartier ${locationName}${arrondissement ? ` ainsi que l'arrondissement ${arrondissement}` : ""} et ses environs.`,
          ],
        },
        {
          title: `Zone d'intervention à ${locationName} et alentours`,
          paragraphs: [
            `En plus du quartier ${locationName}, notre équipe intervient dans toutes les zones résidentielles et commerciales environnantes de Marrakech. Résidences, lotissements, immeubles et locaux professionnels : aucun secteur n'est exclu.`,
          ],
        },
      ],
    },
    en: {
      h2: `Locksmith ${locationName} Marrakech: a complete locksmith service`,
      h3s: [
        {
          title: `Our locksmith services in ${locationName}`,
          paragraphs: [
            `The ${locationName} Marrakech locksmith handles door opening, lock replacement, door reinforcement, key copying, automotive locksmithing and safe opening. All interventions are performed by qualified craftsmen with professional equipment.`,
          ],
        },
        {
          title: `Why choose your locksmith in ${locationName}?`,
          paragraphs: [
            `Our locksmith in ${locationName} guarantees arrival within ${arrivalTime} minutes maximum, transparent prices announced before the intervention and a free quote. Available 24/7, including nights, Sundays and holidays, we cover the whole ${locationName} district${arrondissement ? ` as well as the ${arrondissement} area` : ""} and its surroundings.`,
          ],
        },
        {
          title: `Service area in ${locationName} and beyond`,
          paragraphs: [
            `In addition to the ${locationName} district, our team works in all surrounding residential and commercial areas of Marrakech. Residences, housing complexes, apartment buildings and business premises: no area is excluded.`,
          ],
        },
      ],
    },
    ar: {
      h2: `سراج ${locationName} مراكش: خدمة سراجة متكاملة`,
      h3s: [
        {
          title: `خدماتنا في السراجة في ${locationName}`,
          paragraphs: [
            `سراج ${locationName} مراكش يتدخل لفتح الأبواب، تغيير الأقفال، التدريع، نسخ المفاتيح، سراجة السيارات وفتح الخزائن. جميع التدخلات تتم على يد حرفيين مؤهلين بمعدات احترافية.`,
          ],
        },
        {
          title: `لماذا تختار سراجك في ${locationName}؟`,
          paragraphs: [
            `سراجنا في ${locationName} يضمن وصولًا في غضون ${arrivalTime} دقيقة كحد أقصى، أسعارًا شفافة تُعلن قبل التدخل وتقديرًا مجانيًا. متاحون 7/7 بما في ذلك الليالي وأيام الأحد والعطلات، نغطي حي ${locationName} بأكمله${arrondissement ? ` بالإضافة إلى مقاطعة ${arrondissement}` : ""} والمناطق المجاورة.`,
          ],
        },
        {
          title: `منطقة التدخل في ${locationName} وحولها`,
          paragraphs: [
            `بالإضافة إلى حي ${locationName}، يتدخل فريقنا في جميع المناطق السكنية والتجارية المحيطة بمراكش. مجمعات سكنية، عمارات ومباني تجارية: لا يوجد أي قطاع مستثنى.`,
          ],
        },
      ],
    },
  }
  return sections[locale] || sections.fr
}
