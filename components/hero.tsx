"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import ParticleBackground from "./particle-background"
import ValorantBackground from "./valorant-background"

interface HeroProps {
  onRegister?: () => void
}

export default function Hero({ onRegister }: HeroProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Animasyonlu arka plan */}
      {isMounted && (
        <>
          <ParticleBackground />
          <ValorantBackground />
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="neon-text">SHIELD</span> <span className="text-purple-500 neon-text-purple">SOFTWARE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Üstün teknoloji ve eşsiz güvenlik çözümleri ile sistem güvenliğinizi en üst seviyeye çıkarın.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={onRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover-glow flex items-center justify-center"
            >
              Hemen Başla <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <Link href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-md bg-transparent border border-purple-500 text-white font-medium hover:bg-purple-500/10 transition-all duration-200 hover-glow-purple flex items-center justify-center"
              >
                Özellikler
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 text-gray-400 text-sm"
          >
            <p>Güvenlik çözümlerimiz ile sisteminizi koruyun</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
