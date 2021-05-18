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

  const handleClick = () => (idx) => {
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
    <Square key={i} value={squares[i]} onClick={handleClick(i)} />
  )

  // const calculateWinner = (i) => {
  //   const r = Math.trunc(i / boardSize)
  //   const c = i % boardSize
  // }

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
