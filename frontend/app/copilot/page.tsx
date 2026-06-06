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
    const response = await fetch('/api/copilot', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message }) })
    const data = await response.json()
    setAnswer(data.answer)
    setQuestion(message)
    setLoading(false)
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-3xl border border-border bg-panel p-5">
        <div className="text-xs uppercase tracking-[0.28em] text-accent">Procurement Copilot</div>
        <h2 className="mt-2 text-3xl font-semibold">Ask your AI procurement analyst</h2>
        <div className="mt-6 space-y-3">
          {prompts.map((prompt) => (
            <button key={prompt} onClick={() => ask(prompt)} className="block w-full rounded-2xl border border-border bg-panel2 p-4 text-left text-sm text-slate-300 transition hover:border-accent/40 hover:text-white">
              {prompt}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-panel p-5">
        <div className="rounded-2xl border border-border bg-panel2 p-4">
          <label className="text-xs uppercase tracking-[0.18em] text-muted">Question</label>
          <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="mt-3 min-h-28 w-full rounded-2xl border border-border bg-background p-4 text-slate-100 outline-none focus:border-accent/50" />
          <button onClick={() => ask()} disabled={loading} className="mt-4 rounded-2xl bg-accent px-5 py-3 font-semibold text-slate-950 disabled:opacity-50">{loading ? 'Analyzing...' : 'Ask Copilot'}</button>
        </div>
        <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/10 p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-accent">Answer</div>
          <p className="mt-3 whitespace-pre-line leading-7 text-slate-200">{answer}</p>
        </div>
      </div>
    </div>
  )
}
