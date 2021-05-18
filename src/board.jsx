import { useState } from "react"
import Square from "./square"

const Board = () => {
  const boardSize = 40
  const [squares, setSquares] = useState(
    Array(boardSize * boardSize).fill(null)
  )
  const [isX, setIsX] = useState(true)

  const handleClick = (idx) => {
    if (squares[idx]) {
      return
    }
    const newSquares = squares.map((square, index) => {
      if (index === idx) {
        return isX ? `X` : `O`
      }
      return square
    })

    // console.log("isX", isX, "clicked", i)
    setIsX(!isX)
    setSquares(newSquares)
  }

  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
  )

  // const calculateWinner = (i) => {
  //   const r = Math.trunc(i / boardSize)
  //   const c = i % boardSize
  // }

  const status = `Next player: ${isX ? "X" : "O"}`

  return (
    <div>
      <div className="status">{status}</div>

      {Array.from({ length: boardSize }).map((_, row) => (
        <div key={row} className="board-row">
          {Array.from({ length: boardSize }).map((_, column) =>
            renderSquare(row * boardSize + column)
          )}
        </div>
      ))}
    </div>
  )
}

export default Board
