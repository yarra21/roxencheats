"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export default function WelcomeNotification() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Bildirimi 1 saniye sonra göster
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    // Bildirimi 10 saniye sonra otomatik kapat
    const autoCloseTimer = setTimeout(() => {
      setIsVisible(false)
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(autoCloseTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl border border-blue-400 overflow-hidden">
            <div className="relative p-6">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <img src="/images/logo.png" alt="ROXEN Logo" className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 neon-text-blue">MERHABA BEN ROXEN</h2>
                <p className="text-white/90 text-lg">SİTEMİZE HOŞ GELDİNİZ</p>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
