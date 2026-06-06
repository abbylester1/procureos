'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ScatterChart, Scatter } from 'recharts'
import { suppliers } from '@/lib/demo-data'

export function SpendChart() {
  return (
    <div className="h-72 rounded-3xl border border-border bg-panel p-5">
      <h3 className="mb-4 font-semibold">Spend by Supplier</h3>
      <ResponsiveContainer width="100%" height={220} minWidth={320}>
        <BarChart data={suppliers}>
          <CartesianGrid stroke="#1D2A44" />
          <XAxis dataKey="name" tick={{ fill: '#8A96AD', fontSize: 11 }} interval={0} angle={-16} textAnchor="end" height={80} />
          <YAxis tick={{ fill: '#8A96AD' }} />
          <Tooltip contentStyle={{ background: '#0D1324', border: '1px solid #1D2A44' }} />
          <Bar dataKey="cost" fill="#65E4C6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CoverageChart() {
  return (
    <div className="h-72 rounded-3xl border border-border bg-panel p-5">
      <h3 className="mb-4 font-semibold">Coverage by Supplier</h3>
      <ResponsiveContainer width="100%" height={220} minWidth={320}>
        <BarChart data={suppliers}>
          <CartesianGrid stroke="#1D2A44" />
          <XAxis dataKey="name" tick={{ fill: '#8A96AD', fontSize: 11 }} interval={0} angle={-16} textAnchor="end" height={80} />
          <YAxis tick={{ fill: '#8A96AD' }} />
          <Tooltip contentStyle={{ background: '#0D1324', border: '1px solid #1D2A44' }} />
          <Bar dataKey="coverage" fill="#7AA7FF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RiskScatter() {
  return (
    <div className="h-72 rounded-3xl border border-border bg-panel p-5">
      <h3 className="mb-4 font-semibold">Cost vs Supplier Score</h3>
      <ResponsiveContainer width="100%" height={220} minWidth={320}>
        <ScatterChart>
          <CartesianGrid stroke="#1D2A44" />
          <XAxis type="number" dataKey="cost" name="Cost" tick={{ fill: '#8A96AD' }} />
          <YAxis type="number" dataKey="score" name="Score" tick={{ fill: '#8A96AD' }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: '#0D1324', border: '1px solid #1D2A44' }} />
          <Scatter data={suppliers} fill="#65E4C6" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
