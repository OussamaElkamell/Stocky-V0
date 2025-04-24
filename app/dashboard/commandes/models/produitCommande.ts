interface ProduitCommande {
    id: string;
    nom: string;
    sku: string;
    prix: number;
    quantite: number;
    image?: string;
  }

export type { ProduitCommande };