module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      colors: {
        'valley-yellow': {
          50: '#ffea45',
          100: '#ffe03b',
          200: '#ffd631',
          300: '#ffcc27',
          400: '#ffc21d',
          500: '#fcb813',
          600: '#f2ae09',
          700: '#e8a400',
          800: '#de9a00',
          900: '#d49000',
        },
        'valley-gray': {
          50: '#727273',
          100: '#686869',
          200: '#5e5e5f',
          300: '#545455',
          400: '#4a4a4b',
          500: '#404041',
          600: '#363637',
          700: '#2c2c2d',
          800: '#222223',
          900: '#181819',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tw-elements/dist/plugin'),
  ],
};
