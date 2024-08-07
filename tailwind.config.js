/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,ts,tsx}", "./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: { spacing: { 13: 52, 21: 84 } }
  },
  plugins: []
};
