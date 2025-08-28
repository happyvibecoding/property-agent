'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MagicEmailCopy } from '@/components/magic-email-copy'
import { 
  MessageCircle, 
  Mail, 
  MapPin
} from 'lucide-react'

interface Property {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  rent: number
  bedrooms: number
  bathrooms: number
  status: 'available' | 'pending' | 'rented'
  image: string
  email: string
  applications: number
  messages: number
  views: number
  isOccupied: boolean
  description: string
}

interface PropertyCardProps {
  property: Property
  onCopyEmail: (email: string) => void
  onViewPipeline: (propertyId: string) => void
}

export function PropertyCard({ property, onCopyEmail, onViewPipeline }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleCopyEmail = async () => {
    await onCopyEmail(property.email)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-amber-100 text-amber-800'
      case 'rented':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <Card 
      className="property-card overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Property image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {/* Placeholder image with gradient */}
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-white/50" />
        </div>
        
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
            {getStatusLabel(property.status)}
          </span>
        </div>
        
        {/* Occupied badge */}
        {property.isOccupied && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Occupied
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Property details */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-1">
            {property.address}
          </h3>
          <p className="text-sm text-gray-500">
            {property.city}, {property.state} {property.zipCode}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${property.rent.toLocaleString()}/month
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {property.bedrooms} bed • {property.bathrooms} bath
          </p>
        </div>

        {/* Email badge with magic copy */}
        <div className="email-badge bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-1">
                <Mail className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-xs font-medium text-blue-900 uppercase tracking-wide">AI Email</span>
              </div>
              <span className="text-sm font-mono text-gray-700 truncate block">
                {property.email}
              </span>
            </div>
            <MagicEmailCopy 
              email={property.email}
              className="ml-3 shadow-sm"
            />
          </div>
          <p className="text-xs text-blue-700 mt-2 opacity-80">
            ✨ All emails to this address are handled by AI
          </p>
        </div>

        {/* Quick stats */}
        <div className="stats-row grid grid-cols-3 gap-4">
          <div className="stat-item text-center py-2 bg-gray-50 rounded transition-transform duration-200 hover:scale-105">
            <div className="stat-number text-lg font-semibold text-gray-900">
              {property.applications}
            </div>
            <div className="stat-label text-xs text-gray-500 uppercase tracking-wide">
              Apps
            </div>
          </div>
          <div className="stat-item text-center py-2 bg-gray-50 rounded transition-transform duration-200 hover:scale-105">
            <div className="stat-number text-lg font-semibold text-gray-900">
              {property.messages}
            </div>
            <div className="stat-label text-xs text-gray-500 uppercase tracking-wide">
              Msgs
            </div>
          </div>
          <div className="stat-item text-center py-2 bg-gray-50 rounded transition-transform duration-200 hover:scale-105">
            <div className="stat-number text-lg font-semibold text-gray-900">
              {property.views}
            </div>
            <div className="stat-label text-xs text-gray-500 uppercase tracking-wide">
              Views
            </div>
          </div>
        </div>

        {/* Simplified action */}
        <div className={`hover-actions transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewPipeline(property.id)}
            className="w-full hover:bg-blue-50 hover:border-blue-300"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            View AI Conversations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}