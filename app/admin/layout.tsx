"use client"

import type React from "react"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Ouvrir/fermer la sidebar mobile
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen)
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false)

  return (

      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMobileSidebar} />
        )}

        {/* Mobile Sidebar */}
        {isMobileSidebarOpen && (
          <div className="md:hidden">
            <AdminSidebar isMobile onClose={closeMobileSidebar} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopbar onOpenMobileSidebar={toggleMobileSidebar} />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>

  )
}
