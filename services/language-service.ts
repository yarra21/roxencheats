// Dil servisi

export type Language = {
  code: string
  name: string
  flag: string
}

export const availableLanguages: Language[] = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
]

// Varsayılan dil
export const defaultLanguage = "tr"

// Çeviriler
export type Translations = {
  [key: string]: {
    [key: string]: string
  }
}

export const translations: Translations = {
  // Navbar çevirileri
  "navbar.home": {
    tr: "Ana Sayfa",
    en: "Home",
    de: "Startseite",
    fr: "Accueil",
    es: "Inicio",
    ru: "Главная",
    ar: "الرئيسية",
    zh: "首页",
  },
  "navbar.features": {
    tr: "Özellikler",
    en: "Features",
    de: "Funktionen",
    fr: "Fonctionnalités",
    es: "Características",
    ru: "Функции",
    ar: "الميزات",
    zh: "功能",
  },
  "navbar.products": {
    tr: "Ürünler",
    en: "Products",
    de: "Produkte",
    fr: "Produits",
    es: "Productos",
    ru: "Продукты",
    ar: "المنتجات",
    zh: "产品",
  },
  "navbar.pricing": {
    tr: "Fiyatlandırma",
    en: "Pricing",
    de: "Preise",
    fr: "Tarifs",
    es: "Precios",
    ru: "Цены",
    ar: "التسعير",
    zh: "价格",
  },
  "navbar.faq": {
    tr: "SSS",
    en: "FAQ",
    de: "FAQ",
    fr: "FAQ",
    es: "FAQ",
    ru: "ЧЗВ",
    ar: "الأسئلة الشائعة",
    zh: "常见问题",
  },
  "navbar.login": {
    tr: "Giriş Yap",
    en: "Login",
    de: "Anmelden",
    fr: "Connexion",
    es: "Iniciar sesión",
    ru: "Вход",
    ar: "تسجيل الدخول",
    zh: "登录",
  },
  "navbar.register": {
    tr: "Kayıt Ol",
    en: "Register",
    de: "Registrieren",
    fr: "S'inscrire",
    es: "Registrarse",
    ru: "Регистрация",
    ar: "التسجيل",
    zh: "注册",
  },
  "navbar.logout": {
    tr: "Çıkış Yap",
    en: "Logout",
    de: "Abmelden",
    fr: "Déconnexion",
    es: "Cerrar sesión",
    ru: "Выход",
    ar: "تسجيل الخروج",
    zh: "登出",
  },

  // Hero çevirileri
  "hero.title": {
    tr: "Oyun Deneyiminizi Yükseltin",
    en: "Elevate Your Gaming Experience",
    de: "Verbessern Sie Ihr Spielerlebnis",
    fr: "Améliorez votre expérience de jeu",
    es: "Eleva tu experiencia de juego",
    ru: "Улучшите свой игровой опыт",
    ar: "ارتقِ بتجربة الألعاب الخاصة بك",
    zh: "提升您的游戏体验",
  },
  "hero.subtitle": {
    tr: "Üstün teknoloji ve eşsiz hassasiyet ile oyun deneyiminizi yükseltin.",
    en: "Elevate your gaming experience with superior technology and unmatched precision.",
    de: "Verbessern Sie Ihr Spielerlebnis mit überlegener Technologie und unübertroffener Präzision.",
    fr: "Améliorez votre expérience de jeu avec une technologie supérieure et une précision inégalée.",
    es: "Eleva tu experiencia de juego con tecnología superior y precisión inigualable.",
    ru: "Улучшите свой игровой опыт с помощью превосходных технологий и непревзойденной точности.",
    ar: "ارتقِ بتجربة الألعاب الخاصة بك مع تقنية متفوقة ودقة لا مثيل لها.",
    zh: "通过卓越的技术和无与伦比的精确度提升您的游戏体验。",
  },
  "hero.cta": {
    tr: "Hemen Başla",
    en: "Get Started",
    de: "Jetzt Starten",
    fr: "Commencer",
    es: "Comenzar",
    ru: "Начать",
    ar: "ابدأ الآن",
    zh: "立即开始",
  },

  // Footer çevirileri
  "footer.services": {
    tr: "Hizmetler",
    en: "Services",
    de: "Dienstleistungen",
    fr: "Services",
    es: "Servicios",
    ru: "Услуги",
    ar: "الخدمات",
    zh: "服务",
  },
  "footer.resources": {
    tr: "Kaynaklar",
    en: "Resources",
    de: "Ressourcen",
    fr: "Ressources",
    es: "Recursos",
    ru: "Ресурсы",
    ar: "الموارد",
    zh: "资源",
  },
  "footer.legal": {
    tr: "Yasal",
    en: "Legal",
    de: "Rechtliches",
    fr: "Mentions légales",
    es: "Legal",
    ru: "Правовая информация",
    ar: "قانوني",
    zh: "法律信息",
  },
  "footer.copyright": {
    tr: "Tüm hakları saklıdır.",
    en: "All rights reserved.",
    de: "Alle Rechte vorbehalten.",
    fr: "Tous droits réservés.",
    es: "Todos los derechos reservados.",
    ru: "Все права защищены.",
    ar: "جميع الحقوق محفوظة.",
    zh: "版权所有。",
  },
  "footer.creator": {
    tr: "Yapımcı: Ali",
    en: "Created by: Ali",
    de: "Erstellt von: Ali",
    fr: "Créé par: Ali",
    es: "Creado por: Ali",
    ru: "Создатель: Ali",
    ar: "صنع بواسطة: Ali",
    zh: "创建者: Ali",
  },
}

// Dil seçimi
export const setLanguage = (languageCode: string): void => {
  if (availableLanguages.some((lang) => lang.code === languageCode)) {
    localStorage.setItem("roxen_language", languageCode)
    // Sayfayı yenile
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }
}

// Mevcut dili al
export const getCurrentLanguage = (): string => {
  if (typeof window === "undefined") {
    return defaultLanguage
  }

  const savedLanguage = localStorage.getItem("roxen_language")
  if (savedLanguage && availableLanguages.some((lang) => lang.code === savedLanguage)) {
    return savedLanguage
  }

  // Tarayıcı dilini kontrol et
  const browserLang = navigator.language.split("-")[0]
  if (availableLanguages.some((lang) => lang.code === browserLang)) {
    return browserLang
  }

  return defaultLanguage
}

// Çeviri al
export const getTranslation = (key: string): string => {
  const currentLang = getCurrentLanguage()

  if (translations[key] && translations[key][currentLang]) {
    return translations[key][currentLang]
  }

  // Varsayılan dilde çeviri yoksa anahtar döndür
  if (translations[key] && translations[key][defaultLanguage]) {
    return translations[key][defaultLanguage]
  }

  return key
}
