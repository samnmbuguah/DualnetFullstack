/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-text": "rgba(255, 255, 255, 0.5)",
      },
      fontFamily: {
        arrial: ["Arial"],
        roboto: ["Roboto"],
      },
     gridColumn: {
        "span-7": "span 7 / span 7",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
