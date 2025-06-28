"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Logo = () => {
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

  return (
    <LocalizedClientLink
      href="/"
      className="txt-compact-xlarge-plus hover:text-ui-fg-base"
      data-testid="nav-store-link"
    >
      <Image
        src={isHomepage && !isScrolled ? "/images/M8IN3-white.svg" : "/images/M8IN3-black.svg"}
        alt="M8IN3"
        width={85}
        height={19}
        priority
      />
    </LocalizedClientLink>
  )
}

export default Logo 