import { MetricCard, SupplierPill } from '@/components/cards'
import { risks } from '@/lib/demo-data'

export default function RisksPage() {
  const critical = risks.filter((risk) => risk.priority === 'Critical').length
  const medium = risks.filter((risk) => risk.priority === 'Medium').length
  const low = risks.filter((risk) => risk.priority === 'Low').length
  return (
    <div className="space-y-12">
      <div>
        <div className="text-sm font-medium text-accent">Procurement Risk Center</div>
        <h2 className="mt-3 max-w-4xl text-[48px] font-semibold leading-[0.98] tracking-[-0.055em]">Hidden quote gaps, price anomalies, and delivery risks.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard label="Critical Risks" value={critical} tone="danger" />
        <MetricCard label="Medium Risks" value={medium} tone="warning" />
        <MetricCard label="Low Risks" value={low} />
        <MetricCard label="Risk Posture" value="Low" tone="success" sub="If BuildTech is approved" />
      </div>
      <div className="grid gap-6">
        {risks.map((risk) => (
          <div key={`${risk.supplier}-${risk.issue}`} className="surface rounded-3xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xl font-semibold tracking-[-0.02em]">{risk.issue}</div>
                <div className="mt-1 text-sm text-slate-500">{risk.supplier}</div>
              </div>
              <SupplierPill risk={risk.priority === 'Critical' ? 'Critical' : risk.priority === 'Medium' ? 'Medium' : 'Low'} />
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="surface-soft rounded-[20px] p-4"><div className="text-sm text-slate-500">Impact</div><div className="mt-2 text-sm leading-6 text-slate-300">{risk.impact}</div></div>
              <div className="surface-soft rounded-[20px] p-4"><div className="text-sm text-slate-500">Mitigation</div><div className="mt-2 text-sm leading-6 text-slate-300">{risk.mitigation}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
