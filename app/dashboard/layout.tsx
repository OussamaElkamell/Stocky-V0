import type React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { FloatingWalkieTalkieButton } from "@/components/floating-walkie-talkie-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      {children}
      <FloatingWalkieTalkieButton />
    </MainLayout>
  )
}
