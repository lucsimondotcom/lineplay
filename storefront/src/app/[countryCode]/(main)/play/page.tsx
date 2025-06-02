import { Metadata } from "next"
import { ChessGame } from "./ChessGame"

export const metadata: Metadata = {
  title: "Play",
  description: "Play and discover",
}

export default function PlayPage() {
  return <ChessGame />
}

 