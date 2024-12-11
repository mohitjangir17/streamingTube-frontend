/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'reagisterForm': 'calc(100vh - 90px)',
      },
    },
  },
  plugins: [],
}
