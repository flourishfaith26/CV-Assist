/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f5f7f2',
          100: '#e6ebd8',
          600: '#5a732b',
          700: '#4a5d23',
          800: '#3b4b1c',
          900: '#2d3a15',
        }
      }
    }
  },
  plugins: [],
}
