"use client"
import { Package, Settings, X, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchBar } from "@/components/ui/search-bar"
import { FilterBar } from "@/components/ui/filter-bar"
import { StatusBadge } from "@/components/ui/status-badge"
import { formatDate } from "@/utils/date-formatter"
import { SafeImage } from "@/components/ui/safe-image"

interface InventoryItem {
  id: number
  name: string
  sku: string
  category: string
  quantity: number
  status: string
  lastUpdated: string
  image?: string
}

interface InventoryTableProps {
  items: InventoryItem[]
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onRemoveProduct: (id: number) => void
  onUpdateProduct: (updatedProduct: InventoryItem) => void
  onOpenEditDialog: (product: InventoryItem) => void
}

export function InventoryTable({
  items,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onRemoveProduct,
  onUpdateProduct,
  onOpenEditDialog,
}: InventoryTableProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Liste d'inventaire</CardTitle>
            <CardDescription>
              {items.length} produit(s) {selectedCategory !== "all" && `dans "${selectedCategory}"`}
            </CardDescription>
          </div>
          <FilterBar>
            <SearchBar placeholder="Rechercher..." value={searchQuery} onChange={onSearchChange} />
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="Vêtements">Vêtements</SelectItem>
                <SelectItem value="Accessoires">Accessoires</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </FilterBar>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Nom du produit</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead className="text-center">Quantité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière mise à jour</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center">
                        <SafeImage
                          src={item.image || "/placeholder.svg?height=60&width=60"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} type="inventory" />
                    </TableCell>
                    <TableCell>{formatDate(item.lastUpdated)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenEditDialog(item)}>
                          <Settings className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-rose-500"
                          onClick={() => onRemoveProduct(item.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Package className="h-12 w-12 mb-2 text-muted-foreground/50" />
                      <h3 className="font-medium">Aucun produit trouvé</h3>
                      <p className="text-sm">Essayez d'ajuster vos filtres de recherche</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
