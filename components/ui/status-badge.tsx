import { Badge } from "@/components/ui/badge"

type StatusType =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "in-stock"
  | "low-stock"
  | "out-of-stock"
  | "active"
  | "inactive"

interface StatusBadgeProps {
  status: StatusType
  type?: "order" | "inventory" | "client"
}

export function StatusBadge({ status, type = "order" }: StatusBadgeProps) {
  // Order status badges
  if (type === "order") {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
            En attente
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            En traitement
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
            Expédiée
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Livrée
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-rose-50 text-rose-700 hover:bg-rose-50">
            Annulée
          </Badge>
        )
    }
  }

  // Inventory status badges
  if (type === "inventory") {
    switch (status) {
      case "in-stock":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
            En stock
          </Badge>
        )
      case "low-stock":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
            Stock faible
          </Badge>
        )
      case "out-of-stock":
        return (
          <Badge variant="outline" className="bg-rose-50 text-rose-700 hover:bg-rose-50">
            Rupture
          </Badge>
        )
    }
  }

  // Client status badges
  if (type === "client") {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
            Actif
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700 hover:bg-slate-50">
            Inactif
          </Badge>
        )
    }
  }

  return <Badge variant="outline">Inconnu</Badge>
}
