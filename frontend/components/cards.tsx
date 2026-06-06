import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react'
import { currency } from '@/lib/utils'

export function MetricCard({ label, value, sub, tone = 'neutral' }: { label: string; value: string | number; sub?: string; tone?: 'neutral' | 'accent' | 'danger' | 'warning' | 'success' }) {
  const toneClass = tone === 'accent' ? 'text-accent' : tone === 'danger' ? 'text-danger' : tone === 'warning' ? 'text-warning' : tone === 'success' ? 'text-success' : 'text-slate-900'
  return (
    <div className="surface rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-medium text-slate-500">{label}</div>
        <ArrowUpRight size={14} className="text-slate-300" />
      </div>
      <div className={`mt-4 text-3xl font-bold leading-none tracking-tight ${toneClass}`}>{value}</div>
      {sub ? <div className="mt-3 text-sm text-slate-400">{sub}</div> : null}
    </div>
  )
}

export function SupplierPill({ risk }: { risk: string }) {
  const cls = risk === 'Low' ? 'bg-green-100 text-green-700' : risk === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{risk}</span>
}

export function HeroRecommendation({ supplier, savings, confidence }: { supplier: string; savings: number; confidence: number }) {
  const facts = [
    { label: 'Savings', value: currency(savings), tone: 'text-success' },
    { label: 'Risk', value: 'Low', tone: 'text-success' },
    { label: 'Coverage', value: '98%', tone: 'text-slate-900' },
    { label: 'Confidence', value: `${confidence}%`, tone: 'text-accent' },
  ]

  return (
    <div className="surface-hero relative overflow-hidden rounded-3xl p-8 md:p-10">
      <div className="relative z-10 grid gap-10 xl:grid-cols-[1fr_340px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent">
            <Sparkles size={14} className="text-accent" /> AI Recommendation
          </div>
          <h2 className="mt-6 max-w-3xl text-[48px] font-bold leading-[0.95] tracking-tight text-slate-900 md:text-[56px]">Choose {supplier}</h2>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-600">Best risk-adjusted supplier for the School Renovation RFQ, balancing savings, coverage, delivery confidence, and quote completeness.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">Approve Recommendation</button>
            <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">View Analysis</button>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm font-medium text-success"><CheckCircle2 size={17} /> Low risk decision</div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="surface-soft rounded-2xl p-4">
                <div className="text-sm text-slate-500">{fact.label}</div>
                <div className={`mt-2 text-3xl font-bold leading-none tracking-tight ${fact.tone}`}>{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
