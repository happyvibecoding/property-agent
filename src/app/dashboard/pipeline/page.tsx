'use client'

import { useState, useMemo } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { 
  BarChart3, 
  Filter,
  Download,
  Settings,
  RefreshCw,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PipelineColumn } from '@/components/pipeline/pipeline-column'
import { PipelineFilters } from '@/components/pipeline/pipeline-filters'
import { PipelineStatsBar } from '@/components/pipeline/pipeline-stats'
import { ApplicantDetailModal } from '@/components/pipeline/applicant-detail-modal'
import type { Applicant, PipelineFilters } from '@/types/pipeline'
import { 
  mockApplicants, 
  pipelineStages, 
  pipelineStats, 
  mockProperties 
} from '@/data/mock-applicants'

export default function PipelinePage() {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants)
  const [filters, setFilters] = useState<PipelineFilters>({})
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [draggedApplicant, setDraggedApplicant] = useState<Applicant | null>(null)
  const [showStats, setShowStats] = useState(true)

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  // Filter applicants based on current filters
  const filteredApplicants = useMemo(() => {
    return applicants.filter(applicant => {
      if (filters.propertyId && applicant.propertyId !== filters.propertyId) {
        return false
      }
      
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase()
        return (
          applicant.name.toLowerCase().includes(searchTerm) ||
          applicant.email.toLowerCase().includes(searchTerm) ||
          applicant.propertyAddress.toLowerCase().includes(searchTerm)
        )
      }
      
      if (filters.status) {
        switch (filters.status) {
          case 'New Applications':
            return applicant.stage === 'new'
          case 'In Review':
            return applicant.stage === 'screening'
          case 'Pending Documents':
            return applicant.stage === 'documents'
          case 'High Priority':
            return applicant.priority === 'high'
          default:
            return true
        }
      }
      
      return true
    })
  }, [applicants, filters])

  // Group applicants by stage
  const applicantsByStage = useMemo(() => {
    return pipelineStages.reduce((acc, stage) => {
      acc[stage.id] = filteredApplicants.filter(app => app.stage === stage.id)
      return acc
    }, {} as Record<string, Applicant[]>)
  }, [filteredApplicants])

  // Update stage counts
  const updatedStages = useMemo(() => {
    return pipelineStages.map(stage => ({
      ...stage,
      count: applicantsByStage[stage.id]?.length || 0
    }))
  }, [applicantsByStage])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const applicant = applicants.find(app => app.id === active.id)
    setDraggedApplicant(applicant || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setDraggedApplicant(null)

    if (!over) return

    const applicantId = active.id as string
    const newStage = over.id as string

    // Find the applicant being moved
    const applicant = applicants.find(app => app.id === applicantId)
    if (!applicant || applicant.stage === newStage) return

    // Update the applicant's stage
    setApplicants(prev => 
      prev.map(app => 
        app.id === applicantId 
          ? { ...app, stage: newStage as Applicant['stage'], daysInStage: 0 }
          : app
      )
    )

    // Show success feedback (you could add a toast notification here)
    console.log(`Moved ${applicant.name} to ${newStage}`)
  }

  const handleMessage = (applicant: Applicant) => {
    console.log('Message applicant:', applicant.name)
    // Implement message functionality
  }

  const handleApprove = (applicant: Applicant) => {
    setApplicants(prev =>
      prev.map(app =>
        app.id === applicant.id
          ? { ...app, stage: 'approved' as Applicant['stage'], daysInStage: 0 }
          : app
      )
    )
    console.log('Approved:', applicant.name)
  }

  const handleReject = (applicant: Applicant) => {
    setApplicants(prev =>
      prev.map(app =>
        app.id === applicant.id
          ? { ...app, stage: 'rejected' as Applicant['stage'], daysInStage: 0 }
          : app
      )
    )
    console.log('Rejected:', applicant.name)
  }

  const handleViewDetails = (applicant: Applicant) => {
    setSelectedApplicant(applicant)
    setIsDetailModalOpen(true)
  }

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action)
    // Implement bulk actions
  }

  const handleRequestInfo = (applicant: Applicant) => {
    console.log('Request info from:', applicant.name)
    // Implement request info functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Application Pipeline
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track tenant applications through your screening process
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowStats(!showStats)}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            {showStats ? 'Hide' : 'Show'} Stats
          </Button>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Automate
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      {showStats && (
        <div className="mb-6">
          <PipelineStatsBar stats={pipelineStats} />
        </div>
      )}

      {/* Filters */}
      <PipelineFilters
        filters={filters}
        onFiltersChange={setFilters}
        properties={mockProperties}
        selectedCount={0} // In a real app, this would track selected applicants
        onBulkAction={handleBulkAction}
      />

      {/* Pipeline Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex gap-6 overflow-x-auto pb-4">
            {updatedStages.map((stage) => (
              <PipelineColumn
                key={stage.id}
                stage={stage}
                applicants={applicantsByStage[stage.id] || []}
                onMessage={handleMessage}
                onApprove={handleApprove}
                onReject={handleReject}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </DndContext>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <ApplicantDetailModal
          applicant={selectedApplicant}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false)
            setSelectedApplicant(null)
          }}
          onMessage={handleMessage}
          onApprove={handleApprove}
          onReject={handleReject}
          onRequestInfo={handleRequestInfo}
        />
      )}

      {/* Mobile responsiveness note */}
      <div className="block md:hidden bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            📱
          </div>
          <div>
            <h3 className="font-medium text-blue-900">Mobile View</h3>
            <p className="text-sm text-blue-700">
              The pipeline is optimized for desktop. On mobile, consider using the list view for better usability.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}