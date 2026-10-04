import { Card } from '../components/ui'
import { DataQualityChart, EngineerValueChart, EngineerWorkloadChart, TeamSplitChart } from '../components/charts'
import { fmtMn, summary } from '../data/opportunities'

export default function Insights() {
  const s = summary()
  const dimoShare = s.projectedPipeline
    ? Math.round((2000 / s.projectedPipeline) * 100)
    : 0

  return (
    <div className="mx-auto max-w-[1120px] space-y-5">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryTile
          label="Summary"
          body={`Week 28 Sep–4 Oct: projected pipeline ${fmtMn(s.projectedPipeline)} Mn across ${s.total} opportunities. Bids dispatched ${fmtMn(s.submittedValue)} Mn (Hellman MAS).`}
        />
        <SummaryTile
          label="Risks"
          body={`DIMO-EDL is ~${dimoShare}% of projected pipeline. ${s.pending.length} deals still open. Win/loss not logged on submitted bids.`}
        />
        <SummaryTile
          label="Required data"
          body={`Win ratio needs Won/Lost on ${s.submitted.length} bid(s). ${s.unsized.length} of ${s.total} deals missing a value field where expected.`}
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
          <li>Record Won / Lost and opening price for Hellman MAS (and any other submitted bids).</li>
          <li>Track BOC SD-WAN toward the 09 Oct submission date.</li>
          <li>Confirm DIMO-EDL sizing (2 B projected vs 4 B RFP ceiling) before mid-November.</li>
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
