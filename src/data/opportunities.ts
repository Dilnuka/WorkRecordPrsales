/**
 * VSIS Presales — master data module.
 * Weekly update: replace OPPORTUNITIES with the latest mail report; KPIs/charts recalculate.
 * All monetary values are in Mn LKR. `null` = No Information (NI).
 */

export type Team = 'CICS' | 'DWS' | 'NI'
export type Status = 'Assigned' | 'Ongoing' | 'Submitted' | 'Declined'
export type Outcome = 'Won' | 'Lost' | null

export interface Opportunity {
  id: string
  team: Team
  customer: string
  project: string
  owner: string
  sales: string | null
  presalesEngineer: string | null
  budget: number | null
  projected: number | null
  bid: number | null
  submissionDate: string | null
  status: Status
  outcome: Outcome
  lowestBid: boolean | null
  lastReported: string
  workDone: string
  flag?: string
}

export const REPORT_DATE = new Date('2026-10-04')
export const COVERAGE = '28 Sep – 04 Oct 2026'

/** Week of 28 September – 04 October 2026 (source: Dilnuka weekly mail) */
export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'OP-026',
    team: 'CICS',
    customer: 'BOC (Bank of Ceylon)',
    project: 'Supply, delivery, installation, commissioning & maintenance of 366 network routers with SD-WAN (OPEX or CAPEX)',
    owner: 'Anuththara Wijebandara',
    sales: 'Malika Vishwajith',
    presalesEngineer: 'Pramoad Pathirathna',
    budget: 55,
    projected: 45,
    bid: null,
    submissionDate: '2026-10-09',
    status: 'Ongoing',
    outcome: null,
    lowestBid: null,
    lastReported: '2026-10-04',
    workDone: 'Complete project.',
  },
  {
    id: 'OP-025',
    team: 'CICS',
    customer: 'DIMO-EDL',
    project: 'Proposed Rooftop Solar Aggregation & Virtual Net Metering Project',
    owner: 'Anuththara Wijebandara',
    sales: null,
    presalesEngineer: 'Sudeepa Premarathne',
    budget: 4000,
    projected: 2000,
    bid: null,
    submissionDate: '2026-11-19',
    status: 'Ongoing',
    outcome: null,
    lowestBid: null,
    lastReported: '2026-10-04',
    workDone: 'Complete pre-sales works.',
  },
  {
    id: 'OP-024',
    team: 'CICS',
    customer: 'BOC (Bank of Ceylon)',
    project: 'Data Lake Opportunity',
    owner: 'Dilnuka Liyanage',
    sales: 'Rukshan Perera',
    presalesEngineer: 'Dilnuka Liyanage',
    budget: null,
    projected: 330,
    bid: null,
    submissionDate: null,
    status: 'Assigned',
    outcome: null,
    lowestBid: null,
    lastReported: '2026-10-04',
    workDone: 'Data Lake to Data Warehouse process — technical requirements identifying.',
  },
  {
    id: 'OP-023',
    team: 'CICS',
    customer: 'NSBM Green University Town',
    project: 'Data Network and ELV Network',
    owner: 'Hiruni Amarakoon',
    sales: null,
    presalesEngineer: null,
    budget: null,
    projected: 1500,
    bid: null,
    submissionDate: null,
    status: 'Ongoing',
    outcome: null,
    lowestBid: null,
    lastReported: '2026-10-04',
    workDone: 'Rough budget for entire project (supply, installation, configuration, testing) and prepare the spec.',
  },
  {
    id: 'OP-022',
    team: 'DWS',
    customer: 'Hellman MAS',
    project: 'Design, supply and installation of network system',
    owner: 'Anuththara Wijebandara',
    sales: 'Chamisha Dilakshi',
    presalesEngineer: 'Anuththara Wijebandara',
    budget: null,
    projected: 240,
    bid: 218,
    submissionDate: '2026-10-07',
    status: 'Submitted',
    outcome: null,
    lowestBid: null,
    lastReported: '2026-10-04',
    workDone: 'Complete project; bid dispatched.',
  },
]

/** Weekly projected-pipeline trend (Mn LKR) — official summary totals where reported. */
export const PIPELINE_TREND = [
  { week: '7–13 Sep', value: 468, reported: true },
  { week: '14–20 Sep', value: 1500.28, reported: true },
  { week: '21–27 Sep', value: 1830, reported: true },
  { week: '28 Sep–4 Oct', value: 4115, reported: true },
]

/* ---------------- derived helpers ---------------- */

export const bestValue = (o: Opportunity): number | null =>
  o.bid ?? o.projected ?? o.budget ?? null

export const isStale = (o: Opportunity): boolean =>
  o.status !== 'Submitted' &&
  o.status !== 'Declined' &&
  (REPORT_DATE.getTime() - new Date(o.lastReported).getTime()) / 86_400_000 >= 14

export const fmtMn = (v: number | null): string =>
  v == null
    ? 'NI'
    : v.toLocaleString('en-US', {
        minimumFractionDigits: v % 1 ? 2 : 0,
        maximumFractionDigits: 2,
      })

export const initials = (name: string): string =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

/* ---------------- aggregates ---------------- */

export interface EngineerStats {
  name: string
  worked: number
  pending: number
  submitted: number
  submittedValue: number
  totalValue: number
  unsized: number
  wonDeals: number | null
}

export function engineerStats(): EngineerStats[] {
  const names = [...new Set(OPPORTUNITIES.map((o) => o.owner))]
  return names.map((name) => {
    const mine = OPPORTUNITIES.filter((o) => o.owner === name)
    const subs = mine.filter((o) => o.status === 'Submitted')
    return {
      name,
      worked: mine.length,
      pending: mine.filter((o) => o.status === 'Assigned' || o.status === 'Ongoing').length,
      submitted: subs.length,
      submittedValue: subs.reduce((s, o) => s + (o.bid ?? 0), 0),
      totalValue: mine.reduce((s, o) => s + (bestValue(o) ?? 0), 0),
      unsized: mine.filter((o) => bestValue(o) == null).length,
      wonDeals: mine.some((o) => o.outcome != null)
        ? mine.filter((o) => o.outcome === 'Won').length
        : null,
    }
  })
}

export function summary() {
  const pending = OPPORTUNITIES.filter((o) => o.status === 'Assigned' || o.status === 'Ongoing')
  const submitted = OPPORTUNITIES.filter((o) => o.status === 'Submitted')
  const declined = OPPORTUNITIES.filter((o) => o.status === 'Declined')
  // Match weekly mail "Projected Pipeline" = sum of projected (or best) across all live + submitted deals
  const projectedPipeline = OPPORTUNITIES.reduce((s, o) => s + (o.projected ?? o.bid ?? o.budget ?? 0), 0)
  return {
    pending,
    submitted,
    declined,
    stale: OPPORTUNITIES.filter(isStale),
    unsized: OPPORTUNITIES.filter((o) => bestValue(o) == null),
    pipelineValue: pending.reduce((s, o) => s + (bestValue(o) ?? 0), 0),
    projectedPipeline,
    submittedValue: submitted.reduce((s, o) => s + (o.bid ?? 0), 0),
    outcomesTracked: submitted.filter((o) => o.outcome != null).length,
    total: OPPORTUNITIES.length,
  }
}
