'use client'

import { Mail, MailOpen, Star, Clock } from 'lucide-react'
import { Conversation } from '@/types/inbox'
import { cn } from '@/lib/utils'

interface InboxStatsProps {
  conversations: Conversation[]
}

export function InboxStats({ conversations }: InboxStatsProps) {
  const stats = {
    total: conversations.length,
    unread: conversations.filter(c => c.unreadCount > 0).length,
    starred: conversations.filter(c => c.isStarred).length,
    avgResponseTime: '1.2 hours' // This would be calculated from actual data
  }

  return (
    <div className="flex items-center space-x-6">
      {/* Total Conversations */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
          <Mail className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>

      {/* Unread Messages */}
      <div className="flex items-center space-x-2">
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full",
          stats.unread > 0 ? "bg-red-100" : "bg-gray-100"
        )}>
          <MailOpen className={cn(
            "w-4 h-4",
            stats.unread > 0 ? "text-red-600" : "text-gray-400"
          )} />
        </div>
        <div>
          <div className={cn(
            "text-sm font-semibold",
            stats.unread > 0 ? "text-red-600" : "text-gray-900"
          )}>
            {stats.unread}
          </div>
          <div className="text-xs text-gray-500">Unread</div>
        </div>
      </div>

      {/* Starred */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
          <Star className="w-4 h-4 text-yellow-600" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{stats.starred}</div>
          <div className="text-xs text-gray-500">Starred</div>
        </div>
      </div>

      {/* Average Response Time */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
          <Clock className="w-4 h-4 text-green-600" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{stats.avgResponseTime}</div>
          <div className="text-xs text-gray-500">Avg Response</div>
        </div>
      </div>
    </div>
  )
}