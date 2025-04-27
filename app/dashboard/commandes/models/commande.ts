import { ProduitCommande } from "./produitCommande";
interface Commande {
    id: string;
    numero: string;
    date: Date;
    client: {
      nom: string;
      prenom ?: string;
      email: string;
      avatar?: string;
      adresseLivraison: {
        rue: string;
        ville: string;
        codePostal: string;
        pays: string;
      };
      canalDeVente?: "site web" | "téléphone" | "marketplace" | "boutique physique";
    };
    montant: number;
    status: CommandeStatus;
    paiement: "payé" | "en attente" | "remboursé";
    produits: number;
    adresseFacturation?: {
      rue: string;
      ville: string;
      codePostal: string;
      pays: string;
    };
    methodePaiement?:
      | "carte bancaire"
      | "PayPal"
      | "virement bancaire"
      | "espèces";
    detailsProduits?: ProduitCommande[];
    notes?: string;
    historique?: {
      date: Date;
      statut: string;
      description: string;
    }[];
    informationsLivraison?: {
      methodeLivraison: string;
      numeroSuivi: string;
    };
  }

  type CommandeStatus =
  | "en-attente"
  | "en-preparation"
  | "expediee"
  | "livree"
  | "annulee";

  function convertCommandes(raw: any[]): Commande[] {
    return raw.map(
      (commande): Commande => ({
        ...commande,
        date: new Date(commande.date),
        historique:
          commande.historique?.map((h: any) => ({
            ...h,
            date: new Date(h.date),
          })) ?? [],
        detailsProduits:
          commande.detailsProduits?.map((p: any) => ({
            ...p,
            prix: Number(p.prix),
            quantite: Number(p.quantite),
          })) ?? [],
        montant: Number(commande.montant),
        produits: Number(commande.produits),
      })
    );
  }
  export type { Commande, CommandeStatus };
  export { convertCommandes };