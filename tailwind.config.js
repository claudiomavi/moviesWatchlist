/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js }", "./public/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
