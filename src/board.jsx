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

    let countR = 0
    let countC = 0
    let countD = 0
    let countE = 0

    let listR = []
    let listC = []
    let listD = []
    let listE = []

    const square = isX ? `X` : `O`

    for (let i = -5; i <= 5; i++) {
      if (
        0 <= i + x &&
        i + x < boardSize &&
        square === newSquares[i + x + boardSize * y]
      ) {
        countR++
        listR.push(i + x + boardSize * y)
      } else {
        countR = 0
        listR = []
      }

      if (square === newSquares[x + boardSize * (y + i)]) {
        countC++
        listC.push(x + boardSize * (y + i))
      } else {
        countC = 0
        listC = []
      }

      if (
        0 <= i + x &&
        i + x < boardSize &&
        square === newSquares[x + i + boardSize * (y + i)]
      ) {
        countD++
        listD.push(x + i + boardSize * (y + i))
      } else {
        countD = 0
        listD = []
      }

      if (
        0 <= i + x &&
        i + x < boardSize &&
        square === newSquares[x + i + boardSize * (y - i)]
      ) {
        countE++
        listE.push(x + i + boardSize * (y - i))
      } else {
        countE = 0
        listE = []
      }

      // console.log("count", count)

      if (countR >= 5) {
        return [true, listR]
      }
      if (countC >= 5) {
        return [true, listC]
      }
      if (countD >= 5) {
        return [true, listD]
      }
      if (countE >= 5) {
        return [true, listE]
      }
    }
    // console.log("-")

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
