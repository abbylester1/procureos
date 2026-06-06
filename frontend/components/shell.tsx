import Link from 'next/link'
import { Activity, Bot, ChevronRight, GitBranch, LayoutDashboard, Radio, ShieldAlert, Sparkles, Truck } from 'lucide-react'

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
    <div className="min-h-screen text-slate-100">
      <div className="pointer-events-none fixed inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-[#070B18]/90 p-5 shadow-2xl backdrop-blur-2xl xl:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="glow-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 to-blue/10 text-accent">
            <Activity size={23} />
          </div>
          <div>
            <div className="text-xl font-semibold tracking-tight">ProcureOS</div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-accent/80">Command Center</div>
          </div>
        </div>
        <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent"><Radio size={14} /> Live RFQ</div>
          <div className="mt-3 text-sm font-medium">School Renovation</div>
          <div className="mt-1 text-xs text-muted">BuildTech recommended • 94% confidence</div>
        </div>
        <nav className="space-y-1.5">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm text-slate-300 transition hover:border-accent/20 hover:bg-accent/10 hover:text-white">
              <span className="flex items-center gap-3"><item.icon size={18} className="text-muted transition group-hover:text-accent" />{item.label}</span>
              <ChevronRight size={15} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-70" />
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/12 to-blue/10 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-accent">Demo Ready</div>
          <p className="mt-2 text-sm leading-6 text-slate-300">2,500 quote rows, dbt artifacts, traces, and deterministic AI fallback are bundled for Vercel.</p>
        </div>
      </aside>
      <main className="relative xl:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050713]/75 px-5 py-4 backdrop-blur-2xl xl:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-accent">Explainable Procurement Intelligence</div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">AI Procurement Command Center</h1>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 md:flex">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(101,228,198,0.8)]" /> Vercel-ready • Observable AI
            </div>
          </div>
        </header>
        <div className="relative p-5 xl:p-8">{children}</div>
      </main>
    </div>
  )
}
