/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        board: "repeat(var(--board-size), minmax(0, 1fr))",
      },
      gridTemplateColumns: {
        board: "repeat(var(--board-size), minmax(0, 1fr))",
      },
      fontFamily: {
        century: ['"Century Gothic"', "Futura", "sans-serif"],
      },
      colors: {
        grau: "#999",
      },
    },
  },
  plugins: [],
}
