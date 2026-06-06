import { SupplierPill } from '@/components/cards'
import { CoverageChart, RiskScatter } from '@/components/dashboard-charts'
import { suppliers } from '@/lib/demo-data'
import { currency } from '@/lib/utils'

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-[0.28em] text-accent">Supplier Comparison Center</div>
        <h2 className="mt-2 text-3xl font-semibold">Compare quotes, coverage, delivery, and risk</h2>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border bg-panel">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-panel2 text-xs uppercase tracking-[0.18em] text-muted">
            <tr>
              <th className="p-4">Supplier</th>
              <th className="p-4">Cost</th>
              <th className="p-4">Coverage</th>
              <th className="p-4">Delivery</th>
              <th className="p-4">Risk</th>
              <th className="p-4">Score</th>
              <th className="p-4">Missing</th>
              <th className="p-4">Anomaly</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t border-border text-slate-300">
                <td className="p-4 font-medium text-white">{supplier.name}</td>
                <td className="p-4">{currency(supplier.cost)}</td>
                <td className="p-4">{supplier.coverage}%</td>
                <td className="p-4">{supplier.deliveryDays} days</td>
                <td className="p-4"><SupplierPill risk={supplier.risk} /></td>
                <td className="p-4 text-accent">{supplier.score}</td>
                <td className="p-4">{supplier.missingItems}</td>
                <td className="p-4 text-slate-400">{supplier.anomaly}</td>
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
