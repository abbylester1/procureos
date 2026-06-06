import { OperationsLineage } from '@/components/operations-lineage'
import { getLangfuseProjects } from '@/lib/langfuse'
import { agentActivity, qualityChecks, traces } from '@/lib/demo-data'

export default async function OperationsPage() {
  const langfuse = await getLangfuseProjects()

  return (
    <div className="space-y-12">
      <div>
        <div className="text-sm font-medium text-accent">Operations Center</div>
        <h2 className="mt-3 max-w-4xl text-[48px] font-semibold leading-[0.98] tracking-[-0.055em]">Traces, agents, dbt quality, lineage, and auditability.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        {agentActivity.map((agent) => (
          <div key={agent.name} className="surface-muted rounded-[20px] p-5">
            <div className="text-sm font-semibold">{agent.name}</div>
            <div className="mt-2 text-sm text-slate-300">{agent.status}</div>
            <div className="mt-3 text-sm text-slate-500">{agent.detail}</div>
            <div className="mt-3 text-xs text-slate-600">Latency {agent.duration} • Cost {agent.cost}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-8 xl:grid-cols-2">
        <div className="surface rounded-3xl p-5">
          <h3 className="text-xl font-semibold tracking-[-0.02em]">Trace Timeline</h3>
          <div className="mt-4 space-y-3">
            {traces.map((trace) => (
              <div key={trace.span} className="rounded-[20px] bg-white/[0.035] p-4">
                <div className="flex items-center justify-between"><span className="text-sm font-medium">{trace.span}</span><span className="text-xs text-slate-500">{trace.durationMs}ms</span></div>
                <div className="mt-2 text-sm text-slate-500">{trace.service} • {trace.operation} • {trace.status}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="surface rounded-3xl p-5">
          <h3 className="text-xl font-semibold tracking-[-0.02em]">Data Quality</h3>
          <div className="mt-4 space-y-3">
            {qualityChecks.map((check) => (
              <div key={check.test} className="flex items-center justify-between rounded-[20px] bg-white/[0.035] p-4">
                <div><div className="text-sm font-medium">{check.test}</div><div className="text-sm text-slate-500">{check.model}</div></div>
                <div className={check.status === 'pass' ? 'text-sm text-success' : 'text-sm text-warning'}>{check.status.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="surface-muted rounded-3xl p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.02em]">Langfuse Public API</h3>
            <p className="mt-2 text-sm text-slate-500">Uses Basic Auth equivalent to: curl -u public-key:secret-key https://cloud.langfuse.com/api/public/projects</p>
          </div>
          <span className="rounded-full bg-white/[0.045] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">{langfuse.mode}</span>
        </div>
        <div className="mt-4 rounded-[20px] bg-white/[0.035] p-4 text-sm text-slate-300">
          {langfuse.mode === 'live'
            ? `${langfuse.projects.length} Langfuse project(s) connected.`
            : langfuse.message}
        </div>
      </div>
      <OperationsLineage />
    </div>
  )
}
