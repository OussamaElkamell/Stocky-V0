"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CheckCircleIcon,
  ClockIcon,
  CreditCardIcon,
  DownloadIcon,
  MapPinIcon,
  PackageIcon,
  PrinterIcon,
  TruckIcon,
  XCircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Commande, CommandeStatus } from "./models/commande";
import StatusUpdateDialog from "./update-status";
import { useState } from "react";

// Fonction pour obtenir l'icône et la couleur du statut
function getStatusInfo(status: CommandeStatus) {
  switch (status) {
    case "en-attente":
      return {
        icon: ClockIcon,
        color: "text-amber-500",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        label: "En attente",
      };
    case "en-preparation":
      return {
        icon: PackageIcon,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        label: "En préparation",
      };
    case "expediee":
      return {
        icon: TruckIcon,
        color: "text-purple-500",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        label: "Expédiée",
      };
    case "livree":
      return {
        icon: CheckCircleIcon,
        color: "text-emerald-500",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        label: "Livrée",
      };
    case "annulee":
      return {
        icon: XCircleIcon,
        color: "text-rose-500",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
        label: "Annulée",
      };
  }
}

export function CommandeDetails ({ commande,
  commandesState,
  setCommandesState,
  setDialogType,
}: { commande: Commande 
  commandesState: Commande[],
  setCommandesState : React.Dispatch<React.SetStateAction<Commande[]>>,
  setDialogType : React.Dispatch<React.SetStateAction<"details" | "edit" | null>>,
}) {
  const commandeComplete: Commande = {
    ...commande,
    adresseLivraison: commande.adresseLivraison,
    methodePaiement: commande.methodePaiement,
    detailsProduits: commande.detailsProduits,
    historique: commande.historique,
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(
    null
  );

  const statusInfo = getStatusInfo(commandeComplete.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`flex items-center gap-1 ${statusInfo.color} ${statusInfo.bgColor} ${statusInfo.borderColor}`}
            >
              <StatusIcon className="h-3 w-3" />
              {statusInfo.label}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {commandeComplete.paiement === "payé"
                ? "Payée"
                : commandeComplete.paiement === "en attente"
                ? "Paiement en attente"
                : "Remboursée"}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={commandeComplete.client.avatar}
                alt={commandeComplete.client.nom}
              />
              <AvatarFallback>
                {commandeComplete.client.nom.charAt(0)}
                {commandeComplete.client.nom.split(" ")[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{commandeComplete.client.nom}</div>
              <div className="text-xs text-muted-foreground">
                {commandeComplete.client.email}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <PrinterIcon className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setSelectedCommande(commande);
              setIsDialogOpen(true);
            }}
          >
            Mettre à jour le statut
          </Button>
          {isDialogOpen && selectedCommande && (
            <StatusUpdateDialog
                      selectedCommande={selectedCommande}
                      dialogType={"edit"}
                      setDialogType={setDialogType}
                      setSelectedCommande={(commande) => setSelectedCommande(commande)}
                      commandesState={commandesState}
                      setCommandesState={setCommandesState}
                    />
              
          )}
        </div>
      </div>

      <Tabs defaultValue="produits">
        <TabsList>
          <TabsTrigger value="produits">Produits</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="historique">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="produits" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {commandeComplete.detailsProduits?.map((produit) => (
                  <div
                    key={produit.id}
                    className="flex items-center gap-4 py-2"
                  >
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={produit.image || "/placeholder.svg"}
                        alt={produit.nom}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{produit.nom}</h4>
                      <p className="text-sm text-muted-foreground">
                        SKU: {produit.sku}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm">
                          {produit.prix.toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </span>
                        <span className="text-sm text-muted-foreground">×</span>
                        <span className="text-sm">{produit.quantite}</span>
                      </div>
                    </div>
                    <div className="font-medium">
                      {(produit.prix * produit.quantite).toLocaleString(
                        "fr-FR",
                        {
                          style: "currency",
                          currency: "EUR",
                        }
                      )}
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Sous-total</span>
                    <span>
                      {commandeComplete.montant.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
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
                      {(commandeComplete.montant * 0.2).toLocaleString(
                        "fr-FR",
                        { style: "currency", currency: "EUR" }
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      {commandeComplete.montant.toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  Adresse de livraison
                </h3>
                <div className="text-sm">
                  <p>{commandeComplete.client.nom}</p>
                  <p>{commandeComplete.adresseLivraison?.rue}</p>
                  <p>
                    {commandeComplete.adresseLivraison?.codePostal}{" "}
                    {commandeComplete.adresseLivraison?.ville}
                  </p>
                  <p>{commandeComplete.adresseLivraison?.pays}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  Adresse de facturation
                </h3>
                <div className="text-sm">
                  <p>{commandeComplete.client.nom}</p>
                  <p>{commandeComplete.adresseFacturation?.rue}</p>
                  <p>
                    {commandeComplete.adresseFacturation?.codePostal}{" "}
                    {commandeComplete.adresseFacturation?.ville}
                  </p>
                  <p>{commandeComplete.adresseFacturation?.pays}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <CreditCardIcon className="h-4 w-4" />
                  Informations de paiement
                </h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Méthode:</span>
                    <span>{commandeComplete.methodePaiement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statut:</span>
                    <span
                      className={
                        commandeComplete.paiement === "payé"
                          ? "text-emerald-500"
                          : commandeComplete.paiement === "en attente"
                          ? "text-amber-500"
                          : "text-rose-500"
                      }
                    >
                      {commandeComplete.paiement === "payé"
                        ? "Payé"
                        : commandeComplete.paiement === "en attente"
                        ? "En attente"
                        : "Remboursé"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>
                      {format(commandeComplete.date, "dd/MM/yyyy", {
                        locale: fr,
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <TruckIcon className="h-4 w-4" />
                  Informations de livraison
                </h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Méthode:</span>
                    <span>Colissimo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Numéro de suivi:</span>
                    <span>COL123456789FR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statut:</span>
                    <span
                      className={
                        commandeComplete.status === "livree"
                          ? "text-emerald-500"
                          : commandeComplete.status === "expediee"
                          ? "text-purple-500"
                          : "text-muted-foreground"
                      }
                    >
                      {commandeComplete.status === "livree"
                        ? "Livrée"
                        : commandeComplete.status === "expediee"
                        ? "En transit"
                        : "En préparation"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="historique" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {commandeComplete.historique?.map((event, index) => {
                  const statusInfo = getStatusInfo(
                    event.statut as CommandeStatus
                  );
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}
                        >
                          <statusInfo.icon
                            className={`h-4 w-4 ${statusInfo.color}`}
                          />
                        </div>
                        {index < commandeComplete.historique!.length - 1 && (
                          <div
                            className={`w-0.5 h-full ${statusInfo.borderColor}`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                          <h4 className="font-medium">{statusInfo.label}</h4>
                          <span className="text-xs text-muted-foreground">
                            {format(event.date, "dd MMM yyyy, HH:mm", {
                              locale: fr,
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
