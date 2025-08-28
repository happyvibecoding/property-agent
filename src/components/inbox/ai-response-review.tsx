'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Bot, 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Star, 
  AlertTriangle,
  Lightbulb,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AiResponseReviewProps {
  content: string
  onApprove: () => void
  onEdit: (editedContent: string) => void
  onReject: () => void
  confidence?: number
  suggestedImprovements?: string[]
}

export function AiResponseReview({
  content,
  onApprove,
  onEdit,
  onReject,
  confidence = 0.92,
  suggestedImprovements = [
    'Consider mentioning available viewing times',
    'Add contact information for follow-up',
    'Include property-specific amenities'
  ]
}: AiResponseReviewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const [showImprovements, setShowImprovements] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      // Auto-resize textarea
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [isEditing])

  const handleSaveEdit = () => {
    onEdit(editedContent)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedContent(content)
    setIsEditing(false)
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600'
    if (score >= 0.7) return 'text-amber-600'
    return 'text-red-600'
  }

  const getConfidenceLabel = (score: number) => {
    if (score >= 0.9) return 'High Confidence'
    if (score >= 0.7) return 'Medium Confidence'
    return 'Low Confidence'
  }

  const applySuggestion = (suggestion: string) => {
    // Simple implementation - in real app this would be more sophisticated
    let newContent = editedContent
    
    if (suggestion.includes('viewing times')) {
      newContent += '\n\nI have availability for viewings:\n• Tomorrow at 2:00 PM\n• This weekend between 10 AM - 4 PM'
    } else if (suggestion.includes('contact information')) {
      newContent += '\n\nFeel free to call me at (555) 123-4567 for any urgent questions.'
    } else if (suggestion.includes('amenities')) {
      newContent += '\n\nThe property includes parking, in-unit laundry, and is pet-friendly.'
    }
    
    setEditedContent(newContent)
    setIsEditing(true)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden m-4">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  AI Generated Response
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={cn('text-sm font-medium', getConfidenceColor(confidence))}>
                    {getConfidenceLabel(confidence)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({Math.round(confidence * 100)}% confidence)
                  </span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" onClick={onReject}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Confidence Indicator */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-purple-900 mb-1">
                    AI Analysis
                  </h3>
                  <p className="text-sm text-purple-700">
                    This response was generated based on the message context and your property details. 
                    The AI has {getConfidenceLabel(confidence).toLowerCase()} in this response's appropriateness.
                  </p>
                  
                  {confidence < 0.8 && (
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-amber-800 font-medium">Review Recommended</p>
                          <p className="text-xs text-amber-700 mt-1">
                            Lower confidence score suggests this response may need editing before sending.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Response Content */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Generated Response</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit'}
                </Button>
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    ref={textareaRef}
                    value={editedContent}
                    onChange={(e) => {
                      setEditedContent(e.target.value)
                      // Auto-resize
                      e.target.style.height = 'auto'
                      e.target.style.height = `${e.target.scrollHeight}px`
                    }}
                    className="w-full min-h-[200px] max-h-[400px] p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Edit the response..."
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveEdit}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="whitespace-pre-wrap text-sm text-gray-900">
                    {editedContent}
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {suggestedImprovements.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
                    Suggested Improvements
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowImprovements(!showImprovements)}
                  >
                    {showImprovements ? 'Hide' : 'Show'} ({suggestedImprovements.length})
                  </Button>
                </div>
                
                {showImprovements && (
                  <div className="space-y-2">
                    {suggestedImprovements.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="text-sm text-blue-900">{suggestion}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => applySuggestion(suggestion)}
                          className="ml-3 text-blue-600 hover:text-blue-800"
                        >
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Preview Changes */}
            {editedContent !== content && !isEditing && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Changes Applied</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your edits have been applied. Review the updated response above before sending.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onReject}>
                <XCircle className="w-4 h-4 mr-2" />
                Reject & Write New
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  onEdit(editedContent)
                  setIsEditing(true)
                }}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit More
              </Button>
              <Button
                onClick={onApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve & Send
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            This message will be sent from your property email address once approved
          </p>
        </div>
      </div>
    </div>
  )
}