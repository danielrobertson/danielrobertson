module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx"] }
    ],
    "react/jsx-props-no-spreading": [0],
    "react/react-in-jsx-scope": [0]
  }
};
