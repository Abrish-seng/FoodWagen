/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'food-orange': '#FF6B35',
        'food-orange-light': '#FF8C61',
        'food-orange-dark': '#E55A2B',
        'food-pink': '#FF6B9D',
        'food-gray': '#6B7280',
        'food-gray-light': '#9CA3AF',
        'food-gray-dark': '#374151',
      },
    },
  },
  plugins: [],
}
