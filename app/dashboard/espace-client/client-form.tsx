import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserIcon, ShoppingBagIcon, MapPinIcon } from "lucide-react";
import { Client } from "./models/client";
import { Button } from "@/components/ui/button";

interface ClientFormProps {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
  mode: "add" | "edit";
  initialClient?: Client; // new: used to populate fields in edit mode
}

export function ClientForm({ clients, addClient, updateClient, mode, initialClient }: ClientFormProps) {
  const [client, setClient] = useState<Client>(() => {
    if (mode === "edit" && initialClient) {
      return initialClient;
    }
    return {
      id: "",
      name: "",
      type: "b2c",
      contact: "",
      email: "",
      phone: "",
      status: "active",
      lastOrder: new Date(),
      totalOrders: 0,
      totalSpent: "0",
      accessLevel: "basic",
      catalogAccess: false,
    };
  });
  function generateNextClientId(clients: Client[]) {
    const clientNumbers = clients
      .map((client) => parseInt(client.id.replace("CLI-", ""), 10))
      .filter((num) => !isNaN(num));

    const nextNumber = (clientNumbers.length > 0 ? Math.max(...clientNumbers) : 0) + 1;
    return `CLI-${String(nextNumber).padStart(3, "0")}`;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSelectChange(name: keyof Client, value: string) {
    setClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === "add") {
      const newClient: Client = {
        ...client,
        id: generateNextClientId(clients),
      };
      addClient(newClient);
    } else if (mode === "edit") {
      updateClient(client);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Client Information */}
      <div className="space-y-4 md:col-span-1">
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Information Client
            </h3>

            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                name="name"
                value={client.name}
                onChange={handleChange}
                placeholder="Nom du client"
                required
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
              <Label>Contact</Label>
              <Input
                name="contact"
                value={client.contact}
                onChange={handleChange}
                placeholder="Nom du contact"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Téléphone</Label>
              <Input
                name="phone"
                value={client.phone}
                onChange={handleChange}
                placeholder="Numéro de téléphone"
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Details */}
      <div className="space-y-4 md:col-span-1">
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <ShoppingBagIcon className="h-4 w-4" />
              Détails Client
            </h3>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={client.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="b2b">B2B</SelectItem>
                  <SelectItem value="b2c">B2C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Statut</Label>
              <Select
                value={client.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Niveau d'accès</Label>
              <Select
                value={client.accessLevel}
                onValueChange={(value) => handleSelectChange("accessLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basique</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Accès au Catalogue</Label>
              <Select
                value={client.catalogAccess ? "yes" : "no"}
                onValueChange={(value) =>
                  setClient((prev) => ({
                    ...prev,
                    catalogAccess: value === "yes",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Accès au catalogue ?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Oui</SelectItem>
                  <SelectItem value="no">Non</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Info */}
      <div className="md:col-span-2">
        <Card className="w-full">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              Informations Commande
            </h3>

            <div className="space-y-2">
              <Label>Dernière Commande</Label>
              <Input
                type="date"
                name="lastOrder"
                value={client.lastOrder ? new Date(client.lastOrder).toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  setClient((prev) => ({
                    ...prev,
                    lastOrder: new Date(e.target.value),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Nombre Total de Commandes</Label>
              <Input
                type="number"
                name="totalOrders"
                value={client.totalOrders}
                onChange={(e) =>
                  setClient((prev) => ({
                    ...prev,
                    totalOrders: parseInt(e.target.value, 10) || 0,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Dépenses Totales (€)</Label>
              <Input
                type="number"
                step="0.01"
                name="totalSpent"
                value={client.totalSpent}
                onChange={(e) =>
                  setClient((prev) => ({
                    ...prev,
                    totalSpent: (parseFloat(e.target.value) || 0).toString(),
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {mode === "add" ? "Ajouter" : "Mettre à jour"}
          </Button>
        </div>
      </div>
    </form>
  );
}
