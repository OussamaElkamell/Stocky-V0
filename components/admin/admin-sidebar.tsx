"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Shield,
  Store,
  Menu,
  LayoutDashboard,
  Users,
  BarChart3,
  BellRing,
  FileText,
  Plug,
  CreditCard,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Définition des éléments de navigation
export const adminNavItems = [
  {
    icon: <LayoutDashboard />,
    label: "Vue d'ensemble",
    href: "/admin/overview",
  },
  {
    icon: <Users />,
    label: "Utilisateurs",
    href: "/admin/users",
  },
  {
    icon: <BarChart3 />,
    label: "Statistiques",
    href: "/admin/stats",
  },
  {
    icon: <BellRing />,
    label: "Alertes",
    href: "/admin/alertes",
  },
  {
    icon: <FileText />,
    label: "Logs système",
    href: "/admin/logs",
  },
  {
    icon: <Plug />,
    label: "Intégrations",
    href: "/admin/integrations",
  },
  {
    icon: <CreditCard />,
    label: "Abonnements",
    href: "/admin/plans",
  },
  {
    icon: <Settings />,
    label: "Paramètres",
    href: "/admin/settings",
  },
]

// Composant pour les éléments de navigation
function NavItem({
  icon,
  label,
  href,
  isActive = false,
  isCollapsed = false,
}: {
  icon: React.ReactNode
  label: string
  href: string
  isActive?: boolean
  isCollapsed?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
        isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <span className="flex h-6 w-6 items-center justify-center">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  )
}

interface AdminSidebarProps {
  isMobile?: boolean
  onClose?: () => void
}

export function AdminSidebar({ isMobile = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Ne pas permettre de réduire la sidebar sur mobile
  const canCollapse = !isMobile

  return (
    <div
      className={`${
        isMobile
          ? "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300"
          : isCollapsed
            ? "w-20"
            : "w-64"
      } bg-slate-900 text-white transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-emerald-400" />
          <span className={`font-bold text-xl ${isCollapsed && !isMobile && "hidden"}`}>Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={isMobile ? onClose : () => canCollapse && setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-slate-800"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-6 px-2">
        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-slate-300 hover:bg-slate-800 hover:text-white mb-4"
          >
            <span className="flex h-6 w-6 items-center justify-center">
              <Store />
            </span>
            {!(isCollapsed && !isMobile) && <span>Retour au Dashboard</span>}
          </Link>

          {adminNavItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
              isCollapsed={isCollapsed && !isMobile}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}
