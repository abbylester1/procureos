import { risks } from '@/lib/demo-data'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react'

const severityConfig = {
  Critical: { icon: AlertCircle, bg: 'bg-red-50', border: 'border-l-red-500', badge: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: 'text-red-700' },
  Medium: { icon: AlertTriangle, bg: 'bg-amber-50', border: 'border-l-amber-500', badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', label: 'text-amber-700' },
  Low: { icon: Info, bg: 'bg-slate-50', border: 'border-l-slate-300', badge: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400', label: 'text-slate-600' },
} as const

type Priority = keyof typeof severityConfig

export default function RisksPage() {
  const critical = risks.filter((r) => r.priority === 'Critical')
  const medium = risks.filter((r) => r.priority === 'Medium')
  const low = risks.filter((r) => r.priority === 'Low')
  const sorted = [...critical, ...medium, ...low]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Risk Intelligence</div>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">Procurement risk analysis</h1>
        <p className="mt-1 text-sm text-slate-500">AI-detected quote gaps, price anomalies, and delivery risks across all suppliers.</p>
      </div>

      {/* Summary row */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} className="text-danger" />
            <div className="text-xs font-medium text-slate-500">Critical</div>
          </div>
          <div className="mt-3 text-4xl font-black tracking-tight text-danger">{critical.length}</div>
          <div className="mt-1 text-xs text-slate-400">Requires immediate action</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-warning" />
            <div className="text-xs font-medium text-slate-500">Medium</div>
          </div>
          <div className="mt-3 text-4xl font-black tracking-tight text-warning">{medium.length}</div>
          <div className="mt-1 text-xs text-slate-400">Monitor and mitigate</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <Info size={15} className="text-slate-400" />
            <div className="text-xs font-medium text-slate-500">Low</div>
          </div>
          <div className="mt-3 text-4xl font-black tracking-tight text-slate-600">{low.length}</div>
          <div className="mt-1 text-xs text-slate-400">Acceptable risk level</div>
        </div>
        <div className="surface rounded-2xl p-5 ring-1 ring-success/20">
          <div className="flex items-center gap-2">
            <ShieldAlert size={15} className="text-success" />
            <div className="text-xs font-medium text-slate-500">Risk posture</div>
          </div>
          <div className="mt-3 text-4xl font-black tracking-tight text-success">Low</div>
          <div className="mt-1 text-xs text-slate-400">If BuildTech is approved</div>
        </div>
      </div>

      {/* Risk severity visual */}
      <div className="surface rounded-2xl p-5">
        <div className="mb-3 text-xs font-semibold text-slate-500">Risk distribution</div>
        <div className="flex h-3 overflow-hidden rounded-full">
          {critical.length > 0 && <div className="bg-red-500 transition-all" style={{ width: `${(critical.length / risks.length) * 100}%` }} />}
          {medium.length > 0 && <div className="bg-amber-400 transition-all" style={{ width: `${(medium.length / risks.length) * 100}%` }} />}
          {low.length > 0 && <div className="bg-slate-300 transition-all" style={{ width: `${(low.length / risks.length) * 100}%` }} />}
        </div>
        <div className="mt-3 flex gap-5">
          {[
            { label: 'Critical', count: critical.length, color: 'bg-red-500' },
            { label: 'Medium', count: medium.length, color: 'bg-amber-400' },
            { label: 'Low', count: low.length, color: 'bg-slate-300' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-xs text-slate-500">
              <span className={`h-2 w-2 rounded-full ${s.color}`} />
              {s.count} {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Risk cards */}
      <div className="space-y-4">
        {sorted.map((risk) => {
          const cfg = severityConfig[risk.priority as Priority]
          const Icon = cfg.icon
          return (
            <div key={`${risk.supplier}-${risk.issue}`} className={`overflow-hidden rounded-2xl border-l-4 ${cfg.border} surface`}>
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}>
                      <Icon size={15} className={cfg.label} />
                    </div>
                    <div>
                      <div className="text-base font-bold text-slate-900">{risk.issue}</div>
                      <div className="mt-0.5 text-sm text-slate-500">{risk.supplier}</div>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${cfg.badge}`}>{risk.priority}</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <AlertCircle size={11} />
                      Impact
                    </div>
                    <div className="mt-2 text-sm text-slate-700">{risk.impact}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      <CheckCircle2 size={11} />
                      Mitigation
                    </div>
                    <div className="mt-2 text-sm text-slate-700">{risk.mitigation}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
