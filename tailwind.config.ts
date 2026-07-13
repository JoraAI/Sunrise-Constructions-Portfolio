import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1B33',
          50: '#Eef2f8',
          100: '#D5dEEC',
          200: '#AEBED9',
          300: '#7E95BE',
          400: '#526DA0',
          500: '#324B80',
          600: '#1F3560',
          700: '#0B1B33',
          800: '#08142660',
          900: '#050D1A',
          950: '#03070F',
        },
        gold: {
          DEFAULT: '#F5A623',
          50: '#FEF6E7',
          100: '#FDE9C2',
          200: '#FBD78C',
          300: '#FAC456',
          400: '#F8B236',
          500: '#F5A623',
          600: '#D98411',
          700: '#A8620F',
          800: '#774511',
          900: '#4A2B0C',
        },
        amber: {
          DEFAULT: '#FFB800',
        },
        cream: '#FAF7F0',
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#3A3A3A',
          muted: '#6B6B6B',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        heading: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-2xl': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.875rem, 3.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        'navy-sm': '0 2px 8px rgba(11, 27, 51, 0.08)',
        'navy': '0 10px 30px rgba(11, 27, 51, 0.12)',
        'navy-lg': '0 20px 60px rgba(11, 27, 51, 0.18)',
        'gold-glow': '0 0 30px rgba(245, 166, 35, 0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(11,27,51,0.55) 0%, rgba(11,27,51,0.75) 100%)',
        'navy-grid': "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;