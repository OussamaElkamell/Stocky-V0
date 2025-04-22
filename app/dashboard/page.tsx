"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"

import { DashboardKPISection } from "@/components/dashboard/kpi-section"
import { DashboardOrdersCard } from "@/components/dashboard/orders-card"
import { DashboardInventoryCard } from "@/components/dashboard/inventory-card"
import { DashboardRfidCard } from "@/components/dashboard/rfid-card"
import { DashboardClientCard } from "@/components/dashboard/client-card"
import { DashboardAnalyticsCard } from "@/components/dashboard/analytics-card"
import { DashboardQuickAccess } from "@/components/dashboard/quick-access"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("today")

  return (
    <PageLayout>
      <PageHeader
        title="Tableau de bord"
        description="Vue d'ensemble de votre activité"
        actions={
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
              <TabsTrigger value="week">Cette semaine</TabsTrigger>
              <TabsTrigger value="month">Ce mois</TabsTrigger>
              <TabsTrigger value="year">Cette année</TabsTrigger>
            </TabsList>
          </Tabs>
        }
      />

      {/* KPI Cards */}
      <DashboardKPISection />

      {/* Main Dashboard Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Orders */}
        <DashboardOrdersCard />

        {/* Low Stock Alert */}
        <DashboardInventoryCard />

        {/* RFID Tracking */}
        <DashboardRfidCard />

        {/* Analytics Summary */}
        <DashboardAnalyticsCard />

        {/* Client Activity */}
        <DashboardClientCard />

        {/* Quick Access */}
        <DashboardQuickAccess />
      </div>
    </PageLayout>
  )
}
