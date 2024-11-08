/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        secondary: '#3498db',
        accent: '#e74c3c',
        background: '#ecf0f1',
        text: '#34495e',
      },
    },
  },
  plugins: [],
} 