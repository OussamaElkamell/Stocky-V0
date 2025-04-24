"use client";

import { useState } from "react";
import {
  ArrowUpDownIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PackageIcon,
  TruckIcon,
  XCircleIcon,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CommandeDetails } from "./commande-details";
import type { DateRange } from "react-day-picker";
import rawCommandes from "./data/commandes.json";
import  { Commande} from "./models/commande";
import type { CommandeStatus } from "./models/commande";
import { convertCommandes } from "./models/commande";
// Données de démonstration
const commandes: Commande[] = convertCommandes(rawCommandes);


function filtrerCommandes(
  commandes: Commande[],
  status?: string,
  dateRange?: DateRange,
  facetFilters?: Record<string, string[]>
): Commande[] {
  const statusMap: Record<string, string[]> = {
    "en-cours": ["en-attente", "en-preparation", "expediee"],
    expediees: ["expediee"],
    livrees: ["livree"],
    annulees: ["annulee"],
  };

  let filtered = [...commandes];

  if (status && status !== "Toutes") {
    const allowedStatuses = statusMap[status];
    if (allowedStatuses) {
      filtered = filtered.filter((commande) =>
        allowedStatuses.includes(commande.status)
      );
    }
  }
  if (dateRange?.from || dateRange?.to) {
    filtered = filtered.filter((commande) => {
      const time = commande.date.getTime();
      const afterStart = dateRange.from
        ? time >= dateRange.from.getTime()
        : true;
      const beforeEnd = dateRange.to ? time <= dateRange.to.getTime() : true;
      return afterStart && beforeEnd;
    });
  }

  if (facetFilters && Object.keys(facetFilters).length > 0) {
    filtered = filtered.filter((commande) => {
      return Object.entries(facetFilters).every(
        ([facetId, selectedOptions]) => {
          if (selectedOptions.length === 0) return true;

          switch (facetId) {
            case "paiement":
              const paiementMap: Record<string, string> = {
                paye: "payé",
                "en-attente": "en attente",
                rembourse: "remboursé",
              };
              return selectedOptions.some(
                (option) => commande.paiement === paiementMap[option]
              );

            case "methode-paiement":
              const methodePaiementMap: Record<string, string> = {
                carte: "Carte bancaire",
                paypal: "PayPal",
                virement: "Virement",
                especes: "espèces",
              };
              return selectedOptions.some(
                (option) =>
                  commande.methodePaiement === methodePaiementMap[option]
              );

            case "canal":
              const canalMap: Record<string, string> = {
                site: "site web",
                telephone: "téléphone",
                market: "marketplace",
                boutique: "boutique physique",
              };
              return selectedOptions.some(
                (option) => commande.canalDeVente === canalMap[option]
              );

            default:
              return true;
          }
        }
      );
    });
  }
  return filtered;
}

// Composant pour afficher le statut avec une icône et une couleur appropriée
function StatusBadge({ status }: { status: CommandeStatus }) {
  switch (status) {
    case "en-attente":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 text-amber-500 border-amber-200 bg-amber-50"
        >
          <ClockIcon className="h-3 w-3" />
          En attente
        </Badge>
      );
    case "en-preparation":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 text-blue-500 border-blue-200 bg-blue-50"
        >
          <PackageIcon className="h-3 w-3" />
          En préparation
        </Badge>
      );
    case "expediee":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 text-purple-500 border-purple-200 bg-purple-50"
        >
          <TruckIcon className="h-3 w-3" />
          Expédiée
        </Badge>
      );
    case "livree":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 text-emerald-500 border-emerald-200 bg-emerald-50"
        >
          <CheckCircleIcon className="h-3 w-3" />
          Livrée
        </Badge>
      );
    case "annulee":
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 text-rose-500 border-rose-200 bg-rose-50"
        >
          <XCircleIcon className="h-3 w-3" />
          Annulée
        </Badge>
      );
  }
}

export function CommandesTable({
  status,
  dateRange,
  facetFilters,
}: {
  status?: string;
  dateRange?: DateRange;
  facetFilters?: Record<string, string[]>;
}) {
  const [selectedCommandes, setSelectedCommandes] = useState<string[]>([]);
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const commandesFiltrees = filtrerCommandes(commandes, status, dateRange, facetFilters);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCommandes = commandesFiltrees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const toggleSelectAll = () => {
    if (selectedCommandes.length === commandesFiltrees.length) {
      setSelectedCommandes([]);
    } else {
      setSelectedCommandes(commandesFiltrees.map((c) => c.id));
    }
  };

  const toggleSelectCommande = (id: string) => {
    if (selectedCommandes.includes(id)) {
      setSelectedCommandes(selectedCommandes.filter((c) => c !== id));
    } else {
      setSelectedCommandes([...selectedCommandes, id]);
    }
  };

  const goToNextPage = () => {
    if (currentPage * itemsPerPage < commandesFiltrees.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={
                  selectedCommandes.length === commandesFiltrees.length &&
                  commandesFiltrees.length > 0
                }
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
            currentCommandes.map((commande) => (
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
                      <AvatarImage
                        src={commande.client.avatar}
                        alt={commande.client.nom}
                      />
                      <AvatarFallback>
                        {commande.client.nom.charAt(0)}
                        {commande.client.nom.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{commande.client.nom}</div>
                      <div className="text-xs text-muted-foreground">
                        {commande.client.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {format(commande.date, "dd MMM yyyy", { locale: fr })}
                </TableCell>
                <TableCell>
                  <StatusBadge status={commande.status} />
                </TableCell>
                <TableCell>
                  {commande.montant.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
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
                        <DialogTrigger
                          asChild
                          onClick={() => setSelectedCommande(commande)}
                        >
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
                          <DialogTitle>
                            Détails de la commande {selectedCommande.numero}
                          </DialogTitle>
                          <DialogDescription>
                            Commande passée le{" "}
                            {format(selectedCommande.date, "dd MMMM yyyy", {
                              locale: fr,
                            })}
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
      <div className="flex items-center justify-between flex-wrap gap-2 py-4 px-4">
        <div className="text-sm text-muted-foreground">
          Affichage de{" "}
          <span className="font-medium">
            {itemsPerPage < commandesFiltrees.length
              ? itemsPerPage
              : commandesFiltrees.length}
          </span>{" "}
          sur <span className="font-medium">{commandesFiltrees.length}</span>{" "}
          commandes
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage * itemsPerPage >= commandesFiltrees.length}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
