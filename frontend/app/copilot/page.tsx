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
    <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="surface-muted rounded-3xl p-6">
        <div className="text-sm font-medium text-accent">Procurement Copilot</div>
        <h2 className="mt-3 text-[48px] font-semibold leading-[0.98] tracking-[-0.055em]">Ask your AI procurement analyst.</h2>
        <div className="mt-8 space-y-3">
          {prompts.map((prompt) => (
            <button key={prompt} onClick={() => ask(prompt)} className="block w-full rounded-xl bg-white/[0.035] p-4 text-left text-sm text-slate-400 transition hover:bg-white/[0.055] hover:text-white">
              {prompt}
            </button>
          ))}
        </div>
      </div>
      <div className="surface rounded-3xl p-6">
        <div className="rounded-[20px] bg-white/[0.035] p-4">
          <label className="text-sm text-slate-500">Question</label>
          <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="mt-3 min-h-28 w-full rounded-xl bg-[#081120] p-4 text-sm text-slate-100 outline-none focus:ring-1 focus:ring-accent/45" />
          <button onClick={() => ask()} disabled={loading} className="mt-4 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{loading ? 'Analyzing...' : 'Ask Copilot'}</button>
        </div>
        <div className="mt-5 rounded-[20px] bg-accent/10 p-5">
          <div className="text-sm font-medium text-accent">Answer</div>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-200">{answer}</p>
        </div>
      </div>
    </div>
  )
}
