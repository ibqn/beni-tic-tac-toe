import { createGlobalStyle } from "styled-components"

const styled = { createGlobalStyle }

const GlobalStyles = styled.createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font: 14px "Century Gothic", Futura, sans-serif;
    margin: 20px;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

export default GlobalStyles
