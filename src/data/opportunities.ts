/**
 * VSIS Presales — master data.
 * WEEKLY = latest mail week only.
 * OVERALL = consolidated history + latest week (default for the live dashboard).
 * Values in Mn LKR. null = NI.
 */

export type Team = 'CICS' | 'DWS' | 'NI'
export type Status = 'Assigned' | 'Ongoing' | 'Submitted' | 'Declined'
export type Outcome = 'Won' | 'Lost' | null
export type DataScope = 'overall' | 'weekly'

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
export const WEEKLY_COVERAGE = '28 Sep – 04 Oct 2026'
export const OVERALL_COVERAGE = '16 Aug – 04 Oct 2026'

/** Latest weekly mail only (28 Sep – 04 Oct 2026) */
export const WEEKLY_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'OP-026', team: 'CICS', customer: 'BOC (Bank of Ceylon)',
    project: 'Supply, delivery, installation, commissioning & maintenance of 366 network routers with SD-WAN (OPEX or CAPEX)',
    owner: 'Anuththara Wijebandara', sales: 'Malika Vishwajith', presalesEngineer: 'Pramoad Pathirathna',
    budget: 55, projected: 45, bid: null, submissionDate: '2026-10-09', status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-10-04', workDone: 'Complete project.',
  },
  {
    id: 'OP-025', team: 'CICS', customer: 'DIMO-EDL',
    project: 'Proposed Rooftop Solar Aggregation & Virtual Net Metering Project',
    owner: 'Anuththara Wijebandara', sales: null, presalesEngineer: 'Sudeepa Premarathne',
    budget: 4000, projected: 2000, bid: null, submissionDate: '2026-11-19', status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-10-04', workDone: 'Complete pre-sales works.',
  },
  {
    id: 'OP-024', team: 'CICS', customer: 'BOC (Bank of Ceylon)',
    project: 'Data Lake Opportunity',
    owner: 'Dilnuka Liyanage', sales: 'Rukshan Perera', presalesEngineer: 'Dilnuka Liyanage',
    budget: null, projected: 330, bid: null, submissionDate: null, status: 'Assigned',
    outcome: null, lowestBid: null, lastReported: '2026-10-04',
    workDone: 'Data Lake to Data Warehouse process — technical requirements identifying.',
  },
  {
    id: 'OP-023', team: 'CICS', customer: 'NSBM Green University Town',
    project: 'Data Network and ELV Network',
    owner: 'Hiruni Amarakoon', sales: null, presalesEngineer: null,
    budget: null, projected: 1500, bid: null, submissionDate: null, status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-10-04',
    workDone: 'Rough budget for entire project (supply, installation, configuration, testing) and prepare the spec.',
  },
  {
    id: 'OP-022', team: 'DWS', customer: 'Hellman MAS',
    project: 'Design, supply and installation of network system',
    owner: 'Anuththara Wijebandara', sales: 'Chamisha Dilakshi', presalesEngineer: 'Anuththara Wijebandara',
    budget: null, projected: 240, bid: 218, submissionDate: '2026-10-07', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-10-04', workDone: 'Complete project; bid dispatched.',
  },
]

/**
 * Prior opportunities (Aug–Sep) still relevant overall.
 * Superseded rows replaced by weekly IDs: OP-021→024, OP-020→023, OP-016→025.
 */
const HISTORICAL_OPPORTUNITIES: Opportunity[] = [
  { id: 'OP-019', team: 'CICS', customer: 'Innov8', project: 'Supply & Installation of Switch', owner: 'Anuththara Wijebandara', sales: 'Udara Fernando', presalesEngineer: 'Pramoad Pathirathna', budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-20', workDone: 'Project scoping in progress.' },
  { id: 'OP-018', team: 'DWS', customer: 'RIL Property PLC', project: 'Wireless Access Points — 4 Units', owner: 'Hiruni Amarakoon', sales: 'Nayomi Fernando', presalesEngineer: 'Hiruni Amarakoon', budget: null, projected: 0.28, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-20', workDone: 'Quotation requested for 4 wireless access points.' },
  { id: 'OP-017', team: 'CICS', customer: 'Brandix Apparel', project: 'Cisco AP', owner: 'Anuththara Wijebandara', sales: 'Tharushi Madushani', presalesEngineer: 'Anuththara Wijebandara', budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-14', workDone: 'Handling complete project.' },
  { id: 'OP-015', team: 'CICS', customer: 'Department of Meteorology', project: 'Network Security, Switching, Wi-Fi & Structured Cabling', owner: 'Hiruni Amarakoon', sales: 'Sithara Dissanayake', presalesEngineer: 'Ashen Alwis', budget: 300, projected: 170, bid: null, submissionDate: '2026-09-22', status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-14', workDone: 'Finalising tender documents.', flag: 'Submission date (22 Sep) has passed — outcome not reported' },
  { id: 'OP-014', team: 'CICS', customer: 'CEB / NSO', project: 'Solar PV Field Communication Devices (Modems/RTU)', owner: 'Anuththara Wijebandara', sales: 'Thushara Bandaranayake', presalesEngineer: 'Anuththara Wijebandara', budget: null, projected: 50, bid: null, submissionDate: '2026-09-10', status: 'Declined', outcome: null, lowestBid: null, lastReported: '2026-09-08', workDone: 'No-bid recommended 08 Sep — fails 4 mandatory prequalification gates.' },
  { id: 'OP-013', team: 'CICS', customer: 'Govt. Tender L/0399/2026', project: 'Perimeter Firewall Solution (Supply, Install, Config, Support)', owner: 'Anuththara Wijebandara', sales: 'Hiruni Ranasinghe', presalesEngineer: 'Didulani Wasalathilaka', budget: null, projected: null, bid: null, submissionDate: null, status: 'Assigned', outcome: null, lowestBid: null, lastReported: '2026-09-06', workDone: 'Firewall compliance review; complete project assigned.' },
  { id: 'OP-012', team: 'DWS', customer: 'Berendina Micro Investments (BMIC)', project: 'Network Infrastructure & IT Security Enhancement (SASE)', owner: 'Hiruni Amarakoon', sales: 'Chamisha Dilakshi', presalesEngineer: 'Pramoad Pathirathna', budget: null, projected: 18, bid: 13.95, submissionDate: '2026-09-07', status: 'Submitted', outcome: null, lowestBid: null, lastReported: '2026-09-14', workDone: 'Solution for IT infrastructure upgrade and SASE; bid dispatched.' },
  { id: 'OP-011', team: 'DWS', customer: 'Hellman MAS', project: 'Supply & Installation of HMSC Active Infrastructure', owner: 'Anuththara Wijebandara', sales: 'Chamisha Dilakshi', presalesEngineer: 'Sudeepa Premarathne', budget: null, projected: 280, bid: 258, submissionDate: '2026-09-11', status: 'Submitted', outcome: null, lowestBid: null, lastReported: '2026-09-14', workDone: 'Complete project; bid dispatched.' },
  { id: 'OP-010', team: 'CICS', customer: 'NIHS Kalutara', project: 'Network Infrastructure', owner: 'Hiruni Amarakoon', sales: null, presalesEngineer: 'Damith Kamkanamage', budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-08-31', workDone: 'Point matrix prepared.' },
  { id: 'OP-009', team: 'CICS', customer: 'NSB', project: 'GPS / Fleet Management', owner: 'Dilnuka Liyanage', sales: null, presalesEngineer: null, budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-08-31', workDone: 'Requirements and vendor pricing.' },
  { id: 'OP-008', team: 'CICS', customer: 'Doora', project: 'ALE Rainbow Plugins', owner: 'Dilnuka Liyanage', sales: null, presalesEngineer: null, budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-08-31', workDone: 'AI feature testing.' },
  { id: 'OP-005', team: 'CICS', customer: 'Arthur J Gallagher', project: 'Switch & AP', owner: 'Anuththara Wijebandara', sales: null, presalesEngineer: null, budget: null, projected: null, bid: null, submissionDate: '2026-08-28', status: 'Submitted', outcome: null, lowestBid: null, lastReported: '2026-08-31', workDone: 'Completed and submitted (24 & 28 Aug).' },
  { id: 'OP-004', team: 'CICS', customer: 'Rooftop Solar Aggregation & Net Metering', project: 'Solar Aggregation & Net Metering Proposal', owner: 'Anuththara Wijebandara', sales: null, presalesEngineer: null, budget: null, projected: null, bid: null, submissionDate: '2026-08-25', status: 'Submitted', outcome: null, lowestBid: null, lastReported: '2026-08-31', workDone: 'Completed and submitted 25 Aug.' },
  { id: 'OP-003', team: 'NI', customer: 'Presidential Secretariat', project: 'Conference & Interpretation System', owner: 'Anuththara Wijebandara', sales: null, presalesEngineer: null, budget: null, projected: null, bid: null, submissionDate: '2026-08-18', status: 'Submitted', outcome: null, lowestBid: null, lastReported: '2026-08-23', workDone: 'Tender/proposal prepared and submitted.' },
  { id: 'OP-002', team: 'NI', customer: 'DHL', project: 'DHL Project', owner: 'Anuththara Wijebandara', sales: null, presalesEngineer: null, budget: null, projected: null, bid: null, submissionDate: '2026-08-18', status: 'Submitted', outcome: null, lowestBid: null, lastReported: '2026-08-23', workDone: 'Requirements and proposal activities; submitted.' },
  { id: 'OP-001', team: 'NI', customer: 'Department of Meteorology', project: 'Server Room & ELV Systems Tender', owner: 'Hiruni Amarakoon', sales: null, presalesEngineer: null, budget: null, projected: null, bid: null, submissionDate: '2026-08-20', status: 'Submitted', outcome: null, lowestBid: null, lastReported: '2026-08-23', workDone: 'Tender requirements and proposal prepared; submitted.' },
]

/** Overall = history + latest week (newest first). */
export const OVERALL_OPPORTUNITIES: Opportunity[] = [
  ...WEEKLY_OPPORTUNITIES,
  ...HISTORICAL_OPPORTUNITIES,
]

export const PIPELINE_TREND = [
  { week: '7–13 Sep', value: 468, reported: true },
  { week: '14–20 Sep', value: 1500.28, reported: true },
  { week: '21–27 Sep', value: 1830, reported: true },
  { week: '28 Sep–4 Oct', value: 4115, reported: true },
]

export function opportunitiesFor(scope: DataScope): Opportunity[] {
  return scope === 'weekly' ? WEEKLY_OPPORTUNITIES : OVERALL_OPPORTUNITIES
}

export function coverageFor(scope: DataScope): string {
  return scope === 'weekly' ? WEEKLY_COVERAGE : OVERALL_COVERAGE
}

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
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

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

export function engineerStats(list: Opportunity[]): EngineerStats[] {
  const names = [...new Set(list.map((o) => o.owner))]
  return names.map((name) => {
    const mine = list.filter((o) => o.owner === name)
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

export function summary(list: Opportunity[]) {
  const pending = list.filter((o) => o.status === 'Assigned' || o.status === 'Ongoing')
  const submitted = list.filter((o) => o.status === 'Submitted')
  const declined = list.filter((o) => o.status === 'Declined')
  const projectedPipeline = list.reduce((s, o) => s + (o.projected ?? o.bid ?? o.budget ?? 0), 0)
  return {
    pending,
    submitted,
    declined,
    stale: list.filter(isStale),
    unsized: list.filter((o) => bestValue(o) == null),
    pipelineValue: pending.reduce((s, o) => s + (bestValue(o) ?? 0), 0),
    projectedPipeline,
    submittedValue: submitted.reduce((s, o) => s + (o.bid ?? 0), 0),
    outcomesTracked: submitted.filter((o) => o.outcome != null).length,
    total: list.length,
  }
}

/** @deprecated use opportunitiesFor(scope) via DataScopeProvider */
export const OPPORTUNITIES = OVERALL_OPPORTUNITIES
export const COVERAGE = OVERALL_COVERAGE
