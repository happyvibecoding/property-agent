'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/protected-route'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageThread } from '@/components/inbox/message-thread'
import { AIResponsePanel } from '@/components/ai-response-panel'
import { ArrowLeft, User, Building, Clock } from 'lucide-react'

// Mock data - in real app this would come from API
const mockConversation = {
  id: '1',
  propertyId: '1',
  property: {
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA'
  },
  applicant: {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com'
  },
  messages: [
    {
      id: '1',
      from: 'sarah.johnson@email.com',
      to: 'property-123main@airent.com',
      subject: 'Interested in 2BR apartment',
      content: 'Hi! I saw your listing for the 2BR apartment and I\'m very interested. Could you tell me more about the neighborhood and when I could schedule a viewing?',
      timestamp: '2024-01-15 10:30 AM',
      type: 'received' as const
    }
  ],
  aiDraft: {
    subject: 'Re: Interested in 2BR apartment',
    content: 'Hi Sarah,\n\nThank you for your interest in our 2BR apartment at 123 Main Street! I\'d be happy to help you learn more about the property and neighborhood.\n\nThe apartment is located in the heart of downtown San Francisco, within walking distance of excellent restaurants, shops, and public transportation. The building features modern amenities including in-unit laundry, updated kitchen appliances, and a rooftop deck with city views.\n\nFor scheduling a viewing, I have availability this week on:\n- Wednesday at 2:00 PM or 4:00 PM\n- Thursday at 10:00 AM or 3:00 PM\n- Saturday at 11:00 AM or 2:00 PM\n\nPlease let me know which time works best for you, and feel free to ask any other questions you might have!\n\nBest regards,\nProperty Management Team',
    confidence: 92,
    tone: 'Professional and welcoming'
  }
}

export default function ConversationPage() {
  const params = useParams()
  const router = useRouter()
  const [aiResponse, setAiResponse] = useState(mockConversation.aiDraft)
  const [isEditingResponse, setIsEditingResponse] = useState(false)

  const handleSendResponse = () => {
    console.log('Sending response:', aiResponse)
    // In real app, this would send the email and update the conversation
    router.push('/dashboard')
  }

  const handleRegenerateResponse = () => {
    console.log('Regenerating AI response...')
    // In real app, this would call the AI service to generate a new response
    setAiResponse({
      ...aiResponse,
      content: aiResponse.content + '\n\n[Regenerated response would appear here]',
      confidence: Math.floor(Math.random() * 20) + 80
    })
  }

  const handleEditResponse = () => {
    setIsEditingResponse(!isEditingResponse)
  }

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{mockConversation.applicant.name}</span>
                <span className="text-gray-400">•</span>
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {mockConversation.property.address}, {mockConversation.property.city}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Last activity: 2 hours ago</span>
            </div>
          </div>
        </div>

        {/* Main Content - 3 Panel Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Conversation List (optional for future) */}
          {/* <div className="w-80 border-r bg-gray-50">
            // Conversation list would go here
          </div> */}

          {/* Center Panel - Message Thread */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <MessageThread 
                messages={mockConversation.messages}
                propertyEmail="property-123main@airent.com"
              />
            </div>
          </div>

          {/* Right Panel - AI Response */}
          <div className="w-96 border-l bg-gray-50 flex flex-col">
            <AIResponsePanel
              response={aiResponse}
              isEditing={isEditingResponse}
              onSend={handleSendResponse}
              onEdit={handleEditResponse}
              onRegenerate={handleRegenerateResponse}
              onResponseChange={setAiResponse}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}