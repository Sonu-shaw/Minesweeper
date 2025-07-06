/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      mine: '#f87171',
      flag: '#facc15',
      reveal: '#3b82f6',
    },
    backdropBlur: {
      xs: '2px',
    },
    animation: {
    pop: 'pop 0.3s ease-out forwards',
    'fade-in': 'fadeIn 0.7s ease-out',
  },
  keyframes: {
    pop: {
      '0%': { transform: 'scale(0.5)', opacity: 0 },
      '100%': { transform: 'scale(1)', opacity: 1 },
    },
    fadeIn: {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  },
  
  }
},
  plugins: [],
}

