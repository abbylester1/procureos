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
        <div className="rounded-3xl border border-border bg-panel p-6">
          <h3 className="text-xl font-semibold">AI Recommendation Reasoning</h3>
          <p className="mt-4 leading-7 text-slate-300">BuildTech Supply is recommended because it delivers the strongest composite procurement outcome: lowest qualified total cost, 98% material coverage, a 32-day delivery timeline inside the renovation SLA, and low risk. The selection creates an estimated {currency(rfq.potentialSavings)} in savings against the supplier benchmark while preserving delivery confidence.</p>
          <button className="mt-6 rounded-2xl bg-accent px-5 py-3 font-semibold text-slate-950 transition hover:bg-accent/90">Approve Recommendation</button>
        </div>
        <div className="rounded-3xl border border-border bg-panel p-6">
          <h3 className="text-xl font-semibold">Alternative Tradeoffs</h3>
          <div className="mt-4 space-y-3">
            {suppliers.slice(1, 4).map((supplier) => (
              <div key={supplier.id} className="rounded-2xl border border-border bg-panel2 p-4">
                <div className="flex items-center justify-between"><span className="font-medium">{supplier.name}</span><SupplierPill risk={supplier.risk} /></div>
                <div className="mt-2 text-sm text-slate-400">{currency(supplier.cost)} • {supplier.coverage}% coverage • score {supplier.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
