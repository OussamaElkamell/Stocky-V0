"use client"

import { useState, useEffect } from "react"
import { BarChart, AlertCircle, PlusCircle, Edit, Check, X, Globe, Facebook, Eye, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Importer directement les données JSON
import marketingIntegrationsData from "@/data/web-marketing-integrations.json"

// Type pour les intégrations marketing
interface MarketingIntegration {
  id: string
  name: string
  description: string
  integrated: boolean
  icon: string
  settings: {
    fields?: string[]
  } | null
}

// Fonction pour obtenir l'icône appropriée
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "globe":
      return <Globe className="h-6 w-6" />
    case "facebook":
      return <Facebook className="h-6 w-6" />
    case "bar-chart":
      return <BarChart className="h-6 w-6" />
    case "eye":
      return <Eye className="h-6 w-6" />
    case "shield":
      return <Shield className="h-6 w-6" />
    default:
      return <Globe className="h-6 w-6" />
  }
}

// Composant pour afficher une carte d'intégration marketing
function MarketingIntegrationCard({
  integration,
  onIntegrate,
}: {
  integration: MarketingIntegration
  onIntegrate: (integration: MarketingIntegration) => void
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-slate-100 text-slate-700">
              {getIconComponent(integration.icon)}
            </div>
            <div>
              <CardTitle className="text-lg">{integration.name}</CardTitle>
              <CardDescription className="text-xs line-clamp-1">{integration.description}</CardDescription>
            </div>
          </div>
          <Badge variant={integration.integrated ? "default" : "outline"} className="ml-auto">
            {integration.integrated ? "Intégré" : "À intégrer"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 h-[4.5rem]">{integration.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant={integration.integrated ? "outline" : "default"}
          className="w-full"
          onClick={() => onIntegrate(integration)}
        >
          {integration.integrated ? (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Intégrer
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Composant pour le formulaire d'intégration
function IntegrationForm({
  integration,
  onSave,
  onCancel,
}: {
  integration: MarketingIntegration
  onSave: (integration: MarketingIntegration, formData: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle")

  // Initialiser les champs du formulaire
  useEffect(() => {
    if (integration.settings?.fields) {
      const initialData: Record<string, string> = {}
      integration.settings.fields.forEach((field) => {
        initialData[field] = ""
      })
      setFormData(initialData)
    }
  }, [integration])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTestConnection = () => {
    setTestStatus("testing")
    // Simuler un test de connexion
    setTimeout(() => {
      // Vérifier si tous les champs sont remplis
      const allFieldsFilled = integration.settings?.fields?.every((field) => formData[field]?.trim() !== "") ?? true

      if (allFieldsFilled) {
        setTestStatus("success")
      } else {
        setTestStatus("error")
      }
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-100 text-slate-700">
          {getIconComponent(integration.icon)}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{integration.name}</h3>
          <p className="text-sm text-muted-foreground">{integration.description}</p>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        {integration.settings?.fields?.map((field, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`field-${index}`}>{field}</Label>
            {field.toLowerCase().includes("ips") || field.toLowerCase().includes("separated") ? (
              <Textarea
                id={`field-${index}`}
                value={formData[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={`Entrez ${field.toLowerCase()}`}
                rows={4}
              />
            ) : (
              <Input
                id={`field-${index}`}
                value={formData[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={`Entrez ${field.toLowerCase()}`}
                type={
                  field.toLowerCase().includes("token") || field.toLowerCase().includes("key") ? "password" : "text"
                }
              />
            )}
          </div>
        ))}

        {integration.settings?.fields && (
          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" onClick={handleTestConnection} disabled={testStatus === "testing"}>
              {testStatus === "testing" ? "Test en cours..." : "Tester la connexion"}
            </Button>

            {testStatus === "success" && (
              <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                <Check className="h-4 w-4 text-green-500" />
                <AlertTitle>Connexion réussie</AlertTitle>
                <AlertDescription>L'intégration a été testée avec succès.</AlertDescription>
              </Alert>
            )}

            {testStatus === "error" && (
              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertTitle>Échec de la connexion</AlertTitle>
                <AlertDescription>Impossible de se connecter. Vérifiez vos identifiants.</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSave(integration, formData)}>Sauvegarder</Button>
      </div>
    </div>
  )
}

export default function MarketingIntegrationPage() {
  const [marketingIntegrations, setMarketingIntegrations] = useState<MarketingIntegration[]>([])
  const [selectedIntegration, setSelectedIntegration] = useState<MarketingIntegration | null>(null)
  const [isIntegrationOpen, setIsIntegrationOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Charger les données des intégrations marketing
  useEffect(() => {
    try {
      // Utiliser directement les données importées
      setMarketingIntegrations(marketingIntegrationsData as MarketingIntegration[])
      setIsLoading(false)
    } catch (err) {
      console.error("Erreur lors du chargement des intégrations:", err)
      setError("Impossible de charger les intégrations marketing. Veuillez réessayer plus tard.")
      setIsLoading(false)
    }
  }, [])

  // Filtrer les intégrations en fonction de la recherche
  const filteredIntegrations = marketingIntegrations.filter(
    (integration) =>
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Gérer l'intégration
  const handleIntegrate = (integration: MarketingIntegration) => {
    setSelectedIntegration(integration)
    setIsIntegrationOpen(true)
  }

  // Sauvegarder l'intégration
  const handleSaveIntegration = (integration: MarketingIntegration, formData: any) => {
    // Mettre à jour l'intégration avec les nouvelles données
    const updatedIntegrations = marketingIntegrations.map((i) => {
      if (i.id === integration.id) {
        return {
          ...i,
          integrated: true,
        }
      }
      return i
    })

    setMarketingIntegrations(updatedIntegrations)
    setIsIntegrationOpen(false)
    setSelectedIntegration(null)
  }

  // Afficher un message d'erreur si le chargement a échoué
  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  // Afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Intégrations Marketing</h1>
        <p className="text-muted-foreground">
          Connectez votre boutique Storei aux outils de marketing et d'analyse pour optimiser votre présence en ligne.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-auto">
          <Input
            placeholder="Rechercher une intégration..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px]"
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="gap-2">
                <AlertCircle className="h-4 w-4" />
                Besoin d'aide?
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>
                Pour intégrer un outil marketing, vous aurez besoin des identifiants API ou des clés spécifiques à
                chaque service.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <MarketingIntegrationCard key={integration.id} integration={integration} onIntegrate={handleIntegrate} />
        ))}
      </div>

      {filteredIntegrations.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Aucune intégration trouvée</h3>
          <p className="text-muted-foreground">Aucune intégration ne correspond à votre recherche.</p>
        </div>
      )}

      {selectedIntegration && (
        <Sheet open={isIntegrationOpen} onOpenChange={setIsIntegrationOpen}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Intégration de {selectedIntegration.name}</SheetTitle>
              <SheetDescription>
                Configurez l'intégration avec {selectedIntegration.name} en fournissant les informations nécessaires.
              </SheetDescription>
            </SheetHeader>

            <div className="py-6">
              <IntegrationForm
                integration={selectedIntegration}
                onSave={handleSaveIntegration}
                onCancel={() => setIsIntegrationOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
