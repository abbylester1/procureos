import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react'
import { currency } from '@/lib/utils'

export function MetricCard({ label, value, sub, tone = 'neutral' }: { label: string; value: string | number; sub?: string; tone?: 'neutral' | 'accent' | 'danger' | 'warning' | 'success' }) {
  const toneClass = tone === 'accent' ? 'text-accent' : tone === 'danger' ? 'text-danger' : tone === 'warning' ? 'text-warning' : tone === 'success' ? 'text-success' : 'text-white'
  return (
    <div className="surface-muted rounded-[20px] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-medium text-slate-400">{label}</div>
        <ArrowUpRight size={14} className="text-slate-600" />
      </div>
      <div className={`mt-4 text-[32px] font-semibold leading-none tracking-[-0.04em] ${toneClass}`}>{value}</div>
      {sub ? <div className="mt-3 text-sm text-slate-500">{sub}</div> : null}
    </div>
  )
}

export function SupplierPill({ risk }: { risk: string }) {
  const cls = risk === 'Low' ? 'bg-success/12 text-success' : risk === 'Medium' ? 'bg-warning/12 text-warning' : 'bg-danger/12 text-danger'
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{risk}</span>
}

export function HeroRecommendation({ supplier, savings, confidence }: { supplier: string; savings: number; confidence: number }) {
  const facts = [
    { label: 'Savings', value: currency(savings), tone: 'text-success' },
    { label: 'Risk', value: 'Low', tone: 'text-success' },
    { label: 'Coverage', value: '98%', tone: 'text-white' },
    { label: 'Confidence', value: `${confidence}%`, tone: 'text-white' },
  ]

  return (
    <div className="surface-hero relative overflow-hidden rounded-3xl p-8 md:p-10">
      <div className="relative z-10 grid gap-10 xl:grid-cols-[1fr_340px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-200"><Sparkles size={14} className="text-accent" /> AI Recommendation</div>
          <h2 className="mt-6 max-w-3xl text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] md:text-[56px]">Choose {supplier}</h2>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-300">Best risk-adjusted supplier for the School Renovation RFQ, balancing savings, coverage, delivery confidence, and quote completeness.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">Approve Recommendation</button>
            <button className="rounded-xl bg-white/[0.075] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.1]">View Analysis</button>
          </div>
        </div>
        <div className="rounded-3xl bg-[#0B1628]/68 p-5 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-medium text-success"><CheckCircle2 size={17} /> Low risk decision</div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="surface-soft rounded-[20px] p-4">
                <div className="text-sm text-slate-500">{fact.label}</div>
                <div className={`mt-2 text-[32px] font-semibold leading-none tracking-[-0.04em] ${fact.tone}`}>{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
