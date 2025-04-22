"use client"

import { useState } from "react"
import Link from "next/link"
import { Box, ArrowRight, Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WelcomePage() {
  const [firstName, setFirstName] = useState("Sarah")
  const [storeDetails, setStoreDetails] = useState({
    name: "",
    type: "",
  })
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [errors, setErrors] = useState({
    name: "",
    type: "",
  })

  const handleChange = (field, value) => {
    setStoreDetails({
      ...storeDetails,
      [field]: value,
    })

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!storeDetails.name.trim()) {
      newErrors.name = "Store name is required"
      isValid = false
    }

    if (!storeDetails.type) {
      newErrors.type = "Please select a store type"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // In a real application, you would save the data and proceed to the next step
      console.log("Form submitted:", { ...storeDetails, logo: logoFile })
      // Navigate to the next step (this would be implemented in a real app)
      alert("Form submitted successfully! In a real app, you would proceed to Step 2.")
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Box className="h-6 w-6 text-[#1C64F2]" />
            <span className="text-xl font-bold text-[#153E75]">Storei</span>
          </Link>
          <Link href="/dashboard" className="text-[#5F6C7B] hover:text-[#1C64F2] text-sm font-medium">
            Skip Setup
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Visual Section - Top on mobile, Left on desktop */}
          <div className="order-1 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="aspect-video relative rounded-xl overflow-hidden border shadow-sm">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Your+Store+Preview"
                  alt="Store Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-lg">{storeDetails.name || "Your Store Name"}</h3>
                    <p className="text-sm opacity-90">{storeDetails.type || "Your Store Type"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-bold text-[#153E75]">What you'll be able to do:</h3>
                <ul className="space-y-3">
                  {[
                    "Manage your inventory across all channels",
                    "Process orders and track shipments",
                    "Create beautiful product pages",
                    "Analyze sales and customer data",
                    "Connect with payment providers",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="rounded-full bg-[#22C55E]/10 p-1">
                        <Check className="h-4 w-4 text-[#22C55E]" />
                      </div>
                      <span className="text-[#5F6C7B]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="order-2 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-[#153E75] mb-2">Welcome to Storei, {firstName}!</h1>
                <p className="text-[#5F6C7B]">Let's set up your first store in a few simple steps.</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1C64F2]">Step 1 of 3</span>
                  <span className="text-sm text-[#5F6C7B]">Store Details</span>
                </div>
                <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1C64F2] rounded-full" style={{ width: "33.33%" }}></div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#1C64F2] text-white flex items-center justify-center text-sm">
                      1
                    </div>
                    <span className="text-xs mt-1 text-[#1C64F2] font-medium">Store Details</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E2E8F0] text-[#94A3B8] flex items-center justify-center text-sm">
                      2
                    </div>
                    <span className="text-xs mt-1 text-[#94A3B8]">Products</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E2E8F0] text-[#94A3B8] flex items-center justify-center text-sm">
                      3
                    </div>
                    <span className="text-xs mt-1 text-[#94A3B8]">Go Live</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName" className="text-[#153E75]">
                    Store Name
                  </Label>
                  <Input
                    id="storeName"
                    placeholder="Enter your store name"
                    value={storeDetails.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`bg-white border ${
                      errors.name ? "border-[#EF4444]" : "border-gray-200"
                    } rounded-xl p-3 h-12 shadow-sm focus:ring-2 focus:ring-[#1C64F2]/20 focus:border-[#1C64F2]`}
                  />
                  {errors.name && <p className="text-sm text-[#EF4444]">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeType" className="text-[#153E75]">
                    Store Type
                  </Label>
                  <Select value={storeDetails.type} onValueChange={(value) => handleChange("type", value)}>
                    <SelectTrigger
                      id="storeType"
                      className={`bg-white border ${
                        errors.type ? "border-[#EF4444]" : "border-gray-200"
                      } rounded-xl p-3 h-12 shadow-sm focus:ring-2 focus:ring-[#1C64F2]/20 focus:border-[#1C64F2]`}
                    >
                      <SelectValue placeholder="Select store type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-[#EF4444]">{errors.type}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeLogo" className="text-[#153E75]">
                    Store Logo
                  </Label>
                  <div className="mt-1 flex items-center gap-4">
                    {logoPreview ? (
                      <div className="relative w-24 h-24 rounded-lg border overflow-hidden">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo Preview"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm"
                        >
                          <X className="h-4 w-4 text-[#5F6C7B]" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-[#5F6C7B]">
                        <Upload className="h-6 w-6 mb-1" />
                        <span className="text-xs">Upload</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-[#1C64F2] text-[#1C64F2] rounded-lg hover:bg-[#1C64F2]/5 transition-colors"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {logoPreview ? "Change Logo" : "Upload Logo"}
                      </label>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                      <p className="text-xs text-[#5F6C7B] mt-2">
                        Recommended: Square image, at least 512x512px (PNG or JPG)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#1C64F2] hover:bg-[#1C64F2]/90 text-white rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    Continue to Products
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
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
