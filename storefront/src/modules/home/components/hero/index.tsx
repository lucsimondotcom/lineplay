"use client"

import { Github } from "@medusajs/icons"
import Link from "next/link"
import { Button, Heading } from "@medusajs/ui"
import { useEffect, useRef } from "react"

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const textElement = textRef.current

      if (textElement) {
        // Text moves up faster (2x speed)
        const textTranslateY = scrollY * 0.3
        textElement.style.transform = `translateY(-${textTranslateY}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="w-full h-screen relative flex flex-col overflow-hidden">
      {/* Fullscreen background image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/hero_final.jpg" 
          alt="DP_PZL_01 limited" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text overlay at the bottom */}
      <div ref={textRef} className="absolute bottom-0 left-0 right-0 text-center pb-24 px-4 z-10">
        <Heading
          level="h1"
          className="text-6xl text-white uppercase mb-1 drop-shadow-lg font-times-now"
        >
         PZL_01 Drop
        </Heading>
        <Heading
          level="h2"
          className="text-6xl uppercase text-white drop-shadow-lg font-times-now-italic"
        >
        Limited edition
        </Heading>
        <Link href="/collections/featured" className="text-white text-xs underline uppercase flex items-center justify-center gap-2 mt-4 underline-offset-4">
            Pre-order now
        </Link>
      </div>
    </div>
  )
}

export default Hero
