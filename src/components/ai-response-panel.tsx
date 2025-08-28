'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Bot, Send, Edit, RefreshCw, Zap, CheckCircle } from 'lucide-react'

interface AIResponse {
  subject: string
  content: string
  confidence: number
  tone: string
}

interface AIResponsePanelProps {
  response: AIResponse
  isEditing: boolean
  onSend: () => void
  onEdit: () => void
  onRegenerate: () => void
  onResponseChange: (response: AIResponse) => void
}

export function AIResponsePanel({
  response,
  isEditing,
  onSend,
  onEdit,
  onRegenerate,
  onResponseChange
}: AIResponsePanelProps) {
  const [localContent, setLocalContent] = useState(response.content)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
    onRegenerate()
    setIsRegenerating(false)
  }

  const handleContentChange = (newContent: string) => {
    setLocalContent(newContent)
    onResponseChange({
      ...response,
      content: newContent
    })
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50'
    if (confidence >= 75) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 90) return <CheckCircle className="w-3 h-3" />
    if (confidence >= 75) return <Zap className="w-3 h-3" />
    return <Bot className="w-3 h-3" />
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <CardHeader className="pb-4 border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-purple-600" />
            <span>AI Response</span>
          </div>
          <Badge 
            variant="secondary"
            className={`text-xs font-medium ${getConfidenceColor(response.confidence)}`}
          >
            {getConfidenceIcon(response.confidence)}
            <span className="ml-1">{response.confidence}% confident</span>
          </Badge>
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 flex flex-col p-6 space-y-4">
        {/* Tone indicator */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-medium">Tone:</span>
          <Badge variant="outline" className="text-xs">
            {response.tone}
          </Badge>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Subject</label>
          <div className="p-3 bg-gray-50 rounded-lg border text-sm text-gray-800 font-medium">
            {response.subject}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Message</label>
          {isEditing ? (
            <Textarea
              value={localContent}
              onChange={(e) => handleContentChange(e.target.value)}
              className="flex-1 min-h-[300px] resize-none font-mono text-sm"
              placeholder="Edit your AI-generated response..."
            />
          ) : (
            <div className="flex-1 p-4 bg-gray-50 rounded-lg border overflow-y-auto">
              <div className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                {response.content}
              </div>
            </div>
          )}
        </div>

        {/* AI Insights */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-sm font-medium text-blue-900 mb-2">AI Analysis</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Detected inquiry about property viewing</li>
            <li>• Suggested professional, welcoming tone</li>
            <li>• Included key next steps and requirements</li>
            <li>• Provided multiple scheduling options</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4 border-t">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              {isRegenerating ? (
                <div className="w-4 h-4 animate-spin border-2 border-purple-600 border-t-transparent rounded-full mr-2" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              {isRegenerating ? 'Generating...' : 'Regenerate'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className={isEditing ? 'bg-blue-50 border-blue-300' : ''}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Finish Edit' : 'Edit'}
            </Button>
          </div>

          <Button
            onClick={onSend}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
            size="lg"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Response
          </Button>

          <p className="text-xs text-gray-500 text-center">
            This response will be sent from your property email
          </p>
        </div>
      </CardContent>
    </div>
  )
}