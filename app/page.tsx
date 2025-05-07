"use client"

import { Suspense, useState, useEffect, useRef, useCallback } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Features from "@/components/features"
import Pricing from "@/components/pricing"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import ProductCategories from "@/components/product-categories"
import { useAuth } from "@/contexts/auth-context"
import RegisterModal from "@/components/register-modal"
import AdminLogin from "@/components/admin-login"
import AdminDashboard from "@/components/admin-dashboard"
import LogViewer from "@/components/log-viewer"
import LoginModal from "@/components/login-modal"
import SystemInfoModal from "@/components/system-info-modal"
import { saveSystemInfo } from "@/services/system-info-service"

// Dinamik olarak yükle
const Hero = dynamic(() => import("@/components/hero"), { ssr: false })
const FloatingIcons = dynamic(() => import("@/components/floating-icons"), { ssr: false })
const MatrixRain = dynamic(() => import("@/components/matrix-rain"), { ssr: false })
const GlitchEffect = dynamic(() => import("@/components/glitch-effect"), { ssr: false })
const SecurityProtection = dynamic(() => import("@/components/security-protection"), { ssr: false })
const UserActivityLogger = dynamic(() => import("@/components/user-activity-logger"), { ssr: false })

// Basit güvenlik kontrolü - sayfanın yüklenmesini engellemeyecek
const initBasicSecurity = () => {
  if (typeof window !== "undefined") {
    // İframe kontrolü
    try {
      if (window.self !== window.top) {
        window.top.location = window.self.location
      }
    } catch (e) {
      // Farklı domain'den iframe içinde
    }
  }
}

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

  // login fonksiyonunu ekleyelim
  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const result = await authLogin(username, password)

        if (result.success) {
          // Başarılı giriş
          console.log("Giriş başarılı:", result.user)
        }

        return result
      } catch (error) {
        console.error("Giriş hatası:", error)
        throw error
      }
    },
    [authLogin],
  )

  // Set mounted state when component mounts on client
  useEffect(() => {
    setIsMounted(true)

    // Basit güvenlik kontrollerini başlat
    if (!securityInitializedRef.current) {
      securityInitializedRef.current = true
      initBasicSecurity()
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

  // Kullanıcı bilgilerini kaydet - only on client side
  useEffect(() => {
    if (!isMounted) return

    // Sayfa yüklendiğinde kullanıcı bilgilerini kaydet
    const captureVisit = async () => {
      try {
        const { saveIpInfo } = await import("@/services/ip-service")
        await saveIpInfo(user?.id, user?.username)
      } catch (error) {
        console.error("Ziyaret kaydedilemedi:", error)
      }
    }

    if (user) {
      captureVisit()
    }
  }, [user, isMounted])

  const openRegisterModal = () => {
    setRegisterModalOpen(true)
  }

  const openLoginModal = () => {
    setLoginModalOpen(true)
  }

  const openAdminLogin = () => {
    setAdminLoginOpen(true)
  }

  const openSystemInfo = () => {
    setSystemInfoOpen(true)
  }

  // Admin giriş olayını dinleyen bir useEffect ekleyelim
  useEffect(() => {
    if (!isMounted) return

    const handleAdminLogin = () => {
      setAdminDashboardOpen(true)
    }

    window.addEventListener("adminLoggedIn", handleAdminLogin)

    return () => {
      window.removeEventListener("adminLoggedIn", handleAdminLogin)
    }
  }, [isMounted])

  // openAdminDashboard fonksiyonunu güncelleyelim
  const openAdminDashboard = () => {
    const isAdminAuthenticated = localStorage.getItem("roxen_admin_auth") === "true"

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

  // Kayıt sonrası otomatik giriş için useEffect ekleyelim
  useEffect(() => {
    if (!isMounted) return

    const handleUserRegistered = (event: any) => {
      const { username, password } = event.detail
      // Otomatik giriş yap
      if (username && password) {
        // Giriş işlemini gerçekleştir
        const autoLogin = async () => {
          try {
            await login(username, password)
          } catch (error) {
            console.error("Otomatik giriş başarısız:", error)
          }
        }

        autoLogin()
      }
    }

    window.addEventListener("userRegistered", handleUserRegistered as EventListener)

    return () => {
      window.removeEventListener("userRegistered", handleUserRegistered as EventListener)
    }
  }, [isMounted, login])

  // Yükleme ekranı
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-purple-500 animate-pulse">ROXEN.AIM</h1>
          <p className="text-white">Yükleniyor...</p>
          <div className="mt-4 w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Hacker tarzı arka plan */}
      <Suspense fallback={<div className="h-full w-full bg-black" />}>
        <div className="fixed inset-0 z-0">
          {isMounted && (
            <>
              <MatrixRain />
              <GlitchEffect />
            </>
          )}
        </div>
      </Suspense>

      {/* Kullanıcı Aktivite Logları */}
      {isMounted && <UserActivityLogger />}

      {/* Güvenlik Koruması - Her zaman aktif */}
      {isMounted && !isAdmin() && <SecurityProtection />}

      {/* Content */}
      <div className="relative z-30">
        <Navbar onOpenLogin={openLoginModal} onOpenRegister={openRegisterModal} onOpenAdminLogin={openAdminLogin} />
        <Hero />
        {isMounted && <FloatingIcons />}
        <Features />
        <ProductCategories />
        <Pricing onRegister={openRegisterModal} />
        <FAQ />
        <Footer
          onOpenAdminLogin={openAdminDashboard}
          onOpenLogViewer={openLogViewer}
          onOpenSystemInfo={openSystemInfo}
        />
      </div>

      {/* Modals - only render on client side */}
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
