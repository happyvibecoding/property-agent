'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/protected-route'
import { MessageThread } from '@/components/inbox/message-thread'
import { AIResponsePanel } from '@/components/ai-response-panel'
import { Button } from '@/components/ui/button'
import { ArrowLeft, User } from 'lucide-react'

// Mock data - in real app would fetch based on conversation ID
const mockConversation = {
  id: '1',
  propertyId: '1',
  propertyAddress: '123 Main Street',
  propertyEmail: 'property-123main@airent.com',
  applicantName: 'Sarah Johnson',
  applicantEmail: 'sarah.johnson@email.com',
  subject: 'Interested in 2BR apartment',
  messages: [
    {
      id: '1',
      from: 'sarah.johnson@email.com',
      to: 'property-123main@airent.com',
      subject: 'Interested in 2BR apartment',
      content: `Hi there,

I'm very interested in the 2-bedroom apartment at 123 Main Street that I saw listed online. The photos look great and the location seems perfect for my commute.

When would be a good time to schedule a viewing? I'm available most afternoons this week and flexible on weekends.

Also, could you tell me:
- What's the move-in timeline?
- Are pets allowed?
- What utilities are included in rent?

Looking forward to hearing from you!

Best regards,
Sarah Johnson
(555) 123-4567`,
      timestamp: '2 hours ago',
      type: 'received' as const
    }
  ]
}

const mockAIResponse = {
  subject: 'Re: Interested in 2BR apartment',
  content: `Hi Sarah,

Thank you for your interest in our beautiful 2-bedroom apartment at 123 Main Street! I'm delighted to hear it caught your eye.

I'd be happy to schedule a viewing for you. Based on your availability, how about this Thursday afternoon around 3 PM? If that doesn't work, I also have slots available Friday at 2 PM or Saturday morning at 10 AM.

To answer your questions:
• Move-in timeline: The unit is available for immediate occupancy
• Pets: Yes, we welcome pets with a $300 pet deposit (cats and dogs under 50lbs)
• Utilities: Water, sewer, and trash are included. Electricity and gas are tenant responsibility

The monthly rent is $3,500 and we require first month, last month, and security deposit equal to one month's rent.

Please let me know which viewing time works best for you, and I'll send you the address and parking instructions.

Best regards,
Property Management Team
123 Main Street Apartments`,
  confidence: 92,
  tone: 'Professional & Welcoming'
}

export default function ConversationPage() {
  const params = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [currentResponse, setCurrentResponse] = useState(mockAIResponse)

  const handleSend = () => {
    // In real app, would send the email
    console.log('Sending response:', currentResponse)
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleRegenerate = () => {
    // In real app, would call AI API to regenerate
    setCurrentResponse({
      ...currentResponse,
      confidence: Math.floor(Math.random() * 20) + 80
    })
  }

  const handleResponseChange = (response: typeof mockAIResponse) => {
    setCurrentResponse(response)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    {mockConversation.applicantName}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {mockConversation.propertyAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - 3 panel layout */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Message Thread - Center Panel */}
          <div className="flex-1 overflow-y-auto p-6">
            <MessageThread
              messages={mockConversation.messages}
              propertyEmail={mockConversation.propertyEmail}
            />
          </div>

          {/* AI Response Panel - Right Sidebar */}
          <div className="w-96 border-l border-gray-200 bg-white">
            <AIResponsePanel
              response={currentResponse}
              isEditing={isEditing}
              onSend={handleSend}
              onEdit={handleEdit}
              onRegenerate={handleRegenerate}
              onResponseChange={handleResponseChange}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}