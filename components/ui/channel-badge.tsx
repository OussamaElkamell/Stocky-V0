import { Badge } from "@/components/ui/badge"

type ChannelType = "store" | "online" | "catalog"

interface ChannelBadgeProps {
  channel: ChannelType
}

export function ChannelBadge({ channel }: ChannelBadgeProps) {
  switch (channel) {
    case "store":
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-700">
          Boutique
        </Badge>
      )
    case "online":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          E-commerce
        </Badge>
      )
    case "catalog":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700">
          Catalogue
        </Badge>
      )
    default:
      return <Badge variant="outline">Inconnu</Badge>
  }
}
