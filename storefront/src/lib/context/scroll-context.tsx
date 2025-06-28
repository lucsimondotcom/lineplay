"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface ScrollContextType {
  isScrolled: boolean
  isHomepage: boolean
  textColorClass: string
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const useScrollContext = () => {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error("useScrollContext must be used within a ScrollProvider")
  }
  return context
}

interface ScrollProviderProps {
  children: React.ReactNode
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const pathname = usePathname()
  const isHomepage = pathname === "/" || pathname.split("/").length === 2
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Reset scroll state when pathname changes
    setIsScrolled(false)
    
    if (!isHomepage) {
      setIsScrolled(true)
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 100
      setIsScrolled(scrollY > threshold)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomepage, pathname])

  // Determine text color based on scroll state and homepage
  const textColorClass = isHomepage && !isScrolled ? "text-white" : "text-black"

  const value = {
    isScrolled,
    isHomepage,
    textColorClass,
  }

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  )
} 