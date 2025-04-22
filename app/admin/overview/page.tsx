"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  ShoppingBag,
  Package,
  CreditCard,
  RefreshCw,
  Download,
  ArrowRight,
  AlertTriangle,
  Shield,
  Clock,
  Activity,
  XCircle,
  Zap,
  Puzzle,
  Plug,
  Facebook,
  BarChart3,
  Globe,
  Truck,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Types simplifiés
type AlertType = "security" | "system" | "inactivity" | "unusual"
type UserPlan = "free" | "pro" | "enterprise"

// Composant StatCard
function StatCard({
  title,
  value,
  icon,
  description,
  trend,
}: {
  title: string
  value: string
  icon?: React.ReactNode
  description?: string
  trend?: { value: number; direction: "up" | "down" }
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm font-medium">{title}</span>
          {icon && <span className="rounded-md bg-muted p-2">{icon}</span>}
        </div>
        <div className="mt-2 flex items-baseline">
          <span className="text-2xl font-bold">{value}</span>
          {description && <span className="ml-2 text-xs text-muted-foreground">{description}</span>}
        </div>
        {trend && (
          <div className="mt-2 flex items-center">
            <span
              className={`flex items-center text-xs font-medium ${
                trend.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.direction === "up" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {trend.value}%
            </span>
            <span className="ml-1 text-xs text-muted-foreground">depuis le mois dernier</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Données statiques pour les alertes
const staticAlerts = [
  {
    id: "alert-1",
    type: "security" as AlertType,
    description: "Tentatives de connexion échouées répétées (5 fois)",
    timestamp: "12 Avr 2023 14:30",
    userName: "Ahmed Ben Ali",
    status: "unread",
  },
  {
    id: "alert-2",
    type: "system" as AlertType,
    description: "Échec d'envoi d'e-mail (facture #12345)",
    timestamp: "11 Avr 2023 09:15",
    userName: undefined,
    status: "read",
  },
  {
    id: "alert-3",
    type: "inactivity" as AlertType,
    description: "Compte inactif depuis 90 jours",
    timestamp: "10 Avr 2023 16:45",
    userName: "Sonia Mansour",
    status: "unread",
  },
  {
    id: "alert-4",
    type: "unusual" as AlertType,
    description: "Création de 50+ commandes en moins d'une heure",
    timestamp: "09 Avr 2023 11:20",
    userName: "Karim Trabelsi",
    status: "read",
  },
  {
    id: "alert-5",
    type: "security" as AlertType,
    description: "IP inconnue essayant d'accéder à une page admin",
    timestamp: "08 Avr 2023 08:05",
    userName: undefined,
    status: "read",
  },
]

// Données statiques pour les utilisateurs récents
const staticUsers = [
  {
    id: "1",
    name: "Ahmed Ben Ali",
    email: "ahmed@techsolutions.tn",
    registrationDate: "10 Avr 2023",
    plan: "enterprise" as UserPlan,
  },
  {
    id: "2",
    name: "Fatima Mansouri",
    email: "fatima@elegance.tn",
    registrationDate: "09 Avr 2023",
    plan: "pro" as UserPlan,
  },
  {
    id: "3",
    name: "Youssef Khelifi",
    email: "youssef@cafedelices.tn",
    registrationDate: "08 Avr 2023",
    plan: "free" as UserPlan,
  },
  {
    id: "4",
    name: "Leila Trabelsi",
    email: "leila@artisanat.tn",
    registrationDate: "07 Avr 2023",
    plan: "pro" as UserPlan,
  },
  {
    id: "5",
    name: "Karim Mejri",
    email: "karim@electronique.tn",
    registrationDate: "06 Avr 2023",
    plan: "free" as UserPlan,
  },
]

// Données statiques pour les intégrations
const staticIntegrations = [
  {
    id: "1",
    name: "Facebook Pixel",
    icon: <Facebook className="h-6 w-6 text-blue-600" />,
    usagePercentage: 78,
  },
  {
    id: "2",
    name: "Google Analytics",
    icon: <BarChart3 className="h-6 w-6 text-red-600" />,
    usagePercentage: 92,
  },
  {
    id: "3",
    name: "Microsoft Clarity",
    icon: <Activity className="h-6 w-6 text-blue-500" />,
    usagePercentage: 45,
  },
  {
    id: "4",
    name: "Domaines personnalisés",
    icon: <Globe className="h-6 w-6 text-green-600" />,
    usagePercentage: 63,
  },
  {
    id: "5",
    name: "Services de livraison",
    icon: <Truck className="h-6 w-6 text-amber-600" />,
    usagePercentage: 87,
  },
]

// Données statiques pour les modules personnalisés
const staticModules = [
  {
    id: "1",
    name: "Paiement à la livraison",
    type: "Paiement",
    activeUsers: 342,
    icon: <CreditCard className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "2",
    name: "Fidélité points",
    type: "Marketing",
    activeUsers: 287,
    icon: <Zap className="h-5 w-5 text-amber-500" />,
  },
  {
    id: "3",
    name: "Suivi de colis",
    type: "Livraison",
    activeUsers: 412,
    icon: <Package className="h-5 w-5 text-green-500" />,
  },
  {
    id: "4",
    name: "Avis clients",
    type: "Social",
    activeUsers: 356,
    icon: <Users className="h-5 w-5 text-purple-500" />,
  },
]

// Données pour les graphiques
const chartData = {
  users: [
    { date: "01/04", value: 120 },
    { date: "08/04", value: 145 },
    { date: "15/04", value: 162 },
    { date: "22/04", value: 190 },
    { date: "29/04", value: 210 },
  ],
  orders: [
    { date: "01/04", value: 320 },
    { date: "08/04", value: 345 },
    { date: "15/04", value: 362 },
    { date: "22/04", value: 390 },
    { date: "29/04", value: 410 },
  ],
  revenue: [
    { date: "01/04", value: 8500 },
    { date: "08/04", value: 9200 },
    { date: "15/04", value: 9800 },
    { date: "22/04", value: 10500 },
    { date: "29/04", value: 11200 },
  ],
}

export default function OverviewPage() {
  const { toast } = useToast()
  const [chartMetric, setChartMetric] = useState<"users" | "orders" | "revenue">("users")

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    toast({
      title: "Données rafraîchies",
      description: "Les données ont été mises à jour avec succès.",
    })
  }

  // Fonction pour exporter les données
  const exportData = () => {
    toast({
      title: "Export en cours",
      description: "Les données sont en cours d'exportation au format CSV.",
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

  // Fonction pour afficher le badge du plan utilisateur
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

  // Générer les initiales à partir du nom
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  // Fonction pour rendre le contenu du graphique
  const renderChartContent = () => {
    const data = chartData[chartMetric]
    const title =
      chartMetric === "users"
        ? "Croissance des utilisateurs"
        : chartMetric === "orders"
          ? "Évolution des commandes"
          : "Progression des revenus"

    const trend =
      chartMetric === "users"
        ? "+12% depuis le mois dernier"
        : chartMetric === "orders"
          ? "+15% depuis le mois dernier"
          : "+23% depuis le mois dernier"

    return (
      <div className="h-[300px] w-full flex flex-col items-center justify-center bg-muted/20 rounded-lg p-4">
        <div className="text-center mb-6">
          <p className="text-lg font-medium mb-2">{title}</p>
          <p className="text-muted-foreground">{trend}</p>
        </div>

        <div className="w-full h-[200px] flex items-end justify-between gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-12 ${
                  chartMetric === "users" ? "bg-blue-500" : chartMetric === "orders" ? "bg-amber-500" : "bg-emerald-500"
                } rounded-t-sm`}
                style={{
                  height: `${(item.value / Math.max(...data.map((d) => d.value))) * 150}px`,
                }}
              ></div>
              <span className="text-xs mt-2">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* En-tête avec titre et boutons d'action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Vue d'Ensemble</h1>
          <p className="text-muted-foreground">Tableau de bord administrateur Storei</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Rafraîchir
          </Button>
          <Button variant="outline" onClick={exportData} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Utilisateurs totaux"
          value="1,248"
          icon={<Users className="h-4 w-4 text-blue-600" />}
          trend={{ value: 12, direction: "up" }}
        />
        <StatCard
          title="Utilisateurs actifs"
          value="876"
          icon={<Users className="h-4 w-4 text-green-600" />}
          description="Ce mois-ci"
          trend={{ value: 8, direction: "up" }}
        />
        <StatCard
          title="Commandes créées"
          value="3,427"
          icon={<ShoppingBag className="h-4 w-4 text-amber-600" />}
          trend={{ value: 15, direction: "up" }}
        />
        <StatCard
          title="Produits enregistrés"
          value="12,584"
          icon={<Package className="h-4 w-4 text-purple-600" />}
          trend={{ value: 4, direction: "up" }}
        />
        <StatCard
          title="Revenus mensuels"
          value="87,500 DT"
          icon={<CreditCard className="h-4 w-4 text-emerald-600" />}
          description="Estimation"
          trend={{ value: 23, direction: "up" }}
        />
      </div>

      {/* Graphique d'évolution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Évolution sur 30 jours</CardTitle>
          <Tabs
            defaultValue="users"
            className="w-full max-w-[400px]"
            onValueChange={(value) => setChartMetric(value as any)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" /> Commandes
              </TabsTrigger>
              <TabsTrigger value="revenue" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Revenus
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>{renderChartContent()}</CardContent>
      </Card>

      {/* Deux colonnes : Alertes et Utilisateurs récents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dernières alertes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Dernières alertes
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/alertes" className="flex items-center gap-1">
                Voir tout <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staticAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3">
                  <div className="mt-1">{getAlertTypeIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getAlertTypeBadge(alert.type)}
                      {alert.status === "unread" && <div className="h-2 w-2 rounded-full bg-blue-600"></div>}
                    </div>
                    <p className="mt-1 text-sm">{alert.description}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{alert.timestamp}</span>
                      {alert.userName && (
                        <>
                          <span>•</span>
                          <span>{alert.userName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Derniers utilisateurs inscrits */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Derniers utilisateurs inscrits
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/users" className="flex items-center gap-1">
                Voir tout <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staticUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">{user.registrationDate}</span>
                    {renderPlanBadge(user.plan)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deux colonnes : Intégrations et Modules personnalisés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Intégrations les plus utilisées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plug className="h-5 w-5 text-indigo-500" />
              Intégrations les plus utilisées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {staticIntegrations.map((integration) => (
                <div key={integration.id} className="flex items-center">
                  <div className="flex items-center gap-3 w-48">
                    {integration.icon}
                    <span className="font-medium">{integration.name}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{integration.usagePercentage}%</span>
                      <span className="text-xs text-muted-foreground">des utilisateurs</span>
                    </div>
                    <Progress value={integration.usagePercentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modules personnalisés actifs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Puzzle className="h-5 w-5 text-emerald-500" />
              Modules personnalisés actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {staticModules.map((module) => (
                <div key={module.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {module.icon}
                    <h3 className="font-medium">{module.name}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">Type: {module.type}</div>
                  <div className="text-sm">
                    <span className="font-medium">{module.activeUsers}</span> utilisateurs actifs
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
