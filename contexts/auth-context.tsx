"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { addLog } from "@/services/log-service"
import { saveSystemInfo } from "@/services/system-info-service"

type User = {
  id: string
  username: string
  email?: string
  role: "user" | "admin"
  registeredAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message: string; user?: User }>
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string; user?: User }>
  logout: () => void
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Kullanıcı bilgilerini localStorage'dan yükle
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("roxen_user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Kullanıcı bilgileri yüklenirken hata oluştu:", error)
          localStorage.removeItem("roxen_user")
        }
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  // Kullanıcı girişi
  const login = async (
    username: string,
    password: string,
  ): Promise<{ success: boolean; message: string; user?: User }> => {
    setIsLoading(true)

    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Admin kullanıcıları kontrol et
    const adminUsers = [
      { username: "roxen", password: "roxen1252", role: "admin" as const },
      { username: "ali", password: "ali2011", role: "admin" as const },
    ]

    const adminUser = adminUsers.find((u) => u.username === username && u.password === password)

    if (adminUser) {
      const user: User = {
        id: `admin-${Date.now()}`,
        username: adminUser.username,
        role: adminUser.role,
        registeredAt: new Date().toISOString(),
      }

      setUser(user)
      localStorage.setItem("roxen_user", JSON.stringify(user))

      // Admin bilgilerini kaydet
      localStorage.setItem("roxen_admin_user", adminUser.username)
      localStorage.setItem("roxen_admin_auth", "true")
      localStorage.setItem("roxen_admin_login_time", new Date().toISOString())

      // Sistem bilgilerini kaydet
      await saveSystemInfo(user.id)

      setIsLoading(false)

      // Admin girişi logunu ekle
      await addLog("ADMIN_LOGIN", user.id, user.username, "Admin girişi yapıldı")

      return { success: true, message: "Admin girişi başarılı!", user }
    }

    // Normal kullanıcıları kontrol et
    const usersJson = localStorage.getItem("roxen_users") || "[]"
    const users = JSON.parse(usersJson)

    const foundUser = users.find((u: any) => u.username === username && u.password === password)

    if (foundUser) {
      const user: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: "user",
        registeredAt: foundUser.registeredAt,
      }

      setUser(user)
      localStorage.setItem("roxen_user", JSON.stringify(user))

      // Sistem bilgilerini kaydet
      await saveSystemInfo(user.id)

      setIsLoading(false)

      // Kullanıcı girişi logunu ekle
      await addLog("LOGIN", user.id, user.username, "Kullanıcı girişi yapıldı")

      return { success: true, message: "Giriş başarılı!", user }
    }

    setIsLoading(false)
    return { success: false, message: "Geçersiz kullanıcı adı veya şifre!" }
  }

  // Kullanıcı kaydı
  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string; user?: User }> => {
    setIsLoading(true)

    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Kullanıcı adı ve e-posta kontrolü
    const usersJson = localStorage.getItem("roxen_users") || "[]"
    const users = JSON.parse(usersJson)

    const usernameExists = users.some((u: any) => u.username === username)
    if (usernameExists) {
      setIsLoading(false)
      return { success: false, message: "Bu kullanıcı adı zaten kullanılıyor!" }
    }

    const emailExists = users.some((u: any) => u.email === email)
    if (emailExists) {
      setIsLoading(false)
      return { success: false, message: "Bu e-posta adresi zaten kullanılıyor!" }
    }

    // Yeni kullanıcı oluştur
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password, // Gerçek uygulamada şifre hash'lenmeli!
      role: "user",
      registeredAt: new Date().toISOString(),
    }

    // Kullanıcıyı kaydet
    users.push(newUser)
    localStorage.setItem("roxen_users", JSON.stringify(users))

    // Kullanıcı oturumunu başlat
    const user: User = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: "user",
      registeredAt: newUser.registeredAt,
    }

    setUser(user)
    localStorage.setItem("roxen_user", JSON.stringify(user))

    // Sistem bilgilerini kaydet
    await saveSystemInfo(user.id)

    // Kayıt logunu ekle
    await addLog("REGISTER", user.id, user.username, `Yeni kullanıcı kaydı: ${email}`)

    setIsLoading(false)
    return { success: true, message: "Kayıt başarılı!", user }
  }

  // Çıkış yap
  const logout = async () => {
    if (user) {
      // Çıkış logunu ekle
      if (user.role === "admin") {
        await addLog("ADMIN_LOGOUT", user.id, user.username, "Admin çıkış yaptı")
      } else {
        await addLog("LOGOUT", user.id, user.username, "Kullanıcı çıkış yaptı")
      }
    }

    setUser(null)
    localStorage.removeItem("roxen_user")
    localStorage.removeItem("roxen_admin_auth")
    localStorage.removeItem("roxen_admin_user")
    localStorage.removeItem("roxen_admin_login_time")
  }

  // Admin kontrolü
  const isAdmin = () => {
    return user?.role === "admin" || localStorage.getItem("roxen_admin_auth") === "true"
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin }}>
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
