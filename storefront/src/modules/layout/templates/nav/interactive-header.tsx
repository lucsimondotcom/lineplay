"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { StoreRegion } from "@medusajs/types"

interface InteractiveHeaderProps {
  children: React.ReactNode
  regions: StoreRegion[]
}

const InteractiveHeader = ({ children, regions }: InteractiveHeaderProps) => {
  const pathname = usePathname()
  const isHomepage = pathname === "/" || pathname.split("/").length === 2
  const headerRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!isHomepage) {
      // Not homepage, keep header solid
      setIsScrolled(true)
      return
    }

    const header = headerRef.current
    if (!header) return

    // Initial state for homepage
    gsap.set(header, {
      backgroundColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "blur(0px)"
    })

    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 100 // Start transition after 100px scroll

      if (scrollY > threshold) {
        if (!isScrolled) {
          setIsScrolled(true)
          gsap.to(header, {
            backgroundColor: "rgba(255, 255, 255, 1)",
            backdropFilter: "blur(10px)",
            duration: 0.3,
            ease: "power2.out"
          })
        }
      } else {
        if (isScrolled) {
          setIsScrolled(false)
          gsap.to(header, {
            backgroundColor: "rgba(255, 255, 255, 0)",
            backdropFilter: "blur(0px)",
            duration: 0.3,
            ease: "power2.out"
          })
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomepage, isScrolled])

  return (
    <div 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 group"
      style={{ backgroundColor: isHomepage ? "transparent" : "white" }}
    >
      {children}
    </div>
  )
}

export default InteractiveHeader 