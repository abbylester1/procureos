import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F1F5F9',
        panel: '#FFFFFF',
        panel2: '#F8FAFC',
        border: '#E2E8F0',
        muted: '#64748B',
        accent: '#6D5DFC',
        blue: '#3B82F6',
        danger: '#DC2626',
        warning: '#D97706',
        success: '#16A34A',
      },
      boxShadow: {
        glow: '0 8px 32px rgba(109, 93, 252, 0.18)',
        soft: '0 2px 8px rgba(15, 23, 42, 0.08)',
        card: '0 1px 3px rgba(15, 23, 42, 0.07), 0 1px 2px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
}

export default config
