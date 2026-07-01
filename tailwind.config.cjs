/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        secondary: '#6B6B6B',
        line: '#E5E5E5',
        hover: '#333333',
        'bg-soft': '#FAFAFA'
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
