import { HeroRecommendation, MetricCard } from '@/components/cards'
import { CoverageChart, RiskScatter, SpendChart } from '@/components/dashboard-charts'
import { agentActivity, rfq } from '@/lib/demo-data'
import { currency } from '@/lib/utils'
import Link from 'next/link'

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Total Procurement Value" value={currency(rfq.totalProcurementValue)} sub="Across 50 RFQs" />
        <MetricCard label="Potential Savings" value={currency(rfq.potentialSavings)} sub="School Renovation" tone="accent" />
        <MetricCard label="Active RFQs" value={rfq.activeRfqs} sub="Demo portfolio" />
        <MetricCard label="Suppliers Evaluated" value={rfq.suppliersEvaluated} sub="Per RFQ" />
        <MetricCard label="Avg Risk Score" value={`${rfq.averageRiskScore}/100`} sub="Lower is better" tone="warning" />
        <MetricCard label="Coverage" value={`${rfq.coverage}%`} sub="Recommended supplier" tone="accent" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_260px]">
        <HeroRecommendation supplier={rfq.recommendedSupplier} savings={rfq.potentialSavings} confidence={rfq.confidence} />
        <div className="rounded-3xl border border-accent/25 bg-accent/10 p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-accent">Demo data loaded</div>
          <div className="mt-4 text-3xl font-semibold">2,500</div>
          <p className="mt-2 text-sm text-slate-300">Quote rows, 500 materials, 50 RFQs, and 5 suppliers are bundled for Vercel demo mode.</p>
          <Link href="/api/demo" className="mt-5 inline-flex rounded-2xl border border-accent/30 px-4 py-2 text-sm text-accent">Inspect JSON</Link>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <SpendChart />
        <CoverageChart />
        <RiskScatter />
      </div>
      <div className="rounded-3xl border border-border bg-panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Live Agent Activity</h3>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">Trace trc_1001</span>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {agentActivity.map((agent) => (
            <div key={agent.name} className="rounded-2xl border border-border bg-panel2 p-4">
              <div className="text-sm font-semibold">{agent.name}</div>
              <div className="mt-2 text-xs text-accent">{agent.status} • {agent.duration}</div>
              <p className="mt-3 text-sm text-slate-400">{agent.detail}</p>
              <div className="mt-3 text-xs text-muted">Cost {agent.cost}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
