'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ToastConfig {
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
}

interface ToastContextType {
  showToast: (config: ToastConfig) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastConfig[]>([])

  const showToast = (config: ToastConfig) => {
    console.log('Toast:', config)
    setToasts(prev => [...prev, config])
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t !== config))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <Toast key={index} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Simple mock toast for testing
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    // Fallback for when not wrapped in provider
    return {
      showToast: (config: ToastConfig) => {
        console.log('Toast (no provider):', config)
      }
    }
  }
  return context
}

// Basic Toast component
export function Toast({ type, title, message }: ToastConfig) {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500', 
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }[type]

  return (
    <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg`}>
      <div className="font-semibold">{title}</div>
      {message && <div className="text-sm">{message}</div>}
    </div>
  )
}