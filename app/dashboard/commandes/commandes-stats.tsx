"use client"

import { ArrowUpIcon, DollarSignIcon, PackageIcon, ShoppingCartIcon, TruckIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CommandesStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des commandes</CardTitle>
          <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,248</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 font-medium inline-flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1" /> +12.5%
            </span>{" "}
            depuis le mois dernier
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€24,568.78</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 font-medium inline-flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1" /> +18.2%
            </span>{" "}
            depuis le mois dernier
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Commandes en attente</CardTitle>
          <PackageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 font-medium inline-flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1" /> +8.1%
            </span>{" "}
            depuis la semaine dernière
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux de livraison</CardTitle>
          <TruckIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98.2%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 font-medium inline-flex items-center">
              <ArrowUpIcon className="h-3 w-3 mr-1" /> +1.2%
            </span>{" "}
            depuis le mois dernier
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
