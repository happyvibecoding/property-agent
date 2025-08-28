// Mock property data
export const mockProperties = [
  {
    id: '1',
    title: '123 Main St',
    address: '123 Main St, Anytown, ST 12345',
    rent: 2500,
    status: 'available' as const,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    images: ['/api/placeholder/400/300'],
    description: 'Beautiful 2BR apartment in downtown',
  },
  {
    id: '2',
    title: '456 Oak Ave',
    address: '456 Oak Ave, Somewhere, ST 12345',
    rent: 1800,
    status: 'occupied' as const,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    images: ['/api/placeholder/400/300'],
    description: 'Cozy 1BR apartment with great amenities',
  }
]

// Mock applicant data
export const mockApplicants = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    stage: 'application-submitted' as const,
    property: '123 Main St',
    applicationDate: '2024-01-15',
    score: 85,
    income: 75000,
    notes: 'Good credit score, stable employment',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    stage: 'screening' as const,
    property: '456 Oak Ave',
    applicationDate: '2024-01-10',
    score: 92,
    income: 85000,
    notes: 'Excellent references, previous rental history clean',
  }
]

// Mock conversation data
export const mockConversations = [
  {
    id: '1',
    participantName: 'John Doe',
    participantEmail: 'john@example.com',
    lastMessage: 'Thank you for your quick response!',
    lastMessageTime: '2024-01-15T10:30:00Z',
    unreadCount: 2,
    status: 'active' as const,
    property: '123 Main St',
    messages: [
      {
        id: '1',
        senderId: '1',
        senderName: 'John Doe',
        content: 'Hi, I\'m interested in the apartment at 123 Main St.',
        timestamp: '2024-01-15T09:00:00Z',
        isFromUser: false,
      },
      {
        id: '2',
        senderId: 'manager',
        senderName: 'Property Manager',
        content: 'Hello John! I\'d be happy to help you with information about that property.',
        timestamp: '2024-01-15T09:15:00Z',
        isFromUser: true,
      }
    ]
  },
  {
    id: '2',
    participantName: 'Jane Smith',
    participantEmail: 'jane@example.com',
    lastMessage: 'When can I schedule a viewing?',
    lastMessageTime: '2024-01-14T16:45:00Z',
    unreadCount: 1,
    status: 'active' as const,
    property: '456 Oak Ave',
    messages: [
      {
        id: '3',
        senderId: '2',
        senderName: 'Jane Smith',
        content: 'When can I schedule a viewing?',
        timestamp: '2024-01-14T16:45:00Z',
        isFromUser: false,
      }
    ]
  }
]

// Mock dashboard stats
export const mockDashboardStats = {
  totalProperties: 12,
  availableProperties: 3,
  occupiedProperties: 9,
  totalApplicants: 24,
  newApplicants: 5,
  totalRevenue: 28500,
  monthlyRevenue: 2850,
  occupancyRate: 75
}

// Mock message templates
export const mockMessageTemplates = [
  {
    id: '1',
    name: 'Welcome Message',
    subject: 'Welcome to [Property Name]',
    content: 'Thank you for your interest in [Property Name]. I\'d be happy to help you with any questions.',
    category: 'general' as const
  },
  {
    id: '2',
    name: 'Viewing Request',
    subject: 'Viewing Request - [Property Name]',
    content: 'I can schedule a viewing for [Property Name]. What days and times work best for you?',
    category: 'viewing' as const
  }
]