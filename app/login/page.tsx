"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">SHIELD SOFTWARE</CardTitle>
            <CardDescription className="text-center">Hesabınıza giriş yapın</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Hata</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Şifre</Label>
                    <Link href="/forgot-password" className="text-xs text-gray-400 hover:text-white">
                      Şifremi Unuttum
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Giriş Yapılıyor...
                    </>
                  ) : (
                    "Giriş Yap"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-400">
              <span>Hesabınız yok mu? </span>
              <Link href="/register" className="text-red-500 hover:text-red-400">
                Kayıt Ol
              </Link>
            </div>
            <div className="text-center text-xs text-gray-500">
              Giriş yaparak,{" "}
              <Link href="/terms" className="underline">
                Kullanım Şartları
              </Link>{" "}
              ve{" "}
              <Link href="/privacy" className="underline">
                Gizlilik Politikası
              </Link>
              'nı kabul etmiş olursunuz.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
