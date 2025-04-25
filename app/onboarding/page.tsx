"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Building2, User, MapPin, Settings, ArrowRight, CheckCircle2 } from "lucide-react"

// Define the form schema with Zod
const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  role: z.enum(["owner", "manager", "cashier", "admin"]),

  // Business Information
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  businessType: z.string(),
  taxId: z.string().optional(),
  businessAddress: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postalCode: z.string().min(5, { message: "Please enter a valid postal code." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),

  // Store Settings
  currency: z.string(),
  language: z.string(),
  timeZone: z.string(),
  receiptFooter: z.string().optional(),

  // Preferences
  notifications: z.array(z.string()).optional(),
  theme: z.enum(["light", "dark", "system"]),
  shortcuts: z.boolean().default(true),
})

type FormValues = z.infer<typeof formSchema>

// Business types options
const businessTypes = [
  "Retail Store",
  "Restaurant",
  "Café",
  "Bakery",
  "Clothing Store",
  "Electronics Store",
  "Grocery Store",
  "Pharmacy",
  "Beauty Salon",
  "Other",
]

// Currency options
const currencies = [
  { value: "EUR", label: "Euro (€)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "GBP", label: "British Pound (£)" },
  { value: "JPY", label: "Japanese Yen (¥)" },
  { value: "CAD", label: "Canadian Dollar (C$)" },
]

// Language options
const languages = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
]

// Timezone options
const timeZones = [
  { value: "Europe/Paris", label: "Paris (GMT+1)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "America/New_York", label: "New York (GMT-5)" },
  { value: "America/Los_Angeles", label: "Los Angeles (GMT-8)" },
  { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
]

// Notification options
const notificationOptions = [
  { id: "low-stock", label: "Low stock alerts" },
  { id: "daily-summary", label: "Daily sales summary" },
  { id: "new-orders", label: "New order notifications" },
  { id: "payment-confirmations", label: "Payment confirmations" },
  { id: "customer-feedback", label: "Customer feedback" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: "owner",
      businessName: "",
      businessType: "Retail Store",
      taxId: "",
      businessAddress: "",
      city: "",
      postalCode: "",
      country: "",
      currency: "EUR",
      language: "fr",
      timeZone: "Europe/Paris",
      receiptFooter: "Thank you for your purchase!",
      notifications: ["low-stock", "daily-summary"],
      theme: "light",
      shortcuts: true,
    },
  })

  // Handle form submission
  function onSubmit(data: FormValues) {
    console.log(data)
    // In a real app, you would save this data to your backend
    // Then redirect to the dashboard
    router.push("/dashboard")
  }

  // Handle next step
  const handleNextStep = async () => {
    const fieldsToValidate = {
      1: ["firstName", "lastName", "phoneNumber", "role"],
      2: ["businessName", "businessType", "businessAddress", "city", "postalCode", "country"],
      3: ["currency", "language", "timeZone"],
    }[step] as Array<keyof FormValues>

    const isValid = await form.trigger(fieldsToValidate)

    if (isValid) {
      if (step < totalSteps) {
        setStep(step + 1)
      } else {
        form.handleSubmit(onSubmit)()
      }
    }
  }

  // Handle previous step
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>Please provide some additional information to set up your POS system.</CardDescription>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <User size={20} />
                    <h2>Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+33 6 12 34 56 78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Role</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="owner" id="owner" />
                              <FormLabel htmlFor="owner" className="font-normal">
                                Business Owner
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="manager" id="manager" />
                              <FormLabel htmlFor="manager" className="font-normal">
                                Store Manager
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cashier" id="cashier" />
                              <FormLabel htmlFor="cashier" className="font-normal">
                                Cashier
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="admin" id="admin" />
                              <FormLabel htmlFor="admin" className="font-normal">
                                System Administrator
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <Building2 size={20} />
                    <h2>Business Information</h2>
                  </div>

                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID / VAT Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="FR12345678900" {...field} />
                        </FormControl>
                        <FormDescription>This will be used on invoices and tax reports.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-2 text-lg font-medium mt-8">
                    <MapPin size={20} />
                    <h2>Address Information</h2>
                  </div>

                  <FormField
                    control={form.control}
                    name="businessAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Paris" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="75001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="France" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <Settings size={20} />
                    <h2>Store Settings</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {currencies.map((currency) => (
                                <SelectItem key={currency.value} value={currency.value}>
                                  {currency.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languages.map((language) => (
                                <SelectItem key={language.value} value={language.value}>
                                  {language.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeZone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Zone</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time zone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeZones.map((timeZone) => (
                                <SelectItem key={timeZone.value} value={timeZone.value}>
                                  {timeZone.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="receiptFooter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receipt Footer Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Thank you for your purchase!" className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>This message will appear at the bottom of all receipts.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <User size={20} />
                    <h2>Preferences</h2>
                  </div>

                  <FormField
                    control={form.control}
                    name="notifications"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Notifications</FormLabel>
                          <FormDescription>Select which notifications you'd like to receive.</FormDescription>
                        </div>
                        {notificationOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="notifications"
                            render={({ field }) => {
                              return (
                                <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), option.id])
                                          : field.onChange(field.value?.filter((value) => value !== option.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{option.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Theme Preference</FormLabel>
                        <FormDescription>Choose your preferred theme for the POS interface.</FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="light" id="light" />
                              <FormLabel htmlFor="light" className="font-normal">
                                Light
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dark" id="dark" />
                              <FormLabel htmlFor="dark" className="font-normal">
                                Dark
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="system" id="system" />
                              <FormLabel htmlFor="system" className="font-normal">
                                System Default
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortcuts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Enable Keyboard Shortcuts</FormLabel>
                          <FormDescription>
                            Use keyboard shortcuts for faster navigation and operations.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-800">Almost done!</h3>
                      <p className="text-green-700 text-sm mt-1">
                        You're just one step away from completing your profile setup. Click "Complete Setup" to finish
                        and start using your POS system.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePreviousStep} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNextStep}>
            {step < totalSteps ? (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
