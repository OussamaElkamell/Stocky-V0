"use client"

import type React from "react"

import { DialogFooter } from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import { DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useInventory } from "@/components/inventory/inventory-context"
import { useToast } from "@/hooks/use-toast"
import { SafeImage } from "@/components/ui/safe-image"

interface AddProductDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  initialProduct?: any // Optional: Initial product data for edit mode
  onUpdateProduct?: (updatedProduct: any) => void // Optional: Callback for updating product
}

export function AddProductDialog({
  isOpen,
  onOpenChange,
  mode,
  initialProduct,
  onUpdateProduct,
}: AddProductDialogProps) {
  const { setInventoryItems, inventoryItems } = useInventory()
  const { toast } = useToast()

  const [name, setName] = useState(initialProduct?.name || "")
  const [description, setDescription] = useState(initialProduct?.description || "")
  const [category, setCategory] = useState(initialProduct?.category || "")
  const [image, setImage] = useState(initialProduct?.image || "")
  const [imageUrl, setImageUrl] = useState<string | null>(initialProduct?.image || null)
  const [quantity, setQuantity] = useState(initialProduct?.quantity || 0)
  const [status, setStatus] = useState(initialProduct?.status || "in-stock")

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name)
      setDescription(initialProduct.description)
      setCategory(initialProduct.category)
      setImage(initialProduct.image)
      setImageUrl(initialProduct.image || null)
      setQuantity(initialProduct.quantity)
      setStatus(initialProduct.status)
    }
  }, [initialProduct])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
        setImage(file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProduct = () => {
    if (mode === "add") {
      const newProduct = {
        id: Date.now(), // Generate a unique ID
        name: name,
        sku: "NP-001", // Replace with actual input value
        category: category, // Replace with actual select value
        quantity: quantity, // Replace with actual input value
        status: status, // Replace with actual select value
        lastUpdated: new Date().toISOString(),
        image: imageUrl || "/placeholder.svg?height=60&width=60",
      }
      setInventoryItems([...inventoryItems, newProduct])
      toast({
        title: "Produit ajouté",
        description: `${name} a été ajouté à l'inventaire.`,
      })
    } else if (mode === "edit" && initialProduct && onUpdateProduct) {
      const updatedProduct = {
        ...initialProduct,
        name: name,
        description: description,
        category: category,
        quantity: quantity,
        status: status,
        image: imageUrl || "/placeholder.svg?height=60&width=60",
        lastUpdated: new Date().toISOString(),
      }
      onUpdateProduct(updatedProduct)
      toast({
        title: "Produit mis à jour",
        description: `${name} a été mis à jour dans l'inventaire.`,
      })
    }
    onOpenChange(false) // Close the dialog
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <PlusIcon className="h-4 w-4 mr-1" /> {mode === "add" ? "Ajouter un produit" : "Modifier le produit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Ajouter un nouveau produit" : "Modifier le produit"}</DialogTitle>
          <DialogDescription>
            Remplissez les informations du produit. Cliquez sur Enregistrer lorsque vous avez terminé.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              placeholder="Nom du produit"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Description du produit"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Catégorie
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vetements">Vêtements</SelectItem>
                <SelectItem value="accessoires">Accessoires</SelectItem>
                <SelectItem value="chaussures">Chaussures</SelectItem>
                <SelectItem value="electronique">Électronique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="col-span-3">
              <Input id="image" type="file" onChange={handleImageChange} />
              {imageUrl && (
                <div className="mt-2">
                  <SafeImage src={imageUrl} alt="Product Preview" width={100} height={100} />
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantité
            </Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              className="col-span-3"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Statut
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">En stock</SelectItem>
                <SelectItem value="low-stock">Stock faible</SelectItem>
                <SelectItem value="out-of-stock">Rupture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => {
              handleAddProduct()
              onOpenChange(false) // Close the dialog
            }}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
