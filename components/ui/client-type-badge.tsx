import { Badge } from "@/components/ui/badge"

type ClientType = "b2b" | "b2c"

interface ClientTypeBadgeProps {
  type: ClientType
}

export function ClientTypeBadge({ type }: ClientTypeBadgeProps) {
  switch (type) {
    case "b2b":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
          B2B
        </Badge>
      )
    case "b2c":
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
          B2C
        </Badge>
      )
    default:
      return <Badge variant="outline">Inconnu</Badge>
  }
}
