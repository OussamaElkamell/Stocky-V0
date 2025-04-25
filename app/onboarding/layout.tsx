import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Complete Your Profile - StorEI POS System",
  description: "Set up your profile and preferences for the StorEI Point of Sale system",
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-slate-50">{children}</div>
}
