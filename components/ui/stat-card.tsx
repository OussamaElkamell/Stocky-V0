import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon?: React.ReactNode
  description?: string
  trend?: {
    value: number
    direction: "up" | "down"
  }
}

export function StatCard({ title, value, icon, description, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm font-medium">{title}</span>
          {icon && <span className="rounded-md bg-muted p-2">{icon}</span>}
        </div>
        <div className="mt-2 flex items-baseline">
          <span className="text-2xl font-bold">{value}</span>
          {description && <span className="ml-2 text-xs text-muted-foreground">{description}</span>}
        </div>
        {trend && (
          <div className="mt-2 flex items-center">
            <span
              className={`flex items-center text-xs font-medium ${
                trend.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.direction === "up" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              )}
              {trend.value}%
            </span>
            <span className="ml-1 text-xs text-muted-foreground">depuis le mois dernier</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
