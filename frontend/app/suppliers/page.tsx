import { CoverageChart, RiskScatter } from '@/components/dashboard-charts'
import { suppliers } from '@/lib/demo-data'
import { currency } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

function RiskBadge({ risk }: { risk: string }) {
  const styles = risk === 'Low'
    ? 'bg-green-100 text-green-700'
    : risk === 'Medium'
    ? 'bg-amber-100 text-amber-700'
    : 'bg-red-100 text-red-700'
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}>{risk}</span>
}

function CoverageBar({ value }: { value: number }) {
  return (
    <div className="mt-3">
      <div className="mb-1 flex justify-between text-xs text-slate-400">
        <span>Coverage</span>
        <span className="font-semibold text-slate-700">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function SuppliersPage() {
  const best = suppliers[0]
  const worst = suppliers[suppliers.length - 1]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Supplier Intelligence</div>
          <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">Compare all supplier quotes side-by-side.</h1>
          <p className="mt-1 text-sm text-slate-500">5 quotes evaluated across cost, coverage, delivery, and risk.</p>
        </div>
        <button className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">Upload Quotes</button>
      </div>

      {/* Quick insight strip */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-medium text-slate-500">Best value</div>
          <div className="mt-2 text-lg font-bold text-slate-900">{best.name}</div>
          <div className="mt-1 text-sm text-success font-semibold">{currency(best.cost)}</div>
          <div className="mt-1 text-xs text-slate-400">Score {best.score} · {best.coverage}% coverage</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-medium text-slate-500">Highest risk</div>
          <div className="mt-2 text-lg font-bold text-slate-900">{worst.name}</div>
          <div className="mt-1 text-sm text-danger font-semibold">{worst.risk} risk</div>
          <div className="mt-1 text-xs text-slate-400">{worst.missingItems} missing line items</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-medium text-slate-500">Potential savings</div>
          <div className="mt-2 text-lg font-bold text-slate-900">{currency(74120)}</div>
          <div className="mt-1 text-sm text-slate-600 font-semibold">vs average quote</div>
          <div className="mt-1 text-xs text-slate-400">12.8% below next best</div>
        </div>
      </div>

      {/* Score card grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {suppliers.map((s, i) => (
          <div key={s.id} className={`surface rounded-2xl p-5 transition ${i === 0 ? 'ring-2 ring-accent/25' : ''}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm font-bold text-slate-900 leading-snug">{s.name}</div>
              <RiskBadge risk={s.risk} />
            </div>
            <div className="mt-4">
              <div className="text-xs text-slate-400">Total cost</div>
              <div className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">{currency(s.cost)}</div>
            </div>
            <CoverageBar value={s.coverage} />
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <div className="text-xs text-slate-400">Delivery</div>
                <div className="text-sm font-semibold text-slate-700">{s.deliveryDays}d</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Score</div>
                <div className={`text-lg font-black ${i === 0 ? 'text-accent' : 'text-slate-600'}`}>{s.score}</div>
              </div>
            </div>
            {i === 0 && (
              <div className="mt-3 flex items-center gap-1 rounded-xl bg-accent/10 px-3 py-2 text-xs font-bold text-accent">
                <ArrowUpRight size={12} /> AI recommended
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail table */}
      <div className="surface overflow-hidden rounded-3xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-sm font-bold text-slate-900">Full comparison</h3>
          <p className="mt-0.5 text-xs text-slate-400">All suppliers · School Renovation RFO</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Supplier', 'Total Cost', 'Coverage', 'Delivery', 'Missing Items', 'Completeness', 'Risk', 'Score', 'Anomaly'].map((h) => (
                  <th key={h} className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, i) => (
                <tr key={s.id} className={`border-t border-slate-50 ${i === 0 ? 'bg-accent/[0.03]' : 'hover:bg-slate-50'}`}>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    {i === 0 && <div className="mt-0.5 text-[10px] font-bold text-accent">Recommended</div>}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-700">{currency(s.cost)}</td>
                  <td className="px-5 py-4 text-slate-700">{s.coverage}%</td>
                  <td className="px-5 py-4 text-slate-700">{s.deliveryDays} days</td>
                  <td className="px-5 py-4">
                    <span className={s.missingItems === 0 ? 'text-success font-semibold' : s.missingItems > 10 ? 'text-danger font-semibold' : 'text-warning font-semibold'}>
                      {s.missingItems === 0 ? 'None' : s.missingItems}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{s.quoteCompleteness}%</td>
                  <td className="px-5 py-4"><RiskBadge risk={s.risk} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${s.score}%` }} />
                      </div>
                      <span className="font-bold text-slate-800">{s.score}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">{s.anomaly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <CoverageChart />
        <RiskScatter />
      </div>
    </div>
  )
}
