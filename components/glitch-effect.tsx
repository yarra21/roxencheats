"use client"

import { useEffect, useRef, useState } from "react"

export default function GlitchEffect() {
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

    let time = 0

    function drawGlitch() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Random glitch lines
      if (Math.random() > 0.9) {
        const numLines = Math.floor(Math.random() * 5) + 1

        for (let i = 0; i < numLines; i++) {
          const y = Math.random() * canvas.height
          const width = Math.random() * canvas.width
          const height = Math.random() * 5 + 1

          ctx.fillStyle = `rgba(147, 51, 234, ${Math.random() * 0.2})` // Purple
          ctx.fillRect(0, y, width, height)
        }
      }

      // Digital noise
      if (Math.random() > 0.95) {
        const numSquares = Math.floor(Math.random() * 20) + 5

        for (let i = 0; i < numSquares; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = Math.random() * 20 + 1

          ctx.fillStyle = `rgba(192, 132, 252, ${Math.random() * 0.2})` // Light purple
          ctx.fillRect(x, y, size, size)
        }
      }

      // Horizontal scan lines
      for (let i = 0; i < canvas.height; i += 2) {
        if (Math.random() > 0.97) continue

        ctx.fillStyle = `rgba(147, 51, 234, 0.03)` // Purple
        ctx.fillRect(0, i, canvas.width, 1)
      }

      time += 0.01
      requestAnimationFrame(drawGlitch)
    }

    drawGlitch()

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", resizeCanvas)
      }
    }
  }, [isMounted])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
}
