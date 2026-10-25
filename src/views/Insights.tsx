import { Card } from '../components/ui'
import { DataQualityChart, EngineerValueChart, EngineerWorkloadChart, TeamSplitChart } from '../components/charts'
import { fmtMn } from '../data/opportunities'
import { useDataScope } from '../data/DataScopeContext'

export default function Insights() {
  const { stats: s, scope } = useDataScope()
  const edlShare = s.projectedPipeline
    ? Math.round((2300 / s.projectedPipeline) * 100)
    : 0

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
              ? `EDL is ~${edlShare}% of this week’s projected pipeline (2,300 Mn), due 10 Nov. No bids dispatched. ${s.pending.length} deals still open.`
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
          <li>Record Won / Lost and opening price for every submitted bid, including Orient Insurance (19 Oct).</li>
          <li>Track EDL rooftop solar (2.3B projected) through 10 Nov submission.</li>
          <li>Submit University of Peradeniya network rehabilitation (budget 45.9 Mn) by 26 Oct.</li>
          <li>Close City of Dreams Cisco switches by 30 Oct and SLT-PEOTV IPTV CDN by 02 Nov.</li>
          <li>Price Compassion International Cisco APs and follow up Liberty equipment list (due 21 Oct).</li>
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
