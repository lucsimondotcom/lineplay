'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface PageLoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(undefined)

export const usePageLoading = () => {
  const context = useContext(PageLoadingContext)
  if (!context) {
    throw new Error('usePageLoading must be used within a PageLoadingProvider')
  }
  return context
}

interface PageLoadingProviderProps {
  children: React.ReactNode
}

export default function PageLoadingProvider({ children }: PageLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    
    // Simulate a brief loading state for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <PageLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      <PageLoadingIndicator isLoading={isLoading} />
    </PageLoadingContext.Provider>
  )
}

interface PageLoadingIndicatorProps {
  isLoading: boolean
}

function PageLoadingIndicator({ isLoading }: PageLoadingIndicatorProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 bg-gray-100 z-[9999] transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`h-full bg-gradient-to-r from-black via-gray-800 to-black transition-all duration-500 ease-out ${
          isLoading ? 'w-full' : 'w-0'
        }`}
        style={{
          backgroundSize: '200% 100%',
          animation: isLoading ? 'shimmer 1.5s ease-in-out infinite' : 'none'
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