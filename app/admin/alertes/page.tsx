"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  Shield,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  CheckCircle,
  Trash2,
  Eye,
  Filter,
  Calendar,
  RefreshCw,
  CheckSquare,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"

// Types pour les alertes
type AlertType = "security" | "system" | "inactivity" | "unusual"
type AlertStatus = "read" | "unread"

interface Alert {
  id: string
  timestamp: Date
  type: AlertType
  userId?: string
  userName?: string
  userAvatar?: string
  description: string
  status: AlertStatus
  details?: string
}

// Données fictives pour les alertes
const generateMockAlerts = (): Alert[] => {
  const alertTypes: AlertType[] = ["security", "system", "inactivity", "unusual"]
  const securityDescriptions = [
    "Tentatives de connexion échouées répétées (5 fois)",
    "IP inconnue essayant d'accéder à une page admin",
    "Changement de mot de passe suspect depuis une nouvelle localisation",
    "Tentative d'accès à des données sensibles sans autorisation",
    "Plusieurs sessions actives simultanément depuis différentes localisations",
  ]
  const systemDescriptions = [
    "Échec d'envoi d'e-mail (facture #12345)",
    "Échec d'appel API Google Analytics",
    "Échec d'intégration avec le service de livraison",
    "Erreur lors de la génération du rapport mensuel",
    "Échec de la sauvegarde automatique nocturne",
  ]
  const inactivityDescriptions = [
    "Compte inactif depuis 90 jours",
    "Intégration Facebook Pixel non utilisée depuis 60 jours",
    "Module de livraison configuré mais non utilisé depuis 45 jours",
    "Compte admin sans connexion depuis 30 jours",
    "Boutique créée mais aucun produit ajouté depuis 14 jours",
  ]
  const unusualDescriptions = [
    "Création de 50+ commandes en moins d'une heure",
    "Suppression massive de 30 produits",
    "Modification de prix sur 100+ articles en 10 minutes",
    "20+ comptes clients créés depuis la même IP",
    "Changement des paramètres de paiement 3 fois en 24h",
  ]

  const userNames = [
    "Ahmed Ben Ali",
    "Sonia Mansour",
    "Karim Trabelsi",
    "Leila Bouazizi",
    "Mohamed Chaabane",
    "Système Storei",
    null,
  ]

  const alerts: Alert[] = []

  // Générer 50 alertes aléatoires
  for (let i = 0; i < 50; i++) {
    const type = alertTypes[Math.floor(Math.random() * alertTypes.length)]
    const hasUser = Math.random() > 0.3
    const isRead = Math.random() > 0.7

    let description = ""
    switch (type) {
      case "security":
        description = securityDescriptions[Math.floor(Math.random() * securityDescriptions.length)]
        break
      case "system":
        description = systemDescriptions[Math.floor(Math.random() * systemDescriptions.length)]
        break
      case "inactivity":
        description = inactivityDescriptions[Math.floor(Math.random() * inactivityDescriptions.length)]
        break
      case "unusual":
        description = unusualDescriptions[Math.floor(Math.random() * unusualDescriptions.length)]
        break
    }

    const userName = hasUser ? userNames[Math.floor(Math.random() * (userNames.length - 1))] : null

    // Générer une date aléatoire dans les 30 derniers jours
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))

    alerts.push({
      id: `alert-${i}`,
      timestamp: date,
      type,
      userId: hasUser ? `user-${Math.floor(Math.random() * 1000)}` : undefined,
      userName: userName || undefined,
      userAvatar: userName ? `/dark-haired-avatar.png` : undefined,
      description,
      status: isRead ? "read" : "unread",
      details: `Détails supplémentaires pour l'alerte #${i}. Cet événement a été détecté par le système de sécurité Storei et nécessite votre attention.`,
    })
  }

  // Trier par date (plus récent en premier)
  return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export default function AlertesPage() {
  const { toast } = useToast()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<AlertType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<AlertStatus | "all">("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [userFilter, setUserFilter] = useState("")

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // États pour les modals
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null)

  // Charger les données
  useEffect(() => {
    // Simuler un chargement depuis une API
    setTimeout(() => {
      const mockData = generateMockAlerts()
      setAlerts(mockData)
      setFilteredAlerts(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  // Appliquer les filtres
  useEffect(() => {
    let result = [...alerts]

    // Filtre par type
    if (typeFilter !== "all") {
      result = result.filter((alert) => alert.type === typeFilter)
    }

    // Filtre par statut
    if (statusFilter !== "all") {
      result = result.filter((alert) => alert.status === statusFilter)
    }

    // Filtre par date
    if (dateFilter) {
      result = result.filter((alert) => {
        const alertDate = new Date(alert.timestamp)
        return (
          alertDate.getDate() === dateFilter.getDate() &&
          alertDate.getMonth() === dateFilter.getMonth() &&
          alertDate.getFullYear() === dateFilter.getFullYear()
        )
      })
    }

    // Filtre par recherche (description ou utilisateur)
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (alert) =>
          alert.description.toLowerCase().includes(term) ||
          (alert.userName && alert.userName.toLowerCase().includes(term)),
      )
    }

    // Filtre par utilisateur
    if (userFilter) {
      result = result.filter(
        (alert) => alert.userName && alert.userName.toLowerCase().includes(userFilter.toLowerCase()),
      )
    }

    setFilteredAlerts(result)
    setCurrentPage(1) // Réinitialiser à la première page après filtrage
  }, [alerts, typeFilter, statusFilter, dateFilter, searchTerm, userFilter])

  // Calculer les alertes pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAlerts = filteredAlerts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage)

  // Nombre d'alertes non lues
  const unreadCount = filteredAlerts.filter((alert) => alert.status === "unread").length

  // Fonctions de gestion des alertes
  const handleMarkAsRead = (alertId: string) => {
    setAlerts((prevAlerts) => prevAlerts.map((alert) => (alert.id === alertId ? { ...alert, status: "read" } : alert)))
    toast({
      title: "Alerte marquée comme lue",
      description: "L'alerte a été marquée comme lue avec succès.",
    })
  }

  const handleDeleteAlert = (alertId: string) => {
    setCurrentAlert(alerts.find((alert) => alert.id === alertId) || null)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteAlert = () => {
    if (currentAlert) {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== currentAlert.id))
      setShowDeleteConfirm(false)
      setCurrentAlert(null)
      toast({
        title: "Alerte supprimée",
        description: "L'alerte a été supprimée avec succès.",
      })
    }
  }

  const handleViewDetails = (alertId: string) => {
    setCurrentAlert(alerts.find((alert) => alert.id === alertId) || null)
    setShowDetailsModal(true)
  }

  const handleMarkAllAsRead = () => {
    setAlerts((prevAlerts) => prevAlerts.map((alert) => ({ ...alert, status: "read" })))
    toast({
      title: "Toutes les alertes marquées comme lues",
      description: "Toutes les alertes ont été marquées comme lues avec succès.",
    })
  }

  // Fonctions pour les badges de type d'alerte
  const getAlertTypeIcon = (type: AlertType) => {
    switch (type) {
      case "security":
        return <Shield className="h-4 w-4" />
      case "system":
        return <XCircle className="h-4 w-4" />
      case "inactivity":
        return <Clock className="h-4 w-4" />
      case "unusual":
        return <Activity className="h-4 w-4" />
    }
  }

  const getAlertTypeBadge = (type: AlertType) => {
    switch (type) {
      case "security":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            {getAlertTypeIcon(type)} Sécurité
          </Badge>
        )
      case "system":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            {getAlertTypeIcon(type)} Système
          </Badge>
        )
      case "inactivity":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            {getAlertTypeIcon(type)} Inactivité
          </Badge>
        )
      case "unusual":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
            {getAlertTypeIcon(type)} Inhabituel
          </Badge>
        )
    }
  }

  const getAlertTypeLabel = (type: AlertType) => {
    switch (type) {
      case "security":
        return "Sécurité"
      case "system":
        return "Système"
      case "inactivity":
        return "Inactivité"
      case "unusual":
        return "Inhabituel"
    }
  }

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setTypeFilter("all")
    setStatusFilter("all")
    setDateFilter(undefined)
    setSearchTerm("")
    setUserFilter("")
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* En-tête avec compteur d'alertes non lues */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Alertes Système</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-sm">
              {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={resetFilters} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Réinitialiser les filtres
          </Button>

          <Button
            variant="default"
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2"
            disabled={unreadCount === 0}
          >
            <CheckSquare className="h-4 w-4" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Filter className="h-4 w-4" />
          </div>
        </div>

        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as AlertType | "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Type d'alerte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="security">Sécurité</SelectItem>
            <SelectItem value="system">Système</SelectItem>
            <SelectItem value="inactivity">Inactivité</SelectItem>
            <SelectItem value="unusual">Inhabituel</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as AlertStatus | "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="read">Lues</SelectItem>
            <SelectItem value="unread">Non lues</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal w-full">
              <Calendar className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, "dd/MM/yyyy") : "Filtrer par date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {/* Tableau des alertes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des alertes</CardTitle>
          <CardDescription>
            {filteredAlerts.length} alerte{filteredAlerts.length > 1 ? "s" : ""} trouvée
            {filteredAlerts.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune alerte trouvée</h3>
              <p className="mt-1 text-sm text-gray-500">Aucune alerte ne correspond à vos critères de recherche.</p>
              <div className="mt-6">
                <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Date / Heure</TableHead>
                    <TableHead className="w-[150px]">Type</TableHead>
                    <TableHead className="w-[200px]">Utilisateur</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[120px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAlerts.map((alert) => (
                    <TableRow key={alert.id} className={alert.status === "unread" ? "bg-blue-50" : ""}>
                      <TableCell className="font-medium">
                        {format(alert.timestamp, "dd MMM yyyy", { locale: fr })}
                        <div className="text-xs text-gray-500">{format(alert.timestamp, "HH:mm", { locale: fr })}</div>
                      </TableCell>
                      <TableCell>{getAlertTypeBadge(alert.type)}</TableCell>
                      <TableCell>
                        {alert.userName ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={alert.userAvatar || "/placeholder.svg"} alt={alert.userName} />
                              <AvatarFallback>{alert.userName.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{alert.userName}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Système</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          {alert.status === "unread" && (
                            <div className="mt-1 flex-shrink-0">
                              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                            </div>
                          )}
                          <span className={alert.status === "unread" ? "font-medium" : ""}>{alert.description}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(alert.id)}
                            title="Voir les détails"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {alert.status === "unread" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMarkAsRead(alert.id)}
                              title="Marquer comme lue"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteAlert(alert.id)}
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Affichage de {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAlerts.length)} sur{" "}
            {filteredAlerts.length}
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNumber = i + 1

              // Si nous avons plus de 5 pages et que nous ne sommes pas au début
              if (totalPages > 5 && currentPage > 3) {
                pageNumber = currentPage - 3 + i

                // Ne pas dépasser le nombre total de pages
                if (pageNumber > totalPages) {
                  pageNumber = totalPages - (4 - i)
                }
              }

              return (
                <Button
                  key={i}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNumber)}
                  className="w-9"
                >
                  {pageNumber}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Modal de confirmation de suppression */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette alerte ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {currentAlert && (
            <div className="py-4">
              <div className="flex items-center gap-2 mb-2">
                {getAlertTypeBadge(currentAlert.type)}
                <span className="text-sm text-gray-500">
                  {format(currentAlert.timestamp, "dd MMM yyyy HH:mm", { locale: fr })}
                </span>
              </div>
              <p className="font-medium">{currentAlert.description}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAlert}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de détails d'alerte */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Détails de l'alerte</DialogTitle>
          </DialogHeader>
          {currentAlert && (
            <div className="py-2 space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getAlertTypeBadge(currentAlert.type)}
                    <span className={currentAlert.status === "unread" ? "font-medium" : ""}>
                      {currentAlert.status === "unread" ? "Non lue" : "Lue"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(currentAlert.timestamp, "dd MMMM yyyy HH:mm", { locale: fr })}
                  </span>
                </div>
              </div>

              <div className="border-t border-b py-3">
                <h3 className="font-medium mb-1">Description</h3>
                <p>{currentAlert.description}</p>
              </div>

              {currentAlert.userName && (
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">Utilisateur concerné:</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentAlert.userAvatar || "/placeholder.svg"} alt={currentAlert.userName} />
                      <AvatarFallback>{currentAlert.userName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{currentAlert.userName}</span>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-1">Détails supplémentaires</h3>
                <p className="text-gray-700">{currentAlert.details}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-medium mb-1">Actions recommandées</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>Vérifier les journaux système pour plus de détails</li>
                  <li>Contacter l'utilisateur concerné si nécessaire</li>
                  <li>Mettre à jour les paramètres de sécurité si applicable</li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between items-center">
            {currentAlert && currentAlert.status === "unread" && (
              <Button
                variant="outline"
                onClick={() => {
                  handleMarkAsRead(currentAlert.id)
                  setShowDetailsModal(false)
                }}
              >
                Marquer comme lue
              </Button>
            )}
            <Button onClick={() => setShowDetailsModal(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
