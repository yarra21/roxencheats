// Yönetici kimlik doğrulama servisi

// Yönetici kullanıcı arayüzü
export interface AdminUser {
  username: string
  password: string
  role: string
  permissions: string[]
  lastLogin?: string
}

// Yönetici kullanıcıları
const adminUsers: AdminUser[] = [
  {
    username: "ali",
    password: "ali2011",
    role: "KURUCU",
    permissions: ["all"],
  },
  {
    username: "mehmet",
    password: "mehmet1251",
    role: "KURUCU",
    permissions: ["all"],
  },
  {
    username: "admin",
    password: "admin123",
    role: "YÖNETİCİ",
    permissions: ["users", "logs", "settings"],
  },
  {
    username: "moderator",
    password: "mod123",
    role: "MODERATÖR",
    permissions: ["users", "logs"],
  },
]

// Yönetici kimlik doğrulama - key parametresini kaldırdık
export const authenticateAdmin = (username: string, password: string): AdminUser | null => {
  const admin = adminUsers.find((user) => user.username === username && user.password === password)

  if (admin) {
    // Admin giriş zamanını kaydet
    const loginTime = new Date().toISOString()
    localStorage.setItem("shield_admin_user", admin.username)
    localStorage.setItem("shield_admin_login_time", loginTime)
    localStorage.setItem("shield_admin_auth", "true")
    localStorage.setItem("shield_admin_role", admin.role)
    localStorage.setItem("shield_admin_permissions", JSON.stringify(admin.permissions))

    // Admin nesnesini güncelle
    admin.lastLogin = loginTime

    // Oturum süresini 24 saat olarak ayarla
    const expiryTime = new Date()
    expiryTime.setHours(expiryTime.getHours() + 24)
    localStorage.setItem("shield_admin_expiry", expiryTime.toISOString())
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

// Yönetici oturumunu kontrol et
export const checkAdminSession = (): boolean => {
  const isAuth = localStorage.getItem("shield_admin_auth") === "true"
  const expiry = localStorage.getItem("shield_admin_expiry")

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
  localStorage.removeItem("shield_admin_auth")
  localStorage.removeItem("shield_admin_user")
  localStorage.removeItem("shield_admin_login_time")
  localStorage.removeItem("shield_admin_role")
  localStorage.removeItem("shield_admin_permissions")
  localStorage.removeItem("shield_admin_expiry")
}

// Aktif yönetici bilgilerini al
export const getActiveAdmin = (): { username: string; role: string; loginTime: string; permissions: string[] } | null => {
  const username = localStorage.getItem("shield_admin_user")
  const role = localStorage.getItem("shield_admin_role")
  const loginTime = localStorage.getItem("shield_admin_login_time")
  const permissionsStr = localStorage.getItem("shield_admin_permissions")

  if (!username || !role || !loginTime || !permissionsStr) return null

  return {
    username,
    role,
    loginTime,
    permissions: JSON.parse(permissionsStr),
  }
}

// Tüm admin kullanıcılarını getir (şifreleri olmadan)
export const getAllAdmins = (): Omit<AdminUser, "password">[] => {
  return adminUsers.map(({ password, ...rest }) => rest)
}

// Admin yetkisini kontrol et
export const hasPermission = (permission: string): boolean => {
  const admin = getActiveAdmin()
  if (!admin) return false
  
  return admin.permissions.includes("all") || admin.permissions.includes(permission)
}
