"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Eye, EyeOff, Lock, User, Mail, Check, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { addLog } from "@/services/log-service"
// IP servisini import et
import { saveIpInfo } from "@/services/ip-service"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const { register } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // handleSubmit fonksiyonunu güncelleyelim
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validasyon
    if (!username || !email || !password || !confirmPassword) {
      setError("Lütfen tüm alanları doldurun")
      return
    }

    if (!validateEmail(email)) {
      setError("Geçerli bir e-posta adresi girin")
      return
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor")
      return
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır")
      return
    }

    setIsLoading(true)

    try {
      const result = await register(username, email, password)

      // handleSubmit fonksiyonunda başarılı kayıt kısmını güncelle
      if (result.success) {
        // IP bilgilerini kaydet
        await saveIpInfo(result.user?.id, username)

        // Başarılı kayıt logunu ekle
        await addLog("REGISTER", result.user?.id, username, `Yeni kullanıcı kaydı: ${email}`)

        setSuccess(true)

        // Başarılı kayıt sonrası formu sıfırla
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

        // 2 saniye sonra modalı kapat ve otomatik giriş yap
        setTimeout(() => {
          onClose()
          // Otomatik giriş için olay tetikle
          window.dispatchEvent(
            new CustomEvent("userRegistered", {
              detail: { username, password },
            }),
          )
        }, 2000)
      } else {
        setError(result.message)
        // Başarısız kayıt denemesini logla
        await addLog("REGISTER", undefined, username, `Başarısız kayıt denemesi: ${result.message}`)
      }
    } catch (error) {
      setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.")
      // Hata durumunu logla
      await addLog("REGISTER", undefined, username, `Kayıt sırasında hata: ${(error as Error).message}`)
    } finally {
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gray-900/90 w-full max-w-md rounded-lg border border-cyan-500 neon-border-cyan overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glitch Effect Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-purple-600/20" />
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-pink-400"
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
              <h2 className="text-xl font-bold text-cyan-400 neon-text-cyan swing-animation">Hesap Oluştur</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            {success ? (
              <div className="relative p-6 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Kayıt Başarılı!</h3>
                <p className="text-gray-300 text-center mb-4">
                  Hesabınız başarıyla oluşturuldu. Discord sunucumuza katılarak ürünlerimize erişebilirsiniz.
                </p>
                <a
                  href="https://discord.gg/XECCS2EdWr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-hover px-6 py-2 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium border border-cyan-500 neon-border-cyan hover-glow-cyan"
                  onClick={() => addLog("DISCORD_VISIT", undefined, username, "Kayıt sonrası Discord ziyareti")}
                >
                  Discord'a Katıl
                </a>
              </div>
            ) : (
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5"
                        placeholder="E-posta adresinizi girin"
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

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                      Şifreyi Onayla
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 pr-10 p-2.5"
                        placeholder="Şifrenizi tekrar girin"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && <div className="text-red-500 text-sm">{error}</div>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="button-hover w-full py-2.5 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium border border-cyan-500 neon-border-cyan flex items-center justify-center hover-glow-cyan"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                        Kaydediliyor...
                      </div>
                    ) : (
                      "Kayıt Ol"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-400">
                      Kayıt olarak,{" "}
                      <a href="#" className="text-cyan-400 hover:underline">
                        Kullanım Şartları
                      </a>{" "}
                      ve{" "}
                      <a href="#" className="text-cyan-400 hover:underline">
                        Gizlilik Politikası
                      </a>
                      'nı kabul etmiş olursunuz.
                    </p>
                  </div>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="relative p-4 text-center border-t border-gray-800 text-sm text-gray-400">
              Zaten bir hesabınız var mı?{" "}
              <button onClick={onClose} className="text-cyan-400 hover:underline hover-scale">
                Giriş Yap
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
