import { SupplierPill } from '@/components/cards'
import { CoverageChart, RiskScatter } from '@/components/dashboard-charts'
import { suppliers } from '@/lib/demo-data'
import { currency } from '@/lib/utils'

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-accent">Supplier Comparison</div>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">Evaluate vendor tradeoffs without spreadsheet work.</h2>
          <p className="mt-3 max-w-2xl text-slate-400">Compare total cost, coverage, delivery confidence, risk posture, and recommendation score.</p>
        </div>
        <button className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-glow">Upload Quotes</button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {suppliers.map((supplier, index) => (
          <div key={supplier.id} className={`surface rounded-3xl p-5 ${index === 0 ? 'ring-1 ring-accent/40' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="font-semibold">{supplier.name}</div>
              <SupplierPill risk={supplier.risk} />
            </div>
            <div className="mt-5 text-2xl font-semibold">{currency(supplier.cost)}</div>
            <div className="mt-3 h-2 rounded-full bg-white/[0.06]"><div className="h-2 rounded-full bg-gradient-to-r from-accent to-blue" style={{ width: `${supplier.coverage}%` }} /></div>
            <div className="mt-3 text-sm text-slate-500">{supplier.coverage}% coverage • score {supplier.score}</div>
          </div>
        ))}
      </div>

      <div className="surface overflow-hidden rounded-[2rem] p-2">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-5 py-4">Supplier</th>
              <th className="px-5 py-4">Cost</th>
              <th className="px-5 py-4">Coverage</th>
              <th className="px-5 py-4">Delivery</th>
              <th className="px-5 py-4">Risk</th>
              <th className="px-5 py-4">Score</th>
              <th className="px-5 py-4">Anomaly</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={supplier.id} className={`text-slate-300 ${index === 0 ? 'bg-accent/10' : 'hover:bg-white/[0.035]'}`}>
                <td className="rounded-l-2xl px-5 py-4 font-medium text-white">{supplier.name}</td>
                <td className="px-5 py-4">{currency(supplier.cost)}</td>
                <td className="px-5 py-4">{supplier.coverage}%</td>
                <td className="px-5 py-4">{supplier.deliveryDays} days</td>
                <td className="px-5 py-4"><SupplierPill risk={supplier.risk} /></td>
                <td className="px-5 py-4 font-semibold text-accent">{supplier.score}</td>
                <td className="rounded-r-2xl px-5 py-4 text-slate-500">{supplier.anomaly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <CoverageChart />
        <RiskScatter />
      </div>
    </div>
  )
}
