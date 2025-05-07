"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, Check, ChevronDown } from "lucide-react"
import { availableLanguages, getCurrentLanguage, setLanguage } from "@/services/language-service"

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("")

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode)
    setCurrentLang(langCode)
    setIsOpen(false)
  }

  const getCurrentLanguageInfo = () => {
    return availableLanguages.find((lang) => lang.code === currentLang) || availableLanguages[0]
  }

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center text-gray-400 hover:text-white transition-colors">
        <Globe size={16} className="mr-2" />
        <span className="text-sm">
          {getCurrentLanguageInfo().flag} {getCurrentLanguageInfo().name}
        </span>
        <ChevronDown size={14} className={`ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 bottom-full mb-2 z-50 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-lg py-1 overflow-hidden"
            >
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-800 transition-colors"
                >
                  <span className="mr-2">{lang.flag}</span>
                  <span className="flex-1 text-gray-300">{lang.name}</span>
                  {currentLang === lang.code && <Check size={16} className="text-cyan-400" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
