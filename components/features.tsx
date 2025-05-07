"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Zap, Server, Code } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: "Gelişmiş Koruma",
      description: "Sistemlerinizi en gelişmiş güvenlik çözümleri ile koruyun.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Lock,
      title: "Veri Güvenliği",
      description: "Verilerinizi güvende tutun ve yetkisiz erişimleri engelleyin.",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
    },
    {
      icon: Eye,
      title: "Tehdit Tespiti",
      description: "Potansiyel tehditleri anında tespit edin ve önlem alın.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Zap,
      title: "Hızlı Yanıt",
      description: "Güvenlik tehditlerine karşı hızlı ve etkili yanıt mekanizmaları.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
    {
      icon: Server,
      title: "Sistem Optimizasyonu",
      description: "Sistemlerinizi optimize ederek performansı artırın.",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      icon: Code,
      title: "Özel Çözümler",
      description: "İhtiyaçlarınıza özel güvenlik çözümleri geliştiriyoruz.",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
    },
  ]

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
            <span className="text-white">SHIELD</span> <span className="text-purple-400">ÖZELLİKLER</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            En gelişmiş güvenlik çözümleri ile sistemlerinizi koruyun
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div
                className={`w-12 h-12 rounded-lg ${feature.bgColor} ${feature.borderColor} border flex items-center justify-center mb-4`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
