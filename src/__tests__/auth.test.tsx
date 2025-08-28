import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { AuthProvider, useAuth } from '@/contexts/auth-context'
import { ProtectedRoute } from '@/components/protected-route'
import LoginPage from '@/app/(auth)/login/page'

// Mock Next.js router
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

// Mock toast hook
const mockShowToast = jest.fn()
jest.mock('@/components/ui/toast', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}))

// Test component to access auth context
const AuthTestComponent = () => {
  const { user, isAuthenticated, isLoading, login, logout, register } = useAuth()
  
  return (
    <div>
      <div data-testid="auth-status">
        {isLoading ? 'loading' : isAuthenticated ? 'authenticated' : 'not-authenticated'}
      </div>
      <div data-testid="user-email">{user?.email || 'no-user'}</div>
      <button 
        data-testid="login-btn" 
        onClick={() => login('test@example.com', 'password123')}
      >
        Login
      </button>
      <button 
        data-testid="logout-btn" 
        onClick={() => logout()}
      >
        Logout
      </button>
      <button 
        data-testid="register-btn" 
        onClick={() => register({
          email: 'newuser@example.com',
          password: 'password123',
          name: 'New User'
        })}
      >
        Register
      </button>
    </div>
  )
}

describe('Authentication System', () => {
  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
    mockReplace.mockClear()
    mockShowToast.mockClear()
  })

  describe('AuthProvider', () => {
    test('provides initial unauthenticated state', () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      )

      expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated')
      expect(screen.getByTestId('user-email')).toHaveTextContent('no-user')
    })

    test('restores user session from localStorage on mount', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'landlord'
      }

      localStorage.setItem('auth_token', 'mock_token')
      localStorage.setItem('user_data', JSON.stringify(mockUser))

      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated')
      })
      
      expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com')
    })

    test('handles corrupted localStorage data gracefully', async () => {
      localStorage.setItem('auth_token', 'mock_token')
      localStorage.setItem('user_data', 'invalid-json')

      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated')
      })
    })

    test('performs login successfully', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      )

      const loginBtn = screen.getByTestId('login-btn')
      
      fireEvent.click(loginBtn)

      // Should show loading state
      expect(screen.getByTestId('auth-status')).toHaveTextContent('loading')

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated')
      }, { timeout: 2000 })

      expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
      expect(localStorage.getItem('auth_token')).toBeTruthy()
      expect(localStorage.getItem('user_data')).toBeTruthy()
    })

    test('handles login failure', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      )

      // Mock login to fail
      const FailingAuthTestComponent = () => {
        const { login } = useAuth()
        
        return (
          <button 
            data-testid="failing-login-btn" 
            onClick={() => login('', '')} // Empty credentials should fail
          >
            Login
          </button>
        )
      }

      render(
        <AuthProvider>
          <FailingAuthTestComponent />
        </AuthProvider>
      )

      const loginBtn = screen.getByTestId('failing-login-btn')
      
      await expect(async () => {
        fireEvent.click(loginBtn)
        await waitFor(() => {}, { timeout: 2000 })
      }).rejects.toThrow()
    })

    test('performs logout successfully', async () => {
      // First set up authenticated state
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'landlord'
      }

      localStorage.setItem('auth_token', 'mock_token')
      localStorage.setItem('user_data', JSON.stringify(mockUser))

      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated')
      })

      // Now test logout
      const logoutBtn = screen.getByTestId('logout-btn')
      fireEvent.click(logoutBtn)

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated')
      })

      expect(screen.getByTestId('user-email')).toHaveTextContent('no-user')
      expect(mockPush).toHaveBeenCalledWith('/login')
      expect(localStorage.getItem('auth_token')).toBeNull()
      expect(localStorage.getItem('user_data')).toBeNull()
    })

    test('performs registration successfully', async () => {
      render(
        <AuthProvider>
          <AuthTestComponent />
        </AuthProvider>
      )

      const registerBtn = screen.getByTestId('register-btn')
      
      fireEvent.click(registerBtn)

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated')
      }, { timeout: 2000 })

      expect(screen.getByTestId('user-email')).toHaveTextContent('newuser@example.com')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  describe('useAuth hook', () => {
    test('throws error when used outside AuthProvider', () => {
      // Mock console.error to prevent error output in test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      expect(() => {
        render(<AuthTestComponent />)
      }).toThrow('useAuth must be used within an AuthProvider')

      consoleSpy.mockRestore()
    })
  })

  describe('LoginPage', () => {
    const renderLoginPage = () => {
      return render(
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      )
    }

    test('renders login form correctly', () => {
      renderLoginPage()

      expect(screen.getByText('Welcome back')).toBeInTheDocument()
      expect(screen.getByText('Sign in to your account to continue managing your properties')).toBeInTheDocument()
      expect(screen.getByLabelText('Email address')).toBeInTheDocument()
      expect(screen.getByLabelText('Password')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    test('validates form fields', async () => {
      const user = userEvent.setup()
      renderLoginPage()

      const submitBtn = screen.getByRole('button', { name: /sign in/i })
      
      await user.click(submitBtn)

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument()
        expect(screen.getByText('Password is required')).toBeInTheDocument()
      })
    })

    test('validates email format', async () => {
      const user = userEvent.setup()
      renderLoginPage()

      const emailInput = screen.getByLabelText('Email address')
      const submitBtn = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'invalid-email')
      await user.click(submitBtn)

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
      })
    })

    test('validates password length', async () => {
      const user = userEvent.setup()
      renderLoginPage()

      const passwordInput = screen.getByLabelText('Password')
      const submitBtn = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(passwordInput, '12345') // Less than 6 characters
      await user.click(submitBtn)

      await waitFor(() => {
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
      })
    })

    test('toggles password visibility', async () => {
      const user = userEvent.setup()
      renderLoginPage()

      const passwordInput = screen.getByLabelText('Password')
      const toggleBtn = screen.getByRole('button', { name: '' }) // Eye icon button

      expect(passwordInput).toHaveAttribute('type', 'password')

      await user.click(toggleBtn)
      expect(passwordInput).toHaveAttribute('type', 'text')

      await user.click(toggleBtn)
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    test('submits form with valid credentials', async () => {
      const user = userEvent.setup()
      renderLoginPage()

      const emailInput = screen.getByLabelText('Email address')
      const passwordInput = screen.getByLabelText('Password')
      const submitBtn = screen.getByRole('button', { name: /sign in/i })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitBtn)

      expect(screen.getByText('Signing in...')).toBeInTheDocument()

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith({
          type: 'success',
          title: 'Welcome back!',
          message: 'Successfully signed in. Redirecting to dashboard...'
        })
      }, { timeout: 2000 })
    })

    test('handles login error', async () => {
      const user = userEvent.setup()
      renderLoginPage()

      const emailInput = screen.getByLabelText('Email address')
      const passwordInput = screen.getByLabelText('Password')
      const submitBtn = screen.getByRole('button', { name: /sign in/i })

      await user.type(emailInput, '') // Empty email to trigger error
      await user.type(passwordInput, 'password123')
      await user.click(submitBtn)

      await waitFor(() => {
        expect(screen.getByText('Invalid email or password. Please try again.')).toBeInTheDocument()
        expect(mockShowToast).toHaveBeenCalledWith({
          type: 'error',
          title: 'Sign in failed',
          message: 'Invalid email or password. Please try again.'
        })
      }, { timeout: 2000 })
    })

    test('remember me checkbox works', async () => {
      const user = userEvent.setup()
      renderLoginPage()

      const rememberMeCheckbox = screen.getByRole('checkbox', { name: /remember me/i })

      expect(rememberMeCheckbox).not.toBeChecked()

      await user.click(rememberMeCheckbox)
      expect(rememberMeCheckbox).toBeChecked()

      await user.click(rememberMeCheckbox)
      expect(rememberMeCheckbox).not.toBeChecked()
    })

    test('navigation links are present', () => {
      renderLoginPage()

      expect(screen.getByRole('link', { name: 'Forgot password?' })).toHaveAttribute('href', '/forgot-password')
      expect(screen.getByRole('link', { name: 'Create your account' })).toHaveAttribute('href', '/signup')
      expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms')
      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
    })
  })

  describe('ProtectedRoute', () => {
    const TestComponent = () => <div data-testid="protected-content">Protected Content</div>

    test('renders children when authenticated', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'landlord'
      }

      localStorage.setItem('auth_token', 'mock_token')
      localStorage.setItem('user_data', JSON.stringify(mockUser))

      render(
        <AuthProvider>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </AuthProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument()
      })
    })

    test('shows loading state during auth check', () => {
      render(
        <AuthProvider>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </AuthProvider>
      )

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('redirects to login when not authenticated', async () => {
      render(
        <AuthProvider>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </AuthProvider>
      )

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login')
      })

      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
    })

    test('renders custom fallback during loading', () => {
      const customFallback = <div data-testid="custom-loading">Custom Loading...</div>

      render(
        <AuthProvider>
          <ProtectedRoute fallback={customFallback}>
            <TestComponent />
          </ProtectedRoute>
        </AuthProvider>
      )

      expect(screen.getByTestId('custom-loading')).toBeInTheDocument()
    })
  })
})