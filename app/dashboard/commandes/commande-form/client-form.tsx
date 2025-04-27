"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPinIcon, UserIcon, ShoppingBagIcon } from "lucide-react";
import { Commande } from "../models/commande"; // adapt the import if needed

interface ClientFormProps {
  commande: Commande;
  setCommande: (commande: Commande) => void;
}

export function ClientForm({ commande, setCommande }: ClientFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const client: Commande["client"] = commande.client ?? {
    nom: "",
    prenom: "",
    email: "",
    avatar: "",
    canalDeVente: undefined,
    adresseLivraison: {
      rue: "",
      codePostal: "",
      ville: "",
      pays: "",
    },
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (["nom", "prenom", "email"].includes(name)) {
      setCommande({
        ...commande,
        client: {
          ...client,
          [name]: value,
        },
      });
    } else if (["rue", "ville", "codePostal", "pays"].includes(name)) {
      setCommande({
        ...commande,
        client: {
          ...client,
          adresseLivraison: {
            ...client.adresseLivraison,
            [name]: value,
          },
        },
      });
    }
  }

  function handleSelectChange(value: string) {
    setCommande({
      ...commande,
      client: {
        ...client,
        canalDeVente: value as Commande["client"]["canalDeVente"],
      },
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCommande({
        ...commande,
        client: {
          ...client,
          avatar: url,
        },
      });
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCommande({
        ...commande,
        client: {
          ...client,
          avatar: url,
        },
      });
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted with:", commande.client);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left Column: Client Info */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Information Client
            </h3>

            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                name="nom"
                value={client.nom}
                onChange={handleChange}
                placeholder="Nom du client"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Prénom</Label>
              <Input
                name="prenom"
                value={client.prenom || ""}
                onChange={handleChange}
                placeholder="Prénom du client"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={client.email}
                onChange={handleChange}
                placeholder="Email du client"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Avatar</Label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-muted transition"
                onClick={() => fileInputRef.current?.click()}
              >
                {client.avatar ? (
                  <img
                    src={client.avatar}
                    alt="Avatar Preview"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                ) : (
                  <p className="text-center text-muted-foreground">
                    Glissez une image ici ou cliquez pour choisir
                  </p>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Adresse de Livraison + Canal de Vente */}
      <div className="space-y-4">
        {/* Adresse de Livraison */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              Adresse de Livraison
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Rue</Label>
                <Input
                  name="rue"
                  value={client.adresseLivraison?.rue || ""}
                  onChange={handleChange}
                  placeholder="Rue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Code Postal</Label>
                <Input
                  name="codePostal"
                  value={client.adresseLivraison?.codePostal || ""}
                  onChange={handleChange}
                  placeholder="Code Postal"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Ville</Label>
                <Input
                  name="ville"
                  value={client.adresseLivraison?.ville || ""}
                  onChange={handleChange}
                  placeholder="Ville"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Pays</Label>
                <Input
                  name="pays"
                  value={client.adresseLivraison?.pays || ""}
                  onChange={handleChange}
                  placeholder="Pays"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Canal de Vente */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <ShoppingBagIcon className="h-4 w-4" />
              Canal de Vente
            </h3>
            <div className="space-y-2">
              <Label>Canal</Label>
              <Select
                value={client.canalDeVente ?? ""}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un canal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="site web">Site web</SelectItem>
                  <SelectItem value="téléphone">Téléphone</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="boutique physique">Boutique physique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
