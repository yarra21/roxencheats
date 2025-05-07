"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Users,
  Package,
  Settings,
  LogOut,
  BarChart,
  Plus,
  Edit,
  Trash,
  Eye,
  Search,
  RefreshCw,
  Save,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Upload,
  Server,
  Globe,
  Code,
  Terminal,
  Check,
  Wifi,
} from "lucide-react"
import Image from "next/image"

interface AdminDashboardProps {
  isOpen: boolean
  onClose: () => void
}

// Örnek kullanıcı log verileri
const initialLogs = [
  { id: 1, username: "user123", action: "Giriş yapıldı", timestamp: "2023-04-12T08:30:00Z", ip: "192.168.1.1" },
  { id: 2, username: "admin", action: "Ürün eklendi: ROXEN.AIM", timestamp: "2023-04-12T09:15:00Z", ip: "192.168.1.2" },
  { id: 3, username: "user456", action: "Çıkış yapıldı", timestamp: "2023-04-12T10:45:00Z", ip: "192.168.1.3" },
  { id: 4, username: "roxen", action: "Admin girişi yapıldı", timestamp: "2023-04-12T11:20:00Z", ip: "192.168.1.4" },
  {
    id: 5,
    username: "ali",
    action: "Ürün güncellendi: Vanguard Bypass",
    timestamp: "2023-04-12T12:10:00Z",
    ip: "192.168.1.5",
  },
]

// Örnek ürün verileri
const initialProducts = [
  {
    id: 1,
    name: "ROXEN.AIM Valorant",
    price: 1400,
    priceMonthly: 2300,
    description: "Valorant için gelişmiş aimbot ve ESP özellikleri",
    features: ["Aimbot", "ESP", "Radar Hack", "No Recoil"],
    active: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "ROXEN Vanguard Bypass",
    price: 1200,
    priceMonthly: 2000,
    description: "Valorant Vanguard anti-cheat bypass çözümü",
    features: ["Anti-detection", "Kernel Level", "Auto-update"],
    active: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "ROXEN CSGO",
    price: 900,
    priceMonthly: 1500,
    description: "CSGO için gelişmiş hile paketi",
    features: ["Aimbot", "Wallhack", "Skin Changer"],
    active: false,
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Örnek kayıtlı kullanıcılar
const initialRegisteredUsers = [
  {
    id: "user-1",
    username: "valorant_player1",
    email: "player1@example.com",
    registeredAt: "2023-03-15T10:30:00Z",
    lastLogin: "2023-04-12T15:45:00Z",
    status: "active",
    subscription: "monthly",
    ip: "45.123.45.67",
  },
  {
    id: "user-2",
    username: "gamer_pro",
    email: "gamer@example.com",
    registeredAt: "2023-03-18T14:20:00Z",
    lastLogin: "2023-04-11T09:15:00Z",
    status: "active",
    subscription: "weekly",
    ip: "78.156.32.91",
  },
  {
    id: "user-3",
    username: "fps_master",
    email: "master@example.com",
    registeredAt: "2023-03-20T11:10:00Z",
    lastLogin: "2023-04-10T22:30:00Z",
    status: "inactive",
    subscription: "none",
    ip: "192.168.14.23",
  },
]

// Örnek deploy geçmişi
const initialDeployHistory = [
  {
    id: 1,
    version: "1.2.3",
    deployedAt: "2023-04-10T14:30:00Z",
    status: "success",
    changes: "Yeni ürünler eklendi, arayüz iyileştirmeleri yapıldı",
    deployedBy: "roxen",
  },
  {
    id: 2,
    version: "1.2.2",
    deployedAt: "2023-04-05T10:15:00Z",
    status: "success",
    changes: "Hata düzeltmeleri ve performans iyileştirmeleri",
    deployedBy: "ali",
  },
  {
    id: 3,
    version: "1.2.1",
    deployedAt: "2023-04-01T09:45:00Z",
    status: "failed",
    changes: "Yeni ödeme sistemi entegrasyonu",
    deployedBy: "roxen",
  },
]

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [logs, setLogs] = useState(initialLogs)
  const [products, setProducts] = useState(initialProducts)
  const [registeredUsers, setRegisteredUsers] = useState(initialRegisteredUsers)
  const [deployHistory, setDeployHistory] = useState(initialDeployHistory)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentAdminUser, setCurrentAdminUser] = useState("")
  const [loginTime, setLoginTime] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploySuccess, setDeploySuccess] = useState(false)
  const [deployMessage, setDeployMessage] = useState("")
  const [adminIp, setAdminIp] = useState("")

  // Admin bilgilerini localStorage'dan al
  useEffect(() => {
    if (isOpen) {
      const adminUser = localStorage.getItem("roxen_admin_user") || ""
      const loginTime = localStorage.getItem("roxen_admin_login_time") || ""
      const adminIp = localStorage.getItem("roxen_admin_ip") || "Bilinmiyor"

      setCurrentAdminUser(adminUser)
      setLoginTime(loginTime)
      setAdminIp(adminIp)

      // Admin girişi logunu ekle
      const newLog = {
        id: logs.length + 1,
        username: adminUser,
        action: "Admin paneline giriş yapıldı",
        timestamp: new Date().toISOString(),
        ip: adminIp,
      }

      setLogs([newLog, ...logs])

      // Kayıtlı kullanıcıları localStorage'dan al
      const usersJson = localStorage.getItem("roxen_users") || "[]"
      try {
        const parsedUsers = JSON.parse(usersJson)
        if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
          const formattedUsers = parsedUsers.map((user: any) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            registeredAt: user.registeredAt,
            lastLogin: user.lastLogin || "Bilinmiyor",
            status: "active",
            subscription: "none",
            ip: user.ip || "Bilinmiyor",
          }))
          setRegisteredUsers([...formattedUsers, ...initialRegisteredUsers])
        }
      } catch (error) {
        console.error("Kullanıcı verileri yüklenirken hata oluştu:", error)
      }

      // Kayıtlı ürünleri localStorage'dan al
      const productsJson = localStorage.getItem("roxen_products") || "[]"
      try {
        const parsedProducts = JSON.parse(productsJson)
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          setProducts(parsedProducts)
        }
      } catch (error) {
        console.error("Ürün verileri yüklenirken hata oluştu:", error)
      }
    }
  }, [isOpen])

  // ESC tuşuna basıldığında modalı kapat
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleLogout()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // Modal açıkken body scroll'u engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleLogout = () => {
    // Çıkış logu ekle
    const newLog = {
      id: logs.length + 1,
      username: currentAdminUser,
      action: "Admin panelinden çıkış yapıldı",
      timestamp: new Date().toISOString(),
      ip: adminIp,
    }

    setLogs([newLog, ...logs])

    // Admin bilgilerini temizle
    localStorage.removeItem("roxen_admin_user")
    localStorage.removeItem("roxen_admin_auth")
    localStorage.removeItem("roxen_admin_login_time")

    onClose()
  }

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: "Yeni Ürün",
      price: 0,
      priceMonthly: 0,
      description: "Ürün açıklaması",
      features: ["Özellik 1", "Özellik 2"],
      active: false,
      image: "/placeholder.svg?height=100&width=100",
    }

    setEditingProduct(newProduct)
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct({ ...product })
  }

  // handleSaveProduct fonksiyonunu güncelleyelim
  const handleSaveProduct = () => {
    if (!editingProduct) return

    // Ürün ID'si varsa güncelle, yoksa yeni ekle
    if (editingProduct.id) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)))

      // Log ekle
      const newLog = {
        id: logs.length + 1,
        username: currentAdminUser,
        action: `Ürün güncellendi: ${editingProduct.name}`,
        timestamp: new Date().toISOString(),
        ip: adminIp,
      }
      setLogs([newLog, ...logs])

      // LocalStorage'a kaydet
      localStorage.setItem(
        "roxen_products",
        JSON.stringify(products.map((p) => (p.id === editingProduct.id ? editingProduct : p))),
      )
    } else {
      const newProduct = {
        ...editingProduct,
        id: Math.max(...products.map((p) => p.id)) + 1,
      }
      const updatedProducts = [...products, newProduct]
      setProducts(updatedProducts)

      // Log ekle
      const newLog = {
        id: logs.length + 1,
        username: currentAdminUser,
        action: `Yeni ürün eklendi: ${editingProduct.name}`,
        timestamp: new Date().toISOString(),
        ip: adminIp,
      }
      setLogs([newLog, ...logs])

      // LocalStorage'a kaydet
      localStorage.setItem("roxen_products", JSON.stringify(updatedProducts))
    }

    setEditingProduct(null)
  }

  // handleDeleteProduct fonksiyonunu güncelleyelim
  const handleDeleteProduct = (id: number) => {
    const product = products.find((p) => p.id === id)

    if (confirm(`"${product?.name}" ürününü silmek istediğinize emin misiniz?`)) {
      const updatedProducts = products.filter((p) => p.id !== id)
      setProducts(updatedProducts)

      // Log ekle
      const newLog = {
        id: logs.length + 1,
        username: currentAdminUser,
        action: `Ürün silindi: ${product?.name}`,
        timestamp: new Date().toISOString(),
        ip: adminIp,
      }
      setLogs([newLog, ...logs])

      // LocalStorage'a kaydet
      localStorage.setItem("roxen_products", JSON.stringify(updatedProducts))
    }
  }

  const handleToggleProductStatus = (id: number) => {
    const product = products.find((p) => p.id === id)

    setProducts(
      products.map((p) => {
        if (p.id === id) {
          return { ...p, active: !p.active }
        }
        return p
      }),
    )

    // Log ekle
    const newLog = {
      id: logs.length + 1,
      username: currentAdminUser,
      action: `Ürün durumu değiştirildi: ${product?.name} (${product?.active ? "Pasif" : "Aktif"})`,
      timestamp: new Date().toISOString(),
      ip: adminIp,
    }
    setLogs([newLog, ...logs])
  }

  const handleDeploySite = () => {
    setIsDeploying(true)
    setDeployMessage("Site dağıtımı başlatıldı. Bu işlem birkaç dakika sürebilir...")

    // Simüle edilmiş deploy işlemi
    setTimeout(() => {
      setIsDeploying(false)
      setDeploySuccess(true)
      setDeployMessage("Site başarıyla dağıtıldı!")

      // Yeni deploy kaydı ekle
      const newVersion = `1.2.${deployHistory[0].version.split(".")[2] * 1 + 1}`
      const newDeploy = {
        id: deployHistory.length + 1,
        version: newVersion,
        deployedAt: new Date().toISOString(),
        status: "success",
        changes: "Site güncellemesi ve yeni özellikler",
        deployedBy: currentAdminUser,
      }

      setDeployHistory([newDeploy, ...deployHistory])

      // Log ekle
      const newLog = {
        id: logs.length + 1,
        username: currentAdminUser,
        action: `Site dağıtıldı: Versiyon ${newVersion}`,
        timestamp: new Date().toISOString(),
        ip: adminIp,
      }
      setLogs([newLog, ...logs])

      // 3 saniye sonra mesajı temizle
      setTimeout(() => {
        setDeploySuccess(false)
        setDeployMessage("")
      }, 3000)
    }, 3000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUsers = registeredUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={handleLogout}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gray-900/95 w-full max-w-6xl h-[90vh] rounded-lg border border-red-500 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
              <div className="flex items-center">
                <h2 className="text-xl font-bold neon-text">
                  ROXEN<span className="text-cyan-400 neon-text-cyan">.AIM</span>
                  <span className="ml-2 text-red-500">Admin Panel</span>
                </h2>
              </div>
              <div className="flex items-center">
                <div className="mr-4 text-sm text-gray-400">
                  <span className="font-semibold text-white">{currentAdminUser}</span> olarak giriş yapıldı
                  {loginTime && <span className="ml-2 text-xs">({formatDate(loginTime)})</span>}
                </div>
                <div className="flex items-center mr-4 text-sm text-gray-400">
                  <Wifi className="w-4 h-4 mr-1 text-blue-400" />
                  <span className="font-mono text-blue-400">{adminIp}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <LogOut size={18} className="mr-1" />
                  <span className="text-sm">Çıkış</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex h-[calc(90vh-60px)]">
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-800 bg-gray-900/50 p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "dashboard"
                        ? "bg-red-500/20 text-white border border-red-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <BarChart size={18} className="mr-2" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("users")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "users"
                        ? "bg-red-500/20 text-white border border-red-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Users size={18} className="mr-2" />
                    <span>Kullanıcılar</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("products")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "products"
                        ? "bg-red-500/20 text-white border border-red-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Package size={18} className="mr-2" />
                    <span>Ürünler</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("deploy")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "deploy"
                        ? "bg-red-500/20 text-white border border-red-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Upload size={18} className="mr-2" />
                    <span>Site Dağıtımı</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("logs")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "logs"
                        ? "bg-red-500/20 text-white border border-red-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Terminal size={18} className="mr-2" />
                    <span>Sistem Logları</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "settings"
                        ? "bg-red-500/20 text-white border border-red-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Settings size={18} className="mr-2" />
                    <span>Ayarlar</span>
                  </button>
                </nav>

                <div className="mt-8 p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <h3 className="text-sm font-semibold text-white mb-2">Admin Bilgileri</h3>
                  <div className="text-xs text-gray-400">
                    <p>
                      <span className="text-gray-300">Kullanıcı:</span> {currentAdminUser}
                    </p>
                    <p>
                      <span className="text-gray-300">Yetki:</span> Tam Yönetici
                    </p>
                    <p>
                      <span className="text-gray-300">IP Adresi:</span> <span className="text-blue-400">{adminIp}</span>
                    </p>
                    <p>
                      <span className="text-gray-300">Son Giriş:</span>{" "}
                      {loginTime ? formatDate(loginTime) : "Bilinmiyor"}
                    </p>
                  </div>
                </div>

                {/* Deploy Durumu */}
                {isDeploying && (
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-md">
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      <p className="text-sm text-blue-400">Site dağıtılıyor...</p>
                    </div>
                  </div>
                )}

                {deploySuccess && (
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-md">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <p className="text-sm text-green-400">Site başarıyla dağıtıldı!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-auto p-6">
                {/* Dashboard Tab */}
                {activeTab === "dashboard" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-2">Toplam Ürün</h3>
                        <p className="text-3xl font-bold text-cyan-400">{products.length}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {products.filter((p) => p.active).length} aktif, {products.filter((p) => !p.active).length}{" "}
                          pasif
                        </p>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-2">Kayıtlı Kullanıcılar</h3>
                        <p className="text-3xl font-bold text-pink-500">{registeredUsers.length}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {registeredUsers.filter((u) => u.status === "active").length} aktif kullanıcı
                        </p>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-2">Site Versiyonu</h3>
                        <p className="text-3xl font-bold text-purple-500">
                          {deployHistory.length > 0 ? deployHistory[0].version : "1.0.0"}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Son güncelleme:{" "}
                          {deployHistory.length > 0 ? formatDate(deployHistory[0].deployedAt) : "Bilinmiyor"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-8">
                        <h3 className="text-lg font-semibold mb-4">Son İşlemler</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-300">
                            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                              <tr>
                                <th className="px-4 py-2">Kullanıcı</th>
                                <th className="px-4 py-2">İşlem</th>
                                <th className="px-4 py-2">Tarih</th>
                                <th className="px-4 py-2">IP</th>
                              </tr>
                            </thead>
                            <tbody>
                              {logs.slice(0, 5).map((log) => (
                                <tr key={log.id} className="border-b border-gray-700">
                                  <td className="px-4 py-2 font-medium">{log.username}</td>
                                  <td className="px-4 py-2">{log.action}</td>
                                  <td className="px-4 py-2">{formatDate(log.timestamp)}</td>
                                  <td className="px-4 py-2 font-mono text-blue-400">{log.ip}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4">Son Kayıt Olan Kullanıcılar</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-300">
                            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                              <tr>
                                <th className="px-4 py-2">Kullanıcı</th>
                                <th className="px-4 py-2">E-posta</th>
                                <th className="px-4 py-2">Kayıt Tarihi</th>
                                <th className="px-4 py-2">IP</th>
                              </tr>
                            </thead>
                            <tbody>
                              {registeredUsers.slice(0, 5).map((user) => (
                                <tr key={user.id} className="border-b border-gray-700">
                                  <td className="px-4 py-2 font-medium">{user.username}</td>
                                  <td className="px-4 py-2">{user.email}</td>
                                  <td className="px-4 py-2">{formatDate(user.registeredAt)}</td>
                                  <td className="px-4 py-2 font-mono text-blue-400">{user.ip}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <h3 className="text-lg font-semibold mb-4">Aktif Ürünler</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {products
                          .filter((p) => p.active)
                          .map((product) => (
                            <div key={product.id} className="bg-gray-900/50 p-3 rounded-md border border-gray-700 flex">
                              <div className="w-16 h-16 bg-gray-800 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-xs text-gray-400">{product.description}</p>
                                <p className="text-sm mt-1">
                                  <span className="text-cyan-400">{product.price} ₺</span> / haftalık
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Kayıtlı Kullanıcılar</h2>

                    <div className="flex justify-between items-center mb-4">
                      <div className="relative">
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="text"
                          placeholder="Kullanıcı ara..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                      <button className="flex items-center px-3 py-2 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors">
                        <RefreshCw size={16} className="mr-2" />
                        Yenile
                      </button>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                          <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                            <tr>
                              <th className="px-4 py-3">ID</th>
                              <th className="px-4 py-3">Kullanıcı Adı</th>
                              <th className="px-4 py-3">E-posta</th>
                              <th className="px-4 py-3">Kayıt Tarihi</th>
                              <th className="px-4 py-3">Son Giriş</th>
                              <th className="px-4 py-3">IP Adresi</th>
                              <th className="px-4 py-3">Durum</th>
                              <th className="px-4 py-3">Abonelik</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUsers.map((user) => (
                              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                                <td className="px-4 py-3">{user.id}</td>
                                <td className="px-4 py-3 font-medium">{user.username}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">{formatDate(user.registeredAt)}</td>
                                <td className="px-4 py-3">
                                  {user.lastLogin !== "Bilinmiyor" ? formatDate(user.lastLogin) : "Bilinmiyor"}
                                </td>
                                <td className="px-4 py-3 font-mono text-blue-400">{user.ip}</td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      user.status === "active"
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                                    }`}
                                  >
                                    {user.status === "active" ? "Aktif" : "Pasif"}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      user.subscription === "monthly"
                                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                        : user.subscription === "weekly"
                                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                    }`}
                                  >
                                    {user.subscription === "monthly"
                                      ? "Aylık"
                                      : user.subscription === "weekly"
                                        ? "Haftalık"
                                        : "Yok"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {filteredUsers.length === 0 && (
                        <div className="p-8 text-center text-gray-400">
                          <p>Kullanıcı bulunamadı.</p>
                        </div>
                      )}

                      <div className="p-4 border-t border-gray-700 flex items-center justify-between">
                        <div className="text-sm text-gray-400">Toplam {filteredUsers.length} kayıt</div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600">
                            <ChevronLeft size={16} />
                          </button>
                          <span className="text-sm text-gray-300">Sayfa 1 / 1</span>
                          <button className="p-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600">
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Products Tab */}
                {activeTab === "products" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Ürünler</h2>
                      <button
                        onClick={handleAddProduct}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                      >
                        <Plus size={16} className="mr-2" />
                        Yeni Ürün Ekle
                      </button>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="relative">
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="text"
                          placeholder="Ürün ara..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                          <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                            <tr>
                              <th className="px-4 py-3">ID</th>
                              <th className="px-4 py-3">Ürün</th>
                              <th className="px-4 py-3">Fiyat (Haftalık)</th>
                              <th className="px-4 py-3">Fiyat (Aylık)</th>
                              <th className="px-4 py-3">Durum</th>
                              <th className="px-4 py-3">İşlemler</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredProducts.map((product) => (
                              <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                                <td className="px-4 py-3">{product.id}</td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-700 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                      <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <div className="font-medium">{product.name}</div>
                                      <div className="text-xs text-gray-400">
                                        {product.description.substring(0, 30)}...
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">{product.price} ₺</td>
                                <td className="px-4 py-3">{product.priceMonthly} ₺</td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      product.active
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                                    }`}
                                  >
                                    {product.active ? "Aktif" : "Pasif"}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEditProduct(product)}
                                      className="p-1.5 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30"
                                      title="Düzenle"
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleToggleProductStatus(product.id)}
                                      className={`p-1.5 rounded-md ${
                                        product.active
                                          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                      }`}
                                      title={product.active ? "Pasif Yap" : "Aktif Yap"}
                                    >
                                      <Eye size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(product.id)}
                                      className="p-1.5 bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30"
                                      title="Sil"
                                    >
                                      <Trash size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {filteredProducts.length === 0 && (
                        <div className="p-8 text-center text-gray-400">
                          <p>Ürün bulunamadı.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Deploy Tab */}
                {activeTab === "deploy" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Site Dağıtımı</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <Server className="w-5 h-5 mr-2 text-blue-400" />
                          Site Dağıtımı
                        </h3>
                        <p className="text-gray-300 mb-4">
                          Yaptığınız değişiklikleri canlı siteye yayınlamak için site dağıtımını başlatın. Bu işlem
                          birkaç dakika sürebilir.
                        </p>
                        <div className="flex items-center mb-4">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm text-gray-300">
                            Mevcut Versiyon: {deployHistory.length > 0 ? deployHistory[0].version : "1.0.0"}
                          </span>
                        </div>
                        <button
                          onClick={handleDeploySite}
                          disabled={isDeploying}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isDeploying ? (
                            <>
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                              Dağıtım Sürüyor...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Siteyi Dağıt
                            </>
                          )}
                        </button>
                        {deployMessage && (
                          <div
                            className={`mt-4 p-3 rounded-md ${
                              deploySuccess
                                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                                : "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                            }`}
                          >
                            {deployMessage}
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <Globe className="w-5 h-5 mr-2 text-purple-400" />
                          Site Bilgileri
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Site URL</p>
                            <div className="flex items-center bg-gray-900 p-2 rounded-md">
                              <span className="text-white">https://roxen-aim.vercel.app</span>
                              <button className="ml-auto text-gray-400 hover:text-white">
                                <Code size={16} />
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Son Dağıtım</p>
                            <div className="bg-gray-900 p-2 rounded-md text-white">
                              {deployHistory.length > 0 ? formatDate(deployHistory[0].deployedAt) : "Bilinmiyor"}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Dağıtım Yapan</p>
                            <div className="bg-gray-900 p-2 rounded-md text-white">
                              {deployHistory.length > 0 ? deployHistory[0].deployedBy : "Bilinmiyor"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                      <div className="p-4 border-b border-gray-700">
                        <h3 className="text-lg font-semibold">Dağıtım Geçmişi</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                          <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                            <tr>
                              <th className="px-4 py-3">Versiyon</th>
                              <th className="px-4 py-3">Tarih</th>
                              <th className="px-4 py-3">Durum</th>
                              <th className="px-4 py-3">Değişiklikler</th>
                              <th className="px-4 py-3">Dağıtım Yapan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {deployHistory.map((deploy) => (
                              <tr key={deploy.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                                <td className="px-4 py-3 font-medium">{deploy.version}</td>
                                <td className="px-4 py-3">{formatDate(deploy.deployedAt)}</td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      deploy.status === "success"
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                                    }`}
                                  >
                                    {deploy.status === "success" ? "Başarılı" : "Başarısız"}
                                  </span>
                                </td>
                                <td className="px-4 py-3">{deploy.changes}</td>
                                <td className="px-4 py-3">{deploy.deployedBy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Logs Tab */}
                {activeTab === "logs" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Sistem Logları</h2>

                    <div className="flex justify-between items-center mb-4">
                      <div className="relative">
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="text"
                          placeholder="Log ara..."
                          className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                      <button className="flex items-center px-3 py-2 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors">
                        <RefreshCw size={16} className="mr-2" />
                        Yenile
                      </button>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                          <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                            <tr>
                              <th className="px-4 py-3">ID</th>
                              <th className="px-4 py-3">Kullanıcı</th>
                              <th className="px-4 py-3">İşlem</th>
                              <th className="px-4 py-3">Tarih</th>
                              <th className="px-4 py-3">IP</th>
                            </tr>
                          </thead>
                          <tbody>
                            {logs.map((log) => (
                              <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                                <td className="px-4 py-3">{log.id}</td>
                                <td className="px-4 py-3 font-medium">{log.username}</td>
                                <td className="px-4 py-3">{log.action}</td>
                                <td className="px-4 py-3">{formatDate(log.timestamp)}</td>
                                <td className="px-4 py-3 font-mono text-blue-400">{log.ip}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="p-4 border-t border-gray-700 flex items-center justify-between">
                        <div className="text-sm text-gray-400">Toplam {logs.length} kayıt</div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600">
                            <ChevronLeft size={16} />
                          </button>
                          <span className="text-sm text-gray-300">Sayfa 1 / 1</span>
                          <button className="p-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600">
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Ayarlar</h2>

                    <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4">Site Ayarları</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Site Başlığı</label>
                          <input
                            type="text"
                            defaultValue="ROXEN.AIM | Premium Oyun Çözümleri"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Site Açıklaması</label>
                          <textarea
                            defaultValue="Gelişmiş teknoloji ile üstün oyun çözümleri"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                            rows={3}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Discord Sunucu Linki</label>
                          <input
                            type="text"
                            defaultValue="https://discord.gg/XECCS2EdWr"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
                      <h3 className="text-lg font-semibold mb-4">Admin Kullanıcıları</h3>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                          <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                            <tr>
                              <th className="px-4 py-2">Kullanıcı Adı</th>
                              <th className="px-4 py-2">Yetki</th>
                              <th className="px-4 py-2">Son Giriş</th>
                              <th className="px-4 py-2">IP Adresi</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-700">
                              <td className="px-4 py-2 font-medium">roxen</td>
                              <td className="px-4 py-2">Tam Yönetici</td>
                              <td className="px-4 py-2">
                                {currentAdminUser === "roxen" ? formatDate(loginTime) : "Bilinmiyor"}
                              </td>
                              <td className="px-4 py-2 font-mono text-blue-400">
                                {currentAdminUser === "roxen" ? adminIp : "Bilinmiyor"}
                              </td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="px-4 py-2 font-medium">ali</td>
                              <td className="px-4 py-2">Tam Yönetici</td>
                              <td className="px-4 py-2">
                                {currentAdminUser === "ali" ? formatDate(loginTime) : "Bilinmiyor"}
                              </td>
                              <td className="px-4 py-2 font-mono text-blue-400">
                                {currentAdminUser === "ali" ? adminIp : "Bilinmiyor"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md flex items-start">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-300">
                          Güvenlik nedeniyle admin kullanıcıları bu panelden eklenemez veya düzenlenemez. Değişiklik
                          için doğrudan veritabanı erişimi gereklidir.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Product Edit Modal */}
                <AnimatePresence>
                  {editingProduct && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                      <div className="absolute inset-0 bg-black/80" onClick={() => setEditingProduct(null)} />

                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-gray-900 w-full max-w-2xl rounded-lg border border-gray-700 overflow-hidden z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-center p-4 border-b border-gray-800">
                          <h3 className="text-lg font-semibold">
                            {editingProduct.id ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
                          </h3>
                          <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-white">
                            <X size={20} />
                          </button>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Ürün Adı</label>
                              <input
                                type="text"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Ürün Açıklaması</label>
                              <textarea
                                value={editingProduct.description}
                                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                                rows={3}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                  Haftalık Fiyat (₺)
                                </label>
                                <input
                                  type="number"
                                  value={editingProduct.price}
                                  onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                                  }
                                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Aylık Fiyat (₺)</label>
                                <input
                                  type="number"
                                  value={editingProduct.priceMonthly}
                                  onChange={(e) =>
                                    setEditingProduct({ ...editingProduct, priceMonthly: Number(e.target.value) })
                                  }
                                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">
                                Özellikler (Her satıra bir özellik)
                              </label>
                              <textarea
                                value={editingProduct.features.join("\n")}
                                onChange={(e) =>
                                  setEditingProduct({ ...editingProduct, features: e.target.value.split("\n") })
                                }
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                                rows={4}
                              />
                            </div>

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="active"
                                checked={editingProduct.active}
                                onChange={(e) => setEditingProduct({ ...editingProduct, active: e.target.checked })}
                                className="w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-red-500 text-red-500"
                              />
                              <label htmlFor="active" className="ml-2 text-sm text-gray-300">
                                Ürün aktif (Sitede göster)
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end p-4 border-t border-gray-800 bg-gray-900">
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md text-sm mr-2 hover:bg-gray-600"
                          >
                            İptal
                          </button>
                          <button
                            onClick={handleSaveProduct}
                            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 flex items-center"
                          >
                            <Save size={16} className="mr-2" />
                            Kaydet
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
