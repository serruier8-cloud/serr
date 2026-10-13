import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type NewService = {
  slug: string
  nameFr: string
  nameAr: string
  nameEn: string
  priceFrom: number
}

const services: NewService[] = [
  // 1. Emergency Locksmith
  { slug: "serrurier-urgence", nameFr: "Serrurier urgence", nameAr: "سراج طوارئ", nameEn: "Emergency locksmith", priceFrom: 150 },
  { slug: "serrurier-urgence-24h24", nameFr: "Serrurier urgence 24h/24", nameAr: "سراج طوارئ 24/24", nameEn: "24/7 emergency locksmith", priceFrom: 150 },
  { slug: "serrurier-urgence-nuit", nameFr: "Serrurier urgence nuit", nameAr: "سراج طوارئ ليلي", nameEn: "Night emergency locksmith", priceFrom: 180 },
  { slug: "serrurier-urgence-dimanche", nameFr: "Serrurier urgence dimanche", nameAr: "سراج طوارئ الأحد", nameEn: "Sunday emergency locksmith", priceFrom: 180 },
  { slug: "serrurier-urgence-jour-ferie", nameFr: "Serrurier urgence jour férié", nameAr: "سراج طوارئ أيام العطل", nameEn: "Holiday emergency locksmith", priceFrom: 180 },
  { slug: "serrurier-disponible-maintenant", nameFr: "Serrurier disponible maintenant", nameAr: "سراج متاح الآن", nameEn: "Locksmith available now", priceFrom: 150 },
  { slug: "serrurier-rapide", nameFr: "Serrurier rapide", nameAr: "سراج سريع", nameEn: "Fast locksmith", priceFrom: 150 },
  { slug: "serrurier-en-moins-de-30-minutes", nameFr: "Serrurier en moins de 30 minutes", nameAr: "سراج في أقل من 30 دقيقة", nameEn: "Locksmith in under 30 minutes", priceFrom: 150 },
  { slug: "serrurier-sos", nameFr: "Serrurier SOS", nameAr: "سراج إسعاف", nameEn: "SOS locksmith", priceFrom: 150 },
  { slug: "serrurier-intervention-immediate", nameFr: "Serrurier intervention immédiate", nameAr: "سراج تدخل فوري", nameEn: "Immediate intervention locksmith", priceFrom: 150 },

  // 2. Door Opening
  { slug: "ouverture-porte-claquee", nameFr: "Ouverture porte claquée", nameAr: "فتح باب مغلق", nameEn: "Slammed door opening", priceFrom: 120 },
  { slug: "ouverture-porte-verrouillee", nameFr: "Ouverture porte verrouillée", nameAr: "فتح باب مقفل", nameEn: "Locked door opening", priceFrom: 150 },
  { slug: "ouverture-porte-sans-casse", nameFr: "Ouverture porte sans casse", nameAr: "فتح باب بدون كسر", nameEn: "Damage-free door opening", priceFrom: 150 },
  { slug: "ouverture-porte-fermee", nameFr: "Ouverture porte fermée", nameAr: "فتح باب مغلق", nameEn: "Closed door opening", priceFrom: 150 },
  { slug: "serrurier-porte-bloquee", nameFr: "Serrurier porte bloquée", nameAr: "سراج باب عالق", nameEn: "Stuck door locksmith", priceFrom: 150 },
  { slug: "ouverture-porte-appartement", nameFr: "Ouverture porte appartement", nameAr: "فتح باب شقة", nameEn: "Apartment door opening", priceFrom: 150 },
  { slug: "ouverture-porte-maison", nameFr: "Ouverture porte maison", nameAr: "فتح باب منزل", nameEn: "House door opening", priceFrom: 150 },
  { slug: "ouverture-porte-bureau", nameFr: "Ouverture porte bureau", nameAr: "فتح باب مكتب", nameEn: "Office door opening", priceFrom: 150 },
  { slug: "ouverture-porte-garage", nameFr: "Ouverture porte garage", nameAr: "فتح باب مرآب", nameEn: "Garage door opening", priceFrom: 200 },

  // 3. Lock Replacement
  { slug: "remplacement-serrure", nameFr: "Remplacement de serrure", nameAr: "استبدال قفل", nameEn: "Lock replacement", priceFrom: 250 },
  { slug: "remplacement-serrure-ancienne", nameFr: "Remplacer serrure ancienne", nameAr: "استبدال قفل قديم", nameEn: "Old lock replacement", priceFrom: 250 },
  { slug: "changement-serrure-apres-demmenagement", nameFr: "Changer serrure après déménagement", nameAr: "تغيير قفل بعد الانتقال", nameEn: "Lock change after moving", priceFrom: 250 },
  { slug: "changement-serrure-apres-cambriolage", nameFr: "Changer serrure après cambriolage", nameAr: "تغيير قفل بعد سرقة", nameEn: "Lock change after burglary", priceFrom: 300 },
  { slug: "pose-serrure", nameFr: "Pose de serrure", nameAr: "تركيب قفل", nameEn: "Lock installation", priceFrom: 300 },

  // 4. Lock Repair
  { slug: "serrure-cassee", nameFr: "Serrure cassée", nameAr: "قفل مكسور", nameEn: "Broken lock", priceFrom: 200 },
  { slug: "serrure-bloquee", nameFr: "Serrure bloquée", nameAr: "قفل عالق", nameEn: "Jammed lock", priceFrom: 200 },
  { slug: "serrure-tourne-dans-le-vide", nameFr: "Serrure tourne dans le vide", nameAr: "قفل يدور في الفراغ", nameEn: "Lock spinning freely", priceFrom: 200 },
  { slug: "serrure-difficile-a-ouvrir", nameFr: "Serrure difficile à ouvrir", nameAr: "قفل صعب الفتح", nameEn: "Hard to open lock", priceFrom: 180 },
  { slug: "serrure-grippee", nameFr: "Serrure grippée", nameAr: "قفل متيبس", nameEn: "Seized lock", priceFrom: 180 },

  // 5. Security Upgrade
  { slug: "serrure-anti-effraction", nameFr: "Serrure anti effraction", nameAr: "قفل مضاد للاقتحام", nameEn: "Anti-break-in lock", priceFrom: 450 },
  { slug: "serrure-a2p", nameFr: "Serrure A2P", nameAr: "قفل A2P", nameEn: "A2P certified lock", priceFrom: 500 },
  { slug: "renforcer-securite-porte", nameFr: "Renforcer sécurité porte", nameAr: "تعزيز أمن الباب", nameEn: "Door security reinforcement", priceFrom: 600 },
  { slug: "securiser-maison", nameFr: "Sécuriser sa maison", nameAr: "تأمين المنزل", nameEn: "Home security", priceFrom: 500 },

  // 6. Smart Lock
  { slug: "serrure-intelligente", nameFr: "Serrure intelligente", nameAr: "قفل ذكي", nameEn: "Smart lock", priceFrom: 600 },
  { slug: "installation-serrure-connectee", nameFr: "Installation serrure connectée", nameAr: "تركيب قفل ذكي", nameEn: "Smart lock installation", priceFrom: 600 },
  { slug: "reparation-serrure-connectee", nameFr: "Réparation serrure connectée", nameAr: "إصلاح قفل ذكي", nameEn: "Smart lock repair", priceFrom: 350 },
  { slug: "serrure-bluetooth", nameFr: "Serrure bluetooth", nameAr: "قفل بلوتوث", nameEn: "Bluetooth lock", priceFrom: 550 },
  { slug: "serrure-wifi", nameFr: "Serrure wifi", nameAr: "قفل واي فاي", nameEn: "WiFi lock", priceFrom: 600 },
  { slug: "serrure-code", nameFr: "Serrure à code", nameAr: "قفل برمز", nameEn: "Code lock", priceFrom: 400 },
  { slug: "serrure-biometrique", nameFr: "Serrure biométrique", nameAr: "قفل بيومتري", nameEn: "Biometric lock", priceFrom: 800 },
  { slug: "serrure-empreinte-digitale", nameFr: "Serrure empreinte digitale", nameAr: "قفل بصمة إصبع", nameEn: "Fingerprint lock", priceFrom: 750 },

  // 7. Lost Keys
  { slug: "perte-de-cles", nameFr: "Perte de clés", nameAr: "فقدان المفاتيح", nameEn: "Lost keys", priceFrom: 200 },
  { slug: "refaire-cle-perdue", nameFr: "Refaire clé perdue", nameAr: "إعادة صنع مفتاح مفقود", nameEn: "Replace lost key", priceFrom: 200 },
  { slug: "serrurier-cle-perdue", nameFr: "Serrurier clé perdue", nameAr: "سراج مفتاح مفقود", nameEn: "Lost key locksmith", priceFrom: 200 },
  { slug: "ouverture-porte-cle-perdue", nameFr: "Ouverture porte clé perdue", nameAr: "فتح باب مفتاح مفقود", nameEn: "Open door with lost key", priceFrom: 150 },

  // 8. Broken Key
  { slug: "extraction-cle-cassee", nameFr: "Extraction clé cassée", nameAr: "إخراج مفتاح مكسور", nameEn: "Broken key extraction", priceFrom: 180 },
  { slug: "retirer-cle-cassee", nameFr: "Retirer clé cassée de la serrure", nameAr: "إزالة مفتاح مكسور من القفل", nameEn: "Remove broken key from lock", priceFrom: 180 },
  { slug: "reparation-apres-cle-cassee", nameFr: "Réparer serrure après clé cassée", nameAr: "إصلاح قفل بعد مفتاح مكسور", nameEn: "Lock repair after broken key", priceFrom: 200 },

  // 9. Key Duplication
  { slug: "reproduction-cle", nameFr: "Reproduction de clé", nameAr: "إعادة إنتاج مفتاح", nameEn: "Key reproduction", priceFrom: 60 },
  { slug: "double-de-cle", nameFr: "Double de clé", nameAr: "نسخة مفتاح", nameEn: "Duplicate key", priceFrom: 50 },
  { slug: "refaire-cle", nameFr: "Refaire une clé", nameAr: "إعادة صنع مفتاح", nameEn: "Key remaking", priceFrom: 60 },
  { slug: "reproduction-cle-voiture", nameFr: "Reproduction clé voiture", nameAr: "نسخ مفتاح سيارة", nameEn: "Car key reproduction", priceFrom: 250 },
  { slug: "reproduction-badge", nameFr: "Reproduction badge", nameAr: "نسخ بطاقة دخول", nameEn: "Badge duplication", priceFrom: 150 },

  // 10. Car Locksmith
  { slug: "serrurier-automobile", nameFr: "Serrurier automobile", nameAr: "سراج سيارات", nameEn: "Automotive locksmith", priceFrom: 300 },
  { slug: "cle-voiture-perdue", nameFr: "Clé voiture perdue", nameAr: "مفتاح سيارة مفقود", nameEn: "Lost car key", priceFrom: 250 },
  { slug: "programmation-cle-voiture", nameFr: "Programmation clé voiture", nameAr: "برمجة مفتاح سيارة", nameEn: "Car key programming", priceFrom: 600 },
  { slug: "reparation-telecommande-voiture", nameFr: "Réparation télécommande voiture", nameAr: "إصلاح جهاز تحكم السيارة", nameEn: "Car remote repair", priceFrom: 350 },
  { slug: "remplacement-cle-voiture", nameFr: "Remplacement clé voiture", nameAr: "استبدال مفتاح سيارة", nameEn: "Car key replacement", priceFrom: 400 },

  // 11. Garage & Gate
  { slug: "ouverture-garage", nameFr: "Ouverture garage", nameAr: "فتح مرآب", nameEn: "Garage opening", priceFrom: 250 },
  { slug: "reparation-portail", nameFr: "Réparation portail", nameAr: "إصلاح بوابة", nameEn: "Gate repair", priceFrom: 350 },

  // 12. Safe Locksmith
  { slug: "ouverture-coffre-fort", nameFr: "Ouverture coffre fort", nameAr: "فتح خزنة", nameEn: "Safe opening", priceFrom: 500 },
  { slug: "serrurier-coffre-fort", nameFr: "Serrurier coffre fort", nameAr: "سراج خزنة", nameEn: "Safe locksmith", priceFrom: 500 },
  { slug: "reparation-coffre-fort", nameFr: "Réparation coffre fort", nameAr: "إصلاح خزنة", nameEn: "Safe repair", priceFrom: 400 },
  { slug: "installation-coffre-fort", nameFr: "Installation coffre fort", nameAr: "تركيب خزنة", nameEn: "Safe installation", priceFrom: 600 },

  // 13. Business Locksmith
  { slug: "serrurier-entreprise", nameFr: "Serrurier entreprise", nameAr: "سراج شركات", nameEn: "Business locksmith", priceFrom: 300 },
  { slug: "serrurier-commerce", nameFr: "Serrurier commerce", nameAr: "سراج محلات", nameEn: "Retail locksmith", priceFrom: 300 },
  { slug: "serrurier-bureau", nameFr: "Serrurier bureau", nameAr: "سراج مكاتب", nameEn: "Office locksmith", priceFrom: 300 },
  { slug: "controle-acces", nameFr: "Contrôle d'accès", nameAr: "التحكم في الوصول", nameEn: "Access control", priceFrom: 500 },
  { slug: "serrure-professionnelle", nameFr: "Serrure professionnelle", nameAr: "قفل احترافي", nameEn: "Professional lock", priceFrom: 450 },

  // 14. Apartment / Home
  { slug: "serrurier-appartement", nameFr: "Serrurier appartement", nameAr: "سراج شقق", nameEn: "Apartment locksmith", priceFrom: 150 },
  { slug: "serrurier-maison", nameFr: "Serrurier maison", nameAr: "سراج منازل", nameEn: "Home locksmith", priceFrom: 150 },
  { slug: "serrurier-residence", nameFr: "Serrurier résidence", nameAr: "سراج مجمعات سكنية", nameEn: "Residence locksmith", priceFrom: 180 },
  { slug: "serrurier-immeuble", nameFr: "Serrurier immeuble", nameAr: "سراج عمارات", nameEn: "Apartment building locksmith", priceFrom: 180 },

  // 15. Price Intent
  { slug: "prix-serrurier", nameFr: "Prix d'un serrurier", nameAr: "أسعار السراج", nameEn: "Locksmith prices", priceFrom: 150 },
  { slug: "tarif-serrurier", nameFr: "Tarif d'un serrurier", nameAr: "تعرفة السراج", nameEn: "Locksmith rates", priceFrom: 150 },
  { slug: "devis-serrurier", nameFr: "Devis serrurier", nameAr: "تقدير السراج", nameEn: "Locksmith quote", priceFrom: 150 },
  { slug: "cout-serrurier", nameFr: "Combien coûte un serrurier", nameAr: "كم يكلف السراج", nameEn: "How much does a locksmith cost", priceFrom: 150 },
  { slug: "serrurier-pas-cher", nameFr: "Serrurier pas cher", nameAr: "سراج رخيص", nameEn: "Cheap locksmith", priceFrom: 150 },
  { slug: "serrurier-economique", nameFr: "Serrurier économique", nameAr: "سراج اقتصادي", nameEn: "Affordable locksmith", priceFrom: 150 },
  { slug: "cout-ouverture-porte", nameFr: "Coût ouverture de porte", nameAr: "تكلفة فتح باب", nameEn: "Door opening cost", priceFrom: 150 },
  { slug: "cout-changement-serrure", nameFr: "Coût changement de serrure", nameAr: "تكلفة تغيير قفل", nameEn: "Lock change cost", priceFrom: 250 },
]

async function main() {
  let created = 0
  let skipped = 0
  for (const service of services) {
    const exists = await prisma.locksmithService.findUnique({ where: { slug: service.slug } })
    if (exists) {
      skipped++
      continue
    }
    const name = service.nameFr
    const nameAr = service.nameAr
    const nameEn = service.nameEn
    const descFr = `${service.nameFr} à Marrakech par des serruriers professionnels. Intervention rapide 30 min. Devis gratuit. Service ${service.nameFr.toLowerCase()} 7j/7 dans tous les quartiers de Marrakech. Serruriers qualifiés et certifiés.`
    const descAr = `${service.nameAr} في مراكش بواسطة سراجين محترفين. تدخل سريع 30 دقيقة. تقدير مجاني. خدمة ${service.nameAr} 7/7 في جميع أحياء مراكش. سراجون مؤهلون ومعتمدون.`
    const descEn = `${service.nameEn} in Marrakech by professional locksmiths. Fast 30 min response. Free quote. ${service.nameEn} service 24/7 in all neighborhoods of Marrakech. Qualified and certified locksmiths.`
    const introFr = `Vous cherchez un service de ${service.nameFr.toLowerCase()} à Marrakech ? Notre équipe de serruriers professionnels intervient rapidement dans tous les quartiers de la ville pour ${service.nameFr.toLowerCase()}. Nous garantissons un travail de qualité avec des prix transparents, un devis gratuit et une intervention rapide en 30 minutes maximum. Disponibles 7j/7, y compris les jours fériés.`
    const introAr = `هل تبحث عن خدمة ${service.nameAr} في مراكش؟ فريق السراجين المحترفين لدينا يتدخل بسرعة في جميع أحياء المدينة لـ ${service.nameAr}. نضمن عملاً عالي الجودة بأسعار شفافة، تقدير مجاني وتدخل سريع في 30 دقيقة كحد أقصى. متاحون 7/7 بما في ذلك العطلات.`
    const introEn = `Looking for ${service.nameEn.toLowerCase()} service in Marrakech? Our team of professional locksmiths responds quickly in all neighborhoods of the city for ${service.nameEn.toLowerCase()}. We guarantee quality work with transparent pricing, free quote and fast response within 30 minutes maximum. Available 24/7, including holidays.`
    const tFr = `${service.nameFr} Marrakech - Serrurier Professionnel 7j/7`
    const tAr = `${service.nameAr} مراكش - سراج محترف 7/7`
    const tEn = `${service.nameEn} Marrakech - Professional Locksmith 24/7`
    const mFr = `${service.nameFr} Marrakech. Intervention rapide 30 min. Devis gratuit. Serruriers professionnels qualifiés 7j/7. Prix à partir de ${service.priceFrom} MAD.`
    const mAr = `${service.nameAr} مراكش. تدخل سريع 30 دقيقة. تقدير مجاني. سراجون محترفون مؤهلون 7/7. السعر من ${service.priceFrom} درهم.`
    const mEn = `${service.nameEn} Marrakech. Fast 30 min response. Free quote. Qualified professional locksmiths 24/7. Price from ${service.priceFrom} MAD.`

    await prisma.locksmithService.create({
      data: {
        slug: service.slug,
        nameFr: name,
        nameAr,
        nameEn,
        descriptionFr: descFr,
        descriptionAr: descAr,
        descriptionEn: descEn,
        introFr,
        introAr,
        introEn,
        priceFrom: service.priceFrom,
        metaTitleFr: tFr,
        metaTitleAr: tAr,
        metaTitleEn: tEn,
        metaDescFr: mFr,
        metaDescAr: mAr,
        metaDescEn: mEn,
      },
    })
    created++
  }
  const total = await prisma.locksmithService.count()
  console.log(`Created ${created} new services, skipped ${skipped} existing. Total services: ${total}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
