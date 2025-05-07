"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { saveSystemInfo } from "@/services/system-info-service"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import StatsSection from "@/components/stats-section"
import ProductShowcase from "@/components/product-showcase"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"
import RegisterModal from "@/components/register-modal"
import AdminLogin from "@/components/admin-login"
import AdminDashboard from "@/components/admin-dashboard"
import LogViewer from "@/components/log-viewer"
import SystemInfoModal from "@/components/system-info-modal"
import SecurityProtection from "@/components/security-protection"
import UserActivityLogger from "@/components/user-activity-logger"
import BackgroundEffect from "@/components/background-effect"

export default function Home() {
  const { user, isAdmin, login: authLogin } = useAuth()
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [adminLoginOpen, setAdminLoginOpen] = useState(false)
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false)
  const [logViewerOpen, setLogViewerOpen] = useState(false)
  const [systemInfoOpen, setSystemInfoOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const securityInitializedRef = useRef(false)
  const systemInfoInitializedRef = useRef(false)

  // login fonksiyonu
  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const result = await authLogin(username, password)
        return result
      } catch (error) {
        console.error("Giriş hatası:", error)
        throw error
      }
    },
    [authLogin],
  )

  // Component mount olduğunda
  useEffect(() => {
    setIsMounted(true)

    // Güvenlik kontrollerini başlat
    if (!securityInitializedRef.current) {
      securityInitializedRef.current = true
      // Güvenlik kontrolleri
      if (typeof window !== "undefined") {
        try {
          if (window.self !== window.top) {
            window.top.location = window.self.location
          }
        } catch (e) {
          // iframe içinde farklı domain
        }
      }
    }

    // Sistem bilgilerini topla
    if (!systemInfoInitializedRef.current) {
      systemInfoInitializedRef.current = true
      saveSystemInfo()
    }

    // Sayfa yükleme durumunu güncelle
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Kullanıcı bilgilerini kaydet
  useEffect(() => {
    if (!isMounted || !user) return

    const captureVisit = async () => {
      try {
        const { saveIpInfo } = await import("@/services/ip-service")
        await saveIpInfo(user.id, user.username)
      } catch (error) {
        console.error("Ziyaret kaydedilemedi:", error)
      }
    }

    captureVisit()
  }, [user, isMounted])

  // Admin giriş olayını dinle
  useEffect(() => {
    if (!isMounted) return

    const handleAdminLogin = () => {
      setAdminDashboardOpen(true)
    }

    window.addEventListener("adminLoggedIn", handleAdminLogin)
    return () => window.removeEventListener("adminLoggedIn", handleAdminLogin)
  }, [isMounted])

  // Kayıt sonrası otomatik giriş
  useEffect(() => {
    if (!isMounted) return

    const handleUserRegistered = (event: any) => {
      const { username, password } = event.detail
      if (username && password) {
        login(username, password).catch((error) => {
          console.error("Otomatik giriş başarısız:", error)
        })
      }
    }

    window.addEventListener("userRegistered", handleUserRegistered as EventListener)
    return () => window.removeEventListener("userRegistered", handleUserRegistered as EventListener)
  }, [isMounted, login])

  const openRegisterModal = () => setRegisterModalOpen(true)
  const openLoginModal = () => setLoginModalOpen(true)
  const openAdminLogin = () => setAdminLoginOpen(true)
  const openSystemInfo = () => setSystemInfoOpen(true)

  const openAdminDashboard = () => {
    const isAdminAuthenticated = localStorage.getItem("shield_admin_auth") === "true"
    if (isAdminAuthenticated || isAdmin()) {
      setAdminDashboardOpen(true)
    } else {
      setAdminLoginOpen(true)
    }
  }

  const openLogViewer = () => {
    if (isAdmin()) {
      setLogViewerOpen(true)
    } else {
      setAdminLoginOpen(true)
    }
  }

  // Yükleme ekranı
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 to-black flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            <span className="text-purple-400">SHIELD</span> SOFTWARE
          </h1>
          <p className="text-gray-300 mb-6">Güvenlik Çözümleri</p>
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 to-black text-white">
      {/* Arka plan efekti */}
      <BackgroundEffect />

      {/* Kullanıcı Aktivite Logları */}
      {isMounted && <UserActivityLogger />}

      {/* Güvenlik Koruması */}
      {isMounted && !isAdmin() && <SecurityProtection />}

      {/* İçerik */}
      <div className="relative z-10">
        <Navbar onOpenLogin={openLoginModal} onOpenRegister={openRegisterModal} onOpenAdminLogin={openAdminLogin} />
        <Hero onRegister={openRegisterModal} />
        <StatsSection />
        <Features />
        <ProductShowcase />
        <Testimonials />
        <CTASection onRegister={openRegisterModal} />
        <FAQ />
        <Footer
          onOpenAdminLogin={openAdminDashboard}
          onOpenLogViewer={openLogViewer}
          onOpenSystemInfo={openSystemInfo}
        />
      </div>

      {/* Modaller */}
      {isMounted && (
        <>
          <RegisterModal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)} />
          <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
          <AdminLogin isOpen={adminLoginOpen} onClose={() => setAdminLoginOpen(false)} />
          <AdminDashboard isOpen={adminDashboardOpen} onClose={() => setAdminDashboardOpen(false)} />
          <LogViewer isOpen={logViewerOpen} onClose={() => setLogViewerOpen(false)} />
          <SystemInfoModal isOpen={systemInfoOpen} onClose={() => setSystemInfoOpen(false)} />
        </>
      )}
    </main>
  )
}
