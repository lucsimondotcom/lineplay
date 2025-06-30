'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import EnhancedLoadingIndicator from './EnhancedLoadingIndicator'

interface NavigationLoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  startLoading: () => void
  stopLoading: () => void
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType | undefined>(undefined)

export const useNavigationLoading = () => {
  const context = useContext(NavigationLoadingContext)
  if (!context) {
    throw new Error('useNavigationLoading must be used within a NavigationLoadingProvider')
  }
  return context
}

interface NavigationLoadingProviderProps {
  children: React.ReactNode
}

export default function NavigationLoadingProvider({ children }: NavigationLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const startLoading = () => {
    setIsLoading(true)
    
    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
    }
  }

  const stopLoading = () => {
    // Add a minimum loading time for smooth UX
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 200)
    
    setLoadingTimeout(timeout)
  }

  // Handle route changes - stop loading when navigation completes
  useEffect(() => {
    // Stop loading when route changes (page has loaded)
    const timeout = setTimeout(() => {
      stopLoading()
    }, 100)

    return () => {
      clearTimeout(timeout)
      if (loadingTimeout) {
        clearTimeout(loadingTimeout)
      }
    }
  }, [pathname, searchParams])

  // Set up global click listeners for navigation links
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const link = target.closest('a')
      
      if (link) {
        const href = link.getAttribute('href')
        const isExternal = link.getAttribute('target') === '_blank' || 
                          link.getAttribute('rel')?.includes('external')
        
        // Start loading for internal navigation
        if (href && !isExternal && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          startLoading()
        }
      }
    }

    // Listen for clicks on the document
    document.addEventListener('click', handleLinkClick)
    
    // Also listen for programmatic navigation
    const handleBeforeUnload = () => {
      startLoading()
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('click', handleLinkClick)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      if (loadingTimeout) {
        clearTimeout(loadingTimeout)
      }
    }
  }, [loadingTimeout])

  // Intercept router.push calls
  useEffect(() => {
    const originalPush = router.push
    const originalReplace = router.replace

    // Override router.push
    router.push = function(href: string, options?: any) {
      startLoading()
      return originalPush.call(this, href, options)
    }

    // Override router.replace
    router.replace = function(href: string, options?: any) {
      startLoading()
      return originalReplace.call(this, href, options)
    }

    return () => {
      // Restore original methods
      router.push = originalPush
      router.replace = originalReplace
    }
  }, [router])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout)
      }
    }
  }, [loadingTimeout])

  return (
    <NavigationLoadingContext.Provider 
      value={{ 
        isLoading, 
        setIsLoading, 
        startLoading, 
        stopLoading 
      }}
    >
      {children}
      <EnhancedLoadingIndicator isLoading={isLoading} />
    </NavigationLoadingContext.Provider>
  )
} 