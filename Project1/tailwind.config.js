/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js}",
  ],
  theme: {
    //add here to override defaults
    extend: {
      //add here to add more
      colors: {
        'transparent': 'transparent',
      },
      fontFamily: {
        varela: ['"Varela Round"', 'sans-serif'],
        caveat: ['"Caveat"', 'cursive'],
      },
      backgroundImage: {
        'cork': "url('./corkboard.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

