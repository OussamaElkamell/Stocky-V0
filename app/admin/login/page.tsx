"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Shield, Mail, Lock, AlertCircle, ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginAdmin, isAdminLoggedIn } from "@/lib/auth"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)

  // Récupérer l'URL de redirection si elle existe
  const redirectUrl =  "/admin/overview"

  // Vérifier si l'utilisateur est déjà connecté lors du chargement initial
  // useEffect(() => {
  //   const checkAuth = () => {
  //     try {
  //       if (isAdminLoggedIn()) {
  //         router.push(redirectUrl)
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors de la vérification de l'authentification:", error)
  //     } finally {
  //       setIsCheckingAuth(false)
  //     }
  //   }

  //   checkAuth()
  // }, [router, redirectUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const success = await loginAdmin(username, password, rememberMe)

      if (success) {
        // Redirection vers le dashboard admin ou l'URL demandée
        router.push(redirectUrl)
      } else {
        setError("Identifiants incorrects ou accès non autorisé")
      }
    } catch (err) {
      console.error("Erreur de connexion:", err)
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Afficher un indicateur de chargement pendant la vérification d'authentification
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-slate-300">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-600">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>

        <Card className="border-slate-800 bg-slate-950 text-slate-100">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Administration Storei</CardTitle>
            <CardDescription className="text-slate-400">
              Connectez-vous pour accéder au panneau d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-200">
                  Identifiant
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="adminstorei"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                      setError(null)
                    }}
                    className="pl-10 bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-200">
                    Mot de passe
                  </Label>
                  <Link href="#" className="text-xs text-slate-400 hover:text-slate-300">
                    Mot de passe oublié?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError(null)
                    }}
                    className="pl-10 bg-slate-900 border-slate-800 text-slate-100"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-slate-700 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-sm text-slate-300">
                  Rester connecté
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Connexion en cours...</span>
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-slate-400 hover:text-slate-300" asChild>
              <Link href="/dashboard" className="flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour au tableau de bord
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
