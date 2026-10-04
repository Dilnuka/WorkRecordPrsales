import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  type DataScope,
  type Opportunity,
  coverageFor,
  engineerStats,
  opportunitiesFor,
  summary,
} from './opportunities'

interface DataScopeValue {
  scope: DataScope
  setScope: (s: DataScope) => void
  opportunities: Opportunity[]
  coverage: string
  stats: ReturnType<typeof summary>
  engineers: ReturnType<typeof engineerStats>
}

const Ctx = createContext<DataScopeValue | null>(null)

export function DataScopeProvider({ children }: { children: ReactNode }) {
  const [scope, setScope] = useState<DataScope>('overall')

  const value = useMemo(() => {
    const opportunities = opportunitiesFor(scope)
    return {
      scope,
      setScope,
      opportunities,
      coverage: coverageFor(scope),
      stats: summary(opportunities),
      engineers: engineerStats(opportunities),
    }
  }, [scope])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDataScope() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useDataScope must be used within DataScopeProvider')
  return ctx
}

/** Scope toggle — Overall is default / primary */
export function ScopeToggle() {
  const { scope, setScope } = useDataScope()
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-slate-200 bg-white" role="group" aria-label="Record scope">
      <button
        type="button"
        onClick={() => setScope('overall')}
        aria-pressed={scope === 'overall'}
        className={`px-2.5 py-1.5 text-[12px] font-semibold transition-colors ${
          scope === 'overall' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        Overall
      </button>
      <button
        type="button"
        onClick={() => setScope('weekly')}
        aria-pressed={scope === 'weekly'}
        className={`px-2.5 py-1.5 text-[12px] font-semibold transition-colors ${
          scope === 'weekly' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
        }`}
      >
        This week
      </button>
    </div>
  )
}
