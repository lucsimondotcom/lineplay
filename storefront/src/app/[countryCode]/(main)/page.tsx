import { Metadata } from "next"
import Image from "next/image"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "lineplay - limited edition clothing",
  description:
    "A curated release of hand screen printed collectibles.",
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

      <section className="py-12 px-4 border-t border-b border-black">
        <div className="max-w-7xl mx-auto text-center text-3xl">
        <h3>We are lineplay.</h3>
        <p>Creators of limited edition garments at the intersection of design, chess, and meaning. For those who think deeply, move deliberately, and wear their convictions.</p>
        </div>
      </section>



      <section className="border-b border-black">
      <div className="grid grid-cols-1 md:grid-cols-3">

  
        <div>
          <img
            src="/images/2.jpg"
            alt="Where It Begins"
            className="w-full h-[600px] object-cover mb-4"
          />
          <h3 className="px-10 text-2xl font-bold">Where It Begins</h3>
          <p className="p-10 text-gray-700">
            Conceived between logic and art. Each drop is a move—a thought made visible.
            From Libourne to your hands: an idea sharpened into form.
          </p>
          <div className="px-10 pb-10">
            <button className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>


        <div>
          <img
            src="/images/craftmanship.jpg"
            alt="How It's Made"
            className="w-full h-[600px] object-cover mb-4"
          />
          <h3 className="px-10 text-2xl font-bold">How It's Made</h3>
          <p className="p-10 text-gray-700">
            Pulled by hand. No automation. No compromise.
            Organic cotton from Stanley/Stella, printed one by one—slowly, precisely.
          </p>
          <div className="px-10 pb-10">
            <button className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>

 
        <div>
          <img
            src="/images/ethos.jpg"
            alt="What It Stands For"
            className="w-full h-[600px] object-cover mb-4"
          />
          <h3 className="px-10 text-2xl font-bold">What It Stands For</h3>
          <p className="p-10 text-gray-700">
            We speak in systems and symbols.
            Each shirt is an argument, each puzzle a philosophy.
            Style is the surface. Meaning lies beneath.
          </p>
          <div className="px-10 pb-10">
            <button className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>

      </div>
    </section>

      <section className="py-16 px-4 border-b border-black uppercase">
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

      <section className="py-12">
        <ul className="flex flex-col gap-x-6">
        <h4 className="text-2xl font-bold mt-6 text-center">Pre-order the Drop_001 Release</h4>
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </section>

      <section className="py-12 border-t border-black"> 
        <div className="max-w-7xl mx-auto text-center">
          <h4 className="text-2xl font-bold mb-6">stay tuned for the next drop</h4>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-black focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white hover:bg-gray-900 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
