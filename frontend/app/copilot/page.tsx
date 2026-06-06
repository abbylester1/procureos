'use client'

import { useState } from 'react'
import { Bot, CornerDownLeft, Sparkles, User } from 'lucide-react'

const prompts = [
  { label: 'Best supplier', text: 'Which supplier should I select?' },
  { label: 'Savings', text: 'How much money can we save?' },
  { label: 'Why BuildTech?', text: 'Why was BuildTech recommended?' },
  { label: 'High risk', text: 'Show suppliers with high risk.' },
  { label: 'Delivery', text: 'Which supplier has the best delivery timeline?' },
]

type Message = { role: 'user' | 'assistant'; text: string }

export default function CopilotPage() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! I\'m your ProcureOS Copilot. Ask me anything about the School Renovation RFO — supplier selection, savings, risks, or delivery timelines.' },
  ])
  const [loading, setLoading] = useState(false)

  async function ask(text: string) {
    if (!text.trim()) return
    const userMsg: Message = { role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setQuestion('')
    setLoading(true)
    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', text: data.answer ?? 'No answer returned.' }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      ask(question)
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_1fr]" style={{ height: 'calc(100vh - 160px)' }}>
      {/* Left: context + prompts */}
      <div className="flex flex-col gap-4">
        <div className="surface rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Procurement Copilot</div>
              <div className="text-xs text-slate-400">Powered by AI</div>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
            Analyzing: <span className="font-semibold text-slate-700">School Renovation RFO</span><br />
            5 suppliers · $5.8M procurement value · 94% AI confidence
          </div>
        </div>

        <div className="surface rounded-3xl p-5 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-3">Suggested questions</div>
          <div className="space-y-2">
            {prompts.map((p) => (
              <button
                key={p.label}
                onClick={() => ask(p.text)}
                disabled={loading}
                className="group flex w-full items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-left transition hover:border-accent/30 hover:bg-accent/5 disabled:opacity-40"
              >
                <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/10 text-[10px] font-bold text-accent">→</span>
                <span className="text-xs text-slate-600 group-hover:text-slate-900">{p.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: chat */}
      <div className="surface flex flex-col overflow-hidden rounded-3xl">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Bot size={15} />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                msg.role === 'user'
                  ? 'bg-accent text-white rounded-tr-sm'
                  : 'bg-slate-50 text-slate-700 rounded-tl-sm border border-slate-100'
              }`}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <User size={15} />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Bot size={15} />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/10 transition">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about suppliers, savings, risks, or delivery..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
            />
            <button
              onClick={() => ask(question)}
              disabled={loading || !question.trim()}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition hover:opacity-90 disabled:opacity-30"
            >
              <CornerDownLeft size={14} />
            </button>
          </div>
          <div className="mt-2 text-center text-xs text-slate-400">Press Enter to send · Shift+Enter for new line</div>
        </div>
      </div>
    </div>
  )
}
