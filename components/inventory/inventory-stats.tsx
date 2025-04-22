import { Package, Layers } from "lucide-react"
import { StatCard } from "@/components/ui/stat-card"
import { Badge } from "@/components/ui/badge"

interface InventoryItem {
  id: number
  name: string
  sku: string
  category: string
  quantity: number
  status: string
  lastUpdated: string
}

interface InventoryStatsProps {
  inventoryItems: InventoryItem[]
}

export function InventoryStats({ inventoryItems }: InventoryStatsProps) {
  // Count unique categories
  const uniqueCategories = Array.from(new Set(inventoryItems.map((p) => p.category))).length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total produits"
        value={inventoryItems.length}
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
        description={`${inventoryItems.filter((p) => p.status === "in-stock").length} en stock`}
      />
      <StatCard
        title="Stock faible"
        value={inventoryItems.filter((p) => p.status === "low-stock").length}
        icon={<Badge className="bg-amber-500">{inventoryItems.filter((p) => p.status === "low-stock").length}</Badge>}
        description="Nécessite votre attention"
      />
      <StatCard
        title="Rupture de stock"
        value={inventoryItems.filter((p) => p.status === "out-of-stock").length}
        icon={<Badge className="bg-rose-500">{inventoryItems.filter((p) => p.status === "out-of-stock").length}</Badge>}
        description="À réapprovisionner"
      />
      <StatCard
        title="Catégories"
        value={uniqueCategories}
        icon={<Layers className="h-4 w-4 text-muted-foreground" />}
        description="Différentes catégories"
      />
    </div>
  )
}
