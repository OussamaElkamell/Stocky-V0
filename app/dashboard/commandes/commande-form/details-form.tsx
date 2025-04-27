"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPinIcon, TruckIcon } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Commande } from "../models/commande";
import StatusBadge from "../status-badge";
import { CommandeStatus } from "../models/commande";
import { useState } from "react";

interface DetailsFormProps {
  commande: Commande;
  setCommande: (commande: Commande) => void;
}

export default function DetailsForm({ commande, setCommande }: DetailsFormProps) {
  const adresseFacturation = commande.adresseFacturation ?? {
    nom: "",
    rue: "",
    codePostal: "",
    ville: "",
    pays: "",
  };

  const informationsLivraison = commande.informationsLivraison ?? {
    methodeLivraison: "",
    numeroSuivi: "",
  };

  const statut = commande.status ?? "en_attente";

  function handleChangeAdresse(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCommande({
      ...commande,
      adresseFacturation: {
        ...adresseFacturation,
        [name]: value,
      },
    });
  }

  function handleChangeLivraison(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCommande({
      ...commande,
      informationsLivraison: {
        ...informationsLivraison,
        [name]: value,
      },
    });
  }

  function handleStatutChange(value: string) {
    setCommande({
      ...commande,
      status: value as CommandeStatus,
    });
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Adresse de Facturation */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <MapPinIcon className="h-4 w-4" />
            Adresse de facturation
          </h3>
          <div className="text-sm space-y-2">
            <div className="space-y-1">
              <Label>Rue</Label>
              <Input name="rue" value={adresseFacturation.rue} onChange={handleChangeAdresse} />
            </div>
            <div className="space-y-1">
              <Label>Code Postal</Label>
              <Input name="codePostal" value={adresseFacturation.codePostal} onChange={handleChangeAdresse} />
            </div>
            <div className="space-y-1">
              <Label>Ville</Label>
              <Input name="ville" value={adresseFacturation.ville} onChange={handleChangeAdresse} />
            </div>
            <div className="space-y-1">
              <Label>Pays</Label>
              <Input name="pays" value={adresseFacturation.pays} onChange={handleChangeAdresse} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations de Livraison */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <TruckIcon className="h-4 w-4" />
            Informations de livraison
          </h3>
          <div className="text-sm space-y-2">
            <div className="space-y-1">
              <Label>Méthode de livraison</Label>
              <Input
                name="methodeLivraison"
                value={informationsLivraison.methodeLivraison}
                onChange={handleChangeLivraison}
              />
            </div>
            <div className="space-y-1">
              <Label>Numéro de suivi</Label>
              <Input
                name="numeroSuivi"
                value={informationsLivraison.numeroSuivi}
                onChange={handleChangeLivraison}
              />
            </div>
            <div className="space-y-1">
              <Label>Statut</Label>
              <Select value={statut} onValueChange={handleStatutChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-attente">
                    <StatusBadge status="en-attente" />
                  </SelectItem>
                  <SelectItem value="en-preparation">
                    <StatusBadge status="en-preparation" />
                  </SelectItem>
                  <SelectItem value="expediee">
                    <StatusBadge status="expediee" />
                  </SelectItem>
                  <SelectItem value="livree">
                    <StatusBadge status="livree" />
                  </SelectItem>
                  <SelectItem value="annulee">
                    <StatusBadge status="annulee" />
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
