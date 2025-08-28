'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Plus, 
  Users, 
  Mail, 
  Calendar,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const quickActions = [
  {
    id: 'add-property',
    title: 'Add New Property',
    description: 'Create a listing with unique email',
    icon: Plus,
    color: 'bg-blue-500 hover:bg-blue-600',
    textColor: 'text-white',
    href: '/dashboard/properties/new'
  },
  {
    id: 'view-applications',
    title: 'View All Applications',
    description: 'Review pending applications',
    icon: Users,
    color: 'bg-green-500 hover:bg-green-600',
    textColor: 'text-white',
    href: '/dashboard/pipeline'
  },
  {
    id: 'check-messages',
    title: 'Check Messages',
    description: '8 unread messages',
    icon: Mail,
    color: 'bg-orange-500 hover:bg-orange-600',
    textColor: 'text-white',
    href: '/dashboard/inbox'
  },
  {
    id: 'schedule-viewing',
    title: 'Schedule Viewing',
    description: 'Book property tours',
    icon: Calendar,
    color: 'bg-purple-500 hover:bg-purple-600',
    textColor: 'text-white',
    href: '/dashboard/calendar'
  }
]

export function QuickActions() {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)

  const handleActionClick = (href: string) => {
    // In a real app, you'd use router.push(href) here
    console.log('Navigate to:', href)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <CardTitle>Quick Actions</CardTitle>
        </div>
        <CardDescription>
          Jump to the most common tasks
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            const isHovered = hoveredAction === action.id
            
            return (
              <Button
                key={action.id}
                variant="outline"
                className={`
                  h-auto p-4 flex flex-col items-start text-left space-y-2 
                  transition-all duration-200 border-2 hover:shadow-md
                  ${isHovered ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                `}
                onClick={() => handleActionClick(action.href)}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
              >
                <div className="w-full flex items-center justify-between">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200
                    ${isHovered ? action.color : 'bg-gray-100'}
                  `}>
                    <Icon className={`w-5 h-5 ${isHovered ? action.textColor : 'text-gray-600'}`} />
                  </div>
                  
                  <ArrowRight className={`
                    w-4 h-4 transition-all duration-200
                    ${isHovered ? 'text-blue-500 translate-x-1' : 'text-gray-400'}
                  `} />
                </div>
                
                <div className="w-full">
                  <h3 className={`
                    font-semibold text-sm transition-colors duration-200
                    ${isHovered ? 'text-blue-700' : 'text-gray-900'}
                  `}>
                    {action.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {action.description}
                  </p>
                </div>
                
                {/* Hover effect animation */}
                <div className={`
                  absolute inset-0 rounded-md transition-all duration-200 pointer-events-none
                  ${isHovered ? 'bg-gradient-to-br from-blue-500/5 to-purple-500/5' : ''}
                `} />
              </Button>
            )
          })}
        </div>
        
        {/* Additional action hint */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            💡 <strong>Pro tip:</strong> Use keyboard shortcuts to access these actions quickly. 
            Press <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs">Cmd+K</kbd> to open command palette.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}