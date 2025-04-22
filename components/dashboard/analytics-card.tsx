import Link from "next/link"
import { LineChart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardAnalyticsCard() {
  return (
    <Card className="col-span-1 md:col-span-1 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Analytiques</CardTitle>
          <CardDescription>Résumé des performances</CardDescription>
        </div>
        <LineChart className="h-5 w-5 text-emerald-500" />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-[180px] flex items-center justify-center bg-slate-50 rounded-md mb-4">
          <div className="text-center">
            <LineChart className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Graphique des ventes</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Taux de conversion</p>
            <p className="text-xl font-bold">4.2%</p>
            <p className="text-xs text-emerald-500">+0.8% vs précédent</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Panier moyen</p>
            <p className="text-xl font-bold">72.50 TND</p>
            <p className="text-xs text-emerald-500">+5.2% vs précédent</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/analytics">
            Voir les analytiques
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
