"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Zap, Shield, Crosshair } from 'lucide-react'
import Link from "next/link"
import ProductViewerModal from "./product-viewer-modal"
import NotAvailableModal from "./not-available-modal"

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [notAvailableModalOpen, setNotAvailableModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Check if component is mounted (client-side)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Mouse pozisyonunu takip et - only on client side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMounted])

  // Giriş animasyonu
  useEffect(() => {
    if (!isMounted) return;
    
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [isMounted])

  // Paralaks efekti için hesaplama - safe for SSR
  const calcParallax = (depth = 10) => {
    if (!isMounted) return { x: 0, y: 0 };
    
    const x = ((typeof window !== 'undefined' ? window.innerWidth / 2 : 0) - mousePosition.x) / depth
    const y = ((typeof window !== 'undefined' ? window.innerHeight / 2 : 0) - mousePosition.y) / depth
    return { x, y }
  }

  // Özellikler için animasyon varyantları
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.2,
        duration: 0.5,
      },
    }),
  }

  // Özellikler
  const features = [
    { icon: Crosshair, text: "Hassas Hedefleme" },
    { icon: Shield, text: "Tespit Edilemez" },
    { icon: Zap, text: "Yüksek Performans" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Arka plan efektleri */}
      <div className="absolute inset-0 z-0">
        {/* Radyal gradyan */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />

        {/* Animasyonlu arka plan çizgileri */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
            style={{
              top: `${15 + i * 20}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}

        {/* Dikey çizgiler */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
            style={{
              left: `${20 + i * 15}%`,
            }}
            animate={{
              y: ["-100%", "100%"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}

        {/* Mor parıltı efektleri */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      {/* Tam ekran karşılama mesajı */}
      {isMounted && (
        <AnimatePresence>
          {!isVisible && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6 text-purple-500 neon-text"
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(147, 51, 234, 0.7)",
                      "0 0 20px rgba(147, 51, 234, 0.9)",
                      "0 0 5px rgba(147, 51, 234, 0.7)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  MERHABA BEN ROXEN
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-white mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  SİTEMİZDEN ALIŞVERİŞ YAPABİLİRSİNİZ
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium"
                    onClick={() => setIsVisible(true)}
                  >
                    DEVAM ET
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMounted && isVisible ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isMounted && isVisible ? 1 : 0, y: isMounted && isVisible ? 0 : -20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl md:text-2xl text-purple-500 neon-text mb-4 cyber-text"
            >
              YENİ NESİL
            </motion.h2>

            <motion.h1
              ref={titleRef}
              data-text="ROXEN.AIM"
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 glitch-effect heavy-swing-animation"
              style={isMounted ? {
                transform: `translate(${calcParallax(50).x}px, ${calcParallax(50).y}px)`,
              } : {}}
              initial={{ opacity: 0 }}
              animate={{ opacity: isMounted && isVisible ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="neon-text">ROXEN</span>
              <span className="text-purple-500 neon-text-purple">.AIM</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isMounted && isVisible ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Üstün teknoloji ve eşsiz hassasiyet ile oyun deneyiminizi yükseltin.
            </motion.p>
          </motion.div>

          {/* Özellikler */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMounted && isVisible ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={featureVariants}
                initial="hidden"
                animate={isMounted && isVisible ? "visible" : "hidden"}
                className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800 hover:border-purple-500 transition-all duration-300 hover-scale hover-glow-purple"
              >
                <feature.icon className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isMounted && isVisible ? 1 : 0, y: isMounted && isVisible ? 0 : 50 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.button
              onClick={() => setProductModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-hover px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium border border-purple-500 neon-border flex items-center justify-center gap-2 hover-glow"
            >
              ROXEN ONECLİCK <ArrowRight size={16} />
            </motion.button>
            <Link href="https://discord.gg/XECCS2EdWr" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-hover px-8 py-3 rounded-md bg-transparent text-white font-medium border border-purple-500 neon-border-purple hover-glow-purple"
              >
                DISCORD'A KATIL
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      {isMounted && (
        <>
          <ProductViewerModal isOpen={productModalOpen} onClose={() => setProductModalOpen(false)} />
          <NotAvailableModal isOpen={notAvailableModalOpen} onClose={() => setNotAvailableModalOpen(false)} />
        </>
      )}
    </section>
  )
}
