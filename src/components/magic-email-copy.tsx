'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

interface MagicEmailCopyProps {
  email: string
  className?: string
}

export function MagicEmailCopy({ email, className = '' }: MagicEmailCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    
    // Create sparkle animation
    createSparkleAnimation()
    
    // Reset after 3 seconds
    setTimeout(() => setCopied(false), 3000)
  }

  const createSparkleAnimation = () => {
    // Create multiple sparkle elements
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('div')
      sparkle.className = 'sparkle'
      sparkle.innerHTML = '✨'
      
      // Position around the button
      const button = document.activeElement as HTMLElement
      const rect = button?.getBoundingClientRect()
      
      if (rect) {
        const x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 200
        const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 200
        
        sparkle.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          font-size: ${Math.random() * 20 + 15}px;
          pointer-events: none;
          z-index: 9999;
          animation: sparkleFloat ${Math.random() * 2 + 2}s ease-out forwards;
        `
        
        document.body.appendChild(sparkle)
        
        // Remove after animation
        setTimeout(() => {
          if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle)
          }
        }, 4000)
      }
    }
    
    // Show success message
    const successMessage = document.createElement('div')
    successMessage.className = 'magic-success-message'
    successMessage.innerHTML = '✨ Your AI assistant is ready!'
    
    successMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      pointer-events: none;
      z-index: 10000;
      animation: magicAppear 3s ease-out forwards;
    `
    
    document.body.appendChild(successMessage)
    
    // Remove success message after animation
    setTimeout(() => {
      if (document.body.contains(successMessage)) {
        document.body.removeChild(successMessage)
      }
    }, 3000)
    
    // Inject CSS animations if not already present
    if (!document.getElementById('magic-animations')) {
      const style = document.createElement('style')
      style.id = 'magic-animations'
      style.textContent = `
        @keyframes sparkleFloat {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-30px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0) rotate(180deg);
          }
        }
        
        @keyframes magicAppear {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.05);
          }
          30% {
            transform: translate(-50%, -50%) scale(1);
          }
          80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
        }
      `
      document.head.appendChild(style)
    }
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleCopy}
      className={`transition-all duration-300 ${
        copied 
          ? 'bg-green-500 hover:bg-green-600 text-white border-green-500 scale-105' 
          : 'hover:bg-blue-50 hover:border-blue-300 hover:scale-105'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 mr-1" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-3 h-3 mr-1" />
          Copy
        </>
      )}
    </Button>
  )
}