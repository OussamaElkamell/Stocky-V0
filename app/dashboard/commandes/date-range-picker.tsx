"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { fr } from "date-fns/locale"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DateRangePicker({
  className,
  value,
  onChange,
}: {
  className?: string
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[240px] justify-start text-left font-normal", !value && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "d LLL y", { locale: fr })} - {format(value.to, "d LLL y", { locale: fr })}
                </>
              ) : (
                format(value.from, "d LLL y", { locale: fr })
              )
            ) : (
              <span>Sélectionner une période</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}