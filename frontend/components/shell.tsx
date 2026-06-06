import Link from 'next/link'
import { Bell, Bot, Building2, ClipboardList, FileClock, GitBranch, Home, LineChart, LockKeyhole, Search, Settings, ShieldAlert, Sparkles, Truck, Upload, UserCircle2, Zap } from 'lucide-react'

const primaryNav = [
  { href: '/', label: 'Overview', icon: Home },
  { href: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { href: '/suppliers', label: 'Suppliers', icon: Truck },
  { href: '/', label: 'RFQs', icon: ClipboardList },
  { href: '/risks', label: 'Risks', icon: ShieldAlert },
  { href: '/copilot', label: 'Procurement Copilot', icon: Bot },
]

const opsNav = [
  { href: '/operations', label: 'Operations', icon: LineChart },
  { href: '/operations', label: 'Agents', icon: Zap },
  { href: '/operations', label: 'Traces', icon: FileClock },
  { href: '/operations', label: 'Lineage', icon: GitBranch },
  { href: '/operations', label: 'Audit Logs', icon: LockKeyhole },
  { href: '/operations', label: 'Settings', icon: Settings },
]

function NavSection({ items }: { items: typeof primaryNav }) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <Link key={`${item.label}-${item.href}`} href={item.href} className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white">
          <item.icon size={17} className="text-slate-500 transition group-hover:text-accent" />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      <div className="app-noise pointer-events-none fixed inset-0 opacity-40" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/[0.06] bg-[#081120]/90 p-4 backdrop-blur-2xl xl:block">
        <div className="mb-7 flex items-center gap-3 px-2 pt-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-blue text-white shadow-glow">
            <Building2 size={20} />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">ProcureOS</div>
            <div className="text-[10px] uppercase tracking-[0.26em] text-slate-500">Procurement AI</div>
          </div>
        </div>

        <NavSection items={primaryNav} />
        <div className="my-5 h-px bg-white/[0.07]" />
        <div className="mb-2 px-3 text-[10px] uppercase tracking-[0.24em] text-slate-600">Observability</div>
        <NavSection items={opsNav} />

        <div className="absolute bottom-4 left-4 right-4 rounded-3xl bg-white/[0.045] p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-slate-300">System Status</div>
            <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-success" />
          </div>
          <div className="mt-3 text-sm font-semibold">AI Agents Online</div>
          <div className="mt-1 text-xs text-slate-500">4 agents active • Langfuse ready</div>
        </div>
      </aside>

      <main className="relative xl:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#081120]/75 px-5 py-4 backdrop-blur-2xl xl:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-[280px] flex-1 items-center gap-3 rounded-2xl bg-white/[0.055] px-4 py-3 text-sm text-slate-400 ring-1 ring-white/[0.06]">
              <Search size={17} />
              <span>Search suppliers, RFQs, risks, decisions...</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden rounded-2xl bg-white/[0.055] px-4 py-3 text-sm font-medium text-slate-300 ring-1 ring-white/[0.06] transition hover:bg-white/[0.08] md:inline-flex">School Renovation</button>
              <button className="rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-90">New RFQ</button>
              <button className="hidden rounded-2xl bg-white/[0.055] px-4 py-3 text-sm font-medium text-slate-300 ring-1 ring-white/[0.06] transition hover:bg-white/[0.08] md:inline-flex"><Upload size={16} className="mr-2" />Upload Quotes</button>
              <button className="rounded-2xl bg-white/[0.055] p-3 text-slate-300 ring-1 ring-white/[0.06]"><Bell size={17} /></button>
              <button className="rounded-2xl bg-white/[0.055] p-3 text-slate-300 ring-1 ring-white/[0.06]"><UserCircle2 size={19} /></button>
            </div>
          </div>
        </header>
        <div className="relative mx-auto max-w-[1500px] p-5 xl:p-8">{children}</div>
      </main>
    </div>
  )
}
