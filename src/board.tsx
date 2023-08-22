import { useEffect, useMemo, useState } from "react"
import { Square } from "@/square"
import { type SquareType } from "@/types"

const boardSize = 40
const defaultSquares = Array(boardSize * boardSize).fill({}) as SquareType[]

type Props = {
  gameOver: boolean
  setGameOver: (value: boolean) => void
}

export const Board = (props: Props) => {
  const [squares, setSquares] = useState(defaultSquares)
  const [isX, setIsX] = useState(true)
  const [moveHistory, setMoveHistory] = useState<number[]>([])

  const square = useMemo(() => (isX ? "X" : "O"), [isX])

  const haveWinner = (idx: number, newSquares: SquareType[]): [boolean, number[]] => {
    const x = idx % boardSize
    const y = Math.trunc(idx / boardSize)

    const directions = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ]

    for (const dir of directions) {
      let list: number[] = []

      for (let i = -5; i <= 5; i++) {
        const newX = i * dir.x + x
        const newY = i * dir.y + y
        const { piece: newSquare } = newSquares[newX + boardSize * newY] ?? {}

        if (0 <= newX && newX < boardSize && square === newSquare) {
          list.push(newX + boardSize * newY)
        } else {
          list = []
        }

        if (list.length >= 5) {
          return [true, list]
        }
      }
    }

    return [false, []]
  }

  const handleUndo = () => {
    if (props.gameOver) {
      return
    }

    const undoSquareIndex = moveHistory.slice(-1).pop()

    if (undoSquareIndex !== undefined) {
      setIsX(!isX)
      setMoveHistory(moveHistory.slice(0, -1))
      setSquares(
        squares.map((square, index) =>
          index === undoSquareIndex ? { piece: undefined } : { ...square, color: undefined }
        )
      )
    }
  }

  const handleClick = (idx: number) => () => {
    if (props.gameOver) {
      return
    }

    const { piece } = squares[idx]

    if (piece) {
      return
    }

    const newSquares = squares.map((square, index) => {
      if (index === idx) {
        return { piece: isX ? `X` : `O` } as SquareType
      }
      return square
    })

    // console.log("isX", isX, "clicked", idx)
    setIsX(!isX)
    setSquares(newSquares)
    setMoveHistory([...moveHistory, idx])

    const [winner, list] = haveWinner(idx, newSquares)
    // console.log("winner", winner, list)

    if (winner) {
      props.setGameOver(true)
      const markedSquares = newSquares.map((square, index) => {
        if (list.includes(index)) {
          return { ...square, color: true }
        }
        return square
      })
      setSquares(markedSquares)
    }
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--board-size", String(boardSize))
  })

  return (
    <>
      <div className="mb-2.5 flex h-8 w-full flex-row items-end justify-between gap-2">
        <div>
          Next player: <span className="font-bold">{square}</span>
        </div>

        {moveHistory.length > 0 && (
          <button className="rounded border bg-slate-100 px-4 py-1 transition hover:bg-slate-200" onClick={handleUndo}>
            undo
          </button>
        )}
      </div>

      <div className="mr-px mt-px grid grid-cols-board grid-rows-board gap-0">
        {squares.map((square, idx) => (
          <Square key={idx} value={square} onClick={handleClick(idx)} />
        ))}
      </div>
    </>
  )
}
