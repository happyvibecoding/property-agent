'use client'

import { 
  Users, 
  Clock, 
  TrendingUp, 
  Home,
  Target,
  Activity,
  Calendar,
  CheckCircle
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { PipelineStats } from '@/types/pipeline'

interface PipelineStatsProps {
  stats: PipelineStats
}

export function PipelineStatsBar({ stats }: PipelineStatsProps) {
  const statItems = [
    {
      label: 'Total Applicants',
      value: stats.totalApplicants,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Active in pipeline'
    },
    {
      label: 'Avg. Time in Pipeline',
      value: `${stats.averageTimeInPipeline} days`,
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'From application to decision'
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Applications to approvals'
    },
    {
      label: 'Most Active Property',
      value: stats.mostActiveProperty,
      icon: Home,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Highest application volume',
      isAddress: true
    }
  ]

  const quickMetrics = [
    { label: 'This Week', value: '12', description: 'New applications' },
    { label: 'Pending Review', value: '8', description: 'Awaiting decision' },
    { label: 'Documents Needed', value: '5', description: 'Missing paperwork' },
    { label: 'Ready to Approve', value: '3', description: 'Complete applications' }
  ]

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className={`text-2xl font-bold text-gray-900 ${
                    stat.isAddress ? 'text-base leading-tight' : ''
                  }`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Pipeline Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Metrics */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Pipeline Activity
            </h3>
          </div>
          
          <div className="space-y-4">
            {quickMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">
                    {metric.label}
                  </p>
                  <p className="text-sm text-gray-500">
                    {metric.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    {metric.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Indicators */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Performance Insights
            </h3>
          </div>
          
          <div className="space-y-4">
            {/* Stage Performance */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Fastest Stage
                </span>
                <span className="text-sm text-green-600 font-semibold">
                  New → Screening (1.2 days avg)
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Bottleneck
                </span>
                <span className="text-sm text-amber-600 font-semibold">
                  Documents (6.8 days avg)
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Peak Application Time
                </span>
                <span className="text-sm text-blue-600 font-semibold">
                  Weekends (45% of total)
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  AI Score Accuracy
                </span>
                <span className="text-sm text-purple-600 font-semibold">
                  87% correlation with approvals
                </span>
              </div>
            </div>
            
            {/* Progress Indicators */}
            <div className="pt-4 border-t border-gray-100">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Stage Efficiency</span>
                    <span className="text-green-600 font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Document Completion</span>
                    <span className="text-blue-600 font-medium">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Response Time</span>
                    <span className="text-purple-600 font-medium">91%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}