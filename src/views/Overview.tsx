import { ArrowRight } from 'lucide-react'
import { Avatar, Card, StaleBadge, StatusBadge } from '../components/ui'
import {
  DataQualityChart,
  EngineerWorkloadChart,
  PipelineTrendChart,
  StageFunnelChart,
  StatusMixChart,
  TeamSplitChart,
} from '../components/charts'
import { bestValue, fmtMn, isStale, type Opportunity } from '../data/opportunities'
import { useDataScope } from '../data/DataScopeContext'

export default function Overview({ onOpenPipeline }: { onOpenPipeline: () => void }) {
  const { opportunities, stats: s, scope } = useDataScope()
  const assigned = opportunities.filter((o) => o.status === 'Assigned').length
  const ongoing = opportunities.filter((o) => o.status === 'Ongoing').length

  return (
    <div className="mx-auto max-w-[1120px] space-y-5">
      <section aria-label="Key metrics" className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-4">
        <Metric label="Pending" value={String(s.pending.length)} hint={`${assigned} assigned · ${ongoing} ongoing`} />
        <Metric label="Submitted" value={String(s.submitted.length)} hint={`${fmtMn(s.submittedValue)} Mn bid value`} accent="text-emerald-700" />
        <Metric
          label="Projected pipeline"
          value={fmtMn(s.projectedPipeline)}
          hint={scope === 'weekly' ? 'Mn LKR · this week' : 'Mn LKR · overall'}
        />
        <Metric label="Win ratio" value="—" hint={`${s.outcomesTracked}/${s.submitted.length} outcomes`} accent="text-red-600" warn />
      </section>

      {s.stale.length > 0 && (
        <p className="text-[12.5px] text-slate-600">
          <span className="font-semibold text-amber-700">{s.stale.length} stale</span>
          {' '}deals need a status update before the next report.
        </p>
      )}

      <section aria-label="Analytics" className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <PipelineTrendChart />
        <TeamSplitChart />
        <StatusMixChart />
        <StageFunnelChart />
        <EngineerWorkloadChart />
        <DataQualityChart />
      </section>

      <section aria-label="Stage snapshot">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-slate-900">
            {scope === 'weekly' ? 'This week’s deals' : 'All deals'}
          </h2>
          <button
            type="button"
            onClick={onOpenPipeline}
            className="inline-flex items-center gap-1 text-[12.5px] font-medium text-blue-600 hover:text-blue-700"
          >
            Full board <ArrowRight size={13} aria-hidden />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MiniLane title="Assigned" color="bg-blue-600" items={opportunities.filter((o) => o.status === 'Assigned')} />
          <MiniLane title="Ongoing" color="bg-amber-500" items={opportunities.filter((o) => o.status === 'Ongoing')} />
          <MiniLane title="Submitted" color="bg-emerald-600" items={opportunities.filter((o) => o.status === 'Submitted')} />
          <MiniLane title="Declined" color="bg-red-600" items={opportunities.filter((o) => o.status === 'Declined')} />
        </div>
      </section>
    </div>
  )
}

function Metric({
  label, value, hint, accent, warn,
}: { label: string; value: string; hint: string; accent?: string; warn?: boolean }) {
  return (
    <div className={`bg-white px-4 py-3.5 ${warn ? 'bg-red-50/40' : ''}`}>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-[22px] font-semibold tracking-tight tabular-nums text-slate-900 ${accent ?? ''}`}>
        {value}
      </p>
      <p className="mt-0.5 text-[11.5px] text-slate-500">{hint}</p>
    </div>
  )
}

function MiniLane({ title, color, items }: { title: string; color: string; items: Opportunity[] }) {
  const top = items.slice(0, 3)
  return (
    <Card className="p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${color}`} aria-hidden />
        <span className="text-[12px] font-semibold text-slate-800">{title}</span>
        <span className="ml-auto text-[11px] tabular-nums text-slate-500">{items.length}</span>
      </div>
      <ul className="space-y-1">
        {top.map((o) => (
          <li key={o.id} className="flex items-center gap-1.5 rounded px-1.5 py-1 hover:bg-slate-50">
            <Avatar name={o.owner} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-slate-800">{o.customer}</p>
              <p className="truncate text-[11px] text-slate-500">
                {bestValue(o) != null ? `${fmtMn(bestValue(o))} Mn` : 'NI'}
                {isStale(o) ? ' · stale' : ''}
              </p>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="py-3 text-center text-[12px] text-slate-400">—</li>}
        {items.length > 3 && <li className="text-center text-[11px] text-slate-400">+{items.length - 3}</li>}
      </ul>
      {top.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1 border-t border-slate-100 pt-2">
          <StatusBadge status={items[0].status} />
          {items.some(isStale) && <StaleBadge />}
        </div>
      )}
    </Card>
  )
}
