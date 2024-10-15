/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakartasans: ['JakartaSans', 'sans-serif'],
      },
      colors: {
        'spotify-bg':'#1f1f1f',
        'spotify-hover': '#252525',
        'spotify-placeholder':'#636363',
      },
    },
  },
  plugins: [],
};
