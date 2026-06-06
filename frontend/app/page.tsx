import { HeroRecommendation, MetricCard, SupplierPill } from '@/components/cards'
import { suppliers, rfq } from '@/lib/demo-data'
import { currency } from '@/lib/utils'
import { Bot, CheckCircle2, Clock3, FileUp, Sparkles, Zap } from 'lucide-react'

const timeline = [
  { label: 'RFQ Uploaded', detail: 'School Renovation', icon: FileUp },
  { label: 'Materials Normalized', detail: '500 items mapped', icon: Sparkles },
  { label: 'Suppliers Scored', detail: '5 quotes compared', icon: Zap },
  { label: 'Recommendation Generated', detail: 'BuildTech selected', icon: CheckCircle2 },
]

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-accent">Procurement command center</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Make the right supplier decision, fast.</h1>
          <p className="mt-3 max-w-2xl text-slate-400">AI compares quotes, flags hidden risks, estimates savings, and explains the decision in business terms.</p>
        </div>
        <div className="rounded-full bg-success/12 px-4 py-2 text-sm font-semibold text-success">AI Agents Online</div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total Procurement Value" value={currency(rfq.totalProcurementValue)} sub="+12.4% vs last quarter" />
        <MetricCard label="Potential Savings" value={currency(rfq.potentialSavings)} sub="Identified on active RFQ" tone="accent" />
        <MetricCard label="Suppliers Evaluated" value={rfq.suppliersEvaluated} sub="5 quote packages" />
        <MetricCard label="AI Confidence" value={`${rfq.confidence}%`} sub="Recommendation certainty" tone="accent" />
        <MetricCard label="Average Risk" value="Low" sub="21/100 risk index" tone="warning" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <HeroRecommendation supplier={rfq.recommendedSupplier} savings={rfq.potentialSavings} confidence={rfq.confidence} />
        <div className="surface rounded-[2rem] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Decision Timeline</h3>
              <p className="mt-1 text-sm text-slate-500">Live procurement workflow</p>
            </div>
            <Clock3 className="text-slate-500" size={18} />
          </div>
          <div className="mt-6 space-y-4">
            {timeline.map((item, index) => (
              <div key={item.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent/12 text-accent"><item.icon size={16} /></div>
                  {index !== timeline.length - 1 ? <div className="mt-2 h-8 w-px bg-white/[0.08]" /> : null}
                </div>
                <div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="surface rounded-[2rem] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Supplier Comparison</h3>
              <p className="text-sm text-slate-500">Recommended supplier highlighted by score, savings, coverage, and risk.</p>
            </div>
            <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold text-accent">5 suppliers</span>
          </div>
          <div className="space-y-3">
            {suppliers.map((supplier, index) => (
              <div key={supplier.id} className={`grid gap-3 rounded-3xl p-4 transition md:grid-cols-[1.2fr_0.8fr_0.6fr_0.6fr_0.6fr] ${index === 0 ? 'bg-accent/12 ring-1 ring-accent/25' : 'bg-white/[0.035] hover:bg-white/[0.055]'}`}>
                <div>
                  <div className="flex items-center gap-2 font-semibold">{supplier.name}{index === 0 ? <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-success">Recommended</span> : null}</div>
                  <div className="mt-1 text-sm text-slate-500">{supplier.anomaly}</div>
                </div>
                <div><div className="text-xs text-slate-500">Cost</div><div className="font-semibold">{currency(supplier.cost)}</div></div>
                <div><div className="text-xs text-slate-500">Coverage</div><div className="font-semibold">{supplier.coverage}%</div></div>
                <div><div className="text-xs text-slate-500">Delivery</div><div className="font-semibold">{supplier.deliveryDays}d</div></div>
                <div className="flex items-center justify-between gap-3"><SupplierPill risk={supplier.risk} /><span className="text-lg font-semibold">{supplier.score}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface rounded-[2rem] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue/12 text-blue"><Bot size={19} /></div>
            <div>
              <h3 className="font-semibold">Procurement Copilot</h3>
              <p className="text-sm text-slate-500">Ask why, what if, and who to choose.</p>
            </div>
          </div>
          <div className="mt-5 rounded-3xl bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">BuildTech is recommended because it offers the strongest combination of low cost, high coverage, and low execution risk.</div>
          <div className="mt-4 space-y-2">
            {['Why was BuildTech selected?', 'Show high-risk suppliers.', 'What savings can we achieve?', 'Who has the fastest delivery?'].map((prompt) => (
              <div key={prompt} className="rounded-2xl bg-white/[0.035] px-4 py-3 text-sm text-slate-400">{prompt}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
