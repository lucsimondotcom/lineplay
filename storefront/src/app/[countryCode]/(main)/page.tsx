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

      <section className="py-12 px-4 border-b border-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="product p-4 text-center">
            <p><strong>The story</strong>Every detail deliberate. Born in France, executed with precision. A line of garments inspired by tactical aesthetics and limited like fine prints.</p>
          </div>
          <div className="product p-4 text-center">
            <p><strong>Craftmanship</strong>Screen-printed by hand, one by one. Each shirt is an artifact. On organic Stanley/Stella cotton. No shortcuts. No second takes.</p>
          </div>
          <div className="product p-4 text-center">
            <p><strong>Ethos</strong>Quiet power. We don't shout. We suggest. Lineplay builds worlds—each drop is an entry, a concept, a signal for those who recognize the nuance.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-b border-black">
        <div className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="feature p-4 text-center">🇫🇷 Made in France</div>
          <div className="feature p-4 text-center">🌱 100% Organic Cotton</div>
          <div className="feature p-4 text-center">🎯 Limited Editions</div>
          <div className="feature p-4 text-center">🌍 Worldwide Shipping</div>
          <div className="feature p-4 text-center">🖐 Hand Screen-Printed</div>
          <div className="feature p-4 text-center">♟ Premium Craft</div>
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
