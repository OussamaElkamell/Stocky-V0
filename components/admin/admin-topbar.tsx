"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Bell, Menu, User, LogOut, Settings, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getAdminRole, logoutAdmin } from "@/lib/auth"
import { adminNavItems } from "./admin-sidebar"

interface AdminTopbarProps {
  onOpenMobileSidebar: () => void
}

export function AdminTopbar({ onOpenMobileSidebar }: AdminTopbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
  const userRole = getAdminRole()

  // Obtenir le titre de la page actuelle
  const getPageTitle = () => {
    if (pathname === "/admin") return "Espace Administrateur Storei"

    // Rechercher dans les éléments de navigation
    const navItem = adminNavItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))

    return navItem?.label || "Administration"
  }

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    logoutAdmin()
    router.push("/admin/login")
  }

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onOpenMobileSidebar}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center md:hidden">
          <Shield className="h-6 w-6 text-emerald-400" />
          <span className="font-bold text-xl ml-2">Admin</span>
        </div>

        <div className="hidden md:block">
          <h1 className="text-xl font-bold">{getPageTitle()}</h1>
        </div>

        <div className="mx-auto relative w-full max-w-md">
          <Input type="search" placeholder="Rechercher..." className="pl-8 w-full bg-slate-50 hidden md:block" />
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-rose-500"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-slate-800 text-white">
                    {userRole === "super_admin" ? "SA" : userRole === "admin_client" ? "AC" : "AV"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {userRole === "super_admin"
                  ? "Super Admin"
                  : userRole === "admin_client"
                    ? "Admin Client"
                    : "Admin Viewer"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowLogoutConfirmation(true)}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dialog de confirmation de déconnexion */}
          <Dialog open={showLogoutConfirmation} onOpenChange={setShowLogoutConfirmation}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirmer la déconnexion</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir vous déconnecter ? Toutes les modifications non enregistrées seront perdues.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex space-x-2 justify-end">
                <Button variant="outline" onClick={() => setShowLogoutConfirmation(false)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
