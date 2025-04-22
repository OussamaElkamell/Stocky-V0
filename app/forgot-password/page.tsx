"use client"

import { useState } from "react"
import Link from "next/link"
import { Box, ArrowLeft, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Veuillez entrer votre adresse email")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer une adresse email valide")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // In a real application, this would be an API call to your password reset endpoint
      // For demo purposes, we'll simulate a successful submission with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Set submitted state to show success message
      setIsSubmitted(true)
    } catch (error) {
      console.error("Password reset error:", error)
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Box className="h-6 w-6 text-[#1C64F2]" />
            <span className="text-xl font-bold text-[#153E75]">Storei</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <Link href="/login" className="inline-flex items-center text-[#5F6C7B] hover:text-[#1C64F2] mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la connexion
            </Link>

            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-[#153E75]">Email envoyé</h1>
                <p className="text-[#5F6C7B]">
                  Si un compte existe avec l'adresse {email}, vous recevrez un email avec les instructions pour
                  réinitialiser votre mot de passe.
                </p>
                <p className="text-[#5F6C7B] text-sm">
                  N'avez-vous pas reçu l'email ? Vérifiez votre dossier spam ou{" "}
                  <button
                    className="text-[#1C64F2] hover:underline"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsLoading(true)
                      setTimeout(() => {
                        setIsLoading(false)
                      }, 1000)
                    }}
                    disabled={isLoading}
                  >
                    cliquez ici pour renvoyer
                  </button>
                  .
                </p>
                <Button
                  className="mt-4 w-full bg-[#1C64F2] hover:bg-[#1C64F2]/90"
                  onClick={() => (window.location.href = "/login")}
                >
                  Retour à la connexion
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#153E75] mb-2">Mot de passe oublié ?</h1>
                  <p className="text-[#5F6C7B]">
                    Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#153E75]">
                      Adresse Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="vous@exemple.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError("")
                      }}
                      className="bg-white border border-gray-200 rounded-xl p-3 h-12 shadow-sm focus:ring-2 focus:ring-[#1C64F2]/20 focus:border-[#1C64F2]"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#1C64F2] hover:bg-[#1C64F2]/90 text-white rounded-xl flex items-center justify-center gap-2 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Envoi en cours..." : "Envoyer les instructions"}
                    {!isLoading && <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-sm text-[#5F6C7B] border-t bg-white">
        <p>© {new Date().getFullYear()} Storei. All rights reserved.</p>
      </footer>
    </div>
  )
}
