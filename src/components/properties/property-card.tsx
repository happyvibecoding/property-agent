'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Copy, 
  Edit, 
  GitBranch, 
  Mail, 
  Eye, 
  MapPin,
  Check,
  MoreVertical
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
  onEdit: (propertyId: string) => void
  onViewPipeline: (propertyId: string) => void
}

export function PropertyCard({ property, onCopyEmail, onEdit, onViewPipeline }: PropertyCardProps) {
  const [emailCopied, setEmailCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleCopyEmail = async () => {
    await onCopyEmail(property.email)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
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

        {/* Email badge */}
        <div className="email-badge bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-gray-700 flex-1 truncate mr-3">
              📧 {property.email}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyEmail}
              className={`transition-all duration-200 ${
                emailCopied 
                  ? 'bg-green-500 hover:bg-green-600 text-white border-green-500' 
                  : 'hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              {emailCopied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
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

        {/* Hover actions */}
        <div className={`hover-actions flex gap-2 transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(property.id)}
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewPipeline(property.id)}
            className="flex-1 hover:bg-green-50 hover:border-green-300"
          >
            <GitBranch className="w-3 h-3 mr-1" />
            Pipeline
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="px-2 hover:bg-gray-50 hover:border-gray-300"
          >
            <MoreVertical className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}