"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import { FuturisticAuthLayout } from "@/components/auth/futuristic-auth-layout"
import { FormInput } from "@/components/auth/form-input"
import { PasswordInput } from "@/components/auth/password-input"
import { FormCheckbox } from "@/components/auth/form-checkbox"
import { FormError } from "@/components/auth/form-error"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
    form: "",
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
      isValid = false
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and privacy policy"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Redirect to dashboard or onboarding flow
        window.location.href = "/dashboard"
      } catch (error) {
        setErrors({
          ...errors,
          form: "An error occurred. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <FuturisticAuthLayout title="Create Your Account" description="Start building your online store in minutes">
      <div className="space-y-6">
        {errors.form && <FormError message={errors.form} />}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FormInput
              id="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              disabled={isLoading}
              labelClassName="text-blue-100"
              className="bg-[#1E293B] text-white border-[#334155] placeholder:text-slate-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isLoading}
              labelClassName="text-blue-100"
              className="bg-[#1E293B] text-white border-[#334155] placeholder:text-slate-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <PasswordInput
              id="password"
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={isLoading}
              labelClassName="text-blue-100"
              className="bg-[#1E293B] text-white border-[#334155] placeholder:text-slate-400"
            />
            <p className="text-xs text-blue-200/50 mt-1">Must be at least 8 characters</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              disabled={isLoading}
              labelClassName="text-blue-100"
              className="bg-[#1E293B] text-white border-[#334155] placeholder:text-slate-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex items-start gap-2"
          >
            <FormCheckbox
              id="agreeToTerms"
              label={
                <span className="text-blue-200/70">
                  I agree to the{" "}
                  <Link href="#" className="text-blue-400 hover:text-blue-300 underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-400 hover:text-blue-300 underline">
                    Privacy Policy
                  </Link>
                </span>
              }
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => {
                setFormData({
                  ...formData,
                  agreeToTerms: checked,
                })
                if (checked) {
                  setErrors({
                    ...errors,
                    agreeToTerms: "",
                  })
                }
              }}
              disabled={isLoading}
              className="text-blue-200/70"
            />
          </motion.div>
          {errors.agreeToTerms && <p className="text-red-400 text-xs mt-1">{errors.agreeToTerms}</p>}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="pt-2"
          >
            <motion.button
              type="submit"
              disabled={isLoading}
              className="relative w-full h-12 rounded-xl overflow-hidden flex items-center justify-center gap-2 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient-x"></div>
              <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0)_75%,rgba(255,255,255,0)_100%)] animate-shimmer"></div>
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-blue-400 to-indigo-400 animate-pulse-slow opacity-70"></div>
              </div>
              <span className="relative flex items-center gap-1">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create My Account
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-blue-200/70">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign In
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t border-blue-900/30 pt-6 mt-6"
        >
          <h3 className="text-blue-100 font-medium mb-3 text-center">Why choose Storei?</h3>
          <ul className="space-y-2">
            {[
              "No-code store builder with beautiful templates",
              "Real-time inventory tracking across all channels",
              "RFID-based stock geolocation",
              "Integrated POS system with ticket printing",
              "Dedicated client spaces for B2B and B2C",
            ].map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-2 text-blue-200/70 text-sm"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
              >
                <div className="rounded-full bg-blue-500/10 p-1 flex-shrink-0">
                  <Check className="h-3 w-3 text-blue-400" />
                </div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 8s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </FuturisticAuthLayout>
  )
}
