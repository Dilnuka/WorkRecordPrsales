import { useMemo, useState } from 'react'
import { Columns3, Flag, Search, Table2 } from 'lucide-react'
import {
  Avatar, Card, EmptyState, FieldInput, FieldSelect, NiBadge, SegmentButton, StaleBadge, StatusBadge,
} from '../components/ui'
import type { Opportunity, Status, Team } from '../data/opportunities'
import { bestValue, fmtMn, isStale } from '../data/opportunities'
import { useDataScope } from '../data/DataScopeContext'

type ViewMode = 'table' | 'board'

const TEAM_ORDER: Record<Team, number> = { CICS: 0, DWS: 1, NI: 2 }
const STATUS_ORDER: Record<Status, number> = { Submitted: 0, Ongoing: 1, Assigned: 2, Declined: 3 }

export default function Pipeline() {
  const { opportunities } = useDataScope()
  const [mode, setMode] = useState<ViewMode>('board')
  const [team, setTeam] = useState('')
  const [status, setStatus] = useState('')
  const [owner, setOwner] = useState('')
  const [query, setQuery] = useState('')

  const owners = useMemo(() => [...new Set(opportunities.map((o) => o.owner))], [opportunities])

  const rows = useMemo(() => {
    const q = query.toLowerCase().trim()
    return opportunities.filter(
      (o) =>
        (!team || o.team === team) &&
        (!status || o.status === status) &&
        (!owner || o.owner === owner) &&
        (!q ||
          [o.customer, o.project, o.owner, o.sales, o.presalesEngineer, o.workDone, o.id]
            .join(' ')
            .toLowerCase()
            .includes(q)),
    ).sort(
      (a, b) =>
        TEAM_ORDER[a.team] - TEAM_ORDER[b.team] ||
        STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
        (a.submissionDate ?? '9999').localeCompare(b.submissionDate ?? '9999'),
    )
  }, [opportunities, team, status, owner, query])

  const pendingN = rows.filter((o) => o.status === 'Assigned' || o.status === 'Ongoing').length
  const doneN = rows.filter((o) => o.status === 'Submitted').length

  return (
    <div className="mx-auto max-w-[1280px] space-y-3">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[12px] font-medium text-amber-700">{pendingN} pending</span>
        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[12px] font-medium text-emerald-700">{doneN} submitted</span>
        <span className="text-[12px] text-slate-400">{rows.length} of {opportunities.length} shown</span>
      </div>

      <div className="no-print sticky top-12 z-10 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-1.5">
        <div className="relative min-w-[140px] flex-1">
          <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
          <FieldInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            aria-label="Search opportunities"
            className="pl-8"
          />
        </div>
        <FieldSelect value={team} onChange={(e) => setTeam(e.target.value)} aria-label="Filter by team">
          <option value="">Team</option>
          <option>CICS</option>
          <option>DWS</option>
          <option value="NI">NI</option>
        </FieldSelect>
        <FieldSelect value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="">Status</option>
          <option>Assigned</option>
          <option>Ongoing</option>
          <option>Submitted</option>
          <option>Declined</option>
        </FieldSelect>
        <FieldSelect value={owner} onChange={(e) => setOwner(e.target.value)} aria-label="Filter by engineer">
          <option value="">Engineer</option>
          {owners.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </FieldSelect>
        <div className="ml-auto flex overflow-hidden rounded-md border border-slate-200" role="group" aria-label="View mode">
          <SegmentButton active={mode === 'board'} onClick={() => setMode('board')} aria-pressed={mode === 'board'}>
            <Columns3 size={13} aria-hidden /> Board
          </SegmentButton>
          <SegmentButton active={mode === 'table'} onClick={() => setMode('table')} aria-pressed={mode === 'table'}>
            <Table2 size={13} aria-hidden /> Table
          </SegmentButton>
        </div>
      </div>

      {mode === 'table' ? <TableView rows={rows} /> : <BoardView rows={rows} />}
    </div>
  )
}

function TableView({ rows }: { rows: Opportunity[] }) {
  if (rows.length === 0) {
    return <Card><EmptyState title="No matches" hint="Clear filters to see all deals." /></Card>
  }
  let lastTeam: string | null = null
  return (
    <Card className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#e8e8e8] text-[11px] font-medium uppercase tracking-[0.04em] text-[#8a8f98]">
            <th className="px-3 py-2.5 font-medium">Opportunity</th>
            <th className="px-3 py-2.5 font-medium">Engineer</th>
            <th className="px-3 py-2.5 font-medium">Sales</th>
            <th className="px-3 py-2.5 text-right font-medium">Projected</th>
            <th className="px-3 py-2.5 text-right font-medium">Bid</th>
            <th className="px-3 py-2.5 font-medium">Due</th>
            <th className="px-3 py-2.5 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => {
            const showTeam = o.team !== lastTeam
            lastTeam = o.team
            return <FragmentRow key={o.id} o={o} showTeam={showTeam} />
          })}
        </tbody>
      </table>
    </Card>
  )
}

function FragmentRow({ o, showTeam }: { o: Opportunity; showTeam: boolean }) {
  return (
    <>
      {showTeam && (
        <tr className="border-b border-[#e8e8e8] bg-[#fafafa]">
          <td colSpan={7} className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#8a8f98]">
            {o.team === 'NI' ? 'Team NI' : o.team}
          </td>
        </tr>
      )}
      <tr className="border-b border-[#f0f0f0] align-top transition-colors hover:bg-[#fafafa]">
        <td className="max-w-[260px] px-3 py-2.5">
          <p className="text-[13px] font-medium text-[#0f1115]">{o.customer}</p>
          <p className="mt-0.5 text-[12px] leading-snug text-[#8a8f98]">{o.project}</p>
          {o.flag && (
            <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#c9372c]">
              <Flag size={10} aria-hidden /> {o.flag}
            </p>
          )}
        </td>
        <td className="px-3 py-2.5">
          <span className="inline-flex items-center gap-1.5 text-[12.5px] text-[#0f1115]">
            <Avatar name={o.owner} size="sm" /> {o.owner.split(' ')[0]}
          </span>
        </td>
        <td className="px-3 py-2.5 text-[12.5px] text-[#5c6370]">{o.sales ?? <NiBadge />}</td>
        <Money v={o.projected} />
        <Money v={o.bid} />
        <td className="px-3 py-2.5 text-[12px] tabular-nums text-[#5c6370]">{o.submissionDate ?? <NiBadge />}</td>
        <td className="px-3 py-2.5">
          <div className="flex flex-wrap gap-1">
            <StatusBadge status={o.status} />
            {isStale(o) && <StaleBadge />}
          </div>
        </td>
      </tr>
    </>
  )
}

function Money({ v }: { v: number | null }) {
  return (
    <td className="px-3 py-2.5 text-right text-[12.5px] font-medium tabular-nums text-[#0f1115]">
      {v != null ? fmtMn(v) : <NiBadge />}
    </td>
  )
}

const LANES: { status: Status; title: string; accent: string }[] = [
  { status: 'Assigned', title: 'Assigned', accent: 'bg-[#3b6ae8]' },
  { status: 'Ongoing', title: 'Ongoing', accent: 'bg-[#e6a100]' },
  { status: 'Submitted', title: 'Submitted', accent: 'bg-[#1f8a4c]' },
  { status: 'Declined', title: 'Declined', accent: 'bg-[#c9372c]' },
]

/** Attio / Linear project board columns */
function BoardView({ rows }: { rows: Opportunity[] }) {
  if (rows.length === 0) {
    return <Card><EmptyState title="No matches" hint="Clear filters to see all deals." /></Card>
  }

  return (
    <div className="stagger grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {LANES.map((lane) => {
        const items = rows.filter((o) => o.status === lane.status)
        return (
          <div key={lane.status} className="animate-fade-up rounded-[10px] bg-[#f3f3f3] p-2">
            <div className="mb-2 flex items-center gap-1.5 px-1 pt-0.5">
              <span className={`h-1.5 w-1.5 rounded-full ${lane.accent}`} aria-hidden />
              <span className="text-[12px] font-semibold text-[#0f1115]">{lane.title}</span>
              <span className="ml-auto text-[11px] font-semibold tabular-nums text-[#8a8f98]">{items.length}</span>
            </div>
            <div className="max-h-[calc(100dvh-220px)] space-y-1.5 overflow-y-auto">
              {items.map((o) => (
                <article
                  key={o.id}
                  className="rounded-md border border-[#e8e8e8] bg-white p-2.5 transition-colors hover:border-[#d0d0d0]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-[12.5px] font-semibold leading-snug text-[#0f1115]">{o.customer}</h4>
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-[#8a8f98]">{o.team}</span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-[#8a8f98]">{o.project}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1">
                      <Avatar name={o.owner} size="sm" />
                      <span className="text-[11px] text-[#8a8f98]">{o.owner.split(' ')[0]}</span>
                    </span>
                    <span className="text-[12px] font-semibold tabular-nums text-[#0f1115]">
                      {bestValue(o) != null ? `${fmtMn(bestValue(o))} Mn` : <span className="text-[#c9372c]">NI</span>}
                    </span>
                  </div>
                  {(isStale(o) || o.flag) && (
                    <div className="mt-1.5 flex flex-wrap gap-1 border-t border-[#f0f0f0] pt-1.5">
                      {isStale(o) && <StaleBadge />}
                      {o.flag && (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#c9372c]">
                          <Flag size={9} aria-hidden /> overdue
                        </span>
                      )}
                    </div>
                  )}
                </article>
              ))}
              {items.length === 0 && <p className="py-8 text-center text-[12px] text-[#8a8f98]">None</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
