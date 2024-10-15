/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*{.js,ts,jsx,tsx}",
  ],
  theme: {
    //add here to override defaults
    extend: {
      //add here to add more
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

