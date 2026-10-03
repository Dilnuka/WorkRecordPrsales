import { Avatar, Card, Progress } from '../components/ui'
import { EngineerValueChart, EngineerWorkloadChart } from '../components/charts'
import { engineerStats, fmtMn } from '../data/opportunities'

export default function Team() {
  const stats = engineerStats().sort((a, b) => b.totalValue - a.totalValue)
  const maxValue = Math.max(...stats.map((s) => s.totalValue), 1)

  return (
    <div className="mx-auto max-w-[1120px] space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {stats.map((e) => (
          <Card key={e.name} className="p-4">
            <div className="flex items-center gap-2.5">
              <Avatar name={e.name} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-slate-900">{e.name}</p>
                <p className="text-[11.5px] text-slate-500">Presales engineer</p>
              </div>
            </div>

            <div className="mt-3 border-t border-slate-100 pt-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Prospect value</p>
              <p className="mt-1 text-[22px] font-semibold tabular-nums tracking-tight text-slate-900">
                {fmtMn(e.totalValue)} <span className="text-[12px] font-medium text-slate-400">Mn</span>
              </p>
              <div className="mt-2">
                <Progress value={e.totalValue} max={maxValue} color="bg-blue-600" />
              </div>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
              <div className="rounded border border-slate-100 px-2.5 py-2">
                <dt className="text-slate-500">Worked</dt>
                <dd className="mt-0.5 text-[15px] font-semibold tabular-nums text-slate-900">{e.worked}</dd>
              </div>
              <div className="rounded border border-slate-100 px-2.5 py-2">
                <dt className="text-slate-500">Pending</dt>
                <dd className="mt-0.5 text-[15px] font-semibold tabular-nums text-amber-700">{e.pending}</dd>
              </div>
              <div className="rounded border border-slate-100 px-2.5 py-2">
                <dt className="text-slate-500">Bids sent</dt>
                <dd className="mt-0.5 text-[15px] font-semibold tabular-nums text-emerald-700">{e.submitted}</dd>
              </div>
              <div className="rounded border border-red-100 bg-red-50/40 px-2.5 py-2">
                <dt className="text-slate-500">Closed / lowest</dt>
                <dd className="mt-0.5 text-[15px] font-semibold text-red-600">—</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <EngineerWorkloadChart />
        <EngineerValueChart />
      </div>
    </div>
  )
}
