"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export default function SecurityInitializer({ children }: { children: React.ReactNode }) {
  const securityInitializedRef = useRef(false)

  useEffect(() => {
    // Güvenlik servisini başlat - sadece bir kez
    if (securityInitializedRef.current) return
    securityInitializedRef.current = true

    const initSecurity = async () => {
      try {
        const { initSecurityService } = await import("@/services/security-service")
        initSecurityService()
      } catch (error) {
        console.error("Güvenlik servisi başlatılamadı:", error)
      }
    }

    // Sayfa yüklendikten sonra güvenlik servisini başlat
    if (typeof window !== "undefined") {
      // Sayfa tamamen yüklendikten sonra başlat
      if (document.readyState === "complete") {
        initSecurity()
      } else {
        const handleLoad = () => {
          initSecurity()
        }
        window.addEventListener("load", handleLoad)
        return () => window.removeEventListener("load", handleLoad)
      }
    }
  }, [])

  return <>{children}</>
}
