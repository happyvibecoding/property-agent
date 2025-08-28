'use client'

import { ProtectedRoute } from '@/components/protected-route'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { DemoShowcase } from '@/components/demo-showcase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, PlusCircle, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening with your properties today.
          </p>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Quick Actions */}
        <QuickActions />

        {/* Feature Demo Section */}
        <div>
          <div className="flex items-center mb-6">
            <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Interactive Demo</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Experience the professional micro-interactions and animations that make Property Pro delightful to use:
          </p>
          <DemoShowcase />
        </div>

        {/* Getting Started */}
        <Card className="text-center py-12">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Ready to Get Started?</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Add your first property to begin managing applications and communicating with potential tenants.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-blue-600 hover:bg-blue-700 btn-press transition-all duration-150">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Your First Property
            </Button>
          </CardContent>
        </Card>

        {/* Success animation area */}
        <div className="fixed inset-0 pointer-events-none z-50" id="success-animation"></div>
      </div>
    </ProtectedRoute>
  )
}