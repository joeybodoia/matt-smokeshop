/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        futura: ['Futura', 'Futura-Medium', 'Futura-Bold', 'Trebuchet MS', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
};
