'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Clock, Bot } from 'lucide-react'

interface Conversation {
  id: string
  propertyId: string
  applicantName: string
  subject: string
  lastMessage: string
  timestamp: string
  unread: boolean
  hasAIDraft: boolean
}

interface ConversationListProps {
  conversations: Conversation[]
  title?: string
  className?: string
}

export function ConversationList({ 
  conversations, 
  title = "Active Conversations",
  className = ""
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <span className="text-sm text-gray-500">0 conversations</span>
        </div>
        
        <Card className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No conversations yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Share your property email to start receiving inquiries
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500">{conversations.length} total</span>
      </div>
      
      <div className="space-y-3">
        {conversations.map((conversation) => (
          <Link key={conversation.id} href={`/conversation/${conversation.id}`}>
            <Card className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-blue-500 hover:border-l-blue-600 group">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {conversation.applicantName}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {conversation.hasAIDraft && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <Bot className="w-3 h-3 mr-1" />
                        AI Draft Ready
                      </Badge>
                    )}
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <p className="text-sm font-medium text-gray-700 truncate">
                  {conversation.subject}
                </p>
                
                {/* Last message preview */}
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {conversation.lastMessage}
                </p>
                
                {/* Timestamp */}
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{conversation.timestamp}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}