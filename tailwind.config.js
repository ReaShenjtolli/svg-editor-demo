/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        'base-gray': '#353535',
      },
      height: {
        'sm-auto': 'auto',
        'md-500px': '500px',
      },
    },
  },
  plugins: [],
}