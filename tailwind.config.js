const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    listStyleType: {
      none: "none"
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: { DEFAULT: "#FEFFFE" },
      green: {
        DEFAULT: "#00bfa5"
      },
      gray: {
        dark: "#444444",
        light: "#bbbbbb",
        lightest: "#f3f3f2"
      },
      blue: {
        dark: "#1D3354"
      },
      red: {
        DEFAULT: "#F25F5C"
      },
      purple: {
        lavender: "#E9EBF8"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
