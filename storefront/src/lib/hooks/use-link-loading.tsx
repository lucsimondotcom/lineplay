'use client'

import { useNavigationLoading } from '../../components/NavigationLoadingProvider'

export const useLinkLoading = () => {
  const { startLoading } = useNavigationLoading()

  const handleLinkClick = () => {
    // Start loading immediately on click
    startLoading()
  }

  return {
    handleLinkClick
  }
} 