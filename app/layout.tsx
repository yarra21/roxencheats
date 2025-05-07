import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { AuthProvider } from "@/contexts/auth-context"
import ClientSecurityProvider from "./client-security-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ROXEN.AIM | Premium Oyun Çözümleri",
  description: "Gelişmiş teknoloji ile üstün oyun çözümleri",
  // Güvenlik meta etiketleri
  other: {
    // X-Frame-Options: Sayfanın iframe içinde gösterilmesini engeller
    "X-Frame-Options": "DENY",
    // X-Content-Type-Options: MIME türü koruması
    "X-Content-Type-Options": "nosniff",
    // X-XSS-Protection: XSS koruması
    "X-XSS-Protection": "1; mode=block",
    // Referrer-Policy: Referrer bilgisini kontrol eder
    "Referrer-Policy": "no-referrer",
    // Cache-Control: Önbelleğe almayı engeller
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Ek meta etiketleri */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.className} bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <ClientSecurityProvider>{children}</ClientSecurityProvider>
          </AuthProvider>
        </ThemeProvider>

        {/* Basit güvenlik scripti - sayfanın yüklenmesini engellemeyecek şekilde */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Temel güvenlik kontrolleri
            (function() {
              try {
                // Sağ tıklama engelleme
                document.addEventListener('contextmenu', function(e) {
                  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
                    e.preventDefault();
                  }
                });
                
                // Klavye kısayollarını engelleme
                document.addEventListener('keydown', function(e) {
                  // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
                  if (
                    e.keyCode === 123 || 
                    (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
                    (e.ctrlKey && e.keyCode === 85)
                  ) {
                    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
                      e.preventDefault();
                    }
                  }
                });
              } catch(e) {
                // Hata durumunda sessizce devam et
              }
            })();
          `,
          }}
        />
      </body>
    </html>
  )
}
