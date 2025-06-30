'use client'

import { useEffect, useState, useRef } from 'react'

interface EnhancedLoadingIndicatorProps {
  isLoading: boolean
}

export default function EnhancedLoadingIndicator({ isLoading }: EnhancedLoadingIndicatorProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [dots, setDots] = useState('')
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const dotsIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup function to clear all intervals and timeouts
  const cleanup = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    if (dotsIntervalRef.current) {
      clearInterval(dotsIntervalRef.current)
      dotsIntervalRef.current = null
    }
    if (cleanupTimeoutRef.current) {
      clearTimeout(cleanupTimeoutRef.current)
      cleanupTimeoutRef.current = null
    }
  }

  useEffect(() => {
    if (isLoading) {
      // Clean up any existing intervals first
      cleanup()
      
      // Show immediately and start progress
      setIsVisible(true)
      setProgress(0)
      setDots('')
      
      // Start progress animation immediately
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current)
              progressIntervalRef.current = null
            }
            return 85
          }
          // Faster initial progress for immediate feedback
          const increment = Math.random() * 12 + 3
          return Math.min(prev + increment, 85)
        })
      }, 100)

      // Animate loading dots
      dotsIntervalRef.current = setInterval(() => {
        setDots(prev => {
          if (prev === '...') return ''
          return prev + '.'
        })
      }, 400)

    } else {
      // Complete the progress bar quickly
      setProgress(100)
      
      // Clean up intervals immediately
      cleanup()
      
      // Hide after completion animation
      cleanupTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
        setProgress(0)
        setDots('')
      }, 300)
    }

    // Cleanup on unmount or when isLoading changes
    return cleanup
  }, [isLoading])

  // Additional cleanup on unmount
  useEffect(() => {
    return cleanup
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      {/* Main progress bar with gradient */}
      <div className="h-0.5 bg-gradient-to-r from-gray-100/30 via-gray-200/20 to-gray-100/30 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-black via-gray-700 to-black transition-all duration-300 ease-out relative overflow-hidden"
          style={{
            width: `${progress}%`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite'
          }}
        >
          {/* Shimmer effect overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              animation: 'shimmer-overlay 1.2s ease-in-out infinite'
            }}
          />
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div 
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-300"
        style={{
          width: `${progress}%`,
          filter: 'blur(2px)',
          opacity: 0.6
        }}
      />
      
      {/* Loading text indicator */}
      {progress > 10 && (
        <div className="absolute top-2 right-4 text-xs text-gray-600 font-medium opacity-80">
          Loading{dots}
        </div>
      )}
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes shimmer-overlay {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
} 