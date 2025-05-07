"use client"

import { useEffect, useRef, useState } from "react"

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return;
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Canvas boyutunu tam ekran yap
    const resizeCanvas = () => {
      if (typeof window === 'undefined') return;
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", resizeCanvas)
    }

    // Matrix karakterleri
    const chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const charArray = chars.split("")

    // Yağmur damlalarının sayısı
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize) + 1

    // Her sütunun Y pozisyonu
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    // Her sütunun hızı
    const speeds: number[] = []
    for (let i = 0; i < columns; i++) {
      speeds[i] = Math.random() * 2 + 1
    }

    // Her sütunun opaklığı
    const opacities: number[] = []
    for (let i = 0; i < columns; i++) {
      opacities[i] = Math.random() * 0.5 + 0.3
    }

    // Animasyon
    const draw = () => {
      // Yarı saydam siyah arka plan (iz efekti için)
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Karakterlerin rengi ve fontu
      ctx.font = `${fontSize}px monospace`

      // Her sütun için
      for (let i = 0; i < drops.length; i++) {
        // Rastgele bir karakter seç
        const text = charArray[Math.floor(Math.random() * charArray.length)]

        // Gradyan renk efekti (yukarıdan aşağıya doğru yeşilden beyaza)
        const gradient = ctx.createLinearGradient(0, drops[i] - 100, 0, drops[i] + 100)
        gradient.addColorStop(0, `rgba(147, 51, 234, ${opacities[i]})`) // Purple
        gradient.addColorStop(0.5, `rgba(192, 132, 252, ${opacities[i]})`) // Light purple
        gradient.addColorStop(1, `rgba(147, 51, 234, ${opacities[i]})`) // Purple

        ctx.fillStyle = gradient

        // Karakteri çiz
        ctx.fillText(text, i * fontSize, drops[i])

        // Sütun aşağı doğru hareket ettiğinde
        drops[i] += speeds[i]

        // Sütun ekranın altına ulaştığında veya rastgele bir şekilde
        if (drops[i] > canvas.height || Math.random() > 0.99) {
          // Yeni bir sütun başlat
          drops[i] = Math.floor(Math.random() * -100)
          // Yeni bir hız belirle
          speeds[i] = Math.random() * 2 + 1
          // Yeni bir opaklık belirle
          opacities[i] = Math.random() * 0.5 + 0.3
        }
      }
    }

    // Animasyon döngüsü
    const interval = setInterval(draw, 33) // Yaklaşık 30 FPS

    return () => {
      clearInterval(interval)
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", resizeCanvas)
      }
    }
  }, [isMounted])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-40" />
}
