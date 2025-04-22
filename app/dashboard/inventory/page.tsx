"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"
import { useToast } from "@/hooks/use-toast"
import { InventoryStats } from "@/components/inventory/inventory-stats"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { AddProductDialog } from "@/components/inventory/add-product-dialog"
import { BarcodeScannerDialog } from "@/components/inventory/barcode-scanner-dialog"
import { useInventory } from "@/components/inventory/inventory-context"

// Types
interface InventoryItem {
  id: number
  name: string
  sku: string
  category: string
  quantity: number
  status: string
  lastUpdated: string
}

export default function InventoryPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { toast } = useToast()
  const { inventoryItems, setInventoryItems } = useInventory()

  // Remove a product
  const removeProduct = (id: number) => {
    try {
      setInventoryItems(inventoryItems.filter((item) => item.id !== id))
      toast({
        title: "Produit supprimé",
        description: `Le produit a été supprimé de l'inventaire.`,
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Erreur lors de la suppression du produit de l'inventaire.`,
      })
    }
  }

  // Update a product
  const updateProduct = (updatedProduct: InventoryItem) => {
    try {
      setInventoryItems(inventoryItems.map((item) => (item.id === updatedProduct.id ? updatedProduct : item)))
      toast({
        title: "Produit mis à jour",
        description: `${updatedProduct.name} a été mis à jour.`,
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Erreur lors de la mise à jour du produit ${updatedProduct.name}.`,
      })
    }
  }

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
