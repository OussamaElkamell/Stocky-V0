import type React from "react"
import { CreditCard, ShoppingCart, Package, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardKPISection() {
  // Sample data for KPIs
  const kpiData = {
    totalSales: {
      value: "24,780 TND",
      change: 12.5,
      trend: "up",
    },
    orders: {
      value: "342",
      change: 8.2,
      trend: "up",
    },
    inventory: {
      value: "1,245",
      change: 3.7,
      trend: "up",
    },
    clients: {
      value: "156",
      change: 5.3,
      trend: "up",
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Ventes totales"
        value={kpiData.totalSales.value}
        change={kpiData.totalSales.change}
        trend={kpiData.totalSales.trend}
        icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
      />

      <KPICard
        title="Commandes"
        value={kpiData.orders.value}
        change={kpiData.orders.change}
        trend={kpiData.orders.trend}
        icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
      />

      <KPICard
        title="Produits en stock"
        value={kpiData.inventory.value}
        change={kpiData.inventory.change}
        trend={kpiData.inventory.trend}
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
      />

      <KPICard
        title="Clients"
        value={kpiData.clients.value}
        change={kpiData.clients.change}
        trend={kpiData.clients.trend}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}

interface KPICardProps {
  title: string
  value: string
  change: number
  trend: "up" | "down"
  icon: React.ReactNode
}

function KPICard({ title, value, change, trend, icon }: KPICardProps) {
  // Get trend color
  const getTrendColor = (trend: string): string => {
    return trend === "up" ? "text-emerald-500" : "text-rose-500"
  }

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-rose-500" />
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <span className={`text-xs ${getTrendColor(trend)}`}>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          <span className="mx-1 text-xs text-muted-foreground">vs période précédente</span>
          {getTrendIcon(trend)}
        </div>
      </CardContent>
    </Card>
  )
}
