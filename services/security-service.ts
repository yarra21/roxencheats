// Sürekli çalışan güvenlik servisi

// Güvenlik durumu
let securityActive = false

// Güvenlik servisini başlat
export const initSecurityService = (): void => {
  if (securityActive || typeof window === "undefined") return

  securityActive = true

  // Konsol mesajı
  console.log("%c⚠️ ROXEN.AIM Güvenlik Sistemi Aktif", "color: red; font-size: 16px; font-weight: bold;")

  // Periyodik güvenlik kontrolleri
  const securityInterval = setInterval(() => {
    try {
      // Geliştirici araçları kontrolü
      checkDevTools()

      // Anti-debugging kontrolü
      antiDebugging()

      // İframe kontrolü
      checkIframe()

      // Tarayıcı eklentileri kontrolü
      checkExtensions()
    } catch (error) {
      // Hata durumunda sessizce devam et
    }
  }, 10000)

  // Olay dinleyicilerini ekle
  addSecurityEventListeners()

  // Temizleme fonksiyonu
  return () => {
    clearInterval(securityInterval)
    securityActive = false
  }
}

// Geliştirici araçları kontrolü
const checkDevTools = (): void => {
  try {
    // Pencere boyutu farkı ile tespit
    const widthThreshold = window.outerWidth - window.innerWidth > 160
    const heightThreshold = window.outerHeight - window.innerHeight > 160

    // Geliştirici araçları açıksa
    if (widthThreshold || heightThreshold) {
      handleSecurityViolation("DEVTOOLS_OPEN", "Geliştirici araçları açık tespit edildi")
    }
  } catch (error) {
    // Hata durumunda sessizce devam et
  }
}

// Anti-debugging kontrolü
const antiDebugging = (): void => {
  try {
    const startTime = new Date().getTime()
    debugger
    const endTime = new Date().getTime()

    // Debugger'da durma süresi uzunsa
    if (endTime - startTime > 100) {
      handleSecurityViolation("DEBUGGER", "Debugger tespit edildi")
    }
  } catch (error) {
    // Hata durumunda sessizce devam et
  }
}

// İframe kontrolü
const checkIframe = (): void => {
  try {
    // İframe içinde mi?
    if (window.self !== window.top) {
      handleSecurityViolation("IFRAME_EMBEDDING", "Sayfa bir iframe içinde açılmış")
      // İframe içinde açılmayı engelle
      window.top.location = window.self.location
    }
  } catch (e) {
    // Erişim hatası varsa, muhtemelen farklı bir domain'den iframe içinde
    handleSecurityViolation("CROSS_ORIGIN_IFRAME", "Sayfa farklı bir domain'den iframe içinde açılmış")
  }
}

// Tarayıcı eklentileri kontrolü
const checkExtensions = (): void => {
  try {
    // React DevTools
    if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      handleSecurityViolation("REACT_DEVTOOLS", "React DevTools tespit edildi")
    }

    // Redux DevTools
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
      handleSecurityViolation("REDUX_DEVTOOLS", "Redux DevTools tespit edildi")
    }
  } catch (error) {
    // Hata durumunda sessizce devam et
  }
}

// Güvenlik olay dinleyicilerini ekle
const addSecurityEventListeners = (): void => {
  // Sağ tıklama engelleme
  document.addEventListener("contextmenu", (e) => {
    // Form elementlerinde sağ tıklamaya izin ver
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) {
      return true
    }

    e.preventDefault()
    handleSecurityViolation("RIGHT_CLICK", "Sağ tıklama tespit edildi")
    return false
  })

  // Klavye kısayollarını engelleme
  document.addEventListener("keydown", (e) => {
    // Form elementlerinde normal klavye kullanımına izin ver
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) {
      return true
    }

    // F12
    if (e.keyCode === 123) {
      e.preventDefault()
      handleSecurityViolation("DEVTOOLS_SHORTCUT", "F12 tuşu tespit edildi")
      return false
    }

    // Ctrl+Shift+I veya Ctrl+Shift+J veya Ctrl+Shift+C (Geliştirici araçları)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault()
      handleSecurityViolation("DEVTOOLS_SHORTCUT", "Geliştirici araçları kısayolu tespit edildi")
      return false
    }

    // Ctrl+U (Kaynak kodu görüntüleme)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault()
      handleSecurityViolation("VIEW_SOURCE", "Kaynak kodu görüntüleme tespit edildi")
      return false
    }
  })
}

// Güvenlik ihlali tespit edildiğinde
const handleSecurityViolation = (violationType: string, details: string): void => {
  try {
    // Aynı ihlal son 30 saniye içinde zaten kaydedilmişse, tekrar gösterme
    const now = Date.now()
    const lastViolationKey = `last_violation_${violationType}`
    const lastViolationTime = localStorage.getItem(lastViolationKey)

    if (lastViolationTime && now - Number.parseInt(lastViolationTime) < 30000) {
      return // Son 30 saniye içinde aynı ihlal zaten kaydedilmiş, tekrar gösterme
    }

    // Son ihlal zamanını kaydet
    localStorage.setItem(lastViolationKey, now.toString())

    // Konsola uyarı yaz
    console.warn(`⚠️ ROXEN.AIM GÜVENLİK SİSTEMİ: ${violationType} - ${details}`)

    // Log kaydı ekle (eğer log servisi yüklüyse)
    if (typeof window !== "undefined" && (window as any).addLog) {
      ;(window as any).addLog(
        "SECURITY_VIOLATION",
        undefined,
        "Bilinmeyen",
        `Güvenlik ihlali: ${violationType} - ${details}`,
      )
    }

    // Güvenlik ihlali olayını tetikle
    const event = new CustomEvent("securityViolation", {
      detail: { type: violationType, details },
    })
    document.dispatchEvent(event)
  } catch (error) {
    // Hata durumunda sessizce devam et
  }
}

// Güvenlik servisini dışa aktar
export default {
  init: initSecurityService,
}
