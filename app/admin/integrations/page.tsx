"use client"

import { useState, useEffect } from "react"
import {
  Download,
  Eye,
  Filter,
  Search,
  Trash2,
  X,
  BarChart4,
  PieChart,
  RefreshCw,
  Copy,
  ExternalLink,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SafeImage } from "@/components/ui/safe-image"

// Données fictives pour les intégrations
const integrationCategories = [
  {
    id: "shipping",
    name: "Livraisons",
    icon: "/images/integrations/delivery.png",
    count: 156,
    services: [
      { id: "first-delivery", name: "First Delivery", icon: "/images/integrations/first-delivery.png", count: 78 },
      { id: "intigo", name: "Intigo", icon: "/images/integrations/intigo.png", count: 45 },
      {
        id: "poste-tunisienne",
        name: "Poste Tunisienne",
        icon: "/images/integrations/poste-tunisienne.png",
        count: 33,
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: "/images/integrations/google-analytics.png",
    count: 203,
    services: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        icon: "/images/integrations/google-analytics.png",
        count: 203,
      },
      { id: "hotjar", name: "Hotjar", icon: "/images/integrations/hotjar.png", count: 87 },
      { id: "clarity", name: "Microsoft Clarity", icon: "/images/integrations/clarity.png", count: 65 },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: "/images/integrations/facebook-conversion-api.png",
    count: 178,
    services: [
      { id: "facebook-pixel", name: "Facebook Pixel", icon: "/images/integrations/facebook-pixel.png", count: 112 },
      {
        id: "facebook-conversion-api",
        name: "Facebook Conversion API",
        icon: "/images/integrations/facebook-conversion-api.png",
        count: 66,
      },
      {
        id: "google-tag-manager",
        name: "Google Tag Manager",
        icon: "/images/integrations/google-tag-manager.png",
        count: 98,
      },
    ],
  },
  {
    id: "domain",
    name: "Domaine",
    icon: "/images/integrations/domain.png",
    count: 89,
    services: [
      { id: "custom-domain", name: "Domaine personnalisé", icon: "/images/integrations/domain.png", count: 89 },
    ],
  },
  {
    id: "payment",
    name: "Paiement",
    icon: "/images/integrations/stripe.png",
    count: 134,
    services: [
      { id: "stripe", name: "Stripe", icon: "/images/integrations/stripe.png", count: 78 },
      { id: "paypal", name: "PayPal", icon: "/images/integrations/paypal.png", count: 56 },
    ],
  },
]

// Données fictives pour les utilisateurs avec intégrations
const usersWithIntegrations = [
  {
    id: 1,
    name: "Ahmed Ben Ali",
    email: "ahmed@example.com",
    company: "TechTunisia",
    avatar: "/bearded-man-portrait.png",
    lastActivity: "2023-04-12T15:42:00",
    integrations: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        icon: "/images/integrations/google-analytics.png",
        connectedAt: "2023-01-15T10:30:00",
        apiKey: "UA-XXXXX-1",
      },
      {
        id: "facebook-pixel",
        name: "Facebook Pixel",
        icon: "/images/integrations/facebook-pixel.png",
        connectedAt: "2023-02-20T14:15:00",
        apiKey: "123456789012345",
      },
      {
        id: "first-delivery",
        name: "First Delivery",
        icon: "/images/integrations/first-delivery.png",
        connectedAt: "2023-03-05T09:45:00",
        apiKey: "fd_api_xxxxxxxxxxxxx",
      },
    ],
  },
  {
    id: 2,
    name: "Sarra Mansouri",
    email: "sarra@example.com",
    company: "Mode Élégance",
    avatar: "/confident-woman.png",
    lastActivity: "2023-04-11T09:15:00",
    integrations: [
      {
        id: "intigo",
        name: "Intigo",
        icon: "/images/integrations/intigo.png",
        connectedAt: "2023-02-10T11:20:00",
        apiKey: "intg_xxxxxxxxxxxxxx",
      },
      {
        id: "clarity",
        name: "Microsoft Clarity",
        icon: "/images/integrations/clarity.png",
        connectedAt: "2023-03-15T16:30:00",
        apiKey: "clarity-xxxxxxxxxx",
      },
      {
        id: "custom-domain",
        name: "Domaine personnalisé",
        icon: "/images/integrations/domain.png",
        connectedAt: "2023-01-25T13:45:00",
        apiKey: "N/A",
      },
    ],
  },
  {
    id: 3,
    name: "Karim Jouini",
    email: "karim@example.com",
    company: "Digital Solutions",
    avatar: "/thoughtful-coder.png",
    lastActivity: "2023-04-10T17:30:00",
    integrations: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        icon: "/images/integrations/google-analytics.png",
        connectedAt: "2023-01-05T08:15:00",
        apiKey: "UA-XXXXX-2",
      },
      {
        id: "facebook-conversion-api",
        name: "Facebook Conversion API",
        icon: "/images/integrations/facebook-conversion-api.png",
        connectedAt: "2023-02-15T10:45:00",
        apiKey: "EAAxxxxxxxxxxxxxxxx",
      },
      {
        id: "stripe",
        name: "Stripe",
        icon: "/images/integrations/stripe.png",
        connectedAt: "2023-03-20T14:30:00",
        apiKey: "sk_test_xxxxxxxxxxxxx",
      },
      {
        id: "paypal",
        name: "PayPal",
        icon: "/images/integrations/paypal.png",
        connectedAt: "2023-03-25T11:15:00",
        apiKey: "pp_xxxxxxxxxxxxx",
      },
    ],
  },
  {
    id: 4,
    name: "Leila Trabelsi",
    email: "leila@example.com",
    company: "Artisanat Tunisien",
    avatar: "/flowing-locks.png",
    lastActivity: "2023-04-09T12:45:00",
    integrations: [
      {
        id: "poste-tunisienne",
        name: "Poste Tunisienne",
        icon: "/images/integrations/poste-tunisienne.png",
        connectedAt: "2023-02-05T09:30:00",
        apiKey: "pt_xxxxxxxxxxxxx",
      },
      {
        id: "hotjar",
        name: "Hotjar",
        icon: "/images/integrations/hotjar.png",
        connectedAt: "2023-03-10T15:45:00",
        apiKey: "hjsv_xxxxxxxxxx",
      },
    ],
  },
  {
    id: 5,
    name: "Youssef Khelil",
    email: "youssef@example.com",
    company: "Tech Innovate",
    avatar: "/dark-haired-avatar.png",
    lastActivity: "2023-04-08T14:20:00",
    integrations: [
      {
        id: "google-tag-manager",
        name: "Google Tag Manager",
        icon: "/images/integrations/google-tag-manager.png",
        connectedAt: "2023-01-20T13:15:00",
        apiKey: "GTM-XXXXXXX",
      },
      {
        id: "custom-domain",
        name: "Domaine personnalisé",
        icon: "/images/integrations/domain.png",
        connectedAt: "2023-02-25T10:30:00",
        apiKey: "N/A",
      },
    ],
  },
  {
    id: 6,
    name: "Amina Zaizaa",
    email: "amina@example.com",
    company: "Beauty Shop",
    avatar: "/curly-haired-avatar.png",
    lastActivity: "2023-04-12T15:42:00",
    integrations: [
      {
        id: "facebook-pixel",
        name: "Facebook Pixel",
        icon: "/images/integrations/facebook-pixel.png",
        connectedAt: "2023-01-10T11:45:00",
        apiKey: "987654321098765",
      },
      {
        id: "first-delivery",
        name: "First Delivery",
        icon: "/images/integrations/first-delivery.png",
        connectedAt: "2023-02-15T14:30:00",
        apiKey: "fd_api_yyyyyyyyyyyyy",
      },
      {
        id: "stripe",
        name: "Stripe",
        icon: "/images/integrations/stripe.png",
        connectedAt: "2023-03-20T09:15:00",
        apiKey: "sk_test_yyyyyyyyyyyyy",
      },
    ],
  },
  {
    id: 7,
    name: "Mehdi Gharbi",
    email: "mehdi@example.com",
    company: "Sport Gear",
    avatar: "",
    lastActivity: "2023-04-07T16:50:00",
    integrations: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        icon: "/images/integrations/google-analytics.png",
        connectedAt: "2023-01-25T15:30:00",
        apiKey: "UA-XXXXX-3",
      },
      {
        id: "intigo",
        name: "Intigo",
        icon: "/images/integrations/intigo.png",
        connectedAt: "2023-02-20T10:15:00",
        apiKey: "intg_yyyyyyyyyyyy",
      },
    ],
  },
  {
    id: 8,
    name: "Nadia Bouzid",
    email: "nadia@example.com",
    company: "Home Decor",
    avatar: "",
    lastActivity: "2023-04-06T11:35:00",
    integrations: [
      {
        id: "clarity",
        name: "Microsoft Clarity",
        icon: "/images/integrations/clarity.png",
        connectedAt: "2023-01-15T13:45:00",
        apiKey: "clarity-yyyyyyyy",
      },
      {
        id: "facebook-conversion-api",
        name: "Facebook Conversion API",
        icon: "/images/integrations/facebook-conversion-api.png",
        connectedAt: "2023-02-10T16:20:00",
        apiKey: "EAAyyyyyyyyyyyy",
      },
      {
        id: "paypal",
        name: "PayPal",
        icon: "/images/integrations/paypal.png",
        connectedAt: "2023-03-05T11:30:00",
        apiKey: "pp_yyyyyyyyyyyyy",
      },
    ],
  },
  {
    id: 9,
    name: "Slim Abidi",
    email: "slim@example.com",
    company: "Tech Gadgets",
    avatar: "",
    lastActivity: "2023-04-05T14:25:00",
    integrations: [
      {
        id: "poste-tunisienne",
        name: "Poste Tunisienne",
        icon: "/images/integrations/poste-tunisienne.png",
        connectedAt: "2023-01-20T09:15:00",
        apiKey: "pt_yyyyyyyyyyyyy",
      },
      {
        id: "hotjar",
        name: "Hotjar",
        icon: "/images/integrations/hotjar.png",
        connectedAt: "2023-02-25T14:45:00",
        apiKey: "hjsv_yyyyyyyy",
      },
      {
        id: "google-tag-manager",
        name: "Google Tag Manager",
        icon: "/images/integrations/google-tag-manager.png",
        connectedAt: "2023-03-10T11:30:00",
        apiKey: "GTM-YYYYYYY",
      },
    ],
  },
  {
    id: 10,
    name: "Rania Mejri",
    email: "rania@example.com",
    company: "Fashion Store",
    avatar: "",
    lastActivity: "2023-04-04T10:15:00",
    integrations: [
      {
        id: "custom-domain",
        name: "Domaine personnalisé",
        icon: "/images/integrations/domain.png",
        connectedAt: "2023-01-05T15:45:00",
        apiKey: "N/A",
      },
      {
        id: "facebook-pixel",
        name: "Facebook Pixel",
        icon: "/images/integrations/facebook-pixel.png",
        connectedAt: "2023-02-15T09:30:00",
        apiKey: "123123123123123",
      },
    ],
  },
]

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIntegrationType, setSelectedIntegrationType] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [chartType, setChartType] = useState<"bar" | "pie">("pie")
  const [filteredUsers, setFilteredUsers] = useState(usersWithIntegrations)

  // Filtrer les utilisateurs en fonction du terme de recherche et du type d'intégration sélectionné
  useEffect(() => {
    let filtered = usersWithIntegrations

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.company.toLowerCase().includes(term),
      )
    }

    if (selectedIntegrationType) {
      filtered = filtered.filter((user) =>
        user.integrations.some((integration) => integration.id === selectedIntegrationType),
      )
    }

    setFilteredUsers(filtered)
  }, [searchTerm, selectedIntegrationType])

  // Fonction pour exporter les données en CSV
  const exportToCSV = () => {
    const headers = ["Nom", "Email", "Société", "Intégrations", "Dernière activité"]

    const csvData = filteredUsers.map((user) => {
      const integrationNames = user.integrations.map((i: any) => i.name).join(", ")
      const lastActivity = new Date(user.lastActivity).toLocaleString("fr-FR")

      return [user.name, user.email, user.company, integrationNames, lastActivity]
    })

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "integrations_storei.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Fonction pour masquer partiellement une clé API
  const maskApiKey = (key: string) => {
    if (!key || key === "N/A") return "N/A"
    if (key.length <= 8) return "••••••••"
    return key.substring(0, 4) + "•".repeat(key.length - 8) + key.substring(key.length - 4)
  }

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Intégrations</h1>
          <p className="text-muted-foreground">
            Gérez et surveillez toutes les intégrations connectées par les utilisateurs de Storei.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setChartType(chartType === "bar" ? "pie" : "bar")}>
            {chartType === "bar" ? <PieChart className="h-4 w-4 mr-2" /> : <BarChart4 className="h-4 w-4 mr-2" />}
            {chartType === "bar" ? "Vue Donut" : "Vue Barres"}
          </Button>
          <Button variant="outline" onClick={() => exportToCSV()}>
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {integrationCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
                    <SafeImage
                      src={category.icon}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{category.count}</div>
                  <p className="text-xs text-muted-foreground">utilisateurs connectés</p>
                  <div className="mt-4 space-y-2">
                    {category.services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-6 w-6 overflow-hidden rounded-full bg-muted mr-2">
                            <SafeImage
                              src={service.icon}
                              alt={service.name}
                              width={24}
                              height={24}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm">{service.name}</span>
                        </div>
                        <span className="text-sm font-medium">{service.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Répartition des intégrations</CardTitle>
              <CardDescription>Nombre d'utilisateurs par type d'intégration</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                {/* Ici, on pourrait intégrer un graphique avec Chart.js ou Recharts */}
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      {chartType === "bar" ? (
                        <BarChart4 className="h-16 w-16 text-muted-foreground" />
                      ) : (
                        <PieChart className="h-16 w-16 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Graphique {chartType === "bar" ? "en barres" : "en donut"} montrant la répartition des
                      intégrations
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par nom, email ou société..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-9 w-9"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrer
                    {selectedIntegrationType && (
                      <Badge variant="secondary" className="ml-2 rounded-sm px-1">
                        1
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Type d'intégration</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {integrationCategories.flatMap((category) =>
                    category.services.map((service) => (
                      <DropdownMenuItem
                        key={service.id}
                        className="flex items-center gap-2"
                        onClick={() => setSelectedIntegrationType(service.id)}
                      >
                        <div className="h-4 w-4 overflow-hidden rounded-full bg-muted">
                          <SafeImage
                            src={service.icon}
                            alt={service.name}
                            width={16}
                            height={16}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span>{service.name}</span>
                      </DropdownMenuItem>
                    )),
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center text-muted-foreground"
                    onClick={() => setSelectedIntegrationType(null)}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              <div className="text-sm text-muted-foreground">
                {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? "s" : ""} trouvé
                {filteredUsers.length !== 1 ? "s" : ""}
              </div>
              <Button variant="outline" onClick={() => exportToCSV()}>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          {selectedIntegrationType && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-sm px-2 py-1">
                <div className="flex items-center gap-2">
                  <span>
                    {integrationCategories
                      .flatMap((category) => category.services)
                      .find((service) => service.id === selectedIntegrationType)?.name || selectedIntegrationType}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => setSelectedIntegrationType(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </Badge>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Société</TableHead>
                  <TableHead>Intégrations</TableHead>
                  <TableHead className="hidden md:table-cell">Dernière activité</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Aucun résultat trouvé.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.company}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.integrations.slice(0, 3).map((integration: any) => (
                            <TooltipProvider key={integration.id}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="h-6 w-6 overflow-hidden rounded-full bg-muted">
                                    <SafeImage
                                      src={integration.icon}
                                      alt={integration.name}
                                      width={24}
                                      height={24}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{integration.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                          {user.integrations.length > 3 && (
                            <Badge variant="secondary" className="ml-1 h-6 px-2">
                              +{user.integrations.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(user.lastActivity)}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Détails des intégrations</DialogTitle>
                              <DialogDescription>Intégrations connectées par {user.name}</DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n: string) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{user.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {user.email} • {user.company}
                                  </p>
                                </div>
                              </div>

                              <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-4">
                                  {user.integrations.map((integration: any) => (
                                    <div key={integration.id} className="rounded-lg border p-4">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                          <div className="h-10 w-10 overflow-hidden rounded-md bg-muted">
                                            <SafeImage
                                              src={integration.icon}
                                              alt={integration.name}
                                              width={40}
                                              height={40}
                                              className="h-full w-full object-cover"
                                            />
                                          </div>
                                          <div>
                                            <h4 className="font-medium">{integration.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                              Connecté le {formatDate(integration.connectedAt)}
                                            </p>
                                          </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-destructive">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>

                                      <div className="mt-4">
                                        <div className="flex items-center justify-between">
                                          <div className="text-sm font-medium">Clé API</div>
                                          <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                              <Copy className="h-3 w-3" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                              <ExternalLink className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </div>
                                        <div className="mt-1 rounded-md bg-muted p-2">
                                          <code className="text-xs">{maskApiKey(integration.apiKey)}</code>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                            <DialogFooter>
                              <div className="flex items-center mr-auto text-sm text-muted-foreground">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Dernière activité: {formatDate(user.lastActivity)}
                              </div>
                              <DialogClose asChild>
                                <Button variant="outline">Fermer</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
