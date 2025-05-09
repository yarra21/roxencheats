"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"

export default function ValorantBackground() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { user, isAdmin } = useAuth()
  const isAdminUser = isAdmin()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      {/* Arka plan renk gradyanı */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-purple-900/80 to-black/90"></div>

      {/* Parlama efektleri */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl"></div>

      {/* Yeni Valorant karakterleri */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-screen pointer-events-none"
        style={{
          y: scrollY * 0.1,
        }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7UXhVIsAxGKEffjFH95AC8iViuoYQQ.png"
          alt="Valorant Character"
          fill
          className="object-contain object-right"
          priority
        />
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-1/2 h-screen pointer-events-none"
        style={{
          y: scrollY * 0.05,
        }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rQhWKbsFZiJj3nmKd79gxt7alTMaPn.png"
          alt="Valorant Character"
          fill
          className="object-contain object-left"
          priority
        />
      </motion.div>

      {/* Fortnite karakterleri alt kısımda */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none opacity-70"
        style={{
          y: scrollY * 0.15,
        }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i4OJ5yMEJwhiFR35dXO9wb7LI2gfMp.png"
          alt="Game Characters"
          fill
          className="object-contain object-bottom"
          priority
        />
      </motion.div>

      {/* Yönetici girişi yapıldığında gösterilen yazı */}
      {isAdminUser && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="bg-red-500/80 px-4 py-2 rounded-md shadow-lg border border-red-400">
            <span className="text-white font-bold">YÖNETİCİ MODU AKTİF</span>
          </div>
        </motion.div>
      )}

      {/* Yıldızlar/parçacıklar efekti */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
