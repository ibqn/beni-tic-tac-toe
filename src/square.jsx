import React from "react"
import Proptypes from "prop-types"

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

Square.propTypes = {
  values: Proptypes.string,
  onClick: Proptypes.func,
}

export default Square
