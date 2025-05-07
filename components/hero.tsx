"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield, Lock, Server } from "lucide-react"
import { useEffect, useState } from "react"

interface HeroProps {
  onRegister?: () => void
}

export default function Hero({ onRegister }: HeroProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Üstün teknoloji ve güvenlik çözümleri ile sistemlerinizi koruyun
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
              Shield Software ile sistemlerinizi en gelişmiş güvenlik çözümleriyle koruyun ve performansınızı artırın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onRegister}
                className="px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-200 flex items-center justify-center"
              >
                Hemen Başla <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <a
                href="#features"
                className="px-6 py-3 rounded-md bg-transparent border border-purple-500 text-white font-medium hover:bg-purple-500/10 transition-all duration-200 flex items-center justify-center"
              >
                Özellikler
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm text-gray-300">Gelişmiş Koruma</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm text-gray-300">Veri Güvenliği</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                  <Server className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm text-gray-300">Sistem Optimizasyonu</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-purple-500/10 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-32 h-32 text-purple-400" />
              </div>

              {/* Dekoratif elementler */}
              <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-500/10 animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-purple-500/10 animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-pink-500/10 animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/3 w-8 h-8 rounded-full bg-indigo-500/10 animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
