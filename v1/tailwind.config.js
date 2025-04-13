const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
