/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-text": "rgba(255, 255, 255, 0.5)",
        white: "#ffffff", 
        "custom-gray": "#454A57", 
      },
      fontFamily: {
        arrial: ["Arial"],
        roboto: ["Roboto"],
        inter: ["Inter", "sans-serif"], // Add Inter font
      },
      gridColumn: {
        "span-7": "span 7 / span 7",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};