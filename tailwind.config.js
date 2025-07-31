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
    require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
    
    // Custom plugin to generate typography utility classes
    function({ addUtilities, theme }) {
      const typography = theme('typography');
      const utilities = {};
      
      Object.entries(typography).forEach(([key, styles]) => {
        utilities[`.typo-${key}`] = styles;
      });
      
      addUtilities(utilities);
    },
    
    // Custom plugin to allow font family override
    function({ addUtilities, theme }) {
      const fontFamilies = theme('fontFamily');
      const utilities = {};
      
      Object.entries(fontFamilies).forEach(([key, value]) => {
        utilities[`.font-${key}`] = {
          'font-family': `${Array.isArray(value) ? value.join(', ') : value} !important`
        };
      });
      
      addUtilities(utilities, ['responsive']);
    },
  ],
};