/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: { colors: { brand: "#FFC801", shadow: "rgba(0, 0, 0, 0.5)" } },
    fontFamily: {
      // FontFamily 추가
      KELSI: [`"Kelsi 1", sans-serif`],
      GMARKET: ["GmarketSansMedium"],
    },
  },
  plugins: [],
};
