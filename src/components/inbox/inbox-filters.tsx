'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Filter, 
  X, 
  Mail, 
  MailOpen, 
  Star, 
  Archive,
  MapPin,
  Calendar,
  Paperclip,
  User
} from 'lucide-react'
import { InboxFilter } from '@/types/inbox'
import { cn } from '@/lib/utils'

interface InboxFiltersProps {
  filters: InboxFilter
  onFiltersChange: (filters: InboxFilter) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function InboxFilters({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange
}: InboxFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const statusFilters = [
    { key: 'all', label: 'All', icon: Mail, count: 24 },
    { key: 'unread', label: 'Unread', icon: MailOpen, count: 5 },
    { key: 'starred', label: 'Starred', icon: Star, count: 3 },
    { key: 'archived', label: 'Archived', icon: Archive, count: 12 }
  ]

  const mockProperties = [
    { id: 'prop-1', address: '123 Oak Street' },
    { id: 'prop-2', address: '456 Pine Avenue' },
    { id: 'prop-3', address: '789 Elm Drive' }
  ]

  const handleStatusFilter = (status: 'all' | 'unread' | 'starred' | 'archived') => {
    onFiltersChange({ ...filters, status })
  }

  const handlePropertyFilter = (propertyId: string | undefined) => {
    onFiltersChange({ ...filters, property: propertyId })
  }

  const handleDateRangeFilter = (range: 'today' | 'week' | 'month' | undefined) => {
    if (!range) {
      onFiltersChange({ ...filters, dateRange: undefined })
      return
    }

    const now = new Date()
    const start = new Date()
    
    switch (range) {
      case 'today':
        start.setHours(0, 0, 0, 0)
        break
      case 'week':
        start.setDate(now.getDate() - 7)
        break
      case 'month':
        start.setMonth(now.getMonth() - 1)
        break
    }

    onFiltersChange({ 
      ...filters, 
      dateRange: { start, end: now }
    })
  }

  const clearFilters = () => {
    onFiltersChange({ status: 'all' })
    onSearchChange('')
  }

  const hasActiveFilters = () => {
    return (
      filters.status !== 'all' ||
      filters.property ||
      filters.dateRange ||
      filters.sender ||
      filters.hasAttachment ||
      searchQuery
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search conversations, contacts, or content..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Quick Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => {
          const Icon = filter.icon
          const isActive = filters.status === filter.key
          
          return (
            <button
              key={filter.key}
              onClick={() => handleStatusFilter(filter.key as any)}
              className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{filter.label}</span>
              <span className={cn(
                'px-2 py-0.5 rounded-full text-xs',
                isActive 
                  ? 'bg-blue-200 text-blue-800' 
                  : 'bg-gray-200 text-gray-600'
              )}>
                {filter.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={cn(
            'text-sm',
            showAdvancedFilters && 'bg-blue-50 text-blue-700 border-blue-200'
          )}
        >
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>

        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Property Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Property
              </label>
              <select
                value={filters.property || ''}
                onChange={(e) => handlePropertyFilter(e.target.value || undefined)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Properties</option>
                {mockProperties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.address}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <select
                onChange={(e) => handleDateRangeFilter(e.target.value as any || undefined)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 days</option>
                <option value="month">Last month</option>
              </select>
            </div>
          </div>

          {/* Additional Filter Options */}
          <div className="flex flex-wrap gap-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasAttachment || false}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  hasAttachment: e.target.checked || undefined
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <Paperclip className="w-3 h-3 mr-1" />
                Has Attachments
              </span>
            </label>
          </div>

          {/* Custom Date Range (if needed) */}
          {filters.dateRange && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-blue-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {filters.dateRange.start.toLocaleDateString()} - {filters.dateRange.end.toLocaleDateString()}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFiltersChange({ ...filters, dateRange: undefined })}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {filters.status !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Status: {filters.status}
              <button
                onClick={() => handleStatusFilter('all')}
                className="ml-1 hover:text-blue-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {filters.property && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Property: {mockProperties.find(p => p.id === filters.property)?.address}
              <button
                onClick={() => handlePropertyFilter(undefined)}
                className="ml-1 hover:text-green-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          
          {searchQuery && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Search: "{searchQuery}"
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:text-purple-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}