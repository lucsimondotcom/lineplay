'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { useLinkLoading } from '../lib/hooks/use-link-loading'

interface LoadingLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  [key: string]: any
}

export default function LoadingLink({ 
  href, 
  children, 
  className = '', 
  onClick,
  ...props 
}: LoadingLinkProps) {
  const { handleLinkClick } = useLinkLoading()

  const handleClick = (e: React.MouseEvent) => {
    // Start loading immediately
    handleLinkClick()
    
    // Call original onClick if provided
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  )
} 