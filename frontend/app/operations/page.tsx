import { OperationsLineage } from '@/components/operations-lineage'
import { getLangfuseProjects } from '@/lib/langfuse'
import { agentActivity, qualityChecks, traces } from '@/lib/demo-data'

export default async function OperationsPage() {
  const langfuse = await getLangfuseProjects()

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-[0.28em] text-accent">Operations Center</div>
        <h2 className="mt-2 text-3xl font-semibold">Traces, agents, dbt quality, lineage, and auditability</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {agentActivity.map((agent) => (
          <div key={agent.name} className="rounded-3xl border border-border bg-panel p-5">
            <div className="text-sm font-semibold">{agent.name}</div>
            <div className="mt-2 text-accent">{agent.status}</div>
            <div className="mt-3 text-sm text-slate-400">{agent.detail}</div>
            <div className="mt-3 text-xs text-muted">Latency {agent.duration} • Cost {agent.cost}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-border bg-panel p-5">
          <h3 className="font-semibold">Trace Timeline</h3>
          <div className="mt-4 space-y-3">
            {traces.map((trace) => (
              <div key={trace.span} className="rounded-2xl border border-border bg-panel2 p-4">
                <div className="flex items-center justify-between"><span className="font-medium">{trace.span}</span><span className="text-xs text-accent">{trace.durationMs}ms</span></div>
                <div className="mt-2 text-sm text-slate-400">{trace.service} • {trace.operation} • {trace.status}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-panel p-5">
          <h3 className="font-semibold">Data Quality</h3>
          <div className="mt-4 space-y-3">
            {qualityChecks.map((check) => (
              <div key={check.test} className="flex items-center justify-between rounded-2xl border border-border bg-panel2 p-4">
                <div><div className="font-medium">{check.test}</div><div className="text-sm text-muted">{check.model}</div></div>
                <div className={check.status === 'pass' ? 'text-accent' : 'text-warning'}>{check.status.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-panel p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Langfuse Public API</h3>
            <p className="mt-1 text-sm text-slate-400">Uses Basic Auth equivalent to: curl -u public-key:secret-key https://cloud.langfuse.com/api/public/projects</p>
          </div>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent">{langfuse.mode}</span>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-panel2 p-4 text-sm text-slate-300">
          {langfuse.mode === 'live'
            ? `${langfuse.projects.length} Langfuse project(s) connected.`
            : langfuse.message}
        </div>
      </div>
      <OperationsLineage />
    </div>
  )
}
