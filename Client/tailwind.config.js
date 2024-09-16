/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        'equal': '0 0 15px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}

