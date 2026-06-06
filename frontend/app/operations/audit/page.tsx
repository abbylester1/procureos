import { auditLogs } from '@/lib/demo-data'
import { AlertTriangle, Bot, Info, ShieldAlert, User } from 'lucide-react'

const severityConfig = {
  info: { icon: Info, bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' },
  warn: { icon: AlertTriangle, bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400' },
  critical: { icon: ShieldAlert, bg: 'bg-red-50', badge: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}

export default function AuditPage() {
  const criticalCount = auditLogs.filter((l) => l.severity === 'critical').length
  const warnCount = auditLogs.filter((l) => l.severity === 'warn').length

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Operations · Audit</div>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">Audit log</h1>
        <p className="mt-1 text-sm text-slate-500">Full immutable trail of all actions taken by users and AI agents on RFQ-1001.</p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-medium text-slate-500">Total events</div>
          <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">{auditLogs.length}</div>
          <div className="mt-1 text-xs text-slate-400">Since RFQ created</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <AlertTriangle size={13} className="text-warning" /> Warnings
          </div>
          <div className="mt-3 text-4xl font-black tracking-tight text-warning">{warnCount}</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <ShieldAlert size={13} className="text-danger" /> Critical events
          </div>
          <div className="mt-3 text-4xl font-black tracking-tight text-danger">{criticalCount}</div>
        </div>
      </div>

      {/* Log */}
      <div className="surface overflow-hidden rounded-3xl">
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">Event log</div>
          <span className="text-xs text-slate-400">Today · School Renovation RFO</span>
        </div>
        <div className="divide-y divide-slate-50">
          {auditLogs.map((log) => {
            const cfg = severityConfig[log.severity]
            const Icon = cfg.icon
            const isSystem = log.actor === 'System' || log.actor.includes('Agent')
            return (
              <div key={log.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}>
                  <Icon size={14} className={log.severity === 'info' ? 'text-blue-500' : log.severity === 'warn' ? 'text-warning' : 'text-danger'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{log.action}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${cfg.badge}`}>{log.severity}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{log.detail}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      {isSystem ? <Bot size={11} /> : <User size={11} />}
                      {log.actor}
                    </span>
                    <span>·</span>
                    <span className="font-mono">{log.resource}</span>
                  </div>
                </div>
                <div className="shrink-0 font-mono text-xs text-slate-400">{log.timestamp}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
