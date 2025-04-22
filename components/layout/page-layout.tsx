import type React from "react"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return <div className="container mx-auto py-6 space-y-6">{children}</div>
}
