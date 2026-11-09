import { Card } from '../components/ui'
import { DataQualityChart, EngineerValueChart, EngineerWorkloadChart, TeamSplitChart } from '../components/charts'
import { fmtMn } from '../data/opportunities'
import { useDataScope } from '../data/DataScopeContext'

export default function Insights() {
  const { stats: s, scope } = useDataScope()

  return (
    <div className="mx-auto max-w-[1120px] space-y-5">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryTile
          label="Summary"
          body={
            scope === 'weekly'
              ? `This week: projected pipeline ${fmtMn(s.projectedPipeline)} Mn across ${s.total} opportunities. Bids dispatched ${fmtMn(s.submittedValue)} Mn. ${s.submitted.length} submitted.`
              : `Overall record: ${s.total} opportunities · projected ${fmtMn(s.projectedPipeline)} Mn · bids ${fmtMn(s.submittedValue)} Mn · ${s.pending.length} still pending.`
          }
        />
        <SummaryTile
          label="Risks"
          body={
            scope === 'weekly'
              ? `No projected sizing this week. EDL holds a 1,400 Mn bid (budget 2,000 Mn) due 9 Nov. Meteorology tender due 18 Nov. ${s.pending.length} deals still open.`
              : `${s.stale.length} stale deals need reconfirmation. Concentration risk on large CICS opportunities (EDL / NSBM).`
          }
        />
        <SummaryTile
          label="Required data"
          body={`Win ratio needs Won/Lost on ${s.submitted.length} submitted bid(s). ${s.unsized.length} of ${s.total} deals still lack a value.`}
        />
      </section>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <TeamSplitChart />
        <EngineerWorkloadChart />
        <EngineerValueChart />
        <DataQualityChart />
      </section>

      <Card className="p-4">
        <h3 className="text-[13px] font-semibold text-slate-900">Recommended actions</h3>
        <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-[13px] text-slate-600">
          <li>Track EDL rooftop solar bid (1,400 Mn against 2,000 Mn budget) through 9 Nov submission.</li>
          <li>Progress Department of Meteorology NAC / monitoring tender (budget 250 Mn) toward 18 Nov.</li>
          <li>Record Won / Lost and opening price for Ceylon Steel Cisco switch submission.</li>
          <li>Capture projected sizing where still NI so pipeline totals are not blank.</li>
        </ol>
      </Card>
    </div>
  )
}

function SummaryTile({ label, body }: { label: string; body: string }) {
  return (
    <Card className="p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{body}</p>
    </Card>
  )
}
