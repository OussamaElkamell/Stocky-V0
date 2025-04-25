"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface CreditCardInputProps {
  id: string
  placeholder: string
  onChange?: (value: string) => void
}

export function CreditCardInput({ id, placeholder, onChange }: CreditCardInputProps) {
  const [value, setValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-digit characters
    let input = e.target.value.replace(/\D/g, "")

    // Limit to 16 digits
    input = input.substring(0, 16)

    // Format with spaces every 4 digits
    let formatted = ""
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += " "
      }
      formatted += input[i]
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
      maxLength={19} // 16 digits + 3 spaces
    />
  )
}
