import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
    },
    extend: {
      colors: {
        'nh-beige': '#f5f7f0',
        'nh-yellow': '#fadf16',
        'nh-lightgreen': '#00cb64',
        'nh-blue': '#0099ff',
        'nh-green': '#00a090',
        'nh-rosa': '#f0aabc',
        'nh-red': '#ea5a3c',
        brand: '#0099ff',
        'brand-dark': '#007acc',
        'brand-light': '#33b5ff',
        'green-primary': '#00FD70',
        'green-light': '#66FFAA',
        'green-dark': '#00884B',
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}

export default config
