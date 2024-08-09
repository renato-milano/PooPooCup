/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        iglm:"#324aa8",
        primary: "#6f4417",
        secondary: {
          DEFAULT: "#e7bc91",
          100: "#FF9001",
          200: "#FF8E01",
        },
        tekla1: {
          DEFAULT: "#BC8A5F",
          100: "#FF9001",
          200: "#FF8E01",
        },
        tekla2: {
          DEFAULT: "#99582A",
          100: "#FF9001",
          200: "#FF8E01",
        },
        tekla3: {
          DEFAULT: "#BB9457",
          100: "#FF9001",
          200: "#FF8E01",
        },
        tekla4: {
          DEFAULT: "#D5BDAF",
          100: "#FF9001",
          200: "#FF8E01",
        },
        tekla5: {
          DEFAULT: "#E3D5CA",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
        light: {
          DEFAULT: "#d5a177",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        bregular: ["BalooBhai2-Regular", "sans-serif"],
        bmedium: ["BalooBhai2-Medium", "sans-serif"],
        bsemibold: ["BalooBhai2-SemiBold", "sans-serif"],
        bbold: ["BalooBhai2-Bold", "sans-serif"],
        bextrabold: ["BalooBhai2-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};