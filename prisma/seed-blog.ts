import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const articles = [
    {
      slug: "comment-changer-une-serrure-a-marrakech",
      titleFr: "Comment changer une serrure à Marrakech : guide complet",
      titleAr: "كيفية تغيير القفل في مراكش: دليل شامل",
      titleEn: "How to Change a Lock in Marrakech: A Complete Guide",
      excerptFr: "Découvrez les étapes pour changer votre serrure en toute sécurité à Marrakech, avec nos conseils d'experts.",
      excerptAr: "اكتشف الخطوات لتغيير قفلك بأمان في مراكش، مع نصائح الخبراء.",
      excerptEn: "Learn the steps to change your lock safely in Marrakech with expert advice.",
      contentFr: "Le changement de serrure est une opération courante mais essentielle pour assurer la sécurité de votre domicile ou local commercial à Marrakech. Que ce soit suite à un déménagement, une perte de clés ou simplement pour renforcer la sécurité, nos serruriers professionnels vous guident pas à pas.\n\nPréparation et outils nécessaires\nAvant de commencer, assurez-vous d'avoir les bons outils : un tournevis, un perceuse, la nouvelle serrure compatible et bien sûr nos coordonnées d'urgence. Notre équipe est disponible 24h/24 pour vous accompagner.\n\nLes étapes du changement\n1. Retirez la vis de la poignée et démontez l'ancienne serrure\n2. Mesurez les dimensions précises de l'emboîture\n3. Insérez la nouvelle serrure en respectant l'alignement\n4. Fixez la poignée et testez le fonctionnement\n\nPourquoi nous choisir ?\nNos serruriers à Marrakech interviennent en moins de 30 minutes et proposent des prix transparents sans frais cachés.",
      contentAr: "تغيير القفل هو عملية شائعة ولكنها ضرورية لضمان أمان منزلك أو محلك التجاري في مراكش. سواء كان ذلك بعد الانتقال أو فقدان المفاتيح أو ببساطة لتعزيز الأمان، فإننا نرشدك خطوة بخطوة.\n\nالتحضير والأدوات المطلوبة\nتأكد من حيزك على الأدوات الصحيحة: مفك براغي، مثقاب، القفل الجديد المتوافق بالتأكيد أرقام الطوارئ. فريقنا متاح 24/7 لمساعدتك.\n\nخطوات التغيير\n1. أزل مسامير المقبض وأزل القفل القديم\n2. قياس الأبعاد الدقيقة للمقبس\n3. أدخل القفل الجديد مع مراعاة المحاذاة\n4. ثبت المقبض واختبر العمل\n\nلماذا نحن؟\nنحترف المراكش يتدخل في أقل من 30 دقيقة ويقدم أسعار شفافة بدون رسوم خفية.",
      contentEn: "Lock change is a common but essential operation to secure your home or business in Marrakech. Whether after a move, a key loss, or simply to improve security, our professional locksmiths guide you step by step.\n\nPreparation and necessary tools\nMake sure you have the right tools: a screwdriver, a drill, the compatible new lock, and of course our emergency contact numbers. Our team is available 24/7 to assist you.\n\nThe change steps\n1. Remove the handle screw and disassemble the old lock\n2. Measure the exact dimensions of the lock body\n3. Insert the new lock respecting the alignment\n4. Fix the handle and test the operation\n\nWhy choose us?\nOur locksmiths in Marrakech arrive within 30 minutes and offer transparent pricing with no hidden fees.",
      imageUrl: "/images/blog/lock-change.jpg",
      category: "serrurerie",
      published: true,
    },
    {
      slug: "serrurerie-urgence-marrakech-intervention-rapide",
      titleFr: "Serrurerie d'urgence à Marrakech : intervention en 30 minutes",
      titleAr: "سراجة الطوارئ في مراكش: تدخل في 30 دقيقة",
      titleEn: "Emergency Locksmith in Marrakech: 30-Minute Response",
      excerptFr: "Besoin d'un serrurier d'urgence à Marrakech ? Notre équipe intervient en 30 minutes, 24h/24 et 7j/7 pour toutes vos urgences serrurerie.",
      excerptAr: "هل تحتاج سراج طوارئ في مراكش؟ فريقنا يتدخل في 30 دقيقة، 24 ساعة في اليوم، 7 أيام في الأسبوع.",
      excerptEn: "Need an emergency locksmith in Marrakech? Our team responds within 30 minutes, 24/7, for all your locksmith emergencies.",
      contentFr: "Face à une urgence serrurerie à Marrakech, chaque minute compte. C'est pourquoi notre équipe de serruriers professionnels est disponible 24h/24 et 7j/7 pour intervenir en moins de 30 minutes dans tout Marrakech.\n\nTypes d'urgences que nous traitons\n- Ouverture de porte claquée ou verrouillée\n- Remplacement de serrure cassée ou forcée\n- Réparation de serrure after effraction\n- Dépannage de porte blindée\n- Copie de clés d'urgence\n\nNotre engagement qualité\nTous nos serruriers sont certifiés et disposent d'une assurance professionnelle. Nous utilisons uniquement des pièces de haute qualité provenant de fabricants reconnus. Le devis est toujours gratuit et sans engagement.\n\nZones d'intervention\nNous couvrons l'ensemble de Marrakech, tous les quartiers confondus, avec un temps d'intervention moyen de 30 minutes en centre-ville.",
      contentAr: "عندما يكون الأمر طوارئ سراج في مراكش، كل دقيقة مهمة. لهذا السبب، فريقنا سراجون محترف متاحون 24/7 للتدخل في غضون 30 دقيقة في كل مراكش.\n\nأنواع الطوارئ التي نعالجها\n- فتح الباب المغلق أو المسكون\n- استبدال القفل المكسور أو القسري\n- إصلاح القفل بعد الاقتحام\n- صيانة الباب المحصن\n- نسخ المفاتيح في حالات الطوارئ\n\nالتزامنا بالجودة\nجميع سراجنا معتمدون ومؤمنون مهنيًا. نستخدم فقط القطع عالية الجودة من مصنعين معروفين. التقييم دائمًا مجاني وبدون التزام.\n\nمناطق التغطية\nنغطي كل مراكش، جميع الأحياء، بمتوسط ​​وقت تدخل 30 دقيقة في وسط المدينة.",
      contentEn: "When facing a locksmith emergency in Marrakech, every minute counts. That's why our team of professional locksmiths is available 24/7 to respond within 30 minutes throughout Marrakech.\n\nTypes of emergencies we handle\n- Opening a slammed or locked door\n- Replacing a broken or forced lock\n- Repairing a lock after break-in\n- Emergency door reinforcement\n- Urgent key copying\n\nOur quality commitment\nAll our locksmiths are certified and carry professional insurance. We only use high-quality parts from recognized manufacturers. The quote is always free and without commitment.\n\nService areas\nWe cover all of Marrakech, all neighborhoods included, with an average response time of 30 minutes in the city center.",
      imageUrl: "/images/blog/emergency.jpg",
      category: "urgence",
      published: true,
    },
    {
      slug: "blindage-porte-marrakech-securite-maximale",
      titleFr: "Blindage de porte à Marrakech : maximisez votre sécurité",
      titleAr: "تعميق الباب في مراكش: تعظيم أمنك",
      titleEn: "Door Reinforcement in Marrakech: Maximize Your Security",
      excerptFr: "Le blindage de porte est la meilleure solution pour renforcer la sécurité de votre habitation à Marrakech. Découvrez nos prestations complètes.",
      excerptAr: "تعزيز الباب هو أفضل حل لتعزيز أمان منزلك في مراكش. اكتشف خدماتنا الشاملة.",
      excerptEn: "Door reinforcement is the best solution to enhance the security of your home in Marrakech. Discover our complete services.",
      contentFr: "Le blindage de porte est une solution de sécurité incontournable à Marrakech, où les effractions restent un problème dans certains quartiers. Ce renforcement permet de transformer une porte classique en une barrière quasi infranchissable sans la remplacer entièrement.\n\nAvantages du blindage\n- Résistance accrue aux tentatives d'effraction\n- Conservation de la porte existante (économie significative)\n- Amélioration de l'isolation thermique et phonique\n- Valorisation de votre bien immobilier\n- Conformité aux assurances habitation\n\nNos options de blindage\nNous proposons différents niveaux de blindage adaptés à vos besoins : renforcement de la serrure avec cylindre de haute sécurité, ajout de paumelles renforcées, installation d'un cylindre multipoints, et renfort de cadre avec plaques d'acier.\n\nLe processus complet\n1. Diagnostic gratuit de votre porte existante\n2. Proposition personnalisée avec devis détaillé\n3. Intervention en une seule journée\n4. Test et certification de la nouvelle installation\n\nContactez-nous pour un devis gratuit à Marrakech.",
      contentAr: "تعزيز الباب هو حل أمني لا غنى عنه في مراكش، حيث لا تزال اقتحامات مشكلة في بعض الأحياء. هذا التعزيز يتيح لك تحويل الباب العادي إلى حاجز شبه متين دون استبداله بالكامل.\n\nمزايا التعزيز\n- مقاومة محسنة لمحاولات الاقتحام\n- الحفاظ على الباب الموجود (توفير كبير)\n- تحسين العزل الحراري والمظلم\n- تقدير عقارك\n- الامتثال لسياسات التأمين\n\nخيارات التعزيز المتوفرة\nنقدم مستويات مختلفة من التعزيز لتناسب احتياجاتك: تعزيز القفل بأسطوانة أمان عالية، إضافة مفصلات معززة، تثبيت أسطوانة متعددة النقاط، وتدعيم الإطار بش plates steel.\n\nالعملية الكاملة\n1. تشخيص مجاني لبابك الحالي\n2. اقتراح مخصص مع تقييم تفصيلي\n3. تدخل في يوم واحد\n4. اختبار وشهادة التركيب الجديد\n\nاتصل بنا للحصول على تقييم مجاني في مراكش.",
      contentEn: "Door reinforcement is an essential security solution in Marrakech, where break-ins remain a concern in certain neighborhoods. This reinforcement transforms a standard door into a nearly impenetrable barrier without full replacement.\n\nBenefits of door reinforcement\n- Increased resistance to break-in attempts\n- Preserves existing door (significant savings)\n- Improved thermal and acoustic insulation\n- Increased property value\n- Home insurance compliance\n\nOur reinforcement options\nWe offer different levels adapted to your needs: high-security cylinder lock upgrade, reinforced hinges installation, multipoint lock system, and steel frame reinforcement plates.\n\nThe complete process\n1. Free assessment of your current door\n2. Customized proposal with detailed quote\n3. Single-day installation\n4. Testing and certification of the new installation\n\nContact us for a free quote in Marrakech.",
      imageUrl: "/images/blog/door-reinforcement.jpg",
      category: "serrurerie",
      published: true,
    },
    {
      slug: "changement-serrure-marrakech-prix-et-delai",
      titleFr: "Changement de serrure à Marrakech : prix et délais",
      titleAr: "تغيير القفل في مراكش: الأسعار والآجال",
      titleEn: "Lock Change in Marrakech: Pricing and Timelines",
      excerptFr: "Combien coûte un changement de serrure à Marrakech ? Quel est le délai d'intervention ? Toutes les réponses avec nos serruriers professionnels.",
      excerptAr: "ما تكلفة تغيير القفل في مراكش؟ ما هو وقت التدخل؟ كل الإجابات مع سراجينا المحترفين.",
      excerptEn: "How much does a lock change cost in Marrakech? What is the response time? All the answers with our professional locksmiths.",
      contentFr: "Le coût d'un changement de serrure à Marrakech varie en fonction de plusieurs facteurs : le type de serrure (simple, multipoints, haute sécurité), la marque, et la complexité de l'installation.\n\nFourchettes de prix indicative\n- Serrure 3 points standard : à partir de 150 MAD\n- Serrure 5 points haute sécurité : à partir de 350 MAD\n- Serrure connectée / smart lock : à partir de 800 MAD\n- Blindage complet de porte : à partir de 1200 MAD\n\nDélais d'intervention\nEn intervention standard : sous 48h\nEn urgence : intervention possible en moins de 30 minutes\nInstallation programmée : créneaux disponibles du lundi au samedi\n\nCe qui est inclus dans notre tarif\n- Diagnostic et déplacement gratuits\n- Main d'œuvre pour le démontage et l'installation\n- Fourniture de la serrure neuve\n- Test de fonctionnement et conseils de sécurité\n- Garantie 1 an sur la main d'œuvre\n\nN'hésitez pas à nous contacter pour un devis gratuit et sans engagement à Marrakech.",
      contentAr: "تكلفة تغيير القفل في مراكش تختلف بناء على عوامل عديدة: نوع القفل (عادي، متعدد النقاط، أمان عالٍ)، العلامة التجارية، والتعقيد تثبيت.\n\nمجالات الأسعار الإرشادية\n- قفل 3 نقاط عادي: ابتداءً من 150 درهم\n- قفل 5 نقاط أمان عالي: ابتداءً من 350 درهم\n- قفل ذكي / متصل: ابتداءً من 800 درهم\n- تعميق كامل الباب: ابتداءً من 1200 درهم\n\nآجال التدخل\n- تدخل عادي: أقل من 48 ساعة\n- طوارئ: تدخل ممكن في أقل من 30 دقيقة\n- تركيب مبرمج: فترات متاحة من الاثنين إلى السبت\n\nما هو شامل في تقييمنا\n- تشخيص مجاني وانتقال\n- أيدي العمل لتفكيك وتثبيت\n- توفير القفل الجديد\n- اختبار العمل ونصائح الأمان\n- ضمان سنة على أيدي العمل\n\nلا تتردد في الاتصال بنا للحصول على تقييم مجاني وبدون التزام في مراكش.",
      contentEn: "The cost of a lock change in Marrakech varies depending on several factors: the type of lock (standard, multipoint, high-security), the brand, and the complexity of installation.\n\nIndicative price ranges\n- Standard 3-point lock: from 150 MAD\n- High-security 5-point lock: from 350 MAD\n- Connected/smart lock: from 800 MAD\n- Full door reinforcement: from 1200 MAD\n\nResponse timelines\n- Standard service: within 48 hours\n- Emergency service: possible within 30 minutes\n- Scheduled installation: available Monday to Saturday\n\nWhat's included in our price\n- Free diagnostic and travel\n- Labor for disassembly and installation\n- New lock supply\n- Functionality testing and security advice\n- 1-year labor warranty\n\nDon't hesitate to contact us for a free, no-obligation quote in Marrakech.",
      imageUrl: "/images/blog/lock-pricing.jpg",
      category: "serrurerie",
      published: true,
    },
  ]

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    })
  }

  console.log(`Seeded ${articles.length} blog articles`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })