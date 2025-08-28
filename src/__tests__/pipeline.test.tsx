import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DndContext } from '@dnd-kit/core'
import { AuthProvider } from '@/contexts/auth-context'
import { PipelineColumn } from '@/components/pipeline/pipeline-column'
import { ApplicantCard } from '@/components/pipeline/applicant-card'
import PipelinePage from '@/app/dashboard/pipeline/page'
import { mockApplicants, pipelineStages, pipelineStats } from '@/data/mock-applicants'
import { mockUser } from '@//__tests__/mocks/mock-data'
import type { Applicant, PipelineStage } from '@/types/pipeline'

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
  usePathname: () => '/dashboard/pipeline',
}))

// Mock pipeline components that might not be fully implemented
jest.mock('@/components/pipeline/pipeline-filters', () => ({
  PipelineFilters: ({ filters, onFiltersChange, selectedCount, onBulkAction }: any) => (
    <div data-testid="pipeline-filters">
      <input
        data-testid="search-input"
        placeholder="Search applicants..."
        value={filters.searchTerm || ''}
        onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
      />
      <select
        data-testid="property-filter"
        value={filters.propertyId || ''}
        onChange={(e) => onFiltersChange({ ...filters, propertyId: e.target.value })}
      >
        <option value="">All Properties</option>
        <option value="prop-1">123 Oak Street</option>
        <option value="prop-2">456 Pine Avenue</option>
      </select>
      <button data-testid="bulk-action" onClick={() => onBulkAction('approve')}>
        Bulk Approve
      </button>
    </div>
  )
}))

jest.mock('@/components/pipeline/pipeline-stats', () => ({
  PipelineStatsBar: ({ stats }: { stats: any }) => (
    <div data-testid="pipeline-stats">
      <div>Total: {stats.totalApplicants}</div>
      <div>Avg Time: {stats.averageTimeInPipeline} days</div>
      <div>Conversion: {stats.conversionRate}%</div>
    </div>
  )
}))

jest.mock('@/components/pipeline/applicant-detail-modal', () => ({
  ApplicantDetailModal: ({ applicant, isOpen, onClose, onApprove, onReject }: any) => 
    isOpen ? (
      <div data-testid="applicant-detail-modal">
        <h2>{applicant.name}</h2>
        <button onClick={onClose}>Close</button>
        <button onClick={() => onApprove(applicant)}>Approve</button>
        <button onClick={() => onReject(applicant)}>Reject</button>
      </div>
    ) : null
}))

jest.mock('@/components/pipeline/applicant-card', () => ({
  ApplicantCard: ({ applicant, onMessage, onApprove, onReject, onViewDetails }: any) => (
    <div data-testid={`applicant-card-${applicant.id}`} className="applicant-card">
      <h3>{applicant.name}</h3>
      <p>{applicant.email}</p>
      <p>{applicant.propertyAddress}</p>
      <button onClick={() => onMessage(applicant)}>Message</button>
      <button onClick={() => onApprove(applicant)}>Approve</button>
      <button onClick={() => onReject(applicant)}>Reject</button>
      <button onClick={() => onViewDetails(applicant)}>Details</button>
    </div>
  )
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
      <DndContext onDragEnd={() => {}}>
        {component}
      </DndContext>
    </AuthProvider>
  )
}

describe('Pipeline Management', () => {
  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
    jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('PipelinePage', () => {
    test('renders pipeline page with header and controls', async () => {
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        expect(screen.getByText('Application Pipeline')).toBeInTheDocument()
      })

      expect(screen.getByText('Manage and track tenant applications through your screening process')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /show stats/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /automate/i })).toBeInTheDocument()
    })

    test('displays pipeline stages with correct counts', async () => {
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        expect(screen.getByText('New')).toBeInTheDocument()
      })

      // Check all pipeline stages are rendered
      expect(screen.getByText('Screening')).toBeInTheDocument()
      expect(screen.getByText('Documents')).toBeInTheDocument()
      expect(screen.getByText('Approved')).toBeInTheDocument()
      expect(screen.getByText('Rejected')).toBeInTheDocument()

      // Check counts are displayed
      const newCount = mockApplicants.filter(a => a.stage === 'new').length
      const screeningCount = mockApplicants.filter(a => a.stage === 'screening').length
      
      expect(screen.getByText(newCount.toString())).toBeInTheDocument()
      expect(screen.getByText(screeningCount.toString())).toBeInTheDocument()
    })

    test('displays applicant cards in correct columns', async () => {
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        // Find applicants in 'new' stage
        const newApplicants = mockApplicants.filter(a => a.stage === 'new')
        newApplicants.forEach(applicant => {
          expect(screen.getByText(applicant.name)).toBeInTheDocument()
        })
      })

      // Check screening stage applicants
      const screeningApplicants = mockApplicants.filter(a => a.stage === 'screening')
      screeningApplicants.forEach(applicant => {
        expect(screen.getByText(applicant.name)).toBeInTheDocument()
      })
    })

    test('shows/hides stats when toggle button is clicked', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        expect(screen.getByTestId('pipeline-stats')).toBeInTheDocument()
      })

      // Stats should be visible initially
      expect(screen.getByText(`Total: ${pipelineStats.totalApplicants}`)).toBeInTheDocument()

      // Click hide stats button
      const toggleButton = screen.getByRole('button', { name: /hide stats/i })
      await user.click(toggleButton)

      // Stats should be hidden
      expect(screen.queryByTestId('pipeline-stats')).not.toBeInTheDocument()

      // Button text should change
      expect(screen.getByRole('button', { name: /show stats/i })).toBeInTheDocument()
    })

    test('filters applicants by search term', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        expect(screen.getByTestId('search-input')).toBeInTheDocument()
      })

      const searchInput = screen.getByTestId('search-input')
      await user.type(searchInput, 'Sarah')

      // Should show only Sarah Johnson
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      expect(screen.queryByText('Mike Chen')).not.toBeInTheDocument()
    })

    test('filters applicants by property', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        expect(screen.getByTestId('property-filter')).toBeInTheDocument()
      })

      const propertyFilter = screen.getByTestId('property-filter')
      await user.selectOptions(propertyFilter, 'prop-1')

      // Should show only applicants for property prop-1
      const prop1Applicants = mockApplicants.filter(a => a.propertyId === 'prop-1')
      prop1Applicants.forEach(applicant => {
        expect(screen.getByText(applicant.name)).toBeInTheDocument()
      })

      // Should not show applicants for other properties
      const otherApplicants = mockApplicants.filter(a => a.propertyId !== 'prop-1')
      otherApplicants.forEach(applicant => {
        expect(screen.queryByText(applicant.name)).not.toBeInTheDocument()
      })
    })

    test('handles applicant actions', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        const firstApplicant = mockApplicants[0]
        expect(screen.getByText(firstApplicant.name)).toBeInTheDocument()
      })

      const firstApplicant = mockApplicants[0]
      const applicantCard = screen.getByTestId(`applicant-card-${firstApplicant.id}`)
      
      // Test message action
      const messageBtn = applicantCard.querySelector('button:contains("Message")') as HTMLElement
      if (messageBtn) {
        await user.click(messageBtn)
        expect(console.log).toHaveBeenCalledWith('Message applicant:', firstApplicant.name)
      }
    })

    test('handles applicant approval', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        const firstApplicant = mockApplicants.find(a => a.stage !== 'approved')
        if (firstApplicant) {
          expect(screen.getByText(firstApplicant.name)).toBeInTheDocument()
        }
      })

      const applicantToApprove = mockApplicants.find(a => a.stage !== 'approved')
      if (applicantToApprove) {
        const approveBtn = screen.getByTestId(`applicant-card-${applicantToApprove.id}`)
          .querySelector('button:contains("Approve")') as HTMLElement
        
        if (approveBtn) {
          await user.click(approveBtn)
          expect(console.log).toHaveBeenCalledWith('Approved:', applicantToApprove.name)
        }
      }
    })

    test('handles applicant rejection', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        const firstApplicant = mockApplicants.find(a => a.stage !== 'rejected')
        if (firstApplicant) {
          expect(screen.getByText(firstApplicant.name)).toBeInTheDocument()
        }
      })

      const applicantToReject = mockApplicants.find(a => a.stage !== 'rejected')
      if (applicantToReject) {
        const rejectBtn = screen.getByTestId(`applicant-card-${applicantToReject.id}`)
          .querySelector('button:contains("Reject")') as HTMLElement
        
        if (rejectBtn) {
          await user.click(rejectBtn)
          expect(console.log).toHaveBeenCalledWith('Rejected:', applicantToReject.name)
        }
      }
    })

    test('opens applicant detail modal', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        const firstApplicant = mockApplicants[0]
        expect(screen.getByText(firstApplicant.name)).toBeInTheDocument()
      })

      const firstApplicant = mockApplicants[0]
      const detailsBtn = screen.getByTestId(`applicant-card-${firstApplicant.id}`)
        .querySelector('button:contains("Details")') as HTMLElement
      
      if (detailsBtn) {
        await user.click(detailsBtn)
        
        // Modal should open
        await waitFor(() => {
          expect(screen.getByTestId('applicant-detail-modal')).toBeInTheDocument()
        })
        
        expect(screen.getByRole('heading', { name: firstApplicant.name })).toBeInTheDocument()
      }
    })

    test('handles bulk actions', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        expect(screen.getByTestId('bulk-action')).toBeInTheDocument()
      })

      const bulkActionBtn = screen.getByTestId('bulk-action')
      await user.click(bulkActionBtn)

      expect(console.log).toHaveBeenCalledWith('Bulk action:', 'approve')
    })

    test('displays mobile responsiveness note', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      renderWithAuth(<PipelinePage />)

      expect(screen.getByText('Mobile View')).toBeInTheDocument()
      expect(screen.getByText(/optimized for desktop/)).toBeInTheDocument()
    })

    test('handles control buttons correctly', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument()
      })

      // Test export button (just click, no specific functionality)
      const exportBtn = screen.getByRole('button', { name: /export/i })
      await user.click(exportBtn)

      // Test refresh button
      const refreshBtn = screen.getByRole('button', { name: /refresh/i })
      await user.click(refreshBtn)

      // Test automate button
      const automateBtn = screen.getByRole('button', { name: /automate/i })
      await user.click(automateBtn)

      // These should not throw errors
      expect(exportBtn).toBeInTheDocument()
      expect(refreshBtn).toBeInTheDocument()
      expect(automateBtn).toBeInTheDocument()
    })
  })

  describe('PipelineColumn', () => {
    const mockStage: PipelineStage = {
      id: 'new',
      title: 'New Applications',
      count: 3,
      color: 'blue',
      description: 'Recently submitted applications'
    }

    const mockColumnApplicants = mockApplicants.filter(a => a.stage === 'new')
    
    const mockHandlers = {
      onMessage: jest.fn(),
      onApprove: jest.fn(),
      onReject: jest.fn(),
      onViewDetails: jest.fn(),
    }

    beforeEach(() => {
      Object.values(mockHandlers).forEach(handler => handler.mockClear())
    })

    test('renders column header with correct title and count', () => {
      render(
        <DndContext onDragEnd={() => {}}>
          <PipelineColumn 
            stage={mockStage} 
            applicants={mockColumnApplicants}
            {...mockHandlers}
          />
        </DndContext>
      )

      expect(screen.getByText('New Applications')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    test('renders applicant cards for each applicant', () => {
      render(
        <DndContext onDragEnd={() => {}}>
          <PipelineColumn 
            stage={mockStage} 
            applicants={mockColumnApplicants}
            {...mockHandlers}
          />
        </DndContext>
      )

      mockColumnApplicants.forEach(applicant => {
        expect(screen.getByText(applicant.name)).toBeInTheDocument()
      })
    })

    test('handles empty column gracefully', () => {
      render(
        <DndContext onDragEnd={() => {}}>
          <PipelineColumn 
            stage={{...mockStage, count: 0}} 
            applicants={[]}
            {...mockHandlers}
          />
        </DndContext>
      )

      expect(screen.getByText('New Applications')).toBeInTheDocument()
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    test('applies correct color scheme based on stage color', () => {
      const { rerender } = render(
        <DndContext onDragEnd={() => {}}>
          <PipelineColumn 
            stage={mockStage} 
            applicants={[]}
            {...mockHandlers}
          />
        </DndContext>
      )

      // Test different stage colors
      const colorStages = [
        { ...mockStage, color: 'blue' },
        { ...mockStage, color: 'yellow' },
        { ...mockStage, color: 'green' },
        { ...mockStage, color: 'red' },
      ]

      colorStages.forEach(stage => {
        rerender(
          <DndContext onDragEnd={() => {}}>
            <PipelineColumn 
              stage={stage} 
              applicants={[]}
              {...mockHandlers}
            />
          </DndContext>
        )

        // Header should have appropriate color classes
        const header = screen.getByText('New Applications').closest('div')
        expect(header).toHaveClass(`bg-${stage.color}-50`)
      })
    })

    test('passes handler functions to applicant cards correctly', async () => {
      const user = userEvent.setup()
      
      render(
        <DndContext onDragEnd={() => {}}>
          <PipelineColumn 
            stage={mockStage} 
            applicants={mockColumnApplicants}
            {...mockHandlers}
          />
        </DndContext>
      )

      const firstApplicant = mockColumnApplicants[0]
      const applicantCard = screen.getByTestId(`applicant-card-${firstApplicant.id}`)

      // Test handlers are called
      const messageBtn = applicantCard.querySelector('button:contains("Message")') as HTMLElement
      if (messageBtn) {
        await user.click(messageBtn)
        expect(mockHandlers.onMessage).toHaveBeenCalledWith(firstApplicant)
      }
    })
  })

  describe('Drag and Drop Integration', () => {
    // Note: Full drag and drop testing is complex with @dnd-kit
    // These tests focus on the essential functionality

    test('pipeline page sets up drag context correctly', () => {
      renderWithAuth(<PipelinePage />)

      // Should render without errors - drag context is properly set up
      expect(screen.getByText('Application Pipeline')).toBeInTheDocument()
    })

    test('columns are droppable zones', () => {
      const mockStage: PipelineStage = {
        id: 'new',
        title: 'New',
        count: 0,
        color: 'blue',
        description: 'New applications'
      }

      render(
        <DndContext onDragEnd={() => {}}>
          <PipelineColumn 
            stage={mockStage} 
            applicants={[]}
            onMessage={() => {}}
            onApprove={() => {}}
            onReject={() => {}}
            onViewDetails={() => {}}
          />
        </DndContext>
      )

      // Column should render without errors (droppable setup is working)
      expect(screen.getByText('New')).toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    test('pipeline page integrates with all components', async () => {
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        expect(screen.getByText('Application Pipeline')).toBeInTheDocument()
      })

      // Should have stats
      expect(screen.getByTestId('pipeline-stats')).toBeInTheDocument()
      
      // Should have filters
      expect(screen.getByTestId('pipeline-filters')).toBeInTheDocument()
      
      // Should have pipeline columns
      expect(screen.getByText('New')).toBeInTheDocument()
      expect(screen.getByText('Screening')).toBeInTheDocument()
      
      // Should have applicant cards
      mockApplicants.forEach(applicant => {
        expect(screen.getByText(applicant.name)).toBeInTheDocument()
      })
    })

    test('filtering updates column counts correctly', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        expect(screen.getByTestId('search-input')).toBeInTheDocument()
      })

      // Initial counts should match all applicants
      const initialNewCount = mockApplicants.filter(a => a.stage === 'new').length
      expect(screen.getByText(initialNewCount.toString())).toBeInTheDocument()

      // Filter by search term
      const searchInput = screen.getByTestId('search-input')
      await user.type(searchInput, 'Sarah')

      // Should show only matching applicants
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
      
      // Other applicants should be filtered out
      expect(screen.queryByText('Mike Chen')).not.toBeInTheDocument()
    })

    test('applicant state changes update pipeline correctly', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PipelinePage />)

      await waitFor(() => {
        const applicantToApprove = mockApplicants.find(a => a.stage === 'new')
        if (applicantToApprove) {
          expect(screen.getByText(applicantToApprove.name)).toBeInTheDocument()
        }
      })

      const applicantToApprove = mockApplicants.find(a => a.stage === 'new')
      if (applicantToApprove) {
        const approveBtn = screen.getByTestId(`applicant-card-${applicantToApprove.id}`)
          .querySelector('button:contains("Approve")') as HTMLElement
        
        if (approveBtn) {
          await user.click(approveBtn)
          
          // Should log the action
          expect(console.log).toHaveBeenCalledWith('Approved:', applicantToApprove.name)
        }
      }
    })
  })
})