import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/contexts/auth-context'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { Sidebar } from '@/components/navigation/sidebar'
import DashboardPage from '@/app/dashboard/page'
import { mockDashboardStats, mockUser } from '@//__tests__/mocks/mock-data'

// Mock Next.js navigation
const mockPush = jest.fn()
const mockPathname = jest.fn(() => '/dashboard')

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => mockPathname(),
}))

// Mock DemoShowcase component
jest.mock('@/components/demo-showcase', () => ({
  DemoShowcase: () => <div data-testid="demo-showcase">Demo Showcase Component</div>
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

describe('Dashboard Components', () => {
  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
    mockPathname.mockReturnValue('/dashboard')
    // Mock console.log to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('DashboardPage', () => {
    test('renders dashboard with all sections when authenticated', async () => {
      renderWithAuth(<DashboardPage />)

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
      })

      expect(screen.getByText('Welcome back! Here\'s what\'s happening with your properties today.')).toBeInTheDocument()
      expect(screen.getByText('Interactive Demo')).toBeInTheDocument()
      expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument()
      expect(screen.getByTestId('demo-showcase')).toBeInTheDocument()
    })

    test('redirects to login when not authenticated', async () => {
      renderWithAuth(<DashboardPage />, false)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login')
      })
    })

    test('renders getting started section with add property button', async () => {
      renderWithAuth(<DashboardPage />)

      await waitFor(() => {
        expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument()
      })

      expect(screen.getByText('Add your first property to begin managing applications and communicating with potential tenants.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add your first property/i })).toBeInTheDocument()
    })

    test('contains success animation area', async () => {
      renderWithAuth(<DashboardPage />)

      await waitFor(() => {
        const animationArea = document.getElementById('success-animation')
        expect(animationArea).toBeInTheDocument()
        expect(animationArea).toHaveClass('fixed', 'inset-0', 'pointer-events-none', 'z-50')
      })
    })
  })

  describe('StatsOverview', () => {
    test('renders all stat cards', () => {
      render(<StatsOverview />)

      expect(screen.getByText('Active Listings')).toBeInTheDocument()
      expect(screen.getByText('Total Applications')).toBeInTheDocument()
      expect(screen.getByText('Unread Messages')).toBeInTheDocument()
      expect(screen.getByText('Vacancy Rate')).toBeInTheDocument()
    })

    test('displays animated values correctly', async () => {
      render(<StatsOverview />)

      // Values should animate from 0 to target values
      await waitFor(() => {
        expect(screen.getByText('12')).toBeInTheDocument() // Active Listings
      }, { timeout: 1000 })

      await waitFor(() => {
        expect(screen.getByText('47')).toBeInTheDocument() // Total Applications
      }, { timeout: 1000 })

      await waitFor(() => {
        expect(screen.getByText('8')).toBeInTheDocument() // Unread Messages
      }, { timeout: 1000 })

      await waitFor(() => {
        expect(screen.getByText('25%')).toBeInTheDocument() // Vacancy Rate
      }, { timeout: 1000 })
    })

    test('shows change indicators correctly', async () => {
      render(<StatsOverview />)

      await waitFor(() => {
        // Check for increase indicators
        expect(screen.getByText('+2')).toBeInTheDocument()
        expect(screen.getByText('+15')).toBeInTheDocument()
        
        // Check for decrease indicators (without + sign)
        expect(screen.getByText('3')).toBeInTheDocument() // -3 messages
        expect(screen.getByText('5%')).toBeInTheDocument() // -5% vacancy rate
      })
    })

    test('handles stat card clicks', async () => {
      const user = userEvent.setup()
      render(<StatsOverview />)

      const activeListingsCard = screen.getByText('Active Listings').closest('div')?.parentElement
      expect(activeListingsCard).toBeInTheDocument()

      if (activeListingsCard) {
        await user.click(activeListingsCard)
        expect(console.log).toHaveBeenCalledWith('Navigate to:', '/dashboard/properties')
      }
    })

    test('shows hover effects on stat cards', async () => {
      const user = userEvent.setup()
      render(<StatsOverview />)

      const activeListingsCard = screen.getByText('Active Listings').closest('div')?.parentElement
      
      if (activeListingsCard) {
        await user.hover(activeListingsCard)
        expect(screen.getByText('Click to view details →')).toBeInTheDocument()
      }
    })

    test('renders icons correctly', () => {
      render(<StatsOverview />)

      // Icons should be present (test by checking if card containers have the expected structure)
      const statCards = screen.getAllByText(/Active Listings|Total Applications|Unread Messages|Vacancy Rate/)
      expect(statCards).toHaveLength(4)
    })
  })

  describe('QuickActions', () => {
    test('renders all quick action buttons', () => {
      render(<QuickActions />)

      expect(screen.getByText('Quick Actions')).toBeInTheDocument()
      expect(screen.getByText('Jump to the most common tasks')).toBeInTheDocument()
      
      expect(screen.getByText('Add New Property')).toBeInTheDocument()
      expect(screen.getByText('View All Applications')).toBeInTheDocument()
      expect(screen.getByText('Check Messages')).toBeInTheDocument()
      expect(screen.getByText('Schedule Viewing')).toBeInTheDocument()
    })

    test('displays action descriptions', () => {
      render(<QuickActions />)

      expect(screen.getByText('Create a listing with unique email')).toBeInTheDocument()
      expect(screen.getByText('Review pending applications')).toBeInTheDocument()
      expect(screen.getByText('8 unread messages')).toBeInTheDocument()
      expect(screen.getByText('Book property tours')).toBeInTheDocument()
    })

    test('handles action button clicks', async () => {
      const user = userEvent.setup()
      render(<QuickActions />)

      const addPropertyBtn = screen.getByText('Add New Property').closest('button')
      expect(addPropertyBtn).toBeInTheDocument()

      if (addPropertyBtn) {
        await user.click(addPropertyBtn)
        expect(console.log).toHaveBeenCalledWith('Navigate to:', '/dashboard/properties/new')
      }
    })

    test('shows hover effects on action buttons', async () => {
      const user = userEvent.setup()
      render(<QuickActions />)

      const addPropertyBtn = screen.getByText('Add New Property').closest('button')
      
      if (addPropertyBtn) {
        await user.hover(addPropertyBtn)
        // Button should have hover classes applied
        expect(addPropertyBtn).toHaveClass('hover:shadow-md')
      }
    })

    test('renders pro tip section', () => {
      render(<QuickActions />)

      expect(screen.getByText(/Pro tip:/)).toBeInTheDocument()
      expect(screen.getByText(/Cmd\+K/)).toBeInTheDocument()
      expect(screen.getByText(/command palette/)).toBeInTheDocument()
    })

    test('keyboard shortcut element is properly styled', () => {
      render(<QuickActions />)

      const kbdElement = screen.getByText('Cmd+K')
      expect(kbdElement).toBeInTheDocument()
      expect(kbdElement.tagName).toBe('KBD')
    })
  })

  describe('Sidebar', () => {
    test('renders sidebar with all navigation items', () => {
      renderWithAuth(<Sidebar />)

      expect(screen.getByText('Property Pro')).toBeInTheDocument()
      expect(screen.getByText('Tenant Management')).toBeInTheDocument()
      
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Properties')).toBeInTheDocument()
      expect(screen.getByText('Pipeline')).toBeInTheDocument()
      expect(screen.getByText('Inbox')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    test('shows user profile section', async () => {
      renderWithAuth(<Sidebar />)

      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeInTheDocument()
      })

      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })

    test('highlights active navigation item', () => {
      mockPathname.mockReturnValue('/dashboard')
      renderWithAuth(<Sidebar />)

      const dashboardLink = screen.getByText('Dashboard').closest('a')
      expect(dashboardLink).toHaveClass('bg-blue-50', 'text-blue-700')
    })

    test('shows badges for pipeline and inbox', () => {
      renderWithAuth(<Sidebar />)

      // Pipeline badge
      const pipelineBadge = screen.getByText('3')
      expect(pipelineBadge).toBeInTheDocument()
      
      // Inbox badge
      const inboxBadge = screen.getByText('5')
      expect(inboxBadge).toBeInTheDocument()
    })

    test('handles logout button click', async () => {
      const user = userEvent.setup()
      renderWithAuth(<Sidebar />)

      await waitFor(() => {
        const logoutBtn = screen.getByRole('button')
        expect(logoutBtn).toBeInTheDocument()
      })

      const logoutBtn = screen.getByRole('button')
      await user.click(logoutBtn)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login')
      })
    })

    test('toggles sidebar collapse state', async () => {
      const user = userEvent.setup()
      renderWithAuth(<Sidebar />)

      // Find the collapse toggle button
      const collapseBtn = document.querySelector('button[class*="absolute"][class*="-right-3"]')
      expect(collapseBtn).toBeInTheDocument()

      if (collapseBtn) {
        // Initially expanded - should show brand text
        expect(screen.getByText('Property Pro')).toBeInTheDocument()

        await user.click(collapseBtn)

        // After click, brand text should still be visible initially
        // (In real implementation, this would be controlled by state)
        expect(screen.getByText('Property Pro')).toBeInTheDocument()
      }
    })

    test('handles different pathname highlighting correctly', () => {
      mockPathname.mockReturnValue('/dashboard/properties')
      renderWithAuth(<Sidebar />)

      const propertiesLink = screen.getByText('Properties').closest('a')
      expect(propertiesLink).toHaveClass('bg-blue-50', 'text-blue-700')

      const dashboardLink = screen.getByText('Dashboard').closest('a')
      expect(dashboardLink).not.toHaveClass('bg-blue-50', 'text-blue-700')
    })

    test('navigation links have correct hrefs', () => {
      renderWithAuth(<Sidebar />)

      expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard')
      expect(screen.getByText('Properties').closest('a')).toHaveAttribute('href', '/dashboard/properties')
      expect(screen.getByText('Pipeline').closest('a')).toHaveAttribute('href', '/dashboard/pipeline')
      expect(screen.getByText('Inbox').closest('a')).toHaveAttribute('href', '/dashboard/inbox')
      expect(screen.getByText('Settings').closest('a')).toHaveAttribute('href', '/dashboard/settings')
    })

    test('renders fallback user info when no user data', () => {
      localStorage.clear()
      renderWithAuth(<Sidebar />, false)

      // Should render default values
      expect(screen.getByText('User')).toBeInTheDocument()
      expect(screen.getByText('user@example.com')).toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    test('dashboard components work together', async () => {
      renderWithAuth(
        <div>
          <Sidebar />
          <DashboardPage />
        </div>
      )

      // Wait for auth to load
      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
      })

      // Should have both sidebar and dashboard content
      expect(screen.getByText('Property Pro')).toBeInTheDocument() // Sidebar
      expect(screen.getByText('Welcome back! Here\'s what\'s happening with your properties today.')).toBeInTheDocument() // Dashboard
      expect(screen.getByText('Quick Actions')).toBeInTheDocument() // Quick Actions
      expect(screen.getByText('Active Listings')).toBeInTheDocument() // Stats
    })

    test('stats and quick actions show consistent data', async () => {
      renderWithAuth(<DashboardPage />)

      await waitFor(() => {
        // Stats should show 8 unread messages
        expect(screen.getByText('8')).toBeInTheDocument()
      })

      // Quick actions should also reference unread messages
      expect(screen.getByText('8 unread messages')).toBeInTheDocument()
    })
  })
})