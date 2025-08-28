'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ConfettiPiece {
  id: number
  left: number
  animationDelay: number
  color: string
}

interface SuccessAnimationProps {
  trigger: boolean
  onComplete?: () => void
}

export function SuccessAnimation({ trigger, onComplete }: SuccessAnimationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (trigger) {
      // Generate confetti pieces
      const pieces: ConfettiPiece[] = []
      const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
      
      for (let i = 0; i < 30; i++) {
        pieces.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 1000,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      
      setConfetti(pieces)
      
      // Clean up after animation
      const timer = setTimeout(() => {
        setConfetti([])
        onComplete?.()
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: piece.color,
            animationDelay: `${piece.animationDelay}ms`,
            animationDuration: '3000ms',
            animationTimingFunction: 'ease-in',
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-confetti-fall {
          animation-name: confetti-fall;
        }
      `}</style>
    </div>,
    document.body
  )
}

// Hook for easy usage
export function useSuccessAnimation() {
  const [isTriggered, setIsTriggered] = useState(false)

  const trigger = () => setIsTriggered(true)
  const reset = () => setIsTriggered(false)

  return { isTriggered, trigger, reset }
}