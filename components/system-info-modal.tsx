"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Cpu, Wifi, Globe, Laptop, Server } from "lucide-react"
import { getSystemInfo, type SystemInfo } from "@/services/system-info-service"
import { getTranslation } from "@/services/language-service"

interface SystemInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SystemInfoModal({ isOpen, onClose }: SystemInfoModalProps) {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      const fetchSystemInfo = async () => {
        setIsLoading(true)
        try {
          const info = await getSystemInfo()
          setSystemInfo(info)
        } catch (error) {
          console.error("Sistem bilgileri alınamadı:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchSystemInfo()
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
            className="relative bg-gray-900/90 w-full max-w-2xl rounded-lg border border-cyan-500 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex justify-between items-center p-4 border-b border-gray-800">
              <div className="flex items-center">
                <Laptop className="w-5 h-5 text-cyan-500 mr-2" />
                <h2 className="text-xl font-bold text-cyan-400">{getTranslation("systemInfo.title")}</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* IP ve Konum Bilgileri */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <Globe className="w-5 h-5 text-cyan-500 mr-2" />
                      <h3 className="text-lg font-semibold text-white">{getTranslation("systemInfo.ipLocation")}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.ipAddress")}:</p>
                        <p className="text-white font-mono">{systemInfo?.ip || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.timezone")}:</p>
                        <p className="text-white">{systemInfo?.timezone || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.language")}:</p>
                        <p className="text-white">{systemInfo?.language || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.macAddress")}:</p>
                        <p className="text-white font-mono">
                          {systemInfo?.macAddress || getTranslation("systemInfo.unknown")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sistem Bilgileri */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <Laptop className="w-5 h-5 text-cyan-500 mr-2" />
                      <h3 className="text-lg font-semibold text-white">{getTranslation("systemInfo.systemInfo")}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.pcName")}:</p>
                        <p className="text-white">{systemInfo?.pcName || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.os")}:</p>
                        <p className="text-white">{systemInfo?.os || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.browser")}:</p>
                        <p className="text-white">{systemInfo?.browser || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.deviceType")}:</p>
                        <p className="text-white">{systemInfo?.device || getTranslation("systemInfo.unknown")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Donanım Bilgileri */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <Cpu className="w-5 h-5 text-cyan-500 mr-2" />
                      <h3 className="text-lg font-semibold text-white">{getTranslation("systemInfo.hardwareInfo")}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.cpu")}:</p>
                        <p className="text-white">{systemInfo?.cpu || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.gpu")}:</p>
                        <p className="text-white">{systemInfo?.gpu || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.ram")}:</p>
                        <p className="text-white">{systemInfo?.ram || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.motherboard")}:</p>
                        <p className="text-white">{systemInfo?.motherboard || getTranslation("systemInfo.unknown")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.screenResolution")}:</p>
                        <p className="text-white">
                          {systemInfo?.screenResolution || getTranslation("systemInfo.unknown")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ağ Bilgileri */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <Wifi className="w-5 h-5 text-cyan-500 mr-2" />
                      <h3 className="text-lg font-semibold text-white">{getTranslation("systemInfo.networkInfo")}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.connectionType")}:</p>
                        <p className="text-white">
                          {systemInfo?.networkInfo?.type || getTranslation("systemInfo.unknown")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.connectionSpeed")}:</p>
                        <p className="text-white">
                          {systemInfo?.networkInfo?.effectiveType || getTranslation("systemInfo.unknown")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.downloadSpeed")}:</p>
                        <p className="text-white">
                          {systemInfo?.networkInfo?.downlink || getTranslation("systemInfo.unknown")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{getTranslation("systemInfo.ping")}:</p>
                        <p className="text-white">
                          {systemInfo?.networkInfo?.rtt || getTranslation("systemInfo.unknown")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User Agent */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center mb-3">
                      <Server className="w-5 h-5 text-cyan-500 mr-2" />
                      <h3 className="text-lg font-semibold text-white">User Agent</h3>
                    </div>
                    <p className="text-white text-sm font-mono break-all">
                      {systemInfo?.userAgent || getTranslation("systemInfo.unknown")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md text-sm transition-colors"
              >
                {getTranslation("systemInfo.close")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
