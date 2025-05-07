"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, Upload } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("general")
  const [isUpdating, setIsUpdating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!user) return null

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setIsUpdating(false)
      setShowSuccess(true)

      // 3 saniye sonra başarı mesajını gizle
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1000)
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setIsUpdating(false)
      setShowSuccess(true)

      // 3 saniye sonra başarı mesajını gizle
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profil Ayarları</h1>
        <p className="text-gray-400">Hesap bilgilerini görüntüle ve düzenle</p>
      </div>

      {showSuccess && (
        <Alert className="mb-6 border-green-500 bg-green-500/10">
          <Check className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-500">Başarılı</AlertTitle>
          <AlertDescription>Profil bilgilerin başarıyla güncellendi.</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
          <TabsTrigger value="security">Şifre ve Güvenlik</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Profil Bilgileri</CardTitle>
                <CardDescription>Kişisel bilgilerini güncelle</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Kullanıcı Adı</Label>
                      <Input id="username" defaultValue={user.username} className="bg-gray-800 border-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta Adresi</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discord">Discord Kullanıcı Adı</Label>
                      <Input id="discord" placeholder="username#0000" className="bg-gray-800 border-gray-700" />
                    </div>
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Güncelleniyor..." : "Bilgileri Güncelle"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Profil Fotoğrafı</CardTitle>
                <CardDescription>Profil fotoğrafını değiştir</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                  <AvatarFallback className="text-4xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Fotoğraf Yükle
                  </Button>
                  <Button variant="outline" className="text-red-500 hover:text-red-600">
                    Kaldır
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-gray-400">PNG, JPG veya GIF. Maksimum 2MB.</CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>Hesabının güvenliği için şifreni düzenli olarak değiştir</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mevcut Şifre</Label>
                    <Input id="current-password" type="password" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Yeni Şifre</Label>
                    <Input id="new-password" type="password" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
                    <Input id="confirm-password" type="password" className="bg-gray-800 border-gray-700" />
                  </div>
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Hesap Güvenliği</CardTitle>
              <CardDescription>Hesabının güvenlik ayarlarını yönet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium">İki Faktörlü Kimlik Doğrulama (2FA)</h3>
                  <p className="mb-4 text-sm text-gray-400">
                    İki faktörlü kimlik doğrulama, hesabınıza ekstra bir güvenlik katmanı ekler.
                  </p>
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Aktif Değil</AlertTitle>
                    <AlertDescription>
                      Hesabınızı korumak için iki faktörlü kimlik doğrulamayı etkinleştirmenizi öneririz.
                    </AlertDescription>
                  </Alert>
                  <Button>2FA'yı Etkinleştir</Button>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="mb-2 text-lg font-medium">Oturum Geçmişi</h3>
                  <p className="mb-4 text-sm text-gray-400">Hesabınıza yapılan son giriş işlemlerini görüntüleyin.</p>
                  <div className="space-y-2">
                    <div className="rounded-md border border-gray-800 p-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Windows 10 - Chrome</p>
                          <p className="text-sm text-gray-400">IP: 192.168.1.1</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Şimdi</p>
                          <p className="text-xs text-green-500">Aktif Oturum</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border border-gray-800 p-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Windows 10 - Firefox</p>
                          <p className="text-sm text-gray-400">IP: 192.168.1.2</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">2 gün önce</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
