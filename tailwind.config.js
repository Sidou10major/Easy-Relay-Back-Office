/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        Blue: "#3F88FB",
        Red: "#D50000",
        Green: "#54BA5B",
        Black: "#000000",
        grey: "#707070",
        ER18: "#DFD0F2",
        Grey: "#F2F2F2",
        ER1: "#3F0291",
        ER: "#5103B7",
        ER11: "#6A08EC",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      screens: {
        mobile: { max: "480px" },
        small: { max: "640px" },
        medium: { max: "840px" },
        mid: { max: "1080px", min: "841px" },
        desktop: { max: "1280px", min: "1081px" },
        large: { min: "1281px" },
      },
    },
  },
  plugins: [],
};
