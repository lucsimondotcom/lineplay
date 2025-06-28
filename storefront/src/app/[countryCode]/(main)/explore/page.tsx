import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore",
  description: "Learn more about our brand and mission",
}

const ExplorePage = () => {
  return (
    <div className="">
      <section className="t">

  <div className="text-center py-20 px-4 md:px-12">
    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Beyond the Game</h1>
    <p className="mt-4 text-lg md:text-xl text-gray-600">We are dedicated to creating exceptional products that enhance your daily life. Our commitment to quality, innovation, and customer satisfaction drives everything we do. A chess-inspired studio from Libourne, France – between Bordeaux and Saint-Émilion.<br />Quality craftsmanship in every product
Sustainable and ethical practices
Customer-centric approach
Innovation and continuous improvement</p>
    <img className="mx-auto mt-10 w-full max-w-4xl rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=1600&h=900&auto=format&fit=crop" alt="Chess Lifestyle" />
  </div>


  <div className="bg-gray-100 py-16 px-6 md:px-20">
    <h2 className="text-3xl font-semibold text-center mb-4">Every Move Matters</h2>
    <p className="max-w-3xl mx-auto text-center text-lg text-gray-700">
      We believe in a world where conflict is resolved through thought, not force. Chess is our symbol. Our shirts are our voice. Each move is a statement. Each drop, a stand for peace.
    </p>
    <blockquote className="mt-6 text-center text-xl font-medium text-gray-900">“We don't play war. We play ideas.”</blockquote>
  </div>


  <div className="py-16 px-6 md:px-20">
    <h2 className="text-3xl font-semibold text-center mb-4">The Art of the Puzzle</h2>
    <p className="max-w-3xl mx-auto text-center text-lg text-gray-700">
      Each puzzle in our drops is handpicked. Mate-in-3s. 5x5 boards. Smart and subtle. Not overused. Always sharp.
    </p>
    <img className="mx-auto mt-10 w-full max-w-2xl rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=1600&h=900&auto=format&fit=crop" alt="Chess Puzzle" />
  </div>


  <div className="bg-gray-100 py-16 px-6 md:px-20">
    <h2 className="text-3xl font-semibold text-center mb-4">Printed by Hand, Made to Last</h2>
    <p className="max-w-3xl mx-auto text-center text-lg text-gray-700">
      Screen printed in France. Organic cotton. Limited drops. No compromises.
    </p>
    <img className="mx-auto mt-10 w-full max-w-2xl rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1600&h=900&auto=format&fit=crop" alt="Screen Printing" />
  </div>


  <div className="py-16 px-6 md:px-20">
    <h2 className="text-3xl font-semibold text-center mb-4">A Modern Code</h2>
    <p className="max-w-3xl mx-auto text-center text-lg text-gray-700">
      Our custom chess piece set is geometric, Bauhaus-inspired, and made for visual impact — even in small format. Because every shape tells a story.
    </p>
    <img className="mx-auto mt-10 w-full max-w-3xl rounded-xl shadow-lg" src="https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1600&h=900&auto=format&fit=crop" alt="Custom Chess Pieces" />
  </div>


  <div className="bg-gray-100 py-16 px-6 md:px-20">
    <h2 className="text-3xl font-semibold text-center mb-4">Open Board, Open Mind</h2>
    <p className="max-w-3xl mx-auto text-center text-lg text-gray-700">
      We support open source. We play on Lichess. We build from passion. Our goal is clear: wear your ideas and share your voice.
    </p>
  </div>


  <div className="text-center py-20 px-4 md:px-12">
    <p className="text-2xl font-semibold text-gray-800">Style is a move. Peace is a message. Let's play.</p>
    <div className="mt-6 text-sm text-gray-500">– Lineplay Studio</div>
  </div>
</section>
    </div>
  )
}

export default ExplorePage 