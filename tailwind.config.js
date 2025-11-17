export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        "brand-cream": "#fffaf2",
        "brand-pink": "#ffcad4",
        "brand-dark-pink": "#ff9aae",
        "brand-brown": "#2b1a12",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.08)",
        glass: "0 8px 32px rgba(31,38,135,0.2)",
      },
      backdropBlur: {
        glass: "12px",
      },
      borderRadius: {
        premium: "22px",
      },
    },
  },
  plugins: [],
};
