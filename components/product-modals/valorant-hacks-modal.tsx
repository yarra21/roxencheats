"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, ArrowRight, Shield, Zap, Target } from "lucide-react"
import Link from "next/link"

interface ValorantHacksModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ValorantHacksModal({ isOpen, onClose }: ValorantHacksModalProps) {
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
            className="relative bg-gray-900/90 w-full max-w-4xl max-h-[90vh] rounded-lg border border-red-500 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
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

            {/* Header */}
            <div className="relative flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-red-500">ROXEN ONECLİCK</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="relative overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 80px)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Değerli Roxen Ekibi, ROXEN ONECLİCK İLE TANIŞIN
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Oyun dünyasında karşılaşılan en sinir bozucu durumlardan biri de hiç şüphesiz ki haksız yere
                      alınan banlardır. Özellikle Valorant oyuncularının sıkça karşılaştığı van 152 hatası, oyun
                      keyfinizi kabusa çevirebilir. Ancak artık endişelenmenize gerek yok!
                    </p>
                    <p className="text-gray-300 mb-4 font-semibold">
                      Roxen Ekibi olarak, siz değerli oyuncuların bu sorununa kalıcı ve pratik bir çözüm sunmaktan gurur
                      duyuyoruz: Roxen Oneclick!
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-red-400">Roxen Oneclick Nedir?</h3>
                    <p className="text-gray-300 mb-4">
                      Roxen Oneclick, BIOS güncellemesi yapılmış tüm cihazlardaki ban sorununu tek bir tuşla ortadan
                      kaldıran devrim niteliğinde bir üründür. Karmaşık işlemlerle uğraşmanıza, saatlerce çözüm
                      aramanıza gerek kalmaz. Sadece tek bir tıklama ile banınız açılır ve oyunlarınıza kaldığınız
                      yerden devam edebilirsiniz.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-red-400">Neden Roxen Oneclick?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-white">Tek Tuşla Kolaylık:</span> Kullanımı son derece
                          basittir. Tek bir tıklama ile banınızı açabilirsiniz.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-white">Geniş Uyumluluk:</span> BIOS güncellemesi yapılmış
                          tüm cihazlarda sorunsuz çalışır ve van 152 hatasını kesin olarak çözer.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-white">Uygun Fiyat:</span> Piyasada bulunan benzer çözümlere
                          kıyasla oldukça uygun fiyatlıdır. Oyuncuların bütçesini düşünerek fiyatlandırma yapılmıştır.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-white">7/24 Teknik Destek:</span> Kendi ürünümüz olduğu
                          için, herhangi bir sorun yaşamanız durumunda yetkili ekibimiz 7 gün 24 saat boyunca size
                          destek olmaya hazırdır. Müşteri memnuniyeti bizim için her zaman önceliklidir.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-800/70 rounded-lg p-6 border border-red-500/50 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-center text-red-400">Fiyatlandırma</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 mr-2 text-red-400" />
                          <span className="text-white">1 Seferlik</span>
                        </div>
                        <div>
                          <span className="text-xl font-bold text-white">750 ₺</span>
                          <span className="text-gray-400 text-sm ml-1">/ 20 Dolar</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                        <div className="flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                          <span className="text-white">3 Seferlik</span>
                        </div>
                        <div>
                          <span className="text-xl font-bold text-white">1800 ₺</span>
                          <span className="text-gray-400 text-sm ml-1">/ 50 Dolar</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-green-400" />
                          <span className="text-white">50 Sefer</span>
                        </div>
                        <div>
                          <span className="text-xl font-bold text-white">5.600 ₺</span>
                          <span className="text-gray-400 text-sm ml-1">/ 150 Dolar</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/70 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold mb-4 text-white">Nasıl Çalışır?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-gray-300">Ürünü satın alın ve Discord sunucumuza katılın.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-gray-300">Roxen Oneclick uygulamasını indirin ve kurun.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-gray-300">Uygulamayı çalıştırın ve "Bypass" butonuna tıklayın.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div>
                          <p className="text-gray-300">
                            İşlem tamamlandıktan sonra Valorant'ı açın ve oynamaya başlayın!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Link
                  href="https://discord.gg/XECCS2EdWr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-md bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium hover:from-red-500 hover:to-orange-500 transition-colors flex items-center"
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
