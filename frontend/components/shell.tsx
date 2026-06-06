'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AlertTriangle, Bell, Bot, Building2, ChevronDown, ClipboardList, Database, FileClock, GitBranch, Headphones, Home, LineChart, LockKeyhole, Plus, Settings, ShieldAlert, Sparkles, Truck, Zap } from 'lucide-react'

const primaryNav = [
  { href: '/', label: 'Overview', icon: Home },
  { href: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { href: '/suppliers', label: 'Suppliers', icon: Truck },
  { href: '/risks', label: 'Risks', icon: ShieldAlert },
  { href: '/copilot', label: 'Procurement Copilot', icon: Bot, badge: 'AI' },
]

const opsNav = [
  { href: '/operations', label: 'Operations', icon: LineChart },
  { href: '/operations/agents', label: 'Agents', icon: Zap },
  { href: '/operations/traces', label: 'Traces', icon: FileClock },
  { href: '/operations/lineage', label: 'Lineage', icon: GitBranch },
  { href: '/operations/data-quality', label: 'Data Quality', icon: Database },
  { href: '/operations/audit', label: 'Audit Logs', icon: LockKeyhole },
  { href: '/settings', label: 'Settings', icon: Settings },
]

function ProgressRing({ percent }: { percent: number }) {
  const r = 22
  const circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#E2E8F0" strokeWidth="4" />
      <circle cx="28" cy="28" r={r} fill="none" stroke="#6D5DFC" strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 28 28)" />
      <text x="28" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">{percent}%</text>
    </svg>
  )
}

function NavLink({ href, label, icon: Icon, badge }: { href: string; label: string; icon: React.ElementType; badge?: string }) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active ? 'bg-accent text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
      <Icon size={15} className={active ? 'text-white' : 'text-slate-400'} />
      <span className="flex-1">{label}</span>
      {badge && <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? 'bg-white/25 text-white' : 'bg-accent/10 text-accent'}`}>{badge}</span>}
    </Link>
  )
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-slate-200 bg-white xl:flex xl:flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {/* Logo */}
          <div className="mb-7 flex items-center gap-3 px-1 pt-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-sm">
              <Building2 size={17} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">ProcureOS</div>
              <div className="text-[10px] text-slate-400">AI Procurement Command Center</div>
            </div>
          </div>

          {/* Primary nav */}
          <nav className="space-y-0.5">
            {primaryNav.map((item) => <NavLink key={item.label} {...item} />)}
          </nav>

          {/* Ops nav */}
          <div className="mt-5">
            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Operations Center</div>
            <nav className="space-y-0.5">
              {opsNav.map((item) => <NavLink key={item.label} {...item} />)}
            </nav>
          </div>
        </div>

        {/* Mission card */}
        <div className="p-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Mission</div>
            <div className="mt-1 text-sm font-semibold text-slate-800">School Renovation RFO</div>
            <div className="mt-4 flex items-center gap-3">
              <ProgressRing percent={75} />
              <div>
                <div className="text-xs font-semibold text-slate-700">Analysis Progress</div>
                <div className="mt-0.5 text-xs text-slate-400">Almost there!</div>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
              View mission <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="xl:pl-60">
        {/* Alert banner */}
        <div className="flex items-center gap-2 border-b border-orange-200 bg-orange-50 px-6 py-2.5 text-sm xl:px-8">
          <AlertTriangle size={15} className="shrink-0 text-orange-500" />
          <span className="font-semibold text-orange-800">An import is already in progress</span>
          <span className="text-orange-600">— Estimated time remaining: 1m 24s</span>
          <button className="ml-2 font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-900">View progress →</button>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-6 py-3.5 backdrop-blur-sm xl:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
                <span className="h-2 w-2 rounded-full bg-success" />
                School Renovation RFO
                <ChevronDown size={13} className="text-slate-400" />
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
                <Plus size={14} />
                New RFO
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 md:flex">
                <Headphones size={14} />
                Contact us
              </button>
              <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50">
                <Bell size={15} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">3</span>
              </button>
              <button className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-50">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-[11px] font-bold text-accent">OC</div>
                <div className="hidden text-left md:block">
                  <div className="text-xs font-semibold text-slate-800">Olivia Carter</div>
                  <div className="text-[10px] text-slate-400">Procurement Manager</div>
                </div>
                <ChevronDown size={12} className="text-slate-400" />
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1480px] px-6 pb-12 pt-6 xl:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
