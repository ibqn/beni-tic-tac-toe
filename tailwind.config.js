/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        40: "repeat(40, minmax(0, 1fr))",
      },
      gridTemplateColumns: {
        40: "repeat(40, minmax(0, 1fr))",
      },
      fontFamily: {
        century: ["Century Gothic", "Futura", "sans-serif"],
      },
    },
  },
  plugins: [],
}
