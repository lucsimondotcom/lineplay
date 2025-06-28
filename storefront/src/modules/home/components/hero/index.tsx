"use client"

import { Github } from "@medusajs/icons"
import Link from "next/link"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="w-full h-screen relative flex flex-col">
      {/* Fullscreen background image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/hero.jpg" 
          alt="DP_PZL_01 limited" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 text-center pb-24 px-4 z-10">
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
        <Link href="/collections/pzl-01" className="text-white text-sm underline uppercase flex items-center justify-center gap-2">
            Pre-order now
        </Link>
      </div>
    </div>
  )
}

export default Hero
