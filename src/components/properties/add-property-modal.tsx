'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Upload, MapPin, DollarSign, Home, Bed, Bath } from 'lucide-react'

interface AddPropertyModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (propertyData: PropertyFormData) => void
}

interface PropertyFormData {
  address: string
  city: string
  state: string
  zipCode: string
  rent: number
  bedrooms: number
  bathrooms: number
  description: string
  image?: File
}

const initialFormData: PropertyFormData = {
  address: '',
  city: '',
  state: '',
  zipCode: '',
  rent: 0,
  bedrooms: 1,
  bathrooms: 1,
  description: ''
}

export function AddPropertyModal({ open, onClose, onSubmit }: AddPropertyModalProps) {
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (field: keyof PropertyFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onSubmit(formData)
      setShowSuccess(true)
      
      // Reset form and close modal after animation
      setTimeout(() => {
        setFormData(initialFormData)
        setShowSuccess(false)
        setIsSubmitting(false)
        onClose()
      }, 1500)
      
    } catch (error) {
      setIsSubmitting(false)
      console.error('Error creating property:', error)
    }
  }

  const isFormValid = formData.address && formData.city && formData.state && 
    formData.zipCode && formData.rent > 0

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-modal-enter">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success animation overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/95 flex items-center justify-center z-20 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-success-pop">
                <div className="w-8 h-8 text-green-600">✓</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Property Created!</h3>
                <p className="text-gray-600">Unique email address generated successfully</p>
              </div>
            </div>
          </div>
        )}

        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-blue-600" />
            <span>Add New Property</span>
          </CardTitle>
          <CardDescription>
            Create a new property listing with a unique email address for tenant inquiries
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Address Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4" />
                <span>Property Address</span>
              </div>
              
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street, Unit 2A"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="San Francisco"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="CA"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="94105"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4" />
                <span>Property Details</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rent">Monthly Rent</Label>
                  <Input
                    id="rent"
                    type="number"
                    placeholder="3200"
                    value={formData.rent || ''}
                    onChange={(e) => handleInputChange('rent', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="bedrooms">
                    <Bed className="w-4 h-4 inline mr-1" />
                    Bedrooms
                  </Label>
                  <select
                    id="bedrooms"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="bathrooms">
                    <Bath className="w-4 h-4 inline mr-1" />
                    Bathrooms
                  </Label>
                  <select
                    id="bathrooms"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Property Description</Label>
              <textarea
                id="description"
                placeholder="Describe your property's features, amenities, and highlights..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Image Upload Placeholder */}
            <div>
              <Label>Property Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Image upload coming soon
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  For now, properties will use placeholder images
                </p>
              </div>
            </div>

            {/* Generated Email Preview */}
            {isFormValid && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Email Address Preview</h4>
                    <p className="text-sm text-blue-700 mt-1 font-mono">
                      property-{Date.now()}-{formData.address.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}@platform.com
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      This unique email will be generated when you create the property
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  'Create Property'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}