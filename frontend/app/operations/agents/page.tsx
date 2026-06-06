import { agentRuns } from '@/lib/demo-data'
import { CheckCircle2, Clock, DollarSign, Sparkles, XCircle, Zap } from 'lucide-react'

const statusConfig = {
  complete: { label: 'Complete', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  running: { label: 'Running', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  failed: { label: 'Failed', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  queued: { label: 'Queued', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
}

const totals = {
  tokens: agentRuns.reduce((s, r) => s + r.tokensUsed, 0),
  cost: agentRuns.reduce((s, r) => s + parseFloat(r.cost.replace('$', '')), 0),
  runs: agentRuns.length,
  complete: agentRuns.filter((r) => r.status === 'complete').length,
}

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Operations · Agents</div>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">AI agent runs</h1>
        <p className="mt-1 text-sm text-slate-500">Full trace of every agent invoked for RFQ-1001 — School Renovation.</p>
      </div>

      {/* Summary strip */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><Zap size={13} className="text-accent" /> Total runs</div>
          <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">{totals.runs}</div>
          <div className="mt-1 text-xs text-slate-400">{totals.complete} completed successfully</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><Sparkles size={13} className="text-accent" /> Tokens used</div>
          <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">{totals.tokens.toLocaleString()}</div>
          <div className="mt-1 text-xs text-slate-400">Across all agents</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><DollarSign size={13} className="text-accent" /> Total cost</div>
          <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">${totals.cost.toFixed(4)}</div>
          <div className="mt-1 text-xs text-slate-400">claude-sonnet-4-6</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><Clock size={13} className="text-accent" /> Total latency</div>
          <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">5.7s</div>
          <div className="mt-1 text-xs text-slate-400">End-to-end pipeline</div>
        </div>
      </div>

      {/* Agent run cards */}
      <div className="space-y-4">
        {agentRuns.map((run) => {
          const cfg = statusConfig[run.status]
          const maxMs = Math.max(...run.steps.map((s) => s.durationMs))
          return (
            <div key={run.id} className="surface overflow-hidden rounded-3xl">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-slate-900">{run.name}</span>
                      <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-4 text-xs text-slate-400">
                      <span>Started {run.startedAt}</span>
                      <span>·</span>
                      <span>{run.duration}</span>
                      <span>·</span>
                      <span>{run.tokensUsed.toLocaleString()} tokens</span>
                      <span>·</span>
                      <span>{run.cost}</span>
                      <span>·</span>
                      <span className="font-mono">{run.model}</span>
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs text-slate-400">{run.id}</span>
              </div>

              <div className="grid gap-0 md:grid-cols-2">
                {/* Steps */}
                <div className="border-r border-slate-100 p-5">
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Execution steps</div>
                  <div className="space-y-2.5">
                    {run.steps.map((step) => (
                      <div key={step.label} className="flex items-center gap-3">
                        {step.status === 'ok'
                          ? <CheckCircle2 size={14} className="shrink-0 text-success" />
                          : step.status === 'warn'
                          ? <CheckCircle2 size={14} className="shrink-0 text-warning" />
                          : <XCircle size={14} className="shrink-0 text-danger" />}
                        <div className="flex-1 min-w-0">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <span className="truncate text-xs font-medium text-slate-700">{step.label}</span>
                            <span className="shrink-0 text-xs text-slate-400">{step.durationMs}ms</span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${step.status === 'ok' ? 'bg-success' : step.status === 'warn' ? 'bg-warning' : 'bg-danger'}`}
                              style={{ width: `${(step.durationMs / maxMs) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Output */}
                <div className="p-5">
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Agent output</div>
                  <p className="text-sm leading-6 text-slate-600">{run.output}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
