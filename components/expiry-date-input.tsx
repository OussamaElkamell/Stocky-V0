"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface ExpiryDateInputProps {
  id: string
  placeholder: string
  onChange?: (value: string) => void
}

export function ExpiryDateInput({ id, placeholder, onChange }: ExpiryDateInputProps) {
  const [value, setValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-digit characters
    let input = e.target.value.replace(/\D/g, "")

    // Limit to 4 digits
    input = input.substring(0, 4)

    // Format as MM/YY
    let formatted = ""
    if (input.length > 0) {
      formatted = input.substring(0, Math.min(2, input.length))
      if (input.length > 2) {
        formatted += "/" + input.substring(2)
      }
    }

    setValue(formatted)

    if (onChange) {
      onChange(input)
    }
  }

  return (
    <Input
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      maxLength={5} // MM/YY format
    />
  )
}
