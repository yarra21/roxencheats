"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Shield, Users, Award, Clock } from "lucide-react"

export default function StatsSection() {
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

  const stats = [
    {
      icon: Shield,
      value: 99.9,
      label: "Güvenlik Oranı",
      suffix: "%",
      color: "text-purple-400",
    },
    {
      icon: Users,
      value: 10000,
      label: "Mutlu Müşteri",
      suffix: "+",
      color: "text-blue-400",
    },
    {
      icon: Award,
      value: 50,
      label: "Ödül & Sertifika",
      suffix: "+",
      color: "text-pink-400",
    },
    {
      icon: Clock,
      value: 24,
      label: "Saat Destek",
      suffix: "/7",
      color: "text-green-400",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Rakamlarla <span className="text-purple-400">Shield</span> Software
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Güvenlik çözümlerimizle binlerce kullanıcıya hizmet veriyoruz. İşte başarımızın kanıtı olan bazı rakamlar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full bg-gray-800 mb-4 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <CountUp
                  isVisible={isVisible}
                  end={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl font-bold mb-2"
                />
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface CountUpProps {
  isVisible: boolean
  end: number
  suffix?: string
  className?: string
}

function CountUp({ isVisible, end, suffix = "", className = "" }: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const duration = 2000
    const startValue = 0

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const currentCount = Math.floor(progress * (end - startValue) + startValue)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(countUp)
      }
    }

    animationFrame = requestAnimationFrame(countUp)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isVisible, end])

  return (
    <span className={className}>
      {count}
      {suffix}
    </span>
  )
}
