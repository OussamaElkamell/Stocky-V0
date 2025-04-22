"use client"

import { useState } from "react"
import {
  Bell,
  Edit,
  Eye,
  Filter,
  Lock,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  User,
  UserPlus,
  Users,
  Truck,
  ShoppingBag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ClientSpacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [clientType, setClientType] = useState("all")

  // Données de démonstration pour les clients
  const clients = [
    {
      id: "CLI-001",
      name: "Entreprise Martin",
      type: "b2b",
      contact: "Sophie Martin",
      email: "contact@entreprisemartin.com",
      phone: "+33 1 23 45 67 89",
      status: "active",
      lastOrder: "2023-04-01T10:23:00",
      totalOrders: 24,
      totalSpent: "4,567.50 TND",
      accessLevel: "premium",
      catalogAccess: true,
    },
    {
      id: "CLI-002",
      name: "Thomas Dubois",
      type: "b2c",
      contact: "Thomas Dubois",
      email: "thomas.dubois@example.com",
      phone: "+33 6 98 76 54 32",
      status: "active",
      lastOrder: "2023-04-01T09:42:00",
      totalOrders: 5,
      totalSpent: "349.95 TND",
      accessLevel: "standard",
      catalogAccess: false,
    },
    {
      id: "CLI-003",
      name: "Boutique Élégance",
      type: "b2b",
      contact: "Emma Petit",
      email: "contact@boutique-elegance.com",
      phone: "+33 4 56 78 90 12",
      status: "active",
      lastOrder: "2023-04-01T08:15:00",
      totalOrders: 18,
      totalSpent: "3,249.75 TND",
      accessLevel: "premium",
      catalogAccess: true,
    },
    {
      id: "CLI-004",
      name: "Lucas Bernard",
      type: "b2c",
      contact: "Lucas Bernard",
      email: "lucas.bernard@example.com",
      phone: "+33 6 34 56 78 90",
      status: "inactive",
      lastOrder: "2023-03-15T16:30:00",
      totalOrders: 2,
      totalSpent: "129.00 TND",
      accessLevel: "standard",
      catalogAccess: false,
    },
    {
      id: "CLI-005",
      name: "Magasin Central",
      type: "b2b",
      contact: "Chloé Moreau",
      email: "contact@magasincentral.com",
      phone: "+33 5 67 89 01 23",
      status: "active",
      lastOrder: "2023-03-31T14:45:00",
      totalOrders: 32,
      totalSpent: "7,856.25 TND",
      accessLevel: "premium",
      catalogAccess: true,
    },
    {
      id: "CLI-006",
      name: "Antoine Lefebvre",
      type: "b2c",
      contact: "Antoine Lefebvre",
      email: "antoine.lefebvre@example.com",
      phone: "+33 6 56 78 90 12",
      status: "active",
      lastOrder: "2023-03-31T11:20:00",
      totalOrders: 8,
      totalSpent: "459.98 TND",
      accessLevel: "standard",
      catalogAccess: false,
    },
  ]

  // Filtrer les clients en fonction des filtres sélectionnés et de la recherche
  const filteredClients = clients.filter((client) => {
    // Filtre par type de client
    if (clientType !== "all" && client.type !== clientType) return false

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        client.id.toLowerCase().includes(query) ||
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.contact.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Espace Client</h1>
          <p className="text-muted-foreground">Gérez vos clients B2B et B2C et leurs accès.</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Paramètres
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Ajouter un client
          </Button>
        </div>
      </div>

      {/* Statistiques clients */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">
              {clients.filter((c) => c.type === "b2b").length} B2B, {clients.filter((c) => c.type === "b2c").length} B2C
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
            <User className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter((c) => c.status === "active").length}</div>
            <p className="text-xs text-emerald-500">
              {Math.round((clients.filter((c) => c.status === "active").length / clients.length) * 100)}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Accès catalogue</CardTitle>
            <Lock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter((c) => c.catalogAccess).length}</div>
            <p className="text-xs text-purple-500">
              {Math.round((clients.filter((c) => c.catalogAccess).length / clients.length) * 100)}% des clients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clients premium</CardTitle>
            <ShieldCheck className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.filter((c) => c.accessLevel === "premium").length}</div>
            <p className="text-xs text-amber-500">
              {Math.round((clients.filter((c) => c.accessLevel === "premium").length / clients.length) * 100)}% des
              clients
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher par nom, ID, contact ou email..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={clientType} onValueChange={setClientType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type de client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les clients</SelectItem>
              <SelectItem value="b2b">B2B</SelectItem>
              <SelectItem value="b2c">B2C</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="clients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="access">Gestion des accès</TabsTrigger>
          <TabsTrigger value="catalog">Catalogues privés</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Liste des clients</CardTitle>
              <CardDescription>
                {filteredClients.length} client(s) {clientType !== "all" && `de type "${clientType}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead className="hidden md:table-cell">Dernière commande</TableHead>
                    <TableHead className="text-right">Total dépensé</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{client.name}</span>
                          <span className="text-xs text-muted-foreground hidden md:inline">{client.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            client.type === "b2b"
                              ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                          }
                        >
                          {client.type === "b2b" ? "B2B" : "B2C"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{client.contact}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(client.lastOrder)}</TableCell>
                      <TableCell className="text-right font-medium">{client.totalSpent}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            client.status === "active"
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                              : "bg-slate-50 text-slate-700 hover:bg-slate-50"
                          }
                        >
                          {client.status === "active" ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Voir le profil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="h-4 w-4 mr-2" />
                              Gérer les accès
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Bell className="h-4 w-4 mr-2" />
                              Envoyer une notification
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Désactiver</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des accès</CardTitle>
              <CardDescription>Configurez les niveaux d'accès et les permissions des clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Niveaux d'accès</h3>

                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-full">
                        <User className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">Standard</p>
                        <p className="text-sm text-muted-foreground">Accès de base à la plateforme</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-10">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Visualisation des stocks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Commandes en ligne</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Historique des commandes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-rose-500"></div>
                      <span className="text-sm">Accès catalogue privé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-rose-500"></div>
                      <span className="text-sm">Prix personnalisés</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-rose-500"></div>
                      <span className="text-sm">Commandes en gros</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <ShieldCheck className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Premium</p>
                        <p className="text-sm text-muted-foreground">Accès complet avec fonctionnalités avancées</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-10">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Visualisation des stocks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Commandes en ligne</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Historique des commandes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Accès catalogue privé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Prix personnalisés</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Commandes en gros</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Permissions spéciales</h3>

                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Accès au catalogue privé</p>
                      <p className="text-sm text-muted-foreground">Permet de voir les produits et prix exclusifs</p>
                    </div>
                    <Switch id="catalog-access" />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Prix personnalisés</p>
                      <p className="text-sm text-muted-foreground">Tarifs spécifiques selon le client</p>
                    </div>
                    <Switch id="custom-prices" />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Commandes en gros</p>
                      <p className="text-sm text-muted-foreground">Possibilité de commander en grande quantité</p>
                    </div>
                    <Switch id="bulk-orders" />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Suivi des livraisons</p>
                      <p className="text-sm text-muted-foreground">Notifications et tracking en temps réel</p>
                    </div>
                    <Switch id="delivery-tracking" checked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="catalog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Catalogues privés</CardTitle>
              <CardDescription>Gérez les catalogues exclusifs pour vos clients B2B</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Catalogues disponibles</h3>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Créer un catalogue
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Catalogue Premium</CardTitle>
                      <Badge className="bg-emerald-500">Actif</Badge>
                    </div>
                    <CardDescription>15 clients ont accès</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      120 produits exclusifs avec tarifs préférentiels pour les clients B2B premium.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Gérer l'accès
                    </Button>
                    <Button variant="outline" size="sm">
                      Voir les produits
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Catalogue Revendeurs</CardTitle>
                      <Badge className="bg-emerald-500">Actif</Badge>
                    </div>
                    <CardDescription>8 clients ont accès</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      85 produits avec tarifs grossistes pour les revendeurs officiels.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Gérer l'accès
                    </Button>
                    <Button variant="outline" size="sm">
                      Voir les produits
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Catalogue Saisonnier</CardTitle>
                      <Badge variant="outline" className="bg-slate-100 text-slate-700">
                        Inactif
                      </Badge>
                    </div>
                    <CardDescription>0 clients ont accès</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      45 produits saisonniers disponibles uniquement pour une période limitée.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Gérer l'accès
                    </Button>
                    <Button variant="outline" size="sm">
                      Voir les produits
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Attribution des catalogues</h3>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Catalogue Premium</TableHead>
                      <TableHead>Catalogue Revendeurs</TableHead>
                      <TableHead>Catalogue Saisonnier</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Entreprise Martin</div>
                        <div className="text-xs text-muted-foreground">B2B</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          B2B
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={true} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={false} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={false} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Boutique Élégance</div>
                        <div className="text-xs text-muted-foreground">B2B</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          B2B
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={true} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={true} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={false} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Magasin Central</div>
                        <div className="text-xs text-muted-foreground">B2B</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          B2B
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={true} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={true} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={false} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications clients</CardTitle>
              <CardDescription>Gérez les notifications envoyées à vos clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Paramètres des notifications</h3>

                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mise à jour des commandes</p>
                      <p className="text-sm text-muted-foreground">
                        Notifier les clients lors des changements de statut
                      </p>
                    </div>
                    <Switch id="order-updates" checked />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Suivi des livraisons</p>
                      <p className="text-sm text-muted-foreground">Alertes en temps réel sur l'état des livraisons</p>
                    </div>
                    <Switch id="delivery-tracking" checked />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouveaux produits</p>
                      <p className="text-sm text-muted-foreground">
                        Informer les clients des nouveaux produits disponibles
                      </p>
                    </div>
                    <Switch id="new-products" />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotions et offres</p>
                      <p className="text-sm text-muted-foreground">
                        Envoyer des notifications pour les offres spéciales
                      </p>
                    </div>
                    <Switch id="promotions" checked />
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rappels de stock</p>
                      <p className="text-sm text-muted-foreground">
                        Alerter quand un produit suivi est de nouveau disponible
                      </p>
                    </div>
                    <Switch id="stock-reminders" checked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Notifications récentes</h3>
                  <Button variant="outline" size="sm">
                    Voir toutes
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <Truck className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mise à jour de livraison</p>
                        <p className="text-xs text-muted-foreground">Envoyée à: Entreprise Martin</p>
                      </div>
                      <Badge className="ml-auto">Email + Push</Badge>
                    </div>
                    <p className="text-sm">Votre commande ORD-7350 est en cours de livraison et arrivera demain.</p>
                    <p className="text-xs text-muted-foreground mt-1">Envoyée aujourd'hui à 10:23</p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-emerald-100 p-1.5 rounded-full">
                        <ShoppingBag className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Confirmation de commande</p>
                        <p className="text-xs text-muted-foreground">Envoyée à: Boutique Élégance</p>
                      </div>
                      <Badge className="ml-auto">Email</Badge>
                    </div>
                    <p className="text-sm">Votre commande ORD-7352 a été confirmée et est en cours de traitement.</p>
                    <p className="text-xs text-muted-foreground mt-1">Envoyée hier à 15:47</p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-100 p-1.5 rounded-full">
                        <Bell className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nouveau catalogue disponible</p>
                        <p className="text-xs text-muted-foreground">Envoyée à: Tous les clients B2B</p>
                      </div>
                      <Badge className="ml-auto">Email + Push</Badge>
                    </div>
                    <p className="text-sm">Le catalogue Premium a été mis à jour avec 15 nouveaux produits.</p>
                    <p className="text-xs text-muted-foreground mt-1">Envoyée il y a 2 jours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
