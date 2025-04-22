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
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-4 w-16 rounded" />
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-20 rounded" />
            <Skeleton className="h-9 w-20 rounded" />
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="container py-16 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Skeleton className="h-6 w-32 rounded mx-auto" />
          <Skeleton className="h-12 w-full max-w-xl rounded mx-auto" />
          <Skeleton className="h-6 w-full max-w-lg rounded mx-auto" />
          <div className="pt-4 flex justify-center">
            <Skeleton className="h-10 w-32 rounded" />
          </div>
        </div>
      </section>

      {/* Features Grid Skeleton */}
      <section className="container py-16 space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white rounded-lg border p-6 space-y-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-6 w-3/4 rounded" />
                <Skeleton className="h-16 w-full rounded" />
              </div>
            ))}
        </div>
      </section>

      {/* Feature Spotlight Skeleton */}
      <section className="bg-white py-24">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-6 w-32 rounded mx-auto" />
            <Skeleton className="h-10 w-full max-w-lg rounded mx-auto" />
            <Skeleton className="h-6 w-full max-w-md rounded mx-auto" />
          </div>

          <div className="space-y-24">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={i % 2 === 1 ? "order-2 lg:order-1" : ""}>
                    <Skeleton className="h-6 w-32 rounded mb-4" />
                    <Skeleton className="h-8 w-3/4 rounded mb-4" />
                    <Skeleton className="h-24 w-full rounded mb-6" />
                    <div className="space-y-3">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                            <Skeleton className="h-5 w-full rounded" />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "order-1 lg:order-2" : ""}>
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="container py-16 md:py-24">
        <div className="rounded-2xl bg-[#1C64F2]/10 p-8 md:p-16">
          <div className="mx-auto max-w-2xl text-center space-y-8">
            <Skeleton className="h-10 w-3/4 rounded mx-auto" />
            <Skeleton className="h-6 w-full rounded mx-auto" />
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Skeleton className="h-12 w-full sm:w-32 rounded" />
              <Skeleton className="h-12 w-full sm:w-32 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="border-t py-12 md:py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
              </div>
              <Skeleton className="h-4 w-full rounded mb-4" />
              <div className="flex gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-full" />
                  ))}
              </div>
            </div>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-6 w-24 rounded mb-4" />
                  <div className="space-y-2">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full rounded" />
                      ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-12 pt-8 border-t text-center">
            <Skeleton className="h-4 w-48 rounded mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  )
}
