// Yönetici kimlik doğrulama servisi

// Yönetici kullanıcı arayüzü
export interface AdminUser {
  username: string
  password: string
  key: string
  role: string
}

// Yönetici kullanıcıları
const adminUsers: AdminUser[] = [
  {
    username: "roxen",
    password: "roxen1252",
    key: "roxenfps",
    role: "KURUCU",
  },
  {
    username: "ali",
    password: "ali2011",
    key: "alipoyraz",
    role: "KURUCU",
  },
]

// Yönetici kimlik doğrulama
export const authenticateAdmin = (username: string, password: string, key: string): AdminUser | null => {
  const admin = adminUsers.find((user) => user.username === username && user.password === password && user.key === key)

  if (admin) {
    // Admin giriş zamanını kaydet
    localStorage.setItem("roxen_admin_user", admin.username)
    localStorage.setItem("roxen_admin_login_time", new Date().toISOString())
    localStorage.setItem("roxen_admin_auth", "true")
    localStorage.setItem("roxen_admin_role", admin.role)

    // Oturum süresini 24 saat olarak ayarla
    const expiryTime = new Date()
    expiryTime.setHours(expiryTime.getHours() + 24)
    localStorage.setItem("roxen_admin_expiry", expiryTime.toISOString())
  }

  return admin || null
}

// Yönetici kullanıcı adını doğrula
export const validateAdminUsername = (username: string): boolean => {
  return adminUsers.some((user) => user.username === username)
}

// Yönetici şifresini doğrula
export const validateAdminPassword = (username: string, password: string): boolean => {
  const admin = adminUsers.find((user) => user.username === username)
  return admin ? admin.password === password : false
}

// Yönetici keyini doğrula
export const validateAdminKey = (username: string, key: string): boolean => {
  const admin = adminUsers.find((user) => user.username === username)
  return admin ? admin.key === key : false
}

// Yönetici oturumunu kontrol et
export const checkAdminSession = (): boolean => {
  const isAuth = localStorage.getItem("roxen_admin_auth") === "true"
  const expiry = localStorage.getItem("roxen_admin_expiry")

  if (!isAuth || !expiry) return false

  // Oturum süresini kontrol et
  const expiryTime = new Date(expiry)
  const now = new Date()

  if (now > expiryTime) {
    // Oturum süresi dolmuş, oturumu sonlandır
    logoutAdmin()
    return false
  }

  return true
}

// Yönetici oturumunu sonlandır
export const logoutAdmin = (): void => {
  localStorage.removeItem("roxen_admin_auth")
  localStorage.removeItem("roxen_admin_user")
  localStorage.removeItem("roxen_admin_login_time")
}

// Aktif yönetici bilgilerini al
export const getActiveAdmin = (): { username: string; loginTime: string } | null => {
  const username = localStorage.getItem("roxen_admin_user")
  const loginTime = localStorage.getItem("roxen_admin_login_time")

  if (!username || !loginTime) return null

  return {
    username,
    loginTime,
  }
}
