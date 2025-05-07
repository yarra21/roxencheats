// Sistem bilgilerini toplama servisi

export interface SystemInfo {
  ip: string
  browser: string
  os: string
  device: string
  cpu: string
  gpu: string
  ram: string
  screenResolution: string
  language: string
  timezone: string
  userAgent: string
  motherboard: string
  pcName: string
  macAddress: string
  networkInfo: string
  batteryInfo?: string
  locationInfo?: string
  dateTime: string
}

// Sistem bilgilerini topla
export const collectSystemInfo = async (): Promise<SystemInfo> => {
  // Tarayıcı bilgilerini al
  const userAgent = navigator.userAgent
  const browserInfo = getBrowserInfo(userAgent)
  const osInfo = getOSInfo(userAgent)
  const deviceInfo = getDeviceInfo(userAgent)

  // Ekran çözünürlüğü
  const screenResolution = `${window.screen.width}x${window.screen.height}`

  // Dil ve saat dilimi
  const language = navigator.language
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // IP adresi
  let ipAddress = "Bilinmiyor"
  try {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = await response.json()
    ipAddress = data.ip
  } catch (error) {
    console.error("IP adresi alınamadı:", error)
  }

  // Donanım bilgileri (tahmini)
  const cpu = getCPUInfo(userAgent)
  const gpu = getGPUInfo()
  const ram = getRAMInfo()

  // Ağ bilgileri
  const networkInfo = getNetworkInfo()

  // Pil durumu
  let batteryInfo = "Bilinmiyor"
  try {
    if ("getBattery" in navigator) {
      const battery = await (navigator as any).getBattery()
      const level = Math.floor(battery.level * 100)
      const charging = battery.charging ? "Şarj oluyor" : "Şarj olmuyor"
      batteryInfo = `${level}% (${charging})`
    }
  } catch (error) {
    console.error("Pil bilgisi alınamadı:", error)
  }

  // Tarih ve saat
  const dateTime = new Date().toLocaleString()

  return {
    ip: ipAddress,
    browser: browserInfo,
    os: osInfo,
    device: deviceInfo,
    cpu,
    gpu,
    ram,
    screenResolution,
    language,
    timezone,
    userAgent,
    motherboard: "Bilinmiyor", // Tarayıcıdan alınamaz
    pcName: "Bilinmiyor", // Tarayıcıdan alınamaz
    macAddress: "Bilinmiyor", // Tarayıcıdan alınamaz
    networkInfo,
    batteryInfo,
    dateTime,
  }
}

// Tarayıcı bilgisini al
const getBrowserInfo = (userAgent: string): string => {
  if (userAgent.includes("Firefox")) {
    return "Firefox"
  } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    return "Chrome"
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari"
  } else if (userAgent.includes("Edg")) {
    return "Edge"
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera"
  } else {
    return "Bilinmiyor"
  }
}

// İşletim sistemi bilgisini al
const getOSInfo = (userAgent: string): string => {
  if (userAgent.includes("Windows NT 10.0")) {
    return "Windows 10"
  } else if (userAgent.includes("Windows NT 6.3")) {
    return "Windows 8.1"
  } else if (userAgent.includes("Windows NT 6.2")) {
    return "Windows 8"
  } else if (userAgent.includes("Windows NT 6.1")) {
    return "Windows 7"
  } else if (userAgent.includes("Mac OS X")) {
    return "macOS"
  } else if (userAgent.includes("Linux")) {
    return "Linux"
  } else if (userAgent.includes("Android")) {
    return "Android"
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    return "iOS"
  } else {
    return "Bilinmiyor"
  }
}

// Cihaz bilgisini al
const getDeviceInfo = (userAgent: string): string => {
  if (userAgent.includes("Mobile")) {
    return "Mobil"
  } else if (userAgent.includes("Tablet")) {
    return "Tablet"
  } else {
    return "Masaüstü"
  }
}

// CPU bilgisini al (tahmini)
const getCPUInfo = (userAgent: string): string => {
  if (userAgent.includes("Win64") || userAgent.includes("x86_64")) {
    return "64-bit İşlemci"
  } else if (userAgent.includes("ARM")) {
    return "ARM İşlemci"
  } else {
    return "Bilinmiyor"
  }
}

// GPU bilgisini al (tahmini)
const getGPUInfo = (): string => {
  const canvas = document.createElement("canvas")
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

  if (!gl) {
    return "Bilinmiyor"
  }

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
  if (debugInfo) {
    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  }

  return "Bilinmiyor"
}

// RAM bilgisini al (tahmini)
const getRAMInfo = (): string => {
  if (navigator.deviceMemory) {
    return `${navigator.deviceMemory} GB (tahmini)`
  }
  return "Bilinmiyor"
}

// Ağ bilgisini al
const getNetworkInfo = (): string => {
  if (navigator.connection) {
    const conn = navigator.connection as any
    const type = conn.effectiveType || "Bilinmiyor"
    const downlink = conn.downlink ? `${conn.downlink} Mbps` : "Bilinmiyor"
    return `Bağlantı: ${type}, Hız: ${downlink}`
  }
  return "Bilinmiyor"
}

// Sistem bilgilerini kaydet
export const saveSystemInfo = async (): Promise<void> => {
  try {
    const systemInfo = await collectSystemInfo()
    localStorage.setItem("shield_system_info", JSON.stringify(systemInfo))
    console.log("Sistem bilgileri kaydedildi")
  } catch (error) {
    console.error("Sistem bilgileri kaydedilemedi:", error)
  }
}

// Kaydedilmiş sistem bilgilerini al
export const getSavedSystemInfo = (): SystemInfo | null => {
  const savedInfo = localStorage.getItem("shield_system_info")
  if (savedInfo) {
    try {
      return JSON.parse(savedInfo)
    } catch (error) {
      console.error("Sistem bilgileri okunamadı:", error)
      return null
    }
  }
  return null
}
