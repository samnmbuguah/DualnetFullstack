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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-inner': {
          textShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)',
        },
      });
    },
  ],
  darkMode: "class",
};