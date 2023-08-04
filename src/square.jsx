import PropTypes from "prop-types"
import styled from "styled-components"

const Button = styled.button`
  border: 1px solid #999;
  padding: 0;
  color: ${(props) => (props.mark ? "red" : "inherit")};
  font-family: inherit;
  background: #fff;
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  height: 22px;
  margin-right: -1px;
  margin-top: -1px;
  text-align: center;
  width: 22px;

  &:focus {
    outline: none;
  }

  .kbd-navigation &:focus {
    background: #ddd;
  }
`

const Square = ({ value, onClick }) => {
  const [piece, color] = value || []
  return (
    <Button mark={color} onClick={onClick}>
      {piece}
    </Button>
  )
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Square
