"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, ArrowRight } from "lucide-react"
import Image from "next/image"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ isOpen, onClose }: ProductModalProps) {
  const [activeTab, setActiveTab] = useState(0)

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

  const tabs = [
    { name: "Özellikler", id: "features" },
    { name: "Ekran Görüntüleri", id: "screenshots" },
    { name: "Sistem Gereksinimleri", id: "requirements" },
  ]

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
            className="relative bg-gray-900/90 w-full max-w-4xl max-h-[90vh] rounded-lg border border-pink-500 neon-border overflow-hidden z-10"
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
              <h2 className="text-xl font-bold swing-animation">
                <span className="neon-text">VALORANT</span>{" "}
                <span className="text-cyan-400 neon-text-cyan">ROXEN VANGUARD BYPASS</span>
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="relative border-b border-gray-800">
              <div className="flex">
                {/* Tab butonlarını güncelleyelim */}
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-3 text-sm font-medium transition-colors relative hover-scale ${
                      activeTab === index ? "text-white" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {tab.name}
                    {activeTab === index && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="relative overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 120px)" }}>
              {/* Özellikler Tab */}
              {activeTab === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 neon-text">Ana Özellikler</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <span>Vanguard Anti-Cheat Bypass Sistemi</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <span>Gelişmiş Aimbot (Hedef Kilitleme)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <span>ESP (Duvar Arkası Görüş)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <span>No Recoil (Sekme Engelleyici)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <span>Triggerbot (Otomatik Ateş)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-cyan-400 neon-text-cyan">Ek Özellikler</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <span>Radar Hack (Minimap Görünürlük)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <span>Skin Changer (Görünüm Değiştirici)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <span>FPS Boost (Performans Artırıcı)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <span>Özelleştirilebilir Ayarlar</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <span>7/24 Teknik Destek</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Aimbot Özellikleri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Hedef Bölgesi Seçimi</h4>
                        <p className="text-sm text-gray-300">
                          Kafa, gövde veya bacak gibi farklı hedef bölgelerini seçebilirsiniz.
                        </p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Hassasiyet Ayarı</h4>
                        <p className="text-sm text-gray-300">
                          Aimbot hassasiyetini kendi oyun stilinize göre ayarlayabilirsiniz.
                        </p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">FOV Ayarı</h4>
                        <p className="text-sm text-gray-300">
                          Hedefleme alanını (Field of View) isteğinize göre ayarlayabilirsiniz.
                        </p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Tuş Ataması</h4>
                        <p className="text-sm text-gray-300">
                          Aimbot'u aktifleştirmek için istediğiniz tuşu atayabilirsiniz.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">ESP Özellikleri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Oyuncu Kutuları</h4>
                        <p className="text-sm text-gray-300">
                          Düşmanların etrafında görünür kutular ile konumlarını takip edin.
                        </p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">İskelet Görünümü</h4>
                        <p className="text-sm text-gray-300">
                          Düşmanların iskelet yapısını duvarların arkasından bile görebilirsiniz.
                        </p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Sağlık Göstergesi</h4>
                        <p className="text-sm text-gray-300">
                          Düşmanların kalan sağlık durumunu gerçek zamanlı olarak görün.
                        </p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Mesafe Göstergesi</h4>
                        <p className="text-sm text-gray-300">
                          Düşmanların size olan uzaklığını metre cinsinden görüntüleyin.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    {/* Satın al butonlarını güncelleyelim */}
                    <a
                      href="https://discord.gg/XECCS2EdWr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-hover px-8 py-3 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium border border-pink-500 neon-border flex items-center hover-glow"
                    >
                      HEMEN SATIN AL <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {/* Ekran Görüntüleri Tab */}
              {activeTab === 1 && (
                <div className="space-y-6">
                  <p className="text-gray-300 mb-4">
                    ROXEN.AIM Valorant Vanguard Bypass ürünümüzün ekran görüntüleri. Gerçek oyun içi performansı
                    görebilirsiniz.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="relative overflow-hidden rounded-lg border border-gray-700 group">
                        <div className="aspect-video bg-gray-800 flex items-center justify-center">
                          <Image
                            src={`/placeholder.svg?height=300&width=500`}
                            alt={`Ekran görüntüsü ${i + 1}`}
                            width={500}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <p className="text-white text-sm">Ekran görüntüsü {i + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-center">
                    {/* Satın al butonlarını güncelleyelim */}
                    <a
                      href="https://discord.gg/XECCS2EdWr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-hover px-8 py-3 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium border border-pink-500 neon-border flex items-center hover-glow"
                    >
                      DAHA FAZLA GÖRÜNTÜ İÇİN DISCORD <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {/* Sistem Gereksinimleri Tab */}
              {activeTab === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 neon-text">Minimum Gereksinimler</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">İşletim Sistemi:</span>
                            <p className="text-sm text-gray-300">Windows 10 (64-bit)</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">İşlemci:</span>
                            <p className="text-sm text-gray-300">Intel Core i3-4150 / AMD Ryzen 3 1200</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">RAM:</span>
                            <p className="text-sm text-gray-300">4 GB</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Ekran Kartı:</span>
                            <p className="text-sm text-gray-300">NVIDIA GeForce GT 730 / AMD Radeon R7 240</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Depolama:</span>
                            <p className="text-sm text-gray-300">2 GB boş alan</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-cyan-400 neon-text-cyan">
                        Önerilen Gereksinimler
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">İşletim Sistemi:</span>
                            <p className="text-sm text-gray-300">Windows 10/11 (64-bit)</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">İşlemci:</span>
                            <p className="text-sm text-gray-300">Intel Core i5-9400F / AMD Ryzen 5 2600</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">RAM:</span>
                            <p className="text-sm text-gray-300">8 GB</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Ekran Kartı:</span>
                            <p className="text-sm text-gray-300">NVIDIA GeForce GTX 1050 Ti / AMD Radeon RX 570</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Depolama:</span>
                            <p className="text-sm text-gray-300">5 GB boş alan (SSD önerilir)</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Not:</h3>
                    <p className="text-sm text-gray-300">
                      ROXEN.AIM, Valorant'ın çalıştığı herhangi bir sistemde çalışacak şekilde optimize edilmiştir.
                      Ancak, en iyi performans için önerilen gereksinimleri karşılayan bir sistem kullanmanızı tavsiye
                      ederiz. Ayrıca, Windows Defender veya diğer antivirüs programlarının geçici olarak devre dışı
                      bırakılması gerekebilir.
                    </p>
                  </div>

                  <div className="mt-8 flex justify-center">
                    {/* Satın al butonlarını güncelleyelim */}
                    <a
                      href="https://discord.gg/XECCS2EdWr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-hover px-8 py-3 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium border border-pink-500 neon-border flex items-center hover-glow"
                    >
                      HEMEN SATIN AL <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
