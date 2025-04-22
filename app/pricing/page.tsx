"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Box, CheckCircle, X, Send, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PricingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showCollaborationPanel, setShowCollaborationPanel] = useState(false)
  const [activeCollaborators, setActiveCollaborators] = useState([])
  const [showSeoPanel, setShowSeoPanel] = useState(false)
  const [seoScore, setSeoScore] = useState(75)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Refs for sections to animate
  const heroRef = useRef(null)
  const pricingTabsRef = useRef(null)
  const comparisonRef = useRef(null)
  const faqRef = useRef(null)
  const ctaRef = useRef(null)
  const particlesRef = useRef(null)

  // Handle scroll events
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrollY(window.scrollY)
      }

      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle mouse movement for parallax effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animate cursor position
  useEffect(() => {
    if (typeof window !== "undefined") {
      const animateCursor = () => {
        setCursorPosition((prev) => ({
          x: prev.x + (mousePosition.x - prev.x) * 0.1,
          y: prev.y + (mousePosition.y - prev.y) * 0.1,
        }))
        requestAnimationFrame(animateCursor)
      }

      const animationFrame = requestAnimationFrame(animateCursor)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [mousePosition])

  // Animate particles
  useEffect(() => {
    if (typeof window !== "undefined" && particlesRef.current) {
      const canvas = particlesRef.current
      const ctx = canvas.getContext("2d")
      const particles = []
      const particleCount = 50

      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(28, 100, 242, ${Math.random() * 0.5 + 0.1})`,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
        })
      }

      // Animate particles
      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw particles
        particles.forEach((particle) => {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()

          // Move particles
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= -1
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -1
          }

          // Connect particles that are close to each other
          particles.forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(28, 100, 242, ${0.2 - distance / 500})`
              ctx.lineWidth = 0.5
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
            }
          })
        })

        requestAnimationFrame(animateParticles)
      }

      const animationFrame = requestAnimationFrame(animateParticles)
      return () => {
        cancelAnimationFrame(animationFrame)
        window.removeEventListener("resize", resizeCanvas)
      }
    }
  }, [])

  // Set loaded state after initial render
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Check if element is in viewport
  const isInViewport = (ref) => {
    if (!ref.current) return false
    const rect = ref.current.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
  }

  // Calculate parallax transform based on mouse position
  const getParallaxStyle = (strength = 20) => {
    const x = (window.innerWidth / 2 - cursorPosition.x) / strength
    const y = (window.innerHeight / 2 - cursorPosition.y) / strength
    return { transform: `translate(${x}px, ${y}px)` }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  return (
    <div
      className={`flex min-h-screen flex-col bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Particle background */}
      {typeof window !== "undefined" && (
        <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"></canvas>
      )}

      {/* Cursor glow effect */}
      {typeof window !== "undefined" && (
        <div
          className="fixed w-[300px] h-[300px] rounded-full bg-[#1C64F2] opacity-10 pointer-events-none z-0 blur-3xl"
          style={{
            left: `${cursorPosition.x - 150}px`,
            top: `${cursorPosition.y - 150}px`,
            transition: "transform 0.05s ease-out",
          }}
        ></div>
      )}

      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-xl supports-[backdrop-filter]:bg-black/10 ${
          scrollY > 50 ? "bg-black/30 shadow-lg shadow-blue-500/10" : "bg-transparent"
        } transition-all duration-300 border-b border-white/10`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Box className="h-6 w-6 text-[#1C64F2] z-10 relative" />
              <div className="absolute inset-0 bg-[#1C64F2] blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Storei
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium text-white/80 hover:text-white relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-white/80 hover:text-white relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-white relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-blue-500/50 text-white hidden md:inline-flex hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white hidden md:inline-flex relative group overflow-hidden">
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 group-hover:opacity-0 transition-opacity duration-300"></span>
              </Button>
            </Link>
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Box className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md mx-auto">
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
