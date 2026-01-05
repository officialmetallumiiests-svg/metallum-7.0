/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all React files
  ],
theme: {
  extend: {
    fontFamily: {
      heading: ['"Bebas Neue"', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    letterSpacing: {
      widestPlus: '0.35em',
    },
  },
},

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // make sure "dark" exists for your theme toggle
  },
};

