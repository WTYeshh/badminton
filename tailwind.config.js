/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#111111',
        card: '#181818',
        border: '#2A2A2A',
        text: '#F5F5F5',
        muted: '#9E9E9E',
        accent: '#72F27C',
      },
      fontFamily: {
        heading: ['Satoshi', 'General Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
}
