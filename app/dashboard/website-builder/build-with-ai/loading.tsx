import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-10 w-40" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
      </div>
    </div>
  )
}
