"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Image from "next/image"

interface PricingProps {
  onRegister: () => void
}

export default function Pricing({ onRegister }: PricingProps) {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="neon-text">VALORANT</span>{" "}
            <span className="text-cyan-400 neon-text-cyan">ROXEN VANGUARD BYPASS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Oyun deneyiminizi üst seviyeye çıkarın
          </motion.p>
        </div>

        {/* Vanguard Bypass Görsel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12 rounded-lg overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-500/30"
        >
          <Image
            src="/images/vanguard-bypass.png"
            alt="Vanguard Bypass Arayüzü"
            width={800}
            height={600}
            className="w-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Desteklenen Sistemler */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-pink-500 neon-border hover-scale hover-glow"
          >
            <h3 className="text-2xl font-bold mb-6 neon-text">SUPPORTED</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                Windows 10 All Versions
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                Windows 11 All Versions
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                Intel/Amd Cpu's
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                Windowed Supported
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                Borderless Supported
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                Fullscreen Supported
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-green-400 mt-1 flex-shrink-0" />
                All Resolutions Supported
              </li>
            </ul>
          </motion.div>

          {/* Özellikler */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-cyan-400 neon-border-cyan hover-scale hover-glow-cyan"
          >
            <h3 className="text-2xl font-bold mb-6 text-cyan-400 neon-text-cyan">ÖZELLİKLER</h3>
            <div className="text-center mb-4">
              <div className="text-gray-400">────────────ᘒ────────────</div>
            </div>
            <ul className="space-y-4 text-gray-300 mb-6">
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                Bilgisayarınızın Delayını Kaldırır
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                Vanguardı Devre Dışı Bırakır
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 mr-2 text-cyan-400 mt-1 flex-shrink-0" />
                İstediğiniz Bedava hileleri Undetected Yani Tespit edilmemiş Şekilde kullanabilirsiniz
              </li>
            </ul>
            <div className="text-center">
              <div className="text-gray-400">────────────ᘒ────────────</div>
            </div>
          </motion.div>
        </div>

        {/* Fiyatlandırma */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-purple-500 hover-scale pulse-animation"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            <span className="neon-text">Prices</span>
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <span className="text-xl text-gray-300">Haftalık</span>
              <span className="text-2xl font-bold text-cyan-400 neon-text-cyan">1400 ₺</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl text-gray-300">Aylık</span>
              <span className="text-2xl font-bold text-cyan-400 neon-text-cyan">2300 ₺</span>
            </div>
          </div>
          <div className="mt-8">
            <motion.button
              onClick={onRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-hover w-full py-3 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium border border-pink-500 neon-border flex items-center justify-center hover-glow"
            >
              HEMEN SATIN AL
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
