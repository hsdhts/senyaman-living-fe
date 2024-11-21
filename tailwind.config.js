// tailwind.config.js
module.exports = {
  // mode: 'jit',
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#e7eeff',
          100: '#b6c6fe',
          200: '#92a1fe',
          300: '#608efe',
          400: '#4178fd',
          500: '#1256fd', // Warna dari figma
          600: '#104ee6',
          700: '#0d3bd4',
          800: '#0a2b8b',
          900: '#08246a',
        },
        'light-blue': {
          50: '#f4f8ff',
          100: '#e2eeff',
          200: '#d4e6ff',
          300: '#c0daff',
          400: '#b4deff',
          500: '#a1c8ff',
          600: '#93b6e8',
          700: '#728eb5',
          800: '#596e8c',
          900: '#44546b',
        },
        yellow: {
          50: '#fffbe6',
          100: '#fff3b0',
          200: '#ffed8a',
          300: '#ffe454',
          400: '#ffdf33',
          500: '#ffd700',
          600: '#e8c400',
          700: '#b59900',
          800: '#8c7600',
          900: '#6b5a00',
        },
        'dark-blue': {
          50: '#e7ecf5',
          100: '#b3c3df',
          200: '#8ea6d0',
          300: '#5b7dbb',
          400: '#3b64ad',
          500: '#0a3d99',
          600: '#09388b',
          700: '#072b6d',
          800: '#062254',
          900: '#041a40',
        },
        'grey': {
          50: '#fefefe',
          100: '#fafafa',
          200: '#f8f8f8',
          300: '#f5f5f5',
          400: '#f3f3f3',
          500: '#f0f0f0',
          600: '#dadada',
          700: '#aaaaaa',
          800: '#848484',
          900: '#656565',
        }
      },
      maxWidth: {
        'xxl': '90rem',  // Atau ukuran kustom lain
      },
      backgroundImage: {
        'category-gradient': 'linear-gradient(to bottom, #fefefe 50%, #f4f8ff 50%)',
        'carousel-gradient': 'linear-gradient(to bottom, #f4f8ff 50%, #ffffff 50%)',
        'budget-gradient': 'linear-gradient(to bottom, #ffffff 50%, #fefefe 50%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
