"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">SHIELD</span>
            <span className="text-2xl font-bold text-red-500">SOFTWARE</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-white hover:text-red-500">
            Ana Sayfa
          </Link>
          <Link href="/products" className="text-sm font-medium text-white hover:text-red-500">
            Ürünler
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-white hover:text-red-500">
            Fiyatlandırma
          </Link>
          <Link href="/faq" className="text-sm font-medium text-white hover:text-red-500">
            SSS
          </Link>
          <Link href="/contact" className="text-sm font-medium text-white hover:text-red-500">
            İletişim
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/login">Giriş Yap</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Hesabım</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-white hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-white hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Ürünler
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-white hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Fiyatlandırma
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-white hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                SSS
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-white hover:text-red-500"
                onClick={() => setIsMenuOpen(false)}
              >
                İletişim
              </Link>
            </nav>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" asChild>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Giriş Yap
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Hesabım
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
