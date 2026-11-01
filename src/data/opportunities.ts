/**
 * VSIS Presales — master data.
 * WEEKLY = latest mail week only.
 * OVERALL = consolidated history + latest week (default for the live dashboard).
 * Values in Mn LKR. null = NI.
 *
 * Projected Pipeline = sum of Winning Price (projected).
 * Bids Dispatched = sum of Bid Price (any stage with a quoted figure).
 */

export type Team = 'CICS' | 'DWS' | 'NI'
export type Status = 'Assigned' | 'Ongoing' | 'Submitted' | 'Completed' | 'Declined'
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

export const REPORT_DATE = new Date('2026-11-01')
export const WEEKLY_COVERAGE = '26 Oct – 01 Nov 2026'
export const OVERALL_COVERAGE = '16 Aug – 01 Nov 2026'

/** Latest weekly mail only (26 Oct – 01 Nov 2026) */
export const WEEKLY_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'OP-057', team: 'DWS', customer: 'RIL Property PLC',
    project: 'Requirement for Wireless Access Points — 04 Units',
    owner: 'Hiruni Amarakoon', sales: 'Nayomi Fernando', presalesEngineer: null,
    budget: null, projected: 0.28, bid: null, submissionDate: null, status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-11-01',
    workDone: 'Quotation requested for Wireless Access Points — 04 Units.',
  },
  {
    id: 'OP-056', team: 'DWS', customer: 'Ceylon Steel Corporation Limited',
    project: 'Get price for Cisco SG350-28P 28-port Switch — 04 Nos',
    owner: 'Hiruni Amarakoon', sales: 'Chanaka Ekanayake', presalesEngineer: null,
    budget: null, projected: null, bid: null, submissionDate: null, status: 'Assigned',
    outcome: null, lowestBid: null, lastReported: '2026-11-01',
    workDone: 'Get price for Replacement of Cisco SG350-28P 28-port Switch — 04 Nos.',
  },
  {
    id: 'OP-055', team: 'CICS', customer: 'NSBM Green University',
    project: 'Smart Nurse Call System',
    owner: 'Hiruni Amarakoon', sales: 'Kaushalya Hettiarachchi', presalesEngineer: null,
    budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-11-01',
    workDone: 'Preparing BOQ and specifications.',
  },
  {
    id: 'OP-054', team: 'CICS', customer: 'Farmchemie',
    project: 'Storage for Dyvest Group CCTV footage',
    owner: 'Hiruni Amarakoon', sales: 'Kovindu De Seram', presalesEngineer: 'Dexter de Lima',
    budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-11-01',
    workDone: 'Propose a storage solution for Dyvest Group CCTV footage to meet the 90-day retention period.',
  },
  {
    id: 'OP-053', team: 'CICS', customer: 'Ceylon Steel Corporation Limited',
    project: 'Get price for Cisco Switches — 04 Nos',
    owner: 'Hiruni Amarakoon', sales: 'Chanaka Ekanayake', presalesEngineer: 'Didulani Wasalathilaka',
    budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-11-01',
    workDone: 'Find a replacement model and get price for Cisco Switches — 04 Nos.',
  },
  {
    id: 'OP-052', team: 'CICS', customer: 'NSBM Green University Town',
    project: 'Data Network and ELV Network',
    owner: 'Hiruni Amarakoon', sales: null, presalesEngineer: null,
    budget: null, projected: 1500, bid: null, submissionDate: '2026-09-24', status: 'Completed',
    outcome: null, lowestBid: null, lastReported: '2026-11-01',
    workDone: 'Make a rough budget for entire project (supply, installation, configuration and testing) and make the spec.',
  },
  {
    id: 'OP-051', team: 'DWS', customer: 'Liberty Motor Associates (Pvt) Ltd.',
    project: 'Supply equipment list',
    owner: 'Hiruni Amarakoon', sales: 'Saleela Kaushal', presalesEngineer: null,
    budget: null, projected: null, bid: 0.43, submissionDate: '2026-10-21', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-11-01', workDone: 'Supply equipment list.',
  },
  {
    id: 'OP-050', team: 'CICS', customer: 'University of Peradeniya',
    project: 'Supply, delivery, installation, and commissioning of network equipment for the rehabilitation of the computer network at the Faculty of Management (Cyclone Dithwa damage)',
    owner: 'Hiruni Amarakoon', sales: 'Prasanna Pushpakumara', presalesEngineer: 'Dhanushka Hewawitharana',
    budget: 45.9, projected: null, bid: 22.3, submissionDate: '2026-10-26', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-11-01',
    workDone: 'Proposed the solution and costing.',
  },
  {
    id: 'OP-058', team: 'CICS', customer: 'VarioSystem',
    project: 'Supplying and installing Cisco Switches',
    owner: 'Anuththara Wijebandara', sales: 'Udara Fernando', presalesEngineer: 'Didulani Wasalathilaka',
    budget: null, projected: null, bid: null, submissionDate: '2026-10-28', status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-11-01', workDone: 'Making the Cisco BOM.',
    flag: 'Submission date (28 Oct) has passed — still Ongoing',
  },
  {
    id: 'OP-059', team: 'CICS', customer: 'LankaCom',
    project: 'Supplying and installing Cisco Router',
    owner: 'Anuththara Wijebandara', sales: 'Thushara Bandaranayake', presalesEngineer: 'Didulani Wasalathilaka',
    budget: null, projected: null, bid: null, submissionDate: '2026-10-30', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-11-01', workDone: 'Making the Cisco BOM.',
  },
  {
    id: 'OP-060', team: 'CICS', customer: 'EDL',
    project: 'Proposed Rooftop Solar Aggregation & Virtual Net Metering Project',
    owner: 'Anuththara Wijebandara', sales: 'Umesh Peiris', presalesEngineer: 'Sudeepa Premarathne',
    budget: null, projected: null, bid: 2000, submissionDate: '2026-11-06', status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-11-01', workDone: 'NI',
  },
  {
    id: 'OP-049', team: 'CICS', customer: 'NSBM Healthcare Limited',
    project: 'Data Network and ELV Network',
    owner: 'Hiruni Amarakoon', sales: 'Kaushalya Hettiarachchi', presalesEngineer: null,
    budget: null, projected: null, bid: null, submissionDate: '2026-10-28', status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-11-01',
    workDone: 'Prepare BOQs and technical specifications for the ELV systems.',
    flag: 'Submission date (28 Oct) has passed — still Ongoing',
  },
  {
    id: 'OP-048', team: 'DWS', customer: 'Activ8 Asia Pvt Ltd',
    project: 'Activ8 Asia — Aruba Instant On Switches (Supply Only)',
    owner: 'Dilnuka Liyanage', sales: 'Saleela Kaushal', presalesEngineer: 'Sudeepa Premarathne',
    budget: null, projected: null, bid: 1.9, submissionDate: '2026-10-29', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-11-01', workDone: 'Price request from Tyax.',
  },
  {
    id: 'OP-047', team: 'DWS', customer: 'Equantum Outsourcing Innovation',
    project: 'Firewall Renewal and the Replacement of the Fortigate 30E Devices',
    owner: 'Hiruni Amarakoon', sales: 'Muditha Rajapaksha', presalesEngineer: 'Pramoad Pathirathna',
    budget: null, projected: null, bid: 5.1, submissionDate: '2026-10-30', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-11-01',
    workDone: 'Request pricing for the requirement.',
  },
  {
    id: 'OP-061', team: 'DWS', customer: 'SLT',
    project: 'SLTS/TB/PEOTV/2026/024 — Procurement of Equipment for IPTV BCP Operations Setup',
    owner: 'Anuththara Wijebandara', sales: 'Nayomi Fernando', presalesEngineer: 'Didulani Wasalathilaka',
    budget: null, projected: null, bid: null, submissionDate: '2026-10-30', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-11-01', workDone: 'NI',
  },
]

/**
 * Prior opportunities still relevant overall.
 * Superseded: OP-043→060 (EDL), OP-045→050 (Peradeniya), OP-041→051 (Liberty), OP-035→052 (NSBM),
 * OP-034→049 (NSBM Healthcare), OP-033→055 (Nurse Call), OP-027→056 (Ceylon Steel), OP-018→057 (RIL).
 */
const HISTORICAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'OP-046', team: 'CICS', customer: 'Orient Insurance',
    project: 'Supply of Cisco Switches',
    owner: 'Anuththara Wijebandara', sales: 'Chanaka Ekanayake', presalesEngineer: 'Didulani Wasalathilaka',
    budget: null, projected: null, bid: null, submissionDate: '2026-10-19', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-10-25', workDone: 'Complete project.',
  },
  {
    id: 'OP-044', team: 'CICS', customer: 'City of Dreams',
    project: 'Supply of Cisco Switches and other infrastructure facilities',
    owner: 'Anuththara Wijebandara', sales: 'Umesh Peiris', presalesEngineer: 'Pramoad Pathirathna',
    budget: null, projected: null, bid: null, submissionDate: '2026-10-30', status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-10-25', workDone: 'Complete project.',
    flag: 'Submission date (30 Oct) has passed — still Ongoing',
  },
  {
    id: 'OP-042', team: 'DWS', customer: 'Compassion International Lanka',
    project: 'Supply of Cisco Access Point',
    owner: 'Anuththara Wijebandara', sales: 'Muditha Rajapaksha', presalesEngineer: null,
    budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-10-25',
    workDone: 'Make the Cisco BOM and get the pricing.',
  },
  {
    id: 'OP-040', team: 'DWS', customer: 'SLT-PEOTV',
    project: 'Procurement of Hardware and Services for HE IPTV CDN Expansion — SLTS/TB/PEOTV/2026/023',
    owner: 'Anuththara Wijebandara', sales: 'Nayomi Fernando', presalesEngineer: 'Didulani Wasalathilaka',
    budget: null, projected: null, bid: null, submissionDate: '2026-11-02', status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-10-25', workDone: 'Complete project.',
  },
  {
    id: 'OP-039', team: 'CICS', customer: 'Department of Meteorology',
    project: 'Procurement of Supply, Installation, Testing, Commissioning, and Maintenance of Upgraded Network Security, Switching, Wi-Fi, and Structured Cabling Systems',
    owner: 'Hiruni Amarakoon', sales: 'Sithara Dissanayake', presalesEngineer: 'Ashen Alwis',
    budget: 300, projected: 170, bid: null, submissionDate: '2026-09-22', status: 'Completed',
    outcome: null, lowestBid: null, lastReported: '2026-10-18',
    workDone: 'Finalize the documents and continue the project.',
  },
  {
    id: 'OP-038', team: 'CICS', customer: 'Homelands',
    project: 'Making the CISCO BOM — Central Park Boulevard',
    owner: 'Anuththara Wijebandara', sales: null, presalesEngineer: 'Eranga Wijetilleka',
    budget: null, projected: null, bid: null, submissionDate: '2026-10-15', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-10-18', workDone: 'Making the CISCO BOM.',
  },
  {
    id: 'OP-037', team: 'CICS', customer: 'Lanka Electricity Company (Private) Limited',
    project: 'Supply, delivery, installation, configuration, testing and commissioning of network infrastructure at Ekala SDMC new building',
    owner: 'Hiruni Amarakoon', sales: 'Thushara Bandaranayake', presalesEngineer: null,
    budget: 50, projected: 35, bid: null, submissionDate: '2026-10-15', status: 'Assigned',
    outcome: null, lowestBid: null, lastReported: '2026-10-18',
    workDone: 'Make the solution and cost sheet.',
    flag: 'Submission date (15 Oct) has passed — still Assigned',
  },
  {
    id: 'OP-031', team: 'CICS', customer: 'Lankem Ceylon PLC',
    project: 'Data lakehouse based solutions',
    owner: 'Dilnuka Liyanage', sales: null, presalesEngineer: 'Theekshana Tharunethu Wanniarachchi',
    budget: null, projected: null, bid: null, submissionDate: null, status: 'Assigned',
    outcome: null, lowestBid: null, lastReported: '2026-10-18',
    workDone: 'Project proposal done with proposing solutions.',
  },
  {
    id: 'OP-030', team: 'CICS', customer: 'BOC (Bank of Ceylon)',
    project: 'BOC Centralized Card Management System (CMS) / Card Management System Modernization',
    owner: 'Dilnuka Liyanage', sales: 'Malika Vishwajith', presalesEngineer: 'Theekshana Tharunethu Wanniarachchi',
    budget: null, projected: null, bid: null, submissionDate: null, status: 'Assigned',
    outcome: null, lowestBid: null, lastReported: '2026-10-18',
    workDone: 'Visiting BOC head office for Omni Pay demo and presentation.',
  },
  {
    id: 'OP-029', team: 'CICS', customer: 'BOC (Bank of Ceylon)',
    project: 'Supply, delivery, installation, commissioning & maintenance of 366 network routers with SD-WAN (OPEX or CAPEX)',
    owner: 'Anuththara Wijebandara', sales: 'Malika Vishwajith', presalesEngineer: 'Pramoad Pathirathna',
    budget: null, projected: null, bid: null, submissionDate: '2026-10-06', status: 'Ongoing',
    outcome: null, lowestBid: null, lastReported: '2026-10-11', workDone: 'Project.',
    flag: 'Submission date (06 Oct) has passed — outcome not reported',
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
    id: 'OP-022', team: 'DWS', customer: 'Hellman MAS',
    project: 'Design, supply and installation of network system',
    owner: 'Anuththara Wijebandara', sales: 'Chamisha Dilakshi', presalesEngineer: 'Anuththara Wijebandara',
    budget: null, projected: 240, bid: 218, submissionDate: '2026-10-07', status: 'Submitted',
    outcome: null, lowestBid: null, lastReported: '2026-10-04', workDone: 'Complete project; bid dispatched.',
  },
  { id: 'OP-019', team: 'CICS', customer: 'Innov8', project: 'Supply & Installation of Switch', owner: 'Anuththara Wijebandara', sales: 'Udara Fernando', presalesEngineer: 'Pramoad Pathirathna', budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-20', workDone: 'Project scoping in progress.' },
  { id: 'OP-017', team: 'CICS', customer: 'Brandix Apparel', project: 'Cisco AP', owner: 'Anuththara Wijebandara', sales: 'Tharushi Madushani', presalesEngineer: 'Anuththara Wijebandara', budget: null, projected: null, bid: null, submissionDate: null, status: 'Ongoing', outcome: null, lowestBid: null, lastReported: '2026-09-14', workDone: 'Handling complete project.' },
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
  { week: '5–11 Oct', value: 2400, reported: true },
  { week: '12–18 Oct', value: 1705, reported: true },
  { week: '19–25 Oct', value: 2300, reported: true },
  { week: '26 Oct–1 Nov', value: 1500.28, reported: true },
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
  o.status !== 'Completed' &&
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
    return {
      name,
      worked: mine.length,
      pending: mine.filter((o) => o.status === 'Assigned' || o.status === 'Ongoing').length,
      submitted: mine.filter((o) => o.status === 'Submitted').length,
      submittedValue: mine.reduce((s, o) => s + (o.bid ?? 0), 0),
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
  const completed = list.filter((o) => o.status === 'Completed')
  const declined = list.filter((o) => o.status === 'Declined')
  // Match weekly mail: Projected Pipeline = sum of Winning Price; Bids = sum of Bid Price
  const projectedPipeline = list.reduce((s, o) => s + (o.projected ?? 0), 0)
  const submittedValue = list.reduce((s, o) => s + (o.bid ?? 0), 0)
  return {
    pending,
    submitted,
    completed,
    declined,
    stale: list.filter(isStale),
    unsized: list.filter((o) => bestValue(o) == null),
    pipelineValue: pending.reduce((s, o) => s + (bestValue(o) ?? 0), 0),
    projectedPipeline,
    submittedValue,
    outcomesTracked: submitted.filter((o) => o.outcome != null).length,
    total: list.length,
  }
}

/** @deprecated use opportunitiesFor(scope) via DataScopeProvider */
export const OPPORTUNITIES = OVERALL_OPPORTUNITIES
export const COVERAGE = OVERALL_COVERAGE
