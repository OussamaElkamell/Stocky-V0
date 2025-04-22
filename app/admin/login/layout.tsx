import type { ReactNode } from "react"

export default function AdminLoginLayout({ children }: { children: ReactNode }) {
  // Layout minimal sans aucun élément d'interface admin
  return <>{children}</>
}
