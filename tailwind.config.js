/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.{html,js}", "./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
