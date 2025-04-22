"use client"

import type React from "react"

import { useState } from "react"
import { CheckIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

type Facet = {
  id: string
  name: string
  options: {
    id: string
    name: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

const facets: Facet[] = [
  {
    id: "paiement",
    name: "Paiement",
    options: [
      { id: "paye", name: "Payé" },
      { id: "en-attente", name: "En attente" },
      { id: "rembourse", name: "Remboursé" },
    ],
  },
  {
    id: "methode-paiement",
    name: "Méthode de paiement",
    options: [
      { id: "carte", name: "Carte bancaire" },
      { id: "paypal", name: "PayPal" },
      { id: "virement", name: "Virement bancaire" },
      { id: "especes", name: "Espèces" },
    ],
  },
  {
    id: "canal",
    name: "Canal de vente",
    options: [
      { id: "boutique", name: "Boutique physique" },
      { id: "site-web", name: "Site web" },
      { id: "marketplace", name: "Marketplace" },
      { id: "telephone", name: "Téléphone" },
    ],
  },
]

export function CommandesFilters() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})

  const selectedFacetOptionCount = Object.values(selectedOptions).reduce((count, options) => count + options.length, 0)

  function toggleOption(facetId: string, optionId: string) {
    const facetOptions = selectedOptions[facetId] || []
    setSelectedOptions({
      ...selectedOptions,
      [facetId]: facetOptions.includes(optionId)
        ? facetOptions.filter((id) => id !== optionId)
        : [...facetOptions, optionId],
    })
  }

  function clearOptions() {
    setSelectedOptions({})
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusIcon className="mr-2 h-3.5 w-3.5" />
            Filtres
            {selectedFacetOptionCount > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {selectedFacetOptionCount}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedFacetOptionCount > 2 ? (
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                      {selectedFacetOptionCount} sélectionnés
                    </Badge>
                  ) : (
                    Object.entries(selectedOptions).map(([facetId, options]) =>
                      options.map((optionId) => {
                        const facet = facets.find((f) => f.id === facetId)
                        const option = facet?.options.find((o) => o.id === optionId)
                        return (
                          <Badge
                            variant="secondary"
                            key={`${facetId}-${optionId}`}
                            className="rounded-sm px-1 font-normal"
                          >
                            {option?.name}
                          </Badge>
                        )
                      }),
                    )
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Rechercher..." />
            <CommandList>
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
              {facets.map((facet) => (
                <CommandGroup key={facet.id} heading={facet.name}>
                  {facet.options.map((option) => {
                    const isSelected = (selectedOptions[facet.id] || []).includes(option.id)
                    return (
                      <CommandItem key={option.id} onSelect={() => toggleOption(facet.id, option.id)}>
                        <div
                          className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                            isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                          }`}
                        >
                          <CheckIcon className="h-3 w-3" />
                        </div>
                        <span>{option.name}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ))}
              {selectedFacetOptionCount > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem onSelect={clearOptions} className="justify-center text-center">
                      Effacer les filtres
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedFacetOptionCount > 0 && (
        <Button variant="ghost" size="sm" className="h-8" onClick={clearOptions}>
          Réinitialiser
          <XIcon className="ml-2 h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  )
}

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
