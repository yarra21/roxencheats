"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, User, Activity, Filter, Download, Trash, Search, RefreshCw } from "lucide-react"
import { getLogs, type LogEntry, type LogAction, clearLogs } from "@/services/log-service"

interface LogViewerProps {
  isOpen: boolean
  onClose: () => void
}

export default function LogViewer({ isOpen, onClose }: LogViewerProps) {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState<LogAction | "ALL">("ALL")

  // Logları yükle
  useEffect(() => {
    if (isOpen) {
      const allLogs = getLogs()
      setLogs(allLogs)
      setFilteredLogs(allLogs)
    }
  }, [isOpen])

  // Arama ve filtreleme
  useEffect(() => {
    let result = logs

    // Eylem filtreleme
    if (filterAction !== "ALL") {
      result = result.filter((log) => log.action === filterAction)
    }

    // Arama
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (log) =>
          (log.username && log.username.toLowerCase().includes(term)) ||
          log.action.toLowerCase().includes(term) ||
          (log.details && log.details.toLowerCase().includes(term)) ||
          (log.ip && log.ip.includes(term)),
      )
    }

    setFilteredLogs(result)
  }, [logs, searchTerm, filterAction])

  // ESC tuşuna basıldığında modalı kapat
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

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

  // Logları yenile
  const handleRefresh = () => {
    const allLogs = getLogs()
    setLogs(allLogs)
  }

  // Logları temizle
  const handleClearLogs = () => {
    if (confirm("Tüm log kayıtlarını silmek istediğinize emin misiniz?")) {
      clearLogs()
      setLogs([])
      setFilteredLogs([])
    }
  }

  // Logları JSON olarak indir
  const handleDownloadLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "roxen_logs.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  // Log eylem türüne göre renk belirle
  const getActionColor = (action: LogAction) => {
    switch (action) {
      case "LOGIN":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "LOGOUT":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "REGISTER":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "ADMIN_LOGIN":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "ADMIN_LOGOUT":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "PURCHASE_CLICK":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "DISCORD_VISIT":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
      case "VIEW_PRODUCT":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  // Tarih formatla
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gray-900/95 w-full max-w-6xl h-[90vh] rounded-lg border border-cyan-500 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-cyan-500 mr-2" />
                <h2 className="text-xl font-bold">Kullanıcı Aktivite Logları</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Toolbar */}
            <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <select
                    value={filterAction}
                    onChange={(e) => setFilterAction(e.target.value as LogAction | "ALL")}
                    className="pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 appearance-none"
                  >
                    <option value="ALL">Tüm Eylemler</option>
                    <option value="LOGIN">Giriş</option>
                    <option value="LOGOUT">Çıkış</option>
                    <option value="REGISTER">Kayıt</option>
                    <option value="ADMIN_LOGIN">Admin Girişi</option>
                    <option value="ADMIN_LOGOUT">Admin Çıkışı</option>
                    <option value="PURCHASE_CLICK">Satın Alma</option>
                    <option value="DISCORD_VISIT">Discord Ziyareti</option>
                    <option value="VIEW_PRODUCT">Ürün Görüntüleme</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="flex items-center px-3 py-2 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Yenile
                </button>
                <button
                  onClick={handleDownloadLogs}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  İndir
                </button>
                <button
                  onClick={handleClearLogs}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                >
                  <Trash size={16} className="mr-2" />
                  Temizle
                </button>
              </div>
            </div>

            {/* Log Table */}
            <div className="overflow-auto" style={{ height: "calc(90vh - 130px)" }}>
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-800 text-gray-300 sticky top-0">
                  <tr>
                    <th className="px-4 py-3">Zaman</th>
                    <th className="px-4 py-3">Kullanıcı</th>
                    <th className="px-4 py-3">Eylem</th>
                    <th className="px-4 py-3">IP</th>
                    <th className="px-4 py-3">Detaylar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(log.timestamp)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            {log.username || "Misafir"}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getActionColor(log.action)}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs">{log.ip || "Bilinmiyor"}</td>
                        <td className="px-4 py-3 text-gray-400">{log.details || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                        {logs.length === 0
                          ? "Henüz log kaydı bulunmuyor."
                          : "Filtreleme kriterlerine uygun log bulunamadı."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 bg-gray-900/50 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Toplam {filteredLogs.length} kayıt gösteriliyor (toplam {logs.length} kayıt)
              </div>
              <div className="text-sm text-gray-400">
                <span className="font-mono">ROXEN.AIM</span> Log Sistemi v1.0
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
