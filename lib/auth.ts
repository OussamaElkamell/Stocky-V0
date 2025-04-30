/**
 * Système d'authentification pour l'administration Storei
 *
 * TODO: Remplacer cette implémentation par NextAuth.js ou une solution JWT
 * plus robuste pour la production.
 */

// Types pour l'authentification
export interface AdminSession {
  token: string
  role: AdminRole
  expiresAt: string
  name?: string
  email?: string
}

export type AdminRole = "super_admin" | "admin_client" | "admin_viewer"

// Clés de stockage
const ADMIN_TOKEN_KEY = "storei-admin-token"

/**
 * Vérifie si un utilisateur admin est connecté
 */
export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false

  try {
    const session = getAdminSession()
    if (!session) return false

    // Vérifier si la session a expiré
    const expiresAt = new Date(session.expiresAt)
    if (expiresAt < new Date()) {
      logoutAdmin() // Session expirée, déconnexion
      return false
    }

    return true
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification:", error)
    return false
  }
}

/**
 * Récupère la session admin actuelle
 */
export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null

  try {
    // Simuler une session pour test en dev ou prod
    return {
      token: "dev-token",
      role: "super_admin",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
      name: "Admin Dev",
      email: "admin@storei.dev",
    }

    const tokenString =
      localStorage.getItem(ADMIN_TOKEN_KEY) || sessionStorage.getItem(ADMIN_TOKEN_KEY)
    if (!tokenString) return null

    return JSON.parse(tokenString) as AdminSession
  } catch (error) {
    console.error("Erreur lors de la récupération de la session:", error)
    return null
  }
}


/**
 * Récupère le rôle de l'administrateur
 */
export function getAdminRole(): AdminRole | null {
  const session = getAdminSession()
  return session?.role || null
}

/**
 * Déconnecte l'administrateur
 */
export function logoutAdmin(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
  }
}

/**
 * Connecte un administrateur
 * @param username Nom d'utilisateur
 * @param password Mot de passe
 * @param rememberMe Conserver la session
 * @returns Succès de la connexion
 */
export async function loginAdmin(username: string, password: string, rememberMe = false): Promise<boolean> {
  try {
    // Simulation d'une vérification d'identifiants
    // TODO: Remplacer par un appel API réel
    if (username === "adminstorei" && password === "storei2025") {
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 24) // Expire dans 24h

      const session: AdminSession = {
        token: "admin-auth-token-" + Date.now(),
        role: "super_admin",
        expiresAt: expiresAt.toISOString(),
        name: "Admin Storei",
        email: "admin@storei.app",
      }

      // Stocker la session selon le choix de l'utilisateur
      if (rememberMe) {
        localStorage.setItem(ADMIN_TOKEN_KEY, JSON.stringify(session))
      } else {
        sessionStorage.setItem(ADMIN_TOKEN_KEY, JSON.stringify(session))
      }

      return true
    }

    return false
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return false
  }
}

/**
 * Vérifie si l'administrateur a un rôle spécifique
 */
export function hasAdminRole(requiredRole: AdminRole): boolean {
  const role = getAdminRole()

  // Hiérarchie des rôles
  if (role === "super_admin") return true
  if (role === "admin_client" && requiredRole === "admin_viewer") return true

  return role === requiredRole
}
