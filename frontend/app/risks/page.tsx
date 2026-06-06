import { MetricCard, SupplierPill } from '@/components/cards'
import { risks } from '@/lib/demo-data'

export default function RisksPage() {
  const critical = risks.filter((r) => r.priority === 'Critical').length
  const medium = risks.filter((r) => r.priority === 'Medium').length
  const low = risks.filter((r) => r.priority === 'Low').length
  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Procurement Risk Center</div>
        <h2 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-900">Hidden quote gaps, price anomalies, and delivery risks.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Critical Risks" value={critical} tone="danger" />
        <MetricCard label="Medium Risks" value={medium} tone="warning" />
        <MetricCard label="Low Risks" value={low} />
        <MetricCard label="Risk Posture" value="Low" tone="success" sub="If BuildTech is approved" />
      </div>
      <div className="space-y-4">
        {risks.map((risk) => (
          <div key={`${risk.supplier}-${risk.issue}`} className="surface rounded-3xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-lg font-bold tracking-tight text-slate-900">{risk.issue}</div>
                <div className="mt-1 text-sm text-slate-500">{risk.supplier}</div>
              </div>
              <SupplierPill risk={risk.priority === 'Critical' ? 'Critical' : risk.priority === 'Medium' ? 'Medium' : 'Low'} />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="surface-soft rounded-2xl p-4">
                <div className="text-xs font-medium text-slate-500">Impact</div>
                <div className="mt-2 text-sm leading-6 text-slate-700">{risk.impact}</div>
              </div>
              <div className="surface-soft rounded-2xl p-4">
                <div className="text-xs font-medium text-slate-500">Mitigation</div>
                <div className="mt-2 text-sm leading-6 text-slate-700">{risk.mitigation}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
