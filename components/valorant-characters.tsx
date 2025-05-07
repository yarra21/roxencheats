"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ValorantCharacters() {
  return (
    <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
      {/* Jett */}
      <div className="fixed bottom-0 left-0 z-0">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 0.9,
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2,
            y: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="relative"
        >
          <Image src="/images/jett.png" alt="Jett" width={500} height={800} className="w-auto h-[80vh] max-h-[800px]" />
        </motion.div>
      </div>

      {/* Reyna */}
      <div className="fixed bottom-0 right-0 z-0">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 0.9,
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            y: {
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="relative"
        >
          <Image
            src="/images/reyna.png"
            alt="Reyna"
            width={500}
            height={800}
            className="w-auto h-[80vh] max-h-[800px]"
          />
        </motion.div>
      </div>

      {/* Parlama efektleri */}
      <div className="fixed bottom-0 left-[10%] w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="fixed bottom-0 right-[10%] w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
    </div>
  )
}
