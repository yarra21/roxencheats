"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Shield, Eye, Lock, Zap, Cpu, Code } from "lucide-react"

const products = [
  {
    id: 1,
    title: "Valorant Anti-Cheat",
    description: "Valorant oyununda hile kullanımını tespit eden ve engelleyen gelişmiş anti-cheat sistemi.",
    icon: Shield,
    color: "purple",
  },
  {
    id: 2,
    title: "Valorant Bypass",
    description: "Valorant anti-cheat sistemini atlatmak için geliştirilmiş güvenli bypass çözümü.",
    icon: Eye,
    color: "blue",
  },
  {
    id: 3,
    title: "HWID Spoofer",
    description: "Donanım kimliğinizi değiştirerek ban yemekten korunmanızı sağlayan spoofer.",
    icon: Cpu,
    color: "pink",
  },
  {
    id: 4,
    title: "Güvenlik Duvarı",
    description: "Bilgisayarınızı dış tehditlere karşı koruyan gelişmiş güvenlik duvarı.",
    icon: Lock,
    color: "green",
  },
  {
    id: 5,
    title: "Performans Artırıcı",
    description: "Oyun performansınızı artıran ve FPS değerlerinizi yükselten optimizasyon aracı.",
    icon: Zap,
    color: "amber",
  },
  {
    id: 6,
    title: "Kod Koruyucu",
    description: "Yazılım kodlarınızı korumak için geliştirilmiş obfuscation çözümü.",
    icon: Code,
    color: "red",
  },
]

export default function ProductShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const colorMap: Record<string, { text: string; bg: string; shadow: string }> = {
    purple: {
      text: "text-purple-400",
      bg: "bg-purple-400/10",
      shadow: "shadow-purple-500/20",
    },
    blue: {
      text: "text-blue-400",
      bg: "bg-blue-400/10",
      shadow: "shadow-blue-500/20",
    },
    pink: {
      text: "text-pink-400",
      bg: "bg-pink-400/10",
      shadow: "shadow-pink-500/20",
    },
    green: {
      text: "text-green-400",
      bg: "bg-green-400/10",
      shadow: "shadow-green-500/20",
    },
    amber: {
      text: "text-amber-400",
      bg: "bg-amber-400/10",
      shadow: "shadow-amber-500/20",
    },
    red: {
      text: "text-red-400",
      bg: "bg-red-400/10",
      shadow: "shadow-red-500/20",
    },
  }

  return (
    <section ref={sectionRef} className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-purple-900/20 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ürünlerimiz ve <span className="text-purple-400">Çözümlerimiz</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            En son teknolojilerle geliştirdiğimiz güvenlik çözümlerimizi keşfedin.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const isHovered = hoveredId === product.id
            const { text, bg, shadow } = colorMap[product.color]

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-lg ${isHovered ? `border-${product.color}-500/30 ${shadow}` : "hover:border-purple-500/30 hover:shadow-purple-500/10"}`}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex flex-col h-full">
                  <div className={`p-3 rounded-full ${bg} w-fit mb-4`}>
                    <product.icon size={24} className={text} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isHovered ? text : "text-white"}`}>{product.title}</h3>
                  <p className="text-gray-400 mb-4 flex-grow">{product.description}</p>
                  <button className={`mt-auto text-sm font-medium flex items-center ${text} hover:underline`}>
                    Detaylı Bilgi
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
