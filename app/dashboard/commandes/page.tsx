"use client"

import { Suspense } from "react"
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommandesTable } from "./commandes-table"
import { CommandesTableSkeleton } from "./commandes-table-skeleton"
import { DateRangePicker } from "./date-range-picker"
import { CommandesStats } from "./commandes-stats"
import { CommandesFilters } from "./commandes-filters"
import type { DateRange } from "react-day-picker"
import { useState } from "react"
import { date } from "zod"

export default function CommandesPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })
  const [facetFilters, setFacetFilters] = useState<Record<string, string[]>>({});
  const updateFacetFilters = (filters: Record<string, string[]>) => {
    setFacetFilters(filters);
  };
  
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Commandes</h1>
        <p className="text-muted-foreground">Gérez et suivez toutes les commandes de votre boutique.</p>
      </div>

      <CommandesStats />

      <Tabs defaultValue="toutes" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="toutes">Toutes</TabsTrigger>
            <TabsTrigger value="en-cours">En cours</TabsTrigger>
            <TabsTrigger value="expediees">Expédiées</TabsTrigger>
            <TabsTrigger value="livrees">Livrées</TabsTrigger>
            <TabsTrigger value="annulees">Annulées</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Rechercher..." className="w-full sm:w-[200px] pl-8" />
            </div>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Button variant="outline" size="icon">
              <DownloadIcon className="h-4 w-4" />
              <span className="sr-only">Exporter</span>
            </Button>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Nouvelle commande
            </Button>
          </div>
        </div>

        <CommandesFilters value={facetFilters} onChange={setFacetFilters}/>

        <TabsContent value="toutes" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Toutes les commandes</CardTitle>
              <CardDescription>Liste complète de toutes les commandes de votre boutique.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable dateRange={dateRange} facetFilters={facetFilters} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="en-cours" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Commandes en cours</CardTitle>
              <CardDescription>Commandes qui sont en cours de traitement ou d'expédition.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable status="en-cours" dateRange={dateRange}  facetFilters={facetFilters} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expediees" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Commandes expédiées</CardTitle>
              <CardDescription>Commandes qui ont été expédiées mais pas encore livrées.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable status="expediees" dateRange={dateRange} facetFilters={facetFilters} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="livrees" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Commandes livrées</CardTitle>
              <CardDescription>Commandes qui ont été livrées avec succès.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable status="livrees" dateRange={dateRange} facetFilters={facetFilters} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="annulees" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Commandes annulées</CardTitle>
              <CardDescription>Commandes qui ont été annulées par le client ou par vous.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable status="annulees" dateRange={dateRange} facetFilters={facetFilters} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
