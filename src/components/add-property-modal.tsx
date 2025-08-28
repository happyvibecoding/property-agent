'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, Building2, Mail, Loader2 } from 'lucide-react'

const propertySchema = z.object({
  address: z.string().min(1, 'Property address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2, 'State should be 2 characters'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  rent: z.number().min(1, 'Rent amount is required'),
  bedrooms: z.number().min(0, 'Number of bedrooms is required'),
  bathrooms: z.number().min(0.5, 'Number of bathrooms is required'),
})

type PropertyFormData = z.infer<typeof propertySchema>

interface AddPropertyModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (property: PropertyFormData) => void
}

export function AddPropertyModal({ isOpen, onClose, onAdd }: AddPropertyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      rent: 0,
      bedrooms: 1,
      bathrooms: 1,
    },
  })

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      onAdd(data)
      form.reset()
      onClose()
    } catch (error) {
      console.error('Failed to add property:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateEmailPreview = () => {
    const address = form.watch('address')
    if (!address) return 'property-[address]@airent.com'
    
    const cleanAddress = address
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .slice(0, 20)
    
    return `property-${cleanAddress}@airent.com`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <CardTitle className="flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-blue-600" />
            Add New Property
          </CardTitle>
          <CardDescription>
            Create a unique AI email address for this property
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main Street"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City, State, ZIP */}
              <div className="grid grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="San Francisco"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CA"
                          maxLength={2}
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="94102"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Rent, Bed, Bath */}
              <div className="grid grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="rent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rent *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="3500"
                          disabled={isSubmitting}
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          disabled={isSubmitting}
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0.5"
                          step="0.5"
                          disabled={isSubmitting}
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email Preview */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">Your AI Email Address</span>
                </div>
                <div className="font-mono text-sm text-gray-700 bg-white rounded px-3 py-2 border">
                  {generateEmailPreview()}
                </div>
                <p className="text-xs text-blue-700 mt-2 opacity-80">
                  ✨ All emails to this address will be handled by your AI assistant
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding Property...
                    </>
                  ) : (
                    'Add Property'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}