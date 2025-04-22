import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  labelClassName?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, id, error, labelClassName, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className={cn("block text-sm font-medium", labelClassName || "text-[#153E75]")}>
          {label}
        </label>
        <input
          id={id}
          name={id}
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all",
            error
              ? "border-red-300 focus:border-red-300 focus:ring-red-200"
              : "border-[#E2E8F0] focus:border-[#1C64F2] focus:ring-[#1C64F2]/20",
            className,
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  },
)

FormInput.displayName = "FormInput"
