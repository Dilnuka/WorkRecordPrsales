import { Card } from '../components/ui'
import { DataQualityChart, EngineerValueChart, EngineerWorkloadChart, TeamSplitChart } from '../components/charts'
import { fmtMn } from '../data/opportunities'
import { useDataScope } from '../data/DataScopeContext'

export default function Insights() {
  const { stats: s, scope } = useDataScope()
  const nsbmShare = s.projectedPipeline
    ? Math.round((1500 / s.projectedPipeline) * 100)
    : 0

  return (
    <div className="mx-auto max-w-[1120px] space-y-5">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryTile
          label="Summary"
          body={
            scope === 'weekly'
              ? `This week: projected pipeline ${fmtMn(s.projectedPipeline)} Mn across ${s.total} opportunities. Bids dispatched ${fmtMn(s.submittedValue)} Mn. ${s.completed.length} completed.`
              : `Overall record: ${s.total} opportunities · projected ${fmtMn(s.projectedPipeline)} Mn · bids ${fmtMn(s.submittedValue)} Mn · ${s.pending.length} still pending.`
          }
        />
        <SummaryTile
          label="Risks"
          body={
            scope === 'weekly'
              ? `NSBM is ~${nsbmShare}% of this week’s projected pipeline. EDL-DIMO holds a 2,500 Mn bid due 19 Nov. ${s.pending.length} deals still open.`
              : `${s.stale.length} stale deals need reconfirmation. Concentration risk on large CICS opportunities (DIMO / NSBM).`
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
          <li>Record Won / Lost and opening price for every submitted bid.</li>
          <li>Track EDL-DIMO bid (2.5B) through 19 Nov submission.</li>
          <li>Advance LECO Ekala SDMC solution/cost sheet (due 15 Oct).</li>
          <li>Progress NSBM Healthcare ELV BOQs and Smart Nurse Call specifications.</li>
          <li>Follow up BOC CMS Omni Pay discussion and Lankem lakehouse proposal.</li>
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
