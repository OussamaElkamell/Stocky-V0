"use client";

import { Button } from "@/components/ui/button";
import { Commande , convertCommandes } from "../models/commande";
import { useState } from "react";
import { ProduitCommande } from "../models/produitCommande";
import { ProductsForm } from "./products-form";
import DetailsForm from "./details-form";
import { PaymentForm } from "./payment-form";
import { ClientForm } from "./client-form";
import rawCommandes from "../data/commandes.json"; 

const steps = ["Produits", "Client", "Détails", "Paiement"];
export function CommandeForm({ onClose, onAddCommande }: { onClose: () => void, onAddCommande: (commande: Commande) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [commande, setCommande] = useState<Commande>({
    id: "",
    numero: "",
    date: new Date(),
    client: {
      nom: "",
      email: "",
      avatar: "",
      adresseLivraison: {
        rue: "",
        ville: "",
        codePostal: "",
        pays: "",
      },
      canalDeVente: "site web",
    },
    montant: 0,
    status: "en-attente",
    paiement: "en attente",
    produits: 0,
    
    adresseFacturation: {
      rue: "",
      ville: "",
      codePostal: "",
      pays: "",
    },
    methodePaiement: "espèces",
    detailsProduits: [],
    notes: "",
    historique: [],
    informationsLivraison: {
      methodeLivraison: "",
      numeroSuivi: "",
    },
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  function generateUniqueId() {
    return Math.random().toString(36).substring(2, 10); 
  }

  function generateNumero() {
    return `CMD-${Date.now()}`;
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div
            key={step}
            className="relative z-10 flex flex-col items-center flex-1"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-2">{step}</span>
          </div>
        ))}
        {/* Connecting Lines */}
        <div className="absolute top-4 left-0 right-0 flex justify-between">
          {steps.slice(0, -1).map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 mx-2 rounded-full transition-all duration-500 ${
                index < currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div>
        {currentStep === 0 && (
          <ProductsForm commande={commande} setCommande={setCommande} />
        )}
        {currentStep === 1 && (
          <ClientForm commande={commande} setCommande={setCommande} />
        )}
        {currentStep === 2 && (
          <DetailsForm commande={commande} setCommande={setCommande} />
        )}
        {currentStep === 3 && (
          <PaymentForm commande={commande} setCommande={setCommande} />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Précédent
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button
          onClick={() => {
            onAddCommande({
              ...commande,
              id: generateUniqueId(), 
              numero: generateNumero(),
            });
            onClose();
          }}
        >
          Ajouter
        </Button>
        ) : (
          <Button onClick={nextStep}>Suivant</Button>
        )}
      </div>
    </div>
  );
}
