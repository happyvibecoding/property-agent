'use client'

import { useState } from 'react'
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Home, 
  Calendar, 
  FileText, 
  MessageSquare,
  UserCheck,
  UserX,
  Clock,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Applicant } from '@/types/pipeline'
import { formatDistanceToNow, format } from 'date-fns'

interface ApplicantDetailModalProps {
  applicant: Applicant
  isOpen: boolean
  onClose: () => void
  onMessage: (applicant: Applicant) => void
  onApprove: (applicant: Applicant) => void
  onReject: (applicant: Applicant) => void
  onRequestInfo: (applicant: Applicant) => void
}

export function ApplicantDetailModal({
  applicant,
  isOpen,
  onClose,
  onMessage,
  onApprove,
  onReject,
  onRequestInfo
}: ApplicantDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline' | 'communication'>('overview')

  if (!isOpen) return null

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500'
    if (score >= 8.5) return 'text-green-600'
    if (score >= 7) return 'text-blue-600'
    return 'text-amber-600'
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'screening': return 'bg-yellow-100 text-yellow-800'
      case 'documents': return 'bg-orange-100 text-orange-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const documents = applicant.documents ? [
    { name: 'Credit Check', completed: applicant.documents.creditCheck, required: true },
    { name: 'Income Verification', completed: applicant.documents.incomeVerification, required: true },
    { name: 'Employment Letter', completed: applicant.documents.employment, required: true },
    { name: 'References', completed: applicant.documents.references, required: false }
  ] : []

  const timelineEvents = [
    {
      date: applicant.appliedDate,
      title: 'Application Submitted',
      description: 'Initial application received',
      type: 'application'
    },
    {
      date: applicant.lastActivity,
      title: 'Last Activity',
      description: 'Profile updated',
      type: 'activity'
    }
    // Add more timeline events as needed
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'communication', label: 'Messages', icon: MessageSquare }
  ]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {applicant.name}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStageColor(applicant.stage)}`}>
                    {applicant.stage.charAt(0).toUpperCase() + applicant.stage.slice(1)}
                  </span>
                  {applicant.priority && applicant.priority !== 'low' && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      applicant.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      🔥 {applicant.priority.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Contact Information */}
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{applicant.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">{applicant.phone}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Property Information */}
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Property Interest</h3>
                  <div className="flex items-center space-x-3">
                    <Home className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Applying for</p>
                      <p className="font-medium text-gray-900">{applicant.propertyAddress}</p>
                    </div>
                  </div>
                </Card>

                {/* Application Status */}
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Application Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Days in Current Stage</p>
                        <p className="font-medium text-gray-900">{applicant.daysInStage} days</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Applied</p>
                        <p className="font-medium text-gray-900">
                          {format(applicant.appliedDate, 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    {applicant.aiScore && (
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">AI Score</p>
                          <p className={`font-medium ${getScoreColor(applicant.aiScore)}`}>
                            {applicant.aiScore.toFixed(1)}/10
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Document Checklist</h3>
                  <div className="space-y-3">
                    {documents.map((doc, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {doc.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : doc.required ? (
                              <XCircle className="w-5 h-5 text-red-500" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-gray-400" />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-600">
                                {doc.required ? 'Required' : 'Optional'} • 
                                {doc.completed ? ' Completed' : ' Pending'}
                              </p>
                            </div>
                          </div>
                          
                          {doc.completed && (
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900 mb-4">Application Timeline</h3>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {timelineEvents.map((event, index) => (
                      <li key={index}>
                        <div className="relative pb-8">
                          {index !== timelineEvents.length - 1 && (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                              <Calendar className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {event.title}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {event.description}
                                </p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                <p>{format(event.date, 'MMM d')}</p>
                                <p>{formatDistanceToNow(event.date, { addSuffix: true })}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'communication' && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start a conversation with this applicant
                  </p>
                  <div className="mt-6">
                    <Button onClick={() => onMessage(applicant)}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => onRequestInfo(applicant)}
              >
                Request Info
              </Button>
              <Button
                variant="outline"
                onClick={() => onMessage(applicant)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              {applicant.stage !== 'rejected' && (
                <Button
                  variant="outline"
                  onClick={() => onReject(applicant)}
                  className="text-red-700 border-red-200 hover:bg-red-50"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              )}
              {applicant.stage !== 'approved' && (
                <Button
                  onClick={() => onApprove(applicant)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}