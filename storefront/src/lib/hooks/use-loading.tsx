'use client'

import { useCallback } from 'react'
import { useNavigationLoading } from '../../components/NavigationLoadingProvider'

export const useLoading = () => {
  const { startLoading, stopLoading, isLoading } = useNavigationLoading()

  const withLoading = useCallback(async <T,>(
    asyncFunction: () => Promise<T>
  ): Promise<T> => {
    try {
      startLoading()
      const result = await asyncFunction()
      return result
    } finally {
      stopLoading()
    }
  }, [startLoading, stopLoading])

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading
  }
} 