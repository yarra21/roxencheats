"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Cpu, Monitor, Globe, Clock, Info } from "lucide-react"
import { getSystemInfo } from "@/services/system-info-service"
import { getTranslation } from "@/services/language-service"

interface SystemInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SystemInfoModal({ isOpen, onClose }: SystemInfoModalProps) {
  const [systemInfo, setSystemInfo] = useState<any>({})

  useEffect(() => {
    if (isOpen) {
      const info = getSystemInfo()
      setSystemInfo(info)
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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gray-900/90 w-full max-w-md rounded-lg border border-purple-500 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Info className="w-5 h-5 mr-2 text-purple-400" />
                {getTranslation("system.info.title")}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center text-purple-400 mb-2">
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="font-medium">{getTranslation("system.info.ip")}</span>
                  </div>
                  <p className="text-gray-300 font-mono">{systemInfo.ip || "Bilinmiyor"}</p>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center text-cyan-400 mb-2">
                    <Monitor className="w-4 h-4 mr-2" />
                    <span className="font-medium">{getTranslation("system.info.browser")}</span>
                  </div>
                  <p className="text-gray-300">{systemInfo.browser || "Bilinmiyor"}</p>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center text-green-400 mb-2">
                    <Cpu className="w-4 h-4 mr-2" />
                    <span className="font-medium">{getTranslation("system.info.os")}</span>
                  </div>
                  <p className="text-gray-300">{systemInfo.os || "Bilinmiyor"}</p>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center text-yellow-400 mb-2">
                    <Monitor className="w-4 h-4 mr-2" />
                    <span className="font-medium">{getTranslation("system.info.device")}</span>
                  </div>
                  <p className="text-gray-300">{systemInfo.device || "Bilinmiyor"}</p>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center text-pink-400 mb-2">
                    <Monitor className="w-4 h-4 mr-2" />
                    <span className="font-medium">{getTranslation("system.info.screen")}</span>
                  </div>
                  <p className="text-gray-300">{systemInfo.screenResolution || "Bilinmiyor"}</p>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center text-blue-400 mb-2">
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="font-medium">{getTranslation("system.info.language")}</span>
                  </div>
                  <p className="text-gray-300">{systemInfo.language || "Bilinmiyor"}</p>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center text-orange-400 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-medium">{getTranslation("system.info.timezone")}</span>
                  </div>
                  <p className="text-gray-300">{systemInfo.timezone || "Bilinmiyor"}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                {getTranslation("system.info.close")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
