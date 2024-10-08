/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./dist/**/*.{js,html}",
    "./**/*.{html,js}",
    "./public/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
