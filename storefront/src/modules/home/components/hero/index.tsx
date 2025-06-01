import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full text-center py-16">
        <Heading
          level="h1"
          className="text-3xl leading-10 text-ui-fg-base font-normal"
        >
         Strategy in Thread
        </Heading>
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base font-normal"
        >
         A curated release of collectible chess T-shirts.<br />
         Each print a game. Each drop a move.
        </Heading>
      </div>
      <div className="w-3/4">
        <img 
          src="/images/hero.png" 
          alt="Hero image" 
          className="w-full object-cover"
        />
      </div>
    </div>
  )
}

export default Hero
