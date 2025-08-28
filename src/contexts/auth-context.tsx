'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  role: 'landlord' | 'admin'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: RegisterData) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  name: string
  companyName?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Simulate checking for stored auth token
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')
      
      if (token && userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      if (email && password) {
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'landlord'
        }
        
        // Store auth data
        localStorage.setItem('auth_token', 'mock_token_' + Date.now())
        localStorage.setItem('user_data', JSON.stringify(mockUser))
        
        setUser(mockUser)
        router.push('/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true)
    
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: 'landlord'
      }
      
      // Store auth data
      localStorage.setItem('auth_token', 'mock_token_' + Date.now())
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      setUser(mockUser)
      router.push('/dashboard')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setIsLoading(true)
    
    try {
      // Clear stored auth data
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      
      setUser(null)
      router.push('/login')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}