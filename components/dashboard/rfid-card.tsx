import Link from "next/link"
import { Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DashboardRfidCard() {
  // Sample data for RFID tracking
  const rfidTracking = {
    trackedProducts: 6,
    activeReaders: 5,
    inactiveReaders: 1,
    locations: 3,
    recentActivity: [
      {
        product: "T-shirt Premium",
        tag: "RFID-78901",
        location: "Boutique Principale",
        time: "10:23",
        action: "Arrivée",
      },
      {
        product: "Chaussettes Sport",
        tag: "RFID-78903",
        location: "En transit",
        time: "09:15",
        action: "Déplacement",
      },
    ],
  }

  return (
    <Card className="col-span-1 md:col-span-1 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Suivi RFID</CardTitle>
          <CardDescription>Activité des produits suivis</CardDescription>
        </div>
        <Tag className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Produits</p>
            <p className="text-xl font-bold">{rfidTracking.trackedProducts}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Lecteurs</p>
            <p className="text-xl font-bold text-emerald-600">{rfidTracking.activeReaders}</p>
            <p className="text-xs text-slate-500">{rfidTracking.inactiveReaders} hors ligne</p>
          </div>
        </div>
        <div className="space-y-3">
          {rfidTracking.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
              <div>
                <p className="font-medium">{activity.product}</p>
                <p className="text-xs text-muted-foreground">{activity.tag}</p>
              </div>
              <div className="text-right">
                <Badge className="bg-blue-500">{activity.action}</Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.location} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/rfid">
            Voir le suivi RFID
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
