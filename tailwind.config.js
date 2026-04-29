/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        ink: '#111111',
        paper: '#F5F5F5',
        accent: '#CCFF00',
      },
      transitionTimingFunction: {
        'chisel': 'cubic-bezier(0.2, 0, 0, 1)',
      },
      animation: {
        'micro-jitter': 'jitter 0.1s infinite',
        'marquee': 'marquee 20s linear infinite',
        'pan-grid': 'pan-grid 20s linear infinite',
      },
      keyframes: {
        'pan-grid': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 40px' },
        },
        jitter: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(1px, -1px)' },
          '50%': { transform: 'translate(-1px, 1px)' },
          '75%': { transform: 'translate(1px, 1px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

