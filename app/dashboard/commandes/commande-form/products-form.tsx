"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Commande } from "../models/commande"; 
import { ProduitCommande } from "../models/produitCommande"; 

interface SelectedProduit extends ProduitCommande {
  quantite: number;
}

interface ProductsFormProps {
  commande: Commande;
  setCommande: (commande: Commande) => void;
}

const availableProducts: ProduitCommande[] = []; // for now empty

export function ProductsForm({ commande, setCommande }: ProductsFormProps) {
  const [search, setSearch] = useState("");
  const [selectedProduits, setSelectedProduits] = useState<SelectedProduit[]>([]);

  const filteredProducts = availableProducts.filter((p) =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );

  const updateCommandeProduits = (produits: SelectedProduit[]) => {
    setCommande({
      ...commande,
      produits: produits.reduce((acc, p) => acc + p.quantite, 0),
      montant: produits.reduce((acc, p) => acc + p.prix * p.quantite, 0) * 1.2, // Total TTC
      detailsProduits: produits.map((p) => ({
        id: p.id,
        nom: p.nom,
        sku: p.sku,
        prix: p.prix,
        quantite: p.quantite,
        image: p.image,
      })),
    });
  };

  const handleAddProduct = (produit: ProduitCommande) => {
    setSelectedProduits((prev) => {
      const existing = prev.find((p) => p.id === produit.id);
      let updated;
      if (existing) {
        updated = prev.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      } else {
        updated = [...prev, { ...produit, quantite: 1 }];
      }
      updateCommandeProduits(updated);
      return updated;
    });
  };

  const handleQuantityChange = (id: string, quantite: number) => {
    setSelectedProduits((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, quantite } : p
      );
      updateCommandeProduits(updated);
      return updated;
    });
  };

  const handleRemoveProduct = (id: string) => {
    setSelectedProduits((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      updateCommandeProduits(updated);
      return updated;
    });
  };

  const total = selectedProduits.reduce(
    (sum, p) => sum + p.prix * p.quantite,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Search Input */}
          <Input
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Product Search Results */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filteredProducts.map((produit) => (
              <div key={produit.id} className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                  <img
                    src={produit.image || "/placeholder.svg"}
                    alt={produit.nom}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{produit.nom}</h4>
                  <p className="text-sm text-muted-foreground">{produit.sku}</p>
                </div>
                <Button
                  type="button"
                  onClick={() => handleAddProduct(produit)}
                  size="sm"
                >
                  Ajouter
                </Button>
              </div>
            ))}
          </div>

          <Separator />

          {/* Selected Products */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {selectedProduits.map((produit) => (
              <div key={produit.id} className="flex items-center gap-2 py-1">
                <Input
                  type="number"
                  min={1}
                  value={produit.quantite}
                  onChange={(e) =>
                    handleQuantityChange(produit.id, Number(e.target.value))
                  }
                  className="w-16 h-8 text-sm"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium flex items-center gap-1">
                    {produit.nom}
                    <span className="text-xs text-muted-foreground">({produit.sku})</span>
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <span>
                      {produit.prix.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "TND",
                      })}
                    </span>
                  </div>
                </div>
                <div className="font-medium text-sm">
                  {(produit.prix * produit.quantite).toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "TND",
                  })}
                </div>
                <Button
                  type="button"
                  onClick={() => handleRemoveProduct(produit.id)}
                  size="sm"
                  variant="destructive"
                  className="h-6 w-6 p-0 text-xs"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-sm">Sous-total</span>
              <span>
                {total.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "TND",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Livraison</span>
              <span>Gratuite</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">TVA (20%)</span>
              <span>
                {(total * 0.2).toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "TND",
                })}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total TTC</span>{" "}
              <span>
                {(total * 1.2).toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "TND",
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
