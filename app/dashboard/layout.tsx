"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { UserSidebar } from "@/components/user-sidebar"
import { Loader2 } from "lucide-react"
import { redirect } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    )
  }

  if (!isAuthenticated) {
    redirect("/login")
    return null
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <UserSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
