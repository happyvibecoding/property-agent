'use client'

import { useState } from 'react'
import { 
  Filter, 
  Search, 
  Home, 
  Calendar, 
  Users, 
  X,
  CheckSquare,
  Square,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import type { PipelineFilters } from '@/types/pipeline'

interface PipelineFiltersProps {
  filters: PipelineFilters
  onFiltersChange: (filters: PipelineFilters) => void
  properties: { id: string; address: string }[]
  selectedCount?: number
  onBulkAction?: (action: string) => void
}

export function PipelineFilters({
  filters,
  onFiltersChange,
  properties,
  selectedCount = 0,
  onBulkAction
}: PipelineFiltersProps) {
  const [isPropertyDropdownOpen, setIsPropertyDropdownOpen] = useState(false)
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false)

  const getSelectedProperty = () => {
    if (!filters.propertyId) return 'All Properties'
    const property = properties.find(p => p.id === filters.propertyId)
    return property ? property.address : 'All Properties'
  }

  const getDateRangeLabel = () => {
    if (!filters.dateRange) return 'All Time'
    // This would normally format the date range
    return 'This Week'
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = filters.propertyId || filters.dateRange || filters.searchTerm || filters.status

  const bulkActions = [
    { id: 'move-to-screening', label: 'Move to Screening', icon: '📝' },
    { id: 'move-to-documents', label: 'Move to Documents', icon: '📄' },
    { id: 'approve-all', label: 'Approve Selected', icon: '✅' },
    { id: 'reject-all', label: 'Reject Selected', icon: '❌' },
    { id: 'send-email', label: 'Send Template Email', icon: '📧' },
    { id: 'export', label: 'Export Applications', icon: '📊' },
    { id: 'archive', label: 'Archive Selected', icon: '📦' }
  ]

  return (
    <Card className="p-4 mb-6 bg-white border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name, email, or application ID..."
            value={filters.searchTerm || ''}
            onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
            className="pl-10 pr-4 h-10"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-2">
          {/* Property Filter */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsPropertyDropdownOpen(!isPropertyDropdownOpen)}
              className="h-10 px-3 text-sm font-medium"
            >
              <Home className="w-4 h-4 mr-2" />
              {getSelectedProperty()}
              <Filter className="w-3 h-3 ml-2" />
            </Button>
            
            {isPropertyDropdownOpen && (
              <div className="absolute top-12 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="p-2">
                  <div className="py-1">
                    <button
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                        !filters.propertyId ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        onFiltersChange({ ...filters, propertyId: undefined })
                        setIsPropertyDropdownOpen(false)
                      }}
                    >
                      All Properties
                    </button>
                  </div>
                  {properties.map((property) => (
                    <div key={property.id} className="py-1">
                      <button
                        className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                          filters.propertyId === property.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          onFiltersChange({ ...filters, propertyId: property.id })
                          setIsPropertyDropdownOpen(false)
                        }}
                      >
                        {property.address}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date Range Filter */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="h-10 px-3 text-sm font-medium"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {getDateRangeLabel()}
              <Filter className="w-3 h-3 ml-2" />
            </Button>
            
            {isDateDropdownOpen && (
              <div className="absolute top-12 left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="p-2">
                  {['All Time', 'Today', 'This Week', 'This Month', 'Custom Range'].map((option) => (
                    <div key={option} className="py-1">
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100"
                        onClick={() => {
                          // Handle date range selection
                          setIsDateDropdownOpen(false)
                        }}
                      >
                        {option}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="h-10 px-3 text-sm font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              {filters.status || 'All Status'}
              <Filter className="w-3 h-3 ml-2" />
            </Button>
            
            {isStatusDropdownOpen && (
              <div className="absolute top-12 left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="p-2">
                  {['All Status', 'New Applications', 'In Review', 'Pending Documents', 'High Priority'].map((option) => (
                    <div key={option} className="py-1">
                      <button
                        className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                          filters.status === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          onFiltersChange({ 
                            ...filters, 
                            status: option === 'All Status' ? undefined : option 
                          })
                          setIsStatusDropdownOpen(false)
                        }}
                      >
                        {option}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-10 px-3 text-sm text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {selectedCount} selected
            </span>
            
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsBulkActionsOpen(!isBulkActionsOpen)}
                className="h-10 px-3 text-sm font-medium"
              >
                <CheckSquare className="w-4 h-4 mr-2" />
                Bulk Actions
                <MoreHorizontal className="w-3 h-3 ml-2" />
              </Button>
              
              {isBulkActionsOpen && (
                <div className="absolute top-12 right-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Actions for {selectedCount} applicants
                    </div>
                    {bulkActions.map((action) => (
                      <div key={action.id} className="py-1">
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded hover:bg-gray-100 flex items-center"
                          onClick={() => {
                            onBulkAction?.(action.id)
                            setIsBulkActionsOpen(false)
                          }}
                        >
                          <span className="mr-2">{action.icon}</span>
                          {action.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-600">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {filters.propertyId && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Property: {getSelectedProperty()}
                <button
                  onClick={() => onFiltersChange({ ...filters, propertyId: undefined })}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Status: {filters.status}
                <button
                  onClick={() => onFiltersChange({ ...filters, status: undefined })}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Search: "{filters.searchTerm}"
                <button
                  onClick={() => onFiltersChange({ ...filters, searchTerm: undefined })}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Click outside handlers */}
      {(isPropertyDropdownOpen || isDateDropdownOpen || isStatusDropdownOpen || isBulkActionsOpen) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setIsPropertyDropdownOpen(false)
            setIsDateDropdownOpen(false)
            setIsStatusDropdownOpen(false)
            setIsBulkActionsOpen(false)
          }}
        />
      )}
    </Card>
  )
}