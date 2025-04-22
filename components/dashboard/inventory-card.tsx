import Link from "next/link"
import { AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"

export function DashboardInventoryCard() {
  // Sample data for low stock items
  const lowStockItems = [
    {
      id: 2,
      name: "Casquette Logo",
      sku: "CAP-LOGO-BLU",
      category: "Accessoires",
      quantity: 3,
      status: "low-stock",
    },
    {
      id: 5,
      name: "Gourde isotherme",
      sku: "BTL-THRM-SLV",
      category: "Accessoires",
      quantity: 2,
      status: "low-stock",
    },
    {
      id: 3,
      name: "Chaussettes Sport",
      sku: "SOCK-SPT-L-WHT",
      category: "Vêtements",
      quantity: 0,
      status: "out-of-stock",
    },
    {
      id: 8,
      name: "Montre Sport",
      sku: "WATCH-SPORT-BLK",
      category: "Accessoires",
      quantity: 0,
      status: "out-of-stock",
    },
  ]

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Alertes de stock</CardTitle>
          <CardDescription>Produits en rupture ou stock faible</CardDescription>
        </div>
        <AlertTriangle className="h-5 w-5 text-amber-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.sku}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className={`font-medium ${item.quantity === 0 ? "text-rose-500" : "text-amber-500"}`}>
                  {item.quantity} en stock
                </p>
                <StatusBadge status={item.status} type="inventory" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/inventory">
            Gérer l&apos;inventaire
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
