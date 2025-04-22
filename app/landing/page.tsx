"use client"

const { useState, useEffect, useRef } = require("react")
const Link = require("next/link").default
const {
  ArrowRight,
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
  Sparkles,
} = require("lucide-react")
const { Button } = require("@/components/ui/button")
const { Card, CardContent } = require("@/components/ui/card")
const { motion, AnimatePresence, useScroll, useTransform, useInView } = require("framer-motion")
const { Globe: GlobeIcon, Box: BoxIcon, Smartphone: SmartphoneIcon } = require("@/components/icons")

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

const StepCard = ({ number, title, description, isActive, onClick }) => {
  return (
    <div
      className={`relative group px-6 py-8 rounded-xl border border-blue-600/10 transition-all duration-300 hover:scale-105 ${
        isActive ? "scale-105 shadow-lg border-blue-400" : ""
      }`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <span className="absolute top-3 right-3 text-sm font-bold text-blue-400/50 z-10">{number}</span>
      <h3 className="text-lg font-semibold text-white relative z-10">{title}</h3>
      <p className="text-blue-100/80 mt-2 relative z-10">{description}</p>
    </div>
  )
}

const FeaturesPageContent = () => {
  const [activeStep, setActiveStep] = useState("create")

  return (
    <section id="how-it-works" className={`py-24 transition-all duration-1000 relative z-10`}>
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
              isActive={activeStep === "create"}
              onClick={() => setActiveStep("create")}
            />
            <StepCard
              number="2"
              title="Add products"
              description="Upload your products manually or import them in bulk from a spreadsheet."
              isActive={activeStep === "products"}
              onClick={() => setActiveStep("products")}
            />
            <StepCard
              number="3"
              title="Track stock"
              description="Monitor inventory levels and get alerts when items are running low."
              isActive={activeStep === "track"}
              onClick={() => setActiveStep("track")}
            />
            <StepCard
              number="4"
              title="Sell & ship"
              description="Process orders, print shipping labels, and track deliveries."
              isActive={activeStep === "sell"}
              onClick={() => setActiveStep("sell")}
            />
          </div>
        </div>

        <div className="mt-12 p-6 bg-black/30 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm transition-all duration-500">
          {activeStep === "create" && (
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

          {activeStep === "products" && (
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

          {activeStep === "track" && (
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

          {activeStep === "sell" && (
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
                    "Shipping carrier integrations",
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
  )
}

export default FeaturesPageContent
