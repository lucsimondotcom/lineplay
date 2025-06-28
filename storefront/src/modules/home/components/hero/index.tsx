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
      <div className="absolute bottom-0 left-0 right-0 text-center pb-16 px-4 z-10">
        <Heading
          level="h1"
          className="text-6xl text-white uppercase mb-1 drop-shadow-lg"
        >
         PZL_01 Release
        </Heading>
        <Heading
          level="h2"
          className="text-6xl uppercase text-white font-normal drop-shadow-lg"
        >
        Limited edition
        </Heading>
        <Link href="/collections/pzl-01" className="text-white uppercase flex items-center gap-2">
            Preorder the first drop...
        </Link>
      </div>
    </div>
  )
}

export default Hero
