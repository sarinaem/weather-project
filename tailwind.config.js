/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazirmatn", "sans-serif"],
      },

      colors: {
        greenText: "#01CD98",
      },
    },
  },
  plugins: [],
};
