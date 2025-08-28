import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AuthProvider } from '@/contexts/auth-context'

// Mock user data for testing
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'manager' as const,
}

// Mock authenticated context
export const MockAuthProvider = ({ 
  children, 
  isAuthenticated = true, 
  user = mockUser 
}: { 
  children: React.ReactNode
  isAuthenticated?: boolean
  user?: typeof mockUser | null
}) => {
  const mockAuthValue = {
    user: isAuthenticated ? user : null,
    isAuthenticated,
    login: jest.fn(),
    logout: jest.fn(),
    signup: jest.fn(),
    loading: false,
  }

  return (
    <div data-testid="mock-auth-provider">
      {React.cloneElement(
        React.Children.only(children as ReactElement),
        { authValue: mockAuthValue }
      )}
    </div>
  )
}

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    isAuthenticated?: boolean
    user?: typeof mockUser | null
  }
) => {
  const { isAuthenticated = true, user = mockUser, ...renderOptions } = options || {}
  
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <MockAuthProvider isAuthenticated={isAuthenticated} user={user}>
      {children}
    </MockAuthProvider>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Helper functions
export const createMockEvent = (overrides = {}) => ({
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  target: { value: '' },
  ...overrides,
})

export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 0))
}