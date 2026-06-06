import Link from 'next/link'
import { Activity, Bot, GitBranch, LayoutDashboard, ShieldAlert, Sparkles, Truck } from 'lucide-react'

const nav = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/suppliers', label: 'Suppliers', icon: Truck },
  { href: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { href: '/risks', label: 'Risks', icon: ShieldAlert },
  { href: '/copilot', label: 'Copilot', icon: Bot },
  { href: '/operations', label: 'Operations', icon: GitBranch },
]

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-border bg-panel/80 p-5 backdrop-blur xl:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-glow">
            <Activity size={22} />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">ProcureOS</div>
            <div className="text-xs uppercase tracking-[0.24em] text-muted">AI Command Center</div>
          </div>
        </div>
        <nav className="space-y-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-slate-300 transition hover:border-border hover:bg-panel2 hover:text-white">
              <item.icon size={18} className="text-muted group-hover:text-accent" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-accent/20 bg-accent/10 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-accent">Live demo</div>
          <p className="mt-2 text-sm text-slate-300">Deterministic fallback mode keeps the Vercel demo reliable without secrets.</p>
        </div>
      </aside>
      <main className="xl:pl-72">
        <header className="sticky top-0 z-20 border-b border-border bg-background/75 px-5 py-4 backdrop-blur xl:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-accent">Explainable Procurement Intelligence</div>
              <h1 className="mt-1 text-2xl font-semibold">AI Procurement Command Center</h1>
            </div>
            <div className="hidden rounded-full border border-border bg-panel px-4 py-2 text-sm text-slate-300 md:block">Vercel-ready • dbt artifacts • Observable AI</div>
          </div>
        </header>
        <div className="p-5 xl:p-8">{children}</div>
      </main>
    </div>
  )
}
