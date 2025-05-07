"use client"

import { useEffect, useState } from "react"

export default function CodeObfuscator() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    if (typeof window === "undefined") return

    // HTML kaynak kodunu karıştır
    const obfuscateHTML = () => {
      // Orijinal HTML'i al
      const originalHTML = document.documentElement.outerHTML

      // Sahte HTML oluştur (gerçek HTML'i gizlemek için)
      const fakeHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>404 - Sayfa Bulunamadı</title>
          <meta name="robots" content="noindex, nofollow">
        </head>
        <body>
          <h1>404 - Sayfa Bulunamadı</h1>
          <p>Aradığınız sayfa bulunamadı veya taşınmış olabilir.</p>
          <!-- ROXEN.AIM Güvenlik Sistemi tarafından korunmaktadır -->
          <!-- ${Array(1000)
            .fill("")
            .map(() => Math.random().toString(36).substring(2))
            .join("")} -->
        </body>
        </html>
      `

      // Görünüm kaynağı için HTML'i değiştir
      const originalDocumentProto = Object.getOwnPropertyDescriptor(window.Document.prototype, "documentElement")

      if (originalDocumentProto && originalDocumentProto.get) {
        const originalGetter = originalDocumentProto.get

        Object.defineProperty(Document.prototype, "documentElement", {
          get: function () {
            // Görünüm kaynağı için sahte HTML döndür
            if (new Error().stack?.includes("view-source:")) {
              const fakeElement = document.implementation.createHTMLDocument().documentElement
              fakeElement.innerHTML = fakeHTML
              return fakeElement
            }

            // Normal kullanım için orijinal HTML döndür
            return originalGetter.call(this)
          },
        })
      }

      // innerHTML ve outerHTML'i geçersiz kıl
      const originalElementProto = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML")
      const originalOuterHTMLProto = Object.getOwnPropertyDescriptor(Element.prototype, "outerHTML")

      if (originalElementProto && originalElementProto.get) {
        const originalInnerGetter = originalElementProto.get

        Object.defineProperty(Element.prototype, "innerHTML", {
          get: function () {
            // Görünüm kaynağı için sahte içerik döndür
            if (new Error().stack?.includes("view-source:")) {
              return fakeHTML
            }

            // Normal kullanım için orijinal içerik döndür
            return originalInnerGetter.call(this)
          },
        })
      }

      if (originalOuterHTMLProto && originalOuterHTMLProto.get) {
        const originalOuterGetter = originalOuterHTMLProto.get

        Object.defineProperty(Element.prototype, "outerHTML", {
          get: function () {
            // Görünüm kaynağı için sahte içerik döndür
            if (new Error().stack?.includes("view-source:")) {
              return fakeHTML
            }

            // Normal kullanım için orijinal içerik döndür
            return originalOuterGetter.call(this)
          },
        })
      }
    }

    // Kod karıştırma fonksiyonunu çalıştır
    try {
      obfuscateHTML()
    } catch (error) {
      console.error("Kod karıştırma hatası:", error)
    }

    // Ek koruma: Sayfanın kaynağını görüntülemeyi engelle
    document.addEventListener("keydown", (e) => {
      // Ctrl+U (Kaynak kodu görüntüleme)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault()
        return false
      }
    })
  }, [isMounted])

  return null // Görünür bir UI oluşturmaz
}
