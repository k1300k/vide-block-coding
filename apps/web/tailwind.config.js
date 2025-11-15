/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        intro: {
          50: '#e8f5e8',
          100: '#c8e6c9',
          500: '#4caf50',
          700: '#388e3c',
        },
        contents: {
          50: '#e3f2fd',
          100: '#bbdefb',
          500: '#2196f3',
          700: '#1976d2',
        },
        deploy: {
          50: '#fce4ec',
          100: '#f8bbd9',
          500: '#e91e63',
          700: '#c2185b',
        },
      },
    },
  },
  plugins: [],
}

