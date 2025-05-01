"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin/overview")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-4" />
        <p className="text-slate-300">Redirection vers le panneau d'administration...</p>
      </div>
    </div>
  )
}
