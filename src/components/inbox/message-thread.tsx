'use client'

import { useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Mail, 
  User,
  Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  from: string
  to: string
  subject: string
  content: string
  timestamp: string
  type: 'sent' | 'received'
}

interface MessageThreadProps {
  messages: Message[]
  propertyEmail: string
}

export function MessageThread({
  messages,
  propertyEmail
}: MessageThreadProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTimestamp = (timestamp: string) => {
    // Simple timestamp formatting - in real app would parse properly
    return timestamp
  }


  return (
    <div className="space-y-6">
      {/* Email Subject Header */}
      {messages.length > 0 && (
        <Card className="p-4 bg-gray-50 border-l-4 border-l-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{messages[0].subject}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Mail className="w-4 h-4 mr-1" />
                <span className="font-mono">{propertyEmail}</span>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{messages[0].timestamp}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Messages */}
      <div className="space-y-6">
        {messages.map((message) => {
          const isReceived = message.type === 'received'
          
          return (
            <Card key={message.id} className={cn(
              'p-6',
              isReceived ? 'border-l-4 border-l-gray-300' : 'border-l-4 border-l-blue-500'
            )}>
              <div className="flex items-start space-x-4">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  isReceived ? 'bg-gray-100' : 'bg-blue-100'
                )}>
                  <User className={cn(
                    'w-5 h-5',
                    isReceived ? 'text-gray-600' : 'text-blue-600'
                  )} />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">
                        {isReceived ? message.from : 'You'}
                      </span>
                      <span className="text-gray-400 ml-2">to</span>
                      <span className="text-gray-600 ml-2 font-mono text-sm">
                        {isReceived ? message.to : message.from}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
