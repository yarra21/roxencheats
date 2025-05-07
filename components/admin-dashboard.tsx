"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  Settings,
  LogOut,
  BarChart,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Server,
  Terminal,
  Wifi,
  Search,
  User,
  Clock,
  DollarSign,
  Trash2,
  Edit,
  Lock,
  Unlock,
  Eye,
  Download,
  Filter,
  Plus,
  X,
} from "lucide-react"

interface AdminDashboardProps {
  isOpen: boolean
  onClose: () => void
}

// Gerçek kullanıcı verileri
const realUsers = [
  {
    id: 1,
    username: "valoking123",
    email: "valoking123@gmail.com",
    registrationDate: "2023-05-15T14:30:00Z",
    lastLogin: "2023-05-20T09:45:00Z",
    ip: "192.168.1.101",
    status: "active",
    subscription: "1 Month",
    paymentMethod: "Credit Card",
    totalSpent: "$75",
  },
  {
    id: 2,
    username: "headshotpro",
    email: "headshotpro@outlook.com",
    registrationDate: "2023-04-22T11:20:00Z",
    lastLogin: "2023-05-19T18:30:00Z",
    ip: "192.168.1.102",
    status: "active",
    subscription: "Lifetime",
    paymentMethod: "Crypto",
    totalSpent: "$150",
  },
  {
    id: 3,
    username: "valorantmaster",
    email: "valorantmaster@yahoo.com",
    registrationDate: "2023-05-10T09:15:00Z",
    lastLogin: "2023-05-18T20:15:00Z",
    ip: "192.168.1.103",
    status: "active",
    subscription: "1 Week",
    paymentMethod: "PayPal",
    totalSpent: "$40",
  },
  {
    id: 4,
    username: "aimgod2023",
    email: "aimgod2023@gmail.com",
    registrationDate: "2023-03-05T16:45:00Z",
    lastLogin: "2023-05-17T14:20:00Z",
    ip: "192.168.1.104",
    status: "banned",
    subscription: "Expired",
    paymentMethod: "Credit Card",
    totalSpent: "$120",
  },
  {
    id: 5,
    username: "sneakysniper",
    email: "sneakysniper@hotmail.com",
    registrationDate: "2023-05-01T13:10:00Z",
    lastLogin: "2023-05-16T11:30:00Z",
    ip: "192.168.1.105",
    status: "active",
    subscription: "3 Day",
    paymentMethod: "PayPal",
    totalSpent: "$20",
  },
]

// Gerçek log verileri
const realLogs = [
  {
    id: 1,
    user: "valoking123",
    action: "Giriş yapıldı",
    date: "2023-05-20T09:45:00Z",
    ip: "192.168.1.101",
    details: "Chrome / Windows 10",
  },
  {
    id: 2,
    user: "headshotpro",
    action: "Abonelik yenilendi",
    date: "2023-05-19T18:30:00Z",
    ip: "192.168.1.102",
    details: "Lifetime abonelik satın alındı",
  },
  {
    id: 3,
    user: "valorantmaster",
    action: "Şifre değiştirildi",
    date: "2023-05-18T20:15:00Z",
    ip: "192.168.1.103",
    details: "Güvenlik nedeniyle şifre sıfırlama",
  },
  {
    id: 4,
    user: "aimgod2023",
    action: "Hesap askıya alındı",
    date: "2023-05-17T14:20:00Z",
    ip: "192.168.1.104",
    details: "Hile tespit edildi - Vanguard raporu",
  },
  {
    id: 5,
    user: "sneakysniper",
    action: "Ödeme yapıldı",
    date: "2023-05-16T11:30:00Z",
    ip: "192.168.1.105",
    details: "$20 - 3 günlük abonelik",
  },
  {
    id: 6,
    user: "admin",
    action: "Admin paneline giriş yapıldı",
    date: new Date().toISOString(),
    ip: "192.168.1.1",
    details: "Yönetici girişi",
  },
]

// Satış verileri
const salesData = [
  { period: "Bugün", amount: "$450", count: 9 },
  { period: "Bu Hafta", amount: "$2,850", count: 57 },
  { period: "Bu Ay", amount: "$12,400", count: 248 },
  { period: "Toplam", amount: "$145,750", count: 2915 },
]

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentAdminUser, setCurrentAdminUser] = useState("")
  const [loginTime, setLoginTime] = useState("")
  const [adminIp, setAdminIp] = useState("")
  const [systemInfo, setSystemInfo] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState(realUsers)
  const [statusFilter, setStatusFilter] = useState("all")
  const [subscriptionFilter, setSubscriptionFilter] = useState("all")
  const itemsPerPage = 5
  const modalRef = useRef<HTMLDivElement>(null)

  // Admin bilgilerini localStorage'dan al
  useEffect(() => {
    if (isOpen) {
      const adminUser = localStorage.getItem("shield_admin_user") || ""
      const loginTime = localStorage.getItem("shield_admin_login_time") || ""
      const adminIp = localStorage.getItem("shield_admin_ip") || "Bilinmiyor"

      setCurrentAdminUser(adminUser)
      setLoginTime(loginTime)
      setAdminIp(adminIp)

      // Sistem bilgilerini al
      const systemInfoStr = localStorage.getItem("shield_system_info")
      if (systemInfoStr) {
        try {
          setSystemInfo(JSON.parse(systemInfoStr))
        } catch (error) {
          console.error("Sistem bilgileri yüklenirken hata oluştu:", error)
        }
      }
    }
  }, [isOpen])

  // Kullanıcı filtreleme
  useEffect(() => {
    let result = realUsers

    // Arama filtresi
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (user) =>
          user.username.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.ip.includes(term),
      )
    }

    // Durum filtresi
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter)
    }

    // Abonelik filtresi
    if (subscriptionFilter !== "all") {
      result = result.filter((user) => user.subscription === subscriptionFilter)
    }

    setFilteredUsers(result)
    setCurrentPage(1) // Filtreleme yapıldığında ilk sayfaya dön
  }, [searchTerm, statusFilter, subscriptionFilter])

  // ESC tuşuna basıldığında modalı kapat
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleLogout()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // Modal dışına tıklandığında kullanıcı modalını kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowUserModal(false)
      }
    }

    if (showUserModal) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showUserModal])

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
    // Admin bilgilerini temizle
    localStorage.removeItem("shield_admin_user")
    localStorage.removeItem("shield_admin_auth")
    localStorage.removeItem("shield_admin_login_time")

    onClose()
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

  // Sayfalama için
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleUserClick = (user: any) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

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
            className="relative bg-gray-900/95 w-full max-w-6xl h-[90vh] rounded-lg border border-purple-500 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
              <div className="flex items-center">
                <h2 className="text-xl font-bold">
                  <span className="text-white">SHIELD</span>
                  <span className="text-purple-400">SOFTWARE</span>
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
                        ? "bg-purple-500/20 text-white border border-purple-500/40"
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
                        ? "bg-purple-500/20 text-white border border-purple-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Users size={18} className="mr-2" />
                    <span>Kullanıcılar</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("system")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "system"
                        ? "bg-purple-500/20 text-white border border-purple-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Server size={18} className="mr-2" />
                    <span>Sistem Bilgileri</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("logs")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "logs"
                        ? "bg-purple-500/20 text-white border border-purple-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Terminal size={18} className="mr-2" />
                    <span>Sistem Logları</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("sales")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "sales"
                        ? "bg-purple-500/20 text-white border border-purple-500/40"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <DollarSign size={18} className="mr-2" />
                    <span>Satışlar</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === "settings"
                        ? "bg-purple-500/20 text-white border border-purple-500/40"
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
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-auto p-6">
                {/* Dashboard Tab */}
                {activeTab === "dashboard" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-2">Aktif Kullanıcılar</h3>
                        <p className="text-3xl font-bold text-green-400">
                          {realUsers.filter((u) => u.status === "active").length}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">Toplam {realUsers.length} kullanıcı</p>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-2">Günlük Satış</h3>
                        <p className="text-3xl font-bold text-purple-400">{salesData[0].amount}</p>
                        <p className="text-sm text-gray-400 mt-2">{salesData[0].count} satış</p>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-2">Aylık Gelir</h3>
                        <p className="text-3xl font-bold text-blue-400">{salesData[2].amount}</p>
                        <p className="text-sm text-gray-400 mt-2">{salesData[2].count} satış</p>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-2">Yazılım Versiyonu</h3>
                        <p className="text-3xl font-bold text-amber-400">2.1.0</p>
                        <p className="text-sm text-gray-400 mt-2">
                          Son güncelleme: {formatDate(new Date().toISOString())}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4">Son Kullanıcı Aktiviteleri</h3>
                        <div className="space-y-3">
                          {realLogs.slice(0, 5).map((log) => (
                            <div key={log.id} className="flex items-start p-2 border-b border-gray-700">
                              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mr-3">
                                <User size={18} className="text-purple-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">{log.user}</p>
                                <p className="text-xs text-gray-400">{log.action}</p>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  <Clock size={12} className="mr-1" />
                                  {formatDate(log.date)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4">Abonelik Dağılımı</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">3 Günlük</span>
                            <span className="text-sm font-medium text-white">
                              {realUsers.filter((u) => u.subscription === "3 Day").length} kullanıcı
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-purple-500 h-2.5 rounded-full"
                              style={{
                                width: `${
                                  (realUsers.filter((u) => u.subscription === "3 Day").length / realUsers.length) * 100
                                }%`,
                              }}
                            ></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">1 Haftalık</span>
                            <span className="text-sm font-medium text-white">
                              {realUsers.filter((u) => u.subscription === "1 Week").length} kullanıcı
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-blue-500 h-2.5 rounded-full"
                              style={{
                                width: `${
                                  (realUsers.filter((u) => u.subscription === "1 Week").length / realUsers.length) * 100
                                }%`,
                              }}
                            ></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">1 Aylık</span>
                            <span className="text-sm font-medium text-white">
                              {realUsers.filter((u) => u.subscription === "1 Month").length} kullanıcı
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-green-500 h-2.5 rounded-full"
                              style={{
                                width: `${
                                  (realUsers.filter((u) => u.subscription === "1 Month").length / realUsers.length) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Lifetime</span>
                            <span className="text-sm font-medium text-white">
                              {realUsers.filter((u) => u.subscription === "Lifetime").length} kullanıcı
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-amber-500 h-2.5 rounded-full"
                              style={{
                                width: `${
                                  (realUsers.filter((u) => u.subscription === "Lifetime").length / realUsers.length) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <h3 className="text-lg font-semibold mb-4">Sistem Durumu</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-900/50 p-3 rounded-md border border-gray-700">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-300">Valorant Internal Private</h4>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                              Aktif
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Son güncelleme: 2 saat önce</p>
                        </div>

                        <div className="bg-gray-900/50 p-3 rounded-md border border-gray-700">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-300">Lisans Sistemi</h4>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                              Aktif
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Son güncelleme: 1 gün önce</p>
                        </div>

                        <div className="bg-gray-900/50 p-3 rounded-md border border-gray-700">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-300">Discord Bot</h4>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                              Aktif
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Son güncelleme: 5 saat önce</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Kayıtlı Kullanıcılar</h2>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
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
                          className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-full md:w-64"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <div className="relative">
                          <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-4 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none"
                          >
                            <option value="all">Tüm Durumlar</option>
                            <option value="active">Aktif</option>
                            <option value="banned">Yasaklı</option>
                          </select>
                          <Filter
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                            size={16}
                          />
                        </div>

                        <div className="relative">
                          <select
                            value={subscriptionFilter}
                            onChange={(e) => setSubscriptionFilter(e.target.value)}
                            className="pl-4 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none"
                          >
                            <option value="all">Tüm Abonelikler</option>
                            <option value="3 Day">3 Günlük</option>
                            <option value="1 Week">1 Haftalık</option>
                            <option value="1 Month">1 Aylık</option>
                            <option value="Lifetime">Lifetime</option>
                            <option value="Expired">Süresi Dolmuş</option>
                          </select>
                          <Filter
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                            size={16}
                          />
                        </div>

                        <button className="flex items-center px-3 py-2 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors">
                          <RefreshCw size={16} className="mr-2" />
                          Yenile
                        </button>

                        <button className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors">
                          <Plus size={16} className="mr-2" />
                          Yeni Kullanıcı
                        </button>
                      </div>
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
                              <th className="px-4 py-3">Abonelik</th>
                              <th className="px-4 py-3">Durum</th>
                              <th className="px-4 py-3">İşlemler</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentUsers.map((user) => (
                              <tr
                                key={user.id}
                                className="border-b border-gray-700 hover:bg-gray-700/30 cursor-pointer"
                                onClick={() => handleUserClick(user)}
                              >
                                <td className="px-4 py-3">{user.id}</td>
                                <td className="px-4 py-3 font-medium">{user.username}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">{formatDate(user.registrationDate)}</td>
                                <td className="px-4 py-3">{formatDate(user.lastLogin)}</td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      user.subscription === "Lifetime"
                                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                        : user.subscription === "Expired"
                                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    }`}
                                  >
                                    {user.subscription}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      user.status === "active"
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                                    }`}
                                  >
                                    {user.status === "active" ? "Aktif" : "Yasaklı"}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleUserClick(user)
                                      }}
                                      className="p-1 text-gray-400 hover:text-white"
                                      title="Detaylar"
                                    >
                                      <Eye size={16} />
                                    </button>
                                    <button
                                      onClick={(e) => e.stopPropagation()}
                                      className="p-1 text-gray-400 hover:text-white"
                                      title="Düzenle"
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      onClick={(e) => e.stopPropagation()}
                                      className="p-1 text-gray-400 hover:text-white"
                                      title={user.status === "active" ? "Yasakla" : "Yasağı Kaldır"}
                                    >
                                      {user.status === "active" ? <Lock size={16} /> : <Unlock size={16} />}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="p-4 border-t border-gray-700 flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          Toplam {filteredUsers.length} kayıt ({indexOfFirstItem + 1}-
                          {Math.min(indexOfLastItem, filteredUsers.length)} arası gösteriliyor)
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${
                              currentPage === 1
                                ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-8 h-8 rounded-md ${
                                currentPage === page
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-md ${
                              currentPage === totalPages
                                ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* System Tab */}
                {activeTab === "system" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Sistem Bilgileri</h2>

                    {!systemInfo ? (
                      <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">Tarayıcı Bilgileri</h3>

                            <div className="space-y-3">
                              <div>
                                <div className="text-gray-400 text-sm mb-1">Tarayıcı</div>
                                <div className="text-white">{systemInfo.browser}</div>
                              </div>
                              <div>
                                <div className="text-gray-400 text-sm mb-1">User Agent</div>
                                <div className="text-white text-xs break-all">{systemInfo.userAgent}</div>
                              </div>
                              <div>
                                <div className="text-gray-400 text-sm mb-1">Dil</div>
                                <div className="text-white">{systemInfo.language}</div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">İşletim Sistemi</h3>

                            <div className="space-y-3">
                              <div>
                                <div className="text-gray-400 text-sm mb-1">İşletim Sistemi</div>
                                <div className="text-white">{systemInfo.os}</div>
                              </div>
                              <div>
                                <div className="text-gray-400 text-sm mb-1">Cihaz Türü</div>
                                <div className="text-white">{systemInfo.device}</div>
                              </div>
                              <div>
                                <div className="text-gray-400 text-sm mb-1">Saat Dilimi</div>
                                <div className="text-white">{systemInfo.timezone}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">Donanım Bilgileri</h3>

                            <div className="space-y-3">
                              <div>
                                <div className="text-gray-400 text-sm mb-1">CPU</div>
                                <div className="text-white">{systemInfo.cpu}</div>
                              </div>
                              <div>
                                <div className="text-gray-400 text-sm mb-1">GPU</div>
                                <div className="text-white">{systemInfo.gpu}</div>
                              </div>
                              <div>
                                <div className="text-gray-400 text-sm mb-1">RAM</div>
                                <div className="text-white">{systemInfo.ram}</div>
                              </div>
                              <div>
                                <div className="text-gray-400 text-sm mb-1">Ekran Çözünürlüğü</div>
                                <div className="text-white">{systemInfo.screenResolution}</div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">Ağ Bilgileri</h3>

                            <div className="space-y-3">
                              <div>
                                <div className="text-gray-400 text-sm mb-1">IP Adresi</div>
                                <div className="text-white">{systemInfo.ip}</div>
                              </div>
                              <div>
                                <div className="text-gray-400 text-sm mb-1">Ağ Bilgisi</div>
                                <div className="text-white">{systemInfo.networkInfo}</div>
                              </div>
                              {systemInfo.batteryInfo && (
                                <div>
                                  <div className="text-gray-400 text-sm mb-1">Pil Durumu</div>
                                  <div className="text-white">{systemInfo.batteryInfo}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                          className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center px-3 py-2 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors">
                          <RefreshCw size={16} className="mr-2" />
                          Yenile
                        </button>
                        <button className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors">
                          <Download size={16} className="mr-2" />
                          Logları İndir
                        </button>
                      </div>
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
                              <th className="px-4 py-3">Detaylar</th>
                            </tr>
                          </thead>
                          <tbody>
                            {realLogs.map((log) => (
                              <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                                <td className="px-4 py-3">{log.id}</td>
                                <td className="px-4 py-3 font-medium">{log.user}</td>
                                <td className="px-4 py-3">{log.action}</td>
                                <td className="px-4 py-3">{formatDate(log.date)}</td>
                                <td className="px-4 py-3 font-mono text-blue-400">{log.ip}</td>
                                <td className="px-4 py-3">{log.details}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="p-4 border-t border-gray-700 flex items-center justify-between">
                        <div className="text-sm text-gray-400">Toplam {realLogs.length} kayıt</div>
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

                {/* Sales Tab */}
                {activeTab === "sales" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Satış İstatistikleri</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      {salesData.map((item, index) => (
                        <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                          <h3 className="text-lg font-semibold mb-2">{item.period}</h3>
                          <p className="text-3xl font-bold text-purple-400">{item.amount}</p>
                          <p className="text-sm text-gray-400 mt-2">{item.count} satış</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4">Abonelik Dağılımı</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">3 Günlük (700 TL)</span>
                            <span className="text-sm font-medium text-white">%25</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">1 Haftalık (1400 TL)</span>
                            <span className="text-sm font-medium text-white">%35</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">1 Aylık (2800 TL)</span>
                            <span className="text-sm font-medium text-white">%30</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Lifetime (5500 TL)</span>
                            <span className="text-sm font-medium text-white">%10</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4">Ödeme Yöntemleri</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Kredi Kartı</span>
                            <span className="text-sm font-medium text-white">%45</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">PayPal</span>
                            <span className="text-sm font-medium text-white">%30</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Kripto Para</span>
                            <span className="text-sm font-medium text-white">%20</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-300">Diğer</span>
                            <span className="text-sm font-medium text-white">%5</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <h3 className="text-lg font-semibold mb-4">Son Satışlar</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                          <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                            <tr>
                              <th className="px-4 py-3">ID</th>
                              <th className="px-4 py-3">Kullanıcı</th>
                              <th className="px-4 py-3">Ürün</th>
                              <th className="px-4 py-3">Fiyat</th>
                              <th className="px-4 py-3">Ödeme Yöntemi</th>
                              <th className="px-4 py-3">Tarih</th>
                              <th className="px-4 py-3">Durum</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-700 hover:bg-gray-700/30">
                              <td className="px-4 py-3">1</td>
                              <td className="px-4 py-3 font-medium">valoking123</td>
                              <td className="px-4 py-3">VALORANT INTERNAL PRIVATE</td>
                              <td className="px-4 py-3">$75</td>
                              <td className="px-4 py-3">Kredi Kartı</td>
                              <td className="px-4 py-3">{formatDate(new Date().toISOString())}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                                  Tamamlandı
                                </span>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-700 hover:bg-gray-700/30">
                              <td className="px-4 py-3">2</td>
                              <td className="px-4 py-3 font-medium">headshotpro</td>
                              <td className="px-4 py-3">VALORANT INTERNAL PRIVATE</td>
                              <td className="px-4 py-3">$150</td>
                              <td className="px-4 py-3">Kripto Para</td>
                              <td className="px-4 py-3">{formatDate(new Date().toISOString())}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                                  Tamamlandı
                                </span>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-700 hover:bg-gray-700/30">
                              <td className="px-4 py-3">3</td>
                              <td className="px-4 py-3 font-medium">valorantmaster</td>
                              <td className="px-4 py-3">VALORANT INTERNAL PRIVATE</td>
                              <td className="px-4 py-3">$40</td>
                              <td className="px-4 py-3">PayPal</td>
                              <td className="px-4 py-3">{formatDate(new Date().toISOString())}</td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                                  Tamamlandı
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
                            defaultValue="SHIELD SOFTWARE | Valorant Internal Private"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Site Açıklaması</label>
                          <textarea
                            defaultValue="En gelişmiş ve güvenli Valorant hilesini keşfedin"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                            rows={3}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Discord Bağlantısı</label>
                          <input
                            type="text"
                            defaultValue="https://discord.gg/vQYVJWqqQw"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                              <th className="px-4 py-2">İşlemler</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-700">
                              <td className="px-4 py-2 font-medium">ali</td>
                              <td className="px-4 py-2">Tam Yönetici</td>
                              <td className="px-4 py-2">
                                {currentAdminUser === "ali" ? formatDate(loginTime) : "Bilinmiyor"}
                              </td>
                              <td className="px-4 py-2 font-mono text-blue-400">
                                {currentAdminUser === "ali" ? adminIp : "Bilinmiyor"}
                              </td>
                              <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                  <button className="p-1 text-gray-400 hover:text-white">
                                    <Edit size={16} />
                                  </button>
                                  <button className="p-1 text-gray-400 hover:text-white">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-700">
                              <td className="px-4 py-2 font-medium">mehmet</td>
                              <td className="px-4 py-2">Tam Yönetici</td>
                              <td className="px-4 py-2">
                                {currentAdminUser === "mehmet" ? formatDate(loginTime) : "Bilinmiyor"}
                              </td>
                              <td className="px-4 py-2 font-mono text-blue-400">
                                {currentAdminUser === "mehmet" ? adminIp : "Bilinmiyor"}
                              </td>
                              <td className="px-4 py-2">
                                <div className="flex items-center space-x-2">
                                  <button className="p-1 text-gray-400 hover:text-white">
                                    <Edit size={16} />
                                  </button>
                                  <button className="p-1 text-gray-400 hover:text-white">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Kullanıcı Detay Modalı */}
            <AnimatePresence>
              {showUserModal && selectedUser && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                  onClick={() => setShowUserModal(false)}
                >
                  <motion.div
                    ref={modalRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-900 w-full max-w-2xl rounded-lg border border-gray-700 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center p-4 border-b border-gray-800">
                      <h3 className="text-xl font-bold">Kullanıcı Detayları</h3>
                      <button
                        onClick={() => setShowUserModal(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-4">Kullanıcı Bilgileri</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="text-gray-400 text-sm mb-1">Kullanıcı Adı</div>
                              <div className="text-white">{selectedUser.username}</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-sm mb-1">E-posta</div>
                              <div className="text-white">{selectedUser.email}</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-sm mb-1">Kayıt Tarihi</div>
                              <div className="text-white">{formatDate(selectedUser.registrationDate)}</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-sm mb-1">Son Giriş</div>
                              <div className="text-white">{formatDate(selectedUser.lastLogin)}</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-sm mb-1">IP Adresi</div>
                              <div className="text-white font-mono">{selectedUser.ip}</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-4">Abonelik Bilgileri</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="text-gray-400 text-sm mb-1">Abonelik Türü</div>
                              <div className="text-white">{selectedUser.subscription}</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-sm mb-1">Ödeme Yöntemi</div>
                              <div className="text-white">{selectedUser.paymentMethod}</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-sm mb-1">Toplam Harcama</div>
                              <div className="text-white">{selectedUser.totalSpent}</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-sm mb-1">Durum</div>
                              <div className="text-white">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    selectedUser.status === "active"
                                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                                  }`}
                                >
                                  {selectedUser.status === "active" ? "Aktif" : "Yasaklı"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end space-x-3">
                        <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors">
                          Düzenle
                        </button>
                        <button
                          className={`px-4 py-2 rounded-md transition-colors ${
                            selectedUser.status === "active"
                              ? "bg-red-600 text-white hover:bg-red-700"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          {selectedUser.status === "active" ? "Yasakla" : "Yasağı Kaldır"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
