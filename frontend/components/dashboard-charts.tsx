'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ScatterChart, Scatter } from 'recharts'
import { suppliers } from '@/lib/demo-data'

const tooltip = { background: '#0B1628', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, color: '#FFFFFF' }
const axis = { fill: '#94A3B8', fontSize: 11 }

function ChartShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface h-80 rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="rounded-full bg-white/[0.055] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">Live</span>
      </div>
      {children}
    </div>
  )
}

export function SpendChart() {
  return (
    <ChartShell title="Spend by Supplier">
      <ResponsiveContainer width="100%" height={240} minWidth={320}>
        <BarChart data={suppliers}>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis dataKey="name" tick={axis} interval={0} angle={-16} textAnchor="end" height={80} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltip} />
          <Bar dataKey="cost" fill="#6D5DFC" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}

export function CoverageChart() {
  return (
    <ChartShell title="Coverage by Supplier">
      <ResponsiveContainer width="100%" height={240} minWidth={320}>
        <BarChart data={suppliers}>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis dataKey="name" tick={axis} interval={0} angle={-16} textAnchor="end" height={80} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltip} />
          <Bar dataKey="coverage" fill="#00D4FF" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}

export function RiskScatter() {
  return (
    <ChartShell title="Cost vs Supplier Score">
      <ResponsiveContainer width="100%" height={240} minWidth={320}>
        <ScatterChart>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" />
          <XAxis type="number" dataKey="cost" name="Cost" tick={axis} />
          <YAxis type="number" dataKey="score" name="Score" tick={axis} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={tooltip} />
          <Scatter data={suppliers} fill="#22C55E" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}
