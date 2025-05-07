"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Clock, Download, ExternalLink, Key, Shield, AlertTriangle, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) return null

  // Abonelik durumunu kontrol et
  const now = new Date()
  const daysLeft = Math.ceil((user.subscriptionEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const isExpiringSoon = daysLeft <= 7
  const isExpired = daysLeft <= 0

  // Sahte lisans verileri
  const license = {
    key: "ABCDE-12345-FGHIJ-67890-KLMNO",
    status: "Active",
    activatedOn: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 gün önce
  }

  // Sahte duyurular
  const announcements = [
    {
      id: 1,
      title: "Yeni Güncelleme: v2.5.0",
      description: "Valorant hilemiz için yeni özellikler ve iyileştirmeler içeren güncelleme yayınlandı.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 gün önce
    },
    {
      id: 2,
      title: "Bakım Duyurusu",
      description: "Sunucularımız 15 Mayıs 2023 tarihinde 02:00-04:00 saatleri arasında bakımda olacaktır.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 gün önce
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hoş Geldin, {user.username}</h1>
        <p className="text-gray-400">Hesap durumunu ve ürünlerini buradan yönetebilirsin.</p>
      </div>

      {isExpired ? (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Aboneliğin Sona Erdi</AlertTitle>
          <AlertDescription>
            Aboneliğin sona erdi. Hizmetlerimize erişim sağlamak için lütfen aboneliğini yenile.
            <Button variant="outline" className="ml-4" size="sm" asChild>
              <Link href="/dashboard/billing">Aboneliği Yenile</Link>
            </Button>
          </AlertDescription>
        </Alert>
      ) : isExpiringSoon ? (
        <Alert variant="default" className="mb-6 border-yellow-500 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertTitle className="text-yellow-500">Aboneliğin Yakında Sona Eriyor</AlertTitle>
          <AlertDescription>
            Aboneliğinin bitmesine {daysLeft} gün kaldı. Kesintisiz hizmet için aboneliğini yenilemeyi unutma.
            <Button variant="outline" className="ml-4" size="sm" asChild>
              <Link href="/dashboard/billing">Aboneliği Yenile</Link>
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Abonelik Durumu</CardTitle>
            <CardDescription>Mevcut abonelik bilgilerin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Plan:</span>
                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">
                  {user.subscriptionType}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Durum:</span>
                <Badge variant={isExpired ? "destructive" : "default"}>{isExpired ? "Sona Erdi" : "Aktif"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Bitiş Tarihi:</span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-gray-400" />
                  {user.subscriptionEnd.toLocaleDateString()}
                </span>
              </div>
              <Button className="w-full" asChild>
                <Link href="/dashboard/billing">Aboneliği Yönet</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Lisans Anahtarı</CardTitle>
            <CardDescription>Aktif lisans bilgilerin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Anahtar:</span>
                <code className="rounded bg-gray-800 px-2 py-1 text-sm font-mono">
                  {license.key.substring(0, 10)}...
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Durum:</span>
                <Badge variant="default">Aktif</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Aktifleştirildi:</span>
                <span>{license.activatedOn.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">HWID:</span>
                <code className="rounded bg-gray-800 px-2 py-1 text-sm font-mono truncate max-w-[150px]">
                  {user.hwid}
                </code>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Key className="mr-2 h-4 w-4" />
                  Görüntüle
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  İndir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Hızlı Erişim</CardTitle>
            <CardDescription>Sık kullanılan işlemler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/support">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Destek Talebi Oluştur
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/security">
                  <Shield className="mr-2 h-4 w-4" />
                  HWID Sıfırla
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="https://discord.gg/vQYVJWqqQw" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Discord Sunucumuza Katıl
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/licenses">
                  <Download className="mr-2 h-4 w-4" />
                  Yazılımı İndir
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Duyurular</CardTitle>
            <CardDescription>Son güncellemeler ve duyurular</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="rounded-lg border border-gray-800 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <span className="text-xs text-gray-400">{announcement.date.toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-400">{announcement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
