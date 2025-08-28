'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PropertyCard } from '@/components/properties/property-card'
import { AddPropertyModal } from '@/components/properties/add-property-modal'
import { 
  Plus, 
  Search, 
  Filter,
  SlidersHorizontal,
  Building
} from 'lucide-react'

// Mock property data
const mockProperties = [
  {
    id: '1',
    address: '123 Oak Street, Unit 2A',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    rent: 3200,
    bedrooms: 2,
    bathrooms: 2,
    status: 'available' as const,
    image: '/api/placeholder/320/200',
    email: 'property-123-oak@platform.com',
    applications: 5,
    messages: 2,
    views: 12,
    isOccupied: false,
    description: 'Beautiful 2-bedroom apartment with modern amenities and city views.'
  },
  {
    id: '2',
    address: '456 Pine Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    rent: 2800,
    bedrooms: 1,
    bathrooms: 1,
    status: 'pending' as const,
    image: '/api/placeholder/320/200',
    email: 'property-456-pine@platform.com',
    applications: 8,
    messages: 4,
    views: 24,
    isOccupied: false,
    description: 'Cozy 1-bedroom in the heart of the city with great transit access.'
  },
  {
    id: '3',
    address: '789 Elm Drive',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94110',
    rent: 4200,
    bedrooms: 3,
    bathrooms: 2.5,
    status: 'rented' as const,
    image: '/api/placeholder/320/200',
    email: 'property-789-elm@platform.com',
    applications: 0,
    messages: 1,
    views: 8,
    isOccupied: true,
    description: 'Spacious 3-bedroom house with private garden and parking.'
  },
  {
    id: '4',
    address: '321 Maple Court',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94118',
    rent: 3600,
    bedrooms: 2,
    bathrooms: 2,
    status: 'available' as const,
    image: '/api/placeholder/320/200',
    email: 'property-321-maple@platform.com',
    applications: 3,
    messages: 1,
    views: 15,
    isOccupied: false,
    description: 'Modern apartment with in-unit laundry and gym access.'
  }
]

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'available', label: 'Available' },
  { value: 'pending', label: 'Pending' },
  { value: 'rented', label: 'Rented' }
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [properties, setProperties] = useState(mockProperties)

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.rent.toString().includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleAddProperty = (propertyData: any) => {
    const newProperty = {
      id: Date.now().toString(),
      ...propertyData,
      status: 'available' as const,
      email: `property-${Date.now()}-${propertyData.address.toLowerCase().replace(/\s+/g, '-')}@platform.com`,
      applications: 0,
      messages: 0,
      views: 0,
      isOccupied: false
    }
    
    setProperties([...properties, newProperty])
    setShowAddModal(false)
  }

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    // In a real app, you'd show a toast notification here
    console.log('Email copied:', email)
  }

  const handleEditProperty = (propertyId: string) => {
    console.log('Edit property:', propertyId)
  }

  const handleViewPipeline = (propertyId: string) => {
    console.log('View pipeline for property:', propertyId)
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600 mt-2">
            Manage your property listings and track their performance
          </p>
        </div>
        
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search properties by address, city, or rent amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {/* Advanced filters */}
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            {/* Reset */}
            {(searchTerm || statusFilter !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
              >
                Reset
              </Button>
            )}
          </div>
          
          {/* Results summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProperties.length} of {properties.length} properties
            {searchTerm && ` matching "${searchTerm}"`}
            {statusFilter !== 'all' && ` with status "${statusOptions.find(opt => opt.value === statusFilter)?.label}"`}
          </div>
        </CardContent>
      </Card>

      {/* Properties grid or empty state */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PropertyCard
                property={property}
                onCopyEmail={handleCopyEmail}
                onEdit={handleEditProperty}
                onViewPipeline={handleViewPipeline}
              />
            </div>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle className="text-xl text-gray-900">
              {searchTerm || statusFilter !== 'all' ? 'No properties found' : 'No properties yet'}
            </CardTitle>
            <CardDescription className="max-w-md mx-auto">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
                : 'Get started by adding your first property listing. Each property will get a unique email address for tenant inquiries.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchTerm || statusFilter !== 'all' ? (
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
              >
                Clear filters
              </Button>
            ) : (
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Property
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Property Modal */}
      <AddPropertyModal 
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProperty}
      />
    </div>
  )
}