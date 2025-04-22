"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"

import { InventoryStats } from "@/components/inventory/inventory-stats"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { AddProductDialog } from "@/components/inventory/add-product-dialog"
import { BarcodeScannerDialog } from "@/components/inventory/barcode-scanner-dialog"

export default function InventoryPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample inventory data
  const inventoryItems = [
    {
      id: 1,
      name: "T-shirt Premium",
      sku: "TS-PREM-M-BLK",
      category: "Vêtements",
      quantity: 45,
      status: "in-stock",
      lastUpdated: "2023-04-01T10:23:00",
    },
    {
      id: 2,
      name: "Casquette Logo",
      sku: "CAP-LOGO-BLU",
      category: "Accessoires",
      quantity: 12,
      status: "low-stock",
      lastUpdated: "2023-04-01T09:42:00",
    },
    {
      id: 3,
      name: "Chaussettes Sport",
      sku: "SOCK-SPT-L-WHT",
      category: "Vêtements",
      quantity: 0,
      status: "out-of-stock",
      lastUpdated: "2023-04-01T08:15:00",
    },
    {
      id: 4,
      name: "Sac à dos",
      sku: "BAG-PACK-BLK",
      category: "Accessoires",
      quantity: 23,
      status: "in-stock",
      lastUpdated: "2023-03-31T16:30:00",
    },
    {
      id: 5,
      name: "Gourde isotherme",
      sku: "BTL-THRM-SLV",
      category: "Accessoires",
      quantity: 8,
      status: "low-stock",
      lastUpdated: "2023-03-31T14:45:00",
    },
    {
      id: 6,
      name: "Porte-clés",
      sku: "KEY-RING-RED",
      category: "Accessoires",
      quantity: 67,
      status: "in-stock",
      lastUpdated: "2023-03-31T11:20:00",
    },
    {
      id: 7,
      name: "Pantalon Cargo",
      sku: "PANT-CARGO-M-GRN",
      category: "Vêtements",
      quantity: 15,
      status: "in-stock",
      lastUpdated: "2023-03-30T16:15:00",
    },
    {
      id: 8,
      name: "Montre Sport",
      sku: "WATCH-SPORT-BLK",
      category: "Accessoires",
      quantity: 0,
      status: "out-of-stock",
      lastUpdated: "2023-03-30T14:30:00",
    },
  ]

  // Filter inventory items based on search and category
  const filteredItems = inventoryItems.filter((item) => {
    // Filter by category
    if (selectedCategory !== "all" && item.category !== selectedCategory) return false

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return item.name.toLowerCase().includes(query) || item.sku.toLowerCase().includes(query)
    }

    return true
  })

  const headerActions = (
    <>
      <BarcodeScannerDialog isOpen={isScannerOpen} onOpenChange={setIsScannerOpen} />
      <AddProductDialog isOpen={isAddProductOpen} onOpenChange={setIsAddProductOpen} />
    </>
  )

  return (
    <PageLayout>
      <PageHeader
        title="Inventaire"
        description="Gérez votre inventaire et suivez vos niveaux de stock."
        actions={headerActions}
      />

      {/* Inventory Stats */}
      <InventoryStats inventoryItems={inventoryItems} />

      {/* Inventory Table */}
      <InventoryTable
        items={filteredItems}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Floating Add Button (Mobile) */}
      <div className="md:hidden">
        <Button
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-emerald-600 hover:bg-emerald-700"
          size="icon"
          onClick={() => setIsAddProductOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </PageLayout>
  )
}
