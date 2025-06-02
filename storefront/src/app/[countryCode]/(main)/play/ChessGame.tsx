'use client'

import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { useState } from 'react'

export function ChessGame() {
  const puzzles = [
    {
      title: 'The Fork',
      fen: '8/8/5qpb/3K2kp/3R4/4P3/6PP/8 w - - 0 1',
      solution: ['h4+', 'Kf5', 'g4+', 'hxg4', 'Rf4+', 'Bxf4', 'e4#'],
    },
    {
      title: 'Echo Chamber',
      fen: '5k2/8/2K2p2/6Q1/8/8/8/8 w - - 0 1',
      solution: [],
    },
    {
      title: 'Lockdown',
      fen: '8/1k6/8/8/2K5/5Q2/8/8 w - - 0 1',
      solution: [],
    },
  ]

  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-4xl font-bold text-center mb-12">Play the Puzzle</h1>
      <div className="max-w-3xl mx-auto gap-8">
        {puzzles.map((puzzle, index) => (
          <Puzzle key={index} title={puzzle.title} fen={puzzle.fen} solution={puzzle.solution} />
        ))}
      </div>
    </div>
  )
}

function Puzzle({ title, fen, solution }: { title: string; fen: string; solution: string[] }) {
  const [game, setGame] = useState(new Chess(fen))
  const [moves, setMoves] = useState<string[]>([])
  const [isSolved, setIsSolved] = useState(false)
  const [isWrongMove, setIsWrongMove] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const resetPuzzle = () => {
    setGame(new Chess(fen))
    setMoves([])
    setIsSolved(false)
    setIsWrongMove(false)
    setIsAnimating(false)
  }

  const checkSolution = (newMoves: string[]) => {
    if (newMoves.length !== solution.length) return false
    return newMoves.every((move, index) => move === solution[index])
  }

  const makeBlackMove = (whiteMove: string) => {
    const moveIndex = moves.length
    if (moveIndex < solution.length - 1) {
      setIsAnimating(true)
      const blackMove = solution[moveIndex + 1]
      const newGame = new Chess(game.fen())
      newGame.move(blackMove)
      
      // Use setTimeout to allow the animation to complete
      setTimeout(() => {
        setGame(newGame)
        setMoves(prev => [...prev, whiteMove, blackMove])
        setIsAnimating(false)
        
        if (checkSolution([...moves, whiteMove, blackMove])) {
          setIsSolved(true)
        }
      }, 300)
    }
  }

  const handleMove = (sourceSquare: string, targetSquare: string) => {
    // Don't allow moves if the game is over or if a move is being animated
    if (isAnimating) {
      return false
    }

    const move = game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' })
    if (!move) return false

    const whiteMove = move.san
    const expectedMove = solution[moves.length]
    
    if (whiteMove === expectedMove) {
      // If this is the final move (checkmate), don't wait for black's move
      if (moves.length === solution.length - 1) {
        setMoves(prev => [...prev, whiteMove])
        setIsSolved(true)
      } else {
        makeBlackMove(whiteMove)
      }
      setIsWrongMove(false)
    } else {
      setIsWrongMove(true)
      // Reset the game after a short delay to show the wrong move
      setTimeout(() => {
        resetPuzzle()
      }, 1000)
    }
    
    return true
  }

  return (
    <div className="p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={resetPuzzle}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
        >
          Reset
        </button>
      </div>
      <Chessboard
        position={game.fen()}
        arePiecesDraggable={!isSolved && !isAnimating}
        onPieceDrop={handleMove}
        animationDuration={300}
      />
      {isSolved && (
        <div className="mt-4 text-center text-green-600 font-semibold">
          Puzzle solved! 🎉
        </div>
      )}
      {isWrongMove && (
        <div className="mt-4 text-center text-red-600 font-semibold">
          Wrong move! Try again.
        </div>
      )}
      <div className="mt-4 text-sm text-gray-600">
        Moves: {moves.join(' ')}
      </div>
    </div>
  )
} 