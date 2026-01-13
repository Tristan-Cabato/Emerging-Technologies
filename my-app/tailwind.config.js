/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fading: {
          '0%': { backgroundColor: 'rgba(59,130,246,0.6)' },
          '50%': { backgroundColor: 'rgba(239,68,68,0.8)' },
          '100%': { backgroundColor: 'rgba(0,0,0,0)' },
        },
      },
      animation: {
        fading: 'fading 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}