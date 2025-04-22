import Link from "next/link"
import { ShoppingCart, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { formatDate } from "@/utils/date-formatter"

export function DashboardOrdersCard() {
  // Sample data for recent orders
  const recentOrders = [
    {
      id: "ORD-7352",
      customer: "Sophie Martin",
      date: "2023-04-01T10:23:00",
      amount: "124.50 TND",
      status: "pending",
    },
    {
      id: "ORD-7351",
      customer: "Thomas Dubois",
      date: "2023-04-01T09:42:00",
      amount: "74.99 TND",
      status: "processing",
    },
    {
      id: "ORD-7350",
      customer: "Emma Petit",
      date: "2023-04-01T08:15:00",
      amount: "249.95 TND",
      status: "shipped",
    },
    {
      id: "ORD-7349",
      customer: "Lucas Bernard",
      date: "2023-03-31T16:30:00",
      amount: "89.00 TND",
      status: "delivered",
    },
  ]

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Commandes récentes</CardTitle>
          <CardDescription>Les dernières commandes reçues</CardDescription>
        </div>
        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
              <div>
                <Link href={`/dashboard/commandes/${order.id}`} className="font-medium hover:underline">
                  {order.id}
                </Link>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {formatDate(order.date, false)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{order.amount}</p>
                <StatusBadge status={order.status} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/commandes">
            Voir toutes les commandes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
