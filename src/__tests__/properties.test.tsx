import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '@/contexts/auth-context'
import { PropertyCard } from '@/components/properties/property-card'
import { AddPropertyModal } from '@/components/properties/add-property-modal'
import PropertiesPage from '@/app/dashboard/properties/page'
import { mockProperties, mockUser } from '@//__tests__/mocks/mock-data'

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
  usePathname: () => '/dashboard/properties',
}))

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
})

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

describe('Property Management', () => {
  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
    jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('PropertiesPage', () => {
    test('renders properties page with header and actions', async () => {
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        expect(screen.getByText('Properties')).toBeInTheDocument()
      })

      expect(screen.getByText('Manage your property listings and track their performance')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add property/i })).toBeInTheDocument()
    })

    test('displays property grid with mock data', async () => {
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        expect(screen.getByText('123 Oak Street, Unit 2A')).toBeInTheDocument()
      })

      expect(screen.getByText('456 Pine Avenue')).toBeInTheDocument()
      expect(screen.getByText('789 Elm Drive')).toBeInTheDocument()
      expect(screen.getByText('321 Maple Court')).toBeInTheDocument()
    })

    test('renders search and filter controls', async () => {
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText(/search properties/i)
        expect(searchInput).toBeInTheDocument()
      })

      const statusSelect = screen.getByDisplayValue('All Status')
      expect(statusSelect).toBeInTheDocument()
      
      const filtersButton = screen.getByText('Filters')
      expect(filtersButton).toBeInTheDocument()
    })

    test('filters properties by search term', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText(/search properties/i)
        expect(searchInput).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search properties/i)
      
      await user.type(searchInput, 'Oak Street')

      // Should show only the Oak Street property
      expect(screen.getByText('123 Oak Street, Unit 2A')).toBeInTheDocument()
      expect(screen.queryByText('456 Pine Avenue')).not.toBeInTheDocument()
      
      // Should show filtered count
      expect(screen.getByText('Showing 1 of 4 properties matching "Oak Street"')).toBeInTheDocument()
    })

    test('filters properties by rent amount', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText(/search properties/i)
        expect(searchInput).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search properties/i)
      
      await user.type(searchInput, '3200')

      // Should show only properties with $3200 rent
      expect(screen.getByText('123 Oak Street, Unit 2A')).toBeInTheDocument()
      expect(screen.queryByText('456 Pine Avenue')).not.toBeInTheDocument()
    })

    test('filters properties by status', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        const statusSelect = screen.getByDisplayValue('All Status')
        expect(statusSelect).toBeInTheDocument()
      })

      const statusSelect = screen.getByDisplayValue('All Status')
      
      await user.selectOptions(statusSelect, 'available')

      // Should show only available properties
      expect(screen.getByText('123 Oak Street, Unit 2A')).toBeInTheDocument()
      expect(screen.getByText('321 Maple Court')).toBeInTheDocument()
      expect(screen.queryByText('789 Elm Drive')).not.toBeInTheDocument() // rented property
      
      // Should show filtered count
      expect(screen.getByText(/showing \d+ of \d+ properties.*with status "Available"/i)).toBeInTheDocument()
    })

    test('resets filters when reset button is clicked', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText(/search properties/i)
        expect(searchInput).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search properties/i)
      await user.type(searchInput, 'Oak')

      // Reset button should appear
      const resetButton = screen.getByText('Reset')
      expect(resetButton).toBeInTheDocument()

      await user.click(resetButton)

      // Should show all properties again
      expect(screen.getByDisplayValue('')).toBeInTheDocument() // search cleared
      expect(screen.getByText('456 Pine Avenue')).toBeInTheDocument() // other properties visible
    })

    test('shows empty state when no properties match filters', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText(/search properties/i)
        expect(searchInput).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/search properties/i)
      await user.type(searchInput, 'nonexistent property')

      expect(screen.getByText('No properties found')).toBeInTheDocument()
      expect(screen.getByText('Try adjusting your search or filter criteria to find what you\'re looking for.')).toBeInTheDocument()
      expect(screen.getByText('Clear filters')).toBeInTheDocument()
    })

    test('opens add property modal when add button is clicked', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        const addButton = screen.getByRole('button', { name: /add property/i })
        expect(addButton).toBeInTheDocument()
      })

      const addButton = screen.getByRole('button', { name: /add property/i })
      await user.click(addButton)

      expect(screen.getByText('Add New Property')).toBeInTheDocument()
      expect(screen.getByText('Create a new property listing with a unique email address for tenant inquiries')).toBeInTheDocument()
    })

    test('displays results summary correctly', async () => {
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        expect(screen.getByText('Showing 4 of 4 properties')).toBeInTheDocument()
      })
    })
  })

  describe('PropertyCard', () => {
    const mockProperty = mockProperties[0]
    const mockHandlers = {
      onCopyEmail: jest.fn(),
      onEdit: jest.fn(),
      onViewPipeline: jest.fn(),
    }

    beforeEach(() => {
      Object.values(mockHandlers).forEach(handler => handler.mockClear())
    })

    test('renders property information correctly', () => {
      render(
        <PropertyCard 
          property={mockProperty} 
          {...mockHandlers}
        />
      )

      expect(screen.getByText('123 Main St')).toBeInTheDocument()
      expect(screen.getByText('Anytown, ST 12345')).toBeInTheDocument()
      expect(screen.getByText('$2,500/month')).toBeInTheDocument()
      expect(screen.getByText('2 bed • 1 bath')).toBeInTheDocument()
    })

    test('displays status badge correctly', () => {
      render(
        <PropertyCard 
          property={mockProperty} 
          {...mockHandlers}
        />
      )

      const statusBadge = screen.getByText('Available')
      expect(statusBadge).toBeInTheDocument()
      expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800')
    })

    test('displays property stats correctly', () => {
      render(
        <PropertyCard 
          property={{...mockProperty, applications: 5, messages: 3, views: 12}} 
          {...mockHandlers}
        />
      )

      expect(screen.getByText('5')).toBeInTheDocument() // applications
      expect(screen.getByText('3')).toBeInTheDocument() // messages
      expect(screen.getByText('12')).toBeInTheDocument() // views
    })

    test('shows email address with copy functionality', () => {
      render(
        <PropertyCard 
          property={mockProperty} 
          {...mockHandlers}
        />
      )

      const emailText = screen.getByText(mockProperty.email, { exact: false })
      expect(emailText).toBeInTheDocument()
      
      const copyButton = screen.getByRole('button', { name: /copy/i })
      expect(copyButton).toBeInTheDocument()
    })

    test('handles email copy functionality', async () => {
      const user = userEvent.setup()
      mockHandlers.onCopyEmail.mockResolvedValue(undefined)
      
      render(
        <PropertyCard 
          property={mockProperty} 
          {...mockHandlers}
        />
      )

      const copyButton = screen.getByRole('button', { name: /copy/i })
      await user.click(copyButton)

      expect(mockHandlers.onCopyEmail).toHaveBeenCalledWith(mockProperty.email)
      
      // Should show success state
      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })

      // Should return to normal state after timeout
      await waitFor(() => {
        expect(screen.getByText('Copy')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    test('shows hover actions when hovered', async () => {
      const user = userEvent.setup()
      
      render(
        <PropertyCard 
          property={mockProperty} 
          {...mockHandlers}
        />
      )

      const card = screen.getByText('123 Main St').closest('.property-card')
      expect(card).toBeInTheDocument()

      if (card) {
        await user.hover(card)

        expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /pipeline/i })).toBeInTheDocument()
      }
    })

    test('handles edit button click', async () => {
      const user = userEvent.setup()
      
      render(
        <PropertyCard 
          property={mockProperty} 
          {...mockHandlers}
        />
      )

      // Hover to show actions
      const card = screen.getByText('123 Main St').closest('.property-card')
      if (card) {
        await user.hover(card)
        
        const editButton = screen.getByRole('button', { name: /edit/i })
        await user.click(editButton)

        expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockProperty.id)
      }
    })

    test('handles pipeline button click', async () => {
      const user = userEvent.setup()
      
      render(
        <PropertyCard 
          property={mockProperty} 
          {...mockHandlers}
        />
      )

      // Hover to show actions
      const card = screen.getByText('123 Main St').closest('.property-card')
      if (card) {
        await user.hover(card)
        
        const pipelineButton = screen.getByRole('button', { name: /pipeline/i })
        await user.click(pipelineButton)

        expect(mockHandlers.onViewPipeline).toHaveBeenCalledWith(mockProperty.id)
      }
    })

    test('displays occupied badge for rented properties', () => {
      const occupiedProperty = { ...mockProperty, isOccupied: true, status: 'rented' as const }
      
      render(
        <PropertyCard 
          property={occupiedProperty} 
          {...mockHandlers}
        />
      )

      expect(screen.getByText('Occupied')).toBeInTheDocument()
      expect(screen.getByText('Rented')).toBeInTheDocument()
    })

    test('shows correct status colors for different statuses', () => {
      const statuses = [
        { status: 'available' as const, expectedClasses: ['bg-green-100', 'text-green-800'] },
        { status: 'pending' as const, expectedClasses: ['bg-amber-100', 'text-amber-800'] },
        { status: 'rented' as const, expectedClasses: ['bg-blue-100', 'text-blue-800'] },
      ]

      statuses.forEach(({ status, expectedClasses }) => {
        const { unmount } = render(
          <PropertyCard 
            property={{...mockProperty, status}} 
            {...mockHandlers}
          />
        )

        const statusBadge = screen.getByText(status.charAt(0).toUpperCase() + status.slice(1))
        expectedClasses.forEach(className => {
          expect(statusBadge).toHaveClass(className)
        })
        
        unmount()
      })
    })
  })

  describe('AddPropertyModal', () => {
    const mockProps = {
      open: true,
      onClose: jest.fn(),
      onSubmit: jest.fn(),
    }

    beforeEach(() => {
      mockProps.onClose.mockClear()
      mockProps.onSubmit.mockClear()
    })

    test('renders modal when open', () => {
      render(<AddPropertyModal {...mockProps} />)

      expect(screen.getByText('Add New Property')).toBeInTheDocument()
      expect(screen.getByText('Create a new property listing with a unique email address for tenant inquiries')).toBeInTheDocument()
    })

    test('does not render when closed', () => {
      render(<AddPropertyModal {...mockProps} open={false} />)

      expect(screen.queryByText('Add New Property')).not.toBeInTheDocument()
    })

    test('renders all form fields', () => {
      render(<AddPropertyModal {...mockProps} />)

      expect(screen.getByLabelText('Street Address')).toBeInTheDocument()
      expect(screen.getByLabelText('City')).toBeInTheDocument()
      expect(screen.getByLabelText('State')).toBeInTheDocument()
      expect(screen.getByLabelText('ZIP Code')).toBeInTheDocument()
      expect(screen.getByLabelText('Monthly Rent')).toBeInTheDocument()
      expect(screen.getByLabelText('Bedrooms')).toBeInTheDocument()
      expect(screen.getByLabelText('Bathrooms')).toBeInTheDocument()
      expect(screen.getByLabelText('Property Description')).toBeInTheDocument()
    })

    test('validates required fields', async () => {
      const user = userEvent.setup()
      render(<AddPropertyModal {...mockProps} />)

      const submitButton = screen.getByText('Create Property')
      expect(submitButton).toBeDisabled()

      // Fill required fields
      await user.type(screen.getByLabelText('Street Address'), '123 Test St')
      await user.type(screen.getByLabelText('City'), 'Test City')
      await user.type(screen.getByLabelText('State'), 'CA')
      await user.type(screen.getByLabelText('ZIP Code'), '12345')
      await user.type(screen.getByLabelText('Monthly Rent'), '2000')

      expect(submitButton).not.toBeDisabled()
    })

    test('shows email preview when form is valid', async () => {
      const user = userEvent.setup()
      render(<AddPropertyModal {...mockProps} />)

      // Fill required fields
      await user.type(screen.getByLabelText('Street Address'), '123 Test Street')
      await user.type(screen.getByLabelText('City'), 'Test City')
      await user.type(screen.getByLabelText('State'), 'CA')
      await user.type(screen.getByLabelText('ZIP Code'), '12345')
      await user.type(screen.getByLabelText('Monthly Rent'), '2000')

      await waitFor(() => {
        expect(screen.getByText('Email Address Preview')).toBeInTheDocument()
      })

      expect(screen.getByText(/property-.*-123-test-street@platform\.com/)).toBeInTheDocument()
    })

    test('handles form submission', async () => {
      const user = userEvent.setup()
      mockProps.onSubmit.mockResolvedValue(undefined)
      
      render(<AddPropertyModal {...mockProps} />)

      // Fill form
      await user.type(screen.getByLabelText('Street Address'), '123 Test Street')
      await user.type(screen.getByLabelText('City'), 'Test City')
      await user.type(screen.getByLabelText('State'), 'CA')
      await user.type(screen.getByLabelText('ZIP Code'), '12345')
      await user.type(screen.getByLabelText('Monthly Rent'), '2000')
      await user.type(screen.getByLabelText('Property Description'), 'A nice property')

      const submitButton = screen.getByText('Create Property')
      await user.click(submitButton)

      // Should show loading state
      expect(screen.getByText('Creating...')).toBeInTheDocument()

      await waitFor(() => {
        expect(mockProps.onSubmit).toHaveBeenCalledWith({
          address: '123 Test Street',
          city: 'Test City',
          state: 'CA',
          zipCode: '12345',
          rent: 2000,
          bedrooms: 1,
          bathrooms: 1,
          description: 'A nice property'
        })
      })
    })

    test('shows success animation after submission', async () => {
      const user = userEvent.setup()
      mockProps.onSubmit.mockResolvedValue(undefined)
      
      render(<AddPropertyModal {...mockProps} />)

      // Fill and submit form
      await user.type(screen.getByLabelText('Street Address'), '123 Test Street')
      await user.type(screen.getByLabelText('City'), 'Test City')
      await user.type(screen.getByLabelText('State'), 'CA')
      await user.type(screen.getByLabelText('ZIP Code'), '12345')
      await user.type(screen.getByLabelText('Monthly Rent'), '2000')

      const submitButton = screen.getByText('Create Property')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Property Created!')).toBeInTheDocument()
      })

      expect(screen.getByText('Unique email address generated successfully')).toBeInTheDocument()
    })

    test('handles bedroom and bathroom selects', async () => {
      const user = userEvent.setup()
      render(<AddPropertyModal {...mockProps} />)

      const bedroomSelect = screen.getByLabelText('Bedrooms')
      const bathroomSelect = screen.getByLabelText('Bathrooms')

      await user.selectOptions(bedroomSelect, '3')
      await user.selectOptions(bathroomSelect, '2.5')

      expect(bedroomSelect).toHaveValue('3')
      expect(bathroomSelect).toHaveValue('2.5')
    })

    test('handles close button click', async () => {
      const user = userEvent.setup()
      render(<AddPropertyModal {...mockProps} />)

      const closeButton = screen.getByRole('button', { name: '' }) // X button
      await user.click(closeButton)

      expect(mockProps.onClose).toHaveBeenCalled()
    })

    test('handles cancel button click', async () => {
      const user = userEvent.setup()
      render(<AddPropertyModal {...mockProps} />)

      const cancelButton = screen.getByText('Cancel')
      await user.click(cancelButton)

      expect(mockProps.onClose).toHaveBeenCalled()
    })

    test('handles backdrop click', async () => {
      const user = userEvent.setup()
      render(<AddPropertyModal {...mockProps} />)

      // Click on backdrop
      const backdrop = document.querySelector('.fixed.inset-0.bg-gray-900\\/80')
      expect(backdrop).toBeInTheDocument()

      if (backdrop) {
        await user.click(backdrop)
        expect(mockProps.onClose).toHaveBeenCalled()
      }
    })

    test('displays image upload placeholder', () => {
      render(<AddPropertyModal {...mockProps} />)

      expect(screen.getByText('Property Images')).toBeInTheDocument()
      expect(screen.getByText('Image upload coming soon')).toBeInTheDocument()
      expect(screen.getByText('For now, properties will use placeholder images')).toBeInTheDocument()
    })
  })

  describe('Integration Tests', () => {
    test('properties page integrates with property cards', async () => {
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        expect(screen.getByText('123 Oak Street, Unit 2A')).toBeInTheDocument()
      })

      // Property cards should have copy email functionality
      const copyButtons = screen.getAllByText('Copy')
      expect(copyButtons.length).toBeGreaterThan(0)

      // Should handle property actions through console.log
      const user = userEvent.setup()
      const card = screen.getByText('123 Oak Street, Unit 2A').closest('.property-card')
      
      if (card) {
        await user.hover(card)
        const editButton = screen.getAllByText('Edit')[0]
        await user.click(editButton)
        
        expect(console.log).toHaveBeenCalledWith('Edit property:', expect.any(String))
      }
    })

    test('add property modal integration with properties page', async () => {
      const user = userEvent.setup()
      renderWithAuth(<PropertiesPage />)

      await waitFor(() => {
        const addButton = screen.getByRole('button', { name: /add property/i })
        expect(addButton).toBeInTheDocument()
      })

      // Open modal
      const addButton = screen.getByRole('button', { name: /add property/i })
      await user.click(addButton)

      // Fill and submit form
      await user.type(screen.getByLabelText('Street Address'), '999 New Street')
      await user.type(screen.getByLabelText('City'), 'New City')
      await user.type(screen.getByLabelText('State'), 'NY')
      await user.type(screen.getByLabelText('ZIP Code'), '10001')
      await user.type(screen.getByLabelText('Monthly Rent'), '3000')

      const submitButton = screen.getByText('Create Property')
      await user.click(submitButton)

      // Should show success and eventually close modal
      await waitFor(() => {
        expect(screen.getByText('Property Created!')).toBeInTheDocument()
      })

      // After timeout, new property should appear in the list
      await waitFor(() => {
        expect(screen.getByText('999 New Street')).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })
})