'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ScatterChart, Scatter } from 'recharts'
import { suppliers } from '@/lib/demo-data'

const tooltip = { background: '#080D1C', border: '1px solid rgba(101,228,198,0.25)', borderRadius: 14, color: '#EDF4FF' }
const axis = { fill: '#8A96AD', fontSize: 11 }

function ChartShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel h-80 rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-muted">Live</span>
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
          <CartesianGrid stroke="rgba(148,163,184,0.13)" vertical={false} />
          <XAxis dataKey="name" tick={axis} interval={0} angle={-16} textAnchor="end" height={80} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltip} />
          <Bar dataKey="cost" fill="#65E4C6" radius={[10, 10, 0, 0]} />
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
          <CartesianGrid stroke="rgba(148,163,184,0.13)" vertical={false} />
          <XAxis dataKey="name" tick={axis} interval={0} angle={-16} textAnchor="end" height={80} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltip} />
          <Bar dataKey="coverage" fill="#7AA7FF" radius={[10, 10, 0, 0]} />
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
          <CartesianGrid stroke="rgba(148,163,184,0.13)" />
          <XAxis type="number" dataKey="cost" name="Cost" tick={axis} />
          <YAxis type="number" dataKey="score" name="Score" tick={axis} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={tooltip} />
          <Scatter data={suppliers} fill="#65E4C6" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}
