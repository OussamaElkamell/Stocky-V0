"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Download,
  Filter,
  RefreshCw,
  Search,
  Shield,
  User,
  Users,
  Wifi,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  AlertOctagon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Données fictives pour les connexions
const connectionLogs = [
  {
    id: 1,
    user: "Amine Zaizaa",
    email: "amine@storei.com",
    avatar: "/bearded-man-portrait.png",
    ip: "41.226.18.124",
    date: "2025-04-13 09:45:22",
    device: "Chrome / Windows",
    status: "success",
  },
  {
    id: 2,
    user: "Sarah Mejri",
    email: "sarah@tunisie-digitale.tn",
    avatar: "/confident-woman.png",
    ip: "41.226.19.56",
    date: "2025-04-13 08:32:15",
    device: "Safari / macOS",
    status: "success",
  },
  {
    id: 3,
    user: "Mohamed Ben Ali",
    email: "mohamed@tekup.digital",
    avatar: "/flowing-locks.png",
    ip: "197.14.56.78",
    date: "2025-04-12 23:15:47",
    device: "Firefox / Ubuntu",
    status: "success",
  },
  {
    id: 4,
    user: "Inconnu",
    email: "admin@storei.com",
    avatar: "",
    ip: "185.143.45.12",
    date: "2025-04-12 22:05:33",
    device: "Chrome / Android",
    status: "failed",
  },
  {
    id: 5,
    user: "Leila Khadhraoui",
    email: "leila@digihub.tn",
    avatar: "/dark-haired-avatar.png",
    ip: "41.226.20.89",
    date: "2025-04-12 18:22:41",
    device: "Edge / Windows",
    status: "success",
  },
  {
    id: 6,
    user: "Karim Jendoubi",
    email: "karim@storei.com",
    avatar: "/thoughtful-coder.png",
    ip: "197.14.60.123",
    date: "2025-04-12 16:10:05",
    device: "Chrome / macOS",
    status: "success",
  },
  {
    id: 7,
    user: "Inconnu",
    email: "test@example.com",
    avatar: "",
    ip: "77.136.42.156",
    date: "2025-04-12 15:42:18",
    device: "Unknown",
    status: "failed",
  },
  {
    id: 8,
    user: "Sonia Marzouki",
    email: "sonia@storei.com",
    avatar: "/curly-haired-avatar.png",
    ip: "41.226.18.90",
    date: "2025-04-12 14:05:37",
    device: "Safari / iOS",
    status: "success",
  },
  {
    id: 9,
    user: "Nizar Riahi",
    email: "nizar@tekup.digital",
    avatar: "",
    ip: "197.14.58.200",
    date: "2025-04-12 11:30:22",
    device: "Chrome / Windows",
    status: "success",
  },
  {
    id: 10,
    user: "Yasmine Ben Salah",
    email: "yasmine@tunisie-digitale.tn",
    avatar: "",
    ip: "41.226.19.78",
    date: "2025-04-12 10:15:44",
    device: "Firefox / macOS",
    status: "success",
  },
]

// Données fictives pour les logs système
const systemLogs = [
  {
    id: 1,
    timestamp: "2025-04-13 10:05:33",
    user: "Système",
    message: "Échec tentative de connexion depuis IP 185.143.45.12",
    type: "security",
    severity: "warning",
  },
  {
    id: 2,
    timestamp: "2025-04-13 09:45:22",
    user: "Amine Zaizaa",
    message: "Connexion réussie",
    type: "auth",
    severity: "info",
  },
  {
    id: 3,
    timestamp: "2025-04-13 09:30:15",
    user: "Système",
    message: "Sauvegarde quotidienne des données réussie",
    type: "system",
    severity: "success",
  },
  {
    id: 4,
    timestamp: "2025-04-13 08:32:15",
    user: "Sarah Mejri",
    message: "Connexion réussie",
    type: "auth",
    severity: "info",
  },
  {
    id: 5,
    timestamp: "2025-04-12 23:15:47",
    user: "Mohamed Ben Ali",
    message: "Connexion réussie",
    type: "auth",
    severity: "info",
  },
  {
    id: 6,
    timestamp: "2025-04-12 22:05:33",
    user: "Système",
    message: "Échec tentative de connexion depuis IP 185.143.45.12",
    type: "security",
    severity: "warning",
  },
  {
    id: 7,
    timestamp: "2025-04-12 20:15:00",
    user: "Système",
    message: "Mise à jour du système vers la version 2.4.1 réussie",
    type: "system",
    severity: "success",
  },
  {
    id: 8,
    timestamp: "2025-04-12 18:22:41",
    user: "Leila Khadhraoui",
    message: "Connexion réussie",
    type: "auth",
    severity: "info",
  },
  {
    id: 9,
    timestamp: "2025-04-12 17:30:12",
    user: "Amine Zaizaa",
    message: "A connecté une intégration Facebook",
    type: "integration",
    severity: "info",
  },
  {
    id: 10,
    timestamp: "2025-04-12 16:45:33",
    user: "Système",
    message: "Erreur de connexion à l'API de paiement",
    type: "error",
    severity: "error",
  },
  {
    id: 11,
    timestamp: "2025-04-12 16:10:05",
    user: "Karim Jendoubi",
    message: "Connexion réussie",
    type: "auth",
    severity: "info",
  },
  {
    id: 12,
    timestamp: "2025-04-12 15:42:18",
    user: "Système",
    message: "Échec tentative de connexion depuis IP 77.136.42.156",
    type: "security",
    severity: "warning",
  },
  {
    id: 13,
    timestamp: "2025-04-12 15:30:00",
    user: "Sarah Mejri",
    message: "A modifié son plan vers Premium",
    type: "billing",
    severity: "info",
  },
  {
    id: 14,
    timestamp: "2025-04-12 14:05:37",
    user: "Sonia Marzouki",
    message: "Connexion réussie",
    type: "auth",
    severity: "info",
  },
  {
    id: 15,
    timestamp: "2025-04-12 13:22:05",
    user: "Système",
    message: "Nouveau compte créé pour nizar@tekup.digital",
    type: "account",
    severity: "success",
  },
]

export default function LogsPage() {
  // États pour les filtres
  const [connectionSearch, setConnectionSearch] = useState("")
  const [systemSearch, setSystemSearch] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")

  // Fonction pour filtrer les logs de connexion
  const filteredConnectionLogs = connectionLogs.filter((log) => {
    return (
      log.user.toLowerCase().includes(connectionSearch.toLowerCase()) ||
      log.email.toLowerCase().includes(connectionSearch.toLowerCase()) ||
      log.ip.includes(connectionSearch)
    )
  })

  // Fonction pour filtrer les logs système
  const filteredSystemLogs = systemLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(systemSearch.toLowerCase()) ||
      log.user.toLowerCase().includes(systemSearch.toLowerCase())

    const matchesType = typeFilter === "all" || log.type === typeFilter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter

    // Filtre de date (simplifié pour la démo)
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && log.timestamp.startsWith("2025-04-13")) ||
      (dateFilter === "yesterday" && log.timestamp.startsWith("2025-04-12"))

    return matchesSearch && matchesType && matchesSeverity && matchesDate
  })

  // Fonction pour exporter les logs
  const exportLogs = (format) => {
    let dataStr
    let fileName

    if (format === "json") {
      dataStr = JSON.stringify(systemLogs, null, 2)
      fileName = `storei-system-logs-${new Date().toISOString().split("T")[0]}.json`
    } else {
      // Format CSV
      const headers = "timestamp,user,message,type,severity\n"
      const csvContent = systemLogs
        .map((log) => `"${log.timestamp}","${log.user}","${log.message}","${log.type}","${log.severity}"`)
        .join("\n")
      dataStr = headers + csvContent
      fileName = `storei-system-logs-${new Date().toISOString().split("T")[0]}.csv`
    }

    const downloadLink = document.createElement("a")
    const blob = new Blob([dataStr], { type: format === "json" ? "application/json" : "text/csv" })
    const url = URL.createObjectURL(blob)
    downloadLink.href = url
    downloadLink.download = fileName
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  // Fonction pour obtenir l'icône selon la sévérité
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertOctagon className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  // Fonction pour obtenir la couleur du badge selon le type
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "auth":
        return "bg-blue-100 text-blue-800"
      case "security":
        return "bg-red-100 text-red-800"
      case "system":
        return "bg-purple-100 text-purple-800"
      case "integration":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "billing":
        return "bg-amber-100 text-amber-800"
      case "account":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Logs Système</h1>
          <p className="text-muted-foreground">Suivez toutes les actions système et les connexions des utilisateurs</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportLogs("csv")}>Exporter en CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportLogs("json")}>Exporter en JSON</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="connections">
        <TabsList className="mb-4">
          <TabsTrigger value="connections" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Historique des connexions
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Logs d'actions système
          </TabsTrigger>
        </TabsList>

        {/* Onglet Historique des connexions */}
        <TabsContent value="connections">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Historique des connexions</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher par utilisateur, email ou IP..."
                    className="pl-8"
                    value={connectionSearch}
                    onChange={(e) => setConnectionSearch(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>{filteredConnectionLogs.length} connexions enregistrées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead className="hidden md:table-cell">Date / Heure</TableHead>
                      <TableHead className="hidden lg:table-cell">Appareil</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredConnectionLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              {log.avatar ? (
                                <AvatarImage src={log.avatar || "/placeholder.svg"} alt={log.user} />
                              ) : (
                                <AvatarFallback>{log.user.substring(0, 2)}</AvatarFallback>
                              )}
                            </Avatar>
                            <span className="font-medium">{log.user}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{log.email}</TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-1">
                                  <Wifi className="h-3 w-3 text-muted-foreground" />
                                  <span>{log.ip}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Localisation: Tunisie</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{log.date}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{log.device}</TableCell>
                        <TableCell>
                          {log.status === "success" ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Réussie
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                              Échouée
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredConnectionLogs.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          Aucune connexion trouvée avec ces critères de recherche
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Logs d'actions système */}
        <TabsContent value="system">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Logs d'actions système</CardTitle>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher dans les logs..."
                    className="pl-8"
                    value={systemSearch}
                    onChange={(e) => setSystemSearch(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>{filteredSystemLogs.length} événements système enregistrés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filtres:</span>
                </div>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les dates</SelectItem>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="yesterday">Hier</SelectItem>
                    <SelectItem value="week">7 derniers jours</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder="Type d'événement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="auth">Authentification</SelectItem>
                    <SelectItem value="security">Sécurité</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                    <SelectItem value="integration">Intégration</SelectItem>
                    <SelectItem value="error">Erreur</SelectItem>
                    <SelectItem value="billing">Facturation</SelectItem>
                    <SelectItem value="account">Compte</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder="Sévérité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les sévérités</SelectItem>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="success">Succès</SelectItem>
                    <SelectItem value="warning">Avertissement</SelectItem>
                    <SelectItem value="error">Erreur</SelectItem>
                  </SelectContent>
                </Select>

                {(dateFilter !== "all" || typeFilter !== "all" || severityFilter !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDateFilter("all")
                      setTypeFilter("all")
                      setSeverityFilter("all")
                    }}
                    className="h-8 px-2"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Réinitialiser
                  </Button>
                )}
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Date / Heure</TableHead>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="w-[100px] text-right">Sévérité</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSystemLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{log.timestamp}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {log.user === "Système" ? (
                              <Shield className="h-4 w-4 text-purple-500" />
                            ) : (
                              <User className="h-4 w-4 text-blue-500" />
                            )}
                            <span>{log.user}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className={getTypeBadgeColor(log.type)}>
                            {log.type === "auth" && "Authentification"}
                            {log.type === "security" && "Sécurité"}
                            {log.type === "system" && "Système"}
                            {log.type === "integration" && "Intégration"}
                            {log.type === "error" && "Erreur"}
                            {log.type === "billing" && "Facturation"}
                            {log.type === "account" && "Compte"}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.message}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {getSeverityIcon(log.severity)}
                            <span className="hidden md:inline">
                              {log.severity === "info" && "Info"}
                              {log.severity === "success" && "Succès"}
                              {log.severity === "warning" && "Alerte"}
                              {log.severity === "error" && "Erreur"}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredSystemLogs.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          Aucun log système trouvé avec ces critères de recherche
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
