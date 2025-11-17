/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#FBE8D3",
          brown: "#5A3825",
          lightbrown: "#A2784A",
          darkbrown: "#3E2516"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
};
