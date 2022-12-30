const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto Slab", "serif"]
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "4rem"
    },
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
        darker: "#3D3D43",
        dark: "#444444",
        light: "#bbbbbb",
        lightest: "#f3f3f2"
      },
      blue: {
        ...colors.blue,
        dark: "#1B4482"
      },
      black: {
        ...colors.blue,
        DEFAULT: "#242424"
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
