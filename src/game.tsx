import { Board } from "@/board"
import { useState } from "react"
import { useViewportSize } from "@mantine/hooks"
import Confetti from "react-confetti"

export const Game = () => {
  const [gameOver, setGameOver] = useState(false)
  const { height, width } = useViewportSize()

  return (
    <>
      {gameOver && (
        <div className="fixed inset-0 z-10 overflow-hidden bg-white/60">
          <Confetti width={width} height={height} />
        </div>
      )}
      <div className="flex flex-col items-start">
        <Board gameOver={gameOver} setGameOver={setGameOver} />
      </div>
    </>
  )
}
