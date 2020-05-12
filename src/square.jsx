import React from "react"
import Proptypes from "prop-types"
import styled from "styled-components"

const Button = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  height: 22px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 22px;

  &:focus {
    outline: none;
  }

  .kbd-navigation &:focus {
    background: #ddd;
  }
`

const Square = ({ value, onClick }) => (
  <Button onClick={onClick}>{value}</Button>
)

Square.propTypes = {
  values: Proptypes.string,
  onClick: Proptypes.func.isRequired,
}

export default Square
