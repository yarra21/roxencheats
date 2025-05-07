"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Eye, EyeOff, Lock, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { addLog } from "@/services/log-service"
// IP servisini import et
import { saveIpInfo } from "@/services/ip-service"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Kaydedilmiş kullanıcı adını ve şifreyi localStorage'dan al
    const savedUsername = localStorage.getItem("roxen_username")
    const savedRememberMe = localStorage.getItem("roxen_remember_me") === "true"

    if (savedUsername && savedRememberMe) {
      setUsername(savedUsername)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Lütfen tüm alanları doldurun")
      return
    }

    setIsLoading(true)

    // Kullanıcı adı ve şifreyi kaydet (gerçek bir uygulamada bu güvenli değildir)
    if (rememberMe) {
      localStorage.setItem("roxen_username", username)
      localStorage.setItem("roxen_remember_me", "true")
    } else {
      localStorage.removeItem("roxen_username")
      localStorage.removeItem("roxen_remember_me")
    }

    try {
      const result = await login(username, password)

      // handleSubmit fonksiyonunda başarılı giriş kısmını güncelle
      if (result.success) {
        // IP bilgilerini kaydet
        await saveIpInfo(result.user?.id, username)

        // Başarılı giriş logunu kaydet
        await addLog("LOGIN", result.user?.id, username, "Kullanıcı giriş yaptı")
        onClose()
      } else {
        setError(result.message)
        // Başarısız giriş denemesini logla
        await addLog("LOGIN", undefined, username, "Başarısız giriş denemesi")
      }
    } catch (error) {
      setError("Giriş sırasında bir hata oluştu")
      // Hata durumunu logla
      await addLog("LOGIN", undefined, username, "Giriş sırasında hata: " + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gray-900/90 w-full max-w-md rounded-lg border border-pink-500 neon-border overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glitch Effect Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20" />
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-cyan-400"
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
              {/* Modal başlığını güncelleyelim */}
              <h2 className="text-xl font-bold neon-text swing-animation">
                ROXEN<span className="text-cyan-400 neon-text-cyan">.AIM</span>
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                    Kullanıcı Adı
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5"
                      placeholder="Kullanıcı adınızı girin"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Şifre
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 pr-10 p-2.5"
                      placeholder="Şifrenizi girin"
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

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-cyan-500 text-cyan-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">
                    Beni hatırla
                  </label>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                {/* Giriş butonunu güncelleyelim */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="button-hover w-full py-2.5 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium border border-pink-500 neon-border flex items-center justify-center hover-glow"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    "Giriş Yap"
                  )}
                </button>

                <div className="text-center mt-4">
                  {/* Şifremi unuttum linkini güncelleyelim */}
                  <a href="#" className="text-sm text-cyan-400 hover:underline hover-scale">
                    Şifremi unuttum
                  </a>
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="relative p-4 text-center border-t border-gray-800 text-sm text-gray-400">
              Hesabınız yok mu? {/* Discord linkini güncelleyelim */}
              <a
                href="https://discord.gg/XECCS2EdWr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline hover-scale"
              >
                Discord'a katılın
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
