'use client'

import { useEffect, useState } from 'react'

interface ModernLoadingIndicatorProps {
  isLoading: boolean
}

export default function ModernLoadingIndicator({ isLoading }: ModernLoadingIndicatorProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true)
      setProgress(0)
      
      // Animate progress bar
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setProgress(100)
      setTimeout(() => {
        setIsVisible(false)
        setProgress(0)
      }, 300)
    }
  }, [isLoading])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      {/* Main progress bar */}
      <div className="h-1 bg-gray-100/20 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-black via-gray-800 to-black transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Subtle glow effect */}
      <div 
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-300"
        style={{
          width: `${progress}%`,
          filter: 'blur(1px)'
        }}
      />
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
} 