"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDownIcon,
  EyeIcon,
  MoreHorizontalIcon,
  TruckIcon,
  XCircleIcon,
} from "lucide-react";
import { format} from "date-fns";
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
import { Commande } from "./models/commande";
import StatusBadge from "./status-badge";
import StatusUpdateDialog from "./update-status";
import { useEffect } from "react";

function filtrerCommandes(
  commandes: Commande[],
  status?: string,
  dateRange?: DateRange,
  facetFilters?: Record<string, string[]>,
  searchTerm?: string
): Commande[] {
  const statusMap: Record<string, string[]> = {
    "en-attente": ["en-attente"],
    "en-preparation": ["en-preparation"],
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
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter((commande) => {
      return (
        commande.numero.toLowerCase().includes(term) ||
        commande.client.nom.toLowerCase().includes(term) ||
        commande.client.email.toLowerCase().includes(term) ||
        commande.status.toLowerCase().includes(term)
      );
    });
  }

  const resetTimeToMidnight = (date: Date): number => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0); 
    return newDate.getTime();
  };
  
  if (dateRange?.from || dateRange?.to) {

  
    filtered = filtered.filter((commande) => {
      const time = resetTimeToMidnight(commande.date);
  
      const afterStart = dateRange.from
        ? resetTimeToMidnight(dateRange.from) <= time
        : true;

      const beforeEnd = dateRange.to
        ? resetTimeToMidnight(dateRange.to) >= time
        : true;
  
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
                (option) => commande.client.canalDeVente === canalMap[option]
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



export function CommandesTable({
  commandesState,
  setCommandesState,
  status,
  dateRange,
  facetFilters,
  search = "",
}: {
  commandesState: Commande[];
  setCommandesState: React.Dispatch<React.SetStateAction<Commande[]>>;
  status?: string;
  dateRange?: DateRange;
  facetFilters?: Record<string, string[]>;
  search?: string;
}) {
  const [selectedCommandes, setSelectedCommandes] = useState<string[]>([]);
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null);
  const [sortField, setSortField] = useState<"numero" | "date" | "montant">("numero");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const commandesFiltrees = useMemo(() => {
    return filtrerCommandes(commandesState, status, dateRange, facetFilters, search);
  }, [commandesState, status, dateRange, facetFilters, search]); 
  
  const commandesTrieesEtFiltrees = useMemo(() => {
    const data = [...commandesFiltrees];
    return data.sort((a, b) => {
      let valA: number | string = "";
      let valB: number | string = "";
  
      switch (sortField) {
        case "numero":
          valA = parseInt(a.numero.slice(1));
          valB = parseInt(b.numero.slice(1));
          break;
        case "date":
          valA = a.date.getTime();
          valB = b.date.getTime();
          break;
        case "montant":
          valA = a.montant;
          valB = b.montant;
          break;
      }
  
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [commandesFiltrees, sortField, sortOrder]);
  
  const currentCommandes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return commandesTrieesEtFiltrees.slice(start, start + itemsPerPage);
  }, [commandesTrieesEtFiltrees, currentPage]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [commandesFiltrees, status, dateRange, facetFilters, search]);

  const indexOfLastItem = currentPage * itemsPerPage;

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  const toggleSelectAll = () => {
    if (selectedCommandes.length === commandesFiltrees.length) {
      setSelectedCommandes([]);
    } else {
      setSelectedCommandes(commandesFiltrees.map((c) => c.id));
    }
  };

  const toggleSelectCommande = (id: string) => {
    setSelectedCommandes((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
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
              <Button
                variant="ghost"
                onClick={() => toggleSort("numero")}
                className="flex items-center gap-1"
              >
                N° Commande <ArrowUpDownIcon className="w-3 h-3" />
              </Button>
            </TableHead>
            <TableHead>Client</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => toggleSort("date")}
                className="flex items-center gap-1"
              >
                Date <ArrowUpDownIcon className="w-3 h-3" />
              </Button>
            </TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => toggleSort("montant")}
                className="flex items-center gap-1"
              >
                Montant <ArrowUpDownIcon className="w-3 h-3" />
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
                      <div className="font-medium">{commande.client.nom} {commande.client.prenom}</div>
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
                    currency: "TND",
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
                          onClick={() => {
                            setSelectedCommande(commande);
                            setIsDetailsDialogOpen(true);
                            setIsStatusDialogOpen(false);
                          }}
                        >
                          <DropdownMenuItem>
                            <EyeIcon className="mr-2 h-4 w-4" />
                            Voir les détails
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogTrigger
                          asChild
                          onClick={() => {
                            setSelectedCommande(commande);
                            setIsStatusDialogOpen(true);
                            setIsDetailsDialogOpen(false);
                          }}
                        >
                          <DropdownMenuItem>
                            <TruckIcon className="mr-2 h-4 w-4" />
                            Mettre à jour le statut
                          </DropdownMenuItem>
                        </DialogTrigger>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <XCircleIcon className="mr-2 h-4 w-4" />
                          Annuler la commande
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {selectedCommande && isDetailsDialogOpen && (
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
                        <CommandeDetails commande={selectedCommande} commandesState={commandesState} setCommandesState={setCommandesState}/>
                      </DialogContent>
                    )}
                    {selectedCommande && isStatusDialogOpen && (
                      <StatusUpdateDialog
                      selectedCommande={selectedCommande}
                      setSelectedCommande={(commande) => setSelectedCommande(commande)}
                      commandesState={commandesState}
                      setCommandesState={setCommandesState}
                    />
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
