import { useEffect, useMemo, useState } from "react"
import { Square } from "@/square"
import { type SquareType } from "@/type"

const boardSize = 40

export const Board = () => {
  const [squares, setSquares] = useState(Array(boardSize * boardSize).fill([null]) as SquareType[])
  const [isX, setIsX] = useState(true)

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
        const [newSquare] = newSquares[newX + boardSize * newY] || []

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

  const handleClick = (idx: number) => () => {
    const [value] = squares[idx]

    if (value) {
      return
    }

    const newSquares = squares.map((square, index) => {
      if (index === idx) {
        return [isX ? `X` : `O`] as SquareType
      }
      return square
    })

    // console.log("isX", isX, "clicked", idx)
    setIsX(!isX)
    setSquares(newSquares)

    const [winner, list] = haveWinner(idx, newSquares)
    // console.log("winner", winner, list)

    if (winner) {
      const markedSquares = newSquares.map((square, index) => {
        if (list.includes(index)) {
          const [value] = square
          return [value, true] as SquareType
        }
        return square
      })
      setSquares(markedSquares)
    }
  }

  const renderSquare = (i: number) => <Square key={i} value={squares[i]} onClick={handleClick(i)} />

  useEffect(() => {
    document.documentElement.style.setProperty("--board-size", String(boardSize))
  })

  return (
    <>
      <div className="mb-2.5">
        Next player: <span className="font-bold">{square}</span>
      </div>

      <div className="mr-px mt-px grid grid-cols-board grid-rows-board gap-0">
        {Array.from({ length: boardSize * boardSize }).map((_, idx) => renderSquare(idx))}
      </div>
    </>
  )
}
