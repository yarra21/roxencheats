"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Globe, Check } from "lucide-react"
import { setLanguage, getCurrentLanguage } from "@/services/language-service"

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("tr")

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const languages = [
    { code: "tr", name: "Türkçe" },
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "ru", name: "Русский" },
  ]

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    setCurrentLang(langCode)
    setIsOpen(false)
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-gray-800/50"
      >
        <Globe size={16} className="mr-2" />
        <span className="text-sm">{languages.find((lang) => lang.code === currentLang)?.name || "Türkçe"}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-lg z-50"
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                {language.name}
                {currentLang === language.code && <Check size={16} className="text-green-500" />}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
