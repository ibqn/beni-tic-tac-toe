import styled from "styled-components"
import Board from "./board"

const GameBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Game = () => {
  return (
    <GameBoard>
      <Board />
    </GameBoard>
  )
}

export default Game
