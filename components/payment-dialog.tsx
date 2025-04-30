"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  totalAmount: number
  onPaymentComplete: () => void
}

export function PaymentDialog({ open, onOpenChange, totalAmount, onPaymentComplete }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [amountReceived, setAmountReceived] = useState<string>(totalAmount.toString())
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentComplete()
      onOpenChange(false)
    }, 1500)
  }

  const calculateChange = () => {
    const received = Number.parseFloat(amountReceived) || 0
    return Math.max(0, received - totalAmount).toFixed(2)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Paiement</DialogTitle>
          <DialogDescription>Complétez le paiement pour finaliser la transaction.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center font-medium">
            <span>Total à payer:</span>
            <span className="text-xl">{totalAmount.toFixed(2)} TND</span>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Méthode de paiement</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Carte bancaire</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Espèces</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobile" id="mobile" />
                <Label htmlFor="mobile">Paiement mobile</Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "cash" && (
            <div className="space-y-2">
              <Label htmlFor="amount-received">Montant reçu</Label>
              <Input
                id="amount-received"
                type="number"
                value={amountReceived}
                onChange={(e) => setAmountReceived(e.target.value)}
              />
              <div className="flex justify-between text-sm">
                <span>Monnaie à rendre:</span>
                <span className="font-medium">{calculateChange()} TND</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Traitement..." : "Confirmer le paiement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
