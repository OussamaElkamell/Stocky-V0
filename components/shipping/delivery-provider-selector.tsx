"use client"

import { useState } from "react"
import { Check, ChevronDown, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Types pour les fournisseurs de livraison
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
}

// Props pour le composant
interface DeliveryProviderSelectorProps {
  onSelect?: (provider: DeliveryProvider) => void
  defaultValue?: string
  disabled?: boolean
}

// Composant de sélection de fournisseur de livraison
export function DeliveryProviderSelector({ onSelect, defaultValue, disabled = false }: DeliveryProviderSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedProviderId, setSelectedProviderId] = useState<string | undefined>(defaultValue)
  const [providerDetailsOpen, setProviderDetailsOpen] = useState(false)
  const [selectedProviderDetails, setSelectedProviderDetails] = useState<DeliveryProvider | null>(null)

  // Importer les données des fournisseurs de livraison
  // Dans une application réelle, cela pourrait être chargé via une API
  const deliveryProviders: DeliveryProvider[] = require("@/data/tunisian-delivery-providers.json")

  // Trouver le fournisseur sélectionné
  const selectedProvider = deliveryProviders.find((provider) => provider.id === selectedProviderId)

  // Gérer la sélection d'un fournisseur
  const handleSelect = (providerId: string) => {
    const provider = deliveryProviders.find((p) => p.id === providerId)
    setSelectedProviderId(providerId)
    setOpen(false)

    if (provider && onSelect) {
      onSelect(provider)
    }
  }

  // Afficher les détails d'un fournisseur
  const showProviderDetails = (provider: DeliveryProvider) => {
    setSelectedProviderDetails(provider)
    setProviderDetailsOpen(true)
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex justify-between items-center">
        <label
          htmlFor="delivery-provider"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Fournisseur de livraison
        </label>
        {selectedProvider && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => showProviderDetails(selectedProvider)}
          >
            <Info className="h-3.5 w-3.5 mr-1" />
            Détails
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between", !selectedProvider && "text-muted-foreground")}
              disabled={disabled}
            >
              {selectedProvider ? (
                <div className="flex items-center gap-2">
                  <div className="relative h-5 w-5 overflow-hidden rounded">
                    <div className="bg-slate-100 absolute inset-0 flex items-center justify-center text-xs text-slate-500">
                      {selectedProvider.name.charAt(0)}
                    </div>
                    {/* Placeholder pour l'image - dans une application réelle, vous utiliseriez l'image réelle */}
                    {/* <Image src={selectedProvider.logo || "/placeholder.svg"} alt={selectedProvider.name} fill className="object-cover" /> */}
                  </div>
                  <span>{selectedProvider.name}</span>
                </div>
              ) : (
                "Sélectionner un fournisseur"
              )}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Rechercher un fournisseur..." />
              <CommandList>
                <CommandEmpty>Aucun fournisseur trouvé.</CommandEmpty>
                <CommandGroup>
                  {deliveryProviders.map((provider) => (
                    <CommandItem key={provider.id} value={provider.id} onSelect={() => handleSelect(provider.id)}>
                      <div className="flex items-center gap-2 flex-1">
                        <div className="relative h-5 w-5 overflow-hidden rounded">
                          <div className="bg-slate-100 absolute inset-0 flex items-center justify-center text-xs text-slate-500">
                            {provider.name.charAt(0)}
                          </div>
                          {/* Placeholder pour l'image */}
                          {/* <Image src={provider.logo || "/placeholder.svg"} alt={provider.name} fill className="object-cover" /> */}
                        </div>
                        <span>{provider.name}</span>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedProviderId === provider.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Dialog open={providerDetailsOpen} onOpenChange={setProviderDetailsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            {selectedProviderDetails && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <div className="relative h-6 w-6 overflow-hidden rounded">
                      <div className="bg-slate-100 absolute inset-0 flex items-center justify-center text-xs text-slate-500">
                        {selectedProviderDetails.name.charAt(0)}
                      </div>
                      {/* Placeholder pour l'image */}
                      {/* <Image src={selectedProviderDetails.logo || "/placeholder.svg"} alt={selectedProviderDetails.name} fill className="object-cover" /> */}
                    </div>
                    {selectedProviderDetails.name}
                  </DialogTitle>
                  <DialogDescription>{selectedProviderDetails.description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Délai de livraison</h4>
                      <p className="text-sm text-muted-foreground">{selectedProviderDetails.deliveryTime}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Suivi disponible</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedProviderDetails.trackingAvailable ? "Oui" : "Non"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Couverture</h4>
                      <p className="text-sm text-muted-foreground">{selectedProviderDetails.coverage}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Gamme de prix</h4>
                      <p className="text-sm text-muted-foreground">{selectedProviderDetails.priceRange}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Contact</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>Téléphone: {selectedProviderDetails.contactInfo.phone}</p>
                      <p>Email: {selectedProviderDetails.contactInfo.email}</p>
                      <p>Site web: {selectedProviderDetails.contactInfo.website}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
