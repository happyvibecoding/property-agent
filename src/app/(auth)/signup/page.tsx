'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, Check, Building, User, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/components/ui/toast'
import { SuccessAnimation, useSuccessAnimation } from '@/components/success-animation'

const accountSchema = z.object({
  name: z.string().min(1, 'Full name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const propertySchema = z.object({
  companyName: z.string().optional(),
  propertyCount: z.string().min(1, 'Please select property count'),
  experience: z.string().min(1, 'Please select experience level'),
})

type AccountFormData = z.infer<typeof accountSchema>
type PropertyFormData = z.infer<typeof propertySchema>

type FormData = AccountFormData & PropertyFormData

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string>('')
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register } = useAuth()
  const { showToast } = useToast()
  const { isTriggered, trigger: triggerSuccess, reset } = useSuccessAnimation()

  const accountForm = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const propertyForm = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      companyName: '',
      propertyCount: '',
      experience: '',
    },
  })

  const progress = (step / 3) * 100

  const handleAccountSubmit = (data: AccountFormData) => {
    setFormData(prev => ({ ...prev, ...data }))
    setStep(2)
  }

  const handlePropertySubmit = (data: PropertyFormData) => {
    setFormData(prev => ({ ...prev, ...data }))
    setStep(3)
  }

  const handleFinalSubmit = async () => {
    try {
      setError('')
      setIsSubmitting(true)
      
      const completeData = formData as FormData
      
      // Trigger success animation before redirect
      triggerSuccess()
      
      showToast({
        type: 'success',
        title: 'Account created successfully!',
        message: 'Welcome to Property Pro. Redirecting to your dashboard...',
        duration: 3000
      })
      
      await register({
        name: completeData.name,
        email: completeData.email,
        password: completeData.password,
        companyName: completeData.companyName,
      })
    } catch (err) {
      setError('Failed to create account. Please try again.')
      showToast({
        type: 'error',
        title: 'Account creation failed',
        message: 'Please check your information and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Join thousands of property managers who trust Property Pro
        </p>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span className={step >= 1 ? 'text-blue-600' : ''}>Account Info</span>
          <span className={step >= 2 ? 'text-blue-600' : ''}>Property Setup</span>
          <span className={step >= 3 ? 'text-blue-600' : ''}>Confirmation</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Forms */}
      <Card className="border-0 shadow-lg">
        {/* Step 1: Account Information */}
        {step === 1 && (
          <>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold">
                <User className="mr-2 h-5 w-5 text-blue-600" />
                Account Information
              </CardTitle>
              <CardDescription>
                Create your account credentials
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(handleAccountSubmit)} className="space-y-4">
                  <FormField
                    control={accountForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Full name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            autoComplete="name"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email address *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Password *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a secure password"
                              autoComplete="new-password"
                              className="h-11 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Confirm password *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm your password"
                              autoComplete="new-password"
                              className="h-11 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>

              <div className="text-center">
                <span className="text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </span>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 2: Property Setup */}
        {step === 2 && (
          <>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="flex items-center text-xl font-semibold">
                <Building className="mr-2 h-5 w-5 text-blue-600" />
                Property Setup
              </CardTitle>
              <CardDescription>
                Tell us about your property management business
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Form {...propertyForm}>
                <form onSubmit={propertyForm.handleSubmit(handlePropertySubmit)} className="space-y-4">
                  <FormField
                    control={propertyForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Company name (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Smith Properties LLC"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={propertyForm.control}
                    name="propertyCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          How many properties do you manage? *
                        </FormLabel>
                        <FormControl>
                          <select
                            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select number of properties</option>
                            <option value="1-5">1-5 properties</option>
                            <option value="6-20">6-20 properties</option>
                            <option value="21-100">21-100 properties</option>
                            <option value="100+">100+ properties</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={propertyForm.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Property management experience *
                        </FormLabel>
                        <FormControl>
                          <select
                            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select experience level</option>
                            <option value="new">New to property management</option>
                            <option value="1-2">1-2 years experience</option>
                            <option value="3-5">3-5 years experience</option>
                            <option value="5+">5+ years experience</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goBack}
                      className="flex-1 h-11"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 h-11 bg-blue-600 hover:bg-blue-700">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <>
            <CardHeader className="space-y-1 pb-4 text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="flex items-center justify-center text-xl font-semibold">
                <Sparkles className="mr-2 h-5 w-5 text-blue-600" />
                Almost ready!
              </CardTitle>
              <CardDescription>
                Review your information and create your account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Account Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Name:</span>
                  <span className="text-sm text-gray-900">{formData.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Email:</span>
                  <span className="text-sm text-gray-900">{formData.email}</span>
                </div>
                {formData.companyName && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Company:</span>
                      <span className="text-sm text-gray-900">{formData.companyName}</span>
                    </div>
                  </>
                )}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Properties:</span>
                  <span className="text-sm text-gray-900">{formData.propertyCount}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Experience:</span>
                  <span className="text-sm text-gray-900">{formData.experience}</span>
                </div>
              </div>

              {/* What's next */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Access your personalized dashboard</li>
                  <li>• Add your first property listing</li>
                  <li>• Start receiving and managing applications</li>
                  <li>• Get AI assistance for email responses</li>
                </ul>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex-1 h-11"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleFinalSubmit}
                  className="flex-1 h-11 bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <Sparkles className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-gray-700">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline hover:text-gray-700">
          Privacy Policy
        </Link>
      </p>
      
      {/* Success Animation */}
      <SuccessAnimation 
        trigger={isTriggered} 
        onComplete={reset} 
      />
    </div>
  )
}