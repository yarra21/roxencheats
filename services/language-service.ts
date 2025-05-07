// Desteklenen diller
const supportedLanguages = ["tr", "en", "de", "fr", "es", "ru"]

// Varsayılan dil
const defaultLanguage = "tr"

// Dil çevirileri
const translations: Record<string, Record<string, string>> = {
  tr: {
    "hero.subtitle": "Üstün teknoloji ve eşsiz güvenlik çözümleri ile sistem güvenliğinizi en üst seviyeye çıkarın.",
    "footer.services": "Hizmetler",
    "footer.resources": "Kaynaklar",
    "footer.legal": "Yasal",
    "footer.copyright": "Tüm hakları saklıdır.",
    "footer.creator": "Yapımcı: Ali",
    "system.info.title": "Sistem Bilgileri",
    "system.info.ip": "IP Adresi",
    "system.info.browser": "Tarayıcı",
    "system.info.os": "İşletim Sistemi",
    "system.info.device": "Cihaz",
    "system.info.screen": "Ekran Çözünürlüğü",
    "system.info.language": "Dil",
    "system.info.timezone": "Saat Dilimi",
    "system.info.close": "Kapat",
  },
  en: {
    "hero.subtitle":
      "Elevate your system security to the highest level with superior technology and unique security solutions.",
    "footer.services": "Services",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.copyright": "All rights reserved.",
    "footer.creator": "Created by: Ali",
    "system.info.title": "System Information",
    "system.info.ip": "IP Address",
    "system.info.browser": "Browser",
    "system.info.os": "Operating System",
    "system.info.device": "Device",
    "system.info.screen": "Screen Resolution",
    "system.info.language": "Language",
    "system.info.timezone": "Timezone",
    "system.info.close": "Close",
  },
  de: {
    "hero.subtitle":
      "Erhöhen Sie Ihre Systemsicherheit mit überlegener Technologie und einzigartigen Sicherheitslösungen.",
    "footer.services": "Dienstleistungen",
    "footer.resources": "Ressourcen",
    "footer.legal": "Rechtliches",
    "footer.copyright": "Alle Rechte vorbehalten.",
    "footer.creator": "Erstellt von: Ali",
    "system.info.title": "Systeminformationen",
    "system.info.ip": "IP-Adresse",
    "system.info.browser": "Browser",
    "system.info.os": "Betriebssystem",
    "system.info.device": "Gerät",
    "system.info.screen": "Bildschirmauflösung",
    "system.info.language": "Sprache",
    "system.info.timezone": "Zeitzone",
    "system.info.close": "Schließen",
  },
  fr: {
    "hero.subtitle":
      "Élevez votre sécurité système au plus haut niveau avec une technologie supérieure et des solutions de sécurité uniques.",
    "footer.services": "Services",
    "footer.resources": "Ressources",
    "footer.legal": "Mentions légales",
    "footer.copyright": "Tous droits réservés.",
    "footer.creator": "Créé par: Ali",
    "system.info.title": "Informations système",
    "system.info.ip": "Adresse IP",
    "system.info.browser": "Navigateur",
    "system.info.os": "Système d'exploitation",
    "system.info.device": "Appareil",
    "system.info.screen": "Résolution d'écran",
    "system.info.language": "Langue",
    "system.info.timezone": "Fuseau horaire",
    "system.info.close": "Fermer",
  },
  es: {
    "hero.subtitle":
      "Eleve su seguridad del sistema al más alto nivel con tecnología superior y soluciones de seguridad únicas.",
    "footer.services": "Servicios",
    "footer.resources": "Recursos",
    "footer.legal": "Legal",
    "footer.copyright": "Todos los derechos reservados.",
    "footer.creator": "Creado por: Ali",
    "system.info.title": "Información del sistema",
    "system.info.ip": "Dirección IP",
    "system.info.browser": "Navegador",
    "system.info.os": "Sistema operativo",
    "system.info.device": "Dispositivo",
    "system.info.screen": "Resolución de pantalla",
    "system.info.language": "Idioma",
    "system.info.timezone": "Zona horaria",
    "system.info.close": "Cerrar",
  },
  ru: {
    "hero.subtitle":
      "Поднимите безопасность вашей системы на самый высокий уровень с помощью превосходных технологий и уникальных решений безопасности.",
    "footer.services": "Услуги",
    "footer.resources": "Ресурсы",
    "footer.legal": "Правовая информация",
    "footer.copyright": "Все права защищены.",
    "footer.creator": "Создатель: Ali",
    "system.info.title": "Информация о системе",
    "system.info.ip": "IP-адрес",
    "system.info.browser": "Браузер",
    "system.info.os": "Операционная система",
    "system.info.device": "Устройство",
    "system.info.screen": "Разрешение экрана",
    "system.info.language": "Язык",
    "system.info.timezone": "Часовой пояс",
    "system.info.close": "Закрыть",
  },
}

// Mevcut dili al
export const getCurrentLanguage = (): string => {
  if (typeof window === "undefined") return defaultLanguage

  const savedLang = localStorage.getItem("shield_language")

  if (savedLang && supportedLanguages.includes(savedLang)) {
    return savedLang
  }

  // Tarayıcı dilini kontrol et
  const browserLang = navigator.language.split("-")[0]

  if (supportedLanguages.includes(browserLang)) {
    return browserLang
  }

  return defaultLanguage
}

// Dili ayarla
export const setLanguage = (langCode: string): void => {
  if (typeof window === "undefined") return

  if (supportedLanguages.includes(langCode)) {
    localStorage.setItem("shield_language", langCode)
  }
}

// Çeviri al
export const getTranslation = (key: string): string => {
  const currentLang = getCurrentLanguage()

  if (translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key]
  }

  // Varsayılan dilde çeviri yoksa, anahtarı döndür
  if (translations[defaultLanguage] && translations[defaultLanguage][key]) {
    return translations[defaultLanguage][key]
  }

  return key
}
