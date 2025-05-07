import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import ClientSecurityProvider from "./client-security-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shield Software | Güvenlik Çözümleri",
  description: "Gelişmiş güvenlik çözümleri ile sistemlerinizi koruyun",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={inter.className}>
        <AuthProvider>
          <ClientSecurityProvider>{children}</ClientSecurityProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
