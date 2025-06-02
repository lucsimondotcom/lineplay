import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore",
  description: "Learn more about our brand and mission",
}

const ExplorePage = () => {
  return (
    <div className="content-container py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" data-testid="explore-page-title">
          Explore Our Story
        </h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              We are dedicated to creating exceptional products that enhance your daily life. 
              Our commitment to quality, innovation, and customer satisfaction drives everything we do.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">Quality craftsmanship in every product</li>
              <li className="mb-2">Sustainable and ethical practices</li>
              <li className="mb-2">Customer-centric approach</li>
              <li className="mb-2">Innovation and continuous improvement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
            <p className="text-gray-700">
              Founded with a vision to revolutionize the industry, we've grown from a small startup 
              to a trusted name in the market. Our journey is marked by continuous learning, 
              adaptation, and a steadfast commitment to our core values.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
            <p className="text-gray-700">
              We invite you to be part of our story. Whether you're a customer, partner, or team member, 
              together we can create something extraordinary.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ExplorePage 