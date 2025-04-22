"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/auth/form-input"
import { PasswordInput } from "@/components/auth/password-input"
import { FormCheckbox } from "@/components/auth/form-checkbox"
import { FormError } from "@/components/auth/form-error"
import { motion } from "framer-motion"
import { keyframes } from "@emotion/react"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
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

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "L'adresse email est requise"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide"
      isValid = false
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({ ...errors, general: "" })

    try {
      // In a real application, this would be an API call to your authentication endpoint
      // For demo purposes, we'll simulate a successful login with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo, we'll accept any email with a password of "password123"
      if (formData.password === "password123") {
        // Store authentication token (in a real app, this would come from your API)
        if (formData.rememberMe) {
          localStorage.setItem("storei-auth-token", "demo-token-12345")
        } else {
          sessionStorage.setItem("storei-auth-token", "demo-token-12345")
        }

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setErrors({
          ...errors,
          general: "Email ou mot de passe incorrect",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({
        ...errors,
        general: "Une erreur est survenue. Veuillez réessayer.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const inputVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormError message={errors.general} />

      <motion.div
        initial="initial"
        animate="animate"
        variants={inputVariants}
        transition={{ delay: 0.1 }}
        className="group"
      >
        <FormInput
          id="email"
          label="Adresse Email"
          type="email"
          placeholder="vous@exemple.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoading}
          className="bg-[#1E293B]/50 border-[#334155] text-white placeholder:text-blue-200/30 focus:border-blue-400 focus:ring-blue-400/20"
          labelClassName="text-blue-100"
        />
      </motion.div>

      <motion.div initial="initial" animate="animate" variants={inputVariants} transition={{ delay: 0.2 }}>
        <PasswordInput
          id="password"
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
          className="bg-[#1E293B]/50 border-[#334155] text-white placeholder:text-blue-200/30 focus:border-blue-400 focus:ring-blue-400/20"
          labelClassName="text-blue-100"
          forgotPasswordLink={
            <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Mot de passe oublié ?
            </Link>
          }
        />
      </motion.div>

      <motion.div initial="initial" animate="animate" variants={inputVariants} transition={{ delay: 0.3 }}>
        <FormCheckbox
          id="rememberMe"
          label="Se souvenir de moi"
          checked={formData.rememberMe}
          onCheckedChange={(checked) => {
            setFormData({
              ...formData,
              rememberMe: checked,
            })
          }}
          disabled={isLoading}
          className="text-blue-100"
        />
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={inputVariants}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
        <Button
          type="submit"
          className="relative w-full h-12 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 text-white rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 border border-blue-500/50 overflow-hidden group-hover:animate-pulse"
          disabled={isLoading}
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Connexion en cours...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Se connecter</span>
              <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={inputVariants}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-blue-100/70">
          Vous n'avez pas de compte ?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            S'inscrire
          </Link>
        </p>
      </motion.div>
    </form>
  )
}

// Add these animation keyframes at the end of the component, before the final closing bracket
const shimmerAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

const gradientAnimation = keyframes`
  0% { backgroundPosition: 0% 50%; }
  50% { backgroundPosition: 100% 50%; }
  100% { backgroundPosition: 0% 50%; }
`
