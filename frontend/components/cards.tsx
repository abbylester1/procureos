import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { currency } from '@/lib/utils'

export function MetricCard({ label, value, sub, tone = 'neutral' }: { label: string; value: string | number; sub?: string; tone?: 'neutral' | 'accent' | 'danger' | 'warning' }) {
  const toneClass = tone === 'accent' ? 'text-accent' : tone === 'danger' ? 'text-danger' : tone === 'warning' ? 'text-warning' : 'text-white'
  const glow = tone === 'accent' ? 'from-accent/15' : tone === 'danger' ? 'from-danger/15' : tone === 'warning' ? 'from-warning/15' : 'from-white/[0.06]'
  return (
    <div className={`glass-panel group relative overflow-hidden rounded-3xl p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/25`}>
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${glow} via-white/20 to-transparent`} />
      <div className="flex items-start justify-between gap-3">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted">{label}</div>
        <ArrowUpRight size={15} className="text-muted opacity-50 transition group-hover:text-accent group-hover:opacity-100" />
      </div>
      <div className={`mt-4 text-3xl font-semibold tracking-tight ${toneClass}`}>{value}</div>
      {sub ? <div className="mt-2 text-sm text-slate-400">{sub}</div> : null}
    </div>
  )
}

export function SupplierPill({ risk }: { risk: string }) {
  const cls = risk === 'Low' ? 'border-accent/30 bg-accent/10 text-accent' : risk === 'Medium' ? 'border-warning/30 bg-warning/10 text-warning' : 'border-danger/30 bg-danger/10 text-danger'
  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>{risk}</span>
}

export function HeroRecommendation({ supplier, savings, confidence }: { supplier: string; savings: number; confidence: number }) {
  return (
    <div className="card-grid scanline relative overflow-hidden rounded-[2rem] border border-accent/25 bg-[linear-gradient(135deg,rgba(13,19,36,0.96),rgba(17,26,47,0.86))] p-7 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-blue/10 blur-3xl" />
      <div className="relative z-10 grid gap-8 xl:grid-cols-[1fr_260px]">
        <div>
          <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-accent">Recommended decision</div>
          <h2 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-white md:text-6xl">{supplier}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Lowest risk-adjusted cost while maintaining delivery SLA, high coverage, and full auditability for the School Renovation RFQ.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><div className="text-xs uppercase tracking-[0.18em] text-muted">Potential Savings</div><div className="mt-2 text-2xl font-semibold text-accent">{currency(savings)}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><div className="text-xs uppercase tracking-[0.18em] text-muted">AI Confidence</div><div className="mt-2 text-2xl font-semibold">{confidence}%</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><div className="text-xs uppercase tracking-[0.18em] text-muted">Risk</div><div className="mt-2 text-2xl font-semibold text-accent">Low</div></div>
          </div>
        </div>
        <div className="rounded-3xl border border-accent/25 bg-[#06120F]/70 p-5">
          <CheckCircle2 className="text-accent" size={30} />
          <div className="mt-4 text-sm uppercase tracking-[0.2em] text-accent">Decision Path</div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div>RFQ uploaded</div>
            <div>Materials normalized</div>
            <div>5 suppliers scored</div>
            <div>Recommendation traced</div>
          </div>
        </div>
      </div>
    </div>
  )
}
