/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "vest-green": "#4BC2A3",
        "vest-red": "#E03737",
        "vest-grey": "#AEADAD",
        "vest-background": "#0F0E0C",
        "vest-secondary-background": "#161514",
        "vest-border": "#1A1A1A",
      },
    },
  },
  plugins: [],
}
