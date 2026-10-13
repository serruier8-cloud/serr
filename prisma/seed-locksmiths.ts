import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const city = await prisma.city.findFirst({ where: { slug: "marrakech" } })
  if (!city) throw new Error("City not found")
  const cityId = city.id

  const locs = await prisma.location.findMany({ take: 3 })
  const svcs = await prisma.locksmithService.findMany({ take: 5 })

  type LocksmithInput = {
    slug: string; companyName: string; descriptionFr: string; descriptionAr: string; descriptionEn: string;
    phone: string; email: string; address: string; latitude: number; longitude: number;
    rating: number; reviewCount: number; isVerified: boolean; emergencyAvailable: boolean; available247: boolean;
  }

  const locksmiths: LocksmithInput[] = [
    {
      slug: "serrurier-ahmed-gueliz", companyName: "Serrurier Ahmed Gueliz",
      descriptionFr: "Serrurier professionnel à Gueliz Marrakech. Spécialiste en ouverture de porte et changement de serrure. Intervention rapide 30 min.", descriptionAr: "سراج محترف في جليز مراكش. متخصص في فتح الأبواب وتغيير الأقفال. تدخل سريع 30 دقيقة.", descriptionEn: "Professional locksmith in Gueliz Marrakech. Specialist in door opening and lock change. Fast 30 min response.",
      phone: "+212 715-758801", email: "ahmed.gueliz@email.com",
      address: "Av. Mohammed V, Gueliz", latitude: 31.6300, longitude: -8.0090,
      rating: 4.8, reviewCount: 127, isVerified: true, emergencyAvailable: true, available247: true,
    },
    {
      slug: "serrurier-mohamed-medina", companyName: "Serrurier Mohamed Médina",
      descriptionFr: "Serrurier dans la médina de Marrakech. Expert en serrures anciennes et modernes. Disponible 7j/7.", descriptionAr: "سراج في المدينة القديمة مراكش. خبير في الأقفال القديمة والحديثة. متاح 7/7.", descriptionEn: "Locksmith in the medina of Marrakech. Expert in antique and modern locks. Available 24/7.",
      phone: "+212 715-758801", email: "mohamed.medina@email.com",
      address: "Derb Dabachi, Médina", latitude: 31.6200, longitude: -7.9800,
      rating: 4.9, reviewCount: 89, isVerified: true, emergencyAvailable: true, available247: true,
    },
    {
      slug: "serrurier-karim-menara", companyName: "Serrurier Karim Ménara",
      descriptionFr: "Serrurier professionnel à Ménara Marrakech. Spécialiste en blindage de porte et serrures haute sécurité.", descriptionAr: "سراج محترف في المنارة مراكش. متخصص في تدريع الأبواب والأقفال عالية الأمان.", descriptionEn: "Professional locksmith in Menara Marrakech. Specialist in door reinforcement and high security locks.",
      phone: "+212 715-758801", email: "karim.menara@email.com",
      address: "Av. de la Ménara", latitude: 31.6200, longitude: -8.0400,
      rating: 4.7, reviewCount: 203, isVerified: true, emergencyAvailable: true, available247: false,
    },
  ]

  for (const l of locksmiths) {
    const created = await prisma.locksmith.upsert({
      where: { slug: l.slug },
      update: {},
      create: {
        slug: l.slug, companyName: l.companyName,
        descriptionFr: l.descriptionFr, descriptionAr: l.descriptionAr, descriptionEn: l.descriptionEn,
        phone: l.phone, email: l.email, address: l.address,
        latitude: l.latitude, longitude: l.longitude,
        rating: l.rating, reviewCount: l.reviewCount,
        isVerified: l.isVerified, isApproved: true,
        emergencyAvailable: l.emergencyAvailable, available247: l.available247,
        cityId,
      },
    })

    // Link to locations
    for (const loc of locs) {
      await prisma.locksmithLocation.upsert({
        where: { locksmithId_locationId: { locksmithId: created.id, locationId: loc.id } },
        update: {}, create: { locksmithId: created.id, locationId: loc.id },
      })
    }

    // Link to services
    for (const s of svcs) {
      await prisma.serviceAssignment.upsert({
        where: { locksmithId_serviceId: { locksmithId: created.id, serviceId: s.id } },
        update: {}, create: { locksmithId: created.id, serviceId: s.id },
      })
    }
  }

  for (const l of locksmiths) {
    const ls = await prisma.locksmith.findUnique({ where: { slug: l.slug } })
    if (!ls) continue
    // Add working hours
    for (let day = 0; day < 7; day++) {
      await prisma.workingHour.create({
        data: { locksmithId: ls.id, day, open: "08:00", close: "20:00", isClosed: false },
      })
    }
  }

  // Create blog articles
  const articles = [
    {
      slug: "comment-choisir-serrurier-marrakech",
      titleFr: "Comment choisir un bon serrurier à Marrakech ?",
      titleAr: "كيف تختار سراجًا جيدًا في مراكش؟",
      titleEn: "How to choose a good locksmith in Marrakech?",
      contentFr: `Comment choisir un bon serrurier à Marrakech ?\n\nTrouver un serrurier de confiance à Marrakech peut être difficile. Voici nos conseils :\n\n1. Vérifiez les avis : Consultez les avis en ligne\n2. Demandez un devis : Un serrurier honnête fournit toujours un devis gratuit\n3. Disponibilité 24h/24 : Assurez-vous qu'il intervient 7j/7\n4. Vérifiez les certifications : Un serrurier professionnel doit être certifié\n5. Comparez les prix : Méfiez-vous des prix trop bas ou trop élevés\n\nChez Serrurier Marrakech, nous garantissons des professionnels qualifiés et des prix transparents.`,
      contentAr: `كيف تختار سراجًا جيدًا في مراكش؟\n\nقد يكون العثور على سراج موثوق به في مراكش صعبًا. إليك نصائحنا:\n\n1. تحقق من التقييمات: اطلع على التقييمات عبر الإنترنت\n2. اطلب تقديرًا: السراج الصادق يقدم دائمًا تقديرًا مجانيًا\n3. التوفر 24/7: تأكد من توفره 7 أيام في الأسبوع\n4. تحقق من الشهادات: يجب أن يكون السراج المحترف معتمدًا\n5. قارن الأسعار: احذر من الأسعار المنخفضة جدًا أو المرتفعة جدًا\n\nفي صانع أقفال مراكش، نضمن سراجين مؤهلين وأسعار شفافة.`,
      contentEn: `How to choose a good locksmith in Marrakech?\n\nFinding a trustworthy locksmith in Marrakech can be challenging. Here are our tips:\n\n1. Check reviews: Look at online reviews\n2. Ask for a quote: An honest locksmith always provides a free quote\n3. 24/7 availability: Make sure they're available 7 days a week\n4. Check certifications: A professional locksmith should be certified\n5. Compare prices: Beware of prices that are too low or too high\n\nAt Serrurier Marrakech, we guarantee qualified professionals and transparent prices.`,
      excerptFr: "Guide complet pour trouver un serrurier de confiance à Marrakech.",
      excerptAr: "دليل كامل لإيجاد سراج موثوق في مراكش.",
      excerptEn: "Complete guide to finding a trustworthy locksmith in Marrakech.",
      imageUrl: null, category: "Conseils",
    },
    {
      slug: "prix-serrurier-marrakech-2026",
      titleFr: "Tarifs serrurier Marrakech 2026",
      titleAr: "أسعار السراج في مراكش 2026",
      titleEn: "Locksmith prices Marrakech 2026",
      contentFr: `Tarifs serrurier Marrakech 2026\n\nVoici les prix moyens pratiqués par les serruriers à Marrakech :\n\n- Ouverture de porte : 150 MAD\n- Changement de serrure : 250 MAD\n- Blindage de porte : 1500 MAD\n- Coffre-fort : 500 MAD\n\nCes prix sont donnés à titre indicatif. Demandez toujours un devis gratuit avant toute intervention.`,
      contentAr: `أسعار السراج في مراكش 2026\n\nفيما يلي متوسط الأسعار التي يقدمها السراجون في مراكش:\n\n- فتح باب : 150 درهم\n- تغيير قفل : 250 درهم\n- تدريع باب : 1500 درهم\n- خزينة : 500 درهم\n\nهذه الأسعار إرشادية. اطلب دائمًا تقديرًا مجانيًا قبل أي تدخل.`,
      contentEn: `Locksmith prices Marrakech 2026\n\nHere are the average prices charged by locksmiths in Marrakech:\n\n- Door opening : 150 MAD\n- Lock change : 250 MAD\n- Door reinforcement : 1500 MAD\n- Safe : 500 MAD\n\nThese prices are indicative. Always ask for a free quote before any intervention.`,
      excerptFr: "Découvrez les tarifs moyens des serruriers à Marrakech en 2026.",
      excerptAr: "اكتشف متوسط أسعار السراجين في مراكش 2026.",
      excerptEn: "Discover average locksmith prices in Marrakech for 2026.",
      imageUrl: null, category: "Prix",
    },
  ]

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug, titleFr: a.titleFr, titleAr: a.titleAr, titleEn: a.titleEn,
        contentFr: a.contentFr, contentAr: a.contentAr, contentEn: a.contentEn,
        excerptFr: a.excerptFr, excerptAr: a.excerptAr, excerptEn: a.excerptEn,
        published: true,
        imageUrl: a.imageUrl, category: a.category,
      },
    })
  }

  console.log("Sample locksmiths and articles seeded successfully!")
  const lm = await prisma.locksmith.count()
  const ar = await prisma.article.count()
  console.log(`Locksmiths: ${lm}, Articles: ${ar}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
