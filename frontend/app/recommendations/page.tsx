import { HeroRecommendation, MetricCard, SupplierPill } from '@/components/cards'
import { suppliers, rfq } from '@/lib/demo-data'
import { currency } from '@/lib/utils'

export default function RecommendationsPage() {
  const best = suppliers[0]
  return (
    <div className="space-y-6">
      <HeroRecommendation supplier={rfq.recommendedSupplier} savings={rfq.potentialSavings} confidence={rfq.confidence} />
      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard label="Expected Savings" value={currency(rfq.potentialSavings)} tone="accent" />
        <MetricCard label="Coverage" value={`${best.coverage}%`} tone="accent" />
        <MetricCard label="Delivery Timeline" value={`${best.deliveryDays} days`} />
        <MetricCard label="Risk Assessment" value={best.risk} />
        <MetricCard label="AI Confidence" value={`${rfq.confidence}%`} tone="accent" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="surface rounded-[2rem] p-6">
          <h3 className="text-xl font-semibold">Why this recommendation?</h3>
          <p className="mt-4 text-lg leading-8 text-slate-300">BuildTech Supply delivers the strongest procurement outcome: lowest qualified total cost, 98% material coverage, a 32-day delivery timeline, and low execution risk. The recommendation creates {currency(rfq.potentialSavings)} in estimated savings while preserving delivery confidence.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="surface-soft rounded-2xl p-4"><div className="text-sm text-slate-500">Cost advantage</div><div className="mt-1 font-semibold text-success">Best qualified</div></div>
            <div className="surface-soft rounded-2xl p-4"><div className="text-sm text-slate-500">Missing items</div><div className="mt-1 font-semibold">2 low-impact</div></div>
            <div className="surface-soft rounded-2xl p-4"><div className="text-sm text-slate-500">Approval status</div><div className="mt-1 font-semibold text-warning">Pending</div></div>
          </div>
          <button className="mt-6 rounded-2xl bg-accent px-5 py-3 font-semibold text-white shadow-glow transition hover:opacity-90">Approve Recommendation</button>
        </div>
        <div className="surface rounded-[2rem] p-6">
          <h3 className="text-xl font-semibold">Alternative Tradeoffs</h3>
          <div className="mt-4 space-y-3">
            {suppliers.slice(1, 4).map((supplier) => (
              <div key={supplier.id} className="rounded-3xl bg-white/[0.04] p-4">
                <div className="flex items-center justify-between"><span className="font-medium">{supplier.name}</span><SupplierPill risk={supplier.risk} /></div>
                <div className="mt-2 text-sm text-slate-500">{currency(supplier.cost)} • {supplier.coverage}% coverage • score {supplier.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
