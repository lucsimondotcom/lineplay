import { Metadata } from "next"
import Image from "next/image"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "M8IN3 - Wear your Move.",
  description:
    "Premium games-inspired T-shirts. Wear your move with bold, strategic, and minimalist designs. Limited drops, made to play.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />



    

      <section className="py-12">
        <ul className="flex flex-col gap-x-6">
        <h4 className="text-2xl uppercase text-center">Pre-order</h4>
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </section>

      <section className="py-12 px-4 border-t border-b border-ui-border-base">
        <div className="max-w-7xl mx-auto text-center text-xl">
        <h3>We are Drawnpiece. Creators of limited edition garments at the intersection of design, chess, and meaning. For those who think deeply, move deliberately, and wear their convictions.</h3>
        </div>
      </section>

      <section className="w-full h-screen relative">
        <Image src="/images/hero_3.jpg" alt="Hero Image" fill className="object-cover" />
      </section>

      <section className="py-16 px-4 uppercase border-t border-ui-border-base">
        <div className="">
          <div className="w-full flex justify-evenly items-center text-sm">
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 flex items-center justify-center">
                <Image
                  src="/images/icon_limited.svg"
                  alt="Limited Editions"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-4">Limited Editions</span>
            </div>
  
            
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 flex items-center justify-center">
                <Image
                  src="/images/icon_brush.svg"
                  alt="Hand Screen-Printed"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-4">Hand Screen-Printed</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-11 h-11 flex items-center justify-center">
                <Image
                  src="/images/icon_organic.svg"
                  alt="Organic"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-4">100% Organic Cotton</span>
            </div>
    
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 flex items-center justify-center">
                <Image
                  src="/images/icon_france.svg"
                  alt="Made in France"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-4">Made in France</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-11 h-11 flex items-center justify-center">
                <Image
                  src="/images/icon_shipping.svg"
                  alt="Worldwide Shipping"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-4">Worldwide Shipping</span>
            </div>
          </div>
        </div>
      </section>



    </>
  )
}
