"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { addLog } from "@/services/log-service"

export default function SecurityProtection() {
  const [showWarning, setShowWarning] = useState(false)
  const [warningCount, setWarningCount] = useState(0)
  const [blockedUser, setBlockedUser] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const devToolsTimeout = useRef<NodeJS.Timeout | null>(null)
  const antiDebugTimeout = useRef<NodeJS.Timeout | null>(null)
  const securityCheckInterval = useRef<NodeJS.Timeout | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [securityViolations, setSecurityViolations] = useState<string[]>([])
  const securityInitializedRef = useRef(false)

  // Component mount durumunu takip et
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Kullanıcı bilgilerini kaydet - sadece bir kez çalışacak
  useEffect(() => {
    if (!isMounted) return

    const captureUserInfo = async () => {
      try {
        const { getIpInfo, saveIpInfo } = await import("@/services/ip-service")
        const ipInfo = await getIpInfo()
        setUserInfo(ipInfo)

        // Kullanıcı bilgilerini kaydet
        await saveIpInfo(undefined, "Ziyaretçi")

        // Log kaydı ekle
        addLog(
          "VIEW_PRODUCT",
          undefined,
          "Ziyaretçi",
          `Yeni ziyaretçi: ${ipInfo.ip} - ${ipInfo.browser} - ${ipInfo.os}`,
        )
      } catch (error) {
        console.error("Kullanıcı bilgileri alınamadı:", error)
      }
    }

    captureUserInfo()
  }, [isMounted])

  // Güvenlik ihlali tespit edildiğinde - useCallback ile memoize edildi
  const detectSecurityViolation = useCallback(
    (violationType: string, details = "") => {
      // Eğer aynı ihlal son 10 saniye içinde zaten kaydedilmişse, tekrar gösterme
      const now = Date.now()
      const lastViolationTime = localStorage.getItem(`last_violation_${violationType}`)

      if (lastViolationTime && now - Number.parseInt(lastViolationTime) < 10000) {
        return // Son 10 saniye içinde aynı ihlal zaten kaydedilmiş, tekrar gösterme
      }

      // Son ihlal zamanını kaydet
      localStorage.setItem(`last_violation_${violationType}`, now.toString())

      if (warningCount > 3) {
        setBlockedUser(true)
        return
      }

      // Yeni ihlali ekle
      setSecurityViolations((prev) => {
        // Aynı ihlal zaten varsa ekleme
        if (prev.some((v) => v.includes(violationType))) return prev
        return [...prev, `${violationType}: ${details}`]
      })

      // Log kaydı ekle
      addLog("VIEW_PRODUCT", undefined, "Bilinmeyen", `Güvenlik ihlali: ${violationType} - ${details}`)

      // Uyarı sayacını artır
      setWarningCount((prev) => prev + 1)

      // Uyarıyı göster
      setShowWarning(true)
    },
    [warningCount],
  )

  // Ana güvenlik koruma sistemi - sadece bir kez başlatılacak
  useEffect(() => {
    if (!isMounted || securityInitializedRef.current) return
    if (typeof window === "undefined") return

    // Güvenlik sistemini başlat
    securityInitializedRef.current = true

    // Orijinal konsol fonksiyonlarını kaydet
    const originalConsoleLog = console.log
    const originalConsoleError = console.error
    const originalConsoleWarn = console.warn
    const originalConsoleInfo = console.info
    const originalConsoleDebug = console.debug

    // Konsol fonksiyonlarını geçersiz kıl
    const overrideConsole = () => {
      console.log =
        console.error =
        console.warn =
        console.info =
        console.debug =
          (...args) => {
            // Sistem mesajlarını engelleme
            if (
              args[0] &&
              typeof args[0] === "string" &&
              (args[0].includes("React DevTools") ||
                args[0].includes("Warning:") ||
                args[0].includes("Error:") ||
                args[0].includes("ROXEN.AIM"))
            ) {
              return originalConsoleWarn.apply(console, args)
            }

            originalConsoleWarn("⚠️ ROXEN.AIM GÜVENLİK SİSTEMİ: Konsol erişimi tespit edildi ve kaydedildi!")
            detectSecurityViolation("CONSOLE_ACCESS", args.join(", "))
            return undefined
          }
    }

    // Konsol fonksiyonlarını geçersiz kıl
    overrideConsole()

    // Periyodik olarak konsol fonksiyonlarını kontrol et ve yeniden geçersiz kıl
    const consoleCheckInterval = setInterval(() => {
      if (console.log !== originalConsoleLog) {
        overrideConsole()
      }
    }, 1000)

    // Sağ tıklama engelleme
    const handleContextMenu = (e: MouseEvent) => {
      // Form elementlerinde sağ tıklamaya izin ver
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return true
      }

      e.preventDefault()
      detectSecurityViolation("RIGHT_CLICK", "Sağ tıklama tespit edildi")
      return false
    }

    // Klavye kısayollarını engelleme
    const handleKeyDown = (e: KeyboardEvent) => {
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
        detectSecurityViolation("DEVTOOLS_SHORTCUT", "F12 tuşu tespit edildi")
        return false
      }

      // Ctrl+Shift+I veya Ctrl+Shift+J veya Ctrl+Shift+C (Geliştirici araçları)
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault()
        detectSecurityViolation("DEVTOOLS_SHORTCUT", "Geliştirici araçları kısayolu tespit edildi")
        return false
      }

      // Ctrl+U (Kaynak kodu görüntüleme)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault()
        detectSecurityViolation("VIEW_SOURCE", "Kaynak kodu görüntüleme tespit edildi")
        return false
      }

      // Ctrl+S (Kaydetme)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault()
        detectSecurityViolation("SAVE_PAGE", "Sayfa kaydetme tespit edildi")
        return false
      }
    }

    // Geliştirici araçlarını tespit etme
    const detectDevTools = () => {
      if (typeof window === "undefined") return

      try {
        // Pencere boyutu farkı ile tespit
        const widthThreshold = window.outerWidth - window.innerWidth > 160
        const heightThreshold = window.outerHeight - window.innerHeight > 160

        // Firebug tespiti
        const isFirebugEnabled = !!(window as any).console.firebug

        // Chrome DevTools tespiti
        const isDevToolsOpen = widthThreshold || heightThreshold || isFirebugEnabled

        // Geliştirici araçları açıksa
        if (isDevToolsOpen) {
          detectSecurityViolation("DEVTOOLS_OPEN", "Geliştirici araçları açık tespit edildi")
        }
      } catch (error) {
        // Hata durumunda sessizce devam et
      }
    }

    // Anti-debugging teknikleri
    const antiDebugging = () => {
      try {
        const startTime = new Date().getTime()
        debugger
        const endTime = new Date().getTime()

        // Debugger'da durma süresi uzunsa
        if (endTime - startTime > 100) {
          detectSecurityViolation("DEBUGGER", "Debugger tespit edildi")
        }
      } catch (error) {
        // Hata durumunda sessizce devam et
      }
    }

    // İframe içinde olup olmadığını kontrol et
    const checkIframe = () => {
      try {
        // İframe içinde mi?
        if (window.self !== window.top) {
          detectSecurityViolation("IFRAME_EMBEDDING", "Sayfa bir iframe içinde açılmış")
          // İframe içinde açılmayı engelle
          window.top.location = window.self.location
        }
      } catch (e) {
        // Erişim hatası varsa, muhtemelen farklı bir domain'den iframe içinde
        detectSecurityViolation("CROSS_ORIGIN_IFRAME", "Sayfa farklı bir domain'den iframe içinde açılmış")
      }
    }

    // Tarayıcı eklentilerini kontrol et
    const checkExtensions = () => {
      try {
        // React DevTools
        if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
          detectSecurityViolation("REACT_DEVTOOLS", "React DevTools tespit edildi")
        }

        // Redux DevTools
        if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
          detectSecurityViolation("REDUX_DEVTOOLS", "Redux DevTools tespit edildi")
        }
      } catch (error) {
        // Hata durumunda sessizce devam et
      }
    }

    // Tüm güvenlik kontrollerini çalıştır
    const runSecurityChecks = () => {
      try {
        detectDevTools()
        antiDebugging()
        checkIframe()
        checkExtensions()
      } catch (error) {
        // Hata durumunda sessizce devam et
      }
    }

    // Olay dinleyicilerini ekle
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)

    // Periyodik güvenlik kontrolleri
    devToolsTimeout.current = setInterval(detectDevTools, 5000)
    antiDebugTimeout.current = setInterval(antiDebugging, 8000)
    securityCheckInterval.current = setInterval(runSecurityChecks, 10000)

    // İlk güvenlik kontrolünü hemen çalıştır
    runSecurityChecks()

    // Temizleme fonksiyonu
    return () => {
      // Konsol fonksiyonlarını geri yükle
      console.log = originalConsoleLog
      console.error = originalConsoleError
      console.warn = originalConsoleWarn
      console.info = originalConsoleInfo
      console.debug = originalConsoleDebug

      // Olay dinleyicilerini kaldır
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)

      // Interval'ları temizle
      if (devToolsTimeout.current) clearInterval(devToolsTimeout.current)
      if (antiDebugTimeout.current) clearInterval(antiDebugTimeout.current)
      if (securityCheckInterval.current) clearInterval(securityCheckInterval.current)
      clearInterval(consoleCheckInterval)

      // Güvenlik sistemini sıfırla
      securityInitializedRef.current = false
    }
  }, [isMounted, detectSecurityViolation])

  // Kullanıcı bloklandığında
  useEffect(() => {
    if (!isMounted || !blockedUser) return

    // Kullanıcıyı blokla ve bilgilerini kaydet
    addLog("VIEW_PRODUCT", undefined, "Bilinmeyen", "Kullanıcı güvenlik ihlali nedeniyle bloklandı")

    // Kullanıcıyı blok sayfasına yönlendir veya sayfayı kilitle
    if (typeof document !== "undefined") {
      document.body.innerHTML = `
        <div style="position: fixed; inset: 0; background: black; color: red; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 99999; font-family: monospace;">
          <h1 style="font-size: 3rem; margin-bottom: 1rem;">GÜVENLİK İHLALİ TESPİT EDİLDİ</h1>
          <p style="font-size: 1.5rem; margin-bottom: 2rem;">IP adresiniz ve sistem bilgileriniz kaydedildi.</p>
          <p style="font-size: 1.2rem;">Bu olay ROXEN.AIM güvenlik ekibine bildirildi.</p>
          <div style="margin-top: 2rem; padding: 1rem; background: rgba(255,0,0,0.1); border: 1px solid red; max-width: 80%; overflow-y: auto; max-height: 200px;">
            <p style="font-size: 1rem; color: #ff6666;">Tespit edilen ihlaller:</p>
            <ul style="text-align: left; color: #ff9999; font-size: 0.9rem;">
              ${securityViolations.map((v) => `<li>${v}</li>`).join("")}
            </ul>
          </div>
        </div>
      `
    }
  }, [blockedUser, isMounted, securityViolations])

  // Güvenli moda dönme fonksiyonu
  const returnToSafeMode = () => {
    setShowWarning(false)
    // Uyarı kapatıldığında sayacı sıfırla
    setWarningCount(0)
    // İhlal listesini temizle
    setSecurityViolations([])
  }

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-lg"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="max-w-md p-8 bg-gray-900 border-2 border-red-500 rounded-lg text-center relative overflow-hidden"
          >
            {/* Animasyonlu arka plan */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: 0,
                    right: 0,
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                    opacity: [0.1, 0.5, 0.1],
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <h2 className="text-3xl font-bold text-red-500 mb-4 cyber-text">⚠️ GÜVENLİK İHLALİ TESPİT EDİLDİ ⚠️</h2>
              </motion.div>

              <p className="text-white mb-6">
                Bu sitede gelişmiş güvenlik sistemleri aktiftir. Güvenlik ihlali tespit edildi ve IP adresiniz, tarayıcı
                bilgileriniz ve sistem bilgileriniz kaydedildi.
              </p>

              {userInfo && (
                <div className="mb-6 p-3 bg-black/50 rounded-md text-left text-sm">
                  <p className="text-red-400 mb-2">Kaydedilen Bilgiler:</p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">IP:</span> {userInfo.ip}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Tarayıcı:</span> {userInfo.browser}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">İşletim Sistemi:</span> {userInfo.os}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Cihaz:</span> {userInfo.device}
                  </p>
                </div>
              )}

              {securityViolations.length > 0 && (
                <div className="mb-6 p-3 bg-red-900/20 border border-red-900/30 rounded-md text-left text-sm max-h-32 overflow-y-auto">
                  <p className="text-red-400 mb-2">Tespit Edilen İhlaller:</p>
                  <ul className="list-disc pl-4 text-red-300 space-y-1">
                    {securityViolations.map((violation, index) => (
                      <li key={index}>{violation}</li>
                    ))}
                  </ul>
                </div>
              )}

              <motion.button
                onClick={returnToSafeMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-bold"
              >
                ANLADIM
              </motion.button>

              <p className="mt-4 text-gray-400 text-sm">
                Uyarı: {warningCount}/4 - Limit aşılırsa hesabınız bloklanacaktır.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
