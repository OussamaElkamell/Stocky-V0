"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Package, Truck, Tag, CheckCircle, XCircle, AlertCircle, PlusCircle, Edit, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SafeImage } from "@/components/ui/safe-image"

// Importer directement les données JSON
import deliveryProvidersData from "@/data/tunisian-delivery-providers.json"

// Type pour les fournisseurs de livraison
interface ContactInfo {
  phone: string
  email: string
  website: string
}

interface DeliveryProvider {
  id: string
  name: string
  logo: string
  description: string
  deliveryTime: string
  trackingAvailable: boolean
  coverage: string
  priceRange: string
  contactInfo: ContactInfo
  integrated?: boolean
  apiKey?: string
  apiSecret?: string
  apiEndpoint?: string
}

// Composant pour afficher une carte de fournisseur de livraison
function DeliveryProviderCard({
  provider,
  onIntegrate,
}: {
  provider: DeliveryProvider
  onIntegrate: (provider: DeliveryProvider) => void
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-md bg-gray-100">
              <SafeImage
                src={provider.logo}
                alt={`Logo de ${provider.name}`}
                fill
                className="object-contain"
                fallback={<span className="text-lg font-bold text-gray-500">{provider.name.charAt(0)}</span>}
              />
            </div>
            <div>
              <CardTitle className="text-lg">{provider.name}</CardTitle>
              <CardDescription className="text-xs line-clamp-1">{provider.description}</CardDescription>
            </div>
          </div>
          <Badge variant={provider.integrated ? "default" : "outline"} className="ml-auto">
            {provider.integrated ? "Intégré" : "À intégrer"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Add Order
            </span>
            {provider.integrated ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-gray-300" />
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Tracking
            </span>
            {provider.integrated ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-gray-300" />
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Labels
            </span>
            {provider.integrated ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-gray-300" />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={provider.integrated ? "outline" : "default"}
          className="w-full"
          onClick={() => onIntegrate(provider)}
        >
          {provider.integrated ? (
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
  provider,
  onSave,
  onCancel,
}: {
  provider: DeliveryProvider
  onSave: (provider: DeliveryProvider, formData: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    apiKey: provider.apiKey || "",
    apiSecret: provider.apiSecret || "",
    apiEndpoint: provider.apiEndpoint || "",
    enableAddOrder: true,
    enableTracking: true,
    enableLabels: true,
  })
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleTestConnection = () => {
    setTestStatus("testing")
    // Simuler un test de connexion
    setTimeout(() => {
      if (formData.apiKey && formData.apiSecret) {
        setTestStatus("success")
      } else {
        setTestStatus("error")
      }
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-md bg-gray-100">
          <SafeImage
            src={provider.logo}
            alt={`Logo de ${provider.name}`}
            fill
            className="object-contain"
            fallback={<span className="text-xl font-bold text-gray-500">{provider.name.charAt(0)}</span>}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{provider.name}</h3>
          <p className="text-sm text-muted-foreground">{provider.description}</p>
        </div>
      </div>

      <Tabs defaultValue="credentials">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="credentials">Identifiants API</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
        </TabsList>

        <TabsContent value="credentials" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Clé API</Label>
            <Input
              id="apiKey"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              placeholder="Entrez votre clé API"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiSecret">Secret API</Label>
            <Input
              id="apiSecret"
              name="apiSecret"
              type="password"
              value={formData.apiSecret}
              onChange={handleChange}
              placeholder="Entrez votre secret API"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiEndpoint">Point de terminaison API (optionnel)</Label>
            <Input
              id="apiEndpoint"
              name="apiEndpoint"
              value={formData.apiEndpoint}
              onChange={handleChange}
              placeholder="https://api.example.com/v1"
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" onClick={handleTestConnection} disabled={testStatus === "testing"}>
              {testStatus === "testing" ? "Test en cours..." : "Tester la connexion"}
            </Button>

            {testStatus === "success" && (
              <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
                <Check className="h-4 w-4 text-green-500" />
                <AlertTitle>Connexion réussie</AlertTitle>
                <AlertDescription>La connexion à l'API a été établie avec succès.</AlertDescription>
              </Alert>
            )}

            {testStatus === "error" && (
              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertTitle>Échec de la connexion</AlertTitle>
                <AlertDescription>Impossible de se connecter à l'API. Vérifiez vos identifiants.</AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>

        <TabsContent value="options" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableAddOrder">Ajout de commandes</Label>
                <p className="text-sm text-muted-foreground">
                  Permet d'ajouter automatiquement des commandes au transporteur
                </p>
              </div>
              <Switch
                id="enableAddOrder"
                name="enableAddOrder"
                checked={formData.enableAddOrder}
                onCheckedChange={(checked) => setFormData({ ...formData, enableAddOrder: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableTracking">Suivi des colis</Label>
                <p className="text-sm text-muted-foreground">Permet de suivre l'état des colis en temps réel</p>
              </div>
              <Switch
                id="enableTracking"
                name="enableTracking"
                checked={formData.enableTracking}
                onCheckedChange={(checked) => setFormData({ ...formData, enableTracking: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enableLabels">Génération d'étiquettes</Label>
                <p className="text-sm text-muted-foreground">Permet de générer des étiquettes d'expédition</p>
              </div>
              <Switch
                id="enableLabels"
                name="enableLabels"
                checked={formData.enableLabels}
                onCheckedChange={(checked) => setFormData({ ...formData, enableLabels: checked })}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSave(provider, formData)}>Sauvegarder</Button>
      </div>
    </div>
  )
}

export default function DeliveryIntegrationPage() {
  const [deliveryProviders, setDeliveryProviders] = useState<DeliveryProvider[]>([])
  const [selectedProvider, setSelectedProvider] = useState<DeliveryProvider | null>(null)
  const [isIntegrationOpen, setIsIntegrationOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Charger les données des fournisseurs de livraison
  useEffect(() => {
    try {
      // Utiliser directement les données importées au lieu de faire un fetch
      const providers = deliveryProvidersData.map((provider: DeliveryProvider) => ({
        ...provider,
        integrated: Math.random() > 0.7, // Environ 30% des fournisseurs sont intégrés
        apiKey: provider.integrated ? "api_key_example" : "",
        apiSecret: provider.integrated ? "api_secret_example" : "",
        apiEndpoint: provider.integrated ? "https://api.example.com/v1" : "",
      }))

      setDeliveryProviders(providers)
      setIsLoading(false)
    } catch (err) {
      console.error("Erreur lors du chargement des fournisseurs:", err)
      setError("Impossible de charger les fournisseurs de livraison. Veuillez réessayer plus tard.")
      setIsLoading(false)
    }
  }, [])

  // Filtrer les fournisseurs en fonction de la recherche
  const filteredProviders = deliveryProviders.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Gérer l'intégration d'un fournisseur
  const handleIntegrate = (provider: DeliveryProvider) => {
    setSelectedProvider(provider)
    setIsIntegrationOpen(true)
  }

  // Sauvegarder l'intégration
  const handleSaveIntegration = (provider: DeliveryProvider, formData: any) => {
    // Mettre à jour le fournisseur avec les nouvelles données
    const updatedProviders = deliveryProviders.map((p) => {
      if (p.id === provider.id) {
        return {
          ...p,
          integrated: true,
          apiKey: formData.apiKey,
          apiSecret: formData.apiSecret,
          apiEndpoint: formData.apiEndpoint,
        }
      }
      return p
    })

    setDeliveryProviders(updatedProviders)
    setIsIntegrationOpen(false)
    setSelectedProvider(null)
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
            {[...Array(6)].map((_, i) => (
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
        <h1 className="text-3xl font-bold">Intégration des transporteurs</h1>
        <p className="text-muted-foreground">
          Connectez votre compte Storei aux différentes sociétés de livraison en Tunisie pour automatiser vos
          expéditions.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-auto">
          <Input
            placeholder="Rechercher un transporteur..."
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
                Pour intégrer un transporteur, vous aurez besoin de vos identifiants API. Contactez le service client du
                transporteur si vous n'avez pas ces informations.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <DeliveryProviderCard key={provider.id} provider={provider} onIntegrate={handleIntegrate} />
        ))}
      </div>

      {filteredProviders.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Aucun transporteur trouvé</h3>
          <p className="text-muted-foreground">Aucun transporteur ne correspond à votre recherche.</p>
        </div>
      )}

      {selectedProvider && (
        <Sheet open={isIntegrationOpen} onOpenChange={setIsIntegrationOpen}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Intégration de {selectedProvider.name}</SheetTitle>
              <SheetDescription>
                Configurez l'intégration avec {selectedProvider.name} en fournissant vos identifiants API.
              </SheetDescription>
            </SheetHeader>

            <div className="py-6">
              <IntegrationForm
                provider={selectedProvider}
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
