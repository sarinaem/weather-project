/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['"Vazir"', "sans-serif"],
      },
      colors: {
        greenText: "#01CD98",
      },
    },
  },
  plugins: [],
};
