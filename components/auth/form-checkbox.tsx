"use client"

import { forwardRef } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface FormCheckboxProps {
  id: string
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export const FormCheckbox = forwardRef<HTMLButtonElement, FormCheckboxProps>(
  ({ id, label, checked, onCheckedChange, disabled, className }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          ref={ref}
          className={cn(
            "h-5 w-5 border-[#E2E8F0] data-[state=checked]:bg-[#1C64F2] data-[state=checked]:border-[#1C64F2]",
            "focus:ring-[#1C64F2]/20 focus:ring-offset-0",
          )}
        />
        <label
          htmlFor={id}
          className={cn("text-sm font-medium cursor-pointer select-none", className || "text-[#5F6C7B]")}
        >
          {label}
        </label>
      </div>
    )
  },
)

FormCheckbox.displayName = "FormCheckbox"
