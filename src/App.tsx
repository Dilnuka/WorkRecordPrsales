import { useEffect, useState } from 'react'
import { BarChart3, KanbanSquare, LayoutDashboard, Lock, Menu, Users, X } from 'lucide-react'
import Overview from './views/Overview'
import Pipeline from './views/Pipeline'
import Team from './views/Team'
import Insights from './views/Insights'
import { DataScopeProvider, ScopeToggle, useDataScope } from './data/DataScopeContext'

type View = 'overview' | 'pipeline' | 'team' | 'insights'

const NAV: { id: View; label: string; icon: React.ReactNode; title: string }[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} strokeWidth={1.75} />, title: 'Overview' },
  { id: 'pipeline', label: 'Pipeline', icon: <KanbanSquare size={16} strokeWidth={1.75} />, title: 'Pipeline' },
  { id: 'team', label: 'Team', icon: <Users size={16} strokeWidth={1.75} />, title: 'Team' },
  { id: 'insights', label: 'Analytics', icon: <BarChart3 size={16} strokeWidth={1.75} />, title: 'Analytics' },
]

function AppShell() {
  const [view, setView] = useState<View>('overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const { coverage, scope, stats } = useDataScope()
  const active = NAV.find((n) => n.id === view)!

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
      if (e.altKey && e.key >= '1' && e.key <= '4') {
        e.preventDefault()
        setView(NAV[Number(e.key) - 1].id)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex min-h-dvh bg-slate-50">
      <a href="#main" className="skip-link">Skip to content</a>

      <aside
        aria-label="Primary"
        className={`fixed inset-y-0 left-0 z-40 flex w-[200px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          menuOpen ? 'translate-x-0 shadow-md' : '-translate-x-full'
        }`}
      >
        <div className="flex h-12 items-center gap-2 border-b border-slate-200 px-3">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-[10px] font-bold text-white">
            V
          </div>
          <p className="truncate text-[13px] font-semibold text-slate-900">VSIS Presales</p>
          <button type="button" aria-label="Close menu" className="ml-auto rounded p-1 text-slate-400 hover:bg-slate-100 lg:hidden" onClick={() => setMenuOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 p-2" aria-label="Sections">
          {NAV.map((n, i) => {
            const selected = view === n.id
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => { setView(n.id); setMenuOpen(false) }}
                aria-current={selected ? 'page' : undefined}
                title={`Alt+${i + 1}`}
                className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[13px] font-medium ${
                  selected ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={selected ? 'text-slate-700' : 'text-slate-400'}>{n.icon}</span>
                {n.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-slate-200 px-3 py-3">
          <p className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <Lock size={10} aria-hidden /> Confidential
          </p>
          <p className="mt-0.5 text-[11px] text-slate-400">{coverage}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">{stats.total} records · {scope}</p>
        </div>
      </aside>

      {menuOpen && (
        <button type="button" aria-label="Close menu overlay" className="fixed inset-0 z-30 bg-slate-900/25 lg:hidden" onClick={() => setMenuOpen(false)} />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-12 items-center gap-3 border-b border-slate-200 bg-white px-3 sm:px-5">
          <button type="button" aria-label="Open menu" className="rounded p-1 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setMenuOpen(true)}>
            <Menu size={18} />
          </button>
          <h1 className="text-[14px] font-semibold text-slate-900">{active.title}</h1>
          <div className="ml-auto">
            <ScopeToggle />
          </div>
        </header>

        <main id="main" className="flex-1 px-3 py-4 sm:px-5" key={`${view}-${scope}`} tabIndex={-1}>
          {view === 'overview' && <Overview onOpenPipeline={() => setView('pipeline')} />}
          {view === 'pipeline' && <Pipeline />}
          {view === 'team' && <Team />}
          {view === 'insights' && <Insights />}
        </main>

        <footer className="border-t border-slate-200 px-3 py-2 text-[11px] text-slate-400 sm:px-5">
          Values in Mn LKR · NI = no information · Default view: Overall records
        </footer>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <DataScopeProvider>
      <AppShell />
    </DataScopeProvider>
  )
}
