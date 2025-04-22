"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Box, CheckCircle, X, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for sections to animate
  const heroRef = useRef(null)
  const pricingTabsRef = useRef(null)
  const comparisonRef = useRef(null)
  const faqRef = useRef(null)
  const ctaRef = useRef(null)
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
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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
                <Link href="/pricing" className="text-sm font-medium text-white hover:text-white">
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

        <div className="text-center space-y-6 max-w-3xl mx-auto" style={getParallaxStyle(80)}>
          <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 backdrop-blur-sm">
            <span className="flex items-center gap-1 justify-center">
              <Sparkles className="h-3 w-3" />
              Flexible pricing
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Choose the right plan for your business
          </h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
            Start for free and scale as your business grows. All plans include a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section
        ref={pricingTabsRef}
        className={`container pb-24 transition-all duration-1000 relative z-10 ${
          isInViewport(pricingTabsRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/30 border border-white/10 backdrop-blur-sm p-1">
              <TabsTrigger
                value="monthly"
                className="px-8 py-2 data-[state=active]:bg-blue-600/20 data-[state=active]:text-white text-white/70"
              >
                Monthly billing
              </TabsTrigger>
              <TabsTrigger
                value="annual"
                className="px-8 py-2 data-[state=active]:bg-blue-600/20 data-[state=active]:text-white text-white/70"
              >
                Annual billing
                <span className="ml-2 rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Save 20%</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Free"
                price="0"
                period="per month"
                description="Perfect for getting started"
                features={[
                  "1 online store",
                  "Up to 100 products",
                  "Basic inventory tracking",
                  "Standard support",
                  "Community access",
                ]}
                limitations={["No custom domain", "Storei branding", "Limited analytics", "No API access"]}
                buttonText="Get Started"
                buttonVariant="outline"
              />
              <PricingCard
                title="Pro"
                price="49"
                period="per month"
                description="For growing businesses"
                features={[
                  "Everything in Free",
                  "Unlimited products",
                  "Advanced inventory tracking",
                  "Barcode scanning",
                  "RFID integration",
                  "Custom domain",
                  "Priority support",
                  "Basic API access",
                ]}
                buttonText="Start Free Trial"
                buttonVariant="default"
                highlighted={true}
              />
              <PricingCard
                title="Business"
                price="149"
                period="per month"
                description="For established enterprises"
                features={[
                  "Everything in Pro",
                  "Multiple stores",
                  "Advanced analytics",
                  "Full API access",
                  "Custom integrations",
                  "Dedicated account manager",
                  "White-label solution",
                  "Priority feature requests",
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
              />
            </div>
          </TabsContent>

          <TabsContent value="annual" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Free"
                price="0"
                period="per month"
                description="Perfect for getting started"
                features={[
                  "1 online store",
                  "Up to 100 products",
                  "Basic inventory tracking",
                  "Standard support",
                  "Community access",
                ]}
                limitations={["No custom domain", "Storei branding", "Limited analytics", "No API access"]}
                buttonText="Get Started"
                buttonVariant="outline"
              />
              <PricingCard
                title="Pro"
                price="39"
                period="per month, billed annually"
                description="For growing businesses"
                features={[
                  "Everything in Free",
                  "Unlimited products",
                  "Advanced inventory tracking",
                  "Barcode scanning",
                  "RFID integration",
                  "Custom domain",
                  "Priority support",
                  "Basic API access",
                ]}
                buttonText="Start Free Trial"
                buttonVariant="default"
                highlighted={true}
              />
              <PricingCard
                title="Business"
                price="119"
                period="per month, billed annually"
                description="For established enterprises"
                features={[
                  "Everything in Pro",
                  "Multiple stores",
                  "Advanced analytics",
                  "Full API access",
                  "Custom integrations",
                  "Dedicated account manager",
                  "White-label solution",
                  "Priority feature requests",
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Feature Comparison */}
      <section
        ref={comparisonRef}
        className={`py-24 transition-all duration-1000 relative z-10 ${
          isInViewport(comparisonRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-blue-900/20 backdrop-blur-sm"></div>
        <div className="container relative z-10">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 backdrop-blur-sm">
              <span className="flex items-center gap-1 justify-center">
                <Sparkles className="h-3 w-3" />
                Compare plans
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Compare plans in detail
            </h2>
            <p className="max-w-[700px] mx-auto text-blue-100/80">
              See exactly what features are included in each plan
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 backdrop-blur-sm bg-black/30">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-left font-medium text-white">Features</th>
                  <th className="py-4 px-6 text-center font-medium text-white">Free</th>
                  <th className="py-4 px-6 text-center font-medium text-white">Pro</th>
                  <th className="py-4 px-6 text-center font-medium text-white">Business</th>
                </tr>
              </thead>
              <tbody>
                <FeatureRow feature="Online stores" free="1" pro="1" business="Up to 5" />
                <FeatureRow feature="Products" free="Up to 100" pro="Unlimited" business="Unlimited" />
                <FeatureRow feature="File storage" free="500 MB" pro="10 GB" business="100 GB" />
                <FeatureRow feature="Custom domain" free={false} pro={true} business={true} />
                <FeatureRow feature="Remove Storei branding" free={false} pro={true} business={true} />
                <FeatureRow feature="Inventory tracking" free="Basic" pro="Advanced" business="Advanced" />
                <FeatureRow feature="Barcode scanning" free={false} pro={true} business={true} />
                <FeatureRow feature="RFID integration" free={false} pro={true} business={true} />
                <FeatureRow feature="Analytics" free="Basic" pro="Advanced" business="Advanced + Custom" />
                <FeatureRow feature="API access" free={false} pro="Basic" business="Full" />
                <FeatureRow feature="Custom integrations" free={false} pro={false} business={true} />
                <FeatureRow feature="Support" free="Community" pro="Priority" business="Dedicated manager" />
                <FeatureRow feature="White-label solution" free={false} pro={false} business={true} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className={`container py-24 transition-all duration-1000 relative z-10 ${
          isInViewport(faqRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-400/20 px-3 py-1 text-sm text-blue-400 border border-blue-500/20 backdrop-blur-sm">
            <span className="flex items-center gap-1 justify-center">
              <Sparkles className="h-3 w-3" />
              Questions answered
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Frequently asked questions
          </h2>
          <p className="max-w-[700px] mx-auto text-blue-100/80">
            Everything you need to know about our pricing and plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FaqItem
            question="Can I upgrade or downgrade my plan at any time?"
            answer="Yes, you can upgrade your plan at any time. Downgrades will take effect at the end of your current billing cycle."
          />
          <FaqItem
            question="Do you offer a free trial?"
            answer="Yes, all paid plans include a 14-day free trial. No credit card required to start."
          />
          <FaqItem
            question="What payment methods do you accept?"
            answer="We accept all major credit cards, PayPal, and bank transfers for annual plans. All prices are in Tunisian Dinar (TND)."
          />
          <FaqItem question="Is there a setup fee?" answer="No, there are no setup fees for any of our plans." />
          <FaqItem
            question="Can I cancel my subscription?"
            answer="Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing cycle."
          />
          <FaqItem
            question="Do you offer discounts for nonprofits or educational institutions?"
            answer="Yes, we offer special pricing for nonprofits, educational institutions, and startups. Contact our sales team for more information."
          />
          <FaqItem
            question="What happens if I exceed my plan limits?"
            answer="We'll notify you when you're approaching your limits. You can upgrade to a higher plan or pay for additional resources as needed."
          />
          <FaqItem
            question="Do you offer custom plans for large enterprises?"
            answer="Yes, we offer custom enterprise plans for businesses with specific needs. Contact our sales team to discuss your requirements."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className={`container py-12 md:py-24 transition-all duration-1000 relative z-10 ${
          isInViewport(ctaRef) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
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

// Component for pricing cards
function PricingCard({
  title,
  price,
  period = "",
  description,
  features,
  limitations = [],
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
          <span className="text-3xl font-bold text-white">{price} TND</span>
          {period && <span className="text-blue-100/80 ml-1"> {period}</span>}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle
                className={`h-4 w-4 text-green-400 flex-shrink-0 mt-1 ${isHovered ? "animate-pulse" : ""}`}
              />
              <span className="text-sm text-blue-100/80">{feature}</span>
            </li>
          ))}
          {limitations.length > 0 && (
            <>
              <li className="pt-2">
                <span className="text-sm font-medium text-blue-100/80">Limitations:</span>
              </li>
              {limitations.map((limitation, index) => (
                <li key={`limit-${index}`} className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-1" />
                  <span className="text-sm text-blue-100/80">{limitation}</span>
                </li>
              ))}
            </>
          )}
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

// Component for feature comparison rows
function FeatureRow({ feature, free, pro, business }) {
  return (
    <tr className="border-b border-white/10 hover:bg-blue-900/10 transition-colors duration-300">
      <td className="py-4 px-6 text-white font-medium">{feature}</td>
      <td className="py-4 px-6 text-center">
        {typeof free === "boolean" ? (
          free ? (
            <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
          ) : (
            <X className="h-5 w-5 text-red-400 mx-auto" />
          )
        ) : (
          <span className="text-blue-100/80">{free}</span>
        )}
      </td>
      <td className="py-4 px-6 text-center">
        {typeof pro === "boolean" ? (
          pro ? (
            <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
          ) : (
            <X className="h-5 w-5 text-red-400 mx-auto" />
          )
        ) : (
          <span className="text-blue-100/80">{pro}</span>
        )}
      </td>
      <td className="py-4 px-6 text-center">
        {typeof business === "boolean" ? (
          business ? (
            <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
          ) : (
            <X className="h-5 w-5 text-red-400 mx-auto" />
          )
        ) : (
          <span className="text-blue-100/80">{business}</span>
        )}
      </td>
    </tr>
  )
}

// Component for FAQ items
function FaqItem({ question, answer }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="space-y-2 p-6 rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="font-semibold text-white">{question}</h3>
      <p className="text-blue-100/80">{answer}</p>
    </div>
  )
}
