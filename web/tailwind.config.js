/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A0A0C',
          card: '#141311',
          surface: '#1E1D19',
          border: '#2E2A22',
          accent: '#E5A823',
          goldLight: '#FFD768',
          goldDark: '#9E7010',
          text: '#FFFFFF',
          goldText: '#F0C050',
          muted: '#A19E95',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
