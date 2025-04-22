"use client"

import type React from "react"

import { useState, forwardRef } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  forgotPasswordLink?: React.ReactNode
  labelClassName?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, id, error, forgotPasswordLink, labelClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor={id} className={cn("block text-sm font-medium", labelClassName || "text-[#153E75]")}>
            {label}
          </label>
          {forgotPasswordLink}
        </div>
        <div className="relative">
          <input
            id={id}
            name={id}
            type={showPassword ? "text" : "password"}
            ref={ref}
            className={cn(
              "w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all",
              error
                ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                : "border-[#E2E8F0] focus:border-[#1C64F2] focus:ring-[#1C64F2]/20",
              className,
            )}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  },
)

PasswordInput.displayName = "PasswordInput"
