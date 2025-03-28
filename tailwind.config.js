/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        balloon: {
          light: '#FFD4E5',
          primary: '#FF9ACD',
          dark: '#FF7AB8',
          string: '#E1E1E1'
        }
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'blink': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '5%': { transform: 'scaleY(0.1)' },
          '10%': { transform: 'scaleY(1)' }
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 4s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out'
      }
    }
  },
  plugins: [],
};