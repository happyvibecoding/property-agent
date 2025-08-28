'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, Users, Mail, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface Stat {
  id: string
  title: string
  value: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  href: string
  description: string
}

// Mock data - in real app this would come from an API
const mockStats: Stat[] = [
  {
    id: 'active-listings',
    title: 'Active Listings',
    value: 12,
    change: 2,
    changeType: 'increase',
    icon: Building,
    href: '/dashboard/properties',
    description: '+2 from last month'
  },
  {
    id: 'total-applications',
    title: 'Total Applications',
    value: 47,
    change: 15,
    changeType: 'increase',
    icon: Users,
    href: '/dashboard/pipeline',
    description: '+15 this week'
  },
  {
    id: 'unread-messages',
    title: 'Unread Messages',
    value: 8,
    change: -3,
    changeType: 'decrease',
    icon: Mail,
    href: '/dashboard/inbox',
    description: '3 less than yesterday'
  },
  {
    id: 'vacancy-rate',
    title: 'Vacancy Rate',
    value: 25,
    change: -5,
    changeType: 'decrease',
    icon: TrendingUp,
    href: '/dashboard/properties?filter=vacant',
    description: '5% improvement'
  }
]

export function StatsOverview() {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})

  // Animated counter effect
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    
    mockStats.forEach(stat => {
      let current = 0
      const increment = stat.value / 30 // Animate over ~500ms
      
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setAnimatedValues(prev => ({ ...prev, [stat.id]: Math.floor(current) }))
      }, 16) // ~60fps
      
      timers.push(timer)
    })

    return () => timers.forEach(clearInterval)
  }, [])

  const handleStatClick = (href: string) => {
    // In a real app, you'd use router.push(href) here
    console.log('Navigate to:', href)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockStats.map((stat) => {
        const animatedValue = animatedValues[stat.id] ?? 0
        const Icon = stat.icon
        const isPercentage = stat.id === 'vacancy-rate'
        
        return (
          <Card 
            key={stat.id}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 group"
            onClick={() => handleStatClick(stat.href)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                {/* Main value with animation */}
                <div className="text-2xl font-bold text-gray-900">
                  {animatedValue}{isPercentage ? '%' : ''}
                </div>
                
                {/* Change indicator */}
                <div className="flex items-center space-x-1">
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : stat.changeType === 'decrease' ? (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  ) : null}
                  
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'increase' 
                      ? 'text-green-600' 
                      : stat.changeType === 'decrease'
                      ? 'text-red-600'
                      : 'text-gray-500'
                  }`}>
                    {stat.changeType === 'increase' && '+'}
                    {Math.abs(stat.change)}{isPercentage ? '%' : ''}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    {stat.description.replace(/^\+?\-?\d+%?\s*/, '')}
                  </span>
                </div>
                
                {/* Hover effect indicator */}
                <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Click to view details →
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}