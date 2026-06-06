import { Bell, Building2, Key, Shield, Sliders, Users } from 'lucide-react'

const sections = [
  {
    icon: Building2,
    title: 'Organization',
    description: 'Manage your organization name, logo, and billing details.',
    fields: [
      { label: 'Organization name', value: 'Meridian School District', type: 'text' },
      { label: 'Industry', value: 'Public Education', type: 'text' },
      { label: 'Timezone', value: 'America/New_York (UTC-5)', type: 'text' },
    ],
  },
  {
    icon: Sliders,
    title: 'Procurement rules',
    description: 'Configure AI scoring weights and approval thresholds.',
    fields: [
      { label: 'Min. coverage threshold', value: '85%', type: 'text' },
      { label: 'Max. delivery days', value: '45', type: 'text' },
      { label: 'Confidence required to auto-recommend', value: '90%', type: 'text' },
      { label: 'Approval required above', value: '$500,000', type: 'text' },
    ],
  },
  {
    icon: Users,
    title: 'Team members',
    description: 'Users with access to this workspace.',
    members: [
      { name: 'Olivia Carter', email: 'olivia@meridian.edu', role: 'Procurement Manager', initials: 'OC' },
      { name: 'James Reeves', email: 'james@meridian.edu', role: 'Finance Lead', initials: 'JR' },
      { name: 'Priya Sharma', email: 'priya@meridian.edu', role: 'Analyst', initials: 'PS' },
    ],
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Choose when ProcureOS sends you alerts.',
    toggles: [
      { label: 'New recommendation generated', enabled: true },
      { label: 'Critical risk detected', enabled: true },
      { label: 'Agent run completed', enabled: false },
      { label: 'Approval reminder (48h)', enabled: true },
      { label: 'Weekly procurement digest', enabled: false },
    ],
  },
  {
    icon: Key,
    title: 'API & integrations',
    description: 'Keys and connected external services.',
    integrations: [
      { name: 'Claude (Anthropic)', status: 'connected', key: 'sk-ant-...a4b2' },
      { name: 'Langfuse Observability', status: 'disconnected', key: '—' },
      { name: 'SAP Ariba', status: 'disconnected', key: '—' },
    ],
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Authentication and data retention settings.',
    fields: [
      { label: 'Authentication', value: 'SSO via Google Workspace', type: 'text' },
      { label: 'Session timeout', value: '8 hours', type: 'text' },
      { label: 'Audit log retention', value: '2 years', type: 'text' },
      { label: 'Data residency', value: 'United States (us-east-1)', type: 'text' },
    ],
  },
]

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Settings</div>
        <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-900">Workspace settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your organization, team, integrations, and AI configuration.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <div key={section.title} className="surface overflow-hidden rounded-3xl">
              <div className="flex items-center gap-4 border-b border-slate-100 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">{section.title}</div>
                  <div className="text-sm text-slate-500">{section.description}</div>
                </div>
                <button className="ml-auto rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                  Edit
                </button>
              </div>

              <div className="p-6">
                {section.fields && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {section.fields.map((field) => (
                      <div key={field.label} className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs font-medium text-slate-400">{field.label}</div>
                        <div className="mt-1.5 text-sm font-semibold text-slate-800">{field.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {section.members && (
                  <div className="space-y-3">
                    {section.members.map((m) => (
                      <div key={m.email} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">{m.initials}</div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-800">{m.name}</div>
                          <div className="text-xs text-slate-400">{m.email}</div>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{m.role}</span>
                      </div>
                    ))}
                    <button className="mt-2 text-xs font-semibold text-accent hover:underline">+ Invite team member</button>
                  </div>
                )}

                {section.toggles && (
                  <div className="space-y-3">
                    {section.toggles.map((t) => (
                      <div key={t.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="text-sm text-slate-700">{t.label}</span>
                        <div className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${t.enabled ? 'bg-accent' : 'bg-slate-200'}`}>
                          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${t.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.integrations && (
                  <div className="space-y-3">
                    {section.integrations.map((int) => (
                      <div key={int.name} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                        <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${int.status === 'connected' ? 'bg-success' : 'bg-slate-300'}`} />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-800">{int.name}</div>
                          <div className="font-mono text-xs text-slate-400">{int.key}</div>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${int.status === 'connected' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                          {int.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
