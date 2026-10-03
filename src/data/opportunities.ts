/**
 * VSIS Presales — master data module.
 * Single source of truth: edit OPPORTUNITIES weekly; every KPI, chart and
 * scoreboard in the app recalculates automatically.
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

export const REPORT_DATE = new Date('2026-09-28')
export const COVERAGE = '16 Aug – 27 Sep 2026'

export const OPPORTUNITIES: Opportunity[] = [
  { id: 'OP-021', team: 'CICS', customer: 'BOC (Bank of Ceylon)', project: 'Data Lake Opportunity', owner: 'Dilnuka Liyanage', sales: 'Rukshan Perera', presalesEngineer: 'Dilnuka Liyanage', budget: null, projected: 330, bid: null, submissionDate: null, status: 'Assigned', outcome: null, lowestBid: null, lastReported: '2026-09-28', workDone: 'Identifying Data Warehousing requirements and the importance of Data Lake in the banking sector.' },
  { id: 'OP-020', team: 'CICS', customer: 'NSBM Green University Town', project: 'Data Network & ELV Network', owner: 'Hiruni Amarakoon', sales: null, presalesEngineer: null, budget: null, projected: 1500, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-28', workDone: 'Rough budget for entire project — supply, installation, configuration, testing — and preparing the spec.' },
  { id: 'OP-019', team: 'CICS', customer: 'Innov8', project: 'Supply & Installation of Switch', owner: 'Anuththara Wijebandara', sales: 'Udara Fernando', presalesEngineer: 'Pramoad Pathirathna', budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-20', workDone: 'Project scoping in progress.' },
  { id: 'OP-018', team: 'DWS', customer: 'RIL Property PLC', project: 'Wireless Access Points — 4 Units', owner: 'Hiruni Amarakoon', sales: 'Nayomi Fernando', presalesEngineer: 'Hiruni Amarakoon', budget: null, projected: 0.28, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-20', workDone: 'Quotation requested for 4 wireless access points.' },
  { id: 'OP-017', team: 'CICS', customer: 'Brandix Apparel', project: 'Cisco AP', owner: 'Anuththara Wijebandara', sales: 'Tharushi Madushani', presalesEngineer: 'Anuththara Wijebandara', budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-14', workDone: 'Handling complete project.' },
  { id: 'OP-016', team: 'CICS', customer: 'DIMO', project: 'Rooftop Solar Aggregation & Virtual Net Metering', owner: 'Anuththara Wijebandara', sales: null, presalesEngineer: 'Sudeepa Premarathne', budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-14', workDone: 'Customer meeting for clarification and VSIS scope summarisation.' },
  { id: 'OP-015', team: 'CICS', customer: 'Department of Meteorology', project: 'Network Security, Switching, Wi-Fi & Structured Cabling', owner: 'Hiruni Amarakoon', sales: 'Sithara Dissanayake', presalesEngineer: 'Ashen Alwis', budget: 300, projected: 170, bid: null, submissionDate: '2026-09-22', status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-14', workDone: 'Finalising tender documents.', flag: 'Submission date (22 Sep) has passed — outcome not reported' },
  { id: 'OP-014', team: 'CICS', customer: 'CEB / NSO', project: 'Solar PV Field Communication Devices (Modems/RTU)', owner: 'Anuththara Wijebandara', sales: 'Thushara Bandaranayake', presalesEngineer: 'Anuththara Wijebandara', budget: null, projected: 50, bid: null, submissionDate: '2026-09-10', status: 'Declined', outcome: null, lowestBid: null, lastReported: '2026-09-08', workDone: 'No-bid recommended 08 Sep — fails 4 mandatory prequalification gates; very low probability of win even via JV.' },
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

/** Weekly projected-pipeline trend (Mn LKR). */
export const PIPELINE_TREND = [
  { week: '24–30 Aug', value: 400, reported: false },
  { week: '31 Aug–6 Sep', value: 350, reported: false },
  { week: '7–13 Sep', value: 468, reported: true },
  { week: '14–20 Sep', value: 1500.28, reported: true },
  { week: '21–27 Sep', value: 1830, reported: true },
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
  wonDeals: number | null // null = outcomes not tracked (data gap)
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
  return {
    pending,
    submitted,
    declined,
    stale: OPPORTUNITIES.filter(isStale),
    unsized: OPPORTUNITIES.filter((o) => bestValue(o) == null),
    pipelineValue: pending.reduce((s, o) => s + (bestValue(o) ?? 0), 0),
    submittedValue: submitted.reduce((s, o) => s + (o.bid ?? 0), 0),
    outcomesTracked: submitted.filter((o) => o.outcome != null).length,
    total: OPPORTUNITIES.length,
  }
}
