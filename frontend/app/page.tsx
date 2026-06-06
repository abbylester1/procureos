import { rfq, suppliers, risks as riskData } from '@/lib/demo-data'
import { currency } from '@/lib/utils'
import { BadgeCheck, CheckCircle2, Zap } from 'lucide-react'

const analysisSteps = [
  { label: 'RFQ uploaded', time: '10:21 AM', done: true },
  { label: '5 Supplier quotes uploaded', time: '10:22 AM', done: true },
  { label: 'Materials normalized', time: '10:23 AM', done: true },
  { label: 'Suppliers scored', time: '10:24 AM', done: true },
  { label: 'AI recommendation generated', time: '10:25 AM', done: false },
]

const liveAgents = [
  { name: 'Material Agent', detail: 'Normalizing 500+ materials', bg: 'bg-purple-500' },
  { name: 'Supplier Agent', detail: 'Scoring 5 suppliers', bg: 'bg-blue-500' },
  { name: 'Risk Agent', detail: 'Assessing risk factors', bg: 'bg-orange-500' },
  { name: 'Recommendation Agent', detail: 'Generating final recommendation', bg: 'bg-green-500' },
]

const savingsBreakdown = [
  { label: 'Material Cost Savings', value: 52430, color: '#6D5DFC' },
  { label: 'Delivery Savings', value: 12120, color: '#16A34A' },
  { label: 'Risk Adjustment', value: 9570, color: '#D97706' },
]

const sparklines: Record<string, number[]> = {
  procurement: [45, 52, 48, 58, 55, 62, 68, 65, 72, 70, 78, 81],
  savings: [20, 25, 22, 30, 35, 32, 40, 38, 45, 50, 48, 55],
  suppliers: [3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5],
  confidence: [70, 72, 75, 78, 80, 82, 85, 87, 88, 90, 92, 94],
  risk: [45, 40, 42, 35, 32, 30, 28, 25, 24, 22, 21, 21],
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1
  const w = 100, h = 32
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h * 0.85 + h * 0.075}`)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" preserveAspectRatio="none">
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DonutChart({ segments }: { segments: { value: number; color: string }[] }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0)
  const r = 32, cx = 40, cy = 40, circ = 2 * Math.PI * r
  let cumDash = 0
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F1F5F9" strokeWidth="12" />
      {segments.map((seg, i) => {
        const dash = (seg.value / total) * circ
        const offset = circ / 4 - cumDash
        cumDash += dash
        return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth="12" strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={offset} />
      })}
    </svg>
  )
}

const metrics = [
  { label: 'Total Procurement Value', value: currency(rfq.totalProcurementValue), sub: `Across ${rfq.activeRfqs} RFQs`, color: '#6D5DFC', spark: 'procurement' },
  { label: 'Potential Savings', value: currency(rfq.potentialSavings), sub: 'Across current RFO', color: '#16A34A', spark: 'savings' },
  { label: 'Suppliers Evaluated', value: rfq.suppliersEvaluated, sub: 'Active quotes', color: '#3B82F6', spark: 'suppliers' },
  { label: 'AI Confidence', value: `${rfq.confidence}%`, sub: 'High confidence', color: '#6D5DFC', spark: 'confidence' },
  { label: 'Average Risk', value: 'Low', sub: 'Overall risk level', color: '#16A34A', spark: 'risk' },
]

const recStats = [
  { label: 'Potential Savings', value: currency(rfq.potentialSavings), sub: '12.8% vs next best', tone: 'text-success' },
  { label: 'AI Confidence', value: `${rfq.confidence}%`, sub: 'High confidence', tone: 'text-accent' },
  { label: 'Risk Level', value: 'Low', sub: 'Lowest risk', tone: 'text-success' },
  { label: 'Coverage', value: `${rfq.coverage}%`, sub: 'Items covered', tone: 'text-slate-800' },
  { label: 'Delivery SLA', value: '32 Days', sub: 'Meets requirement', tone: 'text-slate-800' },
]

const whyReasons = [
  'Lowest total cost with full item coverage',
  'Meets delivery SLA (32 days)',
  'Strong historical performance',
  'Lowest overall risk score',
]

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Welcome back, Olivia</div>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">Here&apos;s your procurement overview</h1>
        <p className="mt-1 text-sm text-slate-500">Real-time insights from AI-powered analysis</p>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">

        {/* ─── Left column ─── */}
        <div className="space-y-5">

          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {metrics.map((m) => (
              <div key={m.label} className="surface rounded-2xl p-4">
                <div className="text-xs font-medium text-slate-500">{m.label}</div>
                <div className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{m.value}</div>
                <div className="mt-0.5 text-xs text-slate-400">{m.sub}</div>
                <div className="mt-3"><Sparkline data={sparklines[m.spark]} color={m.color} /></div>
              </div>
            ))}
          </div>

          {/* AI Recommended Decision */}
          <div className="surface-hero rounded-3xl p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">AI Recommended Decision</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">{rfq.recommendedSupplier}</h2>
              <span className="flex items-center justify-center rounded-full bg-accent p-1.5 text-white">
                <BadgeCheck size={18} />
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Lowest risk-adjusted cost while maintaining delivery SLA, high coverage, and full auditability for the School Renovation RFO.
            </p>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
              {recStats.map((s) => (
                <div key={s.label} className="surface rounded-2xl p-4">
                  <div className="text-xs text-slate-500">{s.label}</div>
                  <div className={`mt-2 text-xl font-bold tracking-tight ${s.tone}`}>{s.value}</div>
                  <div className="mt-0.5 text-[11px] text-slate-400">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Why + Savings */}
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Why this supplier?</div>
                <ul className="mt-3 space-y-2.5">
                  {whyReasons.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={15} className="shrink-0 text-success" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Savings Breakdown</div>
                <div className="mt-3 flex items-center gap-4">
                  <DonutChart segments={savingsBreakdown} />
                  <div className="flex-1 space-y-2">
                    {savingsBreakdown.map((s) => (
                      <div key={s.label} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
                        <span className="flex-1 truncate">{s.label}</span>
                        <span className="font-semibold text-slate-800">{currency(s.value)}</span>
                      </div>
                    ))}
                    <div className="border-t border-slate-200 pt-2 flex justify-between text-xs font-bold text-slate-900">
                      <span>Total</span>
                      <span>{currency(rfq.potentialSavings)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">View full analysis</button>
              <button className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
                <CheckCircle2 size={15} />
                Approve recommendation
              </button>
            </div>
          </div>

          {/* Supplier Comparison */}
          <div className="surface overflow-hidden rounded-3xl">
            <div className="border-b border-slate-100 px-6 py-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Supplier Comparison</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Supplier</th>
                    <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Cost</th>
                    <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Coverage</th>
                    <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Delivery</th>
                    <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Risk</th>
                    <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Overall Score</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((s, i) => (
                    <tr key={s.id} className={`border-t border-slate-50 ${i === 0 ? 'bg-accent/[0.035]' : 'hover:bg-slate-50'}`}>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {s.name}
                        {i === 0 && <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">Recommended</span>}
                      </td>
                      <td className="px-6 py-4 text-slate-700">{currency(s.cost)}</td>
                      <td className="px-6 py-4 text-slate-700">{s.coverage}%</td>
                      <td className="px-6 py-4 text-slate-700">{s.deliveryDays} Days</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s.risk === 'Low' ? 'bg-green-100 text-green-700' : s.risk === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{s.risk}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-accent" style={{ width: `${s.score}%` }} />
                          </div>
                          <span className="w-6 text-right text-sm font-bold text-slate-800">{s.score}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ─── Right sidebar ─── */}
        <div className="space-y-4">

          {/* Analysis Progress */}
          <div className="surface rounded-3xl p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Analysis Progress</div>
            <div className="mt-4 space-y-0">
              {analysisSteps.map((step, i) => (
                <div key={step.label} className="flex items-start gap-3 py-2">
                  <div className="flex flex-col items-center pt-0.5">
                    {step.done
                      ? <CheckCircle2 size={18} className="text-success" />
                      : <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-accent">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                        </div>
                    }
                    {i < analysisSteps.length - 1 && (
                      <div className={`mt-1 h-5 w-px ${step.done ? 'bg-success/25' : 'bg-slate-200'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className={`text-sm font-medium ${step.done ? 'text-slate-700' : 'text-accent'}`}>{step.label}</div>
                    <div className="text-xs text-slate-400">{step.done ? 'Completed' : 'In progress'}</div>
                  </div>
                  <div className="shrink-0 text-xs text-slate-400">{step.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Agent Activity */}
          <div className="surface rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Live Agent Activity</div>
              <button className="text-xs font-semibold text-accent hover:underline">View all →</button>
            </div>
            <div className="mt-4 space-y-2">
              {liveAgents.map((agent) => (
                <div key={agent.name} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${agent.bg} text-white`}>
                    <Zap size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-800">{agent.name}</div>
                    <div className="truncate text-xs text-slate-400">{agent.detail}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-success">
                    <span className="pulse-dot h-2 w-2 rounded-full bg-success" />
                    Running
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Risks */}
          <div className="surface rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Top Risks Identified</div>
              <button className="text-xs font-semibold text-accent hover:underline">View all →</button>
            </div>
            <div className="mt-4 space-y-3">
              {riskData.slice(0, 3).map((risk) => (
                <div key={risk.issue} className={`rounded-xl p-3 ${risk.priority === 'Critical' ? 'bg-red-50' : risk.priority === 'Medium' ? 'bg-amber-50' : 'bg-slate-50'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs font-semibold text-slate-800">{risk.issue}</div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${risk.priority === 'Critical' ? 'bg-red-100 text-red-700' : risk.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>{risk.priority}</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">Impact: {risk.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
