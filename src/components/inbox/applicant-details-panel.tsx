'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  TrendingUp,
  Calendar,
  MessageSquare,
  FileText,
  Clock,
  Star,
  Tag,
  Plus,
  MoreVertical,
  ExternalLink
} from 'lucide-react'
import { ApplicantDetails, Conversation } from '@/types/inbox'
import { cn } from '@/lib/utils'

interface ApplicantDetailsPanelProps {
  applicant: ApplicantDetails
  conversation: Conversation | null
  onStatusUpdate: (status: ApplicantDetails['status']) => void
}

export function ApplicantDetailsPanel({
  applicant,
  conversation,
  onStatusUpdate
}: ApplicantDetailsPanelProps) {
  const [selectedStatus, setSelectedStatus] = useState(applicant.status)
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [newNote, setNewNote] = useState('')

  const statusOptions = [
    { value: 'new', label: 'New Inquiry', color: 'bg-gray-100 text-gray-800' },
    { value: 'interested', label: 'Interested', color: 'bg-blue-100 text-blue-800' },
    { value: 'viewing_scheduled', label: 'Viewing Scheduled', color: 'bg-amber-100 text-amber-800' },
    { value: 'application_submitted', label: 'Application Submitted', color: 'bg-purple-100 text-purple-800' },
    { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' }
  ]

  const getCurrentStatus = () => {
    return statusOptions.find(option => option.value === selectedStatus)
  }

  const handleStatusChange = (newStatus: ApplicantDetails['status']) => {
    setSelectedStatus(newStatus)
    onStatusUpdate(newStatus)
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In real app, this would update the applicant via API
      setNewNote('')
      setShowNoteInput(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getMatchScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500'
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-amber-600'
    return 'text-red-600'
  }

  const getMatchScoreLabel = (score?: number) => {
    if (!score) return 'Not scored'
    if (score >= 8) return 'Excellent match'
    if (score >= 6) return 'Good match'
    return 'Fair match'
  }

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Applicant Details</h2>
          <Button variant="outline" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Applicant Avatar and Basic Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              First contact: {formatDate(applicant.firstContact)}
            </div>
          </div>
        </div>

        {/* Status Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Application Status</label>
          <div className="grid grid-cols-2 gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value as ApplicantDetails['status'])}
                className={cn(
                  'p-2 text-xs font-medium rounded-lg border text-left transition-colors',
                  selectedStatus === status.value
                    ? cn(status.color, 'border-gray-300 ring-2 ring-blue-500 ring-offset-1')
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                )}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-600">{applicant.email}</span>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
            
            {applicant.phone && (
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">{applicant.phone}</span>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            )}
            
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-gray-600">
                Last activity: {formatDate(applicant.lastActivity)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Property Interest */}
        {conversation && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Property Interest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">
                  {conversation.property.address}
                </h4>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>Contact via: {conversation.property.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Match Score */}
        {applicant.matchScore && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                AI Match Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className={cn('text-2xl font-bold', getMatchScoreColor(applicant.matchScore))}>
                  {applicant.matchScore}/10
                </span>
                <span className={cn('text-sm font-medium', getMatchScoreColor(applicant.matchScore))}>
                  {getMatchScoreLabel(applicant.matchScore)}
                </span>
              </div>
              
              {/* Score breakdown visualization */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Communication</span>
                  <span>9/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span>Response Time</span>
                  <span>8/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span>Interest Level</span>
                  <span>9/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tags */}
        {applicant.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {applicant.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Notes ({applicant.notes.length})
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNoteInput(true)}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Add Note Input */}
              {showNoteInput && (
                <div className="space-y-2">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about this applicant..."
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowNoteInput(false)
                        setNewNote('')
                      }}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleAddNote}>
                      Add Note
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Existing Notes */}
              {applicant.notes.map((note, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{note}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      Added {formatDate(new Date(Date.now() - index * 1000 * 60 * 60))}
                    </span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-gray-400">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              
              {applicant.notes.length === 0 && !showNoteInput && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No notes yet. Add a note to track important details about this applicant.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Viewing
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Send Application
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Star className="w-4 h-4 mr-2" />
              Add to Favorites
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Convert to Call
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}