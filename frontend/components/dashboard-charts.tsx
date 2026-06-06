'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ScatterChart, Scatter } from 'recharts'
import { suppliers } from '@/lib/demo-data'

const tooltip = { background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, color: '#0F172A', boxShadow: '0 4px 16px rgba(15,23,42,0.08)' }
const axis = { fill: '#94A3B8', fontSize: 11 }

function ChartShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface h-80 rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight text-slate-900">{title}</h3>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Live</span>
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
          <CartesianGrid stroke="rgba(148,163,184,0.10)" vertical={false} />
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
          <CartesianGrid stroke="rgba(148,163,184,0.10)" vertical={false} />
          <XAxis dataKey="name" tick={axis} interval={0} angle={-16} textAnchor="end" height={80} />
          <YAxis tick={axis} />
          <Tooltip contentStyle={tooltip} />
          <Bar dataKey="coverage" fill="#6D5DFC" radius={[10, 10, 0, 0]} />
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
          <CartesianGrid stroke="rgba(148,163,184,0.10)" />
          <XAxis type="number" dataKey="cost" name="Cost" tick={axis} />
          <YAxis type="number" dataKey="score" name="Score" tick={axis} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={tooltip} />
          <Scatter data={suppliers} fill="#6D5DFC" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}
