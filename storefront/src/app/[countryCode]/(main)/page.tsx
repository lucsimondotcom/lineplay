import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
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
        <p>Creators of limited-run garments at the intersection of design, strategy, and story. For minds that think in silence and dress with intent.</p>
        </div>
      </section>



      <section className="border-b border-black">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className="product">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80"
              alt="The story"
              className="w-full h-[300px] object-cover mb-4"
            />
            <p className="p-10"><strong>The story</strong>Every detail deliberate. Born in France, executed with precision. A line of garments inspired by tactical aesthetics and limited like fine prints.</p>
          </div>
          <div className="product">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80"
              alt="Craftmanship"
              className="w-full h-[300px] object-cover mb-4"
            />
            <p className="p-10"><strong>Craftmanship</strong>Screen-printed by hand, one by one. Each shirt is an artifact. On organic Stanley/Stella cotton. No shortcuts. No second takes.</p>
          </div>
          <div className="product">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80"
              alt="Ethos"
              className="w-full h-[300px] object-cover mb-4"
            />
            <p className="p-10"><strong>Ethos</strong>Quiet power. We don't shout. We suggest. Lineplay builds worlds—each drop is an entry, a concept, a signal for those who recognize the nuance.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-b border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center text-sm tracking-wider font-light">
            <span className="text-lg mr-2">🇫🇷</span>Made in France
            <span className="mx-8 text-neutral-300">•</span>
            <span className="text-lg mr-2">🌱</span>100% Organic Cotton
            <span className="mx-8 text-neutral-300">•</span>
            <span className="text-lg mr-2">🎯</span>Limited Editions
            <span className="mx-8 text-neutral-300">•</span>
            <span className="text-lg mr-2">🌍</span>Worldwide Shipping
            <span className="mx-8 text-neutral-300">•</span>
            <span className="text-lg mr-2">🖐</span>Hand Screen-Printed
            <span className="mx-8 text-neutral-300">•</span>
            <span className="text-lg mr-2">♟</span>Premium Craft
          </div>
        </div>
      </section>

      <section className="py-12">
        <ul className="flex flex-col gap-x-6">
        <h4 className="text-2xl font-bold mb-6 text-center">Pre-order the drop 001 release</h4>
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </section>
    </>
  )
}
