import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware pour protéger les routes d'administration
 * (Modified to always allow access)
 */
export function middleware(request: NextRequest) {
  // Vérifier si l'URL contient "/admin/" mais pas "/admin/login"
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin/")

  // Ne rien faire pour les routes non-admin ou la route de login
  if (!isAdminRoute) {
    return NextResponse.next()
  }

  // Always allow access to admin routes, bypassing authentication logic
  return NextResponse.next()
}

// Configurer les chemins pour lesquels le middleware doit s'exécuter
export const config = {
  matcher: ["/admin/:path*"],
}
