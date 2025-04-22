import { Skeleton } from "@/components/ui/skeleton"
import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"

export default function Loading() {
  return (
    <PageLayout>
      <PageHeader
        title={<Skeleton className="h-8 w-64" />}
        description={<Skeleton className="h-4 w-96" />}
        actions={
          <>
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </>
        }
      />

      <div className="grid gap-4">
        <Skeleton className="h-10 w-full max-w-md" />

        <div className="grid gap-6">
          <div className="rounded-lg border bg-card shadow-sm">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
