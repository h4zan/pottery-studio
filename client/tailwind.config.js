/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,js,ts,jsx,tsx,mdx}',
    './**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}',
    'node_modules/@zach.codes/react-calendar/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        linen: '#f6f4f2',
        cottonCandy: '#fefefe',
        textBckgColor: '#e6e6e661',
        porcelien: '#E6E3DE',
        hoverBckgColor: '#D1C3BA',
        hoverBtnColor: '#e4dbd5',
        vaseColor: '#b5a89f',
        /* hoverMenuBckgColor: '#BAAEA0',
        sand: '#C1B3A6',*/
      },
    },
  },

  plugins: [require('tw-elements/dist/plugin')],
};
