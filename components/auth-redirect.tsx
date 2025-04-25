"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthRedirectProps {
  isNewUser: boolean
}

export function AuthRedirect({ isNewUser }: AuthRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    if (isNewUser) {
      // Redirect new users to the onboarding page
      router.push("/onboarding")
    } else {
      // Redirect existing users to the dashboard
      router.push("/dashboard")
    }
  }, [isNewUser, router])

  return null
}
