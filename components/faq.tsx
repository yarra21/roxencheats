"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "ROXEN.AIM nedir?",
    answer:
      "ROXEN.AIM, Valorant için geliştirilmiş bir Vanguard bypass çözümüdür. Oyun içi performansınızı artırmak ve çeşitli özelliklere erişim sağlamak için tasarlanmıştır.",
  },
  {
    question: "Nasıl satın alabilirim?",
    answer:
      "Ürünlerimizi satın almak için Discord sunucumuza katılabilir ve oradaki talimatları takip edebilirsiniz. Ödeme işlemleri güvenli bir şekilde gerçekleştirilmektedir.",
  },
  {
    question: "Tespit edilme riski var mı?",
    answer:
      "ROXEN.AIM, tespit edilme riskini minimize etmek için gelişmiş teknolojiler kullanmaktadır. Vanguard'ı devre dışı bırakarak güvenli bir deneyim sunuyoruz, ancak her zaman oyun kurallarına uygun davranmanızı öneririz.",
  },
  {
    question: "Hangi işletim sistemlerini destekliyor?",
    answer:
      "ROXEN.AIM, Windows 10 ve Windows 11'in tüm sürümlerini desteklemektedir. Hem Intel hem de AMD işlemcilerle uyumlu çalışır.",
  },
  {
    question: "Ürün güncellemeleri nasıl yapılır?",
    answer:
      "Ürün güncellemeleri otomatik olarak gerçekleştirilir. Ayrıca Discord sunucumuzdan en son güncellemeler hakkında bilgi alabilirsiniz.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            <span className="neon-text">Sıkça Sorulan</span>{" "}
            <span className="text-cyan-400 neon-text-cyan">Sorular</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
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
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-4 rounded-lg flex justify-between items-center transition-all duration-300 hover-scale ${
                  openIndex === index
                    ? "bg-gray-800/80 border border-cyan-500 hover-glow-cyan"
                    : "bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700"
                }`}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-800/30 p-4 rounded-b-lg border-x border-b border-gray-700"
                >
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
