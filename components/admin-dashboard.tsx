"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertCircle,
  BarChart2,
  Check,
  Copy,
  CreditCard,
  Download,
  Eye,
  Filter,
  Key,
  Lock,
  LogOut,
  MessageSquare,
  MoreVertical,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Trash,
  UserPlus,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

// Sahte veri oluşturma fonksiyonları
const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const generateRandomIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

const generateRandomHWID = () => {
  return Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16))
    .join("")
    .toUpperCase()
}

// Sahte kullanıcı verileri
const generateUsers = (count: number) => {
  const usernames = [
    "valorant_pro",
    "aim_master",
    "headshot_king",
    "radiant_player",
    "immortal_gamer",
    "ace_shooter",
    "diamond_elite",
    "platinum_star",
    "gold_warrior",
    "silver_fighter",
  ]
  const countries = [
    "Turkey",
    "United States",
    "Germany",
    "United Kingdom",
    "Russia",
    "France",
    "Canada",
    "Brazil",
    "Japan",
    "South Korea",
  ]
  const statuses = ["Active", "Banned", "Expired", "Pending"]
  const subscriptionTypes = ["3 Day", "1 Week", "1 Month", "Lifetime"]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 1000),
    email: `user${i + 1}@example.com`,
    country: countries[Math.floor(Math.random() * countries.length)],
    ip: generateRandomIP(),
    hwid: generateRandomHWID(),
    registrationDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
    lastLogin: generateRandomDate(new Date(2023, 6, 1), new Date()),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    subscriptionType: subscriptionTypes[Math.floor(Math.random() * subscriptionTypes.length)],
    subscriptionEnd: generateRandomDate(new Date(), new Date(2024, 11, 31)),
    totalLogins: Math.floor(Math.random() * 100),
    notes: Math.random() > 0.7 ? "Suspicious activity detected" : "",
  }))
}

// Sahte lisans verileri
const generateLicenses = (count: number) => {
  const statuses = ["Active", "Used", "Expired", "Revoked"]
  const types = ["3 Day", "1 Week", "1 Month", "Lifetime"]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    key: Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 36)
          .toString(36)
          .toUpperCase(),
      ).join(""),
    ).join("-"),
    type: types[Math.floor(Math.random() * types.length)],
    createdAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
    expiresAt: generateRandomDate(new Date(), new Date(2024, 11, 31)),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    usedBy:
      statuses[Math.floor(Math.random() * statuses.length)] === "Used"
        ? `user${Math.floor(Math.random() * 100) + 1}@example.com`
        : null,
    notes: Math.random() > 0.8 ? "Generated for promotional purposes" : "",
  }))
}

// Sahte log verileri
const generateLogs = (count: number) => {
  const actions = [
    "Login",
    "Logout",
    "License Activation",
    "Password Change",
    "Email Change",
    "Failed Login Attempt",
    "Admin Login",
    "License Generation",
    "User Ban",
    "User Unban",
  ]
  const statuses = ["Success", "Failed", "Warning", "Info"]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    timestamp: generateRandomDate(new Date(2023, 6, 1), new Date()),
    action: actions[Math.floor(Math.random() * actions.length)],
    user: `user${Math.floor(Math.random() * 100) + 1}@example.com`,
    ip: generateRandomIP(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    details: "Action performed from Windows 10 using Chrome browser",
  }))
}

// Sahte destek talepleri
const generateSupportTickets = (count: number) => {
  const subjects = [
    "Cannot login",
    "License not working",
    "Need help with installation",
    "Feature request",
    "Reporting a bug",
    "Payment issue",
    "Account recovery",
    "HWID reset request",
  ]
  const statuses = ["Open", "In Progress", "Closed", "Waiting for User"]
  const priorities = ["Low", "Medium", "High", "Critical"]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    user: `user${Math.floor(Math.random() * 100) + 1}@example.com`,
    createdAt: generateRandomDate(new Date(2023, 6, 1), new Date()),
    updatedAt: generateRandomDate(new Date(2023, 9, 1), new Date()),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    messages: Math.floor(Math.random() * 10) + 1,
  }))
}

// Sahte satış verileri
const generateSalesData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const products = ["3 Day", "1 Week", "1 Month", "Lifetime"]

  const monthlySales = months.map((month) => ({
    month,
    total: Math.floor(Math.random() * 10000) + 1000,
    count: Math.floor(Math.random() * 100) + 10,
  }))

  const productSales = products.map((product) => ({
    product,
    total: Math.floor(Math.random() * 20000) + 5000,
    count: Math.floor(Math.random() * 200) + 20,
  }))

  const recentSales = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    product: products[Math.floor(Math.random() * products.length)],
    amount: (product) => {
      switch (product) {
        case "3 Day":
          return "700 TL"
        case "1 Week":
          return "1400 TL"
        case "1 Month":
          return "2800 TL"
        case "Lifetime":
          return "5500 TL"
        default:
          return "0 TL"
      }
    },
    user: `user${Math.floor(Math.random() * 100) + 1}@example.com`,
    date: generateRandomDate(new Date(2023, 9, 1), new Date()),
    status: Math.random() > 0.1 ? "Completed" : "Refunded",
    paymentMethod: Math.random() > 0.5 ? "Credit Card" : "Crypto",
  }))

  return {
    monthlySales,
    productSales,
    recentSales,
    totalRevenue: 156750,
    totalSales: 78,
    activeSubscriptions: 42,
    conversionRate: 68,
  }
}

// Sahte IP izleme verileri
const generateIPData = (count: number) => {
  const statuses = ["Normal", "Suspicious", "Blocked", "Whitelisted"]
  const countries = [
    "Turkey",
    "United States",
    "Germany",
    "United Kingdom",
    "Russia",
    "France",
    "Canada",
    "Brazil",
    "Japan",
    "South Korea",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ip: generateRandomIP(),
    country: countries[Math.floor(Math.random() * countries.length)],
    lastSeen: generateRandomDate(new Date(2023, 6, 1), new Date()),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    visits: Math.floor(Math.random() * 100) + 1,
    users: Math.floor(Math.random() * 5) + 1,
    notes: Math.random() > 0.8 ? "Multiple failed login attempts" : "",
  }))
}

// Ana Admin Dashboard bileşeni
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [users, setUsers] = useState(generateUsers(50))
  const [licenses, setLicenses] = useState(generateLicenses(100))
  const [logs, setLogs] = useState(generateLogs(200))
  const [supportTickets, setSupportTickets] = useState(generateSupportTickets(30))
  const [salesData, setSalesData] = useState(generateSalesData())
  const [ipData, setIpData] = useState(generateIPData(80))
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isAddLicenseDialogOpen, setIsAddLicenseDialogOpen] = useState(false)
  const [isViewUserDialogOpen, setIsViewUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false)
  const [isViewTicketDialogOpen, setIsViewTicketDialogOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [newTicketReply, setNewTicketReply] = useState("")
  const [isGenerateLicensesDialogOpen, setIsGenerateLicensesDialogOpen] = useState(false)
  const [licenseQuantity, setLicenseQuantity] = useState(1)
  const [licenseType, setLicenseType] = useState("3 Day")
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [isIPDetailsDialogOpen, setIsIPDetailsDialogOpen] = useState(false)
  const [selectedIP, setSelectedIP] = useState<any>(null)
  const [isBlockIPDialogOpen, setIsBlockIPDialogOpen] = useState(false)

  // Kullanıcı filtreleme
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ip.includes(searchTerm)

    if (filterStatus === "all") return matchesSearch
    return matchesSearch && user.status.toLowerCase() === filterStatus.toLowerCase()
  })

  // Lisans filtreleme
  const filteredLicenses = licenses.filter((license) => {
    const matchesSearch =
      license.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (license.usedBy && license.usedBy.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filterStatus === "all") return matchesSearch
    return matchesSearch && license.status.toLowerCase() === filterStatus.toLowerCase()
  })

  // Log filtreleme
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm)

    if (filterStatus === "all") return matchesSearch
    return matchesSearch && log.status.toLowerCase() === filterStatus.toLowerCase()
  })

  // Destek talebi filtreleme
  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    return matchesSearch && ticket.status.toLowerCase() === filterStatus.toLowerCase()
  })

  // IP filtreleme
  const filteredIPs = ipData.filter((ip) => {
    const matchesSearch = ip.ip.includes(searchTerm) || ip.country.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    return matchesSearch && ip.status.toLowerCase() === filterStatus.toLowerCase()
  })

  // Kullanıcı görüntüleme
  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setIsViewUserDialogOpen(true)
  }

  // Kullanıcı düzenleme
  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsEditUserDialogOpen(true)
  }

  // Kullanıcı silme
  const handleDeleteUser = (user: any) => {
    setSelectedUser(user)
    setIsDeleteUserDialogOpen(true)
  }

  // Kullanıcı silme onayı
  const confirmDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id))
    setIsDeleteUserDialogOpen(false)
  }

  // Destek talebi görüntüleme
  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket)
    setIsViewTicketDialogOpen(true)
  }

  // Lisans oluşturma
  const handleGenerateLicenses = () => {
    const newLicenses = Array.from({ length: licenseQuantity }, (_, i) => ({
      id: licenses.length + i + 1,
      key: Array.from({ length: 5 }, () =>
        Array.from({ length: 5 }, () =>
          Math.floor(Math.random() * 36)
            .toString(36)
            .toUpperCase(),
        ).join(""),
      ).join("-"),
      type: licenseType,
      createdAt: new Date(),
      expiresAt: new Date(
        Date.now() +
          (licenseType === "3 Day"
            ? 3 * 24 * 60 * 60 * 1000
            : licenseType === "1 Week"
              ? 7 * 24 * 60 * 60 * 1000
              : licenseType === "1 Month"
                ? 30 * 24 * 60 * 60 * 1000
                : 365 * 24 * 60 * 60 * 1000), // Lifetime
      ),
      status: "Active",
      usedBy: null,
      notes: "",
    }))

    setLicenses([...newLicenses, ...licenses])
    setIsGenerateLicensesDialogOpen(false)
  }

  // IP detayları görüntüleme
  const handleViewIP = (ip: any) => {
    setSelectedIP(ip)
    setIsIPDetailsDialogOpen(true)
  }

  // IP engelleme
  const handleBlockIP = (ip: any) => {
    setSelectedIP(ip)
    setIsBlockIPDialogOpen(true)
  }

  // IP engelleme onayı
  const confirmBlockIP = () => {
    setIpData(ipData.map((item) => (item.id === selectedIP.id ? { ...item, status: "Blocked" } : item)))
    setIsBlockIPDialogOpen(false)
  }

  // Lisans kopyalama
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Kopyalama başarılı bildirimi gösterilebilir
  }

  // Kullanıcı ekleme
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newUser = {
      id: users.length + 1,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      country: formData.get("country") as string,
      ip: generateRandomIP(),
      hwid: generateRandomHWID(),
      registrationDate: new Date(),
      lastLogin: new Date(),
      status: "Active",
      subscriptionType: formData.get("subscriptionType") as string,
      subscriptionEnd: new Date(
        Date.now() +
          (formData.get("subscriptionType") === "3 Day"
            ? 3 * 24 * 60 * 60 * 1000
            : formData.get("subscriptionType") === "1 Week"
              ? 7 * 24 * 60 * 60 * 1000
              : formData.get("subscriptionType") === "1 Month"
                ? 30 * 24 * 60 * 60 * 1000
                : 365 * 24 * 60 * 60 * 1000), // Lifetime
      ),
      totalLogins: 0,
      notes: formData.get("notes") as string,
    }

    setUsers([newUser, ...users])
    setIsAddUserDialogOpen(false)
  }

  // Destek talebi yanıtlama
  const handleReplyTicket = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada gerçek bir API çağrısı yapılabilir
    setNewTicketReply("")
    setSupportTickets(
      supportTickets.map((ticket) =>
        ticket.id === selectedTicket.id
          ? { ...ticket, status: "Waiting for User", messages: ticket.messages + 1, updatedAt: new Date() }
          : ticket,
      ),
    )
    setIsViewTicketDialogOpen(false)
  }

  // Kullanıcı düzenleme kaydetme
  const handleSaveUserEdit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const updatedUser = {
      ...selectedUser,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      country: formData.get("country") as string,
      status: formData.get("status") as string,
      subscriptionType: formData.get("subscriptionType") as string,
      notes: formData.get("notes") as string,
    }

    setUsers(users.map((user) => (user.id === selectedUser.id ? updatedUser : user)))
    setIsEditUserDialogOpen(false)
  }

  // Durum rengini belirleme
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "completed":
      case "success":
      case "whitelisted":
        return "bg-green-100 text-green-800"
      case "banned":
      case "expired":
      case "revoked":
      case "failed":
      case "blocked":
        return "bg-red-100 text-red-800"
      case "pending":
      case "in progress":
      case "waiting for user":
      case "warning":
      case "suspicious":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  // Öncelik rengini belirleme
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SHIELD SOFTWARE Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {salesData.totalRevenue.toLocaleString()} TL
                  </h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{salesData.totalSales}</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <BarChart2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-blue-600">+5% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Subscriptions</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{salesData.activeSubscriptions}</h3>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-purple-600">+8% from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{salesData.conversionRate}%</h3>
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <RefreshCw className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-yellow-600">+3% from last month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-7 md:w-auto w-full">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="licenses">Licenses</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Sales</h3>
                  <div className="space-y-4">
                    {salesData.recentSales.slice(0, 5).map((sale, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{sale.product}</p>
                          <p className="text-sm text-gray-500">{sale.user}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{sale.amount}</p>
                          <p className="text-sm text-gray-500">{format(sale.date, "dd MMM yyyy")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Sales
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Logins</h3>
                  <div className="space-y-4">
                    {logs
                      .filter((log) => log.action === "Login")
                      .slice(0, 5)
                      .map((log, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{log.user}</p>
                            <p className="text-sm text-gray-500">{log.ip}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{log.status}</p>
                            <p className="text-sm text-gray-500">{format(log.timestamp, "dd MMM yyyy HH:mm")}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Logs
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Open Support Tickets</h3>
                  <div className="space-y-4">
                    {supportTickets
                      .filter((ticket) => ticket.status === "Open")
                      .slice(0, 5)
                      .map((ticket, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{ticket.subject}</p>
                            <p className="text-sm text-gray-500">{ticket.user}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                            <p className="text-sm text-gray-500">{format(ticket.createdAt, "dd MMM yyyy")}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Tickets
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Registrations</h3>
                  <div className="space-y-4">
                    {users
                      .sort((a, b) => b.registrationDate.getTime() - a.registrationDate.getTime())
                      .slice(0, 5)
                      .map((user, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                            <p className="text-sm text-gray-500">{format(user.registrationDate, "dd MMM yyyy")}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Users
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setIsAddUserDialogOpen(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.slice(0, 10).map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{user.subscriptionType}</TableCell>
                        <TableCell>{format(user.registrationDate, "dd MMM yyyy")}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                <Settings className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-600">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Licenses Tab */}
          <TabsContent value="licenses" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search licenses..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="revoked">Revoked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setIsGenerateLicensesDialogOpen(true)}>
                <Key className="h-4 w-4 mr-2" />
                Generate Licenses
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>License Key</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Used By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLicenses.slice(0, 10).map((license) => (
                      <TableRow key={license.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <span className="truncate max-w-[200px]">{license.key}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => copyToClipboard(license.key)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{license.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(license.status)}>{license.status}</Badge>
                        </TableCell>
                        <TableCell>{format(license.createdAt, "dd MMM yyyy")}</TableCell>
                        <TableCell>{format(license.expiresAt, "dd MMM yyyy")}</TableCell>
                        <TableCell>{license.usedBy || "-"}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => copyToClipboard(license.key)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Key
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Export
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="h-4 w-4 mr-2" />
                                Revoke License
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search logs..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto">
                      <Filter className="h-4 w-4 mr-2" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.slice(0, 10).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{format(log.timestamp, "dd MMM yyyy HH:mm:ss")}</TableCell>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.ip}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                        </TableCell>
                        <TableCell className="truncate max-w-[200px]">{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search tickets..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="waiting for user">Waiting for User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.slice(0, 10).map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                        <TableCell>{ticket.user}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell>{format(ticket.createdAt, "dd MMM yyyy")}</TableCell>
                        <TableCell>{format(ticket.updatedAt, "dd MMM yyyy")}</TableCell>
                        <TableCell>{ticket.messages}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewTicket(ticket)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Monthly Sales</h3>
                  <div className="space-y-4">
                    {salesData.monthlySales.map((sale, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="font-medium">{sale.month}</p>
                        <div className="text-right">
                          <p className="font-medium">{sale.total.toLocaleString()} TL</p>
                          <p className="text-sm text-gray-500">{sale.count} sales</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Product Sales</h3>
                  <div className="space-y-4">
                    {salesData.productSales.map((sale, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <p className="font-medium">{sale.product}</p>
                        <div className="text-right">
                          <p className="font-medium">{sale.total.toLocaleString()} TL</p>
                          <p className="text-sm text-gray-500">{sale.count} sales</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Sales</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.recentSales.map((sale, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sale.product}</TableCell>
                        <TableCell>{sale.user}</TableCell>
                        <TableCell>{sale.amount}</TableCell>
                        <TableCell>{format(sale.date, "dd MMM yyyy")}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(sale.status)}>{sale.status}</Badge>
                        </TableCell>
                        <TableCell>{sale.paymentMethod}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search IP addresses..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="suspicious">Suspicious</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="whitelisted">Whitelisted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Security Report
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead>Visits</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIPs.slice(0, 10).map((ip) => (
                      <TableRow key={ip.id}>
                        <TableCell className="font-medium">{ip.ip}</TableCell>
                        <TableCell>{ip.country}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ip.status)}>{ip.status}</Badge>
                        </TableCell>
                        <TableCell>{format(ip.lastSeen, "dd MMM yyyy HH:mm")}</TableCell>
                        <TableCell>{ip.visits}</TableCell>
                        <TableCell>{ip.users}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewIP(ip)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {ip.status !== "Blocked" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600"
                                onClick={() => handleBlockIP(ip)}
                              >
                                <Lock className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. The user will receive an email with login instructions.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" name="username" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" name="email" type="email" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">
                  Country
                </Label>
                <Input id="country" name="country" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subscriptionType" className="text-right">
                  Subscription
                </Label>
                <Select name="subscriptionType" defaultValue="3 Day">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select subscription type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3 Day">3 Day</SelectItem>
                    <SelectItem value="1 Week">1 Week</SelectItem>
                    <SelectItem value="1 Month">1 Month</SelectItem>
                    <SelectItem value="Lifetime">Lifetime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea id="notes" name="notes" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={isViewUserDialogOpen} onOpenChange={setIsViewUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Detailed information about the user.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Username</p>
                  <p className="text-base">{selectedUser.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Country</p>
                  <p className="text-base">{selectedUser.country}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge className={getStatusColor(selectedUser.status)}>{selectedUser.status}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">IP Address</p>
                  <p className="text-base">{selectedUser.ip}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">HWID</p>
                  <p className="text-base truncate">{selectedUser.hwid}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Registration Date</p>
                  <p className="text-base">{format(selectedUser.registrationDate, "dd MMM yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Login</p>
                  <p className="text-base">{format(selectedUser.lastLogin, "dd MMM yyyy HH:mm")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Subscription Type</p>
                  <p className="text-base">{selectedUser.subscriptionType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Subscription End</p>
                  <p className="text-base">{format(selectedUser.subscriptionEnd, "dd MMM yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Logins</p>
                  <p className="text-base">{selectedUser.totalLogins}</p>
                </div>
              </div>

              {selectedUser.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Notes</p>
                  <p className="text-base">{selectedUser.notes}</p>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleEditUser(selectedUser)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteUser(selectedUser)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Make changes to the user account.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <form onSubmit={handleSaveUserEdit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={selectedUser.username}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={selectedUser.email}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    defaultValue={selectedUser.country}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select name="status" defaultValue={selectedUser.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Banned">Banned</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subscriptionType" className="text-right">
                    Subscription
                  </Label>
                  <Select name="subscriptionType" defaultValue={selectedUser.subscriptionType}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select subscription type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3 Day">3 Day</SelectItem>
                      <SelectItem value="1 Week">1 Week</SelectItem>
                      <SelectItem value="1 Month">1 Month</SelectItem>
                      <SelectItem value="Lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" name="notes" defaultValue={selectedUser.notes} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteUserDialogOpen} onOpenChange={setIsDeleteUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-red-50">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <p className="font-medium text-red-600">Warning</p>
                </div>
                <p className="mt-2 text-sm text-red-600">
                  Deleting this user will remove all their data, including subscription information and login history.
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDeleteUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDeleteUser}>
                  Delete User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Generate Licenses Dialog */}
      <Dialog open={isGenerateLicensesDialogOpen} onOpenChange={setIsGenerateLicensesDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Licenses</DialogTitle>
            <DialogDescription>Create new license keys for your product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="100"
                value={licenseQuantity}
                onChange={(e) => setLicenseQuantity(Number.parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="licenseType" className="text-right">
                Type
              </Label>
              <Select value={licenseType} onValueChange={setLicenseType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select license type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3 Day">3 Day</SelectItem>
                  <SelectItem value="1 Week">1 Week</SelectItem>
                  <SelectItem value="1 Month">1 Month</SelectItem>
                  <SelectItem value="Lifetime">Lifetime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleGenerateLicenses}>Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Ticket Dialog */}
      <Dialog open={isViewTicketDialogOpen} onOpenChange={setIsViewTicketDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Support Ticket</DialogTitle>
            <DialogDescription>View and respond to the support ticket.</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{selectedTicket.subject}</h3>
                  <p className="text-sm text-gray-500">{selectedTicket.user}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(selectedTicket.status)}>{selectedTicket.status}</Badge>
                  <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                </div>
              </div>

              <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">{selectedTicket.user}</p>
                  <p className="text-sm text-gray-500">{format(selectedTicket.createdAt, "dd MMM yyyy HH:mm")}</p>
                </div>
                <p>
                  I'm having an issue with the software. When I try to launch it, I get an error message saying "Unable
                  to connect to the server". I've tried reinstalling but it doesn't help.
                </p>
              </div>

              {selectedTicket.messages > 1 && (
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Support Agent</p>
                    <p className="text-sm text-gray-500">{format(selectedTicket.updatedAt, "dd MMM yyyy HH:mm")}</p>
                  </div>
                  <p>
                    Thank you for reporting this issue. Could you please provide more information about your system?
                    What operating system are you using? Also, please check if your firewall is blocking the connection.
                  </p>
                </div>
              )}

              <form onSubmit={handleReplyTicket}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reply">Your Reply</Label>
                    <Textarea
                      id="reply"
                      placeholder="Type your response here..."
                      value={newTicketReply}
                      onChange={(e) => setNewTicketReply(e.target.value)}
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Select defaultValue={selectedTicket.status}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Waiting for User">Waiting for User</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="submit">Send Reply</Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Admin Settings</DialogTitle>
            <DialogDescription>Configure your admin dashboard settings.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive email notifications for new users and support tickets</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Require 2FA for admin login</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Ban Suspicious IPs</Label>
                <p className="text-sm text-gray-500">Automatically ban IPs with multiple failed login attempts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-gray-500">Use dark theme for admin dashboard</p>
              </div>
              <Switch />
            </div>
            <div className="pt-4">
              <Label>Session Timeout (minutes)</Label>
              <Input type="number" defaultValue="30" min="5" max="120" className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* IP Details Dialog */}
      <Dialog open={isIPDetailsDialogOpen} onOpenChange={setIsIPDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>IP Address Details</DialogTitle>
            <DialogDescription>Detailed information about this IP address.</DialogDescription>
          </DialogHeader>
          {selectedIP && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">IP Address</p>
                  <p className="text-base">{selectedIP.ip}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Country</p>
                  <p className="text-base">{selectedIP.country}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge className={getStatusColor(selectedIP.status)}>{selectedIP.status}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Seen</p>
                  <p className="text-base">{format(selectedIP.lastSeen, "dd MMM yyyy HH:mm")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Visits</p>
                  <p className="text-base">{selectedIP.visits}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Associated Users</p>
                  <p className="text-base">{selectedIP.users}</p>
                </div>
              </div>

              {selectedIP.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Notes</p>
                  <p className="text-base">{selectedIP.notes}</p>
                </div>
              )}

              <div className="pt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Activity</h4>
                <div className="space-y-2">
                  {logs
                    .filter((log) => log.ip === selectedIP.ip)
                    .slice(0, 5)
                    .map((log, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-gray-500">{log.user}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                          <p className="text-sm text-gray-500">{format(log.timestamp, "dd MMM yyyy HH:mm")}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                {selectedIP.status !== "Blocked" ? (
                  <Button variant="destructive" onClick={() => handleBlockIP(selectedIP)}>
                    <Lock className="h-4 w-4 mr-2" />
                    Block IP
                  </Button>
                ) : (
                  <Button variant="outline">
                    <Check className="h-4 w-4 mr-2" />
                    Unblock IP
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Block IP Dialog */}
      <Dialog open={isBlockIPDialogOpen} onOpenChange={setIsBlockIPDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Block IP Address</DialogTitle>
            <DialogDescription>
              Are you sure you want to block this IP address? Users from this IP will not be able to access the site.
            </DialogDescription>
          </DialogHeader>
          {selectedIP && (
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-red-50">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <p className="font-medium text-red-600">Warning</p>
                </div>
                <p className="mt-2 text-sm text-red-600">
                  Blocking IP address {selectedIP.ip} will prevent all users from this IP from accessing the site.
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsBlockIPDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmBlockIP}>
                  Block IP
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
