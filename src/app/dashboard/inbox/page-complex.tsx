'use client'

import { useState, useEffect } from 'react'
import { ConversationList } from '@/components/inbox/conversation-list'
import { MessageThread } from '@/components/inbox/message-thread'
import { ApplicantDetailsPanel } from '@/components/inbox/applicant-details-panel'
import { InboxFilters } from '@/components/inbox/inbox-filters'
import { InboxStats } from '@/components/inbox/inbox-stats'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Settings, RefreshCw, User } from 'lucide-react'
import { Conversation, Message, ApplicantDetails, InboxFilter } from '@/types/inbox'

// Mock data - in real app this would come from API
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: ['Sarah Johnson', 'Landlord'],
    property: {
      id: 'prop-1',
      address: '123 Oak Street, Unit 2A',
      email: 'property-123-oak@platform.com'
    },
    lastMessage: {
      content: "Hi, I'm very interested in viewing this property. Is it still available?",
      sender: 'Sarah Johnson',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isAiGenerated: false
    },
    unreadCount: 2,
    applicantId: 'app-1',
    isStarred: false,
    isArchived: false,
    priority: 'high'
  },
  {
    id: '2',
    participants: ['Mike Chen', 'Landlord'],
    property: {
      id: 'prop-2',
      address: '456 Pine Avenue, Unit 1B',
      email: 'property-456-pine@platform.com'
    },
    lastMessage: {
      content: "Thank you for the quick response! I'll be there at 2 PM sharp.",
      sender: 'Mike Chen',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      isAiGenerated: false
    },
    unreadCount: 0,
    applicantId: 'app-2',
    isStarred: true,
    isArchived: false,
    priority: 'medium'
  },
  {
    id: '3',
    participants: ['Lisa Wong', 'Landlord'],
    property: {
      id: 'prop-3',
      address: '789 Elm Drive, Unit 3C',
      email: 'property-789-elm@platform.com'
    },
    lastMessage: {
      content: "I have all my documents ready. When can I submit my application?",
      sender: 'Lisa Wong',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isAiGenerated: false
    },
    unreadCount: 1,
    applicantId: 'app-3',
    isStarred: false,
    isArchived: false,
    priority: 'medium'
  },
  {
    id: '4',
    participants: ['David Smith', 'Landlord'],
    property: {
      id: 'prop-1',
      address: '123 Oak Street, Unit 2A',
      email: 'property-123-oak@platform.com'
    },
    lastMessage: {
      content: "What's the parking situation like at this property?",
      sender: 'David Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      isAiGenerated: false
    },
    unreadCount: 3,
    applicantId: 'app-4',
    isStarred: false,
    isArchived: false,
    priority: 'low'
  }
]

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: '1',
    sender: 'Sarah Johnson',
    senderEmail: 'sarah.j@email.com',
    content: "Hi! I'm very interested in the 1BR at 123 Oak Street. Is it still available? I can view this weekend if possible.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    isAiGenerated: false,
    status: 'read',
    isFromLandlord: false
  },
  {
    id: 'msg-2',
    conversationId: '1',
    sender: 'AI Assistant',
    senderEmail: 'landlord@platform.com',
    content: "Hi Sarah,\n\nThank you for your interest in 123 Oak Street! Yes, the property is still available. I'd be happy to schedule a viewing this weekend.\n\nAvailable times:\n- Saturday at 2 PM\n- Sunday at 10 AM\n\nPlease let me know what works best for you.\n\nBest regards,\nProperty Manager",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    isAiGenerated: true,
    aiConfidence: 0.92,
    status: 'delivered',
    isFromLandlord: true
  },
  {
    id: 'msg-3',
    conversationId: '1',
    sender: 'Sarah Johnson',
    senderEmail: 'sarah.j@email.com',
    content: "Perfect! Saturday at 2 PM works great for me. Should I bring any documents with me to the viewing?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isAiGenerated: false,
    status: 'read',
    isFromLandlord: false
  }
]

const mockApplicant: ApplicantDetails = {
  id: 'app-1',
  name: 'Sarah Johnson',
  email: 'sarah.j@email.com',
  phone: '(555) 123-4567',
  propertyId: 'prop-1',
  status: 'interested',
  firstContact: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  lastActivity: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  matchScore: 8.5,
  notes: [
    'Very responsive to messages',
    'Mentioned stable employment',
    'Looking for immediate move-in'
  ],
  tags: ['high-priority', 'pre-qualified']
}

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [messages, setMessages] = useState<Message[]>([])
  const [applicantDetails, setApplicantDetails] = useState<ApplicantDetails | null>(null)
  const [filters, setFilters] = useState<InboxFilter>({ status: 'all' })
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileView, setIsMobileView] = useState(false)
  const [mobileActiveTab, setMobileActiveTab] = useState<'conversations' | 'thread' | 'details'>('conversations')

  // Check for mobile view on mount and resize
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    return () => window.removeEventListener('resize', checkMobileView)
  }, [])

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        const conversationMessages = mockMessages.filter(
          msg => msg.conversationId === selectedConversation.id
        )
        setMessages(conversationMessages)
        
        // Load applicant details if available
        if (selectedConversation.applicantId) {
          setApplicantDetails(mockApplicant)
        } else {
          setApplicantDetails(null)
        }
        
        setIsLoading(false)
        
        // Auto-switch to thread view on mobile
        if (isMobileView) {
          setMobileActiveTab('thread')
        }
      }, 500)
    }
  }, [selectedConversation, isMobileView])

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    
    // Mark as read
    if (conversation.unreadCount > 0) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversation.id 
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      )
    }
  }

  const handleSendMessage = (content: string, isAiGenerated: boolean = false) => {
    if (!selectedConversation) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      sender: isAiGenerated ? 'AI Assistant' : 'Landlord',
      senderEmail: 'landlord@platform.com',
      content,
      timestamp: new Date(),
      isAiGenerated,
      status: 'sent',
      isFromLandlord: true
    }

    setMessages(prev => [...prev, newMessage])
    
    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: {
                content: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
                sender: isAiGenerated ? 'AI Assistant' : 'Landlord',
                timestamp: new Date(),
                isAiGenerated
              }
            }
          : conv
      )
    )
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const filteredConversations = conversations.filter(conv => {
    if (filters.status === 'unread' && conv.unreadCount === 0) return false
    if (filters.status === 'starred' && !conv.isStarred) return false
    if (filters.status === 'archived' && !conv.isArchived) return false
    if (filters.property && conv.property.id !== filters.property) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        conv.participants.some(p => p.toLowerCase().includes(query)) ||
        conv.property.address.toLowerCase().includes(query) ||
        conv.lastMessage.content.toLowerCase().includes(query)
      )
    }
    return true
  })

  // Mobile layout with tabs
  if (isMobileView) {
    return (
      <div className="h-full flex flex-col">
        {/* Mobile Header */}
        <div className="border-b border-gray-200 px-4 py-3 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Inbox</h1>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Mobile Tab Navigation */}
          <div className="flex mt-3 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMobileActiveTab('conversations')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                mobileActiveTab === 'conversations'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Conversations
            </button>
            <button
              onClick={() => setMobileActiveTab('thread')}
              disabled={!selectedConversation}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                mobileActiveTab === 'thread'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 disabled:text-gray-400'
              }`}
            >
              Thread
            </button>
            <button
              onClick={() => setMobileActiveTab('details')}
              disabled={!applicantDetails}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                mobileActiveTab === 'details'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 disabled:text-gray-400'
              }`}
            >
              Details
            </button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-hidden">
          {mobileActiveTab === 'conversations' && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <InboxFilters 
                  filters={filters} 
                  onFiltersChange={setFilters}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
              <ConversationList
                conversations={filteredConversations}
                selectedConversation={selectedConversation}
                onConversationSelect={handleConversationSelect}
                isLoading={isLoading}
              />
            </div>
          )}
          
          {mobileActiveTab === 'thread' && selectedConversation && (
            <MessageThread
              conversation={selectedConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          )}
          
          {mobileActiveTab === 'details' && applicantDetails && (
            <div className="h-full overflow-auto">
              <ApplicantDetailsPanel
                applicant={applicantDetails}
                conversation={selectedConversation}
                onStatusUpdate={(status) => {
                  setApplicantDetails(prev => prev ? { ...prev, status } : null)
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  // Desktop layout
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage all your property communications
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <InboxStats conversations={conversations} />
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Conversations */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200">
            <InboxFilters 
              filters={filters} 
              onFiltersChange={setFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          
          <ConversationList
            conversations={filteredConversations}
            selectedConversation={selectedConversation}
            onConversationSelect={handleConversationSelect}
            isLoading={isLoading}
          />
        </div>

        {/* Center Panel - Message Thread */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <MessageThread
              conversation={selectedConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No conversation selected
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Choose a conversation from the sidebar to view messages and respond to inquiries.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Applicant Details */}
        <div className="w-80 border-l border-gray-200 bg-white">
          {applicantDetails && selectedConversation ? (
            <ApplicantDetailsPanel
              applicant={applicantDetails}
              conversation={selectedConversation}
              onStatusUpdate={(status) => {
                setApplicantDetails(prev => prev ? { ...prev, status } : null)
              }}
            />
          ) : (
            <div className="p-6 text-center text-gray-500">
              <User className="mx-auto h-8 w-8 text-gray-400 mb-3" />
              <p className="text-sm">
                Select a conversation to view applicant details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}