"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ValorantHacksModal } from "./product-modals/valorant-hacks-modal"
import { ValorantBypassModal } from "./product-modals/valorant-bypass-modal"
import { HwidSpooferModal } from "./product-modals/hwid-spoofer-modal"

export function ProductCategories() {
  const [activeTab, setActiveTab] = useState("valorant")
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleProductClick = (productId: string) => {
    setSelectedProduct(productId)
    setIsProductModalOpen(true)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>

      <Tabs defaultValue="valorant" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 mb-8">
          <TabsTrigger value="valorant">VALORANT</TabsTrigger>
        </TabsList>

        <TabsContent value="valorant" className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <Card className="overflow-hidden border-2 border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-red-900 to-red-600 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-white">VALORANT INTERNAL PRIVATE</h3>
                    <Badge className="bg-red-500 hover:bg-red-600">Premium</Badge>
                  </div>

                  <div className="space-y-2 text-white mb-6">
                    <p>AMD & NVIDIA</p>
                    <p>Windows 10/11 [All Versions]</p>
                    <p>INTEL & AMD CPUs</p>
                    <p>HVCI ON/OFF</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Features Internal:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h5 className="text-lg font-medium text-white mb-1">Aimbot:</h5>
                          <ul className="list-disc list-inside text-gray-200 space-y-1">
                            <li>Enable (ON/OFF)</li>
                            <li>Custom Smoothness</li>
                            <li>Custom Aimkey</li>
                            <li>Recoil Control</li>
                            <li>Custom Bone</li>
                            <li>VisibleCheck</li>
                            <li>Fov Color</li>
                            <li>Draw Fov</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-lg font-medium text-white mb-1">Visuals:</h5>
                          <ul className="list-disc list-inside text-gray-200 space-y-1">
                            <li>Weapon Name</li>
                            <li>Agent Name</li>
                            <li>Health Bar</li>
                            <li>Spike Info</li>
                            <li>Skeleton</li>
                            <li>2D Box</li>
                            <li>3D Box</li>
                            <li>Corner Box</li>
                            <li>Visible Box</li>
                            <li>Head Circle</li>
                            <li>Cyhper Wires</li>
                            <li>Snapline (Chams Need To Be Off)</li>
                          </ul>
                        </div>

                        <div>
                          <div className="mb-4">
                            <h5 className="text-lg font-medium text-white mb-1">Chams:</h5>
                            <ul className="list-disc list-inside text-gray-200 space-y-1">
                              <li>Rainbow Chams</li>
                              <li>Custom Glow</li>
                              <li>Custom RGB</li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="text-lg font-medium text-white mb-1">Exploit:</h5>
                            <ul className="list-disc list-inside text-gray-200 space-y-1">
                              <li>Skin Changer</li>
                              <li>Skip Tutorial</li>
                              <li>Custom Fov</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Inject Types:</h4>
                      <ul className="list-disc list-inside text-gray-200 space-y-1">
                        <li>Sadece internal hile injectleme (safe)</li>
                        <li>20 DAKİKA BEKLEMELİ VANGUARD BYPASSLI İNJECT(SAFER BEST)</li>
                        <li>Beklemeden vanguard bypasslı inject (beta)</li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Fiyatlandırma:</h4>
                        <ul className="list-none text-gray-200 space-y-1">
                          <li>
                            3 Günlük: <span className="font-bold">700 TL</span>
                          </li>
                          <li>
                            1 Haftalık: <span className="font-bold">1400 TL</span>
                          </li>
                          <li>
                            1 Aylık: <span className="font-bold">2800 TL</span>
                          </li>
                          <li>
                            Lifetime: <span className="font-bold">5500 TL</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Pricing:</h4>
                        <ul className="list-none text-gray-200 space-y-1">
                          <li>
                            3 Day: <span className="font-bold">20 Dolar</span>
                          </li>
                          <li>
                            1 Week: <span className="font-bold">40 Dolar</span>
                          </li>
                          <li>
                            1 Month: <span className="font-bold">75 Dolar</span>
                          </li>
                          <li>
                            Lifetime: <span className="font-bold">150 Dolar</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg"
                      onClick={() => window.open("https://discord.gg/vQYVJWqqQw", "_blank")}
                    >
                      SATIN AL
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {selectedProduct === "valorant-hacks" && (
        <ValorantHacksModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} />
      )}

      {selectedProduct === "valorant-bypass" && (
        <ValorantBypassModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} />
      )}

      {selectedProduct === "hwid-spoofer" && (
        <HwidSpooferModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} />
      )}
    </div>
  )
}
