/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/games/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

