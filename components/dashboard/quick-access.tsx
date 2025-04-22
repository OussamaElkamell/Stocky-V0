import Link from "next/link"
import { CreditCard, Package, ShoppingCart, Tag, LayoutGrid, Radio } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardQuickAccess() {
  const quickAccessItems = [
    {
      name: "Caisse",
      icon: <CreditCard className="h-8 w-8 text-emerald-500 mb-2" />,
      href: "/dashboard/caisse",
    },
    {
      name: "Inventaire",
      icon: <Package className="h-8 w-8 text-blue-500 mb-2" />,
      href: "/dashboard/inventory",
    },
    {
      name: "Commandes",
      icon: <ShoppingCart className="h-8 w-8 text-amber-500 mb-2" />,
      href: "/dashboard/commandes",
    },
    {
      name: "RFID",
      icon: <Tag className="h-8 w-8 text-purple-500 mb-2" />,
      href: "/dashboard/rfid",
    },
    {
      name: "Site Web",
      icon: <LayoutGrid className="h-8 w-8 text-indigo-500 mb-2" />,
      href: "/dashboard/website-builder",
    },
    {
      name: "Walkie-Talkie",
      icon: <Radio className="h-8 w-8 text-rose-500 mb-2" />,
      href: "/walkie-talkie",
    },
  ]

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle>Accès rapide</CardTitle>
        <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickAccessItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
