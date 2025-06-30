'use client'

import { useRouter } from 'next/navigation'
import { useNavigationLoading } from '../../components/NavigationLoadingProvider'

export const useNavigationWithLoading = () => {
  const router = useRouter()
  const { startLoading } = useNavigationLoading()

  const push = (href: string, options?: any) => {
    startLoading()
    router.push(href, options)
  }

  const replace = (href: string, options?: any) => {
    startLoading()
    router.replace(href, options)
  }

  const back = () => {
    startLoading()
    router.back()
  }

  const forward = () => {
    startLoading()
    router.forward()
  }

  const refresh = () => {
    startLoading()
    router.refresh()
  }

  return {
    push,
    replace,
    back,
    forward,
    refresh,
    // Also expose the original router for other methods
    router
  }
} 