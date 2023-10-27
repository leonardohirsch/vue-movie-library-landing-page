/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{html,js,vue,js,ts,jsx,tsx}',
    './src/App.vue',
    './index.html'
  ],
  relative: true,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },
  },
  plugins: []
}

