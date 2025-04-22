"use client"

import { useState } from "react"
import {
  ArrowUpDownIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PackageIcon,
  TruckIcon,
  XCircleIcon,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CommandeDetails } from "./commande-details"

// Types pour les commandes
type CommandeStatus = "en-attente" | "en-preparation" | "expediee" | "livree" | "annulee"

interface Commande {
  id: string
  numero: string
  date: Date
  client: {
    nom: string
    email: string
    avatar?: string
  }
  montant: number
  status: CommandeStatus
  paiement: "payé" | "en attente" | "remboursé"
  produits: number
}

// Données de démonstration
const commandes: Commande[] = [
  {
    id: "1",
    numero: "CMD-2023-001",
    date: new Date(2023, 3, 15),
    client: {
      nom: "Sophie Martin",
      email: "sophie.martin@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    montant: 129.99,
    status: "livree",
    paiement: "payé",
    produits: 3,
  },
  {
    id: "2",
    numero: "CMD-2023-002",
    date: new Date(2023, 3, 16),
    client: {
      nom: "Thomas Dubois",
      email: "thomas.dubois@example.com",
    },
    montant: 79.5,
    status: "expediee",
    paiement: "payé",
    produits: 2,
  },
  {
    id: "3",
    numero: "CMD-2023-003",
    date: new Date(2023, 3, 17),
    client: {
      nom: "Emma Petit",
      email: "emma.petit@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    montant: 249.99,
    status: "en-preparation",
    paiement: "payé",
    produits: 5,
  },
  {
    id: "4",
    numero: "CMD-2023-004",
    date: new Date(2023, 3, 18),
    client: {
      nom: "Lucas Bernard",
      email: "lucas.bernard@example.com",
    },
    montant: 45.0,
    status: "en-attente",
    paiement: "en attente",
    produits: 1,
  },
  {
    id: "5",
    numero: "CMD-2023-005",
    date: new Date(2023, 3, 19),
    client: {
      nom: "Chloé Moreau",
      email: "chloe.moreau@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    montant: 189.95,
    status: "annulee",
    paiement: "remboursé",
    produits: 4,
  },
  {
    id: "6",
    numero: "CMD-2023-006",
    date: new Date(2023, 3, 20),
    client: {
      nom: "Hugo Leroy",
      email: "hugo.leroy@example.com",
    },
    montant: 99.99,
    status: "livree",
    paiement: "payé",
    produits: 2,
  },
  {
    id: "7",
    numero: "CMD-2023-007",
    date: new Date(2023, 3, 21),
    client: {
      nom: "Léa Girard",
      email: "lea.girard@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    montant: 159.5,
    status: "expediee",
    paiement: "payé",
    produits: 3,
  },
  {
    id: "8",
    numero: "CMD-2023-008",
    date: new Date(2023, 3, 22),
    client: {
      nom: "Nathan Fournier",
      email: "nathan.fournier@example.com",
    },
    montant: 299.99,
    status: "en-preparation",
    paiement: "payé",
    produits: 6,
  },
  {
    id: "9",
    numero: "CMD-2023-009",
    date: new Date(2023, 3, 23),
    client: {
      nom: "Camille Dupont",
      email: "camille.dupont@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    montant: 49.95,
    status: "en-attente",
    paiement: "en attente",
    produits: 1,
  },
  {
    id: "10",
    numero: "CMD-2023-010",
    date: new Date(2023, 3, 24),
    client: {
      nom: "Mathis Rousseau",
      email: "mathis.rousseau@example.com",
    },
    montant: 179.9,
    status: "livree",
    paiement: "payé",
    produits: 4,
  },
]

// Fonction pour filtrer les commandes par statut
function filtrerCommandes(commandes: Commande[], status?: string) {
  if (!status || status === "toutes") return commandes
  return commandes.filter((commande) => {
    if (status === "en-cours") {
      return ["en-attente", "en-preparation", "expediee"].includes(commande.status)
    }
    return commande.status === status
  })
}

// Composant pour afficher le statut avec une icône et une couleur appropriée
function StatusBadge({ status }: { status: CommandeStatus }) {
  switch (status) {
    case "en-attente":
      return (
        <Badge variant="outline" className="flex items-center gap-1 text-amber-500 border-amber-200 bg-amber-50">
          <ClockIcon className="h-3 w-3" />
          En attente
        </Badge>
      )
    case "en-preparation":
      return (
        <Badge variant="outline" className="flex items-center gap-1 text-blue-500 border-blue-200 bg-blue-50">
          <PackageIcon className="h-3 w-3" />
          En préparation
        </Badge>
      )
    case "expediee":
      return (
        <Badge variant="outline" className="flex items-center gap-1 text-purple-500 border-purple-200 bg-purple-50">
          <TruckIcon className="h-3 w-3" />
          Expédiée
        </Badge>
      )
    case "livree":
      return (
        <Badge variant="outline" className="flex items-center gap-1 text-emerald-500 border-emerald-200 bg-emerald-50">
          <CheckCircleIcon className="h-3 w-3" />
          Livrée
        </Badge>
      )
    case "annulee":
      return (
        <Badge variant="outline" className="flex items-center gap-1 text-rose-500 border-rose-200 bg-rose-50">
          <XCircleIcon className="h-3 w-3" />
          Annulée
        </Badge>
      )
  }
}

export function CommandesTable({ status }: { status?: string }) {
  const [selectedCommandes, setSelectedCommandes] = useState<string[]>([])
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null)

  const commandesFiltrees = filtrerCommandes(commandes, status)

  const toggleSelectAll = () => {
    if (selectedCommandes.length === commandesFiltrees.length) {
      setSelectedCommandes([])
    } else {
      setSelectedCommandes(commandesFiltrees.map((c) => c.id))
    }
  }

  const toggleSelectCommande = (id: string) => {
    if (selectedCommandes.includes(id)) {
      setSelectedCommandes(selectedCommandes.filter((c) => c !== id))
    } else {
      setSelectedCommandes([...selectedCommandes, id])
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedCommandes.length === commandesFiltrees.length && commandesFiltrees.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Sélectionner toutes les commandes"
              />
            </TableHead>
            <TableHead className="w-[120px]">
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                <span>Numéro</span>
                <ArrowUpDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Client</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                <span>Date</span>
                <ArrowUpDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                <span>Montant</span>
                <ArrowUpDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commandesFiltrees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Aucune commande trouvée.
              </TableCell>
            </TableRow>
          ) : (
            commandesFiltrees.map((commande) => (
              <TableRow key={commande.id} className="group">
                <TableCell>
                  <Checkbox
                    checked={selectedCommandes.includes(commande.id)}
                    onCheckedChange={() => toggleSelectCommande(commande.id)}
                    aria-label={`Sélectionner la commande ${commande.numero}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{commande.numero}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={commande.client.avatar} alt={commande.client.nom} />
                      <AvatarFallback>
                        {commande.client.nom.charAt(0)}
                        {commande.client.nom.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{commande.client.nom}</div>
                      <div className="text-xs text-muted-foreground">{commande.client.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{format(commande.date, "dd MMM yyyy", { locale: fr })}</TableCell>
                <TableCell>
                  <StatusBadge status={commande.status} />
                </TableCell>
                <TableCell>
                  {commande.montant.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir le menu</span>
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DialogTrigger asChild onClick={() => setSelectedCommande(commande)}>
                          <DropdownMenuItem>
                            <EyeIcon className="mr-2 h-4 w-4" />
                            Voir les détails
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem>
                          <TruckIcon className="mr-2 h-4 w-4" />
                          Mettre à jour le statut
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <XCircleIcon className="mr-2 h-4 w-4" />
                          Annuler la commande
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {selectedCommande && (
                      <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                          <DialogTitle>Détails de la commande {selectedCommande.numero}</DialogTitle>
                          <DialogDescription>
                            Commande passée le {format(selectedCommande.date, "dd MMMM yyyy", { locale: fr })}
                          </DialogDescription>
                        </DialogHeader>
                        <CommandeDetails commande={selectedCommande} />
                      </DialogContent>
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 px-4">
        <div className="text-sm text-muted-foreground">
          Affichage de <span className="font-medium">{commandesFiltrees.length}</span> sur{" "}
          <span className="font-medium">{commandes.length}</span> commandes
        </div>
        <Button variant="outline" size="sm" disabled>
          Précédent
        </Button>
        <Button variant="outline" size="sm" disabled>
          Suivant
        </Button>
      </div>
    </div>
  )
}
