'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  X, 
  FileText, 
  Calendar, 
  Home, 
  CheckCircle, 
  XCircle,
  Search,
  Plus
} from 'lucide-react'
import { MessageTemplate } from '@/types/inbox'
import { cn } from '@/lib/utils'

interface MessageTemplatesProps {
  onTemplateSelect: (template: string) => void
  onClose: () => void
  property: {
    id: string
    address: string
    email: string
  }
}

const mockTemplates: MessageTemplate[] = [
  {
    id: 'initial-response',
    name: 'Initial Response',
    category: 'general',
    subject: 'Thank you for your inquiry',
    content: `Hi {name},

Thank you for your interest in {property}! I appreciate you reaching out.

I'd be happy to provide you with more information about the property and answer any questions you may have.

What would you like to know more about?

Best regards,
Property Manager`,
    variables: ['name', 'property']
  },
  {
    id: 'viewing-invitation',
    name: 'Viewing Invitation',
    category: 'viewing',
    subject: 'Schedule a Property Viewing',
    content: `Hi {name},

I'd be delighted to schedule a viewing of {property} for you!

I have availability for the following times:
• {date1} at {time1}
• {date2} at {time2}
• {date3} at {time3}

Please let me know which time works best for you, and I'll confirm the appointment.

For the viewing, please bring a valid photo ID. The viewing typically takes 15-20 minutes.

Looking forward to showing you the property!

Best regards,
Property Manager`,
    variables: ['name', 'property', 'date1', 'time1', 'date2', 'time2', 'date3', 'time3']
  },
  {
    id: 'application-request',
    name: 'Application Request',
    category: 'application',
    subject: 'Next Steps - Rental Application',
    content: `Hi {name},

I'm glad to hear you're interested in moving forward with {property}!

To proceed with your application, please submit the following documents:

📋 Required Documents:
• Completed rental application form
• Government-issued photo ID
• Proof of income (last 3 pay stubs or employment letter)
• Bank statements (last 2 months)
• References from previous landlords (if applicable)

You can submit these documents by:
• Replying to this email with attachments
• Scheduling an in-person meeting

Application processing typically takes 24-48 hours once we receive all required documents.

Please let me know if you have any questions about the process!

Best regards,
Property Manager`,
    variables: ['name', 'property']
  },
  {
    id: 'property-details',
    name: 'Property Details',
    category: 'general',
    subject: 'Property Information - {property}',
    content: `Hi {name},

Thank you for your interest in {property}. Here are the key details about the property:

🏠 Property Features:
• Rent: ${rent}/month
• Bedrooms: {bedrooms}
• Bathrooms: {bathrooms}
• Size: {sqft} sq ft

🏢 Building Amenities:
• Parking: {parking}
• Pet Policy: {petPolicy}
• Utilities: {utilities}

📍 Location Benefits:
• Close to public transportation
• Walking distance to shops and restaurants
• Quiet residential neighborhood

The property is available for move-in on {availableDate}.

Would you like to schedule a viewing? I'm happy to show you around!

Best regards,
Property Manager`,
    variables: ['name', 'property', 'rent', 'bedrooms', 'bathrooms', 'sqft', 'parking', 'petPolicy', 'utilities', 'availableDate']
  },
  {
    id: 'follow-up-viewing',
    name: 'Follow-up After Viewing',
    category: 'viewing',
    subject: 'Following up on your property viewing',
    content: `Hi {name},

It was great meeting you during the viewing of {property} yesterday! I hope you liked what you saw.

I wanted to follow up and see if you have any additional questions about the property or the application process.

If you're ready to move forward, I can send you the application materials right away. The property has generated quite a bit of interest, so I'd recommend submitting your application soon if you're interested.

Feel free to reach out if you need any clarification or have concerns I can address.

Looking forward to hearing from you!

Best regards,
Property Manager`,
    variables: ['name', 'property']
  },
  {
    id: 'application-approved',
    name: 'Application Approved',
    category: 'approval',
    subject: 'Great News - Your Application is Approved!',
    content: `Hi {name},

Congratulations! I'm pleased to inform you that your application for {property} has been approved! 🎉

Next Steps:
1. Review and sign the lease agreement (attached)
2. Pay the first month's rent and security deposit
3. Schedule your move-in date

Total due before move-in:
• First month's rent: ${rent}
• Security deposit: ${deposit}
• Total: ${total}

Please let me know your preferred move-in date, and we'll coordinate the key handover and walkthrough.

Welcome to your new home!

Best regards,
Property Manager`,
    variables: ['name', 'property', 'rent', 'deposit', 'total']
  },
  {
    id: 'application-declined',
    name: 'Application Declined',
    category: 'rejection',
    subject: 'Update on your rental application',
    content: `Hi {name},

Thank you for your interest in {property} and for taking the time to submit your application.

After careful consideration of all applications, I have decided to move forward with another candidate whose application better matches the requirements for this particular property.

This decision was not made lightly, and I want you to know that your application was thoroughly reviewed. The rental market is very competitive right now, and there were many qualified candidates.

I encourage you to continue your search, and I wish you the best of luck in finding the perfect home.

Thank you again for your interest.

Best regards,
Property Manager`,
    variables: ['name', 'property']
  }
]

const categoryIcons = {
  general: FileText,
  viewing: Calendar,
  application: Home,
  approval: CheckCircle,
  rejection: XCircle,
  maintenance: FileText
}

const categoryColors = {
  general: 'bg-gray-100 text-gray-700',
  viewing: 'bg-blue-100 text-blue-700',
  application: 'bg-green-100 text-green-700',
  approval: 'bg-emerald-100 text-emerald-700',
  rejection: 'bg-red-100 text-red-700',
  maintenance: 'bg-orange-100 text-orange-700'
}

export function MessageTemplates({
  onTemplateSelect,
  onClose,
  property
}: MessageTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [previewTemplate, setPreviewTemplate] = useState<MessageTemplate | null>(null)

  const categories = [
    { key: 'all', label: 'All Templates', count: mockTemplates.length },
    { key: 'general', label: 'General', count: mockTemplates.filter(t => t.category === 'general').length },
    { key: 'viewing', label: 'Viewing', count: mockTemplates.filter(t => t.category === 'viewing').length },
    { key: 'application', label: 'Application', count: mockTemplates.filter(t => t.category === 'application').length },
    { key: 'approval', label: 'Approval', count: mockTemplates.filter(t => t.category === 'approval').length },
    { key: 'rejection', label: 'Rejection', count: mockTemplates.filter(t => t.category === 'rejection').length }
  ]

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const processTemplate = (template: MessageTemplate): string => {
    let processed = template.content
    
    // Replace common variables
    processed = processed.replace(/{property}/g, property.address)
    processed = processed.replace(/{name}/g, '[Contact Name]')
    processed = processed.replace(/{rent}/g, '[Monthly Rent]')
    processed = processed.replace(/{bedrooms}/g, '[# Bedrooms]')
    processed = processed.replace(/{bathrooms}/g, '[# Bathrooms]')
    
    // Add placeholder dates/times for viewing templates
    if (template.category === 'viewing') {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const dayAfter = new Date()
      dayAfter.setDate(dayAfter.getDate() + 2)
      
      processed = processed.replace(/{date1}/g, 'Tomorrow')
      processed = processed.replace(/{time1}/g, '2:00 PM')
      processed = processed.replace(/{date2}/g, dayAfter.toLocaleDateString('en-US', { weekday: 'long' }))
      processed = processed.replace(/{time2}/g, '10:00 AM')
      processed = processed.replace(/{date3}/g, 'Sunday')
      processed = processed.replace(/{time3}/g, '1:00 PM')
    }
    
    return processed
  }

  const handleTemplateSelect = (template: MessageTemplate) => {
    const processedContent = processTemplate(template)
    onTemplateSelect(processedContent)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col m-4">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Message Templates</h2>
            <p className="text-sm text-gray-600 mt-1">
              Choose a template to speed up your response
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Categories */}
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors',
                    selectedCategory === category.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <span>{category.label}</span>
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs',
                    selectedCategory === category.key
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-200 text-gray-600'
                  )}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Create Custom Template */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Custom
              </Button>
            </div>
          </div>

          {/* Template List */}
          <div className="flex-1 p-6 overflow-y-auto">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try adjusting your search terms.' : 'No templates in this category.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredTemplates.map(template => {
                  const Icon = categoryIcons[template.category]
                  
                  return (
                    <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center">
                            <Icon className="w-4 h-4 mr-2" />
                            {template.name}
                          </CardTitle>
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            categoryColors[template.category]
                          )}>
                            {template.category}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          {template.content.substring(0, 150)}...
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPreviewTemplate(template)}
                          >
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleTemplateSelect(template)}
                          >
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden m-4">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{previewTemplate.name}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewTemplate(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Subject:</label>
                  <p className="text-sm text-gray-900 mt-1 p-2 bg-gray-50 rounded">
                    {previewTemplate.subject.replace(/{property}/g, property.address)}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Content:</label>
                  <div className="text-sm text-gray-900 mt-1 p-4 bg-gray-50 rounded whitespace-pre-wrap">
                    {processTemplate(previewTemplate)}
                  </div>
                </div>
                
                {previewTemplate.variables.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Variables:</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {previewTemplate.variables.map(variable => (
                        <span
                          key={variable}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {variable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setPreviewTemplate(null)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  handleTemplateSelect(previewTemplate)
                  setPreviewTemplate(null)
                }}
              >
                Use This Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}