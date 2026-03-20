/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       screens: {
      nav: '1022px',   // ← add this one line
    },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
  ],
};





