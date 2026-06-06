import { HeroRecommendation, MetricCard } from '@/components/cards'
import { CoverageChart, RiskScatter, SpendChart } from '@/components/dashboard-charts'
import { agentActivity, rfq } from '@/lib/demo-data'
import { currency } from '@/lib/utils'
import Link from 'next/link'

export default function OverviewPage() {
  return (
    <div className="space-y-7">
      <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <HeroRecommendation supplier={rfq.recommendedSupplier} savings={rfq.potentialSavings} confidence={rfq.confidence} />
        <div className="glass-panel rounded-[2rem] p-6">
          <div className="text-[11px] uppercase tracking-[0.24em] text-accent">Demo Data Loaded</div>
          <div className="mt-5 text-6xl font-semibold tracking-[-0.05em]">2,500</div>
          <p className="mt-3 text-sm leading-6 text-slate-300">Quote rows, 500 materials, 50 RFQs, and 5 suppliers are bundled for instant Vercel demo mode.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/[0.04] p-3"><div className="text-muted">Materials</div><div className="font-semibold">500</div></div>
            <div className="rounded-2xl bg-white/[0.04] p-3"><div className="text-muted">Suppliers</div><div className="font-semibold">5</div></div>
          </div>
          <Link href="/api/demo" className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-medium text-accent transition hover:bg-accent/15">Inspect Demo JSON</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Total Procurement Value" value={currency(rfq.totalProcurementValue)} sub="Across 50 RFQs" />
        <MetricCard label="Potential Savings" value={currency(rfq.potentialSavings)} sub="School Renovation" tone="accent" />
        <MetricCard label="Active RFQs" value={rfq.activeRfqs} sub="Demo portfolio" />
        <MetricCard label="Suppliers Evaluated" value={rfq.suppliersEvaluated} sub="Per RFQ" />
        <MetricCard label="Avg Risk Score" value={`${rfq.averageRiskScore}/100`} sub="Lower is better" tone="warning" />
        <MetricCard label="Coverage" value={`${rfq.coverage}%`} sub="Recommended supplier" tone="accent" />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <SpendChart />
        <CoverageChart />
        <RiskScatter />
      </section>

      <section className="glass-panel rounded-[2rem] p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Live Agent Activity</h3>
            <p className="text-sm text-muted">Material, supplier, risk, and recommendation agents are fully traced.</p>
          </div>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">Trace trc_1001</span>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {agentActivity.map((agent, index) => (
            <div key={agent.name} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-accent/25">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">{index + 1}</div>
                <div className="text-sm font-semibold">{agent.name}</div>
              </div>
              <div className="mt-3 text-xs text-accent">{agent.status} • {agent.duration}</div>
              <p className="mt-3 min-h-10 text-sm text-slate-400">{agent.detail}</p>
              <div className="mt-3 text-xs text-muted">Cost {agent.cost}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
