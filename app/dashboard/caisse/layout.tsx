import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Caisse - Système de Point de Vente",
  description: "Système de caisse pour gérer les ventes et les paiements",
}

export default function CaisseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Système de Caisse</h1>
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
