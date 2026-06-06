import { currency } from '@/lib/utils'

export function MetricCard({ label, value, sub, tone = 'neutral' }: { label: string; value: string | number; sub?: string; tone?: 'neutral' | 'accent' | 'danger' | 'warning' }) {
  const toneClass = tone === 'accent' ? 'text-accent' : tone === 'danger' ? 'text-danger' : tone === 'warning' ? 'text-warning' : 'text-white'
  return (
    <div className="rounded-3xl border border-border bg-panel/80 p-5 shadow-glow">
      <div className="text-xs uppercase tracking-[0.22em] text-muted">{label}</div>
      <div className={`mt-3 text-3xl font-semibold ${toneClass}`}>{value}</div>
      {sub ? <div className="mt-2 text-sm text-slate-400">{sub}</div> : null}
    </div>
  )
}

export function SupplierPill({ risk }: { risk: string }) {
  const cls = risk === 'Low' ? 'border-accent/30 bg-accent/10 text-accent' : risk === 'Medium' ? 'border-warning/30 bg-warning/10 text-warning' : 'border-danger/30 bg-danger/10 text-danger'
  return <span className={`rounded-full border px-3 py-1 text-xs ${cls}`}>{risk}</span>
}

export function HeroRecommendation({ supplier, savings, confidence }: { supplier: string; savings: number; confidence: number }) {
  return (
    <div className="card-grid relative overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-panel to-panel2 p-7 shadow-glow">
      <div className="relative z-10">
        <div className="text-xs uppercase tracking-[0.28em] text-accent">Recommended decision</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight">{supplier}</h2>
        <p className="mt-3 max-w-2xl text-slate-300">Lowest cost while maintaining delivery SLA, strong coverage, and low procurement risk for the School Renovation RFQ.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div><div className="text-muted">Potential Savings</div><div className="text-2xl font-semibold text-accent">{currency(savings)}</div></div>
          <div><div className="text-muted">AI Confidence</div><div className="text-2xl font-semibold">{confidence}%</div></div>
          <div><div className="text-muted">Approval Status</div><div className="text-2xl font-semibold text-warning">Pending</div></div>
        </div>
      </div>
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
    </div>
  )
}
