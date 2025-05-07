"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Zap, ArrowRight, Target, Eye, Cpu } from "lucide-react"
import Image from "next/image"

export default function ProductCategories() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { name: "Özellikler", id: "features" },
    { name: "Fiyatlandırma", id: "pricing" },
    { name: "Sistem Gereksinimleri", id: "requirements" },
  ]

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
            <span className="neon-text">SHIELD SOFTWARE</span>{" "}
            <span className="text-purple-500 neon-text-purple">VALORANT INTERNAL PRIVATE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            En gelişmiş ve güvenli Valorant hilesini keşfedin
          </motion.p>
        </div>

        {/* Ürün Görseli */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 rounded-lg overflow-hidden border-2 border-purple-500 shadow-lg shadow-purple-500/30"
        >
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="VALORANT INTERNAL PRIVATE"
            width={800}
            height={600}
            className="w-full"
          />
        </motion.div>

        {/* Tabs */}
        <div className="relative border-b border-gray-800 mb-8">
          <div className="flex justify-center">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative hover-scale ${
                  activeTab === index ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.name}
                {activeTab === index && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab İçeriği */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
          {/* Özellikler Tab */}
          {activeTab === 0 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 p-6 rounded-lg border border-purple-500 hover-scale hover-glow"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Target className="mr-2 text-purple-400" /> Aimbot Özellikleri
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Enable (ON/OFF)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Custom Smoothness</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Custom Aimkey</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Recoil Control</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Custom Bone</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">VisibleCheck</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Fov Color</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Draw Fov</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 p-6 rounded-lg border border-purple-500 hover-scale hover-glow"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Eye className="mr-2 text-purple-400" /> Visuals Özellikleri
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Weapon Name</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Agent Name</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Health Bar</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Spike Info</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Skeleton</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">2D/3D/Corner Box</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Head Circle</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Snapline</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 p-6 rounded-lg border border-purple-500 hover-scale hover-glow"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Zap className="mr-2 text-purple-400" /> Chams Özellikleri
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Rainbow Chams</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Custom Glow</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Custom RGB</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 p-6 rounded-lg border border-purple-500 hover-scale hover-glow"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Cpu className="mr-2 text-purple-400" /> Exploit Özellikleri
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Skin Changer</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Skip Tutorial</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                      <span className="ml-2">Custom Fov</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 p-6 rounded-lg border border-purple-500 hover-scale hover-glow"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Shield className="mr-2 text-purple-400" /> Inject Türleri
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                    <span className="ml-2">Sadece internal hile injectleme (safe)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                    <span className="ml-2">20 DAKİKA BEKLEMELİ VANGUARD BYPASSLI İNJECT (SAFER BEST)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                    <span className="ml-2">Beklemeden vanguard bypasslı inject (beta)</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          )}

          {/* Fiyatlandırma Tab */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 p-6 rounded-lg border border-purple-500 hover-scale hover-glow"
              >
                <h3 className="text-xl font-bold mb-6 text-center text-purple-400">TL Fiyatlandırma</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="text-lg text-gray-300">3 Günlük</span>
                    <span className="text-xl font-bold text-white">700 TL</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="text-lg text-gray-300">1 Haftalık</span>
                    <span className="text-xl font-bold text-white">1400 TL</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="text-lg text-gray-300">1 Aylık</span>
                    <span className="text-xl font-bold text-white">2800 TL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-300">Lifetime</span>
                    <span className="text-xl font-bold text-white">5500 TL</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 p-6 rounded-lg border border-purple-500 hover-scale hover-glow"
              >
                <h3 className="text-xl font-bold mb-6 text-center text-purple-400">Dolar Fiyatlandırma</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="text-lg text-gray-300">3 Day</span>
                    <span className="text-xl font-bold text-white">20 Dolar</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="text-lg text-gray-300">1 Week</span>
                    <span className="text-xl font-bold text-white">40 Dolar</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <span className="text-lg text-gray-300">1 Month</span>
                    <span className="text-xl font-bold text-white">75 Dolar</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-300">Lifetime</span>
                    <span className="text-xl font-bold text-white">150 Dolar</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Sistem Gereksinimleri Tab */}
          {activeTab === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-6 rounded-lg border border-purple-500"
            >
              <h3 className="text-xl font-bold mb-6 text-center text-purple-400">Sistem Gereksinimleri</h3>
              <ul className="space-y-4 text-gray-300 max-w-2xl mx-auto">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                  <span className="ml-2">AMD & NVIDIA Ekran Kartları</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                  <span className="ml-2">Windows 10/11 (Tüm Sürümler)</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                  <span className="ml-2">INTEL & AMD İşlemciler</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/50 mt-1"></div>
                  <span className="ml-2">HVCI ON/OFF</span>
                </li>
              </ul>
            </motion.div>
          )}

          {/* Satın Al Butonu */}
          <div className="mt-8 flex justify-center">
            <motion.a
              href="https://discord.gg/vQYVJWqqQw"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-hover px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium border border-purple-500 neon-border flex items-center hover-glow"
            >
              HEMEN SATIN AL <ArrowRight className="ml-2 w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
