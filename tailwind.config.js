/** @type {import('tailwindcss').Config} */

const colors = require('./src/theme/colors')

module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],
  theme: {
    extend: { colors }
  },
  plugins: []
}
