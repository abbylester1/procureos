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
        <Link key={`${item.label}-${item.href}`} href={item.href} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.045] hover:text-white">
          <item.icon size={16} className="text-slate-500 transition group-hover:text-accent" />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 bg-[#081120] p-5 xl:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
            <Building2 size={19} />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">ProcureOS</div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Procurement AI</div>
          </div>
        </div>

        <NavSection items={primaryNav} />
        <div className="my-6 h-px bg-white/[0.06]" />
        <div className="mb-2 px-3 text-[10px] uppercase tracking-[0.24em] text-slate-600">Operations</div>
        <NavSection items={opsNav} />

        <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/[0.035] p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-slate-400">System Status</div>
            <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-success" />
          </div>
          <div className="mt-3 text-sm font-semibold">AI Agents Online</div>
          <div className="mt-1 text-xs text-slate-500">4 agents active</div>
        </div>
      </aside>

      <main className="relative xl:pl-72">
        <header className="sticky top-0 z-20 bg-[#081120]/92 px-6 py-5 backdrop-blur-xl xl:px-10">
          <div className="grid grid-cols-12 items-center gap-6">
            <div className="col-span-12 flex items-center gap-3 rounded-xl bg-white/[0.045] px-4 py-3 text-sm text-slate-500 md:col-span-5">
              <Search size={16} />
              <span>Search suppliers, RFQs, risks...</span>
            </div>
            <div className="col-span-12 flex items-center justify-start gap-3 md:col-span-7 md:justify-end">
              <button className="hidden rounded-xl bg-white/[0.045] px-4 py-3 text-sm font-medium text-slate-300 md:inline-flex">School Renovation</button>
              <button className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white">New RFQ</button>
              <button className="hidden rounded-xl bg-white/[0.045] px-4 py-3 text-sm font-medium text-slate-300 md:inline-flex"><Upload size={16} className="mr-2" />Upload Quotes</button>
              <button className="rounded-xl bg-white/[0.045] p-3 text-slate-400"><Bell size={16} /></button>
              <button className="rounded-xl bg-white/[0.045] p-3 text-slate-400"><UserCircle2 size={18} /></button>
            </div>
          </div>
        </header>
        <div className="relative mx-auto max-w-[1480px] px-6 pb-12 pt-4 xl:px-10">{children}</div>
      </main>
    </div>
  )
}
