"use client"

import type React from "react"

import { useState } from "react"
import {
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Edit,
  Pause,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Trash2,
  RefreshCw,
  Tag,
  DollarSign,
  Search,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { ChartContainer } from "@/components/ui/chart"
import {
  PieChart as RechartsChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

// Types
type Plan = "Gratuit" | "Pro" | "Entreprise"
type PaymentStatus = "à jour" | "échu" | "en attente"

interface Subscriber {
  id: string
  name: string
  email: string
  company: string
  plan: Plan
  startDate: Date
  paymentStatus: PaymentStatus
  avatar: string
  lastPaymentDate: Date
  nextPaymentDate: Date
  paymentMethod: string
  paymentHistory: {
    date: Date
    amount: number
    status: "success" | "failed" | "pending"
  }[]
}

interface PlanDetails {
  name: Plan
  price: number
  color: string
  features: string[]
  description: string
}

// Données fictives
const planDetails: PlanDetails[] = [
  {
    name: "Gratuit",
    price: 0,
    color: "#94a3b8",
    features: ["Jusqu'à 50 produits", "1 utilisateur", "Fonctionnalités de base", "Support par email"],
    description: "Idéal pour les petites entreprises qui débutent",
  },
  {
    name: "Pro",
    price: 29.99,
    color: "#3b82f6",
    features: [
      "Jusqu'à 500 produits",
      "5 utilisateurs",
      "Toutes les fonctionnalités",
      "Support prioritaire",
      "Analyses avancées",
    ],
    description: "Pour les entreprises en croissance",
  },
  {
    name: "Entreprise",
    price: 99.99,
    color: "#8b5cf6",
    features: [
      "Produits illimités",
      "Utilisateurs illimités",
      "Toutes les fonctionnalités",
      "Support dédié 24/7",
      "API personnalisée",
      "Intégrations avancées",
    ],
    description: "Solution complète pour les grandes entreprises",
  },
]

// Génération de données fictives pour les abonnés
const generateSubscribers = (count: number): Subscriber[] => {
  const plans: Plan[] = ["Gratuit", "Pro", "Entreprise"]
  const statuses: PaymentStatus[] = ["à jour", "échu", "en attente"]
  const avatars = [
    "/bearded-man-portrait.png",
    "/confident-woman.png",
    "/curly-haired-avatar.png",
    "/dark-haired-avatar.png",
    "/flowing-locks.png",
    "/thoughtful-coder.png",
  ]

  const subscribers: Subscriber[] = []

  for (let i = 0; i < count; i++) {
    const plan = plans[Math.floor(Math.random() * (plans.length - (i < count * 0.5 ? 1 : 0)))]
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 24))

    const lastPaymentDate = new Date()
    lastPaymentDate.setDate(lastPaymentDate.getDate() - Math.floor(Math.random() * 30))

    const nextPaymentDate = new Date(lastPaymentDate)
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1)

    const paymentStatus = plan === "Gratuit" ? "à jour" : statuses[Math.floor(Math.random() * statuses.length)]

    const paymentHistory = []
    const historyDate = new Date(startDate)

    while (historyDate < new Date()) {
      const status = Math.random() > 0.9 ? "failed" : Math.random() > 0.95 ? "pending" : "success"

      paymentHistory.push({
        date: new Date(historyDate),
        amount: plan === "Pro" ? 29.99 : plan === "Entreprise" ? 99.99 : 0,
        status,
      })

      historyDate.setMonth(historyDate.getMonth() + 1)
    }

    subscribers.push({
      id: `user-${i + 1}`,
      name: `Utilisateur ${i + 1}`,
      email: `user${i + 1}@example.com`,
      company: `Société ${i + 1}`,
      plan,
      startDate,
      paymentStatus,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      lastPaymentDate,
      nextPaymentDate,
      paymentMethod: Math.random() > 0.5 ? "Carte bancaire" : "PayPal",
      paymentHistory,
    })
  }

  return subscribers
}

const subscribers = generateSubscribers(50)

// Composant principal
export default function PlansPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, setPlanFilter] = useState<Plan | "all">("all")
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [chartType, setChartType] = useState<"pie" | "bar">("pie")
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null)
  const [showEditPlanDialog, setShowEditPlanDialog] = useState(false)
  const [showSuspendDialog, setShowSuspendDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showEditPricesDialog, setShowEditPricesDialog] = useState(false)
  const [showNewPlanDialog, setShowNewPlanDialog] = useState(false)
  const [showPromoDialog, setShowPromoDialog] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Filtrer les abonnés
  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch =
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPlan = planFilter === "all" || subscriber.plan === planFilter
    const matchesStatus = statusFilter === "all" || subscriber.paymentStatus === statusFilter

    const matchesDate = !dateFilter || format(subscriber.startDate, "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd")

    return matchesSearch && matchesPlan && matchesStatus && matchesDate
  })

  // Calculer les statistiques
  const planStats = {
    Gratuit: subscribers.filter((s) => s.plan === "Gratuit").length,
    Pro: subscribers.filter((s) => s.plan === "Pro").length,
    Entreprise: subscribers.filter((s) => s.plan === "Entreprise").length,
  }

  const totalRevenue = subscribers.reduce((total, subscriber) => {
    const planPrice = planDetails.find((p) => p.name === subscriber.plan)?.price || 0
    return total + planPrice
  }, 0)

  // Données pour les graphiques
  const chartData = [
    { name: "Gratuit", value: planStats.Gratuit, color: planDetails[0].color },
    { name: "Pro", value: planStats.Pro, color: planDetails[1].color },
    { name: "Entreprise", value: planStats.Entreprise, color: planDetails[2].color },
  ]

  // Fonction pour exporter les données en CSV
  const exportToCSV = () => {
    const headers = ["Nom", "Email", "Société", "Plan", "Date de début", "Statut de paiement"]
    const csvData = filteredSubscribers.map((s) => [
      s.name,
      s.email,
      s.company,
      s.plan,
      format(s.startDate, "dd/MM/yyyy"),
      s.paymentStatus,
    ])

    const csvContent = [headers.join(","), ...csvData.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "abonnements_storei.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm("")
    setPlanFilter("all")
    setStatusFilter("all")
    setDateFilter(undefined)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion des Abonnements</h1>
        <p className="text-muted-foreground">Suivez et gérez les abonnements des utilisateurs de Storei</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="subscribers">Abonnés</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Statistiques générales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total des abonnés</CardTitle>
                <CardDescription>Tous plans confondus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{subscribers.length}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">+12%</span> depuis le mois dernier
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Revenus mensuels</CardTitle>
                <CardDescription>Estimation basée sur les plans actifs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalRevenue.toFixed(2)} TND</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">+8.5%</span> depuis le mois dernier
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Taux de conversion</CardTitle>
                <CardDescription>Gratuit vers payant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(((planStats.Pro + planStats.Entreprise) / subscribers.length) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">+2.3%</span> depuis le mois dernier
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphique de répartition des plans */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Répartition des abonnements</CardTitle>
                  <CardDescription>Distribution des utilisateurs par plan</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={chartType === "pie" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("pie")}
                  >
                    <PieChart className="h-4 w-4 mr-1" />
                    Camembert
                  </Button>
                  <Button
                    variant={chartType === "bar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("bar")}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Barres
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer
                  config={{
                    Gratuit: {
                      label: "Gratuit",
                      color: planDetails[0].color,
                    },
                    Pro: {
                      label: "Pro",
                      color: planDetails[1].color,
                    },
                    Entreprise: {
                      label: "Entreprise",
                      color: planDetails[2].color,
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "pie" ? (
                      <RechartsChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsChart>
                    ) : (
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Nombre d'utilisateurs">
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="flex justify-between items-center w-full">
                <div className="flex space-x-4">
                  {chartData.map((item) => (
                    <div key={item.name} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={exportToCSV}>
                  <Download className="h-4 w-4 mr-1" />
                  Exporter
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-6">
          {/* Filtres */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={planFilter} onValueChange={(value) => setPlanFilter(value as Plan | "all")}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Tous les plans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les plans</SelectItem>
                  <SelectItem value="Gratuit">Gratuit</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Entreprise">Entreprise</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PaymentStatus | "all")}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="à jour">À jour</SelectItem>
                  <SelectItem value="échu">Échu</SelectItem>
                  <SelectItem value="en attente">En attente</SelectItem>
                </SelectContent>
              </Select>

              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "dd MMMM yyyy", { locale: fr }) : "Date d'abonnement"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={dateFilter}
                    onSelect={(date) => {
                      setDateFilter(date)
                      setIsCalendarOpen(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2 w-full md:w-auto justify-end">
              {(searchTerm || planFilter !== "all" || statusFilter !== "all" || dateFilter) && (
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Réinitialiser
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-1" />
                Exporter CSV
              </Button>
            </div>
          </div>

          {/* Filtres actifs */}
          {(searchTerm || planFilter !== "all" || statusFilter !== "all" || dateFilter) && (
            <div className="flex flex-wrap gap-2 items-center text-sm">
              <span className="text-muted-foreground">Filtres actifs:</span>

              {searchTerm && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Recherche: {searchTerm}
                  <button onClick={() => setSearchTerm("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {planFilter !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Plan: {planFilter}
                  <button onClick={() => setPlanFilter("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {statusFilter !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Statut: {statusFilter}
                  <button onClick={() => setStatusFilter("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {dateFilter && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Date: {format(dateFilter, "dd/MM/yyyy")}
                  <button onClick={() => setDateFilter(undefined)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              <span className="ml-auto text-muted-foreground">
                {filteredSubscribers.length} résultat{filteredSubscribers.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Tableau des abonnés */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Société</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="hidden md:table-cell">Date de début</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Aucun abonné ne correspond aux critères de recherche
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={subscriber.avatar || "/placeholder.svg"} alt={subscriber.name} />
                              <AvatarFallback>{subscriber.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{subscriber.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{subscriber.company}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "font-medium",
                              subscriber.plan === "Gratuit" && "border-slate-200 bg-slate-100",
                              subscriber.plan === "Pro" && "border-blue-200 bg-blue-100 text-blue-800",
                              subscriber.plan === "Entreprise" && "border-purple-200 bg-purple-100 text-purple-800",
                            )}
                          >
                            {subscriber.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(subscriber.startDate, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {subscriber.paymentStatus === "à jour" && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {subscriber.paymentStatus === "échu" && <XCircle className="h-4 w-4 text-red-500" />}
                            {subscriber.paymentStatus === "en attente" && <Clock className="h-4 w-4 text-amber-500" />}
                            <span
                              className={cn(
                                "text-sm",
                                subscriber.paymentStatus === "à jour" && "text-green-700",
                                subscriber.paymentStatus === "échu" && "text-red-700",
                                subscriber.paymentStatus === "en attente" && "text-amber-700",
                              )}
                            >
                              {subscriber.paymentStatus}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedSubscriber(subscriber)
                                setShowEditPlanDialog(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Modifier</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedSubscriber(subscriber)
                                setShowSuspendDialog(true)
                              }}
                            >
                              <Pause className="h-4 w-4" />
                              <span className="sr-only">Suspendre</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedSubscriber(subscriber)
                                setShowPaymentDialog(true)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Voir paiement</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          {/* Section de gestion des plans */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Plans disponibles</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowEditPricesDialog(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Modifier les prix
              </Button>
              <Button size="sm" onClick={() => setShowNewPlanDialog(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Nouveau plan
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowPromoDialog(true)}>
                <Tag className="h-4 w-4 mr-1" />
                Gérer les promos
              </Button>
            </div>
          </div>

          {/* Cartes des plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planDetails.map((plan) => (
              <Card key={plan.name} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: plan.color }}></div>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price.toFixed(2)} TND</span>
                    <span className="text-muted-foreground ml-1">/mois</span>
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{planStats[plan.name]}</span> utilisateurs
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {/* Dialog: Modifier le plan */}
      <Dialog open={showEditPlanDialog} onOpenChange={setShowEditPlanDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier le plan</DialogTitle>
            <DialogDescription>Changer le plan d'abonnement pour {selectedSubscriber?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="plan">Plan d'abonnement</Label>
              <Select defaultValue={selectedSubscriber?.plan}>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Sélectionner un plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gratuit">Gratuit</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Entreprise">Entreprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Raison du changement</Label>
              <Select defaultValue="upgrade">
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Sélectionner une raison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upgrade">Mise à niveau</SelectItem>
                  <SelectItem value="downgrade">Rétrogradation</SelectItem>
                  <SelectItem value="admin">Modification administrative</SelectItem>
                  <SelectItem value="promo">Offre promotionnelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Input id="notes" placeholder="Ajouter des notes sur ce changement" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditPlanDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => setShowEditPlanDialog(false)}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Suspendre l'abonnement */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Suspendre l'abonnement</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir suspendre l'abonnement de {selectedSubscriber?.name} ?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              La suspension de l'abonnement empêchera l'utilisateur d'accéder aux fonctionnalités premium jusqu'à ce que
              l'abonnement soit réactivé.
            </p>
            <div className="space-y-2">
              <Label htmlFor="suspend-reason">Raison de la suspension</Label>
              <Select defaultValue="payment">
                <SelectTrigger id="suspend-reason">
                  <SelectValue placeholder="Sélectionner une raison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payment">Problème de paiement</SelectItem>
                  <SelectItem value="violation">Violation des conditions</SelectItem>
                  <SelectItem value="request">Demande de l'utilisateur</SelectItem>
                  <SelectItem value="other">Autre raison</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={() => setShowSuspendDialog(false)}>
              Suspendre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Voir les paiements */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Historique de paiement</DialogTitle>
            <DialogDescription>Détails des paiements pour {selectedSubscriber?.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Informations de paiement</h4>
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Méthode:</span> {selectedSubscriber?.paymentMethod}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Plan actuel:</span> {selectedSubscriber?.plan}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Statut:</span> {selectedSubscriber?.paymentStatus}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Prochain paiement</h4>
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Date:</span>{" "}
                    {selectedSubscriber?.nextPaymentDate
                      ? format(selectedSubscriber.nextPaymentDate, "dd/MM/yyyy")
                      : "N/A"}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Montant:</span>{" "}
                    {planDetails.find((p) => p.name === selectedSubscriber?.plan)?.price.toFixed(2)} TND
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Historique des transactions</h4>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSubscriber?.paymentHistory.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(payment.date, "dd/MM/yyyy")}</TableCell>
                        <TableCell>{payment.amount.toFixed(2)} TND</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              payment.status === "success" && "border-green-200 bg-green-100 text-green-800",
                              payment.status === "failed" && "border-red-200 bg-red-100 text-red-800",
                              payment.status === "pending" && "border-amber-200 bg-amber-100 text-amber-800",
                            )}
                          >
                            {payment.status === "success" && "Réussi"}
                            {payment.status === "failed" && "Échoué"}
                            {payment.status === "pending" && "En attente"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Fermer
            </Button>
            <Button onClick={() => setShowPaymentDialog(false)}>Exporter PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Modifier les prix des plans */}
      <Dialog open={showEditPricesDialog} onOpenChange={setShowEditPricesDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier les prix des plans</DialogTitle>
            <DialogDescription>Ajustez les tarifs mensuels pour chaque plan d'abonnement</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {planDetails.map((plan) => (
              <div key={plan.name} className="grid grid-cols-2 gap-4 items-center">
                <Label htmlFor={`price-${plan.name}`}>{plan.name}</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`price-${plan.name}`}
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={plan.price}
                    className="pl-8"
                  />
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <Label htmlFor="price-notes">Notes sur les changements de prix</Label>
              <Input id="price-notes" placeholder="Raison de la modification des prix" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditPricesDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => setShowEditPricesDialog(false)}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Ajouter un nouveau plan */}
      <Dialog open={showNewPlanDialog} onOpenChange={setShowNewPlanDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau plan</DialogTitle>
            <DialogDescription>Créer un nouveau plan d'abonnement pour vos utilisateurs</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-plan-name">Nom du plan</Label>
              <Input id="new-plan-name" placeholder="Ex: Premium" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-plan-description">Description</Label>
              <Input id="new-plan-description" placeholder="Description courte du plan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-plan-price">Prix mensuel (TND)</Label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="new-plan-price" type="number" step="0.01" min="0" className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Fonctionnalités incluses</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input id="feature-1" placeholder="Fonctionnalité 1" />
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id="feature-2" placeholder="Fonctionnalité 2" />
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id="feature-3" placeholder="Fonctionnalité 3" />
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter une fonctionnalité
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPlanDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => setShowNewPlanDialog(false)}>Créer le plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Gérer les promotions */}
      <Dialog open={showPromoDialog} onOpenChange={setShowPromoDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Gérer les promotions</DialogTitle>
            <DialogDescription>Créer et gérer des offres promotionnelles pour vos plans d'abonnement</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="promo-active">Promotion active</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="promo-toggle" className="text-sm text-muted-foreground">
                    Désactivée
                  </Label>
                  <Switch id="promo-toggle" />
                  <Label htmlFor="promo-toggle" className="text-sm text-muted-foreground">
                    Activée
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="promo-name">Nom de la promotion</Label>
              <Input id="promo-name" placeholder="Ex: Offre de lancement" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="promo-discount">Réduction (%)</Label>
                <Input id="promo-discount" type="number" min="0" max="100" placeholder="Ex: 20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promo-duration">Durée (mois)</Label>
                <Input id="promo-duration" type="number" min="1" placeholder="Ex: 3" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="promo-plans">Plans concernés</Label>
              <Select>
                <SelectTrigger id="promo-plans">
                  <SelectValue placeholder="Sélectionner les plans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les plans</SelectItem>
                  <SelectItem value="Pro">Pro uniquement</SelectItem>
                  <SelectItem value="Entreprise">Entreprise uniquement</SelectItem>
                  <SelectItem value="Pro,Entreprise">Pro et Entreprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="promo-start">Date de début</Label>
                <Input id="promo-start" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promo-end">Date de fin</Label>
                <Input id="promo-end" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="promo-code">Code promo (optionnel)</Label>
              <div className="flex space-x-2">
                <Input id="promo-code" placeholder="Ex: WELCOME20" />
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Laissez vide pour appliquer automatiquement à tous les nouveaux abonnés
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPromoDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => setShowPromoDialog(false)}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Composant Switch pour les toggles
function Switch({ id, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative inline-flex items-center">
      <input type="checkbox" id={id} className="peer sr-only" {...props} />
      <div className="h-5 w-9 rounded-full bg-muted peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary transition-colors"></div>
      <div className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white transition-all peer-checked:left-5"></div>
    </div>
  )
}
