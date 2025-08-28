'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MapPin, 
  Star, 
  StarOff, 
  Archive, 
  MoreVertical,
  Mail,
  Bot,
  Clock,
  Paperclip
} from 'lucide-react'
import { Conversation } from '@/types/inbox'
import { cn } from '@/lib/utils'

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversation: Conversation | null
  onConversationSelect: (conversation: Conversation) => void
  isLoading: boolean
}

export function ConversationList({
  conversations,
  selectedConversation,
  onConversationSelect,
  isLoading
}: ConversationListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const messageDate = new Date(date)
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60)
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const getSenderInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getPriorityColor = (priority: string, isSelected: boolean) => {
    if (isSelected) return 'border-blue-500'
    
    switch (priority) {
      case 'high':
        return 'border-l-red-500'
      case 'medium':
        return 'border-l-amber-500'
      default:
        return 'border-l-transparent'
    }
  }

  const handleStarToggle = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation()
    // TODO: Implement star toggle functionality
  }

  const handleArchive = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation()
    // TODO: Implement archive functionality
  }

  if (isLoading && conversations.length === 0) {
    return (
      <div className="flex-1 p-4">
        {/* Loading skeleton */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-3 p-4 border border-gray-200 rounded-lg animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations</h3>
        <p className="text-gray-600 max-w-sm">
          When tenants email your properties, their conversations will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-2">
        {conversations.map((conversation) => {
          const isSelected = selectedConversation?.id === conversation.id
          const isUnread = conversation.unreadCount > 0
          const lastSender = conversation.lastMessage.sender
          const isHovered = hoveredId === conversation.id
          
          return (
            <div
              key={conversation.id}
              className={cn(
                'group relative p-4 rounded-lg border-l-4 cursor-pointer transition-all duration-200',
                'hover:bg-gray-50 hover:shadow-sm',
                isSelected 
                  ? 'bg-blue-50 border-l-blue-500 shadow-sm' 
                  : cn(
                      'bg-white hover:border-l-gray-300',
                      getPriorityColor(conversation.priority, false)
                    ),
                isUnread && 'ring-1 ring-blue-200'
              )}
              onClick={() => onConversationSelect(conversation)}
              onMouseEnter={() => setHoveredId(conversation.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Unread indicator dot */}
              {isUnread && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full"></div>
              )}

              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                    isSelected 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600'
                  )}>
                    {getSenderInitials(lastSender)}
                  </div>
                  {conversation.priority === 'high' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={cn(
                      'text-sm font-medium truncate',
                      isUnread ? 'text-gray-900 font-semibold' : 'text-gray-700'
                    )}>
                      {lastSender === 'Landlord' || lastSender === 'AI Assistant' 
                        ? conversation.participants.find(p => p !== 'Landlord') 
                        : lastSender
                      }
                    </h4>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      {conversation.lastMessage.isAiGenerated && (
                        <Bot className="w-3 h-3 text-purple-500" />
                      )}
                      <span className={cn(
                        'text-xs',
                        isUnread ? 'text-blue-600 font-medium' : 'text-gray-500'
                      )}>
                        {formatTimestamp(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Property info */}
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">{conversation.property.address}</span>
                  </div>

                  {/* Message preview */}
                  <p className={cn(
                    'text-sm mb-2',
                    isUnread ? 'text-gray-900 font-medium' : 'text-gray-600'
                  )}>
                    {conversation.lastMessage.content}
                  </p>

                  {/* Email indicator */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded truncate max-w-48">
                      {conversation.property.email}
                    </span>
                    
                    {/* Unread count */}
                    {isUnread && (
                      <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Hover actions */}
                  <div className={cn(
                    'flex items-center space-x-1 mt-3 transition-all duration-200',
                    isHovered || isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                  )}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs"
                      onClick={(e) => handleStarToggle(e, conversation.id)}
                    >
                      {conversation.isStarred ? (
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      ) : (
                        <StarOff className="w-3 h-3 text-gray-400" />
                      )}
                      {conversation.isStarred ? 'Starred' : 'Star'}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs"
                      onClick={(e) => handleArchive(e, conversation.id)}
                    >
                      <Archive className="w-3 h-3" />
                      Archive
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Load more indicator */}
      {conversations.length > 0 && (
        <div className="p-4 text-center border-t border-gray-200">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            Load older conversations
          </Button>
        </div>
      )}
    </div>
  )
}