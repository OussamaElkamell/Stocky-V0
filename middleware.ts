import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware pour protéger les routes d'administration
 *
 * TODO: Remplacer par une solution basée sur NextAuth.js ou JWT
 * pour une meilleure sécurité en production
 */
export function middleware(request: NextRequest) {
  // Vérifier si l'URL contient "/admin/" mais pas "/admin/login"
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin/")
  const isLoginRoute = request.nextUrl.pathname === "/admin/login"

  // Ne rien faire pour les routes non-admin ou la route de login
  if (!isAdminRoute || isLoginRoute) {
    return NextResponse.next()
  }

  // En mode développement/prévisualisation, autoriser toutes les requêtes
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next()
  }

  // Récupérer le token depuis les cookies
  const authToken = request.cookies.get("storei-admin-token")?.value

  // Vérifier si le token existe
  if (!authToken) {
    // Construire l'URL de redirection avec le paramètre redirect
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si le token est présent, laisser passer la requête
  return NextResponse.next()
}

// Configurer les chemins pour lesquels le middleware doit s'exécuter
export const config = {
  matcher: ["/admin/:path*"],
}
