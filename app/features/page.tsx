"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle,
  BarChart3,
  ShoppingCart,
  QrCode,
  ImageIcon,
  Lock,
  Users,
  MapPin,
  Truck,
  Gift,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Globe, Box, Smartphone } from "@/components/icons"

// Particle component for background effects
const Particle = ({ className = "" }) => {
  const randomSize = Math.floor(Math.random() * 6) + 2
  const randomDuration = Math.floor(Math.random() * 20) + 10
  const randomDelay = Math.floor(Math.random() * 10)

  return (
    <motion.div
      className={`absolute rounded-full bg-blue-500/20 ${className}`}
      style={{
        width: randomSize,
        height: randomSize,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
        scale: [1, 1.5, 1],
        y: [0, -30, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Number.POSITIVE_INFINITY,
        delay: randomDelay,
        ease: "easeInOut",
      }}
    />
  )
}

// Animated gradient background
const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(28, 100, 242, 0.3), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      {Array.from({ length: 30 }).map((_, i) => (
        <Particle key={i} className={`top-[${Math.random() * 100}%] left-[${Math.random() * 100}%]`} />
      ))}
    </div>
  )
}

// Animated feature card
const AnimatedFeatureCard = ({ icon, title, description, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Card className="h-full bg-white/80 backdrop-blur-sm border border-blue-100 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
        <CardContent className="p-6 space-y-4 relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            whileHover={{ opacity: 1 }}
          />
          <motion.div
            className="rounded-full bg-[#1C64F2]/10 w-12 h-12 flex items-center justify-center relative z-10"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(28, 100, 242, 0.2)",
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {icon}
            </motion.div>
          </motion.div>
          <h3 className="text-lg font-semibold text-[#153E75] relative z-10">{title}</h3>
          <p className="text-sm text-[#5F6C7B] relative z-10">{description}</p>

          <motion.div
            className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -mr-10 -mb-10 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-4">
        <div className="rounded-full bg-blue-500/20 w-12 h-12 flex items-center justify-center">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.8])
  const headerBlur = useTransform(scrollYProgress, [0, 0.05], [0, 8])
  const headerY = useTransform(scrollYProgress, [0, 0.05], [0, -10])

  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const spotlightRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const spotlightInView = useInView(spotlightRef, { once: true, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  // Mouse follow effect for hero section
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // State to store parallax style
  const [parallaxStyle, setParallaxStyle] = useState({})

  // Update parallax style on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateParallaxStyle = () => {
        const strength = 80
        const x = (window.innerWidth / 2 - mousePosition.x) / strength
        const y = (window.innerHeight / 2 - mousePosition.y) / strength
        setParallaxStyle({ transform: `translate(${x}px, ${y}px)` })
      }

      updateParallaxStyle() // Initial update

      // Update on mouse movement
      window.addEventListener("mousemove", updateParallaxStyle)

      return () => {
        window.removeEventListener("mousemove", updateParallaxStyle)
      }
    }
  }, [mousePosition])

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F8] relative overflow-hidden">
      <AnimatedGradient />

      {/* Navigation */}
      <motion.header
        className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60"
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
          y: headerY,
          boxShadow: useTransform(scrollYProgress, [0, 0.05], ["0 0 0 rgba(0,0,0,0)", "0 4px 20px rgba(0,0,0,0.1)"]),
        }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Box className="h-6 w-6 text-[#1C64F2]" />
            <span className="text-xl font-bold text-[#153E75]">Storei</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: "Features", href: "/features", active: true },
              { name: "How It Works", href: "/how-it-works", active: false },
              { name: "Pricing", href: "/pricing", active: false },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium relative group ${
                  item.active ? "text-[#1C64F2]" : "text-[#5F6C7B] hover:text-[#1C64F2]"
                }`}
              >
                {item.name}
                <motion.span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#1C64F2] transform origin-left ${
                    item.active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  initial={{ scaleX: item.active ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-[#1C64F2] text-[#1C64F2] relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-[#1C64F2]/10 transform origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Log In</span>
                </Button>
              </motion.div>
            </Link>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#1C64F2] hover:bg-[#153E75] text-white relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-white/20 transform origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Sign Up</span>
                </Button>
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <motion.button className="md:hidden" onClick={() => setMobileMenuOpen(true)} whileTap={{ scale: 0.9 }}>
              <Menu className="h-6 w-6 text-[#153E75]" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              className="fixed right-0 top-0 h-full w-3/4 max-w-xs bg-white p-6 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <motion.button onClick={() => setMobileMenuOpen(false)} whileTap={{ scale: 0.9 }}>
                  <X className="h-6 w-6 text-[#153E75]" />
                </motion.button>
              </div>

              <nav className="mt-8 space-y-6">
                {[
                  { name: "Features", href: "/features", active: true },
                  { name: "How It Works", href: "/how-it-works", active: false },
                  { name: "Pricing", href: "/pricing", active: false },
                ].map((item) => (
                  <motion.div key={item.name} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item.href}
                      className={`block text-lg font-medium ${item.active ? "text-[#1C64F2]" : "text-[#5F6C7B]"}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-10 space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-[#1C64F2] text-[#1C64F2]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Button>
                <Button className="w-full bg-[#1C64F2] text-white" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section className="container py-16 md:py-24 relative" ref={heroRef}>
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl -z-10"
          style={{
            x: useTransform(
              () => mousePosition.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0),
              (value) => -value / 20,
            ),
            y: useTransform(
              () => mousePosition.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 0),
              (value) => -value / 20,
            ),
            opacity: 0.7,
          }}
        />

        <motion.div
          className="text-center space-y-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.div
            className="inline-block rounded-lg bg-[#1C64F2]/10 px-3 py-1 text-sm text-[#1C64F2]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            All-in-one platform
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#153E75] relative"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="relative inline-block">
              Everything
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500/50"
                initial={{ scaleX: 0, originX: 0 }}
                animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </span>{" "}
            you need to succeed
          </motion.h1>

          <motion.p
            className="text-xl text-[#5F6C7B]"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Storei combines powerful tools to help you build and manage your business efficiently.
          </motion.p>

          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <Link href="/dashboard">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-[#1C64F2] text-[#1C64F2] relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-[#1C64F2]/10 transform origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="mr-2 relative z-10"
                    animate={{ x: [0, -3, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </motion.span>
                  <span className="relative z-10">Back to Home</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <motion.section className="container py-16 space-y-16" ref={featuresRef}>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedFeatureCard
            icon={<Globe className="text-[#1C64F2]" />}
            title="No-code store builder"
            description="Create beautiful online stores without writing a single line of code. Our intuitive drag-and-drop interface makes it easy to design your perfect store."
            index={0}
          />
          <AnimatedFeatureCard
            icon={<Box className="text-[#1C64F2]" />}
            title="Real-time inventory tracking"
            description="Keep track of your stock levels across all channels in real-time. Get alerts when inventory is running low and automate reordering."
            index={1}
          />
          <AnimatedFeatureCard
            icon={<Smartphone className="text-[#1C64F2]" />}
            title="Offline mode with auto sync"
            description="Continue working without internet and sync automatically when back online. Perfect for businesses with unreliable connections."
            index={2}
          />
          <AnimatedFeatureCard
            icon={<QrCode className="text-[#1C64F2]" />}
            title="Barcode/QR product scan"
            description="Quickly add and manage products by scanning barcodes or QR codes. Speed up inventory management and reduce errors."
            index={3}
          />
          <AnimatedFeatureCard
            icon={<ImageIcon className="text-[#1C64F2]" />}
            title="Image recognition"
            description="Automatically identify products using advanced image recognition. Simply take a photo and let our AI do the rest."
            index={4}
          />
          <AnimatedFeatureCard
            icon={<Lock className="text-[#1C64F2]" />}
            title="Private catalog mode"
            description="Create exclusive catalogs for specific customer segments. Perfect for B2B businesses with different pricing tiers."
            index={5}
          />
          <AnimatedFeatureCard
            icon={<Users className="text-[#1C64F2]" />}
            title="Client space (B2B/B2C)"
            description="Dedicated portals for both business and consumer customers. Provide a personalized experience for each customer type."
            index={6}
          />
          <AnimatedFeatureCard
            icon={<MapPin className="text-[#1C64F2]" />}
            title="RFID-based stock geolocation"
            description="Locate your inventory precisely with RFID technology. Never lose track of your products in large warehouses again."
            index={7}
          />
          <AnimatedFeatureCard
            icon={<Truck className="text-[#1C64F2]" />}
            title="Delivery tracking"
            description="Monitor shipments and provide customers with real-time updates. Improve customer satisfaction with transparent delivery processes."
            index={8}
          />
          <AnimatedFeatureCard
            icon={<ShoppingCart className="text-[#1C64F2]" />}
            title="POS system with ticket printing"
            description="Complete point-of-sale system for in-person transactions. Print receipts, manage cash, and track sales all in one place."
            index={9}
          />
          <AnimatedFeatureCard
            icon={<Gift className="text-[#1C64F2]" />}
            title="Loyalty programs"
            description="Create and manage customer loyalty programs to boost retention. Reward your best customers and encourage repeat business."
            index={10}
          />
          <AnimatedFeatureCard
            icon={<BarChart3 className="text-[#1C64F2]" />}
            title="Mobile & web sync"
            description="Seamless synchronization between mobile and web platforms. Manage your business from anywhere, on any device."
            index={11}
          />
        </motion.div>
      </motion.section>

      {/* Feature Spotlight */}
      <section className="bg-white py-24 relative overflow-hidden" ref={spotlightRef}>
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 -z-10"
          initial={{ opacity: 0 }}
          animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute top-20 right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-indigo-500/10 blur-3xl -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="container">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={spotlightInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-block rounded-lg bg-[#1C64F2]/10 px-3 py-1 text-sm text-[#1C64F2]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={spotlightInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Feature spotlight
            </motion.div>

            <motion.h2
              className="text-3xl font-bold tracking-tight text-[#153E75]"
              initial={{ opacity: 0 }}
              animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Explore our key features in depth
            </motion.h2>

            <motion.p
              className="max-w-[700px] mx-auto text-[#5F6C7B]"
              initial={{ opacity: 0 }}
              animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Discover how our powerful features can transform your business operations
            </motion.p>
          </motion.div>

          <div className="space-y-24">
            {/* Feature Spotlight 1 */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 100 }}
              animate={spotlightInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="order-2 lg:order-1">
                <motion.div
                  className="inline-block rounded-lg bg-[#1C64F2]/10 px-3 py-1 text-sm text-[#1C64F2] mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={spotlightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Store Builder
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold mb-4 text-[#153E75]"
                  initial={{ opacity: 0 }}
                  animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Build your dream store without code
                </motion.h3>

                <motion.p
                  className="text-[#5F6C7B] mb-6"
                  initial={{ opacity: 0 }}
                  animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Our intuitive drag-and-drop builder makes it easy to create a professional online store in minutes.
                  Choose from dozens of templates, customize colors and fonts, and add your products - all without
                  writing a single line of code.
                </motion.p>

                <motion.ul
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {[
                    "Drag-and-drop interface for easy customization",
                    "Mobile-responsive designs that look great on any device",
                    "Custom domain support to build your brand",
                    "SEO optimization tools to help customers find you",
                    "Built-in analytics to track performance",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={spotlightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="h-5 w-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                      </motion.div>
                      <span className="text-[#5F6C7B]">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <motion.div
                className="order-1 lg:order-2 rounded-xl border overflow-hidden shadow-lg relative"
                initial={{ opacity: 0, x: 100 }}
                animate={spotlightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
                <img
                  src="/placeholder.svg?height=500&width=600&text=Store+Builder"
                  alt="Store Builder Interface"
                  className="w-full h-auto relative z-10"
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 0.7 }}
                />
              </motion.div>
            </motion.div>

            {/* Feature Spotlight 2 */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 100 }}
              animate={spotlightInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="rounded-xl border overflow-hidden shadow-lg relative"
                initial={{ opacity: 0, x: -100 }}
                animate={spotlightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
                <img
                  src="/placeholder.svg?height=500&width=600&text=Inventory+Management"
                  alt="Inventory Management Interface"
                  className="w-full h-auto relative z-10"
                />
              </motion.div>

              <div>
                <motion.div
                  className="inline-block rounded-lg bg-[#1C64F2]/10 px-3 py-1 text-sm text-[#1C64F2] mb-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={spotlightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  Inventory Management
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold mb-4 text-[#153E75]"
                  initial={{ opacity: 0 }}
                  animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  Smart inventory that works for you
                </motion.h3>

                <motion.p
                  className="text-[#5F6C7B] mb-6"
                  initial={{ opacity: 0 }}
                  animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  Our advanced inventory management system helps you keep track of stock levels across all sales
                  channels in real-time. Set up automatic reordering, get low stock alerts, and use RFID technology to
                  locate products in your warehouse.
                </motion.p>

                <motion.ul
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  {[
                    "Real-time tracking across all sales channels",
                    "Automatic low stock alerts to prevent stockouts",
                    "RFID integration for precise product location",
                    "Barcode scanning for quick inventory updates",
                    "Inventory forecasting based on sales history",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={spotlightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="h-5 w-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                      </motion.div>
                      <span className="text-[#5F6C7B]">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            {/* Feature Spotlight 3 */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 100 }}
              animate={spotlightInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="order-2 lg:order-1">
                <motion.div
                  className="inline-block rounded-lg bg-[#1C64F2]/10 px-3 py-1 text-sm text-[#1C64F2] mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={spotlightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  Point of Sale
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold mb-4 text-[#153E75]"
                  initial={{ opacity: 0 }}
                  animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  Seamless in-person transactions
                </motion.h3>

                <motion.p
                  className="text-[#5F6C7B] mb-6"
                  initial={{ opacity: 0 }}
                  animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  Our point-of-sale system makes in-person selling easy. Process payments, print receipts, and sync
                  inventory in real-time. Works online and offline, so you never miss a sale, even without internet.
                </motion.p>

                <motion.ul
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={spotlightInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  {[
                    "Works online and offline with automatic syncing",
                    "Supports multiple payment methods including cash and cards",
                    "Automatic receipt printing and digital receipts",
                    "Customer management with purchase history",
                    "Real-time inventory updates across all channels",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={spotlightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: 1.5 + i * 0.1 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="h-5 w-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
                      </motion.div>
                      <span className="text-[#5F6C7B]">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <motion.div
                className="order-1 lg:order-2 rounded-xl border overflow-hidden shadow-lg relative"
                initial={{ opacity: 0, x: 100 }}
                animate={spotlightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
                <img
                  src="/placeholder.svg?height=500&width=600&text=Point+of+Sale"
                  alt="Point of Sale Interface"
                  className="w-full h-auto relative z-10"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section className="container py-16 md:py-24" ref={ctaRef}>
        <motion.div
          className="rounded-2xl bg-gradient-to-r from-[#1C64F2] to-[#153E75] p-8 md:p-16 text-white relative overflow-hidden group"
          initial={{ opacity: 0, y: 100 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1), transparent 70%)",
            }}
          />

          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 10 + 2,
                height: Math.random() * 10 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}

          <div className="mx-auto max-w-2xl text-center space-y-8 relative z-10">
            <motion.h2
              className="text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to transform your business?
            </motion.h2>

            <motion.p
              className="text-white/80"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join thousands of businesses already using Storei to build and manage their online stores.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-[#1C64F2] hover:bg-white/90 relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute inset-0 bg-[#1C64F2]/10 transform origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Get Started Free</span>
                  </Button>
                </motion.div>
              </Link>

              <Link href="/pricing">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/10 transform origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">View Pricing</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-white relative overflow-hidden">
        <motion.div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#F4F6F8] to-transparent" />

        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <motion.div
              className="col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Box className="h-6 w-6 text-[#1C64F2]" />
                <span className="text-xl font-bold text-[#153E75]">Storei</span>
              </motion.div>

              <p className="text-sm text-[#5F6C7B] mb-4">Build and manage your online store with no code required.</p>

              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <motion.div
                    key={social}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link href={`#${social}`} className="text-[#5F6C7B] hover:text-[#1C64F2]">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#F4F6F8] hover:bg-blue-100 transition-colors duration-300">
                        <span className="sr-only">{social}</span>
                        {/* Placeholder for social icons */}
                        <div className="h-4 w-4" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "API"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Guides", "Blog", "Support", "Community"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Privacy Policy", "Terms of Service"],
              },
            ].map((column, columnIndex) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * columnIndex }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold mb-4 text-[#153E75]">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * columnIndex + 0.05 * itemIndex }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href="#"
                        className="text-sm text-[#5F6C7B] hover:text-[#1C64F2] transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 pt-8 border-t text-center text-sm text-[#5F6C7B]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            © {new Date().getFullYear()} Storei. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
