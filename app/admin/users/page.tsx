"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DownloadCloud, Eye, Filter, MoreHorizontal, PlusCircle, Search, Trash2, UserPlus, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { formatDate } from "@/utils/date-formatter"
import { SafeImage } from "@/components/ui/safe-image"

// Types
type UserStatus = "active" | "inactive" | "suspended"
type UserPlan = "free" | "pro" | "enterprise"

interface User {
  id: string
  name: string
  company: string
  email: string
  registrationDate: Date
  status: UserStatus
  plan: UserPlan
  avatar?: string
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Ahmed Ben Ali",
    company: "Tech Solutions Tunisie",
    email: "ahmed@techsolutions.tn",
    registrationDate: new Date("2023-01-15"),
    status: "active",
    plan: "enterprise",
    avatar: "/vibrant-street-market.png",
  },
  {
    id: "2",
    name: "Fatima Mansouri",
    company: "Boutique Élégance",
    email: "fatima@elegance.tn",
    registrationDate: new Date("2023-02-20"),
    status: "active",
    plan: "pro",
    avatar: "/contemplative-artist.png",
  },
  {
    id: "3",
    name: "Youssef Khelifi",
    company: "Café Délices",
    email: "youssef@cafedelices.tn",
    registrationDate: new Date("2023-03-10"),
    status: "inactive",
    plan: "free",
    avatar: "/contemplative-man.png",
  },
  {
    id: "4",
    name: "Leila Trabelsi",
    company: "Artisanat Traditionnel",
    email: "leila@artisanat.tn",
    registrationDate: new Date("2023-04-05"),
    status: "active",
    plan: "pro",
    avatar: "/contemplative-artist.png",
  },
  {
    id: "5",
    name: "Karim Mejri",
    company: "Électronique Plus",
    email: "karim@electronique.tn",
    registrationDate: new Date("2023-05-12"),
    status: "suspended",
    plan: "free",
    avatar: "/contemplative-man.png",
  },
  {
    id: "6",
    name: "Nadia Bouzid",
    company: "Mode Moderne",
    email: "nadia@modemoderne.tn",
    registrationDate: new Date("2023-06-18"),
    status: "active",
    plan: "enterprise",
    avatar: "/contemplative-artist.png",
  },
  {
    id: "7",
    name: "Mehdi Gharbi",
    company: "Épicerie du Coin",
    email: "mehdi@epicerie.tn",
    registrationDate: new Date("2023-07-22"),
    status: "active",
    plan: "free",
  },
  {
    id: "8",
    name: "Samia Lahmar",
    company: "Bijoux Précieux",
    email: "samia@bijoux.tn",
    registrationDate: new Date("2023-08-30"),
    status: "inactive",
    plan: "pro",
  },
  {
    id: "9",
    name: "Tarek Belhadj",
    company: "Librairie Savoir",
    email: "tarek@librairie.tn",
    registrationDate: new Date("2023-09-14"),
    status: "active",
    plan: "enterprise",
  },
  {
    id: "10",
    name: "Amina Ferchichi",
    company: "Pâtisserie Douceur",
    email: "amina@patisserie.tn",
    registrationDate: new Date("2023-10-25"),
    status: "suspended",
    plan: "pro",
  },
]

export default function UsersPage() {
  // State
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all")
  const [planFilter, setPlanFilter] = useState<UserPlan | "all">("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showSuspendConfirm, setShowSuspendConfirm] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [dateFilter, setDateFilter] = useState<"all" | "last30" | "last90" | "thisYear">("all")

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesPlan = planFilter === "all" || user.plan === planFilter

    let matchesDate = true
    if (dateFilter !== "all") {
      const today = new Date()
      const userDate = new Date(user.registrationDate)

      if (dateFilter === "last30") {
        const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
        matchesDate = userDate >= thirtyDaysAgo
      } else if (dateFilter === "last90") {
        const ninetyDaysAgo = new Date(today.setDate(today.getDate() - 90))
        matchesDate = userDate >= ninetyDaysAgo
      } else if (dateFilter === "thisYear") {
        matchesDate = userDate.getFullYear() === new Date().getFullYear()
      }
    }

    return matchesSearch && matchesStatus && matchesPlan && matchesDate
  })

  // Handle user deletion
  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setShowDeleteConfirm(false)
      setSelectedUser(null)
    }
  }

  // Handle user suspension
  const handleSuspendUser = () => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? { ...user, status: user.status === "suspended" ? "active" : "suspended" }
            : user,
        ),
      )
      setShowSuspendConfirm(false)
      setSelectedUser(null)
    }
  }

  // Export users data
  const exportUsers = (format: "csv" | "json") => {
    let data
    let filename
    let contentType

    if (format === "csv") {
      // Create CSV content
      const headers = ["Nom", "Société", "Email", "Date d'inscription", "Statut", "Plan"]
      const csvContent = [
        headers.join(","),
        ...filteredUsers.map((user) => {
          return [user.name, user.company, user.email, formatDate(user.registrationDate), user.status, user.plan].join(
            ",",
          )
        }),
      ].join("\n")

      data = csvContent
      filename = "storei-users.csv"
      contentType = "text/csv"
    } else {
      // Create JSON content
      data = JSON.stringify(filteredUsers, null, 2)
      filename = "storei-users.json"
      contentType = "application/json"
    }

    // Create download link
    const blob = new Blob([data], { type: contentType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPlanFilter("all")
    setDateFilter("all")
    setShowFilters(false)
  }

  // Render status badge
  const renderStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Actif</Badge>
      case "inactive":
        return (
          <Badge variant="outline" className="text-slate-500">
            Inactif
          </Badge>
        )
      case "suspended":
        return <Badge className="bg-red-500">Suspendu</Badge>
    }
  }

  // Render plan badge
  const renderPlanBadge = (plan: UserPlan) => {
    switch (plan) {
      case "free":
        return (
          <Badge variant="outline" className="border-slate-200 text-slate-700">
            Gratuit
          </Badge>
        )
      case "pro":
        return <Badge className="bg-blue-500">Pro</Badge>
      case "enterprise":
        return <Badge className="bg-purple-600">Entreprise</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Gestion des Utilisateurs"
        description="Consultez et gérez tous les comptes utilisateurs inscrits sur Storei"
        actions={
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => exportUsers("csv")}>Exporter en CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportUsers("json")}>Exporter en JSON</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nouvel Utilisateur
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par nom, email ou entreprise..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={showFilters ? "bg-slate-100" : ""}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                  {(statusFilter !== "all" || planFilter !== "all" || dateFilter !== "all") && (
                    <Badge className="ml-2 bg-slate-900">
                      {(statusFilter !== "all" ? 1 : 0) +
                        (planFilter !== "all" ? 1 : 0) +
                        (dateFilter !== "all" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="bg-slate-50 p-4 rounded-lg border">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="status-filter">Statut</Label>
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value as UserStatus | "all")}
                    >
                      <SelectTrigger id="status-filter" className="w-full">
                        <SelectValue placeholder="Tous les statuts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="inactive">Inactif</SelectItem>
                        <SelectItem value="suspended">Suspendu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 flex-1">
                    <Label htmlFor="plan-filter">Plan</Label>
                    <Select value={planFilter} onValueChange={(value) => setPlanFilter(value as UserPlan | "all")}>
                      <SelectTrigger id="plan-filter" className="w-full">
                        <SelectValue placeholder="Tous les plans" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les plans</SelectItem>
                        <SelectItem value="free">Gratuit</SelectItem>
                        <SelectItem value="pro">Pro</SelectItem>
                        <SelectItem value="enterprise">Entreprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 flex-1">
                    <Label htmlFor="date-filter">Date d'inscription</Label>
                    <Select value={dateFilter} onValueChange={(value) => setDateFilter(value as typeof dateFilter)}>
                      <SelectTrigger id="date-filter" className="w-full">
                        <SelectValue placeholder="Toutes les dates" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les dates</SelectItem>
                        <SelectItem value="last30">30 derniers jours</SelectItem>
                        <SelectItem value="last90">90 derniers jours</SelectItem>
                        <SelectItem value="thisYear">Cette année</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="ghost" onClick={resetFilters}>
                    Réinitialiser
                  </Button>
                </div>
              </div>
            )}

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom complet</TableHead>
                    <TableHead className="hidden md:table-cell">Société</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Date d'inscription</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Aucun utilisateur trouvé.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <SafeImage
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                width={32}
                                height={32}
                                className="h-8 w-8 object-cover"
                                fallback={
                                  <AvatarFallback>
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                }
                              />
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.company}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{formatDate(user.registrationDate)}</TableCell>
                        <TableCell>{renderStatusBadge(user.status)}</TableCell>
                        <TableCell>{renderPlanBadge(user.plan)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setShowUserDetails(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Voir détails
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setShowSuspendConfirm(true)
                                }}
                                className={user.status === "suspended" ? "text-green-600" : "text-amber-600"}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                {user.status === "suspended" ? "Réactiver" : "Suspendre"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setShowDeleteConfirm(true)
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Affichage de {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? "s" : ""} sur {users.length}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Précédent
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Suivant
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Détails de l'utilisateur</DialogTitle>
            <DialogDescription>Informations complètes sur le compte utilisateur.</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <Tabs defaultValue="profile" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="activity">Activité</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <Avatar className="h-20 w-20">
                    <SafeImage
                      src={selectedUser.avatar || "/placeholder.svg"}
                      alt={selectedUser.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover"
                      fallback={
                        <AvatarFallback className="text-2xl">
                          {selectedUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      }
                    />
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                    <div className="flex gap-2 mt-2">
                      {renderStatusBadge(selectedUser.status)}
                      {renderPlanBadge(selectedUser.plan)}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Société</Label>
                    <div className="col-span-3">{selectedUser.company}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Date d'inscription</Label>
                    <div className="col-span-3">{formatDate(selectedUser.registrationDate)}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">ID Utilisateur</Label>
                    <div className="col-span-3">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {selectedUser.id}
                      </code>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="activity" className="space-y-4 pt-4">
                <div className="rounded-md border p-4 h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Historique d'activité à implémenter</p>
                    <Button variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ajouter des données de test
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h4 className="font-medium">Notifications par email</h4>
                      <p className="text-sm text-muted-foreground">Gérer les préférences de notification</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notifications" />
                      <Label htmlFor="email-notifications">Activé</Label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h4 className="font-medium">Authentification à deux facteurs</h4>
                      <p className="text-sm text-muted-foreground">Ajouter une couche de sécurité supplémentaire</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="2fa" />
                      <Label htmlFor="2fa">Activé</Label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Accès API</h4>
                      <p className="text-sm text-muted-foreground">Autoriser l'accès via l'API Storei</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="api-access" />
                      <Label htmlFor="api-access">Activé</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setShowUserDetails(false)}>
              Fermer
            </Button>
            <Button>Enregistrer les modifications</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Confirmation Dialog */}
      <Dialog open={showSuspendConfirm} onOpenChange={setShowSuspendConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.status === "suspended" ? "Réactiver le compte" : "Suspendre le compte"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser?.status === "suspended"
                ? "Êtes-vous sûr de vouloir réactiver ce compte utilisateur ?"
                : "Êtes-vous sûr de vouloir suspendre ce compte utilisateur ? L'utilisateur ne pourra plus se connecter à son compte."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setShowSuspendConfirm(false)}>
              Annuler
            </Button>
            <Button
              variant={selectedUser?.status === "suspended" ? "default" : "destructive"}
              onClick={handleSuspendUser}
            >
              {selectedUser?.status === "suspended" ? "Réactiver" : "Suspendre"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
