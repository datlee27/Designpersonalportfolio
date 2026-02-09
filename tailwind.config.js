/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#FF5722',
        dark: '#000000',
        'dark-gray': '#2C2C2C',
        light: '#F5F5F5',
      },
      // Extend for 3D carousel if needed, specifically custom animations
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
      }
    },
  },
  plugins: [],
}
