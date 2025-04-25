import {
  PackageIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CommandeStatus } from "./models/commande";
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

  export default StatusBadge;