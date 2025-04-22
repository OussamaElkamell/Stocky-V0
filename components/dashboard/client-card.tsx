import Link from "next/link"
import { Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DashboardClientCard() {
  // Sample data for client activity
  const clientActivity = {
    totalClients: 156,
    b2bClients: 42,
    b2cClients: 114,
    activeClients: 138,
    recentActivity: [
      {
        name: "Entreprise Martin",
        type: "b2b",
        action: "Commande",
        time: "10:23",
        value: "124.50 TND",
      },
      {
        name: "Thomas Dubois",
        type: "b2c",
        action: "Visite",
        time: "09:42",
        value: "-",
      },
    ],
  }

  return (
    <Card className="col-span-1 md:col-span-1 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Clients</CardTitle>
          <CardDescription>Activité des clients</CardDescription>
        </div>
        <Users className="h-5 w-5 text-purple-500" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">B2B</p>
            <p className="text-xl font-bold">{clientActivity.b2bClients}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">B2C</p>
            <p className="text-xl font-bold">{clientActivity.b2cClients}</p>
          </div>
        </div>
        <div className="space-y-3">
          {clientActivity.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
              <div>
                <p className="font-medium">{activity.name}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.type === "b2b" ? "B2B" : "B2C"} • {activity.time}
                </p>
              </div>
              <div className="text-right">
                <Badge className="bg-purple-500">{activity.action}</Badge>
                <p className="text-xs text-muted-foreground mt-1">{activity.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/espace-client">
            Gérer les clients
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
