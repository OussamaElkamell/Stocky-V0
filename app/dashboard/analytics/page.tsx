"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Calendar,
  DollarSign,
  Download,
  Settings,
  ShoppingCart,
  Store,
  User,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Filter,
  ExternalLink,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  Line,
  LineChart as RechartsLineChart,
  Bar,
  BarChart as RechartsBarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [timePeriod, setTimePeriod] = useState("this-month")

  // Sample data for KPIs
  const kpiData = {
    totalSales: {
      value: "24,780 TND",
      change: 12.5,
      trend: "up",
    },
    orders: {
      value: "342",
      change: 8.2,
      trend: "up",
    },
    uniqueVisitors: {
      value: "8,492",
      change: 15.3,
      trend: "up",
    },
    conversionRate: {
      value: "4.2%",
      change: 0.8,
      trend: "up",
    },
    bounceRate: {
      value: "32.8%",
      change: -2.1,
      trend: "down",
    },
  }

  // Sample data for Traffic vs Sales chart
  const trafficVsSalesData = [
    { name: "Lun", traffic: 1200, sales: 1800 },
    { name: "Mar", traffic: 1400, sales: 2000 },
    { name: "Mer", traffic: 1300, sales: 1700 },
    { name: "Jeu", traffic: 1500, sales: 2100 },
    { name: "Ven", traffic: 1800, sales: 2400 },
    { name: "Sam", traffic: 2000, sales: 2800 },
    { name: "Dim", traffic: 1700, sales: 2300 },
  ]

  // Sample data for Sales by Category chart
  const salesByCategoryData = [
    { name: "Vêtements", value: 8500 },
    { name: "Accessoires", value: 6200 },
    { name: "Chaussures", value: 5100 },
    { name: "Électronique", value: 3200 },
    { name: "Maison", value: 1800 },
  ]

  // Sample data for Traffic Sources chart
  const trafficSourcesData = [
    { name: "Organique", value: 42 },
    { name: "Direct", value: 28 },
    { name: "Référence", value: 18 },
    { name: "Social", value: 12 },
  ]

  // Sample data for Top Selling Products
  const topSellingProducts = [
    {
      id: 1,
      name: "T-shirt Premium",
      category: "Vêtements",
      unitsSold: 245,
      revenue: "9,800 TND",
      trend: "up",
    },
    {
      id: 2,
      name: "Casquette Logo",
      category: "Accessoires",
      unitsSold: 187,
      revenue: "3,740 TND",
      trend: "up",
    },
    {
      id: 3,
      name: "Chaussettes Sport",
      category: "Vêtements",
      unitsSold: 156,
      revenue: "1,950 TND",
      trend: "down",
    },
    {
      id: 4,
      name: "Sac à dos",
      category: "Accessoires",
      unitsSold: 132,
      revenue: "6,600 TND",
      trend: "up",
    },
    {
      id: 5,
      name: "Gourde isotherme",
      category: "Accessoires",
      unitsSold: 118,
      revenue: "2,950 TND",
      trend: "down",
    },
  ]

  // Sample data for hourly activity heatmap
  const hourlyActivityData = [
    { hour: "00:00", value: 12 },
    { hour: "01:00", value: 8 },
    { hour: "02:00", value: 5 },
    { hour: "03:00", value: 3 },
    { hour: "04:00", value: 2 },
    { hour: "05:00", value: 4 },
    { hour: "06:00", value: 10 },
    { hour: "07:00", value: 25 },
    { hour: "08:00", value: 48 },
    { hour: "09:00", value: 72 },
    { hour: "10:00", value: 85 },
    { hour: "11:00", value: 92 },
    { hour: "12:00", value: 78 },
    { hour: "13:00", value: 74 },
    { hour: "14:00", value: 82 },
    { hour: "15:00", value: 88 },
    { hour: "16:00", value: 94 },
    { hour: "17:00", value: 90 },
    { hour: "18:00", value: 76 },
    { hour: "19:00", value: 68 },
    { hour: "20:00", value: 54 },
    { hour: "21:00", value: 42 },
    { hour: "22:00", value: 28 },
    { hour: "23:00", value: 18 },
  ]

  // Colors for charts
  const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"]
  const TRAFFIC_SOURCES_COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"]

  // Function to get color based on trend
  const getTrendColor = (trend: string): string => {
    return trend === "up" ? "text-emerald-500" : "text-rose-500"
  }

  // Function to get trend icon
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-rose-500" />
    )
  }

  // Function to get activity color based on value
  const getActivityColor = (value: number): string => {
    if (value < 20) return "bg-emerald-100"
    if (value < 40) return "bg-emerald-200"
    if (value < 60) return "bg-emerald-300"
    if (value < 80) return "bg-emerald-400"
    return "bg-emerald-500"
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center">
              <Store className="h-6 w-6 text-emerald-400 md:hidden" />
              <span className="font-bold text-xl ml-2 md:hidden">Storei</span>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-[180px] border-none">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="this-week">Cette semaine</SelectItem>
                  <SelectItem value="this-month">Ce mois</SelectItem>
                  <SelectItem value="last-month">Mois dernier</SelectItem>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-rose-500"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Déconnexion</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Analytiques</h1>
              <p className="text-muted-foreground">Visualisez le trafic du site web et les performances des ventes.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exporter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.totalSales.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${getTrendColor(kpiData.totalSales.trend)}`}>
                    {kpiData.totalSales.change > 0 ? "+" : ""}
                    {kpiData.totalSales.change}%
                  </span>
                  <span className="mx-1 text-xs text-muted-foreground">vs période précédente</span>
                  {getTrendIcon(kpiData.totalSales.trend)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.orders.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${getTrendColor(kpiData.orders.trend)}`}>
                    {kpiData.orders.change > 0 ? "+" : ""}
                    {kpiData.orders.change}%
                  </span>
                  <span className="mx-1 text-xs text-muted-foreground">vs période précédente</span>
                  {getTrendIcon(kpiData.orders.trend)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Visiteurs uniques</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.uniqueVisitors.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${getTrendColor(kpiData.uniqueVisitors.trend)}`}>
                    {kpiData.uniqueVisitors.change > 0 ? "+" : ""}
                    {kpiData.uniqueVisitors.change}%
                  </span>
                  <span className="mx-1 text-xs text-muted-foreground">vs période précédente</span>
                  {getTrendIcon(kpiData.uniqueVisitors.trend)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.conversionRate.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${getTrendColor(kpiData.conversionRate.trend)}`}>
                    {kpiData.conversionRate.change > 0 ? "+" : ""}
                    {kpiData.conversionRate.change}%
                  </span>
                  <span className="mx-1 text-xs text-muted-foreground">vs période précédente</span>
                  {getTrendIcon(kpiData.conversionRate.trend)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Taux de rebond</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.bounceRate.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${getTrendColor(kpiData.bounceRate.trend)}`}>
                    {kpiData.bounceRate.change > 0 ? "+" : ""}
                    {kpiData.bounceRate.change}%
                  </span>
                  <span className="mx-1 text-xs text-muted-foreground">vs période précédente</span>
                  {getTrendIcon(kpiData.bounceRate.trend)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Traffic vs Sales Chart */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Trafic vs Ventes</CardTitle>
                <CardDescription>Comparaison du trafic du site web et des ventes au fil du temps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={trafficVsSalesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#e2e8f0",
                          borderRadius: "0.375rem",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="traffic"
                        name="Trafic"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        name="Ventes"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Sales by Category Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Ventes par catégorie</CardTitle>
                <CardDescription>Répartition des ventes par catégorie de produits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={salesByCategoryData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#e2e8f0",
                          borderRadius: "0.375rem",
                        }}
                        formatter={(value) => [`TND${value}`, "Ventes"]}
                      />
                      <Bar dataKey="value" name="Ventes" fill="#10b981" radius={[4, 4, 0, 0]}>
                        {salesByCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Sources de trafic</CardTitle>
                <CardDescription>Répartition des visiteurs par source de trafic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={trafficSourcesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {trafficSourcesData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={TRAFFIC_SOURCES_COLORS[index % TRAFFIC_SOURCES_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#e2e8f0",
                          borderRadius: "0.375rem",
                        }}
                        formatter={(value) => [`${value}%`, "Pourcentage"]}
                      />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produits les plus vendus</CardTitle>
              <CardDescription>Les produits les plus performants en termes de ventes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead className="text-center">Unités vendues</TableHead>
                    <TableHead className="text-right">Revenus</TableHead>
                    <TableHead className="text-right">Tendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSellingProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-center">{product.unitsSold}</TableCell>
                      <TableCell className="text-right">{product.revenue}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <span className={getTrendColor(product.trend)}>
                            {product.trend === "up" ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Voir tous les produits
              </Button>
            </CardFooter>
          </Card>

          {/* Hourly Activity Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Activité horaire</CardTitle>
              <CardDescription>Répartition de l'activité des utilisateurs par heure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-2 md:gap-4">
                {hourlyActivityData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-full aspect-square rounded-md ${getActivityColor(
                        item.value,
                      )} flex items-center justify-center`}
                      title={`${item.hour}: ${item.value} utilisateurs`}
                    >
                      <span className="text-xs font-medium text-white hidden md:block">{item.value}</span>
                    </div>
                    <span className="text-xs mt-1 text-muted-foreground">{item.hour.split(":")[0]}h</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm bg-emerald-100"></div>
                    <span className="text-xs">Faible</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm bg-emerald-300"></div>
                    <span className="text-xs">Moyen</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                    <span className="text-xs">Élevé</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

// Component for navigation items
function NavItem({
  icon,
  label,
  href,
  isActive = false,
  isCollapsed = false,
}: {
  icon: React.ReactNode
  label: string
  href: string
  isActive?: boolean
  isCollapsed?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
        isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <span className="flex h-6 w-6 items-center justify-center">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  )
}
