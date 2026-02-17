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

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#AD74C3",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#AD74C3",
        },
      },
    ], // make sure "dark" exists for your theme toggle
  },
};

