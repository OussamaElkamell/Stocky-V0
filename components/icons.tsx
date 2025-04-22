import type * as React from "react"

import { GlobeIcon, Square } from "lucide-react"

export function Globe(props: React.SVGProps<SVGSVGElement>) {
  return <GlobeIcon {...props} />
}

export function Box(props: React.SVGProps<SVGSVGElement>) {
  return <Square {...props} />
}

export function Smartphone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M12 18v2" />
      <path d="M8 2v2" />
      <path d="M16 2v2" />
    </svg>
  )
}
