"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Eye, EyeOff, Lock, User, Shield, AlertTriangle, Globe, Key } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { addLog } from "@/services/log-service"
import { authenticateAdmin } from "@/services/admin-service"
// IP servisini import et
import { getIpInfo, saveIpInfo } from "@/services/ip-service"

interface AdminLoginProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminLogin({ isOpen, onClose }: AdminLoginProps) {
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [adminKey, setAdminKey] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [ipAddress, setIpAddress] = useState("")

  // IP adresini al
  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json")
        const data = await response.json()
        setIpAddress(data.ip)
      } catch (error) {
        console.error("IP adresi alınamadı:", error)
        setIpAddress("Bilinmiyor")
      }
    }

    if (isOpen) {
      getIpAddress()
    }
  }, [isOpen])

  // ESC tuşuna basıldığında modalı kapat
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Modal açıkken body scroll'u engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // handleSubmit fonksiyonunu güncelleyelim
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password || !adminKey) {
      setError("Lütfen tüm alanları doldurun")
      return
    }

    setIsLoading(true)

    try {
      // Admin kimlik doğrulama
      const admin = await authenticateAdmin(username, password, adminKey)

      if (admin) {
        // IP bilgilerini al ve kaydet
        const ipInfo = await getIpInfo()
        localStorage.setItem("roxen_admin_ip", ipInfo.ip)
        localStorage.setItem("roxen_admin_ip_info", JSON.stringify(ipInfo))
        await saveIpInfo("admin", username)

        // Admin girişi logunu kaydet
        await addLog("ADMIN_LOGIN", "admin", username, `Admin girişi yapıldı. IP: ${ipInfo.ip}`)

        // Admin bilgilerini kaydet
        localStorage.setItem("roxen_admin_user", username)
        localStorage.setItem("roxen_admin_auth", "true")
        localStorage.setItem("roxen_admin_login_time", new Date().toISOString())
        localStorage.setItem("roxen_admin_key", adminKey)

        // Admin girişi başarılı
        onClose()

        // Admin panelini otomatik olarak aç
        window.dispatchEvent(new CustomEvent("adminLoggedIn"))
      } else {
        setError("Geçersiz kullanıcı adı, şifre veya key!")
        setIsLoading(false)
      }
    } catch (error) {
      setError("Giriş sırasında bir hata oluştu")
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gray-900/90 w-full max-w-md rounded-lg border border-yellow-500 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glitch Effect Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-amber-600/20" />
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-yellow-400"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: 0,
                    right: 0,
                    opacity: 0.3,
                  }}
                />
              ))}
            </div>

            {/* Header */}
            <div className="relative flex justify-between items-center p-4 border-b border-gray-800">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-yellow-500 mr-2" />
                <h2 className="text-xl font-bold text-yellow-500">Yönetici Girişi</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative p-6">
              <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">
                  Bu alan sadece yetkili personel içindir. Yetkisiz giriş teşebbüsleri kaydedilmektedir.
                </p>
              </div>

              <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-md flex items-center">
                <Globe className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">IP Adresiniz:</p>
                  <p className="text-sm font-mono text-blue-400">{ipAddress || "Yükleniyor..."}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="admin-username" className="block text-sm font-medium text-gray-300">
                    Kullanıcı Adı
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="admin-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5"
                      placeholder="Admin kullanıcı adı"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300">
                    Şifre
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="admin-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 pr-10 p-2.5"
                      placeholder="Admin şifresi"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="admin-key" className="block text-sm font-medium text-gray-300">
                    Güvenlik Anahtarı
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Key className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showKey ? "text" : "password"}
                      id="CUSTOMER-19M3"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 pr-10 p-2.5"
                      placeholder="12 karak1terli güvenlik anahtarı"
                      maxLength={12}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="button-hover w-full py-2.5 rounded-md bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-medium border border-yellow-500 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Giriş Yapılıyor...
                    </div>
                  ) : (
                    "Yönetici Girişi"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
