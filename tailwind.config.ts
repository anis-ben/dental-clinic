import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          50: '#E6F4F1',
          100: '#C2E5DE',
          200: '#99D4C7',
          300: '#6FC2B0',
          400: '#3FB099',
          500: '#00A896', // Primary Teal Accent
          600: '#028090', // Medical Cyan
          700: '#026673',
          800: '#014C56',
          900: '#01333A',
        },
        mint: {
          soft: '#E6F4F1',
          light: '#F0F9F7',
        },
        slate: {
          bg: '#F8FAFC',
          navy: '#0F172A',
        },
        status: {
          emerald: '#10B981',
          emeraldLight: '#D1FAE5',
          amber: '#F59E0B',
          amberLight: '#FEF3C7',
          rose: '#EF4444',
          roseLight: '#FEE2E2',
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 168, 150, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        glow: '0 0 25px rgba(0, 168, 150, 0.25)',
      }
    },
  },
  plugins: [],
};

export default config;
