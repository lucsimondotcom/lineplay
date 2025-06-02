import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Play",
  description: "Play and discover",
}

const PlayPage = () => {
  return (
    <div className="content-container py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" data-testid="play-page-title">
          Play
        </h1>
      </div>
    </div>
  )
}

export default PlayPage 