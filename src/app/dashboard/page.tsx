'use client'

import { useState } from 'react'
import { ProtectedRoute } from '@/components/protected-route'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PropertyCard } from '@/components/properties/property-card'
import { ConversationList } from '@/components/conversation-list'
import { AddPropertyModal } from '@/components/add-property-modal'
import { Building, PlusCircle, MessageCircle, Mail } from 'lucide-react'

// Mock data - in real app this would come from API
const mockProperties = [
  {
    id: '1',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    rent: 3500,
    bedrooms: 2,
    bathrooms: 2,
    status: 'available' as const,
    image: '',
    email: 'property-123main@airent.com',
    applications: 8,
    messages: 15,
    views: 47,
    isOccupied: false,
    description: 'Beautiful 2BR/2BA apartment in downtown SF'
  }
]

const mockConversations = [
  {
    id: '1',
    propertyId: '1',
    applicantName: 'Sarah Johnson',
    subject: 'Interested in 2BR apartment',
    lastMessage: 'When can I schedule a viewing?',
    timestamp: '2 hours ago',
    unread: true,
    hasAIDraft: true
  },
  {
    id: '2', 
    propertyId: '1',
    applicantName: 'Mike Chen',
    subject: 'Application questions',
    lastMessage: 'Thanks for the quick response!',
    timestamp: '1 day ago',
    unread: false,
    hasAIDraft: false
  }
]

export default function DashboardPage() {
  const [emailCopied, setEmailCopied] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [properties, setProperties] = useState(mockProperties)
  const hasProperties = properties.length > 0

  const handleCopyEmail = async (email: string) => {
    await navigator.clipboard.writeText(email)
    setEmailCopied(email)
    
    // Trigger sparkle animation
    const sparkles = document.createElement('div')
    sparkles.className = 'fixed inset-0 pointer-events-none z-50'
    sparkles.innerHTML = `
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg font-medium animate-bounce">
          ✨ Your AI assistant is ready!
        </div>
      </div>
    `
    document.body.appendChild(sparkles)
    
    setTimeout(() => {
      document.body.removeChild(sparkles)
      setEmailCopied(null)
    }, 3000)
  }


  const handleViewPipeline = (propertyId: string) => {
    console.log('View pipeline:', propertyId)
  }

  const handleAddProperty = (propertyData: any) => {
    const newProperty = {
      id: Date.now().toString(),
      address: propertyData.address,
      city: propertyData.city,
      state: propertyData.state,
      zipCode: propertyData.zipCode,
      rent: propertyData.rent,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      status: 'available' as const,
      image: '',
      email: `property-${propertyData.address.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '').slice(0, 20)}@airent.com`,
      applications: 0,
      messages: 0,
      views: 0,
      isOccupied: false,
      description: `${propertyData.bedrooms}BR/${propertyData.bathrooms}BA property at ${propertyData.address}`
    }
    setProperties([...properties, newProperty])
  }

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Your properties and AI-powered conversations in one place.
          </p>
        </div>

        {hasProperties ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Properties Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Your Properties</h2>
                <Button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </div>
              
              <div className="grid gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onCopyEmail={handleCopyEmail}
                    onViewPipeline={handleViewPipeline}
                  />
                ))}
              </div>
            </div>

            {/* Conversations Section */}
            <ConversationList conversations={mockConversations} />
          </div>
        ) : (
          /* Empty State */
          <Card className="text-center py-16">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Welcome to AI Email Management!</CardTitle>
              <CardDescription className="max-w-md mx-auto text-base">
                Add your first property to get a unique email address that forwards inquiries to your AI assistant.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Your First Property
              </Button>
              <div className="mt-6 bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">How it works:</span>
                </div>
                <ul className="text-sm text-blue-800 space-y-1 text-left">
                  <li>• Get a unique email for each property</li>
                  <li>• AI reads and categorizes all inquiries</li>
                  <li>• Get suggested responses with one click</li>
                  <li>• Send professional replies instantly</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Add Property Modal */}
        <AddPropertyModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProperty}
        />
      </div>
    </ProtectedRoute>
  )
}