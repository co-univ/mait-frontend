const tokens = require('./config/tailwind.tokens.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      // Import all generated tokens directly
      ...tokens.theme,
    },
  },
  plugins: [
    // Add any Tailwind plugins you need
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};