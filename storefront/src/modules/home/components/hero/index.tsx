"use client"

import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Hero = () => {
  const popinRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const popin = popinRef.current
    const container = imageContainerRef.current

    if (!popin || !container) return

    // Initial state
    gsap.set(popin, {
      opacity: 0,
      scale: 0.8,
      xPercent: -50,
      yPercent: -50
    })

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      gsap.set(popin, {
        xPercent: x - 50,
        yPercent: y - 50
      })
    }

    // Hover animation
    container.addEventListener("mouseenter", () => {
      gsap.to(popin, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      })
    })

    container.addEventListener("mouseleave", () => {
      gsap.to(popin, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in"
      })
    })

    // Add mousemove listener
    container.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="w-full h-screen relative flex flex-col">
      {/* Fullscreen background image */}
      <div className="absolute inset-0 w-full h-full" ref={imageContainerRef}>
        <img 
          src="/images/hero.jpg" 
          alt="DP_PZL_01 limited" 
          className="w-full h-full object-cover"
        />
        <div 
          ref={popinRef}
          className="absolute bg-black text-white px-6 py-3 shadow-lg pointer-events-none z-50"
          style={{ 
            left: '50%',
            top: '50%',
            minWidth: '200px',
            textAlign: 'center'
          }}
        >
          <p className="text-white font-medium whitespace-nowrap">Preorder the first drop...</p>
        </div>
      </div>
      
      {/* Text overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 text-center pb-16 px-4 z-10">
        <Heading
          level="h1"
          className="text-2xl leading-10 text-white uppercase mb-1 drop-shadow-lg"
        >
         DP_PZL_01 limited
        </Heading>
        <Heading
          level="h2"
          className="text-sm uppercase leading-5 text-white font-normal drop-shadow-lg"
        >
         A curated release of hand screen printed collectibles.<br />
         Each print a game, each drop a move.
        </Heading>
      </div>
    </div>
  )
}

export default Hero
