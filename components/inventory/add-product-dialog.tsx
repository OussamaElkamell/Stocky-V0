"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
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

interface AddProductDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductDialog({ isOpen, onOpenChange }: AddProductDialogProps) {
  const { setInventoryItems, inventoryItems } = useInventory()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [status, setStatus] = useState("in-stock")

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(), // Generate a unique ID
      name: name,
      sku: "NP-001", // Replace with actual input value
      category: category, // Replace with actual select value
      quantity: quantity, // Replace with actual input value
      status: status, // Replace with actual select value
      lastUpdated: new Date().toISOString(),
    }
    setInventoryItems([...inventoryItems, newProduct])
    onOpenChange(false) // Close the dialog
    toast({
      title: "Produit ajouté",
      description: `${name} a été ajouté à l'inventaire.`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <PlusIcon className="h-4 w-4 mr-1" /> Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau produit</DialogTitle>
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
              <Input id="image" type="file" onChange={(e) => setImage(e.target.value)} />
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
