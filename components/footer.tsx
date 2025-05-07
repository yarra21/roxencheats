"use client"
import Link from "next/link"
import { Shield, Github, Twitter, Instagram, Mail, Phone } from "lucide-react"

interface FooterProps {
  onOpenAdminLogin: () => void
  onOpenLogViewer: () => void
  onOpenSystemInfo: () => void
}

export default function Footer({ onOpenAdminLogin, onOpenLogViewer, onOpenSystemInfo }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/50 border-t border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold flex items-center gap-1 mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
              <span className="text-white">SHIELD</span>
              <span className="text-purple-400">SOFTWARE</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Gelişmiş güvenlik çözümleri ile sistemlerinizi koruyun ve performansınızı artırın.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Özellikler
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-400 hover:text-purple-400 transition-colors">
                  SSS
                </Link>
              </li>
              <li>
                <button onClick={onOpenSystemInfo} className="text-gray-400 hover:text-purple-400 transition-colors">
                  Sistem Bilgisi
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Yönetim</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenAdminLogin} className="text-gray-400 hover:text-purple-400 transition-colors">
                  Yönetici Girişi
                </button>
              </li>
              <li>
                <button onClick={onOpenLogViewer} className="text-gray-400 hover:text-purple-400 transition-colors">
                  Log Görüntüleyici
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">İletişim</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@shieldsoftware.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span>+90 555 123 4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Shield Software. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
