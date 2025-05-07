"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Twitter, DiscIcon as Discord, Activity } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import LanguageSelector from "./language-selector"
import { getTranslation } from "@/services/language-service"

interface FooterProps {
  onOpenAdminLogin?: () => void
  onOpenLogViewer?: () => void
  onOpenSystemInfo?: () => void
}

export default function Footer({ onOpenAdminLogin, onOpenLogViewer, onOpenSystemInfo }: FooterProps) {
  const { isAdmin } = useAuth()
  const [adminClickCount, setAdminClickCount] = useState(0)

  const handleLogoClick = () => {
    setAdminClickCount(adminClickCount + 1)

    // 5 kez tıklandığında admin girişini aç
    if (adminClickCount >= 4 && onOpenAdminLogin) {
      onOpenAdminLogin()
      setAdminClickCount(0)
    }
  }

  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold neon-text swing-animation" onClick={handleLogoClick}>
              SHIELD<span className="text-cyan-400 neon-text-cyan">SOFTWARE</span>
            </Link>
            <p className="text-gray-400 mt-4">{getTranslation("hero.subtitle")}</p>
            <div className="flex space-x-4 mt-6">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-white transition-colors hover-rotate"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-white transition-colors hover-rotate"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="https://discord.gg/XECCS2EdWr"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-white transition-colors hover-rotate"
              >
                <Discord size={20} />
              </motion.a>
              {isAdmin() && onOpenLogViewer && (
                <motion.button
                  onClick={onOpenLogViewer}
                  whileHover={{ y: -3 }}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors hover-rotate"
                >
                  <Activity size={20} />
                </motion.button>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{getTranslation("footer.services")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors hover-scale">
                  Güvenlik Çözümleri
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Sistem Koruması
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Veri Güvenliği
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Tehdit Önleme
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{getTranslation("footer.resources")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Dokümantasyon
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Öğreticiler
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  SSS
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/XECCS2EdWr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Destek
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{getTranslation("footer.legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  İade Politikası
                </Link>
              </li>
              <li>
                <button onClick={onOpenSystemInfo} className="text-gray-400 hover:text-white transition-colors">
                  Sistem Bilgileri
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p className="text-gray-400">
              © {new Date().getFullYear()} SHIELD SOFTWARE. {getTranslation("footer.copyright")}
            </p>
            <p className="text-cyan-400">Yapımcı: Ali</p>
          </div>

          {/* Dil Seçeneği */}
          <div className="mt-4 md:mt-0">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
