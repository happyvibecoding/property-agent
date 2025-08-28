'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Send, 
  Bot, 
  CheckCircle, 
  Clock, 
  Mail, 
  AlertCircle,
  Edit3,
  Smile,
  Paperclip,
  Archive,
  Star,
  MoreHorizontal
} from 'lucide-react'
import { Conversation, Message } from '@/types/inbox'
import { cn } from '@/lib/utils'
import { MessageTemplates } from './message-templates'
import { AiResponseReview } from './ai-response-review'

interface MessageThreadProps {
  conversation: Conversation
  messages: Message[]
  onSendMessage: (content: string, isAiGenerated?: boolean) => void
  isLoading: boolean
}

export function MessageThread({
  conversation,
  messages,
  onSendMessage,
  isLoading
}: MessageThreadProps) {
  const [replyContent, setReplyContent] = useState('')
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showAiReview, setShowAiReview] = useState(false)
  const [aiDraftContent, setAiDraftContent] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [replyContent])

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date))
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-3 h-3 text-gray-400" />
      case 'delivered':
        return <CheckCircle className="w-3 h-3 text-blue-500" />
      case 'read':
        return (
          <div className="flex space-x-0.5">
            <CheckCircle className="w-3 h-3 text-blue-500" />
            <CheckCircle className="w-3 h-3 text-blue-500" />
          </div>
        )
      default:
        return <Clock className="w-3 h-3 text-gray-400" />
    }
  }

  const handleSendReply = () => {
    if (!replyContent.trim()) return

    onSendMessage(replyContent)
    setReplyContent('')
  }

  const handleGenerateAiResponse = async () => {
    setIsGeneratingAi(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const aiContent = generateMockAiResponse(conversation, messages)
      setAiDraftContent(aiContent)
      setShowAiReview(true)
      setIsGeneratingAi(false)
    }, 2000)
  }

  const handleApproveAiResponse = () => {
    onSendMessage(aiDraftContent, true)
    setShowAiReview(false)
    setAiDraftContent('')
  }

  const handleEditAiResponse = (editedContent: string) => {
    setAiDraftContent(editedContent)
  }

  const handleTemplateSelect = (template: string) => {
    setReplyContent(template)
    setShowTemplates(false)
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSendReply()
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Thread Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {conversation.participants.find(p => p !== 'Landlord' && p !== 'AI Assistant')}
            </h2>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Mail className="w-4 h-4 mr-1" />
              <span className="font-mono">{conversation.property.email}</span>
              <span className="mx-2">•</span>
              <span>{conversation.property.address}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isFromLandlord = message.isFromLandlord
              
              return (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    isFromLandlord ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div className={cn(
                    'max-w-[70%] group',
                    isFromLandlord ? 'order-2' : 'order-1'
                  )}>
                    {/* Message bubble */}
                    <div className={cn(
                      'rounded-2xl px-4 py-3 relative',
                      isFromLandlord
                        ? cn(
                            message.isAiGenerated
                              ? 'bg-purple-500 text-white'
                              : 'bg-blue-500 text-white'
                          )
                        : 'bg-gray-100 text-gray-900'
                    )}>
                      {/* AI indicator */}
                      {message.isAiGenerated && (
                        <div className="flex items-center mb-2">
                          <Bot className="w-3 h-3 mr-1 text-purple-200" />
                          <span className="text-xs text-purple-200">
                            AI Generated
                            {message.aiConfidence && (
                              <span className="ml-1">
                                ({Math.round(message.aiConfidence * 100)}% confidence)
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                      
                      {/* Message content */}
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      
                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center space-x-2 p-2 bg-black/10 rounded-lg"
                            >
                              <Paperclip className="w-4 h-4" />
                              <span className="text-sm font-medium">{attachment.name}</span>
                              <span className="text-xs opacity-75">
                                ({(attachment.size / 1024 / 1024).toFixed(1)} MB)
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Message info */}
                    <div className={cn(
                      'flex items-center text-xs text-gray-500 mt-1 space-x-2',
                      isFromLandlord ? 'justify-end' : 'justify-start'
                    )}>
                      <span>{message.sender}</span>
                      <span>•</span>
                      <span>{formatTimestamp(message.timestamp)}</span>
                      {isFromLandlord && (
                        <>
                          <span>•</span>
                          {getMessageStatusIcon(message.status)}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* AI Response Review Modal */}
      {showAiReview && (
        <AiResponseReview
          content={aiDraftContent}
          onApprove={handleApproveAiResponse}
          onEdit={handleEditAiResponse}
          onReject={() => {
            setShowAiReview(false)
            setAiDraftContent('')
          }}
        />
      )}

      {/* Message Templates */}
      {showTemplates && (
        <MessageTemplates
          onTemplateSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
          property={conversation.property}
        />
      )}

      {/* Compose Reply */}
      <div className="border-t border-gray-200 p-4">
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleGenerateAiResponse}
              disabled={isGeneratingAi}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              {isGeneratingAi ? (
                <div className="w-4 h-4 animate-spin border-2 border-purple-600 border-t-transparent rounded-full mr-2" />
              ) : (
                <Bot className="w-4 h-4 mr-2" />
              )}
              {isGeneratingAi ? 'Generating...' : 'Generate AI Response'}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowTemplates(true)}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Templates
            </Button>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your response..."
              className="w-full min-h-[100px] max-h-[200px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            {/* Compose Actions */}
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <Button size="sm" variant="ghost">
                <Smile className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Send Button and Info */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Press Ctrl+Enter to send, or click the send button
            </p>
            
            <Button
              onClick={handleSendReply}
              disabled={!replyContent.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock AI response generator
function generateMockAiResponse(conversation: Conversation, messages: Message[]): string {
  const lastMessage = messages[messages.length - 1]
  const property = conversation.property
  
  // Simple intent detection based on keywords
  const content = lastMessage.content.toLowerCase()
  
  if (content.includes('viewing') || content.includes('visit') || content.includes('see')) {
    return `Hi ${lastMessage.sender},

Thank you for your interest in ${property.address}! I'd be happy to schedule a viewing for you.

I have availability for the following times:
• Tomorrow at 2:00 PM
• This weekend (Saturday or Sunday) between 10 AM - 4 PM

Please let me know what works best for your schedule, and I'll confirm the appointment.

For the viewing, please bring:
• Valid photo ID
• Proof of income (recent pay stubs or employment letter)

Looking forward to showing you the property!

Best regards,
Property Manager`
  }
  
  if (content.includes('application') || content.includes('apply') || content.includes('documents')) {
    return `Hi ${lastMessage.sender},

Great to hear you're ready to move forward with your application for ${property.address}!

To complete your application, please submit the following documents:
• Completed rental application form
• Government-issued photo ID
• Proof of income (last 3 pay stubs or employment letter)
• Bank statements (last 2 months)
• References from previous landlords

You can submit these documents by replying to this email with attachments, or we can arrange a time for you to drop them off in person.

The application processing typically takes 24-48 hours once we receive all required documents.

Please let me know if you have any questions!

Best regards,
Property Manager`
  }
  
  if (content.includes('parking') || content.includes('pets') || content.includes('lease')) {
    return `Hi ${lastMessage.sender},

Thank you for your question about ${property.address}.

Regarding your inquiry:
• Parking: One designated parking spot is included with the rent
• Pet Policy: Small pets are welcome with a $200 pet deposit
• Lease Terms: Standard 12-month lease, with 6-month options available

If you have any other questions about the property or lease terms, please don't hesitate to ask. I'm here to help!

Best regards,
Property Manager`
  }
  
  // Generic response
  return `Hi ${lastMessage.sender},

Thank you for your message regarding ${property.address}. I've received your inquiry and will get back to you shortly with the information you requested.

In the meantime, if you have any urgent questions, please don't hesitate to reach out.

Best regards,
Property Manager`
}