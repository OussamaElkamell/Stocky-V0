// Définition des types pour l'authentification
export interface TokenData {
  token: string
  role: string
  expiresAt: string
}

// Vérifier si l'utilisateur est authentifié
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  try {
    const tokenData = getTokenData()
    if (!tokenData) return false

    // Vérifier si le token a expiré
    const expiresAt = new Date(tokenData.expiresAt)
    if (expiresAt < new Date()) {
      // Token expiré, le supprimer
      logout()
      return false
    }

    return true
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification:", error)
    return false
  }
}

// Récupérer les données du token
export function getTokenData(): TokenData | null {
  if (typeof window === "undefined") return null

  try {
    // Simuler un token pour la prévisualisation
    if (process.env.NODE_ENV === "development") {
      return {
        token: "preview-token",
        role: "super_admin",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h dans le futur
      }
    }

    const tokenString = localStorage.getItem("storei-admin-token") || sessionStorage.getItem("storei-admin-token")
    if (!tokenString) return null

    return JSON.parse(tokenString) as TokenData
  } catch (error) {
    console.error("Erreur lors de la récupération du token:", error)
    return null
  }
}

// Récupérer le rôle de l'utilisateur
export function getUserRole(): string | null {
  // Simuler un rôle pour la prévisualisation
  if (process.env.NODE_ENV === "development") {
    return "super_admin"
  }

  const tokenData = getTokenData()
  return tokenData?.role || null
}

// Déconnexion
export function logout(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem("storei-admin-token")
    sessionStorage.removeItem("storei-admin-token")
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
  }
}

// Vérifier si l'utilisateur a un rôle spécifique
export function hasRole(requiredRole: string): boolean {
  const role = getUserRole()
  return role === requiredRole
}
