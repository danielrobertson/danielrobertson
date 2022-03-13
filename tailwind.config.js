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
      white: { ...colors.white, DEFAULT: "#FEFFFE" },
      green: {
        ...colors.green,
        DEFAULT: "#00bfa5"
      },
      gray: {
        ...colors.gray,
        dark: "#444444",
        light: "#bbbbbb",
        lightest: "#f3f3f2"
      },
      blue: {
        ...colors.blue,
        dark: "#1D3354"
      },
      red: {
        ...colors.red,
        DEFAULT: "#F25F5C"
      },
      purple: {
        ...colors.purple,
        lavender: "#E9EBF8"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
