"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { addLog } from "@/services/log-service"

export default function UserActivityLogger() {
  const { user } = useAuth()

  // Kullanıcı oturum açtığında log kaydı oluştur
  useEffect(() => {
    if (user) {
      addLog("LOGIN", user.id, user.username, "Kullanıcı giriş yaptı")
    }
  }, [user])

  // Discord bağlantılarını izle
  useEffect(() => {
    const trackDiscordLinks = () => {
      const discordLinks = document.querySelectorAll('a[href*="discord.gg"]')

      discordLinks.forEach((link) => {
        // Daha önce event listener eklenmediyse ekle
        if (!link.getAttribute("data-discord-tracked")) {
          link.setAttribute("data-discord-tracked", "true")

          link.addEventListener("click", async () => {
            if (user) {
              await addLog("DISCORD_VISIT", user.id, user.username, "Discord sunucusuna gitti")
            } else {
              await addLog("DISCORD_VISIT", undefined, "Misafir", "Discord sunucusuna gitti")
            }
          })
        }
      })
    }

    // Sayfa yüklendiğinde Discord bağlantılarını izlemeye başla
    trackDiscordLinks()

    // Sayfa içeriği değiştiğinde Discord bağlantılarını tekrar izle
    const observer = new MutationObserver(trackDiscordLinks)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [user])

  // Satın al butonlarını izle
  useEffect(() => {
    const trackPurchaseButtons = () => {
      // Hatalı seçici: 'button:contains("SATIN AL"), a:contains("SATIN AL")'
      // Bu jQuery seçicisi standart DOM API'sinde çalışmaz

      // Tüm butonları ve bağlantıları seç
      const allButtons = document.querySelectorAll("button, a")

      // İçeriğine göre filtrele
      allButtons.forEach((element) => {
        if (element.textContent && element.textContent.includes("SATIN AL")) {
          // Daha önce event listener eklenmediyse ekle
          if (!element.getAttribute("data-purchase-tracked")) {
            element.setAttribute("data-purchase-tracked", "true")

            element.addEventListener("click", async () => {
              if (user) {
                await addLog("PURCHASE_CLICK", user.id, user.username, "Satın al butonuna tıkladı")
              } else {
                await addLog("PURCHASE_CLICK", undefined, "Misafir", "Satın al butonuna tıkladı")
              }
            })
          }
        }
      })
    }

    // Sayfa yüklendiğinde satın al butonlarını izlemeye başla
    trackPurchaseButtons()

    // Sayfa içeriği değiştiğinde satın al butonlarını tekrar izle
    const observer = new MutationObserver(trackPurchaseButtons)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [user])

  return null // Bu bileşen görünür bir UI oluşturmaz
}
