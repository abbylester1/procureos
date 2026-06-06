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
    <div className="space-y-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-sm font-medium text-accent">Procurement command center</div>
          <h1 className="mt-3 max-w-4xl text-[48px] font-semibold leading-[0.98] tracking-[-0.055em]">Make the right supplier decision, fast.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">AI compares quotes, flags hidden risks, estimates savings, and explains the decision in business terms.</p>
        </div>
        <div className="rounded-full bg-white/[0.045] px-4 py-2 text-sm font-medium text-slate-400">AI Agents Online</div>
      </div>

      <section>
        <HeroRecommendation supplier={rfq.recommendedSupplier} savings={rfq.potentialSavings} confidence={rfq.confidence} />
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total Procurement Value" value={currency(rfq.totalProcurementValue)} sub="Across active school renovation RFQs" />
        <MetricCard label="Potential Savings" value={currency(rfq.potentialSavings)} sub="Identified on active RFQ" tone="success" />
        <MetricCard label="Suppliers Evaluated" value={rfq.suppliersEvaluated} sub="5 quote packages" />
        <MetricCard label="AI Confidence" value={`${rfq.confidence}%`} sub="Recommendation certainty" tone="accent" />
        <MetricCard label="Average Risk" value="Low" sub="21/100 risk index" />
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="surface rounded-3xl p-6">
          <div className="mb-6 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.02em]">Supplier Comparison</h3>
              <p className="mt-2 text-sm text-slate-500">Recommended supplier highlighted by score, savings, coverage, and risk.</p>
            </div>
            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-400">5 suppliers</span>
          </div>
          <div className="space-y-3">
            {suppliers.map((supplier, index) => (
              <div key={supplier.id} className={`grid gap-4 rounded-[20px] p-4 md:grid-cols-[1.2fr_0.8fr_0.6fr_0.6fr_0.6fr] ${index === 0 ? 'bg-accent/10' : 'bg-white/[0.03]'}`}>
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">{supplier.name}{index === 0 ? <span className="rounded-full bg-success/12 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-success">Recommended</span> : null}</div>
                  <div className="mt-1 text-sm text-slate-500">{supplier.anomaly}</div>
                </div>
                <div><div className="text-sm text-slate-500">Cost</div><div className="mt-1 text-sm font-semibold">{currency(supplier.cost)}</div></div>
                <div><div className="text-sm text-slate-500">Coverage</div><div className="mt-1 text-sm font-semibold">{supplier.coverage}%</div></div>
                <div><div className="text-sm text-slate-500">Delivery</div><div className="mt-1 text-sm font-semibold">{supplier.deliveryDays}d</div></div>
                <div className="flex items-center justify-between gap-3"><SupplierPill risk={supplier.risk} /><span className="text-sm font-semibold text-slate-300">{supplier.score}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="surface-muted rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">Decision Timeline</h3>
                <p className="mt-2 text-sm text-slate-500">Live procurement workflow</p>
              </div>
              <Clock3 className="text-slate-600" size={18} />
            </div>
            <div className="mt-6 space-y-4">
              {timeline.map((item, index) => (
                <div key={item.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.045] text-slate-400"><item.icon size={15} /></div>
                    {index !== timeline.length - 1 ? <div className="mt-2 h-7 w-px bg-white/[0.06]" /> : null}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-300">{item.label}</div>
                    <div className="mt-1 text-sm text-slate-500">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-muted rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.045] text-slate-400"><Bot size={18} /></div>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">Procurement Copilot</h3>
                <p className="mt-1 text-sm text-slate-500">Ask why, what if, and who to choose.</p>
              </div>
            </div>
            <div className="mt-5 rounded-[20px] bg-white/[0.035] p-4 text-sm leading-6 text-slate-400">BuildTech is recommended because it offers the strongest combination of low cost, high coverage, and low execution risk.</div>
            <div className="mt-4 space-y-2">
              {['Why was BuildTech selected?', 'Show high-risk suppliers.', 'What savings can we achieve?'].map((prompt) => (
                <div key={prompt} className="rounded-xl bg-white/[0.028] px-4 py-3 text-sm text-slate-500">{prompt}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
