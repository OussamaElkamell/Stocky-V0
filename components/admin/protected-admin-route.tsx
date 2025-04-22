"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAdminLoggedIn } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface ProtectedAdminRouteProps {
  children: React.ReactNode
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  // Vérifier si c'est la page de connexion
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    // Ne pas vérifier l'authentification sur la page de login
    if (isLoginPage) {
      setIsLoading(false)
      return
    }

    // Vérifier l'authentification
    const checkAuth = () => {
      const authenticated = isAdminLoggedIn()
      setIsAuthorized(authenticated)
      setIsLoading(false)

      if (!authenticated && !isLoginPage) {
        // Rediriger vers la page de connexion avec l'URL de retour
        router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`)
      }
    }

    checkAuth()
  }, [pathname, isLoginPage, router])

  // Si c'est la page de connexion, afficher directement le contenu
  if (isLoginPage) {
    return <>{children}</>
  }

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-slate-300">Chargement du panneau d'administration...</p>
        </div>
      </div>
    )
  }

  // Si l'utilisateur n'est pas autorisé, ne rien afficher
  // (la redirection est gérée dans l'effet)
  if (!isAuthorized) {
    return null
  }

  // Si l'utilisateur est autorisé, afficher le contenu
  return <>{children}</>
}
