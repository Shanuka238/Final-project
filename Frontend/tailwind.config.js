/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        'primary': '#8B5FBF', 
        'primary-50': '#F8F5FF', 
        'primary-100': '#F4F1FF', 
        'primary-200': '#E9E1FF',
        'primary-300': '#D4C2FF', 
        'primary-400': '#B491E5', 
        'primary-500': '#9B6FD4',
        'primary-600': '#8B5FBF', 
        'primary-700': '#7A4FA8', 
        'primary-800': '#693F91', 
        'primary-900': '#2D1B3D', 

        'secondary': '#F4F1FF', 
        'secondary-50': '#FEFEFE', 
        'secondary-100': '#F4F1FF', 
        'secondary-200': '#E9E1FF', 

        'accent': '#D4AF37', 
        'accent-50': '#FFFBEB', 
        'accent-100': '#FEF3C7', 
        'accent-200': '#FDE68A', 
        'accent-300': '#FCD34D', 
        'accent-400': '#FBBF24',
        'accent-500': '#F59E0B',
        'accent-600': '#D4AF37', 
        'accent-700': '#B45309', 
        'accent-800': '#92400E', 

        'background': '#FEFEFE', 
        'surface': '#FFFFFF', 
        'surface-secondary': '#F4F1FF', 

        'text-primary': '#2D1B3D', 
        'text-secondary': '#6B5B73', 
        'text-tertiary': '#9CA3AF', 
        'text-inverse': '#FFFFFF', 

        'success': '#10B981', 
        'success-50': '#ECFDF5', 
        'success-100': '#D1FAE5', 
        'success-600': '#10B981', 
        'success-700': '#047857', 

        'warning': '#F59E0B', 
        'warning-50': '#FFFBEB', 
        'warning-100': '#FEF3C7', 
        'warning-500': '#F59E0B', 
        'warning-600': '#D97706', 

        'error': '#EF4444', 
        'error-50': '#FEF2F2', 
        'error-100': '#FEE2E2', 
        'error-500': '#EF4444', 
        'error-600': '#DC2626',

        'border': '#F4F1FF', 
        'border-secondary': '#E9E1FF', 
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'primary': '0 4px 20px rgba(139, 95, 191, 0.08)',
        'secondary': '0 2px 10px rgba(139, 95, 191, 0.05)',
        'accent': '0 8px 32px rgba(139, 95, 191, 0.12)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'large': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 1.5s infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200px 0',
          },
          '100%': {
            backgroundPosition: 'calc(200px + 100%) 0',
          },
        },
        bounceGentle: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}