"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CreditCard, HelpCircle, Home, Key, LogOut, Settings, Shield, User } from "lucide-react"

export function UserSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Profil", href: "/dashboard/profile", icon: User },
    { name: "Lisanslarım", href: "/dashboard/licenses", icon: Key },
    { name: "Destek Talepleri", href: "/dashboard/support", icon: HelpCircle },
    { name: "Fatura Geçmişi", href: "/dashboard/billing", icon: CreditCard },
    { name: "Güvenlik", href: "/dashboard/security", icon: Shield },
    { name: "Ayarlar", href: "/dashboard/settings", icon: Settings },
  ]

  if (!user) return null

  return (
    <div className="flex h-full w-64 flex-col border-r bg-gray-900 border-gray-800">
      <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-800 p-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
          <AvatarFallback className="text-lg">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">{user.username}</h2>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
        <div className="w-full rounded-md bg-gray-800 p-2 text-center">
          <p className="text-xs text-gray-400">Abonelik</p>
          <p className="text-sm font-medium text-white">{user.subscriptionType}</p>
          <p className="text-xs text-gray-400">Bitiş: {user.subscriptionEnd.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-gray-800 p-4">
        <Button variant="outline" className="w-full justify-start text-gray-300 hover:text-white" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </div>
  )
}
