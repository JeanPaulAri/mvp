/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
        'rubik-80s-fade': ['var(--font-rubik-80s-fade)', 'Rubik 80s Fade', 'cursive'],
        'sans': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}