"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Shield, ArrowRight } from "lucide-react"

export default function CTASection({ onRegister }: { onRegister: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section ref={sectionRef} className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40 z-0"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-purple-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-gray-900 to-purple-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center md:justify-start mb-4"
              >
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
                <span className="ml-2 text-purple-400 font-semibold">Premium Güvenlik</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
              >
                Hemen Kaydolun ve <span className="text-purple-400">Güvenliğinizi Artırın</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-300 mb-6 max-w-xl"
              >
                Shield Software ile oyun deneyiminizi güvenli hale getirin. Hemen ücretsiz hesap oluşturun ve premium
                güvenlik çözümlerimize erişin.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <button
                  onClick={onRegister}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg shadow-purple-500/20"
                >
                  Hemen Kaydol
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <button className="px-6 py-3 bg-transparent border border-purple-500 text-white hover:bg-purple-500/10 font-medium rounded-lg transition-all duration-200">
                  Daha Fazla Bilgi
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full md:w-1/3 flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-30"></div>
                <div className="relative bg-gray-900 rounded-lg p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">Premium Özellikler</h3>
                    <ul className="space-y-3 text-left">
                      {[
                        "7/24 Teknik Destek",
                        "Otomatik Güncellemeler",
                        "Gelişmiş Anti-Cheat Koruması",
                        "HWID Spoofer",
                        "Performans Optimizasyonu",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-purple-400 mr-2 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
