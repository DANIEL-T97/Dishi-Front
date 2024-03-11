/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {fontFamily: {
    'sans': ['ui-sans-serif', 'system-ui', ],
    'serif': ['ui-serif', 'Georgia',],
    'mono': ['ui-monospace', 'SFMono-Regular', ],
    'display': ['Oswald', ],
    'body': ['"Open Sans"', ],
    'pacifico':['Pacifico', 'cursive'],
    'permanent':['Permanent Marker'],
    'sixtyfour': ['SixtyFour', 'sans-serif'],
    'dancing-script': ['Dancing Script', 'cursive'],

  },
    extend: {},
  },
  plugins: [],
}