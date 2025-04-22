"use client"

import { useEffect, useState, useRef } from "react"
import type React from "react"
import Link from "next/link"
import { Box } from "lucide-react"
import { motion } from "framer-motion"

interface FuturisticAuthLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function FuturisticAuthLayout({ children, title, description }: FuturisticAuthLayoutProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#0A0F1E] via-[#121A38] to-[#0A0F1E] flex flex-col relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full filter blur-[150px] animate-pulse"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 bg-indigo-600 rounded-full filter blur-[120px] animate-pulse"
            style={{ animationDuration: "10s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-1/4 h-1/4 bg-purple-500 rounded-full filter blur-[100px] animate-pulse"
            style={{ animationDuration: "12s" }}
          ></div>
        </div>
      </div>

      {/* Cursor glow effect */}
      <div
        className="pointer-events-none absolute bg-blue-500 opacity-20 rounded-full filter blur-[80px] w-[300px] h-[300px] transition-transform duration-200"
        style={{
          left: `${mousePosition.x - 150}px`,
          top: `${mousePosition.y - 150}px`,
          transform: `translate(${(mousePosition.x - 150) * 0.05}px, ${(mousePosition.y - 150) * 0.05}px)`,
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="w-full py-6 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link href="/landing" className="flex items-center gap-2 group">
            <div className="relative">
              <Box className="h-7 w-7 text-white z-10 relative" />
              <div className="absolute inset-0 bg-blue-500 rounded-md filter blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">Storei</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="relative bg-[#0F172A]/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#1E293B] shadow-2xl">
            {/* Glow effect on card */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-50"></div>

            <div className="relative p-8 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 text-center"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                  {title}
                </h1>
                {description && <p className="text-blue-100/70">{description}</p>}
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
                {children}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-sm text-blue-100/50 relative z-10 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} Storei. All rights reserved.</p>
      </footer>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
