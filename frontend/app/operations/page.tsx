import { OperationsLineage } from '@/components/operations-lineage'
import { getLangfuseProjects } from '@/lib/langfuse'
import { agentActivity, qualityChecks, traces } from '@/lib/demo-data'

export default async function OperationsPage() {
  const langfuse = await getLangfuseProjects()

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Operations Center</div>
        <h2 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-900">Traces, agents, dbt quality, lineage, and auditability.</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {agentActivity.map((agent) => (
          <div key={agent.name} className="surface rounded-2xl p-5">
            <div className="text-sm font-semibold text-slate-900">{agent.name}</div>
            <div className="mt-2 text-sm font-medium text-success">{agent.status}</div>
            <div className="mt-2 text-sm text-slate-500">{agent.detail}</div>
            <div className="mt-3 text-xs text-slate-400">Latency {agent.duration} · Cost {agent.cost}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="surface rounded-3xl p-5">
          <h3 className="text-lg font-bold tracking-tight text-slate-900">Trace Timeline</h3>
          <div className="mt-4 space-y-2">
            {traces.map((trace) => (
              <div key={trace.span} className="surface-soft rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800">{trace.span}</span>
                  <span className="text-xs text-slate-500">{trace.durationMs}ms</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">{trace.service} · {trace.operation} · <span className={trace.status === 'OK' ? 'text-success' : trace.status === 'WARN' ? 'text-warning' : 'text-danger'}>{trace.status}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="surface rounded-3xl p-5">
          <h3 className="text-lg font-bold tracking-tight text-slate-900">Data Quality</h3>
          <div className="mt-4 space-y-2">
            {qualityChecks.map((check) => (
              <div key={check.test} className="flex items-center justify-between surface-soft rounded-2xl p-4">
                <div>
                  <div className="text-sm font-semibold text-slate-800">{check.test}</div>
                  <div className="text-xs text-slate-500">{check.model}</div>
                </div>
                <div className={check.status === 'pass' ? 'text-sm font-semibold text-success' : 'text-sm font-semibold text-warning'}>{check.status.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="surface-muted rounded-3xl p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900">Langfuse Public API</h3>
            <p className="mt-1.5 text-sm text-slate-500">Uses Basic Auth equivalent to: curl -u public-key:secret-key https://cloud.langfuse.com/api/public/projects</p>
          </div>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{langfuse.mode}</span>
        </div>
        <div className="mt-4 rounded-2xl bg-white border border-slate-100 p-4 text-sm text-slate-600">
          {langfuse.mode === 'live'
            ? `${langfuse.projects.length} Langfuse project(s) connected.`
            : langfuse.message}
        </div>
      </div>

      <OperationsLineage />
    </div>
  )
}
