"use client"

import { motion } from "framer-motion"
import { Crosshair, Shield, Zap, Code, Target, Eye, Lock, Cpu } from "lucide-react"

export default function FloatingIcons() {
  const icons = [
    { Icon: Crosshair, x: "10%", y: "20%", delay: 0 },
    { Icon: Shield, x: "85%", y: "15%", delay: 1.5 },
    { Icon: Zap, x: "75%", y: "75%", delay: 0.8 },
    { Icon: Code, x: "15%", y: "85%", delay: 2.2 },
    { Icon: Target, x: "50%", y: "10%", delay: 1.2 },
    { Icon: Eye, x: "90%", y: "50%", delay: 0.5 },
    { Icon: Lock, x: "5%", y: "50%", delay: 1.8 },
    { Icon: Cpu, x: "40%", y: "90%", delay: 0.3 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-cyan-400/30"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: item.delay, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              delay: item.delay,
            }}
          >
            <item.Icon size={24} className="hover-scale" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
