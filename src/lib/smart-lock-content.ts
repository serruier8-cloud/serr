export type Locale = "fr" | "ar" | "en"

export const SMART_LOCK_SLUGS = [
  "serrure-connectee",
  "serrure-intelligente",
  "installation-serrure-connectee",
  "reparation-serrure-connectee",
  "serrure-bluetooth",
  "serrure-wifi",
  "serrure-code",
  "serrure-biometrique",
  "serrure-empreinte-digitale",
  "smart-lock",
  "electronic-lock",
  "smart-lock-installation",
  "smart-lock-repair",
  "bluetooth-lock",
  "wifi-lock",
  "code-lock",
  "biometric-lock",
  "fingerprint-lock",
]

export function isSmartLockSlug(slug: string): boolean {
  const s = slug.toLowerCase()
  return SMART_LOCK_SLUGS.includes(s)
}

export interface LocalizedText {
  fr: string
  ar: string
  en: string
}

export interface SmartLockProduct {
  id: string
  brand: string
  model: string
  priceFrom: number
  image: string
  name: LocalizedText
  description: LocalizedText
  features: LocalizedText[]
}

const WIKI_BASE = "https://upload.wikimedia.org/wikipedia/commons"

export const SMART_LOCK_PRODUCTS: SmartLockProduct[] = [
  {
    id: "yale-linus-l2",
    brand: "Yale",
    model: "Linus L2",
    priceFrom: 1490,
    image: `${WIKI_BASE}/a/aa/Yale_Smart_lock_Facial_recognition_systemA.jpg`,
    name: { fr: "Yale Linus L2", ar: "Yale Linus L2", en: "Yale Linus L2" },
    description: {
      fr: "Serrure connectée Yale Linus L2 : code PIN + application, Bluetooth et WiFi intégrés. Installation en 30 minutes, compatible Alexa et Google Home, batterie 1 an.",
      ar: "قفل Yale Linus L2 الذكي: رمز PIN + تطبيق، بلوتوث وواي فاي مدمجان. تركيب في 30 دقيقة، متوافق مع Alexa وGoogle Home، بطارية سنة واحدة.",
      en: "Yale Linus L2 smart lock: PIN code + app, built-in Bluetooth and WiFi. Installs in 30 minutes, compatible with Alexa and Google Home, 1-year battery.",
    },
    features: [
      { fr: "Code PIN + application mobile", ar: "رمز PIN + تطبيق الهاتف", en: "PIN code + mobile app" },
      { fr: "Bluetooth + WiFi", ar: "بلوتوث + واي فاي", en: "Bluetooth + WiFi" },
      { fr: "Compatible Alexa/Google", ar: "متوافق مع Alexa/Google", en: "Alexa/Google compatible" },
      { fr: "Batterie 1 an", ar: "بطارية سنة واحدة", en: "1-year battery" },
    ],
  },
  {
    id: "samsung-shp-dp728",
    brand: "Samsung",
    model: "SHP-DP728",
    priceFrom: 2890,
    image: `${WIKI_BASE}/7/71/Yale_Smart_lock_Facial_recognition_system_door_lockC.jpg`,
    name: { fr: "Samsung SHP-DP728", ar: "Samsung SHP-DP728", en: "Samsung SHP-DP728" },
    description: {
      fr: "Serrure intelligente Samsung SHP-DP728 : empreinte digitale + code, reconnaissance faciale, badge RFID inclus. Design premium et application SmartThings.",
      ar: "قفل Samsung SHP-DP728 الذكي: بصمة إصبع + رمز، التعرف على الوجه، بطاقة RFID مرفقة. تصميم فاخر وتطبيق SmartThings.",
      en: "Samsung SHP-DP728 smart lock: fingerprint + code, facial recognition, RFID badge included. Premium design and SmartThings app.",
    },
    features: [
      { fr: "Empreinte digitale + code", ar: "بصمة إصبع + رمز", en: "Fingerprint + code" },
      { fr: "Reconnaissance faciale", ar: "التعرف على الوجه", en: "Facial recognition" },
      { fr: "Badge RFID inclus", ar: "بطاقة RFID مرفقة", en: "RFID badge included" },
      { fr: "Application SmartThings", ar: "تطبيق SmartThings", en: "SmartThings app" },
    ],
  },
  {
    id: "xiaomi-smart-lock-e10",
    brand: "Xiaomi",
    model: "Smart Lock E10",
    priceFrom: 990,
    image: `${WIKI_BASE}/0/0b/Schlage_Door_Lock_Keypad_System_Installed.jpg`,
    name: { fr: "Xiaomi Smart Lock E10", ar: "Xiaomi Smart Lock E10", en: "Xiaomi Smart Lock E10" },
    description: {
      fr: "Xiaomi Smart Lock E10 : empreinte + mot de passe, application Mi Home. Meilleur rapport qualité-prix du marché marocain, installation facile et garantie 2 ans.",
      ar: "قفل Xiaomi Smart Lock E10: بصمة + كلمة مرور، تطبيق Mi Home. أفضل جودة مقابل السعر في السوق المغربية، تركيب سهل وضمان سنتين.",
      en: "Xiaomi Smart Lock E10: fingerprint + password, Mi Home app. Best value on the Moroccan market, easy install and 2-year warranty.",
    },
    features: [
      { fr: "Empreinte + mot de passe", ar: "بصمة + كلمة مرور", en: "Fingerprint + password" },
      { fr: "Application Mi Home", ar: "تطبيق Mi Home", en: "Mi Home app" },
      { fr: "Meilleur rapport qualité-prix", ar: "أفضل سعر مقابل الجودة", en: "Best value" },
      { fr: "Garantie 2 ans", ar: "ضمان سنتين", en: "2-year warranty" },
    ],
  },
  {
    id: "august-smart-lock-pro",
    brand: "August",
    model: "Smart Lock Pro",
    priceFrom: 2490,
    image: `${WIKI_BASE}/b/b0/GOJI_Smart_Lock_%2815207853585%29.jpg`,
    name: { fr: "August Smart Lock Pro", ar: "August Smart Lock Pro", en: "August Smart Lock Pro" },
    description: {
      fr: "August Smart Lock Pro : WiFi + Bluetooth intégré, compatible Apple HomeKit. Installation sans perçage et contrôle à distance. Design discret.",
      ar: "قفل August Smart Lock Pro: واي فاي + بلوتوث مدمج، متوافق مع Apple HomeKit. تركيب بدون ثقب وتحكم عن بعد. تصميم أنيق.",
      en: "August Smart Lock Pro: built-in WiFi + Bluetooth, Apple HomeKit compatible. No-drill install and remote control. Discreet design.",
    },
    features: [
      { fr: "WiFi + Bluetooth intégré", ar: "واي فاي + بلوتوث مدمج", en: "Built-in WiFi + Bluetooth" },
      { fr: "Compatible Apple HomeKit", ar: "متوافق مع Apple HomeKit", en: "Apple HomeKit compatible" },
      { fr: "Installation sans perçage", ar: "تركيب بدون ثقب", en: "No-drill installation" },
      { fr: "Contrôle à distance", ar: "تحكم عن بعد", en: "Remote control" },
    ],
  },
  {
    id: "nuki-smart-lock-3",
    brand: "Nuki",
    model: "Smart Lock 3.0",
    priceFrom: 1790,
    image: `${WIKI_BASE}/e/e7/Unlocking_a_smart_lock_via_Bluetooth.png`,
    name: { fr: "Nuki Smart Lock 3.0", ar: "Nuki Smart Lock 3.0", en: "Nuki Smart Lock 3.0" },
    description: {
      fr: "Nuki Smart Lock 3.0 : ouverture automatique, intégration domotique complète, clés virtuelles pour invités et historique des accès. Fabriqué en Europe.",
      ar: "قفل Nuki Smart Lock 3.0: فتح تلقائي، تكامل المنزل الذكي الكامل، مفاتيح افتراضية للضيوف وسجل الوصول. صنع في أوروبا.",
      en: "Nuki Smart Lock 3.0: auto unlock, full home automation integration, virtual guest keys and access history. Made in Europe.",
    },
    features: [
      { fr: "Ouverture automatique", ar: "فتح تلقائي", en: "Auto unlock" },
      { fr: "Intégration domotique", ar: "تكامل المنزل الذكي", en: "Home automation integration" },
      { fr: "Clés virtuelles invités", ar: "مفاتيح افتراضية للضيوف", en: "Virtual guest keys" },
      { fr: "Historique des accès", ar: "سجل الوصول", en: "Access history" },
    ],
  },
  {
    id: "ultraloq-u-bolt-pro",
    brand: "Ultraloq",
    model: "U-Bolt Pro",
    priceFrom: 1990,
    image: `${WIKI_BASE}/c/cd/TP-Link_Tapo_Smart_Wi-Fi_Door_Lock.jpg`,
    name: { fr: "Ultraloq U-Bolt Pro", ar: "Ultraloq U-Bolt Pro", en: "Ultraloq U-Bolt Pro" },
    description: {
      fr: "Ultraloq U-Bolt Pro : 6 modes d'ouverture, empreinte + code + application, anti-effraction avancée, résistant aux intempéries. Facile à installer.",
      ar: "قفل Ultraloq U-Bolt Pro: 6 طرق فتح، بصمة + رمز + تطبيق، مضاد للاقتحام المتقدم، مقاوم للعوامل الجوية. سهل التركيب.",
      en: "Ultraloq U-Bolt Pro: 6 unlock modes, fingerprint + code + app, advanced anti-break-in, weather resistant. Easy to install.",
    },
    features: [
      { fr: "6 modes d'ouverture", ar: "6 طرق فتح", en: "6 unlock modes" },
      { fr: "Empreinte + code + app", ar: "بصمة + رمز + تطبيق", en: "Fingerprint + code + app" },
      { fr: "Anti-effraction avancée", ar: "مضاد اقتحام متقدم", en: "Advanced anti-break-in" },
      { fr: "Résistant intempéries", ar: "مقاوم للعوامل الجوية", en: "Weather resistant" },
    ],
  },
]

export const SMART_LOCK_BRANDS = [
  "Yale",
  "Samsung",
  "Xiaomi",
  "August",
  "Nuki",
  "Ultraloq",
  "Lockly",
  "Kwikset",
  "Schlage",
  "Igloohome",
]

export interface ProductType {
  id: string
  image: string
  name: LocalizedText
  description: LocalizedText
  priceRange: LocalizedText
  access: LocalizedText[]
}

export const SMART_LOCK_TYPES: ProductType[] = [
  {
    id: "serrure-code",
    image: `${WIKI_BASE}/6/6d/Keypad_door_knob.jpg`,
    name: { fr: "Serrure à code", ar: "قفل بالرمز", en: "Code lock" },
    description: {
      fr: "Ouverture par code PIN sur clavier tactile. Idéale pour les locations et les accès partagés. Codes temporaires pour invités et personnel.",
      ar: "فتح برمز PIN على لوحة لمسية. مثالية للإيجارات والوصول المشترك. رموز مؤقتة للضيوف والموظفين.",
      en: "PIN code entry on a touch keypad. Ideal for rentals and shared access. Temporary codes for guests and staff.",
    },
    priceRange: { fr: "800 - 1 500 MAD", ar: "800 - 1,500 درهم", en: "800 - 1,500 MAD" },
    access: [
      { fr: "Code PIN", ar: "رمز PIN", en: "PIN code" },
      { fr: "Clavier tactile", ar: "لوحة لمسية", en: "Touch keypad" },
    ],
  },
  {
    id: "serrure-bluetooth",
    image: `${WIKI_BASE}/e/e7/Unlocking_a_smart_lock_via_Bluetooth.png`,
    name: { fr: "Serrure Bluetooth", ar: "قفل بلوتوث", en: "Bluetooth lock" },
    description: {
      fr: "Ouverture depuis votre smartphone via Bluetooth et application mobile. Accès partagé et historique d'ouverture. Économique et simple à installer.",
      ar: "فتح من هاتفك عبر بلوتوث وتطبيق الهاتف. وصول مشترك وسجل الفتح. اقتصادية وسهلة التركيب.",
      en: "Open from your smartphone via Bluetooth and mobile app. Shared access and opening history. Affordable and simple to install.",
    },
    priceRange: { fr: "700 - 1 300 MAD", ar: "700 - 1,300 درهم", en: "700 - 1,300 MAD" },
    access: [
      { fr: "Application smartphone", ar: "تطبيق الهاتف", en: "Smartphone app" },
      { fr: "Bluetooth", ar: "بلوتوث", en: "Bluetooth" },
    ],
  },
  {
    id: "serrure-wifi",
    image: `${WIKI_BASE}/c/cd/TP-Link_Tapo_Smart_Wi-Fi_Door_Lock.jpg`,
    name: { fr: "Serrure WiFi", ar: "قفل واي فاي", en: "WiFi lock" },
    description: {
      fr: "Contrôle à distance depuis n'importe où via WiFi et application. Notifications en temps réel et intégration Alexa/Google Home.",
      ar: "تحكم عن بعد من أي مكان عبر واي فاي والتطبيق. إشعارات فورية وتكامل مع Alexa/Google Home.",
      en: "Remote control from anywhere via WiFi and app. Real-time notifications and Alexa/Google Home integration.",
    },
    priceRange: { fr: "1 300 - 2 500 MAD", ar: "1,300 - 2,500 درهم", en: "1,300 - 2,500 MAD" },
    access: [
      { fr: "WiFi + application", ar: "واي فاي + تطبيق", en: "WiFi + app" },
      { fr: "Contrôle à distance", ar: "تحكم عن بعد", en: "Remote control" },
    ],
  },
  {
    id: "serrure-biometrique",
    image: `${WIKI_BASE}/0/0b/Schlage_Door_Lock_Keypad_System_Installed.jpg`,
    name: { fr: "Serrure biométrique", ar: "قفل بيومتري", en: "Biometric lock" },
    description: {
      fr: "Ouverture par empreinte digitale. Sécurité maximale, jusqu'à 50-100 empreintes enregistrées. Anti-effraction et anti-copie.",
      ar: "فتح ببصمة الإصبع. أمان أقصى، حتى 50-100 بصمة مسجلة. مضاد للاقتحام ومضاد للنسخ.",
      en: "Fingerprint unlock. Maximum security, up to 50-100 stored fingerprints. Anti-break-in and anti-copy.",
    },
    priceRange: { fr: "1 200 - 2 800 MAD", ar: "1,200 - 2,800 درهم", en: "1,200 - 2,800 MAD" },
    access: [
      { fr: "Empreinte digitale", ar: "بصمة الإصبع", en: "Fingerprint" },
      { fr: "Code + clé de secours", ar: "رمز + مفتاح احتياطي", en: "Code + backup key" },
    ],
  },
  {
    id: "serrure-reconnaissance-faciale",
    image: `${WIKI_BASE}/a/aa/Yale_Smart_lock_Facial_recognition_systemA.jpg`,
    name: { fr: "Serrure à reconnaissance faciale", ar: "قفل بالتعرف على الوجه", en: "Face recognition lock" },
    description: {
      fr: "Technologie Face ID : reconnaissance faciale 3D, caméra intégrée et écran. Le haut de gamme de la serrure intelligente, pour villas et résidences.",
      ar: "تقنية Face ID: التعرف على الوجه ثلاثي الأبعاد، كاميرا مدمجة وشاشة. فئة عالية من القفل الذكي للفيلات والمساكن.",
      en: "Face ID technology: 3D facial recognition, built-in camera and screen. The premium smart lock, for villas and residences.",
    },
    priceRange: { fr: "2 500 - 4 000 MAD", ar: "2,500 - 4,000 درهم", en: "2,500 - 4,000 MAD" },
    access: [
      { fr: "Reconnaissance faciale 3D", ar: "تعرف على الوجه ثلاثي الأبعاد", en: "3D face recognition" },
      { fr: "Caméra + écran", ar: "كاميرا + شاشة", en: "Camera + screen" },
    ],
  },
]

export const SMART_LOCK_FEATURES: Record<Locale, string[]> = {
  fr: [
    "Ouverture sans clé : empreinte, code, smartphone, carte RFID ou reconnaissance faciale",
    "Contrôle à distance depuis votre téléphone, où que vous soyez au Maroc ou à l'étranger",
    "Codes temporaires pour invités, employés de maison et prestataires de services",
    "Historique complet des entrées et sorties consultable sur application",
    "Alarme anti-effraction intégrée avec notification smartphone en temps réel",
    "Batterie longue durée 8-12 mois avec alertes en cas de batterie faible",
    "Clé mécanique de secours conservée pour toutes les situations",
    "Compatible toutes portes : bois, métal, aluminium et PVC",
    "Cryptage AES des communications Bluetooth et WiFi",
    "Installation professionnelle en 30 à 60 minutes avec configuration complète",
  ],
  ar: [
    "فتح بدون مفتاح: بصمة، رمز، هاتف، بطاقة RFID أو التعرف على الوجه",
    "تحكم عن بعد من هاتفك أينما كنت في المغرب أو في الخارج",
    "رموز مؤقتة للضيوف وموظفي المنزل ومقدمي الخدمات",
    "سجل كامل للدخول والخروج عبر التطبيق",
    "إنذار مضاد للاقتحام مع إشعار فوري على الهاتف",
    "بطارية طويلة الأمد 8-12 شهرًا مع تنبيهات عند انخفاض البطارية",
    "مفتاح ميكانيكي احتياطي لكل الحالات",
    "متوافق مع جميع الأبواب: خشب، معدن، ألمنيوم وPVC",
    "تشفير AES لاتصالات البلوتوث والواي فاي",
    "تركيب احترافي في 30 إلى 60 دقيقة مع إعداد كامل",
  ],
  en: [
    "Keyless entry: fingerprint, code, smartphone, RFID card or face recognition",
    "Remote control from your phone, anywhere in Morocco or abroad",
    "Temporary codes for guests, house staff and service providers",
    "Full entry and exit history available on the app",
    "Integrated anti-break-in alarm with real-time smartphone notification",
    "Long 8-12 month battery life with low battery alerts",
    "Mechanical backup key retained for all situations",
    "Compatible with all doors: wood, metal, aluminium and PVC",
    "AES encryption for Bluetooth and WiFi communications",
    "Professional installation in 30-60 minutes with full setup",
  ],
}

export const SMART_LOCK_SERVICES: LocalizedText[] = [
  {
    fr: "Installation Standard",
    ar: "التركيب القياسي",
    en: "Standard installation",
  },
  {
    fr: "Réparation Simple",
    ar: "الإصلاح البسيط",
    en: "Simple repair",
  },
  {
    fr: "Remplacement Batterie",
    ar: "استبدال البطارية",
    en: "Battery replacement",
  },
  {
    fr: "Déblocage Urgence",
    ar: "فتح الطوارئ",
    en: "Emergency unlock",
  },
  {
    fr: "Configuration Application",
    ar: "إعداد التطبيق",
    en: "App configuration",
  },
]

export const SMART_LOCK_SERVICE_PRICES: number[] = [990, 290, 150, 490, 190]

export function getSmartLockFAQ(locale: Locale, serviceName: string, locationName: string): Array<{ question: string; answer: string }> {
  const fr = [
    { question: `Quelle est la meilleure serrure intelligente à ${locationName} Marrakech ?`, answer: `Tout dépend de votre budget : Xiaomi Smart Lock E10 (990 MAD) pour un petit budget, Yale Linus L2 (1 490 MAD) ou Nuki Smart Lock 3.0 (1 790 MAD) pour le meilleur compromis fiabilité/prix, Samsung SHP-DP728 (2 890 MAD) pour le haut de gamme avec reconnaissance faciale. Nos techniciens à ${locationName} vous conseillent gratuitement selon votre porte et vos besoins.` },
    { question: `Combien de temps prend l'installation d'une serrure intelligente à ${locationName} ?`, answer: `L'installation standard prend 30 à 60 minutes selon le modèle et le type de porte : 30 minutes pour un modèle simple (Xiaomi, Yale basique) sur porte standard, 45 minutes pour les modèles avancés nécessitant la configuration WiFi, 60 minutes pour les portes blindées. L'installation à ${locationName} inclut la configuration de l'application et l'enregistrement de 3 codes/empreintes.` },
    { question: `Que faire si la batterie de ma serrure intelligente est déchargée à ${locationName} ?`, answer: `Trois solutions : 1) connecter une powerbank sur le port micro-USB externe pour alimenter temporairement la serrure ; 2) utiliser la clé mécanique de secours (90% des modèles gardent un cylindre caché) ; 3) appeler notre dépannage 24/7 à ${locationName} - intervention en moins de 2h avec piles neuves incluses (150 MAD). L'application signale la batterie faible 30 jours avant la décharge.` },
    { question: `Les serrures intelligentes sont-elles sécurisées contre le piratage ?`, answer: `Oui, les marques réputées offrent une excellente sécurité : cryptage AES-128/256 des communications Bluetooth/WiFi, authentification multi-facteurs (code + empreinte + smartphone), alarme anti-effraction avec sirène 100dB et notification instantanée, mises à jour firmware automatiques. Nous recommandons d'éviter les marques inconnues à moins de 500 MAD et de privilégier Yale, Samsung ou August.` },
    { question: `Puis-je installer une serrure intelligente sur ma porte actuelle à ${locationName} ?`, answer: `Oui, nos serrures intelligentes sont compatibles avec 99% des portes : bois, métal, aluminium et PVC. La plupart des modèles s'installent sans perçage supplémentaire en conservant le cylindre existant. Nos techniciens à ${locationName} vérifient gratuitement la compatibilité avant toute installation.` },
    { question: `Proposez-vous la réparation de serrures intelligentes à ${locationName} ?`, answer: `Oui, nous réparons toutes les marques : Yale, Samsung, Xiaomi, August, Nuki, Ultraloq, Lockly. Le diagnostic est gratuit et l'intervention se fait en moins de 2h à ${locationName}. La réparation simple coûte 290 MAD hors pièces, et nous gardons des pièces détachées originales en stock.` },
  ]
  const ar = [
    { question: `ما هو أفضل قفل ذكي في ${locationName} مراكش؟`, answer: `حسب ميزانيتك: Xiaomi Smart Lock E10 (990 درهم) لميزانية صغيرة، Yale Linus L2 (1,490 درهم) أو Nuki Smart Lock 3.0 (1,790 درهم) لأفضل توازن جودة/سعر، Samsung SHP-DP728 (2,890 درهم) للفئة العالية مع التعرف على الوجه. تقنيونا في ${locationName} ينصحونك مجانًا حسب بابك واحتياجاتك.` },
    { question: `كم يستغرق تركيب القفل الذكي في ${locationName}؟`, answer: `التركيب القياسي يستغرق 30 إلى 60 دقيقة حسب النموذج ونوع الباب: 30 دقيقة للنماذج البسيطة (Xiaomi, Yale) على باب قياسي، 45 دقيقة للنماذج المتقدمة التي تتطلب إعداد واي فاي، 60 دقيقة للأبواب المدرعة. يشمل التركيب في ${locationName} إعداد التطبيق وتسجيل 3 رموز/بصمات.` },
    { question: `ماذا أفعل إذا انخفضت بطارية قفلي الذكي في ${locationName}؟`, answer: `ثلاثة حلول: 1) توصيل بنك طاقة عبر منفذ micro-USB الخارجي لتشغيل مؤقت؛ 2) استخدام المفتاح الميكانيكي الاحتياطي (90% من النماذج تحتفظ بأسطوانة مخفية)؛ 3) الاتصال بخدمة الطوارئ 24/7 في ${locationName} - تدخل في أقل من ساعتين مع بطاريات جديدة (150 درهم). يخطرك التطبيق قبل 30 يومًا من نفاد البطارية.` },
    { question: `هل الأقفال الذكية آمنة ضد الاختراق؟`, answer: `نعم، توفر العلامات التجارية المرموقة أمانًا ممتازًا: تشفير AES-128/256 لاتصالات البلوتوث والواي فاي، مصادقة متعددة العوامل (رمز + بصمة + هاتف)، إنذار مضاد للاقتحام 100dB مع إشعار فوري، تحديثات تلقائية للبرامج الثابتة. ننصح بتجنب العلامات غير المعروفة الأقل من 500 درهم واختيار Yale أو Samsung أو August.` },
    { question: `هل يمكن تركيب قفل ذكي على بابي الحالي في ${locationName}؟`, answer: `نعم، أقفالنا الذكية متوافقة مع 99% من الأبواب: خشب، معدن، ألمنيوم وPVC. معظم النماذج تُركب بدون ثقب إضافي مع الحفاظ على الأسطوانة الموجودة. تقنيونا في ${locationName} يتحققون مجانًا من التوافق قبل أي تركيب.` },
    { question: `هل تقدمون إصلاح الأقفال الذكية في ${locationName}؟`, answer: `نعم، نصلح جميع العلامات: Yale, Samsung, Xiaomi, August, Nuki, Ultraloq, Lockly. التشخيص مجاني والتدخل في أقل من ساعتين في ${locationName}. الإصلاح البسيط 290 درهم بدون قطع، ولدينا قطع غيار أصلية في المخزون.` },
  ]
  const en = [
    { question: `What is the best smart lock in ${locationName} Marrakech?`, answer: `It depends on your budget: Xiaomi Smart Lock E10 (990 MAD) for a small budget, Yale Linus L2 (1,490 MAD) or Nuki Smart Lock 3.0 (1,790 MAD) for the best reliability/price balance, Samsung SHP-DP728 (2,890 MAD) for premium with facial recognition. Our technicians in ${locationName} advise you for free based on your door and needs.` },
    { question: `How long does smart lock installation take in ${locationName}?`, answer: `Standard installation takes 30-60 minutes depending on the model and door type: 30 minutes for simple models (Xiaomi, basic Yale) on a standard door, 45 minutes for advanced models needing WiFi setup, 60 minutes for reinforced doors. Installation in ${locationName} includes app configuration and registering 3 codes/fingerprints.` },
    { question: `What to do if my smart lock battery dies in ${locationName}?`, answer: `Three solutions: 1) plug a power bank into the external micro-USB port for temporary power; 2) use the mechanical backup key (90% of models keep a hidden cylinder); 3) call our 24/7 emergency service in ${locationName} - intervention in under 2 hours with new batteries included (150 MAD). The app warns you 30 days before the battery runs out.` },
    { question: `Are smart locks secure against hacking?`, answer: `Yes, reputable brands offer excellent security: AES-128/256 encryption for Bluetooth/WiFi communications, multi-factor authentication (code + fingerprint + smartphone), anti-break-in alarm with 100dB siren and instant notification, automatic firmware updates. We recommend avoiding unknown brands under 500 MAD and choosing Yale, Samsung or August.` },
    { question: `Can I install a smart lock on my current door in ${locationName}?`, answer: `Yes, our smart locks are compatible with 99% of doors: wood, metal, aluminium and PVC. Most models install without extra drilling while keeping your existing cylinder. Our technicians in ${locationName} check compatibility for free before any installation.` },
    { question: `Do you repair smart locks in ${locationName}?`, answer: `Yes, we repair all brands: Yale, Samsung, Xiaomi, August, Nuki, Ultraloq, Lockly. Diagnosis is free and intervention takes under 2 hours in ${locationName}. Simple repair costs 290 MAD excluding parts, and we keep original spare parts in stock.` },
  ]
  const data: Record<Locale, Array<{ question: string; answer: string }>> = { fr, ar, en }
  return data[locale] || fr
}

export const SMART_LOCK_INSTALL_STEPS: LocalizedText[] = [
  { fr: "Évaluation gratuite de votre porte et conseil sur le modèle adapté", ar: "تقييم مجاني لبابك ونصيحة حول النموذج المناسب", en: "Free door assessment and advice on the right model" },
  { fr: "Installation professionnelle en 30-60 minutes sans dommage", ar: "تركيب احترافي في 30-60 دقيقة بدون ضرر", en: "Professional installation in 30-60 minutes without damage" },
  { fr: "Connexion WiFi et configuration de l'application mobile", ar: "توصيل الواي فاي وإعداد تطبيق الهاتف", en: "WiFi connection and mobile app setup" },
  { fr: "Enregistrement des codes, empreintes et utilisateurs", ar: "تسجيل الرموز والبصمات والمستخدمين", en: "Registering codes, fingerprints and users" },
  { fr: "Formation d'utilisation et test complet du système", ar: "تدريب على الاستخدام واختبار كامل للنظام", en: "User training and full system test" },
]
