const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    // Set False For Dev / True For Prod
    enabled: false,
    // Set Content For CSS Purge
    content: ['./src/**/*.js'],
  },
  corePlugins: {
   fontFamily: false,
  },
  theme: {
    // Set Breakpoints
    screens:{
      sm: '600px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px'
    },
    colors: {
      // Set Tailwind Colors
      primary: colors.red,
      secondary: colors.black,
      blue: colors.sky,
      white: colors.white,
      indigo: colors.indigo,
      gray: colors.blueGray,
      black: colors.black,
      green: colors.emerald,
      red: colors.rose,
      orange: colors.amber,
      transparent: 'transparent',
    },
    extend: {
      // Add Custom Outline
      outline: {
        gray: '2px solid #0F172A',
      },
      // Add Custom Shadow
      dropShadow: {
        'md': '0 0 7px rgba(255, 0, 0, 0.95)',
      }
    },
  },
  variants: {
    extend: {
      // Enable Font Weights On Hover / Focus States
      fontWeight: ['focus', 'hover'],
    },
  },
  plugins: [],
}
