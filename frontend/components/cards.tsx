import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react'
import { currency } from '@/lib/utils'

export function MetricCard({ label, value, sub, tone = 'neutral' }: { label: string; value: string | number; sub?: string; tone?: 'neutral' | 'accent' | 'danger' | 'warning' }) {
  const toneClass = tone === 'accent' ? 'text-accent' : tone === 'danger' ? 'text-danger' : tone === 'warning' ? 'text-warning' : 'text-white'
  return (
    <div className="surface group rounded-3xl p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-medium text-slate-400">{label}</div>
        <ArrowUpRight size={15} className="text-slate-500 transition group-hover:text-accent" />
      </div>
      <div className={`mt-4 text-3xl font-semibold tracking-tight ${toneClass}`}>{value}</div>
      <div className="mt-4 h-8 overflow-hidden rounded-xl bg-white/[0.035]">
        <div className="h-full w-2/3 rounded-xl bg-gradient-to-r from-accent/20 via-blue/30 to-transparent" />
      </div>
      {sub ? <div className="mt-3 text-sm text-slate-500">{sub}</div> : null}
    </div>
  )
}

export function SupplierPill({ risk }: { risk: string }) {
  const cls = risk === 'Low' ? 'bg-success/12 text-success' : risk === 'Medium' ? 'bg-warning/12 text-warning' : 'bg-danger/12 text-danger'
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{risk}</span>
}

export function HeroRecommendation({ supplier, savings, confidence }: { supplier: string; savings: number; confidence: number }) {
  return (
    <div className="surface relative overflow-hidden rounded-[2rem] p-7 md:p-8">
      <div className="absolute right-8 top-8 hidden h-36 w-36 rounded-[2rem] bg-gradient-to-br from-accent via-blue to-success opacity-80 blur-2xl md:block" />
      <div className="absolute -right-10 bottom-8 hidden h-56 w-56 rotate-12 rounded-[2rem] border border-white/10 bg-white/[0.055] md:block" />
      <div className="relative z-10 grid gap-8 xl:grid-cols-[1fr_300px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/12 px-3 py-1.5 text-xs font-semibold text-accent"><Sparkles size={14} /> AI Recommendation</div>
          <h2 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em] md:text-6xl"><span className="gradient-text">Choose {supplier}</span></h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Best risk-adjusted supplier for the School Renovation RFQ, balancing savings, coverage, delivery confidence, and quote completeness.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-90">Approve Recommendation</button>
            <button className="rounded-2xl bg-white/[0.06] px-5 py-3 text-sm font-semibold text-slate-200 ring-1 ring-white/[0.08] transition hover:bg-white/[0.09]">View Analysis</button>
          </div>
        </div>
        <div className="rounded-3xl bg-[#0B1628]/70 p-5 ring-1 ring-white/[0.08]">
          <div className="flex items-center gap-2 text-sm font-medium text-success"><CheckCircle2 size={18} /> Low risk decision</div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="surface-soft rounded-2xl p-4"><div className="text-xs text-slate-500">Savings</div><div className="mt-1 text-xl font-semibold">{currency(savings)}</div></div>
            <div className="surface-soft rounded-2xl p-4"><div className="text-xs text-slate-500">Coverage</div><div className="mt-1 text-xl font-semibold">98%</div></div>
            <div className="surface-soft rounded-2xl p-4"><div className="text-xs text-slate-500">Delivery</div><div className="mt-1 text-xl font-semibold">32 days</div></div>
            <div className="surface-soft rounded-2xl p-4"><div className="text-xs text-slate-500">Confidence</div><div className="mt-1 text-xl font-semibold">{confidence}%</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
