import { useState } from "react"
import styled from "styled-components"
import Square from "./square"

const boardSize = 40

const Frame = styled.div`
  display: grid;
  grid-template-columns: repeat(${boardSize}, 1fr);
  grid-template-rows: repeat(${boardSize}, 1fr);
  gap: 0;
`

const Status = styled.div`
  margin-bottom: 10px;
`

const Board = () => {
  const [squares, setSquares] = useState(
    Array(boardSize * boardSize).fill(null)
  )
  const [isX, setIsX] = useState(true)

  const haveWinner = (idx, newSquares) => {
    const x = idx % boardSize
    const y = Math.trunc(idx / boardSize)

    const directions = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ]

    const square = isX ? `X` : `O`

    for (const dir of directions) {
      let count = 0
      let list = []

      for (let i = -5; i <= 5; i++) {
        const newX = i * dir.x + x
        const newY = i * dir.y + y
        const [newSquare] = newSquares[newX + boardSize * newY] || []

        if (0 <= newX && newX < boardSize && square === newSquare) {
          count++
          list.push(newX + boardSize * newY)
        } else {
          count = 0
          list = []
        }

        if (count >= 5) {
          return [true, list]
        }
      }
    }

    return [false]
  }

  const handleClick = (idx) => () => {
    if (squares[idx]) {
      return
    }
    const newSquares = squares.map((square, index) => {
      if (index === idx) {
        return isX ? `X` : `O`
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
          return [square, true]
        }
        return square
      })
      setSquares(markedSquares)
    }
  }

  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onClick={handleClick(i)} />
  )

  const status = `Next player: ${isX ? "X" : "O"}`

  return (
    <>
      <Status>{status}</Status>

      <Frame>
        {Array.from({ length: boardSize * boardSize }).map((_, idx) =>
          renderSquare(idx)
        )}
      </Frame>
    </>
  )
}

export default Board
