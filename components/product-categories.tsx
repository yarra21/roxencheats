"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import ValorantBypassModal from "./product-modals/valorant-bypass-modal"
import ValorantHacksModal from "./product-modals/valorant-hacks-modal"

export default function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [bypassModalOpen, setBypassModalOpen] = useState(false)
  const [hacksModalOpen, setHacksModalOpen] = useState(false)

  // Kategoriler
  const categories = [
    {
      id: "valorant-hacks",
      title: "ROXEN ONECLİCK",
      description: "Tek tıkla ban sorununu çözen devrim niteliğinde ürün",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500",
      glowColor: "hover-glow-purple",
      products: [
        {
          id: "roxen-oneclick",
          name: "ROXEN ONECLİCK",
          description: "Tek tıkla ban sorununu çözen devrim niteliğinde ürün",
          price: "750 ₺",
          features: ["Tek Tuşla Kolaylık", "Geniş Uyumluluk", "7/24 Teknik Destek"],
        },
      ],
    },
    {
      id: "valorant-bypass",
      title: "VALORANT BYPASS",
      description: "Vanguard anti-cheat sistemini bypass eder",
      icon: Shield,
      color: "from-purple-600 to-indigo-600",
      borderColor: "border-purple-600",
      glowColor: "hover-glow-purple",
      products: [
        {
          id: "vanguard-bypass",
          name: "VANGUARD BYPASS",
          description: "Valorant Vanguard anti-cheat bypass çözümü",
          price: "1400 ₺",
          features: ["Anti-detection", "Kernel Level", "Auto-update"],
        },
      ],
    },
  ]

  // Kategori seçme
  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null)
    } else {
      setActiveCategory(categoryId)
    }
  }

  // Ürün detaylarını gösterme
  const handleProductClick = (categoryId: string, productId: string) => {
    if (categoryId === "valorant-bypass") {
      setBypassModalOpen(true)
    } else if (categoryId === "valorant-hacks") {
      setHacksModalOpen(true)
    }
  }

  return (
    <section id="products" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="neon-text">ROXEN</span> <span className="text-purple-500 neon-text-purple">ÜRÜNLER</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Oyun deneyiminizi üst seviyeye çıkaracak premium çözümlerimiz
          </motion.p>
        </div>

        {/* Kategoriler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border ${category.borderColor} transition-all duration-300 hover-scale ${category.glowColor} ${
                activeCategory === category.id ? "bg-gray-800/70 shadow-lg" : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-full bg-gradient-to-br ${category.color} mr-4 pulse-animation`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg">{category.description}</p>
              <button className="flex items-center text-purple-400 hover:text-purple-300 transition-colors text-lg font-medium">
                Detayları Gör <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Seçilen kategori ürünleri */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <div className="grid grid-cols-1 gap-6">
                {categories
                  .find((c) => c.id === activeCategory)
                  ?.products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-purple-500/50 hover:border-purple-500 transition-all duration-300 hover-scale hover-glow-purple"
                      onClick={() => handleProductClick(activeCategory, product.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-6 md:mb-0 md:mr-6">
                          <h4 className="text-2xl font-bold mb-3 text-purple-400">{product.name}</h4>
                          <p className="text-gray-300 text-lg mb-4">{product.description}</p>
                          <div className="space-y-2 mb-4">
                            {product.features.map((feature, i) => (
                              <div key={i} className="flex items-start">
                                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                                <span className="text-gray-300 ml-2">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="mb-4 text-center">
                            <span className="text-3xl font-bold text-white">{product.price}</span>
                            <span className="text-gray-400 text-sm ml-1">/ başlangıç</span>
                          </div>
                          <button className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-colors">
                            Detayları Gör
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discord Bağlantısı */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">
            Tüm ürünlerimiz hakkında detaylı bilgi ve satın alma işlemleri için Discord sunucumuza katılın.
          </p>
          <Link
            href="https://discord.gg/XECCS2EdWr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-colors"
          >
            Discord'a Katıl <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>

      {/* Ürün Modalleri */}
      <ValorantBypassModal isOpen={bypassModalOpen} onClose={() => setBypassModalOpen(false)} />
      <ValorantHacksModal isOpen={hacksModalOpen} onClose={() => setHacksModalOpen(false)} />
    </section>
  )
}
