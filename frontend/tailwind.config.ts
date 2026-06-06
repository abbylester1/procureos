import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#070A12',
        panel: '#0D1324',
        panel2: '#111A2F',
        border: '#1D2A44',
        muted: '#8A96AD',
        accent: '#65E4C6',
        blue: '#7AA7FF',
        danger: '#FF6174',
        warning: '#F8C15C',
      },
      boxShadow: {
        glow: '0 0 40px rgba(101, 228, 198, 0.12)',
      },
    },
  },
  plugins: [],
}

export default config
