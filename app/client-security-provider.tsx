"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"

// Dinamik olarak SecurityInitializer'ı yükle (client-side only)
const SecurityInitializer = dynamic(() => import("./_app"), { ssr: false })

export default function ClientSecurityProvider({ children }: { children: ReactNode }) {
  return <SecurityInitializer>{children}</SecurityInitializer>
}
