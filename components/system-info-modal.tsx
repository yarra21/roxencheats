"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Check, Cpu, Monitor, Globe, Wifi, Battery } from "lucide-react"
import { getSavedSystemInfo, type SystemInfo, saveSystemInfo } from "@/services/system-info-service"

interface SystemInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SystemInfoModal({ isOpen, onClose }: SystemInfoModalProps) {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("system")

  useEffect(() => {
    if (isOpen) {
      const fetchSystemInfo = async () => {
        // Önce kaydedilmiş bilgileri kontrol et
        let info = getSavedSystemInfo()

        // Eğer yoksa yeniden topla
        if (!info) {
          await saveSystemInfo()
          info = getSavedSystemInfo()
        }

        setSystemInfo(info)
      }

      fetchSystemInfo()
    }
  }, [isOpen])

  const copyToClipboard = () => {
    if (!systemInfo) return

    const text = Object.entries(systemInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")

    navigator.clipboard.writeText(text)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const refreshSystemInfo = async () => {
    await saveSystemInfo()
    setSystemInfo(getSavedSystemInfo())
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          className="relative bg-gray-900 w-full max-w-2xl rounded-lg border border-purple-500/30 overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Sistem Bilgileri</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-1">
            <div className="flex border-b border-gray-800">
              <button
                onClick={() => setActiveTab("system")}
                className={`px-4 py-2 ${
                  activeTab === "system"
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Cpu className="w-4 h-4 inline mr-2" />
                Sistem
              </button>
              <button
                onClick={() => setActiveTab("display")}
                className={`px-4 py-2 ${
                  activeTab === "display"
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Monitor className="w-4 h-4 inline mr-2" />
                Ekran
              </button>
              <button
                onClick={() => setActiveTab("network")}
                className={`px-4 py-2 ${
                  activeTab === "network"
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Wifi className="w-4 h-4 inline mr-2" />
                Ağ
              </button>
              <button
                onClick={() => setActiveTab("other")}
                className={`px-4 py-2 ${
                  activeTab === "other"
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Globe className="w-4 h-4 inline mr-2" />
                Diğer
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {!systemInfo ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <>
                  {activeTab === "system" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="text-gray-400 text-sm mb-1">İşletim Sistemi</div>
                          <div className="text-white">{systemInfo.os}</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="text-gray-400 text-sm mb-1">Tarayıcı</div>
                          <div className="text-white">{systemInfo.browser}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="text-gray-400 text-sm mb-1">CPU</div>
                          <div className="text-white">{systemInfo.cpu}</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="text-gray-400 text-sm mb-1">GPU</div>
                          <div className="text-white">{systemInfo.gpu}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="text-gray-400 text-sm mb-1">RAM</div>
                          <div className="text-white">{systemInfo.ram}</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="text-gray-400 text-sm mb-1">Cihaz Türü</div>
                          <div className="text-white">{systemInfo.device}</div>
                        </div>
                      </div>

                      {systemInfo.batteryInfo && (
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <div className="text-gray-400 text-sm mb-1">Pil Durumu</div>
                          <div className="text-white flex items-center">
                            <Battery className="w-4 h-4 mr-2" />
                            {systemInfo.batteryInfo}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "display" && (
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Ekran Çözünürlüğü</div>
                        <div className="text-white">{systemInfo.screenResolution}</div>
                      </div>

                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Renk Derinliği</div>
                        <div className="text-white">{window.screen.colorDepth} bit</div>
                      </div>

                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Piksel Oranı</div>
                        <div className="text-white">{window.devicePixelRatio}x</div>
                      </div>
                    </div>
                  )}

                  {activeTab === "network" && (
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">IP Adresi</div>
                        <div className="text-white">{systemInfo.ip}</div>
                      </div>

                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Ağ Bilgisi</div>
                        <div className="text-white">{systemInfo.networkInfo}</div>
                      </div>
                    </div>
                  )}

                  {activeTab === "other" && (
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Dil</div>
                        <div className="text-white">{systemInfo.language}</div>
                      </div>

                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Saat Dilimi</div>
                        <div className="text-white">{systemInfo.timezone}</div>
                      </div>

                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Tarih ve Saat</div>
                        <div className="text-white">{systemInfo.dateTime}</div>
                      </div>

                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">User Agent</div>
                        <div className="text-white text-xs break-all">{systemInfo.userAgent}</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex justify-between p-4 border-t border-gray-800">
              <button
                onClick={refreshSystemInfo}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-sm transition-colors"
              >
                Yenile
              </button>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm transition-colors flex items-center"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Kopyala
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
