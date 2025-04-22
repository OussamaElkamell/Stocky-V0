"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Box, CheckCircle, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"

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

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.8])
  const headerBlur = useTransform(scrollYProgress, [0, 0.05], [0, 8])
  const headerY = useTransform(scrollYProgress, [0, 0.05], [0, -10])

  const heroRef = useRef(null)
  const processRef = useRef(null)
  const detailedRef = useRef(null)
  const faqRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const processInView = useInView(processRef, { once: true, margin: "-100px" })
  const detailedInView = useInView(detailedRef, { once: true, margin: "-100px" })
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: true })

  // Mouse follow effect for hero section
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

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
            <Link href="/">
              <Box className="h-6 w-6 text-[#1C64F2]" />
              <span className="sr-only">Storei</span>
            </Link>
            <span className="text-xl font-bold text-[#153E75]">Storei</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: "Features", href: "/features", active: false },
              { name: "How It Works", href: "/how-it-works", active: true },
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
                  { name: "Features", href: "/features", active: false },
                  { name: "How It Works", href: '/how  href: "/features', active: false },
                  { name: "How It Works", href: "/how-it-works", active: true },
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
              () => mousePosition.x - window.innerWidth / 2,
              (value) => -value / 20,
            ),
            y: useTransform(
              () => mousePosition.y - window.innerHeight / 2,
              (value) => -value / 20,
            ),
            opacity: 0.7,
          }}
        />

        <motion.div
          className="max-w-3xl mx-auto text-center space-y-6"
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
            Simple process
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight text-[#153E75] relative"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="relative inline-block">
              How Storei
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500/50"
                initial={{ scaleX: 0, originX: 0 }}
                animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </span>{" "}
            Works
          </motion.h1>

          <motion.p
            className="text-xl text-[#5F6C7B]"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Get your store up and running in just a few simple steps. No coding required.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Process Overview */}
      <motion.section className="container py-12" ref={processRef}>
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-lg p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 100 }}
          animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
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
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={processInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-[#153E75] mb-6">The Storei Process</h2>
              <p className="text-[#5F6C7B] mb-8">
                Storei simplifies the process of setting up and managing your online store. Our platform is designed to
                be intuitive and user-friendly, allowing you to focus on growing your business rather than dealing with
                technical complexities.
              </p>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Create Your Store",
                    description: "Choose a template and customize your online store to match your brand.",
                  },
                  {
                    step: 2,
                    title: "Add Your Products",
                    description: "Upload your products manually or import them in bulk from a spreadsheet.",
                  },
                  {
                    step: 3,
                    title: "Track Your Inventory",
                    description: "Monitor inventory levels and get alerts when items are running low.",
                  },
                  {
                    step: 4,
                    title: "Sell & Ship",
                    description: "Process orders, print shipping labels, and track deliveries.",
                  },
                ].map((step) => (
                  <motion.div
                    key={step.step}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${activeStep === step.step ? "bg-[#1C64F2]/5 border border-[#1C64F2]/20" : "hover:bg-gray-50"}`}
                    onClick={() => setActiveStep(step.step)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={processInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.3 + step.step * 0.1 }}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${activeStep === step.step ? "bg-[#1C64F2] text-white" : "bg-gray-100 text-[#5F6C7B]"}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {step.step}
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-[#153E75]">{step.title}</h3>
                        <p className="text-sm text-[#5F6C7B] mt-1">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-lg border overflow-hidden shadow-lg relative"
              initial={{ opacity: 0, x: 50 }}
              animate={processInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              />

              <AnimatePresence mode="wait">
                {activeStep === 1 && (
                  <motion.div
                    className="space-y-6 p-6 bg-white relative z-10"
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src="/placeholder.svg?height=300&width=500&text=Store Creation"
                      alt="Store creation interface"
                      className="w-full h-auto rounded-lg"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-[#153E75]">Create your store in minutes</h3>
                      <p className="text-[#5F6C7B] mb-6">
                        Choose from dozens of professionally designed templates and customize them to match your brand.
                        No design or coding skills required.
                      </p>
                      <motion.ul className="space-y-2">
                        {[
                          "Drag-and-drop builder",
                          "Mobile-responsive designs",
                          "Custom domains",
                          "SEO optimization",
                        ].map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * i }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                            </motion.div>
                            <span className="text-[#5F6C7B]">{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    className="space-y-6 p-6 bg-white relative z-10"
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src="/placeholder.svg?height=300&width=500&text=Product Management"
                      alt="Product management interface"
                      className="w-full h-auto rounded-lg"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-[#153E75]">Effortless product management</h3>
                      <p className="text-[#5F6C7B] mb-6">
                        Add products individually or import them in bulk. Use our barcode scanner or image recognition
                        to speed up the process.
                      </p>
                      <motion.ul className="space-y-2">
                        {["Bulk import/export", "Barcode scanning", "Image recognition", "Variant management"].map(
                          (item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * i }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                              </motion.div>
                              <span className="text-[#5F6C7B]">{item}</span>
                            </motion.li>
                          ),
                        )}
                      </motion.ul>
                    </div>
                  </motion.div>
                )}

                {activeStep === 3 && (
                  <motion.div
                    className="space-y-6 p-6 bg-white relative z-10"
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src="/placeholder.svg?height=300&width=500&text=Inventory Tracking"
                      alt="Inventory tracking interface"
                      className="w-full h-auto rounded-lg"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-[#153E75]">Smart inventory management</h3>
                      <p className="text-[#5F6C7B] mb-6">
                        Track stock levels across all sales channels. Set up automatic reordering and get alerts when
                        inventory runs low.
                      </p>
                      <motion.ul className="space-y-2">
                        {["Real-time tracking", "Low stock alerts", "Automatic reordering", "RFID integration"].map(
                          (item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * i }}
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                              </motion.div>
                              <span className="text-[#5F6C7B]">{item}</span>
                            </motion.li>
                          ),
                        )}
                      </motion.ul>
                    </div>
                  </motion.div>
                )}

                {activeStep === 4 && (
                  <motion.div
                    className="space-y-6 p-6 bg-white relative z-10"
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src="/placeholder.svg?height=300&width=500&text=Order Processing"
                      alt="Order processing interface"
                      className="w-full h-auto rounded-lg"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-[#153E75]">Seamless selling and shipping</h3>
                      <p className="text-[#5F6C7B] mb-6">
                        Process orders from all channels in one place. Print shipping labels, track deliveries, and keep
                        customers informed.
                      </p>
                      <motion.ul className="space-y-2">
                        {[
                          "Unified order management",
                          "Shipping label printing",
                          "Delivery tracking",
                          "Customer notifications",
                        ].map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * i }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                            </motion.div>
                            <span className="text-[#5F6C7B]">{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Detailed Steps */}
      <section className="container py-16" ref={detailedRef}>
        <motion.h2
          className="text-2xl font-bold text-[#153E75] mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={detailedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          Detailed Process
        </motion.h2>

        <div className="space-y-16">
          {/* Step 1 */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 100 }}
            animate={detailedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="order-2 lg:order-1">
              <motion.div
                className="inline-block rounded-lg bg-[#1C64F2]/10 px-3 py-1 text-sm text-[#1C64F2] mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={detailedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Step 1
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-[#153E75] mb-4"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Create Your Store
              </motion.h3>

              <motion.p
                className="text-[#5F6C7B] mb-6"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Getting started with Storei is simple. Choose from our library of professionally designed templates,
                each optimized for different industries and business types. Customize your store's look and feel to
                match your brand identity.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {[
                  {
                    title: "Choose a template",
                    description:
                      "Browse our template gallery and select the one that best fits your business needs. All templates are mobile-responsive and optimized for conversions.",
                  },
                  {
                    title: "Customize your design",
                    description:
                      "Use our intuitive drag-and-drop editor to customize colors, fonts, layouts, and more. No coding skills required.",
                  },
                  {
                    title: "Configure your settings",
                    description: "Set up your store name, domain, payment methods, shipping options, and tax settings.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={detailedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-[#153E75] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#5F6C7B]">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 100 }}
              animate={detailedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div className="rounded-xl border overflow-hidden shadow-lg relative" whileHover={{ scale: 1.03 }}>
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
                <img
                  src="/placeholder.svg?height=400&width=600&text=Store Creation Process"
                  alt="Store creation process"
                  className="w-full h-auto relative z-10"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 100 }}
            animate={detailedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={detailedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div className="rounded-xl border overflow-hidden shadow-lg relative" whileHover={{ scale: 1.03 }}>
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
                <img
                  src="/placeholder.svg?height=400&width=600&text=Product Management Process"
                  alt="Product management process"
                  className="w-full h-auto relative z-10"
                />
              </motion.div>
            </motion.div>

            <div>
              <motion.div
                className="inline-block rounded-lg bg-[#1C64F2]/10 px-3 py-1 text-sm text-[#1C64F2] mb-4"
                initial={{ opacity: 0, x: 20 }}
                animate={detailedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Step 2
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-[#153E75] mb-4"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Add Your Products
              </motion.h3>

              <motion.p
                className="text-[#5F6C7B] mb-6"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                Storei offers multiple ways to add products to your store, making the process quick and efficient.
                Whether you have a few products or thousands, our platform can handle it.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                {[
                  {
                    title: "Manual entry",
                    description:
                      "Add products one by one with our easy-to-use product editor. Add images, descriptions, prices, and variants.",
                  },
                  {
                    title: "Bulk import",
                    description:
                      "Import products in bulk using CSV or Excel files. Perfect for stores with large inventories.",
                  },
                  {
                    title: "Barcode scanning",
                    description:
                      "Use our mobile app to scan product barcodes and automatically add them to your inventory.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={detailedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-[#153E75] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#5F6C7B]">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 100 }}
            animate={detailedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="order-2 lg:order-1">
              <motion.div
                className="inline-block rounded-lg bg-[#1C64F2]/10 px-3 py-1 text-sm text-[#1C64F2] mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={detailedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                Step 3
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-[#153E75] mb-4"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                Track Your Inventory
              </motion.h3>

              <motion.p
                className="text-[#5F6C7B] mb-6"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                Storei's inventory management system gives you real-time visibility into your stock levels across all
                sales channels. Never oversell or run out of popular items again.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                {[
                  {
                    title: "Real-time tracking",
                    description:
                      "Monitor stock levels in real-time across all your sales channels, including your online store, physical locations, and marketplaces.",
                  },
                  {
                    title: "Low stock alerts",
                    description:
                      "Set up automatic alerts when inventory reaches a specified threshold, so you can reorder before running out.",
                  },
                  {
                    title: "RFID integration",
                    description:
                      "Use RFID technology to track the exact location of your inventory in warehouses and stores.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={detailedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-[#153E75] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#5F6C7B]">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 100 }}
              animate={detailedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.div className="rounded-xl border overflow-hidden shadow-lg relative" whileHover={{ scale: 1.03 }}>
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
                <img
                  src="/placeholder.svg?height=400&width=600&text=Inventory Tracking Process"
                  alt="Inventory tracking process"
                  className="w-full h-auto relative z-10"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 100 }}
            animate={detailedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={detailedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <motion.div className="rounded-xl border overflow-hidden shadow-lg relative" whileHover={{ scale: 1.03 }}>
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
                <img
                  src="/placeholder.svg?height=400&width=600&text=Order Processing Process"
                  alt="Order processing process"
                  className="w-full h-auto relative z-10"
                />
              </motion.div>
            </motion.div>

            <div>
              <motion.div
                className="inline-block rounded-lg bg-[#1C64F2]/10 px-3 py-1 text-sm text-[#1C64F2] mb-4"
                initial={{ opacity: 0, x: 20 }}
                animate={detailedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                Step 4
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-[#153E75] mb-4"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                Sell & Ship
              </motion.h3>

              <motion.p
                className="text-[#5F6C7B] mb-6"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.9 }}
              >
                Process orders efficiently and keep your customers informed every step of the way. Storei streamlines
                your order fulfillment process from payment to delivery.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={detailedInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                {[
                  {
                    title: "Order management",
                    description: "View and manage all orders in one place, regardless of which channel they came from.",
                  },
                  {
                    title: "Shipping integration",
                    description:
                      "Print shipping labels, generate packing slips, and get discounted shipping rates from major carriers.",
                  },
                  {
                    title: "Customer notifications",
                    description:
                      "Automatically send order confirmations, shipping updates, and delivery notifications to keep customers informed.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={detailedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 2 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-[#153E75] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#5F6C7B]">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16" ref={faqRef}>
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-2xl font-bold text-[#153E75] mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={faqInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={faqInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              {
                question: "How long does it take to set up a store?",
                answer:
                  "Most users can set up a basic store in under an hour. More complex stores with large inventories might take a day or two, depending on how much customization you want to do.",
              },
              {
                question: "Do I need technical skills to use Storei?",
                answer:
                  "Not at all! Storei is designed to be user-friendly and intuitive. No coding or design skills are required to create and manage your store.",
              },
              {
                question: "Can I use my own domain name?",
                answer:
                  "Yes, you can connect your own domain name to your Storei store. We provide easy instructions for setting up your domain with any registrar.",
              },
              {
                question: "What payment methods can I accept?",
                answer:
                  "Storei integrates with all major payment gateways, allowing you to accept credit cards, PayPal, Apple Pay, Google Pay, and more.",
              },
              {
                question: "Is there a limit to how many products I can add?",
                answer: "The Free plan allows up to 100 products. The Pro and Business plans offer unlimited products.",
              },
              {
                question: "Can I manage multiple stores from one account?",
                answer: "Yes, the Business plan allows you to manage multiple stores from a single dashboard.",
              },
            ].map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} index={i} inView={faqInView} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section className="container py-16" ref={ctaRef}>
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
              Ready to get started?
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
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

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
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
                  <span className="relative z-10">Schedule a Demo</span>
                </Button>
              </motion.div>
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
                links: ["Features", "Templates", "Pricing", "Integrations", "API"],
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
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Storei. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

// FAQ Item Component
function FaqItem({ question, answer, index, inView }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border rounded-lg overflow-hidden bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.button
        className="flex justify-between items-center w-full p-4 text-left hover:bg-blue-50/50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        <h3 className="font-medium text-[#153E75]">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronRight className="h-5 w-5 text-[#5F6C7B]" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="p-4 bg-blue-50/50 border-t border-blue-100"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[#5F6C7B]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
