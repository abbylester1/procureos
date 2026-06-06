import { traces } from '@/lib/demo-data'
import { Activity, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

const serviceColors: Record<string, string> = {
  ingestion: 'bg-blue-100 text-blue-700',
  'material-agent': 'bg-purple-100 text-purple-700',
  'supplier-agent': 'bg-indigo-100 text-indigo-700',
  'risk-agent': 'bg-orange-100 text-orange-700',
  'recommendation-agent': 'bg-green-100 text-green-700',
  'api-gateway': 'bg-slate-100 text-slate-600',
  copilot: 'bg-pink-100 text-pink-700',
}

const totalMs = traces.reduce((s, t) => s + t.durationMs, 0)

export default function TracesPage() {
  const maxMs = Math.max(...traces.map((t) => t.durationMs))

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Operations · Traces</div>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">Distributed trace — RFQ-1001</h1>
        <p className="mt-1 text-sm text-slate-500">End-to-end execution timeline for the School Renovation procurement pipeline.</p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total spans', value: traces.length },
          { label: 'Total duration', value: `${(totalMs / 1000).toFixed(2)}s` },
          { label: 'Services', value: new Set(traces.map((t) => t.service)).size },
          { label: 'Warnings', value: traces.filter((t) => t.status === 'WARN').length },
        ].map((s) => (
          <div key={s.label} className="surface rounded-2xl p-5">
            <div className="text-xs font-medium text-slate-500">{s.label}</div>
            <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Waterfall */}
      <div className="surface overflow-hidden rounded-3xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-accent" />
            <span className="text-sm font-bold text-slate-900">Trace waterfall</span>
            <span className="ml-auto font-mono text-xs text-slate-400">trc_1001</span>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {traces.map((trace, i) => {
            const widthPct = (trace.durationMs / maxMs) * 100
            const StatusIcon = trace.status === 'OK' ? CheckCircle2 : trace.status === 'WARN' ? AlertTriangle : XCircle
            const statusColor = trace.status === 'OK' ? 'text-success' : trace.status === 'WARN' ? 'text-warning' : 'text-danger'
            const barColor = trace.status === 'OK' ? 'bg-accent' : trace.status === 'WARN' ? 'bg-warning' : 'bg-danger'
            const svcCls = serviceColors[trace.service] ?? 'bg-slate-100 text-slate-600'

            return (
              <div key={i} className="grid items-center gap-4 px-6 py-4 hover:bg-slate-50 md:grid-cols-[2fr_1fr_1fr_3fr_80px]">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{trace.span}</div>
                  <div className="mt-0.5 font-mono text-xs text-slate-400">{trace.operation}</div>
                </div>
                <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold ${svcCls}`}>
                  {trace.service}
                </span>
                <div className="flex items-center gap-1.5">
                  <StatusIcon size={14} className={`shrink-0 ${statusColor}`} />
                  <span className={`text-xs font-semibold ${statusColor}`}>{trace.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${widthPct}%` }} />
                  </div>
                  <span className="shrink-0 font-mono text-xs text-slate-500">{trace.durationMs}ms</span>
                </div>
                <div className="text-right font-mono text-xs text-slate-400">{trace.timestamp}</div>
              </div>
            )
          })}
        </div>

        {/* Total bar */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Total pipeline duration</span>
          <span className="font-mono text-xs font-bold text-slate-700">{totalMs}ms ({(totalMs / 1000).toFixed(2)}s)</span>
        </div>
      </div>

      {/* Span details */}
      <div className="surface rounded-3xl p-6">
        <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Span details</div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {traces.map((trace, i) => (
            <div key={i} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-800">{trace.span}</span>
                <span className={`text-xs font-bold ${trace.status === 'OK' ? 'text-success' : trace.status === 'WARN' ? 'text-warning' : 'text-danger'}`}>{trace.status}</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Service</span>
                  <span className="font-medium text-slate-700">{trace.service}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Duration</span>
                  <span className="font-mono font-medium text-slate-700">{trace.durationMs}ms</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Timestamp</span>
                  <span className="font-mono text-slate-700">{trace.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
