import { MetricCard, SupplierPill } from '@/components/cards'
import { risks } from '@/lib/demo-data'

export default function RisksPage() {
  const critical = risks.filter((risk) => risk.priority === 'Critical').length
  const medium = risks.filter((risk) => risk.priority === 'Medium').length
  const low = risks.filter((risk) => risk.priority === 'Low').length
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-[0.28em] text-accent">Procurement Risk Center</div>
        <h2 className="mt-2 text-3xl font-semibold">Hidden quote gaps, price anomalies, and delivery risks</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Critical Risks" value={critical} tone="danger" />
        <MetricCard label="Medium Risks" value={medium} tone="warning" />
        <MetricCard label="Low Risks" value={low} />
        <MetricCard label="Risk Posture" value="Low" tone="accent" sub="If BuildTech is approved" />
      </div>
      <div className="grid gap-4">
        {risks.map((risk) => (
          <div key={`${risk.supplier}-${risk.issue}`} className="rounded-3xl border border-border bg-panel p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{risk.issue}</div>
                <div className="mt-1 text-sm text-muted">{risk.supplier}</div>
              </div>
              <SupplierPill risk={risk.priority === 'Critical' ? 'Critical' : risk.priority === 'Medium' ? 'Medium' : 'Low'} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-panel2 p-4"><div className="text-xs uppercase text-muted">Impact</div><div className="mt-2 text-slate-300">{risk.impact}</div></div>
              <div className="rounded-2xl bg-panel2 p-4"><div className="text-xs uppercase text-muted">Mitigation</div><div className="mt-2 text-slate-300">{risk.mitigation}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
