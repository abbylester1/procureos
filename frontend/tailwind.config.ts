import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#081120',
        panel: '#0F1B2D',
        panel2: '#132238',
        border: 'rgba(148, 163, 184, 0.14)',
        muted: '#94A3B8',
        accent: '#6D5DFC',
        blue: '#00D4FF',
        danger: '#EF4444',
        warning: '#F59E0B',
        success: '#22C55E',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(109, 93, 252, 0.16)',
        soft: '0 16px 48px rgba(2, 6, 23, 0.34)',
      },
    },
  },
  plugins: [],
}

export default config
