'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { 
  User, 
  Mail, 
  Phone, 
  Home, 
  DollarSign, 
  Clock, 
  Calendar,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  GripVertical,
  MoreVertical,
  MessageSquare,
  UserCheck,
  UserX,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Applicant } from '@/types/pipeline'
import { formatDistanceToNow } from 'date-fns'

interface ApplicantCardProps {
  applicant: Applicant
  onMessage: (applicant: Applicant) => void
  onApprove: (applicant: Applicant) => void
  onReject: (applicant: Applicant) => void
  onViewDetails: (applicant: Applicant) => void
}

export function ApplicantCard({ 
  applicant, 
  onMessage, 
  onApprove, 
  onReject, 
  onViewDetails 
}: ApplicantCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: applicant.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-amber-200 bg-amber-50'
      default: return 'border-gray-200 bg-white'
    }
  }

  const getDaysInStageColor = (days: number) => {
    if (days > 7) return 'text-red-600'
    if (days > 3) return 'text-amber-600'
    return 'text-gray-600'
  }

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500'
    if (score >= 8.5) return 'text-green-600'
    if (score >= 7) return 'text-blue-600'
    return 'text-amber-600'
  }

  const getDocumentStatus = () => {
    if (!applicant.documents) return { complete: 0, total: 4 }
    
    const docs = applicant.documents
    const complete = [
      docs.creditCheck,
      docs.incomeVerification,
      docs.employment,
      docs.references
    ].filter(Boolean).length
    
    return { complete, total: 4 }
  }

  const { complete, total } = getDocumentStatus()
  const completionRate = (complete / total) * 100

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`
        p-4 mb-3 cursor-grab active:cursor-grabbing transition-all duration-200
        hover:shadow-md border ${getPriorityColor(applicant.priority)}
        ${isDragging ? 'opacity-50 transform rotate-2 shadow-lg z-50' : ''}
      `}
    >
      {/* Header with drag handle and menu */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center flex-1">
          <div
            {...listeners}
            className="text-gray-400 hover:text-gray-600 cursor-grab mr-2 p-1"
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-base leading-tight">
              {applicant.name}
            </h4>
            {applicant.priority && applicant.priority !== 'low' && (
              <span className={`
                inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium mt-1
                ${applicant.priority === 'high' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-amber-100 text-amber-800'
                }
              `}>
                🔥 {applicant.priority.toUpperCase()}
              </span>
            )}
          </div>
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
          
          {isMenuOpen && (
            <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={() => { onViewDetails(applicant); setIsMenuOpen(false) }}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button
                  onClick={() => { onMessage(applicant); setIsMenuOpen(false) }}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </button>
                {applicant.stage !== 'approved' && (
                  <button
                    onClick={() => { onApprove(applicant); setIsMenuOpen(false) }}
                    className="w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                )}
                {applicant.stage !== 'rejected' && (
                  <button
                    onClick={() => { onReject(applicant); setIsMenuOpen(false) }}
                    className="w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          <span className="truncate">{applicant.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2 text-gray-400" />
          <span>{applicant.phone}</span>
        </div>
      </div>

      {/* Property Information */}
      <div className="border-b border-gray-100 pb-3 mb-3">
        <div className="flex items-center text-sm text-gray-700 mb-1">
          <Home className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-medium">{applicant.propertyAddress}</span>
        </div>
      </div>

      {/* Time Tracking */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          <span className={`font-medium ${getDaysInStageColor(applicant.daysInStage)}`}>
            {applicant.daysInStage} days in stage
          </span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-2" />
          <span>Applied {formatDistanceToNow(applicant.appliedDate, { addSuffix: true })}</span>
        </div>
      </div>

      {/* AI Score */}
      {applicant.aiScore && (
        <div className="bg-blue-50 rounded-lg p-2 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">AI Score</span>
            </div>
            <span className={`text-lg font-bold ${getScoreColor(applicant.aiScore)}`}>
              {applicant.aiScore.toFixed(1)}/10
            </span>
          </div>
        </div>
      )}

      {/* Document Status */}
      {applicant.documents && (
        <div className="space-y-2 mb-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Documents</span>
            <span className="text-xs text-gray-500">{complete}/{total}</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs">
                {applicant.documents.creditCheck ? (
                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-500 mr-1" />
                )}
                <span className={applicant.documents.creditCheck ? 'text-green-700' : 'text-red-700'}>
                  Credit Check
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs">
                {applicant.documents.incomeVerification ? (
                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-amber-500 mr-1" />
                )}
                <span className={applicant.documents.incomeVerification ? 'text-green-700' : 'text-amber-700'}>
                  Income Verification
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onMessage(applicant)}
          className="flex-1 text-xs h-7 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          Message
        </Button>
        
        {applicant.stage !== 'approved' && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onApprove(applicant)}
            className="flex-1 text-xs h-7 bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
          >
            <UserCheck className="w-3 h-3 mr-1" />
            Approve
          </Button>
        )}
        
        {applicant.stage !== 'rejected' && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onReject(applicant)}
            className="flex-1 text-xs h-7 bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
          >
            <UserX className="w-3 h-3 mr-1" />
            Reject
          </Button>
        )}
      </div>

      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </Card>
  )
}