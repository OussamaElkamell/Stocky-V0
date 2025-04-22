import type React from "react"
import Link from "next/link"
import { Box } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link href="/landing" className="flex items-center gap-2">
            <Box className="h-6 w-6 text-[#1C64F2]" />
            <span className="text-xl font-bold text-[#153E75]">Storei</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-[#153E75] mb-2">{title}</h1>
              {description && <p className="text-[#5F6C7B]">{description}</p>}
            </div>
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-sm text-[#5F6C7B] border-t bg-white">
        <p>© {new Date().getFullYear()} Storei. All rights reserved.</p>
      </footer>
    </div>
  )
}
