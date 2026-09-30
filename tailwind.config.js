/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'salve-dark': '#090c10',
        'salve-card': 'rgba(22, 27, 34, 0.7)',
        'salve-border': 'rgba(255, 255, 255, 0.1)',
        'salve-cyan': '#00f2fe',
        'salve-purple': '#9d4edd',
        'salve-blue': '#4cc9f0',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      }
    },
  },
  plugins: [],
}
