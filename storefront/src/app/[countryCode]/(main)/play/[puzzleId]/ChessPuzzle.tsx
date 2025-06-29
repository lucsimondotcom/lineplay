'use client'

import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { useState } from 'react'
import Link from 'next/link'

interface ChessPuzzleProps {
  title: string
  fen: string
  solution: string[]
}

export function ChessPuzzle({ title, fen, solution }: ChessPuzzleProps) {
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
    if (isAnimating) {
      return false
    }

    const move = game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' })
    if (!move) return false

    const whiteMove = move.san
    const expectedMove = solution[moves.length]
    
    if (whiteMove === expectedMove) {
      if (moves.length === solution.length - 1) {
        setMoves(prev => [...prev, whiteMove])
        setIsSolved(true)
      } else {
        makeBlackMove(whiteMove)
      }
      setIsWrongMove(false)
    } else {
      setIsWrongMove(true)
      setTimeout(() => {
        resetPuzzle()
      }, 1000)
    }
    
    return true
  }

  return (
    <div className="py-16 px-4 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{title}</h1>
          <Link
            href="/play"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
          >
            Back to Puzzles
          </Link>
        </div>
        
        <div className="p-4 bg-white shadow-md">
          <div className="flex justify-between items-center mb-4">
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
      </div>
    </div>
  )
} 