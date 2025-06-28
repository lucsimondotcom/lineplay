import { ChessPuzzle } from './ChessPuzzle'

const puzzles = {
  fork: {
    title: 'The Fork',
    fen: '8/8/5qpb/3K2kp/3R4/4P3/6PP/8 w - - 0 1',
    solution: ['h4+', 'Kf5', 'g4+', 'hxg4', 'Rf4+', 'Bxf4', 'e4#'],
  },
  'echo-chamber': {
    title: 'Echo Chamber',
    fen: '5k2/8/2K2p2/6Q1/8/8/8/8 w - - 0 1',
    solution: [],
  },
  lockdown: {
    title: 'Lockdown',
    fen: '8/1k6/8/8/2K5/5Q2/8/8 w - - 0 1',
    solution: [],
  },
}

export default function PuzzlePage({ params }: { params: { puzzleId: string } }) {
  const puzzle = puzzles[params.puzzleId as keyof typeof puzzles]
  
  if (!puzzle) {
    return (
      <div className="py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Puzzle Not Found</h1>
        <p className="text-gray-600">The puzzle you're looking for doesn't exist.</p>
      </div>
    )
  }

  return <ChessPuzzle {...puzzle} />
} 