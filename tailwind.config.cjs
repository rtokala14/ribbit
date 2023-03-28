/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["fantasy", "halloween"],
  },
  darkMode: ["class", "[data-theme='halloween']"],
};

module.exports = config;
