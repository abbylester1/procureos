'use client'

import { useState } from 'react'

const prompts = [
  'Which supplier should I select?',
  'How much money can we save?',
  'Why was BuildTech recommended?',
  'Show suppliers with high risk.',
  'Which supplier has the best delivery timeline?',
]

export default function CopilotPage() {
  const [question, setQuestion] = useState(prompts[0])
  const [answer, setAnswer] = useState('Ask ProcureOS Copilot a procurement decision question.')
  const [loading, setLoading] = useState(false)

  async function ask(message = question) {
    setLoading(true)
    try {
      const response = await fetch('/api/copilot', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message }) })
      const data = await response.json()
      setAnswer(data.answer ?? 'No answer returned.')
      setQuestion(message)
    } catch {
      setAnswer('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Procurement Copilot</div>
        <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">Ask your AI procurement analyst.</h2>
      </div>
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="surface rounded-3xl p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Suggested questions</div>
          <div className="mt-4 space-y-2">
            {prompts.map((prompt) => (
              <button key={prompt} onClick={() => ask(prompt)} className="block w-full rounded-xl border border-slate-100 bg-slate-50 p-4 text-left text-sm text-slate-600 transition hover:border-accent/30 hover:bg-accent/5 hover:text-slate-900">
                {prompt}
              </button>
            ))}
          </div>
        </div>
        <div className="surface rounded-3xl p-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Question</label>
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="mt-3 min-h-28 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
            <button onClick={() => ask()} disabled={loading} className="mt-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50">
              {loading ? 'Analyzing...' : 'Ask Copilot'}
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-accent/20 bg-accent/5 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Answer</div>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
