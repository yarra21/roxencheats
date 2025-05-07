"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Zap, Crosshair, Code } from "lucide-react"

const features = [
  {
    icon: Crosshair,
    title: "Hassas Hedefleme",
    description: "Her ortamda piksel mükemmelliğinde doğruluk ve sorunsuz takip için gelişmiş algoritmalar.",
  },
  {
    icon: Shield,
    title: "Tespit Edilemez Güvenlik",
    description: "Hesabınızı tespite karşı güvende tutan son teknoloji koruma sistemleri.",
  },
  {
    icon: Zap,
    title: "Yıldırım Performans",
    description: "Optimize edilmiş kod, sistem kaynaklarına minimum etki ve maksimum FPS sağlar.",
  },
  {
    icon: Code,
    title: "Düzenli Güncellemeler",
    description: "Oyun değişikliklerinin önünde kalmak için sürekli geliştirme ve sık güncellemeler.",
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="neon-text">Gelişmiş</span> <span className="text-cyan-400 neon-text-cyan">Özellikler</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            ROXEN.AIM'i güçlendiren son teknoloji özellikleri keşfedin
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-cyan-500 transition-all duration-300 group hover-scale hover-glow-cyan"
            >
              <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 inline-block pulse-animation">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
