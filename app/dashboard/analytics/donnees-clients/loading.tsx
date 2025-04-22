import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function DonneesClientsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-muted/40 rounded-lg">
        <Skeleton className="h-10 w-full md:w-80" />
        <Skeleton className="h-10 w-full md:w-48" />
        <Skeleton className="h-4 w-32 ml-auto" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4">
            <div className="grid grid-cols-6 gap-4 py-4 border-b">
              <Skeleton className="h-5 w-full col-span-1" />
              <Skeleton className="h-5 w-full col-span-1" />
              <Skeleton className="h-5 w-full col-span-1" />
              <Skeleton className="h-5 w-full col-span-1" />
              <Skeleton className="h-5 w-full col-span-1" />
              <Skeleton className="h-5 w-full col-span-1" />
            </div>

            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 py-4 border-b">
                <Skeleton className="h-5 w-full col-span-1" />
                <Skeleton className="h-5 w-full col-span-1" />
                <Skeleton className="h-5 w-full col-span-1" />
                <Skeleton className="h-5 w-full col-span-1" />
                <Skeleton className="h-5 w-full col-span-1" />
                <Skeleton className="h-5 w-8 col-span-1" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end p-4">
            <Skeleton className="h-10 w-64" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
