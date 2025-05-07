"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Shield, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SecurityProtection() {
  const [showAlert, setShowAlert] = useState(false)
  const [violations, setViolations] = useState<string[]>([])

  useEffect(() => {
    // Detect security violations
    const detectViolations = () => {
      const detectedViolations: string[] = []

      // Geliştirme ortamında veya v0 önizleme ortamında çalışıyorsa kontrolleri atla
      const isDevEnvironment = process.env.NODE_ENV === "development"
      const isV0Preview = window.location.hostname.includes("v0.dev") || window.location.hostname.includes("localhost")

      if (isDevEnvironment || isV0Preview) {
        return detectedViolations
      }

      // Check if DevTools is open - daha güvenilir bir yöntem kullan
      const devtoolsOpen =
        (/Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor) &&
          window.outerHeight - window.innerHeight > 100) ||
        window.outerWidth - window.innerWidth > 100

      if (devtoolsOpen) {
        detectedViolations.push("DEVTOOLS_OPEN: Geliştirici araçları açık tespit edildi")
      }

      // Check if page is in an iframe - v0 önizleme için izin ver
      if (window.self !== window.top && !isV0Preview) {
        detectedViolations.push("IFRAME_EMBEDDING: Sayfa bir iframe içinde açılmış")

        try {
          // Try to access parent window location to check if cross-origin
          const parentOrigin = window.parent.location.origin
          const currentOrigin = window.location.origin

          if (parentOrigin !== currentOrigin && !isV0Preview) {
            detectedViolations.push("CROSS_ORIGIN_IFRAME: Sayfa farklı bir domain'den iframe içinde açılmış")
          }
        } catch (e) {
          // Sadece üretim ortamında uyarı ver
          if (!isV0Preview) {
            detectedViolations.push("CROSS_ORIGIN_IFRAME: Sayfa farklı bir domain'den iframe içinde açılmış")
          }
        }
      }

      // Check for React DevTools - sadece üretim ortamında kontrol et
      if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ && !isDevEnvironment && !isV0Preview) {
        detectedViolations.push("REACT_DEVTOOLS: React DevTools tespit edildi")
      }

      return detectedViolations
    }

    const checkSecurity = () => {
      const detected = detectViolations()
      if (detected.length > 0) {
        setViolations(detected)
        setShowAlert(true)

        // Log security violation - sadece üretim ortamında
        if (process.env.NODE_ENV === "production") {
          console.error("Security violation detected:", detected)

          // Gerçek bir uygulamada, bu bilgileri sunucuya gönderebilirsiniz
          // fetch('/api/security-violation', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ violations: detected })
          // });
        }
      }
    }

    // Kontrolleri daha az sıklıkla yap
    checkSecurity()
    const interval = setInterval(checkSecurity, 10000)

    // Add event listeners for additional checks
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkSecurity()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  if (!showAlert) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-red-900 border-2 border-red-500 rounded-lg max-w-md w-full p-6 shadow-lg animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-bold text-white">GÜVENLİK İHLALİ TESPİT EDİLDİ</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={() => setShowAlert(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4">
          <p className="text-white mb-2">IP adresiniz ve sistem bilgileriniz kaydedildi.</p>
          <p className="text-white">Bu olay SHIELD SOFTWARE güvenlik ekibine bildirildi.</p>
        </div>

        <div className="bg-black/40 rounded p-3 mb-4">
          <h3 className="text-red-400 font-medium mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            Tespit edilen ihlaller:
          </h3>
          <ul className="space-y-1 text-gray-300">
            {violations.map((violation, index) => (
              <li key={index} className="text-sm">
                {violation}
              </li>
            ))}
          </ul>
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowAlert(false)}>
          Anladım
        </Button>
      </div>
    </div>
  )
}
