"use client";

import { Suspense } from "react";
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommandesTable } from "./commandes-table";
import { CommandesTableSkeleton } from "./commandes-table-skeleton";
import { DateRangePicker } from "./date-range-picker";
import { CommandesStats } from "./commandes-stats";
import { CommandesFilters } from "./commandes-filters";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { date } from "zod";
import { Commande } from "./models/commande";
import { convertCommandes } from "./models/commande";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CommandeForm } from "./commande-form/commande-form";
import rawCommandes from "./data/commandes.json";

export default function CommandesPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });
  const [facetFilters, setFacetFilters] = useState<Record<string, string[]>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [commandes, setCommandes] = useState<Commande[]>(
    convertCommandes(rawCommandes)
  );

  const addCommande = (newCommande: Commande) => {
    setCommandes((prevCommandes) => {
      const updatedCommandes = [...prevCommandes, newCommande];
      console.log("Updated Commandes:", updatedCommandes); // Debugging
      return updatedCommandes;
    });
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Commandes</h1>
        <p className="text-muted-foreground">
          Gérez et suivez toutes les commandes de votre boutique.
        </p>
      </div>

      <CommandesStats />

      <Tabs defaultValue="toutes" className="w-full">
        <div className="flex flex-col gap-4 mb-4">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex min-w-max gap-2">
              <TabsTrigger value="toutes">Toutes</TabsTrigger>
              <TabsTrigger value="en-attente">En attente</TabsTrigger>
              <TabsTrigger value="en-preparation">En préparation</TabsTrigger>
              <TabsTrigger value="expediees">Expédiées</TabsTrigger>
              <TabsTrigger value="livrees">Livrées</TabsTrigger>
              <TabsTrigger value="annulees">Annulées</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="w-full sm:w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Button variant="outline" size="icon">
              <DownloadIcon className="h-4 w-4" />
              <span className="sr-only">Exporter</span>
            </Button>
            <div className="flex justify-start overflow-y-auto">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setOpen(true)}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Nouvelle commande
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[100vh] overflow-y-auto">
                  <CommandeForm
                    onClose={() => setOpen(false)}
                    onAddCommande={addCommande}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <CommandesFilters value={facetFilters} onChange={setFacetFilters} />

        <TabsContent value="toutes" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Toutes les commandes</CardTitle>
              <CardDescription>
                Liste complète de toutes les commandes de votre boutique.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable
                  commandesState={commandes}
                  setCommandesState={setCommandes}
                  dateRange={dateRange}
                  facetFilters={facetFilters}
                  search={searchTerm}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="en-attente" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Commandes en attente</CardTitle>
              <CardDescription>
                Commandes qui sont en cours de traitement.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable
                  commandesState={commandes}
                  setCommandesState={setCommandes}
                  status="en-attente"
                  dateRange={dateRange}
                  facetFilters={facetFilters}
                  search={searchTerm}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="en-preparation" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Commandes en préparation</CardTitle>
              <CardDescription>
                Commandes qui sont en cours de préparation.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable
                  commandesState={commandes}
                  setCommandesState={setCommandes}
                  status="en-preparation"
                  dateRange={dateRange}
                  facetFilters={facetFilters}
                  search={searchTerm}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expediees" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Commandes expédiées</CardTitle>
              <CardDescription>
                Commandes qui ont été expédiées mais pas encore livrées.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable
                  commandesState={commandes}
                  setCommandesState={setCommandes}
                  status="expediees"
                  dateRange={dateRange}
                  facetFilters={facetFilters}
                  search={searchTerm}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="livrees" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Commandes livrées</CardTitle>
              <CardDescription>
                Commandes qui ont été livrées avec succès.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable
                  commandesState={commandes}
                  setCommandesState={setCommandes}
                  status="livrees"
                  dateRange={dateRange}
                  facetFilters={facetFilters}
                  search={searchTerm}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="annulees" className="mt-0">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Commandes annulées</CardTitle>
              <CardDescription>
                Commandes qui ont été annulées par le client ou par vous.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<CommandesTableSkeleton />}>
                <CommandesTable
                  commandesState={commandes}
                  setCommandesState={setCommandes}
                  status="annulees"
                  dateRange={dateRange}
                  facetFilters={facetFilters}
                  search={searchTerm}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
