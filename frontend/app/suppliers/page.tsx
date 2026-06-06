import { SupplierPill } from '@/components/cards'
import { CoverageChart, RiskScatter } from '@/components/dashboard-charts'
import { suppliers } from '@/lib/demo-data'
import { currency } from '@/lib/utils'

export default function SuppliersPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Supplier Comparison</div>
          <h2 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-900">Evaluate vendor tradeoffs without spreadsheet work.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Compare total cost, coverage, delivery confidence, risk posture, and recommendation score.</p>
        </div>
        <button className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">Upload Quotes</button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {suppliers.map((supplier, index) => (
          <div key={supplier.id} className={`surface rounded-2xl p-5 ${index === 0 ? 'ring-2 ring-accent/30' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-semibold text-slate-900">{supplier.name}</div>
              <SupplierPill risk={supplier.risk} />
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{currency(supplier.cost)}</div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-accent" style={{ width: `${supplier.coverage}%` }} />
            </div>
            <div className="mt-2 text-xs text-slate-500">{supplier.coverage}% coverage · score {supplier.score}</div>
          </div>
        ))}
      </div>

      <div className="surface overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Supplier</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Cost</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Coverage</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Delivery</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Risk</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Score</th>
                <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Anomaly</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={supplier.id} className={`border-t border-slate-50 ${index === 0 ? 'bg-accent/[0.035]' : 'hover:bg-slate-50'}`}>
                  <td className="px-6 py-4 font-semibold text-slate-900">{supplier.name}</td>
                  <td className="px-6 py-4 text-slate-700">{currency(supplier.cost)}</td>
                  <td className="px-6 py-4 text-slate-700">{supplier.coverage}%</td>
                  <td className="px-6 py-4 text-slate-700">{supplier.deliveryDays} days</td>
                  <td className="px-6 py-4"><SupplierPill risk={supplier.risk} /></td>
                  <td className="px-6 py-4 font-bold text-slate-800">{supplier.score}</td>
                  <td className="px-6 py-4 text-slate-500">{supplier.anomaly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <CoverageChart />
        <RiskScatter />
      </div>
    </div>
  )
}
