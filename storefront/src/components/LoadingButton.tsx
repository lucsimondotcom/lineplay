'use client'

import { ReactNode, useState } from 'react'
import { useLoading } from '../lib/hooks/use-loading'

interface LoadingButtonProps {
  children: ReactNode
  onClick?: () => Promise<void> | void
  className?: string
  disabled?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingButton({
  children,
  onClick,
  className = '',
  disabled = false,
  loadingText = 'Loading...',
  variant = 'primary',
  size = 'md'
}: LoadingButtonProps) {
  const [isLocalLoading, setIsLocalLoading] = useState(false)
  const { withLoading } = useLoading()

  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const handleClick = async () => {
    if (!onClick) return
    
    setIsLocalLoading(true)
    
    try {
      if (onClick.constructor.name === 'AsyncFunction') {
        await withLoading(onClick as () => Promise<void>)
      } else {
        onClick()
      }
    } finally {
      setIsLocalLoading(false)
    }
  }

  const isLoading = isLocalLoading

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {isLoading ? loadingText : children}
    </button>
  )
} 