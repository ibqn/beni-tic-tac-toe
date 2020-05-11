import React, { useState } from "react"
import Square from "./square"

const Board = () => {
  const boardSize = 40
  const [squares, setSquares] = useState(
    Array(boardSize * boardSize).fill(null)
  )
  const [isX, setIsX] = useState(true)

  const handleClick = (i) => {
    let newSquares = squares.slice()
    newSquares[i] = isX ? `X` : `O`

    console.log("isX", isX, "clicked", i)
    setIsX(!isX)
    setSquares(newSquares)
  }

  const renderSquare = (i) => {
    return <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
  }

  const status = `Next player: ${isX ? "X" : "O"}`

  return (
    <div>
      <div className="status">{status}</div>

      {Array.from({ length: boardSize }).map((_, i) => {
        return (
          <div key={i} className="board-row">
            {Array.from({ length: boardSize }).map((_, j) => {
              return renderSquare(i * boardSize + j)
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Board
