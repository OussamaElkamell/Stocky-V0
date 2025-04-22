"use client"

import type React from "react"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { Truck } from "lucide-react"

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string | null | undefined
  fallback?: React.ReactNode
}

export function SafeImage({ src, alt, fallback, ...props }: SafeImageProps) {
  const [error, setError] = useState(false)

  // Si src est null, undefined ou une chaîne vide, ou si une erreur s'est produite, afficher le fallback
  if (!src || src.trim() === "" || error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md">
        {fallback || <Truck className="h-5 w-5 text-gray-400" />}
      </div>
    )
  }

  // Sinon, afficher l'image
  return <Image src={src || "/placeholder.svg"} alt={alt || ""} onError={() => setError(true)} {...props} />
}
