'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search, Settings, RefreshCw, User, Mail } from 'lucide-react'

// Mock data - simple version
const mockConversations = [
  {
    id: '1',
    senderName: 'Sarah Johnson',
    propertyAddress: '123 Oak Street, Unit 2A',
    lastMessage: "Hi, I'm very interested in viewing this property. Is it still available?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2,
    isStarred: false
  },
  {
    id: '2',
    senderName: 'Mike Chen',
    propertyAddress: '456 Pine Avenue, Unit 1B',
    lastMessage: "Thank you for the quick response! I'll be there at 2 PM sharp.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    unreadCount: 0,
    isStarred: true
  }
]

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [conversations] = useState(mockConversations)
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const formatTimestamp = (date) => {
    const now = new Date()
    const messageDate = new Date(date)
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60)
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return 'Yesterday'
    }
  }

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
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  selectedConversation?.id === conversation.id 
                    ? 'bg-blue-50 border-blue-500' 
                    : 'bg-white border-gray-200'
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{conversation.senderName}</h4>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(conversation.timestamp)}
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 mb-2">
                  {conversation.propertyAddress}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {conversation.lastMessage}
                </p>
                
                {conversation.unreadCount > 0 && (
                  <div className="flex justify-end">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {conversation.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel - Message Thread */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="border-b border-gray-200 p-4">
                <h2 className="font-semibold">{selectedConversation.senderName}</h2>
                <p className="text-sm text-gray-600">{selectedConversation.propertyAddress}</p>
              </div>
              <div className="flex-1 p-6">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p>{selectedConversation.lastMessage}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your response..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button>Send</Button>
                </div>
              </div>
            </>
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
          {selectedConversation ? (
            <div className="p-6">
              <h3 className="font-semibold mb-4">Applicant Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900">{selectedConversation.senderName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Property</label>
                  <p className="text-sm text-gray-900">{selectedConversation.propertyAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <p className="text-sm text-gray-900">New Inquiry</p>
                </div>
              </div>
            </div>
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