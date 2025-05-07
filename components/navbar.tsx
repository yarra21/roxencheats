"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, Shield, User, LogIn } from "lucide-react"

interface NavbarProps {
  onOpenLogin: () => void
  onOpenRegister: () => void
  onOpenAdminLogin: () => void
}

export default function Navbar({ onOpenLogin, onOpenRegister, onOpenAdminLogin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll durumunu kontrol et
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Menü öğeleri
  const menuItems = [
    { name: "Ana Sayfa", href: "#" },
    { name: "Özellikler", href: "#features" },
    { name: "SSS", href: "#faq" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <span className="text-white">SHIELD</span>
            <span className="text-purple-400">SOFTWARE</span>
          </Link>

          {/* Masaüstü Menü */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-purple-800/50 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Giriş/Kayıt/Admin Butonları */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-md text-white hover:bg-purple-800/50 transition-all duration-200 border border-purple-500/50 hover:border-purple-500 flex items-center"
            >
              <LogIn size={16} className="mr-2" />
              Giriş
            </button>
            <button
              onClick={onOpenRegister}
              className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-200 flex items-center"
            >
              <User size={16} className="mr-2" />
              Kayıt Ol
            </button>
            <button
              onClick={onOpenAdminLogin}
              className="px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-700 text-black font-medium transition-all duration-200 flex items-center"
            >
              <Shield size={16} className="mr-2" />
              Yönetici
            </button>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={onOpenAdminLogin} className="p-2 rounded-md bg-amber-600 text-black">
              <Shield size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-purple-800/50 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-t border-gray-800 md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-purple-800/50 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-gray-800 my-2 pt-2 flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      onOpenLogin()
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-3 rounded-md text-white hover:bg-purple-800/50 transition-all duration-200 border border-purple-500/50 flex items-center"
                  >
                    <LogIn size={16} className="mr-2" />
                    Giriş
                  </button>
                  <button
                    onClick={() => {
                      onOpenRegister()
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-200 flex items-center"
                  >
                    <User size={16} className="mr-2" />
                    Kayıt Ol
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
