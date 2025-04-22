"use client"

import { AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FormErrorProps {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-start gap-2"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
