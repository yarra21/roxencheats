"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null)
    } else {
      setOpenIndex(index)
    }
  }

  const faqs = [
    {
      question: "SHIELD SOFTWARE nedir?",
      answer:
        "SHIELD SOFTWARE, gelişmiş güvenlik çözümleri sunan bir yazılım platformudur. Sistemlerinizi korumak ve güvenliğinizi sağlamak için tasarlanmış çeşitli araçlar ve hizmetler sunuyoruz.",
    },
    {
      question: "Hangi güvenlik çözümlerini sunuyorsunuz?",
      answer:
        "Veri güvenliği, tehdit tespiti, sistem optimizasyonu ve özel güvenlik çözümleri gibi çeşitli hizmetler sunuyoruz. Her müşterinin ihtiyaçlarına göre özelleştirilmiş çözümler geliştiriyoruz.",
    },
    {
      question: "Nasıl üye olabilirim?",
      answer:
        "Web sitemizden 'Kayıt Ol' butonuna tıklayarak hızlıca üye olabilirsiniz. Üyelik işlemi tamamlandıktan sonra tüm hizmetlerimize erişim sağlayabilirsiniz.",
    },
    {
      question: "Teknik destek alabilir miyim?",
      answer: "Evet, 7/24 teknik destek hizmetimiz bulunmaktadır. İletişim formumuz aracılığıyla bize ulaşabilirsiniz.",
    },
    {
      question: "Ödeme yöntemleri nelerdir?",
      answer:
        "Kredi kartı, banka havalesi ve kripto para birimleri dahil olmak üzere çeşitli ödeme yöntemlerini kabul ediyoruz. Ödeme işlemleri güvenli bir şekilde gerçekleştirilmektedir.",
    },
  ]

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-white">SIKÇA</span> <span className="text-purple-400">SORULAN SORULAR</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full text-left p-4 rounded-lg flex justify-between items-center transition-all duration-300 ${
                  openIndex === index
                    ? "bg-purple-900/30 border border-purple-500/50"
                    : "bg-black/30 border border-gray-800 hover:border-purple-500/30"
                }`}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/20 p-4 rounded-b-lg border-x border-b border-purple-500/30 text-gray-300"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
