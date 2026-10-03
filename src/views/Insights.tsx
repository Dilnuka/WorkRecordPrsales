import { Card } from '../components/ui'
import { DataQualityChart, EngineerValueChart, EngineerWorkloadChart, TeamSplitChart } from '../components/charts'
import { fmtMn, summary } from '../data/opportunities'

export default function Insights() {
  const s = summary()

  return (
    <div className="mx-auto max-w-[1120px] space-y-5">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryTile
          label="Summary"
          body={`Pipeline is up ~4× over three weeks. Bids remain at ${fmtMn(s.submittedValue)} Mn with no new submissions in the last two weeks.`}
        />
        <SummaryTile
          label="Risks"
          body={`NSBM is ~82% of active pipeline. ${s.stale.length} deals are stale. Met Dept submission date has passed without an outcome.`}
        />
        <SummaryTile
          label="Required data"
          body={`Win ratio needs Won/Lost on ${s.submitted.length} bids. ${s.unsized.length} of ${s.total} deals still have no value (NI).`}
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
          <li>Reconfirm or close all stale opportunities this week.</li>
          <li>Add projected values for every NI deal within 7 days of assignment.</li>
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
