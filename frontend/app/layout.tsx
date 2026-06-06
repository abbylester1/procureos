import type { Metadata } from 'next'
import './globals.css'
import { Shell } from '@/components/shell'

export const metadata: Metadata = {
  title: 'ProcureOS | AI Procurement Command Center',
  description: 'Explainable, traceable AI procurement recommendations deployed on Vercel.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
