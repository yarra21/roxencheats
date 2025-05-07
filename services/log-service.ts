// Kullanıcı eylemlerini kaydetmek için log servisi

// Log türleri
export type LogAction =
  | "LOGIN"
  | "REGISTER"
  | "LOGOUT"
  | "PURCHASE_CLICK"
  | "DISCORD_VISIT"
  | "ADMIN_LOGIN"
  | "ADMIN_LOGOUT"
  | "VIEW_PRODUCT"

// Log kaydı için arayüz
export interface LogEntry {
  id: string
  timestamp: string
  userId?: string
  username?: string
  action: LogAction
  ip?: string
  details?: string
}

// Log kayıtlarını localStorage'da saklamak için anahtar
const LOGS_STORAGE_KEY = "roxen_user_logs"

// getIpAddress fonksiyonunu güncelle
import { getIpInfo } from "./ip-service"

// getIpAddress fonksiyonunu güncelle
export const getIpAddress = async (): Promise<string> => {
  try {
    const ipInfo = await getIpInfo()
    return ipInfo.ip
  } catch (error) {
    console.error("IP adresi alınamadı:", error)
    return "unknown"
  }
}

// Tüm logları getir
export const getLogs = (): LogEntry[] => {
  const logsJson = localStorage.getItem(LOGS_STORAGE_KEY)
  if (!logsJson) return []

  try {
    return JSON.parse(logsJson)
  } catch (error) {
    console.error("Loglar yüklenirken hata oluştu:", error)
    return []
  }
}

// Yeni log ekle
export const addLog = async (
  action: LogAction,
  userId?: string,
  username?: string,
  details?: string,
): Promise<LogEntry> => {
  const logs = getLogs()

  // IP adresini al
  const ip = await getIpAddress()

  // Yeni log kaydı oluştur
  const newLog: LogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    userId,
    username,
    action,
    ip,
    details,
  }

  // Logları güncelle
  const updatedLogs = [newLog, ...logs]
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs))

  return newLog
}

// Belirli bir kullanıcının loglarını getir
export const getUserLogs = (userId: string): LogEntry[] => {
  const logs = getLogs()
  return logs.filter((log) => log.userId === userId)
}

// Belirli bir eylem türüne göre logları getir
export const getLogsByAction = (action: LogAction): LogEntry[] => {
  const logs = getLogs()
  return logs.filter((log) => log.action === action)
}

// Son n adet logu getir
export const getRecentLogs = (count = 10): LogEntry[] => {
  const logs = getLogs()
  return logs.slice(0, count)
}

// Tüm logları temizle
export const clearLogs = (): void => {
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify([]))
}
