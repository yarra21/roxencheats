"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HwidSpooferModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HwidSpooferModal({ isOpen, onClose }: HwidSpooferModalProps) {
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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gray-900/90 w-full max-w-4xl max-h-[90vh] rounded-lg border border-blue-500 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animasyonlu arka plan */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
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

            {/* Header */}
            <div className="relative flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-blue-500">HWID SPOOFER</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="relative overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 80px)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">HWID SPOOFER</h3>
                    <p className="text-gray-300 mb-4">
                      Donanım kimliğinizi (HWID) değiştirerek, oyun banlarını aşmanızı sağlayan gelişmiş çözümümüz.
                      Bilgisayarınızın benzersiz tanımlayıcılarını değiştirerek yeni bir kimlik oluşturur.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-blue-400">Özellikler</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-white">Tam Donanım Kimliği Değiştirme</span>
                          <p className="text-sm text-gray-400">
                            Disk, RAM, CPU, GPU, BIOS ve diğer donanım kimliklerini değiştirir.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-white">MAC Adresi Değiştirme</span>
                          <p className="text-sm text-gray-400">
                            Ağ adaptörünüzün MAC adresini değiştirerek tam gizlilik sağlar.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-white">Kalıcı Çözüm</span>
                          <p className="text-sm text-gray-400">
                            Sistem yeniden başlatıldığında bile değişiklikler kalıcı olur.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-white">Çoklu Oyun Desteği</span>
                          <p className="text-sm text-gray-400">
                            Valorant, Fortnite, Apex Legends, PUBG ve daha fazlası için çalışır.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-blue-400">Desteklenen Sistemler</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <span>Windows 10 Tüm Sürümler</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <span>Windows 11 Tüm Sürümler</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <span>Intel/Amd İşlemciler</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <span>Nvidia/AMD Ekran Kartları</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-800/70 rounded-lg p-6 border border-blue-500/50 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-center text-blue-400">Fiyatlandırma</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                        <span className="text-white">HWID Spoofer Lite</span>
                        <span className="text-xl font-bold text-white">800 ₺</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">HWID Spoofer Pro</span>
                        <span className="text-xl font-bold text-white">1500 ₺</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/70 rounded-lg overflow-hidden mb-6">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="HWID Spoofer Arayüzü"
                      width={500}
                      height={300}
                      className="w-full"
                    />
                  </div>

                  <div className="bg-gray-800/70 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-white">Nasıl Çalışır?</h3>
                    <p className="text-gray-300 mb-4">
                      HWID Spoofer, bilgisayarınızın donanım kimliklerini değiştirerek çalışır. Bu kimlikler, oyun
                      şirketleri tarafından hesabınızı ve cihazınızı tanımlamak için kullanılır.
                    </p>
                    <p className="text-gray-300">
                      Spoofer, bu kimlikleri değiştirerek sistemin tamamen farklı bir bilgisayar olarak algılanmasını
                      sağlar. Böylece önceki banlar geçersiz hale gelir ve yeni bir başlangıç yapabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Link
                  href="https://discord.gg/XECCS2EdWr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-500 hover:to-cyan-500 transition-colors flex items-center"
                >
                  HEMEN SATIN AL <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
