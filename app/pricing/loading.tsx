import { Box } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function PricingLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F8]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="h-6 w-6 text-[#1C64F2]" />
            <span className="text-xl font-bold text-[#153E75]">Storei</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </nav>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-12 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto" />
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="container pb-24">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Skeleton className="h-10 w-64" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 space-y-6 border">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-10 w-32" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="bg-white py-24">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>

          <div className="overflow-x-auto">
            <div className="w-full min-w-[800px]">
              <Skeleton className="h-12 w-full mb-4" />
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-12 w-full mb-4" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 md:py-24">
        <Skeleton className="h-64 w-full rounded-2xl" />
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t text-center">
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  )
}
