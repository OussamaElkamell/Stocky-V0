"use client"

import { useState } from "react"
import { Filter, MapPin, RefreshCw, Settings, Smartphone, Tag, Wifi } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterBar } from "@/components/ui/filter-bar"
import { formatDate } from "@/utils/date-formatter"

export default function RFIDPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [showOfflineDevices, setShowOfflineDevices] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30)

  // Données de démonstration pour les produits avec RFID
  const rfidProducts = [
    {
      id: "PROD-1234",
      name: "T-shirt Premium",
      sku: "TS-PREM-M-BLK",
      rfidTag: "RFID-78901",
      location: "Boutique Principale",
      zone: "Zone A - Vêtements",
      lastScan: "2023-04-01T10:23:00",
      status: "in-stock",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "PROD-5678",
      name: "Casquette Logo",
      sku: "CAP-LOGO-BLU",
      rfidTag: "RFID-78902",
      location: "Boutique Principale",
      zone: "Zone B - Accessoires",
      lastScan: "2023-04-01T09:42:00",
      status: "in-stock",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "PROD-9012",
      name: "Chaussettes Sport",
      sku: "SOCK-SPT-L-WHT",
      rfidTag: "RFID-78903",
      location: "Entrepôt Central",
      zone: "Zone C - Stockage",
      lastScan: "2023-04-01T08:15:00",
      status: "in-transit",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "PROD-3456",
      name: "Sac à dos",
      sku: "BAG-PACK-BLK",
      rfidTag: "RFID-78904",
      location: "Boutique Secondaire",
      zone: "Zone A - Accessoires",
      lastScan: "2023-03-31T16:30:00",
      status: "in-stock",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "PROD-7890",
      name: "Gourde isotherme",
      sku: "BTL-THRM-SLV",
      rfidTag: "RFID-78905",
      location: "Entrepôt Central",
      zone: "Zone D - Expédition",
      lastScan: "2023-03-31T14:45:00",
      status: "shipped",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "PROD-2345",
      name: "Porte-clés",
      sku: "KEY-RING-RED",
      rfidTag: "RFID-78906",
      location: "Boutique Principale",
      zone: "Zone B - Accessoires",
      lastScan: "2023-03-31T11:20:00",
      status: "in-stock",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Données de démonstration pour les lecteurs RFID
  const rfidReaders = [
    {
      id: "READER-001",
      name: "Lecteur Entrée Principale",
      location: "Boutique Principale",
      zone: "Entrée",
      status: "online",
      lastActive: "2023-04-01T10:30:00",
      batteryLevel: 85,
    },
    {
      id: "READER-002",
      name: "Lecteur Zone Vêtements",
      location: "Boutique Principale",
      zone: "Zone A - Vêtements",
      status: "online",
      lastActive: "2023-04-01T10:28:00",
      batteryLevel: 72,
    },
    {
      id: "READER-003",
      name: "Lecteur Zone Accessoires",
      location: "Boutique Principale",
      zone: "Zone B - Accessoires",
      status: "online",
      lastActive: "2023-04-01T10:25:00",
      batteryLevel: 64,
    },
    {
      id: "READER-004",
      name: "Lecteur Entrepôt Principal",
      location: "Entrepôt Central",
      zone: "Zone C - Stockage",
      status: "offline",
      lastActive: "2023-03-31T18:45:00",
      batteryLevel: 12,
    },
    {
      id: "READER-005",
      name: "Lecteur Expédition",
      location: "Entrepôt Central",
      zone: "Zone D - Expédition",
      status: "online",
      lastActive: "2023-04-01T09:15:00",
      batteryLevel: 93,
    },
    {
      id: "READER-006",
      name: "Lecteur Boutique Secondaire",
      location: "Boutique Secondaire",
      zone: "Zone A - Accessoires",
      status: "online",
      lastActive: "2023-04-01T10:10:00",
      batteryLevel: 78,
    },
  ]

  // Filtrer les produits en fonction des filtres sélectionnés et de la recherche
  const filteredProducts = rfidProducts.filter((product) => {
    // Filtre par emplacement
    if (locationFilter !== "all" && product.location !== locationFilter) return false

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        product.id.toLowerCase().includes(query) ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.rfidTag.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Filtrer les lecteurs RFID
  const filteredReaders = rfidReaders.filter((reader) => {
    // Filtre par emplacement
    if (locationFilter !== "all" && reader.location !== locationFilter) return false

    // Filtre par statut
    if (!showOfflineDevices && reader.status === "offline") return false

    return true
  })

  const headerActions = (
    <>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        Paramètres
      </Button>
      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        Actualiser
      </Button>
    </>
  )

  return (
    <PageLayout>
      <PageHeader
        title="Géolocalisation RFID/NFC"
        description="Suivez vos produits en temps réel grâce à la technologie RFID/NFC"
        actions={headerActions}
      />

      {/* Statistiques RFID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Produits suivis</CardTitle>
            <Tag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rfidProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              {rfidProducts.filter((p) => p.status === "in-stock").length} en stock,{" "}
              {rfidProducts.filter((p) => p.status !== "in-stock").length} en mouvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lecteurs RFID</CardTitle>
            <Smartphone className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rfidReaders.length}</div>
            <p className="text-xs text-muted-foreground">
              {rfidReaders.filter((r) => r.status === "online").length} en ligne,{" "}
              {rfidReaders.filter((r) => r.status === "offline").length} hors ligne
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Emplacements</CardTitle>
            <MapPin className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 boutiques, 1 entrepôt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dernière synchronisation</CardTitle>
            <Wifi className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Il y a 5 min</div>
            <p className="text-xs text-amber-500">Prochaine synchro dans {refreshInterval} sec</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <FilterBar>
        <SearchBar
          placeholder="Rechercher par nom, ID, SKU ou tag RFID..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="flex-1"
        />

        <div className="flex gap-2">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Emplacement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les emplacements</SelectItem>
              <SelectItem value="Boutique Principale">Boutique Principale</SelectItem>
              <SelectItem value="Boutique Secondaire">Boutique Secondaire</SelectItem>
              <SelectItem value="Entrepôt Central">Entrepôt Central</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </FilterBar>

      {/* Onglets */}
      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">Carte</TabsTrigger>
          <TabsTrigger value="readers">Lecteurs RFID</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carte des emplacements</CardTitle>
              <CardDescription>Visualisez la position de vos produits en temps réel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[500px] bg-slate-50 rounded-md border flex items-center justify-center">
                {/* Ici, on afficherait normalement une carte interactive */}
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Carte de géolocalisation des produits</p>
                  <p className="text-sm text-slate-400">Affichage des 6 produits suivis par RFID/NFC</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm">En stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">En transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Expédié</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Actualisation:</span>
                <Select
                  value={refreshInterval.toString()}
                  onValueChange={(v) => setRefreshInterval(Number.parseInt(v))}
                >
                  <SelectTrigger className="w-[100px] h-8">
                    <SelectValue placeholder="Intervalle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 sec</SelectItem>
                    <SelectItem value="30">30 sec</SelectItem>
                    <SelectItem value="60">1 min</SelectItem>
                    <SelectItem value="300">5 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="readers" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Lecteurs RFID/NFC</CardTitle>
                  <CardDescription>
                    {filteredReaders.length} lecteur(s) {locationFilter !== "all" && `à "${locationFilter}"`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="show-offline" className="text-sm">
                    Afficher hors ligne
                  </Label>
                  <Switch id="show-offline" checked={showOfflineDevices} onCheckedChange={setShowOfflineDevices} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredReaders.map((reader) => (
                  <Card key={reader.id} className="border">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{reader.name}</CardTitle>
                        <Badge className={reader.status === "online" ? "bg-emerald-500" : "bg-slate-500"}>
                          {reader.status === "online" ? "En ligne" : "Hors ligne"}
                        </Badge>
                      </div>
                      <CardDescription>{reader.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Emplacement:</span>
                          <span className="text-sm font-medium">{reader.location}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Zone:</span>
                          <span className="text-sm font-medium">{reader.zone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Dernière activité:</span>
                          <span className="text-sm font-medium">{formatDate(reader.lastActive)}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Batterie:</span>
                            <span className="text-sm font-medium">{reader.batteryLevel}%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-100">
                            <div
                              className={`h-2 rounded-full ${
                                reader.batteryLevel > 70
                                  ? "bg-emerald-500"
                                  : reader.batteryLevel > 30
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                              }`}
                              style={{ width: `${reader.batteryLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Configurer
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des mouvements</CardTitle>
              <CardDescription>Suivez les déplacements de vos produits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-2 border-slate-200 pl-4 ml-4 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[1.625rem] top-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">T-shirt Premium (RFID-78901)</span>
                        <Badge className="bg-emerald-500">Arrivée</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Arrivée à Boutique Principale, Zone A - Vêtements</p>
                      <p className="text-xs text-slate-500">Aujourd'hui, 10:23</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[1.625rem] top-1 h-3 w-3 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Chaussettes Sport (RFID-78903)</span>
                        <Badge className="bg-blue-500">En transit</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        En transit de Entrepôt Central vers Boutique Principale
                      </p>
                      <p className="text-xs text-slate-500">Aujourd'hui, 09:15</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[1.625rem] top-1 h-3 w-3 rounded-full bg-purple-500 border-2 border-white"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Gourde isotherme (RFID-78905)</span>
                        <Badge className="bg-purple-500">Expédié</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expédié depuis Entrepôt Central, Zone D - Expédition
                      </p>
                      <p className="text-xs text-slate-500">Hier, 14:45</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[1.625rem] top-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Sac à dos (RFID-78904)</span>
                        <Badge className="bg-emerald-500">Arrivée</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Arrivée à Boutique Secondaire, Zone A - Accessoires
                      </p>
                      <p className="text-xs text-slate-500">Hier, 11:30</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[1.625rem] top-1 h-3 w-3 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Casquette Logo (RFID-78902)</span>
                        <Badge className="bg-blue-500">Déplacement</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Déplacé de Zone A - Vêtements vers Zone B - Accessoires
                      </p>
                      <p className="text-xs text-slate-500">Il y a 2 jours</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Voir plus d'historique
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
