"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CreditCardIcon } from "lucide-react";
import { format } from "date-fns";
import { Commande } from "../models/commande"; // adjust if needed

interface PaymentFormProps {
  commande: Commande;
  setCommande: (commande: Commande) => void;
}

export function PaymentForm({ commande, setCommande }: PaymentFormProps) {

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCommande({
      ...commande,
      date: new Date(value),
    });
  };

  const handleMethodeChange = (value: "carte bancaire" | "PayPal" | "virement bancaire" | "espèces") => {
    setCommande({
      ...commande,
      methodePaiement: value,
    });
  };

  const handlePaiementChange = (value: "payé" | "en attente" | "remboursé") => {
    setCommande({
      ...commande,
      paiement: value,
    });
  };

  return (
    <form className="w-full">
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4" />
            Informations de paiement
          </h3>

          <div className="space-y-4 text-sm">
            {/* Méthode de paiement */}
            <div className="space-y-1">
              <Label>Méthode</Label>
              <Select value={commande.methodePaiement} onValueChange={handleMethodeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une méthode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carte bancaire">Carte bancaire</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="virement bancaire">Virement bancaire</SelectItem>
                  <SelectItem value="espèces">Espèces</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Statut du paiement */}
            <div className="space-y-1">
              <Label>Statut</Label>
              <Select value={commande.paiement} onValueChange={handlePaiementChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payé">Payé</SelectItem>
                  <SelectItem value="en attente">En attente</SelectItem>
                  <SelectItem value="remboursé">Remboursé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-1">
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={format(commande.date, "yyyy-MM-dd")}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
