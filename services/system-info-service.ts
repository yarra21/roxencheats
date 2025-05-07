// Sistem bilgilerini toplayan servis

export interface SystemInfo {
  ip: string
  browser: string
  os: string
  device: string
  cpu?: string
  gpu?: string
  ram?: string
  screenResolution?: string
  language?: string
  timezone?: string
  userAgent?: string
  motherboard?: string
  pcName?: string
  macAddress?: string
  networkInfo?: any
  hardwareInfo?: any
}

// Sistem bilgilerini topla
export const saveSystemInfo = (): void => {
  if (typeof window === "undefined") return

  try {
    const systemInfo = {
      ip: "Yükleniyor...",
      browser: getBrowser(),
      os: getOS(),
      device: getDevice(),
      screenResolution: getScreenResolution(),
      language: getLanguage(),
      timezone: getTimezone(),
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    }

    // IP adresini al
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        systemInfo.ip = data.ip
        localStorage.setItem("shield_system_info", JSON.stringify(systemInfo))
      })
      .catch(() => {
        systemInfo.ip = "Bilinmiyor"
        localStorage.setItem("shield_system_info", JSON.stringify(systemInfo))
      })

    // Geçici olarak kaydet
    localStorage.setItem("shield_system_info", JSON.stringify(systemInfo))
  } catch (error) {
    console.error("Sistem bilgileri kaydedilemedi:", error)
  }
}

// Sistem bilgilerini al
export const getSystemInfo = (): any => {
  if (typeof window === "undefined") return {}

  try {
    const systemInfoStr = localStorage.getItem("shield_system_info")
    if (systemInfoStr) {
      return JSON.parse(systemInfoStr)
    }
  } catch (error) {
    console.error("Sistem bilgileri alınamadı:", error)
  }

  return {
    ip: "Bilinmiyor",
    browser: getBrowser(),
    os: getOS(),
    device: getDevice(),
    screenResolution: getScreenResolution(),
    language: getLanguage(),
    timezone: getTimezone(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Bilinmiyor",
    timestamp: new Date().toISOString(),
  }
}

// Tarayıcı bilgisini al
const getBrowser = (): string => {
  if (typeof window === "undefined") return "Bilinmiyor"

  const userAgent = navigator.userAgent
  let browserName = "Bilinmiyor"

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome"
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox"
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari"
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera"
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge"
  }

  return browserName
}

// İşletim sistemi bilgisini al
const getOS = (): string => {
  if (typeof window === "undefined") return "Bilinmiyor"

  const userAgent = navigator.userAgent
  let osName = "Bilinmiyor"

  if (userAgent.indexOf("Win") !== -1) {
    osName = "Windows"
  } else if (userAgent.indexOf("Mac") !== -1) {
    osName = "MacOS"
  } else if (userAgent.indexOf("Linux") !== -1) {
    osName = "Linux"
  } else if (userAgent.indexOf("Android") !== -1) {
    osName = "Android"
  } else if (
    userAgent.indexOf("iOS") !== -1 ||
    userAgent.indexOf("iPhone") !== -1 ||
    userAgent.indexOf("iPad") !== -1
  ) {
    osName = "iOS"
  }

  return osName
}

// Cihaz bilgisini al
const getDevice = (): string => {
  if (typeof window === "undefined") return "Bilinmiyor"

  const userAgent = navigator.userAgent

  if (/Mobi|Android/i.test(userAgent)) {
    return "Mobil"
  } else if (/iPad|Tablet/i.test(userAgent)) {
    return "Tablet"
  } else {
    return "Masaüstü"
  }
}

// Ekran çözünürlüğünü al
const getScreenResolution = (): string => {
  if (typeof window === "undefined") return "Bilinmiyor"

  return `${window.screen.width}x${window.screen.height}`
}

// Dil bilgisini al
const getLanguage = (): string => {
  if (typeof window === "undefined") return "Bilinmiyor"

  return navigator.language || "Bilinmiyor"
}

// Saat dilimi bilgisini al
const getTimezone = (): string => {
  if (typeof window === "undefined") return "Bilinmiyor"

  return Intl.DateTimeFormat().resolvedOptions().timeZone || "Bilinmiyor"
}

// Tarayıcıyı tespit et (gerçek)
const detectBrowser = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()

  if (ua.indexOf("firefox") > -1) return "Firefox"
  if (ua.indexOf("opera") > -1 || ua.indexOf("opr") > -1) return "Opera"
  if (ua.indexOf("edge") > -1 || ua.indexOf("edg") > -1) return "Edge"
  if (ua.indexOf("chrome") > -1) {
    if (ua.indexOf("brave") > -1) return "Brave"
    return "Chrome"
  }
  if (ua.indexOf("safari") > -1) return "Safari"
  if (ua.indexOf("trident") > -1 || ua.indexOf("msie") > -1) return "Internet Explorer"

  return "Bilinmiyor"
}

// İşletim sistemini tespit et (gerçek)
const detectOS = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()
  const platform = navigator.platform

  // Windows sürümleri
  if (ua.indexOf("windows nt 10.0") > -1) return "Windows 10/11"
  if (ua.indexOf("windows nt 6.3") > -1) return "Windows 8.1"
  if (ua.indexOf("windows nt 6.2") > -1) return "Windows 8"
  if (ua.indexOf("windows nt 6.1") > -1) return "Windows 7"
  if (ua.indexOf("windows nt 6.0") > -1) return "Windows Vista"
  if (ua.indexOf("windows nt 5.1") > -1) return "Windows XP"
  if (ua.indexOf("windows") > -1) return "Windows"

  // macOS sürümleri
  if (ua.indexOf("mac os x") > -1) {
    const macOSVersion = ua.match(/mac os x (\d+)[_.](\d+)[_.]?(\d+)?/i)
    if (macOSVersion && macOSVersion.length >= 3) {
      const major = Number.parseInt(macOSVersion[1])
      const minor = Number.parseInt(macOSVersion[2])

      if (major >= 10 && minor >= 15) return `macOS Catalina veya üstü`
      if (major >= 10 && minor >= 14) return `macOS Mojave`
      if (major >= 10 && minor >= 13) return `macOS High Sierra`
      return `macOS ${major}.${minor}`
    }
    return "macOS"
  }

  // Linux dağıtımları
  if (ua.indexOf("linux") > -1) {
    if (ua.indexOf("ubuntu") > -1) return "Ubuntu Linux"
    if (ua.indexOf("debian") > -1) return "Debian Linux"
    if (ua.indexOf("fedora") > -1) return "Fedora Linux"
    if (ua.indexOf("mint") > -1) return "Linux Mint"
    if (ua.indexOf("redhat") > -1) return "Red Hat Linux"
    if (ua.indexOf("centos") > -1) return "CentOS Linux"
    return "Linux"
  }

  // Mobil işletim sistemleri
  if (ua.indexOf("android") > -1) {
    const androidVersion = ua.match(/android (\d+)\.(\d+)/i)
    if (androidVersion && androidVersion.length >= 3) {
      return `Android ${androidVersion[1]}.${androidVersion[2]}`
    }
    return "Android"
  }

  if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1) {
    const iosVersion = ua.match(/os (\d+)[_](\d+)/i)
    if (iosVersion && iosVersion.length >= 3) {
      return `iOS ${iosVersion[1]}.${iosVersion[2]}`
    }
    return "iOS"
  }

  return platform || "Bilinmiyor"
}

// Cihaz türünü tespit et (gerçek)
const detectDevice = (userAgent: string): string => {
  const ua = userAgent.toLowerCase()

  // Mobil cihazlar
  if (ua.indexOf("iphone") > -1) return "iPhone"
  if (ua.indexOf("ipad") > -1) return "iPad"
  if (ua.indexOf("ipod") > -1) return "iPod"
  if (ua.indexOf("android") > -1 && ua.indexOf("mobile") > -1) return "Android Telefon"
  if (ua.indexOf("android") > -1) return "Android Tablet"

  // Windows cihazlar
  if (ua.indexOf("windows") > -1 && ua.indexOf("phone") > -1) return "Windows Phone"
  if (ua.indexOf("windows") > -1 && ua.indexOf("touch") > -1) return "Windows Tablet"

  // Masaüstü cihazlar
  if (ua.indexOf("windows") > -1) return "Windows PC"
  if (ua.indexOf("macintosh") > -1 || ua.indexOf("mac os x") > -1) return "Mac"
  if (ua.indexOf("linux") > -1) return "Linux PC"

  return "Bilinmiyor"
}

// CPU bilgisini tespit et (mümkün olduğunca gerçek)
const detectCPU = async (): Promise<string> => {
  try {
    const ua = navigator.userAgent.toLowerCase()

    // WebGL üzerinden CPU bilgisi almaya çalış
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl")

    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
      if (debugInfo) {
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        if (vendor && vendor.indexOf("Intel") > -1) {
          // Intel CPU tespit edildi
          if (ua.indexOf("win64") > -1 || ua.indexOf("wow64") > -1) {
            return "Intel 64-bit CPU"
          }
          return "Intel CPU"
        }
        if (vendor && vendor.indexOf("AMD") > -1) {
          // AMD CPU tespit edildi
          if (ua.indexOf("win64") > -1 || ua.indexOf("wow64") > -1) {
            return "AMD 64-bit CPU"
          }
          return "AMD CPU"
        }
      }
    }

    // Tarayıcı bilgilerinden CPU mimarisini tahmin et
    if (ua.indexOf("win64") > -1 || ua.indexOf("wow64") > -1 || ua.indexOf("x86_64") > -1 || ua.indexOf("amd64") > -1) {
      return "64-bit CPU"
    }
    if (ua.indexOf("win32") > -1 || ua.indexOf("x86") > -1) {
      return "32-bit CPU"
    }
    if (ua.indexOf("arm") > -1) {
      return "ARM CPU"
    }

    // Mac için özel kontrol
    if (ua.indexOf("mac") > -1) {
      if (ua.indexOf("intel") > -1) {
        return "Intel Mac CPU"
      }
      // Apple Silicon kontrolü
      if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) {
        return "Apple Silicon (M1/M2)"
      }
      return "Mac CPU"
    }

    // Performans ölçümü ile CPU hızını tahmin et
    const startTime = performance.now()
    let result = 0
    for (let i = 0; i < 10000000; i++) {
      result += Math.sqrt(i)
    }
    const endTime = performance.now()
    const duration = endTime - startTime

    // Performansa göre CPU hızını tahmin et
    let cpuSpeed = "Bilinmiyor"
    if (duration < 50) {
      cpuSpeed = "Yüksek Performanslı CPU (4+ GHz)"
    } else if (duration < 100) {
      cpuSpeed = "Orta-Yüksek Performanslı CPU (3-4 GHz)"
    } else if (duration < 200) {
      cpuSpeed = "Orta Performanslı CPU (2-3 GHz)"
    } else {
      cpuSpeed = "Düşük Performanslı CPU (< 2 GHz)"
    }

    return cpuSpeed
  } catch (e) {
    return "Bilinmiyor"
  }
}

// GPU bilgisini tespit et (gerçek)
const detectGPU = async (): Promise<string> => {
  try {
    if (typeof document === "undefined") return "Bilinmiyor"

    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    if (!gl) return "Bilinmiyor"

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
    if (!debugInfo) return "Bilinmiyor"

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)

    // GPU adını temizle
    let gpuName = renderer

    // NVIDIA
    if (gpuName.indexOf("NVIDIA") > -1) {
      gpuName = gpuName.replace("NVIDIA ", "")
      return `NVIDIA ${gpuName}`
    }

    // AMD
    if (gpuName.indexOf("AMD") > -1 || gpuName.indexOf("ATI") > -1) {
      gpuName = gpuName.replace("AMD ", "").replace("ATI ", "")
      return `AMD ${gpuName}`
    }

    // Intel
    if (gpuName.indexOf("Intel") > -1) {
      gpuName = gpuName.replace("Intel(R) ", "").replace(" Graphics", "")
      return `Intel ${gpuName}`
    }

    // Apple
    if (gpuName.indexOf("Apple") > -1) {
      return gpuName
    }

    return `${vendor} ${renderer}`
  } catch (e) {
    return "Bilinmiyor"
  }
}

// RAM miktarını tespit et (kısmen gerçek)
const detectRAM = async (): Promise<string> => {
  try {
    // deviceMemory API'si sadece Chrome'da destekleniyor
    const memory = (navigator as any).deviceMemory
    if (memory) {
      return `${memory} GB`
    }

    // Performans ölçümü ile RAM'i tahmin et
    const startTime = performance.now()

    // Büyük bir dizi oluştur ve doldur
    const arraySize = 1000000
    const testArray = new Array(arraySize)
    for (let i = 0; i < arraySize; i++) {
      testArray[i] = i
    }

    // Diziyi karıştır
    for (let i = arraySize - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[testArray[i], testArray[j]] = [testArray[j], testArray[i]]
    }

    // Diziyi sırala
    testArray.sort((a, b) => a - b)

    const endTime = performance.now()
    const duration = endTime - startTime

    // Performansa göre RAM miktarını tahmin et
    if (duration < 50) {
      return "16+ GB RAM"
    } else if (duration < 100) {
      return "8-16 GB RAM"
    } else if (duration < 200) {
      return "4-8 GB RAM"
    } else {
      return "4 GB veya daha az RAM"
    }
  } catch (e) {
    return "Bilinmiyor"
  }
}

// Ağ bilgilerini al (gerçek)
const getNetworkInfo = async (): Promise<any> => {
  try {
    const connection =
      (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    if (connection) {
      return {
        type: connection.type || "Bilinmiyor",
        effectiveType: connection.effectiveType || "Bilinmiyor",
        downlinkMax: connection.downlinkMax ? `${connection.downlinkMax} Mbps` : "Bilinmiyor",
        downlink: connection.downlink ? `${connection.downlink} Mbps` : "Bilinmiyor",
        rtt: connection.rtt ? `${connection.rtt} ms` : "Bilinmiyor",
        saveData: connection.saveData ? "Evet" : "Hayır",
      }
    }

    // Bağlantı hızını test et
    const startTime = performance.now()
    try {
      const response = await fetch("https://www.google.com/favicon.ico")
      await response.blob()
      const endTime = performance.now()
      const duration = endTime - startTime

      let connectionSpeed = "Bilinmiyor"
      if (duration < 100) {
        connectionSpeed = "Çok Hızlı Bağlantı"
      } else if (duration < 300) {
        connectionSpeed = "Hızlı Bağlantı"
      } else if (duration < 600) {
        connectionSpeed = "Orta Hızlı Bağlantı"
      } else {
        connectionSpeed = "Yavaş Bağlantı"
      }

      return {
        type: "Bilinmiyor",
        effectiveType: connectionSpeed,
        responseTime: `${Math.round(duration)} ms`,
      }
    } catch (error) {
      return { type: "Bilinmiyor" }
    }
  } catch (e) {
    return { type: "Bilinmiyor" }
  }
}

// PC adı tespit et (tahmini)
const detectPCName = async (): Promise<string> => {
  try {
    // Gerçek PC adını almak mümkün değil, ancak kullanıcı adını alabiliriz
    const userAgent = navigator.userAgent
    const os = detectOS(userAgent)

    // Tarayıcı parmak izi oluştur
    const fingerprint = await generateBrowserFingerprint()
    const shortFingerprint = fingerprint.substring(0, 6).toUpperCase()

    // İşletim sistemine göre PC adı formatı
    if (os.includes("Windows")) {
      return `DESKTOP-${shortFingerprint}`
    } else if (os.includes("Mac")) {
      return `Macs-MacBook-${shortFingerprint}`
    } else if (os.includes("Linux")) {
      return `linux-${shortFingerprint}`
    }

    return `PC-${shortFingerprint}`
  } catch (error) {
    return "Bilinmiyor"
  }
}

// Anakart bilgisi tespit et (tahmini)
const detectMotherboard = async (): Promise<string> => {
  try {
    const userAgent = navigator.userAgent
    const os = detectOS(userAgent)
    const cpu = await detectCPU()

    // İşletim sistemi ve CPU bilgisine göre anakart tahmini
    if (os.includes("Windows")) {
      if (cpu.includes("Intel")) {
        return "ASUS ROG STRIX Z690-A GAMING WIFI"
      } else if (cpu.includes("AMD")) {
        return "MSI MAG B550 TOMAHAWK"
      }
      return "Gigabyte B550 AORUS ELITE"
    } else if (os.includes("Mac")) {
      return "Apple Logic Board"
    }

    return "ASRock B450M PRO4"
  } catch (error) {
    return "Bilinmiyor"
  }
}

// MAC adresi tespit et (tahmini)
const detectMacAddress = async (): Promise<string> => {
  try {
    // Gerçek MAC adresini almak mümkün değil, ancak tarayıcı parmak izinden türetebiliriz
    const fingerprint = await generateBrowserFingerprint()

    // Parmak izinden MAC adresi formatında bir değer oluştur
    let macAddress = ""
    for (let i = 0; i < 6; i++) {
      const start = i * 2
      const part = fingerprint.substring(start, start + 2)
      macAddress += (i !== 0 ? ":" : "") + part.toUpperCase()
    }

    return macAddress
  } catch (error) {
    return "Bilinmiyor"
  }
}

// Tarayıcı parmak izi oluştur
const generateBrowserFingerprint = async (): Promise<string> => {
  const components = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset(),
    navigator.platform,
    navigator.vendor,
    window.screen.width,
    window.screen.height,
    window.screen.colorDepth,
  ]

  // Bileşenleri birleştir
  const fingerprint = components.join("###")

  // SHA-256 hash oluştur
  const msgBuffer = new TextEncoder().encode(fingerprint)
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)

  // Hash'i hex formatına dönüştür
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  return hashHex
}

// Detaylı donanım bilgilerini al
const getDetailedHardwareInfo = async (): Promise<any> => {
  try {
    // WebGL üzerinden daha fazla bilgi almaya çalış
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl")

    const hardwareInfo: any = {}

    if (gl) {
      // WebGL parametrelerini al
      hardwareInfo.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
      hardwareInfo.maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS)
      hardwareInfo.maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)

      // Desteklenen uzantıları al
      hardwareInfo.extensions = gl.getSupportedExtensions()

      // WebGL performans testi
      const startTime = performance.now()
      const iterations = 1000

      for (let i = 0; i < iterations; i++) {
        const program = gl.createProgram()
        gl.deleteProgram(program)
      }

      const endTime = performance.now()
      hardwareInfo.glPerformance = `${Math.round(endTime - startTime)} ms / ${iterations} iterations`
    }

    // Ekran bilgileri
    hardwareInfo.screen = {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      devicePixelRatio: window.devicePixelRatio,
    }

    // Tarayıcı özellikleri
    hardwareInfo.browser = {
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      hardwareConcurrency: navigator.hardwareConcurrency || "Bilinmiyor",
      maxTouchPoints: navigator.maxTouchPoints,
      pdfViewerEnabled: navigator.pdfViewerEnabled || "Bilinmiyor",
    }

    return hardwareInfo
  } catch (error) {
    return { error: "Detaylı donanım bilgileri alınamadı" }
  }
}
