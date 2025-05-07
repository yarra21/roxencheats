"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  username: string
  email: string
  avatar?: string
  role: "user" | "admin"
  subscriptionType: string
  subscriptionEnd: Date
  hwid: string
  registrationDate: Date
  lastLogin: Date
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simüle edilmiş kullanıcı verilerini yükle
    const loadUser = async () => {
      setIsLoading(true)
      try {
        // Tarayıcı ortamında olduğundan emin olalım
        if (typeof window !== "undefined") {
          // Gerçek uygulamada, burada bir API çağrısı yapılır
          // Şimdilik localStorage'dan kullanıcı bilgilerini alalım
          const savedUser = localStorage.getItem("user")
          if (savedUser) {
            const parsedUser = JSON.parse(savedUser)
            // Date nesnelerini düzelt
            parsedUser.subscriptionEnd = new Date(parsedUser.subscriptionEnd)
            parsedUser.registrationDate = new Date(parsedUser.registrationDate)
            parsedUser.lastLogin = new Date(parsedUser.lastLogin)
            setUser(parsedUser)
          }
        }
      } catch (error) {
        console.error("Failed to load user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Gerçek uygulamada, burada bir API çağrısı yapılır
      // Şimdilik sahte bir kullanıcı oluşturalım
      const mockUser: User = {
        id: "user-123",
        username: "valorant_pro",
        email: email,
        avatar: "/placeholder.svg?height=128&width=128",
        role: "user",
        subscriptionType: "1 Month",
        subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün sonra
        hwid: "ABC123DEF456GHI789",
        registrationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 gün önce
        lastLogin: new Date(),
      }

      // Kullanıcıyı localStorage'a kaydet
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
