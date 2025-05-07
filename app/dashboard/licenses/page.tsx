"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Download, Info, RefreshCw } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function LicensesPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("active")
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  if (!user) return null

  // Sahte lisans verileri
  const activeLicense = {
    key: "ABCDE-12345-FGHIJ-67890-KLMNO",
    product: "VALORANT INTERNAL PRIVATE",
    type: user.subscriptionType,
    purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 gün önce
    expiryDate: user.subscriptionEnd,
    status: "Active",
    hwid: user.hwid,
    activations: 1,
    maxActivations: 1,
  }

  // Sahte geçmiş lisans verileri
  const licenseHistory = [
    {
      key: "PQRST-67890-UVWXY-12345-ZABCD",
      product: "VALORANT INTERNAL PRIVATE",
      type: "1 Week",
      purchaseDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 gün önce
      expiryDate: new Date(Date.now() - 53 * 24 * 60 * 60 * 1000), // 53 gün önce
      status: "Expired",
    },
    {
      key: "EFGHI-24680-JKLMN-13579-OPQRS",
      product: "HWID SPOOFER",
      type: "Lifetime",
      purchaseDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 gün önce
      expiryDate: new Date(Date.now() + 365 * 10 * 24 * 60 * 60 * 1000), // 10 yıl sonra
      status: "Active",
    },
  ]

  // Sahte yazılım indirme bağlantıları
  const downloads = [
    {
      name: "VALORANT INTERNAL PRIVATE",
      version: "v2.5.0",
      releaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 gün önce
      size: "15.2 MB",
      url: "#",
      notes: "Vanguard bypass güncellemesi ve yeni özellikler",
    },
    {
      name: "HWID SPOOFER",
      version: "v1.8.3",
      releaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 gün önce
      size: "8.7 MB",
      url: "#",
      notes: "Windows 11 22H2 desteği eklendi",
    },
    {
      name: "LOADER",
      version: "v3.0.1",
      releaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 gün önce
      size: "4.3 MB",
      url: "#",
      notes: "Yeni arayüz ve geliştirilmiş güvenlik",
    },
  ]

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    // Kopyalama başarılı bildirimi gösterilebilir
  }

  const handleResetHWID = () => {
    setIsResetting(true)

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setIsResetting(false)
      setIsResetDialogOpen(false)
      // HWID sıfırlama başarılı bildirimi gösterilebilir
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Lisanslarım</h1>
        <p className="text-gray-400">Lisans anahtarlarını ve yazılım indirmelerini yönet</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Aktif Lisanslar</TabsTrigger>
          <TabsTrigger value="history">Lisans Geçmişi</TabsTrigger>
          <TabsTrigger value="downloads">Yazılım İndirmeleri</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Aktif Lisans</CardTitle>
              <CardDescription>Mevcut aktif lisans bilgilerin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-800 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{activeLicense.product}</h3>
                    <Badge>{activeLicense.status}</Badge>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-400">Lisans Anahtarı</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <code className="rounded bg-gray-800 px-2 py-1 text-sm font-mono">{activeLicense.key}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyKey(activeLicense.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Lisans Türü</p>
                      <p className="mt-1 font-medium">{activeLicense.type}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Satın Alma Tarihi</p>
                      <p className="mt-1 font-medium">{activeLicense.purchaseDate.toLocaleDateString()}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Bitiş Tarihi</p>
                      <p className="mt-1 font-medium">{activeLicense.expiryDate.toLocaleDateString()}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">HWID</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <code className="rounded bg-gray-800 px-2 py-1 text-sm font-mono truncate max-w-[200px]">
                          {activeLicense.hwid}
                        </code>
                        <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-800">
                            <DialogHeader>
                              <DialogTitle>HWID Sıfırlama</DialogTitle>
                              <DialogDescription>
                                HWID'nizi sıfırlamak istediğinizden emin misiniz? Bu işlem, mevcut cihazınızdaki oturumu
                                sonlandıracak ve yeni bir cihazda etkinleştirmenize olanak tanıyacaktır.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="reset-reason">Sıfırlama Nedeni</Label>
                                <Input
                                  id="reset-reason"
                                  placeholder="Örn: Bilgisayarımı değiştirdim"
                                  className="bg-gray-800 border-gray-700"
                                />
                              </div>
                              <Alert variant="destructive">
                                <Info className="h-4 w-4" />
                                <AlertTitle>Dikkat</AlertTitle>
                                <AlertDescription>
                                  HWID sıfırlama hakkınız 30 günde bir kez kullanılabilir. Bu işlem geri alınamaz.
                                </AlertDescription>
                              </Alert>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                                İptal
                              </Button>
                              <Button variant="destructive" onClick={handleResetHWID} disabled={isResetting}>
                                {isResetting ? "Sıfırlanıyor..." : "HWID'yi Sıfırla"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Aktivasyon</p>
                      <p className="mt-1 font-medium">
                        {activeLicense.activations} / {activeLicense.maxActivations}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Yazılımı İndir
                    </Button>
                    <Button variant="outline">Lisans Detayları</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Lisans Geçmişi</CardTitle>
              <CardDescription>Önceki ve mevcut tüm lisanslarınız</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ürün</TableHead>
                    <TableHead>Lisans Anahtarı</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>Satın Alma</TableHead>
                    <TableHead>Bitiş</TableHead>
                    <TableHead>Durum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{activeLicense.product}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="rounded bg-gray-800 px-2 py-1 text-xs font-mono">
                          {activeLicense.key.substring(0, 10)}...
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleCopyKey(activeLicense.key)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{activeLicense.type}</TableCell>
                    <TableCell>{activeLicense.purchaseDate.toLocaleDateString()}</TableCell>
                    <TableCell>{activeLicense.expiryDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge>Aktif</Badge>
                    </TableCell>
                  </TableRow>
                  {licenseHistory.map((license, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{license.product}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <code className="rounded bg-gray-800 px-2 py-1 text-xs font-mono">
                            {license.key.substring(0, 10)}...
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopyKey(license.key)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{license.type}</TableCell>
                      <TableCell>{license.purchaseDate.toLocaleDateString()}</TableCell>
                      <TableCell>{license.expiryDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={license.status === "Active" ? "default" : "secondary"}>
                          {license.status === "Active" ? "Aktif" : "Süresi Doldu"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Yazılım İndirmeleri</CardTitle>
              <CardDescription>Ürünlerinizin en son sürümlerini indirin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {downloads.map((download, index) => (
                  <div key={index} className="rounded-lg border border-gray-800 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{download.name}</h3>
                        <div className="mt-1 flex items-center space-x-4">
                          <p className="text-sm text-gray-400">Versiyon: {download.version}</p>
                          <p className="text-sm text-gray-400">Boyut: {download.size}</p>
                          <p className="text-sm text-gray-400">
                            Yayınlanma: {download.releaseDate.toLocaleDateString()}
                          </p>
                        </div>
                        <p className="mt-2 text-sm">{download.notes}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button asChild>
                          <a href={download.url}>
                            <Download className="mr-2 h-4 w-4" />
                            İndir
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
