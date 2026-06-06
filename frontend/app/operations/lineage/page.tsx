import { OperationsLineage } from '@/components/operations-lineage'
import { lineageEdges, lineageNodes } from '@/lib/demo-data'

const layerColors: Record<string, string> = {
  source: 'bg-blue-100 text-blue-700',
  staging: 'bg-purple-100 text-purple-700',
  agent: 'bg-orange-100 text-orange-700',
  mart: 'bg-green-100 text-green-700',
}

export default function LineagePage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Operations · Lineage</div>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">Data lineage graph</h1>
        <p className="mt-1 text-sm text-slate-500">Full provenance of every record — from raw RFQ input to final recommendation.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total nodes', value: lineageNodes.length },
          { label: 'Total records', value: lineageNodes.reduce((s, n) => s + n.count, 0).toLocaleString() },
          { label: 'Edges', value: lineageEdges.length },
          { label: 'Layers', value: new Set(lineageNodes.map((n) => n.layer)).size },
        ].map((s) => (
          <div key={s.label} className="surface rounded-2xl p-5">
            <div className="text-xs font-medium text-slate-500">{s.label}</div>
            <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Interactive graph */}
      <OperationsLineage />

      {/* Node table */}
      <div className="surface overflow-hidden rounded-3xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="text-sm font-bold text-slate-900">Node inventory</div>
          <div className="mt-0.5 text-xs text-slate-400">All datasets in the procurement pipeline</div>
        </div>
        <div className="divide-y divide-slate-50">
          {lineageNodes.map((node) => {
            const layerCls = layerColors[node.layer] ?? 'bg-slate-100 text-slate-600'
            const upstream = lineageEdges.filter((e) => e.target === node.id).map((e) => e.source)
            const downstream = lineageEdges.filter((e) => e.source === node.id).map((e) => e.target)
            return (
              <div key={node.id} className="flex flex-wrap items-center gap-4 px-6 py-4 hover:bg-slate-50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">{node.label}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${layerCls}`}>{node.layer}</span>
                  </div>
                  <div className="mt-1 flex gap-4 text-xs text-slate-400">
                    {upstream.length > 0 && <span>← from: {upstream.join(', ')}</span>}
                    {downstream.length > 0 && <span>→ to: {downstream.join(', ')}</span>}
                    {upstream.length === 0 && downstream.length === 0 && <span>No connections</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black tracking-tight text-slate-900">{node.count.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">records</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
