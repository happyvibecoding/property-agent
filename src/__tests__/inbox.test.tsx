import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '@/contexts/auth-context'
import InboxPage from '@/app/dashboard/inbox/page'
import { mockConversations, mockUser } from '@//__tests__/mocks/mock-data'

// Mock Next.js navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/dashboard/inbox',
}))

// Mock ResizeObserver for responsive components
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Helper to render components with auth context
const renderWithAuth = (component: React.ReactElement, isAuthenticated = true) => {
  const mockAuthUser = isAuthenticated ? mockUser : null

  // Store auth data if authenticated
  if (isAuthenticated) {
    localStorage.setItem('auth_token', 'mock_token')
    localStorage.setItem('user_data', JSON.stringify(mockAuthUser))
  }

  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  )
}

// Test data based on inbox page structure
const mockInboxConversations = [
  {
    id: '1',
    senderName: 'Sarah Johnson',
    propertyAddress: '123 Oak Street, Unit 2A',
    lastMessage: "Hi, I'm very interested in viewing this property. Is it still available?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 2,
    isStarred: false
  },
  {
    id: '2',
    senderName: 'Mike Chen',
    propertyAddress: '456 Pine Avenue, Unit 1B',
    lastMessage: "Thank you for the quick response! I'll be there at 2 PM sharp.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    unreadCount: 0,
    isStarred: true
  },
  {
    id: '3',
    senderName: 'Lisa Wong',
    propertyAddress: '789 Elm Drive, Unit 3C',
    lastMessage: "I have all my documents ready. When can I submit my application?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 1,
    isStarred: false
  }
]

describe('Inbox Management', () => {
  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
    jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('InboxPage', () => {
    test('renders inbox page with header and controls', async () => {
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Inbox')).toBeInTheDocument()
      })

      expect(screen.getByText('Manage all your property communications')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()
    })

    test('displays three-panel layout', async () => {
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        // Left panel - conversations list
        expect(screen.getByPlaceholderText('Search conversations...')).toBeInTheDocument()
        
        // Center panel - empty state initially
        expect(screen.getByText('No conversation selected')).toBeInTheDocument()
        
        // Right panel - applicant details empty state
        expect(screen.getByText('Select a conversation to view applicant details')).toBeInTheDocument()
      })
    })

    test('renders conversation list with mock data', async () => {
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      expect(screen.getByText('Mike Chen')).toBeInTheDocument()
      expect(screen.getByText('123 Oak Street, Unit 2A')).toBeInTheDocument()
      expect(screen.getByText('456 Pine Avenue, Unit 1B')).toBeInTheDocument()
    })

    test('displays conversation details correctly', async () => {
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      // Check conversation preview text
      expect(screen.getByText("Hi, I'm very interested in viewing this property. Is it still available?")).toBeInTheDocument()
      expect(screen.getByText("Thank you for the quick response! I'll be there at 2 PM sharp.")).toBeInTheDocument()
    })

    test('displays unread count badges', async () => {
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        // Sarah Johnson has 2 unread messages
        expect(screen.getByText('2')).toBeInTheDocument()
        
        // Mike Chen has 0 unread messages (no badge shown)
        // Lisa Wong would have 1 unread if shown
      })
    })

    test('displays timestamp formatting correctly', async () => {
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        // Should show "30m ago" for recent message
        expect(screen.getByText('30m ago')).toBeInTheDocument()
        
        // Should show "4h ago" for 4 hour old message
        expect(screen.getByText('4h ago')).toBeInTheDocument()
      })
    })

    test('handles conversation selection', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      // Click on Sarah Johnson's conversation
      const conversationItem = screen.getByText('Sarah Johnson').closest('div')
      expect(conversationItem).toBeInTheDocument()

      if (conversationItem) {
        await user.click(conversationItem)

        // Center panel should now show the selected conversation
        await waitFor(() => {
          // Header should show selected conversation
          const conversationHeaders = screen.getAllByText('Sarah Johnson')
          expect(conversationHeaders.length).toBeGreaterThan(1) // Should appear in both left panel and center panel
        })

        // Should show property address in thread header
        const propertyAddresses = screen.getAllByText('123 Oak Street, Unit 2A')
        expect(propertyAddresses.length).toBeGreaterThan(1)

        // Right panel should show applicant details
        expect(screen.getByText('Applicant Details')).toBeInTheDocument()
      }
    })

    test('shows message input when conversation is selected', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      // Select a conversation
      const conversationItem = screen.getByText('Sarah Johnson').closest('div')
      if (conversationItem) {
        await user.click(conversationItem)

        await waitFor(() => {
          expect(screen.getByPlaceholderText('Type your response...')).toBeInTheDocument()
          expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
        })
      }
    })

    test('displays conversation message in thread', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      // Select a conversation
      const conversationItem = screen.getByText('Sarah Johnson').closest('div')
      if (conversationItem) {
        await user.click(conversationItem)

        await waitFor(() => {
          // The message should appear in the thread (may be duplicated from preview)
          const messageElements = screen.getAllByText("Hi, I'm very interested in viewing this property. Is it still available?")
          expect(messageElements.length).toBeGreaterThan(0)
        })
      }
    })

    test('handles refresh functionality', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        const refreshButton = screen.getByRole('button', { name: /refresh/i })
        expect(refreshButton).toBeInTheDocument()
      })

      const refreshButton = screen.getByRole('button', { name: /refresh/i })
      const refreshIcon = refreshButton.querySelector('svg')

      // Click refresh
      await user.click(refreshButton)

      // Button should be disabled during refresh
      expect(refreshButton).toBeDisabled()

      // Icon should have spinning animation
      if (refreshIcon) {
        expect(refreshIcon).toHaveClass('animate-spin')
      }

      // After timeout, should return to normal state
      await waitFor(() => {
        expect(refreshButton).not.toBeDisabled()
      }, { timeout: 2000 })
    })

    test('handles search input interaction', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search conversations...')
        expect(searchInput).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search conversations...')
      
      await user.type(searchInput, 'Sarah')
      expect(searchInput).toHaveValue('Sarah')
      
      await user.clear(searchInput)
      expect(searchInput).toHaveValue('')
    })

    test('displays proper conversation selection styling', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      const conversationItem = screen.getByText('Sarah Johnson').closest('div')
      expect(conversationItem).toHaveClass('bg-white', 'border-gray-200')

      if (conversationItem) {
        await user.click(conversationItem)

        await waitFor(() => {
          expect(conversationItem).toHaveClass('bg-blue-50', 'border-blue-500')
        })
      }
    })

    test('shows empty state when no conversation selected', () => {
      renderWithAuth(<InboxPage />)

      expect(screen.getByText('No conversation selected')).toBeInTheDocument()
      expect(screen.getByText('Choose a conversation from the sidebar to view messages and respond to inquiries.')).toBeInTheDocument()
      
      // Right panel should also show empty state
      expect(screen.getByText('Select a conversation to view applicant details')).toBeInTheDocument()
    })

    test('handles message input and send button', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      // Select a conversation first
      const conversationItem = screen.getByText('Sarah Johnson').closest('div')
      if (conversationItem) {
        await user.click(conversationItem)

        await waitFor(() => {
          const messageInput = screen.getByPlaceholderText('Type your response...')
          expect(messageInput).toBeInTheDocument()
        })

        const messageInput = screen.getByPlaceholderText('Type your response...')
        const sendButton = screen.getByRole('button', { name: /send/i })

        await user.type(messageInput, 'Thank you for your interest!')
        expect(messageInput).toHaveValue('Thank you for your interest!')

        // Send button should be clickable
        expect(sendButton).toBeInTheDocument()
        expect(sendButton).not.toBeDisabled()
        
        await user.click(sendButton)
        // In a real app, this would send the message and clear the input
      }
    })

    test('displays applicant details when conversation is selected', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      // Select a conversation
      const conversationItem = screen.getByText('Sarah Johnson').closest('div')
      if (conversationItem) {
        await user.click(conversationItem)

        await waitFor(() => {
          expect(screen.getByText('Applicant Details')).toBeInTheDocument()
        })

        // Should show applicant information
        const nameLabels = screen.getAllByText('Name')
        const propertyLabels = screen.getAllByText('Property')
        const statusLabels = screen.getAllByText('Status')
        
        expect(nameLabels.length).toBeGreaterThan(0)
        expect(propertyLabels.length).toBeGreaterThan(0)
        expect(statusLabels.length).toBeGreaterThan(0)
        
        // Should show the actual details
        expect(screen.getByText('New Inquiry')).toBeInTheDocument()
      }
    })

    test('maintains conversation selection state', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      // Select first conversation
      const firstConversation = screen.getByText('Sarah Johnson').closest('div')
      if (firstConversation) {
        await user.click(firstConversation)

        await waitFor(() => {
          expect(firstConversation).toHaveClass('bg-blue-50', 'border-blue-500')
        })

        // Select second conversation
        const secondConversation = screen.getByText('Mike Chen').closest('div')
        if (secondConversation) {
          await user.click(secondConversation)

          await waitFor(() => {
            // First should no longer be selected
            expect(firstConversation).toHaveClass('bg-white', 'border-gray-200')
            // Second should now be selected
            expect(secondConversation).toHaveClass('bg-blue-50', 'border-blue-500')
          })
        }
      }
    })
  })

  describe('Responsive Layout', () => {
    test('renders all panels on desktop', () => {
      renderWithAuth(<InboxPage />)

      // Should have three main sections
      const leftPanel = screen.getByPlaceholderText('Search conversations...').closest('.w-80')
      expect(leftPanel).toBeInTheDocument()

      const centerPanel = screen.getByText('No conversation selected').closest('.flex-1')
      expect(centerPanel).toBeInTheDocument()

      const rightPanel = screen.getByText('Select a conversation to view applicant details').closest('.w-80')
      expect(rightPanel).toBeInTheDocument()
    })

    test('maintains layout structure', () => {
      renderWithAuth(<InboxPage />)

      // Check that the main container has proper flex layout
      const mainContainer = screen.getByText('No conversation selected').closest('.flex')
      expect(mainContainer).toHaveClass('flex-1', 'flex', 'overflow-hidden')
    })
  })

  describe('Message Threading', () => {
    test('displays conversation content when selected', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      const conversationItem = screen.getByText('Sarah Johnson').closest('div')
      if (conversationItem) {
        await user.click(conversationItem)

        await waitFor(() => {
          // Should show the message in a styled container
          const messageElements = screen.getAllByText("Hi, I'm very interested in viewing this property. Is it still available?")
          
          // Find the one in the message thread (not the preview)
          const threadMessage = messageElements.find(el => 
            el.closest('.bg-gray-100')
          )
          expect(threadMessage).toBeInTheDocument()
        })
      }
    })

    test('shows conversation header in thread view', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      const conversationItem = screen.getByText('Sarah Johnson').closest('div')
      if (conversationItem) {
        await user.click(conversationItem)

        await waitFor(() => {
          // Thread header should show sender name and property
          const threadHeaders = screen.getAllByText('Sarah Johnson')
          const threadPropertyLabels = screen.getAllByText('123 Oak Street, Unit 2A')
          
          // Should appear in thread header
          expect(threadHeaders.length).toBeGreaterThan(1)
          expect(threadPropertyLabels.length).toBeGreaterThan(1)
        })
      }
    })
  })

  describe('Accessibility', () => {
    test('has proper keyboard navigation support', () => {
      renderWithAuth(<InboxPage />)

      // Search input should be focusable
      const searchInput = screen.getByPlaceholderText('Search conversations...')
      expect(searchInput).toBeInTheDocument()
      searchInput.focus()
      expect(document.activeElement).toBe(searchInput)

      // Buttons should be focusable
      const refreshButton = screen.getByRole('button', { name: /refresh/i })
      refreshButton.focus()
      expect(document.activeElement).toBe(refreshButton)
    })

    test('has proper ARIA labels and roles', () => {
      renderWithAuth(<InboxPage />)

      // Buttons should have proper roles
      expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()

      // Input should have proper attributes
      const searchInput = screen.getByPlaceholderText('Search conversations...')
      expect(searchInput).toHaveAttribute('type', 'text')
    })
  })

  describe('Integration Tests', () => {
    test('full conversation selection and interaction flow', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      // Start with empty state
      await waitFor(() => {
        expect(screen.getByText('No conversation selected')).toBeInTheDocument()
      })

      // Select a conversation
      const conversationItem = screen.getByText('Sarah Johnson').closest('div')
      if (conversationItem) {
        await user.click(conversationItem)

        // Should update all three panels
        await waitFor(() => {
          // Left panel: selected conversation highlighted
          expect(conversationItem).toHaveClass('bg-blue-50', 'border-blue-500')
          
          // Center panel: message thread shown
          const sarahHeaders = screen.getAllByText('Sarah Johnson')
          expect(sarahHeaders.length).toBeGreaterThan(1)
          
          // Right panel: applicant details shown
          expect(screen.getByText('Applicant Details')).toBeInTheDocument()
        })

        // Type and prepare to send a message
        const messageInput = screen.getByPlaceholderText('Type your response...')
        await user.type(messageInput, 'Hello Sarah!')
        expect(messageInput).toHaveValue('Hello Sarah!')
      }
    })

    test('switching between conversations updates all panels', async () => {
      const user = userEvent.setup()
      renderWithAuth(<InboxPage />)

      await waitFor(() => {
        expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      })

      // Select first conversation
      const firstConversation = screen.getByText('Sarah Johnson').closest('div')
      if (firstConversation) {
        await user.click(firstConversation)

        await waitFor(() => {
          expect(screen.getByText('Applicant Details')).toBeInTheDocument()
        })

        // Select second conversation
        const secondConversation = screen.getByText('Mike Chen').closest('div')
        if (secondConversation) {
          await user.click(secondConversation)

          await waitFor(() => {
            // Should update to show Mike Chen's details
            const mikeChenHeaders = screen.getAllByText('Mike Chen')
            expect(mikeChenHeaders.length).toBeGreaterThan(1)
            
            // Property should update too
            const pineAvenueLabels = screen.getAllByText('456 Pine Avenue, Unit 1B')
            expect(pineAvenueLabels.length).toBeGreaterThan(1)
          })
        }
      }
    })
  })
})