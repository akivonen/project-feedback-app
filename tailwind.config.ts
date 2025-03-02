import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['text-orange-100', 'text-blue-100', 'text-purple-200'],
  theme: {
    colors: {
      white: '#FFF',
      light: {
        100: '#F2F4FE',
        200: '#F7F8FD',
        300: '#F2F4FF',
        400: '#CFD7FF',
        500: '#CDD2EE',
        600: '#8C92B3',
      },
      dark: {
        100: '#656EA3',
        200: '#647196',
        300: '#373F68',
        400: '#3A4374',
      },
      purple: {
        100: '#C75AF6',
        200: '#AD1FEA',
      },
      blue: {
        100: '#62BCFA',
        200: '#7C91F9',
        300: '#4661E6',
      },
      orange: {
        100: '#D73737',
      },
      transparent: 'transparent',
    },
    fontSize: {
      sm: '0.8125rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    extend: {
      boxShadow: {
        dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config;
