import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F8]">
      {/* Navigation Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-24 rounded" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-14 rounded" />
          </nav>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-16 rounded" />
            <Skeleton className="h-9 w-16 rounded" />
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Skeleton className="h-6 w-32 rounded mx-auto" />
          <Skeleton className="h-12 w-3/4 rounded mx-auto" />
          <Skeleton className="h-6 w-2/3 rounded mx-auto" />
        </div>
      </section>

      {/* Process Overview Skeleton */}
      <section className="container py-12">
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </section>

      {/* Detailed Steps Skeleton */}
      <section className="container py-16">
        <Skeleton className="h-8 w-48 rounded mx-auto mb-12" />

        <div className="space-y-16">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="h-[400px] rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-24 rounded" />
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-20 w-full rounded" />

                <div className="space-y-4 pt-4">
                  <Skeleton className="h-32 w-full rounded" />
                  <Skeleton className="h-32 w-full rounded" />
                  <Skeleton className="h-32 w-full rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-64 rounded mx-auto mb-8" />

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((faq) => (
              <Skeleton key={faq} className="h-16 w-full rounded" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="container py-16">
        <Skeleton className="h-[300px] w-full rounded-2xl" />
      </section>

      {/* Footer Skeleton */}
      <footer className="border-t py-12 md:py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-4">
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-16 w-full rounded" />
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>

            {[1, 2, 3].map((col) => (
              <div key={col} className="space-y-4">
                <Skeleton className="h-6 w-24 rounded" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Skeleton key={item} className="h-4 w-full rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t">
            <Skeleton className="h-4 w-48 rounded mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  )
}
