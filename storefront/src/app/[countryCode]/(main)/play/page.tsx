import { Metadata } from "next"
import { ChessGame } from "./ChessGame"
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Play",
  description: "Play and discover",
}

const puzzles = [
  {
    id: 'fork',
    title: 'The Fork',
    description: 'Find the winning fork move',
  },
  {
    id: 'echo-chamber',
    title: 'Echo Chamber',
    description: 'Master the echo chamber pattern',
  },
  {
    id: 'lockdown',
    title: 'Lockdown',
    description: 'Learn the lockdown technique',
  },
]

export default function PuzzleSelection() {
  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-center mb-12">Resolve the drop 001 puzzles</h1>
      <div className="max-w-3xl mx-auto grid gap-6">
        {puzzles.map((puzzle) => (
          <Link
            key={puzzle.id}
            href={`/play/${puzzle.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{puzzle.title}</h2>
            <p className="text-gray-600">{puzzle.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

 