"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Box, CheckCircle, Globe, BarChart3, ShoppingCart, QrCode, ImageIcon, Lock, Users, MapPin, Truck, Gift, Smartphone, ChevronRight, Menu, X, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("create")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  // Refs for sections to animate
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const templatesRef = useRef(null)
  const pricingRef = useRef(null)
  const testimonialsRef = useRef(null)
  const particlesRef = useRef(null)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle mouse movement for parallax effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Animate cursor position
  useEffect(() => {
    const animateCursor = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }))
      requestAnimationFrame(animateCursor)
    }

    const animationFrame = requestAnimationFrame(animateCursor)
    return () => cancelAnimationFrame(animationFrame)
  }, [mousePosition])

  // Animate particles
  useEffect(() => {
    if (!particlesRef.current) return

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

  return (
    <div
      className={`flex min-h-screen flex-col bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Particle background */}
      <canvas ref={particlesRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"></canvas>

      {/* Cursor glow effect */}
      <div
        className="fixed w-[300px] h-[300px] rounded-full bg-[#1C64F2] opacity-10 pointer-events-none z-0 blur-3xl"
        style={{
          left: `${cursorPosition.x - 150}px`,
          top: `${cursorPosition.y - 150}px`,
          transition: "transform 0.05s ease-out",
        }}
      ></div>

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
            <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-white relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"></span>
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
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10">
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col space-y-4">
                <Link href="/features" className="text-sm font-medium text-white/80 hover:text-white">
                  Features
                </Link>
                <Link href="/how-it-works" className="text-sm font-medium text-white/80 hover:text-white">
                  How It Works
                </Link>
                <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-white">
                  Pricing
                </Link>
              </nav>
              <div className="flex gap-4">
                <Link href="/dashboard" className="flex-1">
                  <Button
                    variant="outline"
                    className="border-blue-500/50 text-white w-full hover:border-blue-500 hover:bg-blue-500/10"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`container py-24 md:py-32 space-y-8 transition-all duration-1000 relative z-10 ${
          isInViewport(heroRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Animated background elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-5xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" style={getParallaxStyle(80)}>
            <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 backdrop-blur-sm">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                No-code store platform
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Build Smart Stores. Manage Smarter.
            </h1>
            <p className="text-xl text-blue-100/80">
              Storei helps you create your online store, manage inventory, track deliveries, and boost sales — no code
              needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white group transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#templates">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-500/50 text-white hover:border-blue-500 hover:bg-blue-500/10 backdrop-blur-sm"
                >
                  See Templates
                </Button>
              </Link>
            </div>
          </div>
          <div
            className="relative rounded-xl border border-white/10 bg-black/20 shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm"
            style={getParallaxStyle(40)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50"></div>
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Storei Dashboard Preview"
              className="w-full h-auto object-cover relative z-10"
            />
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className={`container py-24 space-y-16 transition-all duration-1000 relative z-10 ${
          isInViewport(featuresRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center space-y-4">
          <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 backdrop-blur-sm">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              All-in-one platform
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Everything you need to succeed
          </h2>
          <p className="max-w-[700px] mx-auto text-blue-100/80">
            Storei combines powerful tools to help you build and manage your business efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            {
              icon: <Globe className="text-blue-400" />,
              title: "No-code store builder",
              description: "Create beautiful online stores without writing a single line of code.",
            },
            {
              icon: <Box className="text-blue-400" />,
              title: "Real-time inventory tracking",
              description: "Keep track of your stock levels across all channels in real-time.",
            },
            {
              icon: <Smartphone className="text-blue-400" />,
              title: "Offline mode with auto sync",
              description: "Continue working without internet and sync automatically when back online.",
            },
            {
              icon: <QrCode className="text-blue-400" />,
              title: "Barcode/QR product scan",
              description: "Quickly add and manage products by scanning barcodes or QR codes.",
            },
            {
              icon: <ImageIcon className="text-blue-400" />,
              title: "Image recognition",
              description: "Automatically identify products using advanced image recognition.",
            },
            {
              icon: <Lock className="text-blue-400" />,
              title: "Private catalog mode",
              description: "Create exclusive catalogs for specific customer segments.",
            },
            {
              icon: <Users className="text-blue-400" />,
              title: "Client space (B2B/B2C)",
              description: "Dedicated portals for both business and consumer customers.",
            },
            {
              icon: <MapPin className="text-blue-400" />,
              title: "RFID-based stock geolocation",
              description: "Locate your inventory precisely with RFID technology.",
            },
            {
              icon: <Truck className="text-blue-400" />,
              title: "Delivery tracking",
              description: "Monitor shipments and provide customers with real-time updates.",
            },
            {
              icon: <ShoppingCart className="text-blue-400" />,
              title: "POS system with ticket printing",
              description: "Complete point-of-sale system for in-person transactions.",
            },
            {
              icon: <Gift className="text-blue-400" />,
              title: "Loyalty programs",
              description: "Create and manage customer loyalty programs to boost retention.",
            },
            {
              icon: <BarChart3 className="text-blue-400" />,
              title: "Mobile & web sync",
              description: "Seamless synchronization between mobile and web platforms.",
            },
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className={`py-24 transition-all duration-1000 relative z-10 ${
          isInViewport(howItWorksRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/40 backdrop-blur-sm"></div>
        <div className="container space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 backdrop-blur-sm">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Simple process
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              How Storei works
            </h2>
            <p className="max-w-[700px] mx-auto text-blue-100/80">
              Get your store up and running in just a few simple steps
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <StepCard
                number="1"
                title="Create store"
                description="Choose a template and customize your online store to match your brand."
                isActive={activeTab === "create"}
                onClick={() => setActiveTab("create")}
              />
              <StepCard
                number="2"
                title="Add products"
                description="Upload your products manually or import them in bulk from a spreadsheet."
                isActive={activeTab === "products"}
                onClick={() => setActiveTab("products")}
              />
              <StepCard
                number="3"
                title="Track stock"
                description="Monitor inventory levels and get alerts when items are running low."
                isActive={activeTab === "track"}
                onClick={() => setActiveTab("track")}
              />
              <StepCard
                number="4"
                title="Sell & ship"
                description="Process orders, print shipping labels, and track deliveries."
                isActive={activeTab === "sell"}
                onClick={() => setActiveTab("sell")}
              />
            </div>
          </div>

          <div className="mt-12 p-6 bg-black/30 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-500">
            {activeTab === "create" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Create your store in minutes</h3>
                  <p className="text-blue-100/80 mb-6">
                    Choose from dozens of professionally designed templates and customize them to match your brand. No
                    design or coding skills required.
                  </p>
                  <ul className="space-y-2">
                    {["Drag-and-drop builder", "Mobile-responsive designs", "Custom domains", "SEO optimization"].map(
                      (item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-blue-100/80">{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Store creation interface"
                    className="w-full h-auto relative z-10"
                  />
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Effortless product management</h3>
                  <p className="text-blue-100/80 mb-6">
                    Add products individually or import them in bulk. Use our barcode scanner or image recognition to
                    speed up the process.
                  </p>
                  <ul className="space-y-2">
                    {["Bulk import/export", "Barcode scanning", "Image recognition", "Variant management"].map(
                      (item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-blue-100/80">{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Product management interface"
                    className="w-full h-auto relative z-10"
                  />
                </div>
              </div>
            )}

            {activeTab === "track" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Smart inventory management</h3>
                  <p className="text-blue-100/80 mb-6">
                    Track stock levels across all sales channels. Set up automatic reordering and get alerts when
                    inventory runs low.
                  </p>
                  <ul className="space-y-2">
                    {["Real-time tracking", "Low stock alerts", "Automatic reordering", "RFID integration"].map(
                      (item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-blue-100/80">{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Inventory tracking interface"
                    className="w-full h-auto relative z-10"
                  />
                </div>
              </div>
            )}

            {activeTab === "sell" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white">Seamless selling and shipping</h3>
                  <p className="text-blue-100/80 mb-6">
                    Process orders from all channels in one place. Print shipping labels, track deliveries, and keep
                    customers informed.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Unified order management",
                      "Shipping label printing",
                      "Delivery tracking",
                      "Customer notifications",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-blue-100/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Order processing interface"
                    className="w-full h-auto relative z-10"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section
        id="templates"
        ref={templatesRef}
        className={`container py-24 space-y-16 transition-all duration-1000 relative z-10 ${
          isInViewport(templatesRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center space-y-4">
          <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 backdrop-blur-sm">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Ready to use
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Beautiful store templates
          </h2>
          <p className="max-w-[700px] mx-auto text-blue-100/80">
            Get started quickly with our professionally designed templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Fashion Boutique", category: "Fashion" },
            { name: "Tech Store", category: "Electronics" },
            { name: "Gourmet Market", category: "Food" },
            { name: "Wellness Shop", category: "Health & Beauty" },
          ].map((template, i) => (
            <TemplateCard
              key={i}
              name={template.name}
              category={template.category}
              image={`/placeholder.svg?height=400&width=300&text=${template.name}`}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-blue-500/50 text-white hover:border-blue-500 hover:bg-blue-500/10 backdrop-blur-sm group"
          >
            View all templates <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        ref={pricingRef}
        className={`py-24 transition-all duration-1000 relative z-10 ${
          isInViewport(pricingRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-blue-900/20 backdrop-blur-sm"></div>
        <div className="container space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 backdrop-blur-sm">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Flexible pricing
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Choose the right plan for your business
            </h2>
            <p className="max-w-[700px] mx-auto text-blue-100/80">Start for free and upgrade as your business grows</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Free"
              price="0.00"
              description="Perfect for getting started"
              features={["1 online store", "Up to 100 products", "Basic inventory tracking", "Standard support"]}
              buttonText="Get Started"
              buttonVariant="outline"
            />
            <PricingCard
              title="Pro"
              price="49.00"
              period="per month"
              description="For growing businesses"
              features={[
                "Everything in Free",
                "Unlimited products",
                "Advanced inventory tracking",
                "Barcode scanning",
                "RFID integration",
                "Priority support",
              ]}
              buttonText="Start Free Trial"
              buttonVariant="default"
              highlighted={true}
            />
            <PricingCard
              title="Business"
              price="149.00"
              period="per month"
              description="For established enterprises"
              features={[
                "Everything in Pro",
                "Multiple stores",
                "Advanced analytics",
                "API access",
                "Custom integrations",
                "Dedicated account manager",
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className={`container py-24 space-y-16 transition-all duration-1000 relative z-10 ${
          isInViewport(testimonialsRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center space-y-4">
          <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 backdrop-blur-sm">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Trusted by businesses
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            What our customers say
          </h2>
          <p className="max-w-[700px] mx-auto text-blue-100/80">Join thousands of businesses already using Storei</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="Storei has transformed how we manage our inventory. We've reduced stockouts by 85% and increased sales by 30%."
            author="Sarah Johnson"
            company="Fashion Forward"
            image="/placeholder.svg?height=80&width=80"
          />
          <TestimonialCard
            quote="The RFID integration is a game-changer. We can now locate any product in our warehouse in seconds."
            author="Michael Chen"
            company="Tech Innovations"
            image="/placeholder.svg?height=80&width=80"
          />
          <TestimonialCard
            quote="Setting up our online store was incredibly easy. We were up and running in less than a day."
            author="Emma Rodriguez"
            company="Gourmet Delights"
            image="/placeholder.svg?height=80&width=80"
          />
        </div>

        <div className="pt-16">
          <h3 className="text-center text-lg font-medium mb-8 text-white">Trusted by companies worldwide</h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-8 relative group">
                <img
                  src={`/placeholder.svg?key=v9amd&height=32&width=120&text=LOGO ${i}`}
                  alt={`Company logo ${i}`}
                  className="h-full w-auto filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute -inset-1 bg-blue-500/20 rounded-md blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-12 md:py-24">
        <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-blue-600 p-8 md:p-16 text-white transform transition-all duration-500 hover:scale-[1.01] hover:shadow-xl relative overflow-hidden group">
          {/* Animated background */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-90"></div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s linear infinite`,
                }}
              ></div>
            ))}
          </div>

          <div className="mx-auto max-w-2xl text-center space-y-8 relative z-10">
            <h2 className="text-3xl font-bold tracking-tight">Ready to grow your business?</h2>
            <p className="text-white/80">
              Join thousands of businesses already using Storei to build and manage their online stores.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-blue-600 hover:bg-white/90 group shadow-lg shadow-blue-500/20"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="container py-16">
        <div className="rounded-2xl bg-gradient-to-r from-yellow-500/10 to-yellow-300/10 p-8 border border-yellow-500/20 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-4">Special Launch Offer</h2>
              <p className="text-blue-100/80 mb-6">
                Sign up today and get 3 months of the Pro plan for the price of 1. Limited time offer for new customers.
              </p>
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-blue-900 hover:from-yellow-600 hover:to-yellow-400 group shadow-lg shadow-yellow-500/20">
                Claim Offer <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-yellow-500/20 rounded-full p-6 relative group">
                <div className="text-4xl font-bold text-white">67%</div>
                <div className="text-sm text-blue-100/80">SAVINGS</div>
                <div className="absolute -inset-1 bg-yellow-400/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 md:py-16 bg-black/30 backdrop-blur-sm">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="relative">
                  <Box className="h-6 w-6 text-blue-400 z-10 relative" />
                  <div className="absolute inset-0 bg-blue-400 blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Storei
                </span>
              </Link>
              <p className="text-sm text-blue-100/80 mb-4">Build and manage your online store with no code required.</p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <Link
                    key={social}
                    href={`#${social}`}
                    className="text-blue-100/80 hover:text-blue-400 transition-colors duration-300"
                  >
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-900/30 hover:bg-blue-900/50 transition-colors duration-300 backdrop-blur-sm">
                      <span className="sr-only">{social}</span>
                      {/* Placeholder for social icons */}
                      <div className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Integrations", "API"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-blue-100/80 hover:text-blue-400 transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                {["Documentation", "Guides", "Blog", "Support", "Community"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-blue-100/80 hover:text-blue-400 transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                {["About", "Careers", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-blue-100/80 hover:text-blue-400 transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-blue-100/60">
            © {new Date().getFullYear()} Storei. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Add keyframe animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes blob {
          0% {
            transform: scale(1) translate(0px, 0px);
          }
          33% {
            transform: scale(1.1) translate(30px, -50px);
          }
          66% {
            transform: scale(0.9) translate(-20px, 20px);
          }
          100% {
            transform: scale(1) translate(0px, 0px);
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  )
}

// Component for feature cards
function FeatureCard({ icon, title, description, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay * 1000)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [delay])

  return (
    <Card
      ref={cardRef}
      className={`h-full bg-black/30 border border-white/10 hover:border-blue-500/50 backdrop-blur-sm transition-all duration-500 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <CardContent className="p-6 space-y-4 relative overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div className="rounded-full bg-blue-500/20 w-12 h-12 flex items-center justify-center relative z-10">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white relative z-10">{title}</h3>
        <p className="text-sm text-blue-100/80 relative z-10">{description}</p>
      </CardContent>
    </Card>
  )
}

// Component for step cards
function StepCard({ number, title, description, isActive, onClick }) {
  return (
    <div
      className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
        isActive
          ? "bg-black/30 border border-blue-500/50 shadow-lg shadow-blue-500/20 scale-105 backdrop-blur-sm"
          : "bg-transparent hover:bg-black/20 border border-transparent hover:border-white/10"
      }`}
      onClick={onClick}
    >
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-500/30"
            : "bg-black/30 border border-white/20 text-white/80 backdrop-blur-sm"
        }`}
      >
        {number}
      </div>
      <div className="text-center pt-2 space-y-2">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-blue-100/80">{description}</p>
      </div>
    </div>
  )
}

// Component for template cards
function TemplateCard({ name, category, image }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg transition-all duration-300 group-hover:shadow-blue-500/20 bg-black/30 backdrop-blur-sm relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? "scale-110 filter brightness-50" : "scale-100"
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              variant="secondary"
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500 shadow-lg shadow-blue-500/30"
            >
              Preview Template
            </Button>
          </div>
        </div>
        <div className="p-4 relative z-10">
          <h3 className="font-medium text-white">{name}</h3>
          <p className="text-sm text-blue-100/80">{category}</p>
        </div>
      </div>
    </div>
  )
}

// Component for testimonial cards
function TestimonialCard({ quote, author, company, image }) {
  return (
    <Card className="h-full bg-black/30 border border-white/10 hover:border-blue-500/50 backdrop-blur-sm transition-all duration-300 group relative overflow-hidden">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <CardContent className="p-6 space-y-4 relative z-10">
        <p className="italic text-blue-100/80">"{quote}"</p>
        <div className="flex items-center gap-3">
          <div className="rounded-full overflow-hidden w-10 h-10 border border-white/20 group-hover:border-blue-500/50 transition-colors duration-300">
            <img src={image || "/placeholder.svg"} alt={author} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-semibold text-white">{author}</p>
            <p className="text-sm text-blue-100/80">{company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Component for pricing cards
function PricingCard({
  title,
  price,
  period = "",
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`relative bg-black/30 border transition-all duration-500 backdrop-blur-sm ${
        highlighted ? "border-blue-500/50 shadow-xl shadow-blue-500/20" : "border-white/10"
      } ${isHovered ? "transform -translate-y-2 shadow-2xl shadow-blue-500/30" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-medium py-1 px-3 rounded-full shadow-lg shadow-blue-500/30">
            Most Popular
          </div>
        </div>
      )}
      <CardContent className={`p-6 space-y-6 ${highlighted ? "pt-8" : ""} relative z-10`}>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-blue-100/80 text-sm mt-1">{description}</p>
        </div>
        <div>
          <span className="text-3xl font-bold text-white">${price}</span>
          {period && <span className="text-blue-100/80"> {period}</span>}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className={`h-4 w-4 text-green-400 flex-shrink-0 ${isHovered ? "animate-pulse" : ""}`} />
              <span className="text-sm text-blue-100/80">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={buttonVariant}
          className={`w-full ${
            buttonVariant === "outline"
              ? "border-blue-500/50 text-white hover:bg-blue-500/10"
              : "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-lg shadow-blue-500/20"
          }`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  )
}
