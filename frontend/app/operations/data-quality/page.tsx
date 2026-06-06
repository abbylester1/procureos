import { qualityChecks } from '@/lib/demo-data'
import { CheckCircle2, AlertTriangle, Database } from 'lucide-react'

const modelColors: Record<string, string> = {
  stg_rfqs: 'bg-blue-100 text-blue-700',
  stg_suppliers: 'bg-purple-100 text-purple-700',
  stg_quotes: 'bg-indigo-100 text-indigo-700',
  fct_vendor_scores: 'bg-green-100 text-green-700',
}

const passing = qualityChecks.filter((c) => c.status === 'pass').length
const warnings = qualityChecks.filter((c) => c.status === 'warn').length
const totalRows = qualityChecks.reduce((s, c) => s + c.rowsTested, 0)

export default function DataQualityPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Operations · Data Quality</div>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">dbt quality checks</h1>
        <p className="mt-1 text-sm text-slate-500">Automated data quality tests across all staging and mart models for RFQ-1001.</p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="surface rounded-2xl p-5 ring-1 ring-success/20">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CheckCircle2 size={13} className="text-success" /> Passing
          </div>
          <div className="mt-3 text-4xl font-black tracking-tight text-success">{passing}</div>
          <div className="mt-1 text-xs text-slate-400">of {qualityChecks.length} tests</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <AlertTriangle size={13} className="text-warning" /> Warnings
          </div>
          <div className="mt-3 text-4xl font-black tracking-tight text-warning">{warnings}</div>
          <div className="mt-1 text-xs text-slate-400">Need attention</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Database size={13} className="text-accent" /> Rows tested
          </div>
          <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">{totalRows.toLocaleString()}</div>
          <div className="mt-1 text-xs text-slate-400">Across all models</div>
        </div>
        <div className="surface rounded-2xl p-5">
          <div className="text-xs font-medium text-slate-500">Pass rate</div>
          <div className="mt-3 text-4xl font-black tracking-tight text-slate-900">{Math.round((passing / qualityChecks.length) * 100)}%</div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-success" style={{ width: `${(passing / qualityChecks.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Tests table */}
      <div className="surface overflow-hidden rounded-3xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="text-sm font-bold text-slate-900">Test results</div>
          <div className="mt-0.5 text-xs text-slate-400">Last run: today at 10:25 AM</div>
        </div>
        <div className="divide-y divide-slate-50">
          {qualityChecks.map((check) => (
            <div key={check.test} className="flex flex-wrap items-center gap-4 px-6 py-4 hover:bg-slate-50">
              <div className="flex items-center gap-3">
                {check.status === 'pass'
                  ? <CheckCircle2 size={16} className="shrink-0 text-success" />
                  : <AlertTriangle size={16} className="shrink-0 text-warning" />}
                <div>
                  <div className="font-mono text-sm font-semibold text-slate-900">{check.test}</div>
                  {check.failures > 0 && (
                    <div className="mt-0.5 text-xs text-warning">{check.failures} row(s) failed</div>
                  )}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${modelColors[check.model] ?? 'bg-slate-100 text-slate-600'}`}>
                  {check.model}
                </span>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-700">{check.rowsTested.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">rows</div>
                </div>
                <span className={`w-16 rounded-full px-3 py-1 text-center text-xs font-bold ${check.status === 'pass' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {check.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model breakdown */}
      <div className="surface rounded-3xl p-6">
        <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Tests by model</div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from(new Set(qualityChecks.map((c) => c.model))).map((model) => {
            const modelTests = qualityChecks.filter((c) => c.model === model)
            const modelPass = modelTests.filter((c) => c.status === 'pass').length
            const cls = modelColors[model] ?? 'bg-slate-100 text-slate-600'
            return (
              <div key={model} className="rounded-2xl bg-slate-50 p-4">
                <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>{model}</span>
                <div className="mt-3 text-2xl font-black text-slate-900">{modelPass}/{modelTests.length}</div>
                <div className="mt-1 text-xs text-slate-400">tests passing</div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className={`h-full rounded-full ${modelPass === modelTests.length ? 'bg-success' : 'bg-warning'}`} style={{ width: `${(modelPass / modelTests.length) * 100}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
