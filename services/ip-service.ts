// IP ve internet bilgilerini almak için geliştirilmiş servis

interface IpInfo {
  ip: string
  city?: string
  region?: string
  country?: string
  loc?: string
  org?: string
  postal?: string
  timezone?: string
  asn?: string
  isp?: string
  userAgent?: string
  browser?: string
  browserVersion?: string
  engine?: string
  os?: string
  osVersion?: string
  device?: string
  deviceVendor?: string
  deviceModel?: string
  cpu?: string
  connectionType?: string
  screenResolution?: string
  colorDepth?: string
  language?: string
  languages?: string[]
  doNotTrack?: boolean
  cookiesEnabled?: boolean
  plugins?: string[]
  canvas?: string
  webgl?: string
  webglVendor?: string
  webglRenderer?: string
  battery?: any
  hardwareConcurrency?: number
  deviceMemory?: number
  platform?: string
  touchPoints?: number
  usbDevices?: number
  mediaDevices?: any
  networkInformation?: any
  referrer?: string
  timeZoneOffset?: number
  sessionStorage?: boolean
  localStorage?: boolean
  indexedDB?: boolean
  addBehavior?: boolean
  openDatabase?: boolean
  cpuClass?: string
  webdriver?: boolean
  adBlocker?: boolean
  hasLiedLanguages?: boolean
  hasLiedResolution?: boolean
  hasLiedOs?: boolean
  hasLiedBrowser?: boolean
  touchSupport?: boolean
  fonts?: string[]
  audio?: string
  visitTime?: string
  lastVisitTime?: string
  visitCount?: number
  fingerprint?: string
}

// IP bilgilerini al - geliştirilmiş versiyon
export const getIpInfo = async (): Promise<IpInfo> => {
  try {
    if (typeof window === 'undefined') {
      return { ip: 'server-side' };
    }
    
    // ipify API'den IP adresini al
    const ipResponse = await fetch("https://api.ipify.org?format=json")
    const ipData = await ipResponse.json()
    const ip = ipData.ip

    // ipinfo.io API'den detaylı bilgileri al
    const infoResponse = await fetch(`https://ipinfo.io/${ip}/json`)
    const infoData = await infoResponse.json()

    // Tarayıcı ve cihaz bilgilerini al
    const userAgent = navigator.userAgent
    const browser = detectBrowser(userAgent)
    const browserVersion = detectBrowserVersion(userAgent)
    const engine = detectEngine(userAgent)
    const os = detectOS(userAgent)
    const osVersion = detectOSVersion(userAgent)
    const device = detectDevice(userAgent)
    const deviceVendor = detectDeviceVendor(userAgent)
    const deviceModel = detectDeviceModel(userAgent)
    const cpu = detectCPU(userAgent)

    // Bağlantı türünü tespit et
    const connectionType = detectConnectionType()

    // Ekran bilgilerini al
    const screenResolution = `${window.screen.width}x${window.screen.height}`
    const colorDepth = `${window.screen.colorDepth}-bit`

    // Dil bilgilerini al
    const language = navigator.language
    const languages = navigator.languages ? Array.from(navigator.languages) : [navigator.language]

    // Tarayıcı özellikleri
    const doNotTrack = navigator.doNotTrack === "1" || window.doNotTrack === "1"
    const cookiesEnabled = navigator.cookieEnabled

    // Eklentileri al
    const plugins = getPlugins()

    // Canvas ve WebGL parmak izi
    const canvas = getCanvasFingerprint()
    const webglInfo = getWebGLInfo()

    // Donanım bilgileri
    const hardwareConcurrency = navigator.hardwareConcurrency || 0
    const deviceMemory = (navigator as any).deviceMemory || 0
    const platform = navigator.platform
    const touchPoints = (navigator as any).maxTouchPoints || 0

    // Zaman bilgileri
    const timeZoneOffset = new Date().getTimezoneOffset()
    const visitTime = new Date().toISOString()

    // Depolama bilgileri
    const sessionStorage = !!window.sessionStorage
    const localStorage = !!window.localStorage
    const indexedDB = !!window.indexedDB

    // Tarayıcı davranışları
    const webdriver = navigator.webdriver || false

    // Parmak izi oluştur
    const fingerprint = await generateFingerprint({
      userAgent,
      screenResolution,
      colorDepth,
      language,
      timezone: infoData.timezone,
      plugins: plugins.join(","),
      canvas,
      webgl: webglInfo.webgl,
      hardwareConcurrency,
      deviceMemory,
      platform,
    })

    return {
      ip,
      city: infoData.city,
      region: infoData.region,
      country: infoData.country,
      loc: infoData.loc,
      org: infoData.org,
      postal: infoData.postal,
      timezone: infoData.timezone,
      asn: infoData.asn?.asn,
      isp: infoData.asn?.name || infoData.org,
      userAgent,
      browser,
      browserVersion,
      engine,
      os,
      osVersion,
      device,
      deviceVendor,
      deviceModel,
      cpu,
      connectionType,
      screenResolution,
      colorDepth,
      language,
      languages,
      doNotTrack,
      cookiesEnabled,
      plugins,
      canvas,
      webgl: webglInfo.webgl,
      webglVendor: webglInfo.vendor,
      webglRenderer: webglInfo.renderer,
      hardwareConcurrency,
      deviceMemory,
      platform,
      touchPoints,
      timeZoneOffset,
      sessionStorage,
      localStorage,
      indexedDB,
      webdriver,
      visitTime,
      fingerprint,
      referrer: document.referrer,
      visitCount: incrementVisitCount(),
    }
  } catch (error) {
    console.error("IP bilgileri alınamadı:", error)
    return {
      ip: "unknown",
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      visitTime: new Date().toISOString(),
    }
  }
}

// Tarayıcıyı tespit et - geliştirilmiş versiyon
const detectBrowser = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()

  if (ua.indexOf("firefox") > -1) return "Firefox"
  if (ua.indexOf("opera") > -1 || ua.indexOf("opr") > -1) return "Opera"
  if (ua.indexOf("edge") > -1 || ua.indexOf("edg") > -1) return "Edge"
  if (ua.indexOf("chrome") > -1) return "Chrome"
  if (ua.indexOf("safari") > -1) return "Safari"
  if (ua.indexOf("trident") > -1 || ua.indexOf("msie") > -1) return "Internet Explorer"
  if (ua.indexOf("brave") > -1) return "Brave"
  if (ua.indexOf("vivaldi") > -1) return "Vivaldi"
  if (ua.indexOf("yandex") > -1) return "Yandex"

  return "Unknown"
}

// Tarayıcı versiyonunu tespit et
const detectBrowserVersion = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()
  let match

  // Chrome
  if ((match = ua.match(/chrome\/(\d+\.\d+)/))) return match[1]

  // Firefox
  if ((match = ua.match(/firefox\/(\d+\.\d+)/))) return match[1]

  // Safari
  if ((match = ua.match(/version\/(\d+\.\d+).*safari/))) return match[1]

  // Edge
  if ((match = ua.match(/edge\/(\d+\.\d+)/)) || (match = ua.match(/edg\/(\d+\.\d+)/))) return match[1]

  // Opera
  if ((match = ua.match(/opr\/(\d+\.\d+)/))) return match[1]

  // IE
  if ((match = ua.match(/msie (\d+\.\d+)/)) || (match = ua.match(/rv:(\d+\.\d+)/))) return match[1]

  return "Unknown"
}

// Tarayıcı motorunu tespit et
const detectEngine = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()

  if (ua.indexOf("gecko") > -1) return "Gecko"
  if (ua.indexOf("webkit") > -1) return "WebKit"
  if (ua.indexOf("trident") > -1) return "Trident"
  if (ua.indexOf("blink") > -1) return "Blink"
  if (ua.indexOf("presto") > -1) return "Presto"

  return "Unknown"
}

// İşletim sistemini tespit et - geliştirilmiş versiyon
const detectOS = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()

  if (ua.indexOf("windows nt 10.0") > -1) return "Windows 10"
  if (ua.indexOf("windows nt 6.3") > -1) return "Windows 8.1"
  if (ua.indexOf("windows nt 6.2") > -1) return "Windows 8"
  if (ua.indexOf("windows nt 6.1") > -1) return "Windows 7"
  if (ua.indexOf("windows nt 6.0") > -1) return "Windows Vista"
  if (ua.indexOf("windows nt 5.1") > -1) return "Windows XP"
  if (ua.indexOf("windows nt") > -1) return "Windows"

  if (ua.indexOf("mac os x") > -1) return "macOS"
  if (ua.indexOf("macintosh") > -1) return "macOS"

  if (ua.indexOf("android") > -1) return "Android"
  if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1) return "iOS"

  if (ua.indexOf("linux") > -1) return "Linux"
  if (ua.indexOf("ubuntu") > -1) return "Ubuntu"
  if (ua.indexOf("fedora") > -1) return "Fedora"
  if (ua.indexOf("debian") > -1) return "Debian"

  if (ua.indexOf("cros") > -1) return "Chrome OS"
  if (ua.indexOf("windows phone") > -1) return "Windows Phone"

  return "Unknown"
}

// İşletim sistemi versiyonunu tespit et
const detectOSVersion = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()
  let match

  // Windows
  if ((match = ua.match(/windows nt (\d+\.\d+)/))) {
    const version = match[1]
    switch (version) {
      case "10.0":
        return "10"
      case "6.3":
        return "8.1"
      case "6.2":
        return "8"
      case "6.1":
        return "7"
      case "6.0":
        return "Vista"
      case "5.1":
        return "XP"
      default:
        return version
    }
  }

  // macOS
  if ((match = ua.match(/mac os x (\d+[._]\d+[._]\d+)/))) {
    return match[1].replace(/_/g, ".")
  }

  // Android
  if ((match = ua.match(/android (\d+\.\d+)/))) {
    return match[1]
  }

  // iOS
  if ((match = ua.match(/os (\d+[._]\d+) like mac os/))) {
    return match[1].replace(/_/g, ".")
  }

  return "Unknown"
}

// Cihaz türünü tespit et - geliştirilmiş versiyon
const detectDevice = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()

  if (ua.indexOf("iphone") > -1) return "iPhone"
  if (ua.indexOf("ipad") > -1) return "iPad"
  if (ua.indexOf("ipod") > -1) return "iPod"

  if (ua.indexOf("android") > -1) {
    if (ua.indexOf("mobile") > -1) return "Android Phone"
    return "Android Tablet"
  }

  if (ua.indexOf("windows phone") > -1) return "Windows Phone"
  if (ua.indexOf("blackberry") > -1) return "BlackBerry"

  if (ua.indexOf("macintosh") > -1 || ua.indexOf("mac os") > -1) return "Mac"
  if (ua.indexOf("windows") > -1) return "Windows PC"
  if (ua.indexOf("linux") > -1) return "Linux PC"

  if (ua.indexOf("mobile") > -1 || ua.indexOf("tablet") > -1) return "Mobile Device"

  return "Desktop"
}

// Cihaz üreticisini tespit et
const detectDeviceVendor = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()

  if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1 || ua.indexOf("macintosh") > -1)
    return "Apple"
  if (ua.indexOf("samsung") > -1) return "Samsung"
  if (ua.indexOf("huawei") > -1) return "Huawei"
  if (ua.indexOf("xiaomi") > -1) return "Xiaomi"
  if (ua.indexOf("oppo") > -1) return "Oppo"
  if (ua.indexOf("vivo") > -1) return "Vivo"
  if (ua.indexOf("lg") > -1) return "LG"
  if (ua.indexOf("sony") > -1) return "Sony"
  if (ua.indexOf("htc") > -1) return "HTC"
  if (ua.indexOf("nokia") > -1) return "Nokia"
  if (ua.indexOf("motorola") > -1) return "Motorola"
  if (ua.indexOf("lenovo") > -1) return "Lenovo"
  if (ua.indexOf("asus") > -1) return "Asus"
  if (ua.indexOf("acer") > -1) return "Acer"
  if (ua.indexOf("dell") > -1) return "Dell"
  if (ua.indexOf("hp") > -1 || ua.indexOf("hewlett-packard") > -1) return "HP"

  return "Unknown"
}

// Cihaz modelini tespit et
const detectDeviceModel = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()
  let match

  // iPhone modeli
  if ((match = ua.match(/iphone(?:\s+os)?\s+(\d+[._]\d+)/))) {
    return `iPhone ${match[1].replace(/_/g, ".")}`
  }

  // iPad modeli
  if ((match = ua.match(/ipad(?:\s+os)?\s+(\d+[._]\d+)/))) {
    return `iPad ${match[1].replace(/_/g, ".")}`
  }

  // Samsung modeli
  if ((match = ua.match(/sm-([a-z0-9]+)/i))) {
    return `SM-${match[1].toUpperCase()}`
  }

  return "Unknown Model"
}

// CPU bilgisini tespit et
const detectCPU = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()

  if (ua.indexOf("win64") > -1 || ua.indexOf("wow64") > -1) return "x64"
  if (ua.indexOf("win32") > -1) return "x86"
  if (ua.indexOf("x86_64") > -1) return "x64"
  if (ua.indexOf("x86") > -1) return "x86"
  if (ua.indexOf("arm") > -1) return "ARM"
  if (ua.indexOf("aarch64") > -1) return "ARM64"
  if (ua.indexOf("intel") > -1) return "Intel"
  if (ua.indexOf("ppc") > -1) return "PowerPC"
  if (ua.indexOf("sparc") > -1) return "SPARC"

  return "Unknown"
}

// Bağlantı türünü tespit et - geliştirilmiş versiyon
const detectConnectionType = (): string => {
  if (typeof navigator === 'undefined' || !navigator.connection) {
    // Tahmini bağlantı türü
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return "Offline"
    return "Unknown"
  }

  const connection = navigator.connection as any

  if (connection.type) {
    return connection.type // wifi, cellular, ethernet, none, unknown
  }

  if (connection.effectiveType) {
    return connection.effectiveType // 4g, 3g, 2g, slow-2g
  }

  return "Unknown"
}

// Tarayıcı eklentilerini al
const getPlugins = (): string[] => {
  const plugins: string[] = []

  if (typeof navigator === 'undefined' || !navigator.plugins || navigator.plugins.length === 0) {
    return plugins
  }

  for (let i = 0; i < navigator.plugins.length; i++) {
    const plugin = navigator.plugins[i]
    if (plugin) {
      plugins.push(plugin.name)
    }
  }

  return plugins
}

// Canvas parmak izi oluştur
const getCanvasFingerprint = (): string => {
  try {
    if (typeof document === 'undefined') return 'server-side';
    
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return "canvas-not-supported"

    // Canvas boyutu
    canvas.width = 200
    canvas.height = 50

    // Metin ve şekiller çiz
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillStyle = "#f60"
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = "#069"
    ctx.fillText("ROXEN.AIM", 2, 15)
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)"
    ctx.fillText("ROXEN.AIM", 4, 17)

    // Canvas verisini base64'e dönüştür
    const dataURL = canvas.toDataURL()

    // Basit bir hash oluştur
    let hash = 0
    for (let i = 0; i < dataURL.length; i++) {
      hash = (hash << 5) - hash + dataURL.charCodeAt(i)
      hash = hash & hash // 32-bit integer
    }

    return hash.toString(16)
  } catch (e) {
    return "canvas-error"
  }
}

// WebGL bilgilerini al
const getWebGLInfo = () => {
  try {
    if (typeof document === 'undefined') {
      return { webgl: "server-side", vendor: "unknown", renderer: "unknown" };
    }
    
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    if (!gl) return { webgl: "not-supported", vendor: "unknown", renderer: "unknown" }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")

    if (!debugInfo) return { webgl: "supported", vendor: "unknown", renderer: "unknown" }

    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

    // WebGL parmak izi oluştur
    const webglFingerprint = `${vendor}-${renderer}`
    let hash = 0
    for (let i = 0; i < webglFingerprint.length; i++) {
      hash = (hash << 5) - hash + webglFingerprint.charCodeAt(i)
      hash = hash & hash
    }

    return {
      webgl: hash.toString(16),
      vendor: vendor,
      renderer: renderer,
    }
  } catch (e) {
    return { webgl: "webgl-error", vendor: "unknown", renderer: "unknown" }
  }
}

// Ziyaret sayısını artır
const incrementVisitCount = (): number => {
  try {
    if (typeof localStorage === 'undefined') return 1;
    
    const visitCountKey = "roxen_visit_count"
    const count = Number.parseInt(localStorage.getItem(visitCountKey) || "0", 10)
    const newCount = count + 1
    localStorage.setItem(visitCountKey, newCount.toString())
    return newCount
  } catch (e) {
    return 1
  }
}

// Parmak izi oluştur
const generateFingerprint = async (data: any): Promise<string> => {
  try {
    // Veriyi JSON'a dönüştür
    const jsonData = JSON.stringify(data)

    // SHA-256 hash oluştur
    if (typeof crypto === 'undefined') return 'server-side';
    
    const msgBuffer = new TextEncoder().encode(jsonData)
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    return hashHex
  } catch (e) {
    // Basit bir hash oluştur
    let hash = 0
    const str = JSON.stringify(data)
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
      hash = hash & hash
    }
    return hash.toString(16)
  }
}

// IP bilgilerini kaydet - geliştirilmiş versiyon
export const saveIpInfo = async (userId?: string, username?: string): Promise<void> => {
  try {
    if (typeof window === 'undefined') return;
    
    const ipInfo = await getIpInfo()

    // Ziyaret zamanını ekle
    const visitTime = new Date().toISOString()
    const lastVisitTime = localStorage.getItem("roxen_last_visit") || null
    localStorage.setItem("roxen_last_visit", visitTime)

    // Tam bilgileri kaydet
    const fullInfo = {
      ...ipInfo,
      userId,
      username: username || "Ziyaretçi",
      visitTime,
      lastVisitTime,
      pageUrl: window.location.href,
      referrer: document.referrer,
      timestamp: Date.now(),
    }

    // localStorage'a kaydet
    const ipLogsKey = "roxen_ip_logs"
    const existingLogs = localStorage.getItem(ipLogsKey) || "[]"
    const logs = JSON.parse(existingLogs)

    logs.push({
      id: `ip_${Date.now()}`,
      ...fullInfo,
    })

    localStorage.setItem(ipLogsKey, JSON.stringify(logs))

    // Admin IP'sini kaydet
    if (username && localStorage.getItem("roxen_admin_user") === username) {
      localStorage.setItem("roxen_admin_ip", ipInfo.ip)
      localStorage.setItem("roxen_admin_ip_info", JSON.stringify(ipInfo))
    }

    // Konsola bilgi yaz (geliştirme amaçlı)
    console.log("Kullanıcı bilgileri kaydedildi:", fullInfo)
  } catch (error) {
    console.error("IP bilgileri kaydedilemedi:", error)
  }
}

// getIpAddress fonksiyonu
export const getIpAddress = async (): Promise<string> => {
  try {
    if (typeof window === 'undefined') return 'server-side';
    
    const ipInfo = await getIpInfo()
    return ipInfo.ip
  } catch (error) {
    console.error("IP adresi alınamadı:", error)
    return "unknown"
  }
}
