"use client"

import type React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useAuth } from "@/components/auth-provider"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <div className="flex flex-1">
        <aside className="hidden w-64 md:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

