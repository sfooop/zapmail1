import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#00d4b8',
        'accent-dark': '#00a898',
        'dark-bg': '#0a0e27',
        'dark-card': '#141829',
        'dark-border': '#1e2139',
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 184, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 184, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
