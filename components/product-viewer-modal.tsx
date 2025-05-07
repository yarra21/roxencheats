"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Rocket, BarChart3, LogOut, Info } from "lucide-react"
import Image from "next/image"

interface ProductViewerModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProductViewerModal({ isOpen, onClose }: ProductViewerModalProps) {
  const [status, setStatus] = useState("Ready")
  const [showNotAvailable, setShowNotAvailable] = useState(false)

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

  const handleStartBypass = () => {
    setStatus("Bypassing...")
    setTimeout(() => {
      setStatus("Bypass Active")
    }, 2000)
  }

  const handleShowStatus = () => {
    setShowNotAvailable(true)
    setTimeout(() => {
      setShowNotAvailable(false)
    }, 3000)
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
            className="relative bg-[#111827] w-full max-w-md rounded-lg border border-indigo-500 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex justify-between items-center p-4 border-b border-gray-800">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-500 rounded-md mr-3"></div>
                <h2 className="text-xl font-bold neon-text heavy-swing-animation">
                  ROXEN<span className="text-cyan-400 neon-text-cyan">FPS</span>
                </h2>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-400 mr-4">LICENSE: CUSTOMER...</span>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Start Bypass Button */}
              <button
                onClick={handleStartBypass}
                className="w-full py-4 rounded-md bg-[#1a1f35] hover:bg-[#232942] text-white font-medium border border-indigo-500 flex items-center justify-center gap-2 transition-all duration-300 hover:border-indigo-400 hover-glow"
              >
                <Rocket size={18} className="text-cyan-400" />
                <span>START BYPASS</span>
              </button>

              {/* Show Status Button */}
              <button
                onClick={handleShowStatus}
                className="w-full py-4 rounded-md bg-[#1a1f35] hover:bg-[#232942] text-white font-medium border border-yellow-500 flex items-center justify-center gap-2 transition-all duration-300 hover:border-yellow-400"
              >
                <BarChart3 size={18} className="text-yellow-400" />
                <span>SHOW STATUS</span>
              </button>

              {/* Exit Loader Button */}
              <button
                onClick={onClose}
                className="w-full py-4 rounded-md bg-[#1a1f35] hover:bg-[#232942] text-white font-medium border border-red-500 flex items-center justify-center gap-2 transition-all duration-300 hover:border-red-400"
              >
                <LogOut size={18} className="text-red-400" />
                <span>EXIT LOADER</span>
              </button>

              {/* Support Banner */}
              <div className="mt-4 relative overflow-hidden rounded-md">
                <Image
                  src="/placeholder.svg?height=100&width=400"
                  alt="7/24 Destek"
                  width={400}
                  height={100}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/50 to-purple-500/50 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white neon-text">7/24 DESTEK</h3>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex items-center mt-4 p-3 rounded-md bg-[#1a1f35] border border-gray-800">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <span className="text-gray-300">{status}</span>
              </div>
            </div>

            {/* Not Available Message */}
            <AnimatePresence>
              {showNotAvailable && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="absolute inset-x-0 bottom-20 flex justify-center"
                >
                  <div className="bg-black/80 text-white px-4 py-2 rounded-md flex items-center">
                    <Info size={16} className="text-yellow-400 mr-2" />
                    <span>Bu özellik şu an aktif değildir. Daha sonra gelecektir.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
