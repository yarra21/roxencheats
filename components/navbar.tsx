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

  // Navbar animasyon varyantları
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  // Mobil menü animasyon varyantları
  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  }

  // Menü öğeleri
  const menuItems = [
    { name: "Ana Sayfa", href: "#" },
    { name: "Özellikler", href: "#features" },
    { name: "SSS", href: "#faq" },
  ]

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold flex items-center gap-1">
              <motion.span
                className="neon-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                SHIELD
              </motion.span>
              <motion.span
                className="text-purple-500 neon-text-purple"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                SOFTWARE
              </motion.span>
            </Link>

            {/* Masaüstü Menü */}
            <nav className="hidden md:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Giriş/Kayıt/Admin Butonları */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.button
                onClick={onOpenLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-md text-white hover:bg-gray-800/50 transition-all duration-200 border border-purple-500/50 hover:border-purple-500 hover-glow-purple flex items-center"
              >
                <LogIn size={16} className="mr-2" />
                Giriş
              </motion.button>
              <motion.button
                onClick={onOpenRegister}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover-glow flex items-center"
              >
                <User size={16} className="mr-2" />
                Kayıt Ol
              </motion.button>
              <motion.button
                onClick={onOpenAdminLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-600 to-amber-600 text-black font-medium hover:from-yellow-500 hover:to-amber-500 transition-all duration-200 hover-glow flex items-center"
              >
                <Shield size={16} className="mr-2" />
                Yönetici
              </motion.button>
            </div>

            {/* Mobil Menü Butonu */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                onClick={onOpenAdminLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-md bg-gradient-to-r from-yellow-600 to-amber-600 text-black"
              >
                <Shield size={20} />
              </motion.button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobil Menü */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-t border-gray-800 md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="px-4 py-3 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
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
                    className="px-4 py-3 rounded-md text-white hover:bg-gray-800/50 transition-all duration-200 border border-purple-500/50 flex items-center"
                  >
                    <LogIn size={16} className="mr-2" />
                    Giriş
                  </button>
                  <button
                    onClick={() => {
                      onOpenRegister()
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-200 flex items-center"
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
    </>
  )
}
