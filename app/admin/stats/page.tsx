"use client"

import { useState, useEffect } from "react"
import {
  Users,
  UserCheck,
  ShoppingBag,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BarChart3,
  LineChart,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Données fictives pour les statistiques
const generateDailyData = (days = 30, baseValue = 100, variance = 20) => {
  const data = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const activeUsers = Math.max(10, Math.floor(baseValue + Math.random() * variance - variance / 2))
    const orders = Math.max(5, Math.floor(baseValue * 0.7 + Math.random() * variance - variance / 2))
    const products = Math.max(8, Math.floor(baseValue * 0.5 + Math.random() * variance - variance / 2))

    data.push({
      date: date.toISOString().split("T")[0],
      activeUsers,
      orders,
      products,
    })
  }

  return data
}

const generateMonthlyData = (months = 12, baseValue = 3000, variance = 600) => {
  const data = []
  const today = new Date()

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setMonth(date.getMonth() - i)

    const activeUsers = Math.max(300, Math.floor(baseValue + Math.random() * variance - variance / 2))
    const orders = Math.max(150, Math.floor(baseValue * 0.7 + Math.random() * variance - variance / 2))
    const products = Math.max(200, Math.floor(baseValue * 0.5 + Math.random() * variance - variance / 2))

    data.push({
      date: `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`,
      activeUsers,
      orders,
      products,
    })
  }

  return data
}

// Données pour les KPIs
const kpiData = {
  totalUsers: 12458,
  activeUsers: 8743,
  totalOrders: 45692,
  totalProducts: 28374,
  usersTrend: 12.4, // pourcentage de croissance
  activeUsersTrend: 8.7,
  ordersTrend: -3.2,
  productsTrend: 5.6,
}

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState("daily")
  const [chartType, setChartType] = useState("line")
  const [dataType, setDataType] = useState("activeUsers")
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (timeRange === "daily") {
      setChartData(generateDailyData())
    } else {
      setChartData(generateMonthlyData())
    }
  }, [timeRange])

  // Formater les nombres avec des séparateurs de milliers
  const formatNumber = (num) => {
    return new Intl.NumberFormat("fr-FR").format(num)
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Statistiques de la plateforme</h1>
        <p className="text-muted-foreground">
          Visualisez les indicateurs clés de performance et l'évolution de l'utilisation de Storei.
        </p>
      </div>

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Utilisateurs totaux"
          value={formatNumber(kpiData.totalUsers)}
          icon={<Users className="h-4 w-4" />}
          trend={kpiData.usersTrend}
          description="Tous les comptes enregistrés"
        />

        <StatCard
          title="Utilisateurs actifs"
          value={formatNumber(kpiData.activeUsers)}
          icon={<UserCheck className="h-4 w-4" />}
          trend={kpiData.activeUsersTrend}
          description="Actifs ce mois-ci"
        />

        <StatCard
          title="Commandes totales"
          value={formatNumber(kpiData.totalOrders)}
          icon={<ShoppingBag className="h-4 w-4" />}
          trend={kpiData.ordersTrend}
          description="Toutes commandes confondues"
        />

        <StatCard
          title="Produits enregistrés"
          value={formatNumber(kpiData.totalProducts)}
          icon={<Package className="h-4 w-4" />}
          trend={kpiData.productsTrend}
          description="Dans tous les inventaires"
        />
      </div>

      {/* Graphiques */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <Select value={dataType} onValueChange={setDataType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Type de données" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activeUsers">Utilisateurs actifs</SelectItem>
                <SelectItem value="orders">Commandes créées</SelectItem>
                <SelectItem value="products">Produits enregistrés</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="rounded-none"
              >
                <LineChart className="h-4 w-4 mr-2" />
                Ligne
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="rounded-none"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Barres
              </Button>
            </div>
          </div>

          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant={timeRange === "daily" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("daily")}
              className="rounded-none"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Par jour
            </Button>
            <Button
              variant={timeRange === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("monthly")}
              className="rounded-none"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Par mois
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>
              {dataType === "activeUsers" && "Évolution des utilisateurs actifs"}
              {dataType === "orders" && "Évolution des commandes créées"}
              {dataType === "products" && "Évolution des produits enregistrés"}
            </CardTitle>
            <CardDescription>{timeRange === "daily" ? "30 derniers jours" : "12 derniers mois"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "line" ? (
                  <RechartsLineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {dataType === "activeUsers" && (
                      <Line
                        type="monotone"
                        dataKey="activeUsers"
                        name="Utilisateurs actifs"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    )}
                    {dataType === "orders" && (
                      <Line type="monotone" dataKey="orders" name="Commandes" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    )}
                    {dataType === "products" && (
                      <Line type="monotone" dataKey="products" name="Produits" stroke="#ffc658" activeDot={{ r: 8 }} />
                    )}
                  </RechartsLineChart>
                ) : (
                  <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {dataType === "activeUsers" && (
                      <Bar dataKey="activeUsers" name="Utilisateurs actifs" fill="#8884d8" />
                    )}
                    {dataType === "orders" && <Bar dataKey="orders" name="Commandes" fill="#82ca9d" />}
                    {dataType === "products" && <Bar dataKey="products" name="Produits" fill="#ffc658" />}
                  </RechartsBarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistiques détaillées */}
      <div>
        <Tabs defaultValue="users">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DetailCard title="Taux de conversion" value="4.8%" trend={1.2} description="Visiteurs → Inscrits" />
              <DetailCard
                title="Taux de rétention"
                value="68%"
                trend={-2.3}
                description="Utilisateurs actifs après 30j"
              />
              <DetailCard title="Utilisateurs premium" value="32%" trend={5.7} description="% sur total utilisateurs" />
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DetailCard title="Valeur moyenne" value="287 DT" trend={3.5} description="Par commande" />
              <DetailCard title="Taux d'abandon" value="23%" trend={-1.8} description="Commandes non finalisées" />
              <DetailCard title="Délai moyen" value="2.3 jours" trend={-0.5} description="Création → Livraison" />
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DetailCard title="Prix moyen" value="78 DT" trend={2.1} description="Par produit" />
              <DetailCard title="Produits en rupture" value="8.3%" trend={-1.2} description="Du total des produits" />
              <DetailCard title="Taux de rotation" value="12.7" trend={0.8} description="Ventes/Stock moyen" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Composant pour les cartes KPI principales
function StatCard({ title, value, icon, trend, description }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-1 bg-primary/10 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <div className="flex items-center mt-2">
          {trend > 0 ? (
            <div className="flex items-center text-emerald-500 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+{trend}%</span>
            </div>
          ) : (
            <div className="flex items-center text-rose-500 text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>{trend}%</span>
            </div>
          )}
          <span className="text-xs text-muted-foreground ml-2">vs mois précédent</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Composant pour les cartes de détails
function DetailCard({ title, value, trend, description }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-2">
          {trend > 0 ? (
            <div className="flex items-center text-emerald-500 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+{trend}%</span>
            </div>
          ) : (
            <div className="flex items-center text-rose-500 text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>{trend}%</span>
            </div>
          )}
          <span className="text-xs text-muted-foreground ml-2">vs période précédente</span>
        </div>
      </CardContent>
    </Card>
  )
}
