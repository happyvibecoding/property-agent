'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Applicant, PipelineStage } from '@/types/pipeline'
import { ApplicantCard } from './applicant-card'

interface PipelineColumnProps {
  stage: PipelineStage
  applicants: Applicant[]
  onAddApplicant?: () => void
  onStageSettings?: (stageId: string) => void
  onMessage: (applicant: Applicant) => void
  onApprove: (applicant: Applicant) => void
  onReject: (applicant: Applicant) => void
  onViewDetails: (applicant: Applicant) => void
}

export function PipelineColumn({
  stage,
  applicants,
  onAddApplicant,
  onStageSettings,
  onMessage,
  onApprove,
  onReject,
  onViewDetails
}: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  })

  const getStageColors = (color: string) => {
    const colors = {
      blue: {
        header: 'bg-blue-50 border-blue-200',
        badge: 'bg-blue-500 text-white',
        dropZone: 'border-blue-300 bg-blue-50'
      },
      yellow: {
        header: 'bg-yellow-50 border-yellow-200',
        badge: 'bg-yellow-500 text-white',
        dropZone: 'border-yellow-300 bg-yellow-50'
      },
      orange: {
        header: 'bg-orange-50 border-orange-200',
        badge: 'bg-orange-500 text-white',
        dropZone: 'border-orange-300 bg-orange-50'
      },
      green: {
        header: 'bg-green-50 border-green-200',
        badge: 'bg-green-500 text-white',
        dropZone: 'border-green-300 bg-green-50'
      },
      red: {
        header: 'bg-red-50 border-red-200',
        badge: 'bg-red-500 text-white',
        dropZone: 'border-red-300 bg-red-50'
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const stageColors = getStageColors(stage.color)

  return (
    <div className="flex-1 min-w-80 max-w-sm">
      {/* Column Header */}
      <Card className={`p-4 mb-4 ${stageColors.header}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900 text-lg">
              {stage.title}
            </h3>
            <span className={`
              inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full
              ${stageColors.badge}
            `}>
              {stage.count}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {onAddApplicant && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddApplicant}
                className="text-gray-500 hover:text-gray-700 p-1"
                title="Add applicant"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
            
            {onStageSettings && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStageSettings(stage.id)}
                className="text-gray-500 hover:text-gray-700 p-1"
                title="Stage settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-600">
          {stage.description}
        </p>
      </Card>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`
          min-h-96 rounded-lg border-2 border-dashed transition-all duration-200 p-2
          ${isOver 
            ? `${stageColors.dropZone} scale-102 border-solid` 
            : 'border-gray-200 bg-gray-50'
          }
        `}
      >
        {/* Drop Indicator */}
        {isOver && (
          <div className="text-center py-4 mb-4">
            <div className="text-gray-600 font-medium">Drop here</div>
            <div className="text-sm text-gray-500">
              Move to {stage.title}
            </div>
          </div>
        )}

        {/* Applicant Cards */}
        <SortableContext
          items={applicants.map(a => a.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-0">
            {applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.id}
                applicant={applicant}
                onMessage={onMessage}
                onApprove={onApprove}
                onReject={onReject}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </SortableContext>

        {/* Empty State */}
        {applicants.length === 0 && !isOver && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <svg 
                className="mx-auto h-12 w-12" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">
              No applicants in {stage.title.toLowerCase()}
            </p>
            {stage.id === 'new' && onAddApplicant && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddApplicant}
                className="mt-2 text-gray-500 hover:text-gray-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add first applicant
              </Button>
            )}
          </div>
        )}

        {/* Load More (if needed for pagination) */}
        {applicants.length >= 10 && (
          <div className="text-center pt-4">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-600 hover:text-gray-800"
            >
              Load more...
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}