"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "HackMaster",
    role: "Valorant Oyuncusu",
    content:
      "SHIELD SOFTWARE'in Valorant Internal Private hilesini kullanıyorum ve kesinlikle piyasadaki en iyi hile. Hiç ban yemedim ve aimbot özellikleri mükemmel çalışıyor.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "ProGamer123",
    role: "Rekabetçi Oyuncu",
    content:
      "Daha önce birçok hile denedim ama hepsi ban yedi. SHIELD SOFTWARE'in hilesini 3 aydır kullanıyorum ve hiç sorun yaşamadım. Özellikle ESP özellikleri çok başarılı.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "ValorantKing",
    role: "Twitch Yayıncısı",
    content:
      "Yayınlarımda bile kullanabiliyorum, o kadar undetected. Skin changer özelliği sayesinde tüm skinlere erişebiliyorum. SHIELD SOFTWARE ekibine teşekkürler!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "HeadshotQueen",
    role: "E-Spor Oyuncusu",
    content:
      "Aimbot ayarları çok detaylı, istediğim gibi özelleştirebiliyorum. Smooth ayarı sayesinde hiç belli olmuyor. Kesinlikle tavsiye ederim!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "ShadowSniper",
    role: "Valorant Tutkunu",
    content:
      "Lifetime satın aldım ve kesinlikle değdi. Sürekli güncelleniyor ve Vanguard güncellemelerinden etkilenmiyor. SHIELD SOFTWARE'in desteği de çok hızlı.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const maxIndex = testimonials.length - 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible) {
        setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible, maxIndex])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1))
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section ref={sectionRef} className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-purple-900/20 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Kullanıcılarımız <span className="text-purple-400">Ne Diyor?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            SHIELD SOFTWARE Valorant Internal Private kullanıcılarının deneyimlerini keşfedin.
          </motion.p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-purple-500 rounded-full p-1">
                            <Quote size={16} className="text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-gray-300 mb-4 text-lg italic">"{testimonial.content}"</p>
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        <p className="text-purple-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-purple-600 text-white p-2 rounded-full transition-colors duration-300 z-10"
            aria-label="Önceki yorum"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900/70 hover:bg-purple-600 text-white p-2 rounded-full transition-colors duration-300 z-10"
            aria-label="Sonraki yorum"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-purple-500" : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Yorum ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
