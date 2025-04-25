import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import StatusBadge from "./status-badge";
import { Button } from "@/components/ui/button";
import type { Commande, CommandeStatus } from "./models/commande";

interface StatusUpdateDialogProps {
  selectedCommande: Commande | null;
  setSelectedCommande: (commande: Commande | null) => void;
  commandesState: Commande[];
  setCommandesState: React.Dispatch<React.SetStateAction<Commande[]>>;
}

const StatusUpdateDialog: React.FC<StatusUpdateDialogProps> = ({
  selectedCommande,
  setSelectedCommande,
  commandesState,
  setCommandesState,
}) => {
  const [newStatus, setNewStatus] = useState<CommandeStatus | "">("");

  const handleUpdateStatus = () => {
    if (newStatus) {
      const updated = commandesState.map((c) =>
        c.id === selectedCommande?.id ? { ...c, status: newStatus } : c
      );
      setCommandesState(updated);
    } else {
      console.error("Invalid status update:", newStatus);
    }

    setNewStatus("");
    setSelectedCommande(null);
  };

  return (
    selectedCommande  && (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mettre à jour le statut</DialogTitle>
          <DialogDescription>
            Modifier le statut de la commande {selectedCommande.numero}
          </DialogDescription>
        </DialogHeader>

        <Select value={newStatus || selectedCommande.status} onValueChange={(value) => setNewStatus(value as CommandeStatus)}>
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

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => {  setSelectedCommande(null); }}>
            Annuler
          </Button>
          <Button onClick={handleUpdateStatus}>
            Mettre à jour
          </Button>
        </div>
      </DialogContent>
    )
  );
};

export default StatusUpdateDialog;
