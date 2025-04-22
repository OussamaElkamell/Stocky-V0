import type { ReactNode } from "react"

interface FilterBarProps {
  children: ReactNode
  className?: string
}

export function FilterBar({ children, className }: FilterBarProps) {
  return <div className={`flex flex-col md:flex-row gap-4 ${className}`}>{children}</div>
}
