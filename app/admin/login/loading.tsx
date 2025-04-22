import { Shield } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-600">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>

        <Card className="border-slate-800 bg-slate-950 text-slate-100">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Administration Storei</CardTitle>
            <CardDescription className="text-slate-400">
              Connectez-vous pour accéder au panneau d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-20 bg-slate-800" />
                <Skeleton className="h-10 w-full bg-slate-800" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24 bg-slate-800" />
                  <Skeleton className="h-4 w-32 bg-slate-800" />
                </div>
                <Skeleton className="h-10 w-full bg-slate-800" />
              </div>

              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 bg-slate-800" />
                <Skeleton className="h-4 w-28 bg-slate-800" />
              </div>

              <Skeleton className="h-10 w-full bg-slate-800" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full bg-slate-800" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
