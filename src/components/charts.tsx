import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import type { ReactNode } from 'react'
import {
  OPPORTUNITIES, PIPELINE_TREND, bestValue, engineerStats, fmtMn, isStale, summary,
} from '../data/opportunities'

const AXIS = { fontSize: 11, fill: '#6b7280', fontFamily: 'inherit' }
const GRID = '#eceef1'
const BLUE = '#2563eb'
const GREEN = '#059669'
const AMBER = '#d97706'
const RED = '#dc2626'
const SLATE = '#64748b'

function ChartTooltip({
  active, payload, label, unit = 'Mn',
}: {
  active?: boolean
  payload?: Array<{ value?: number | string; name?: string; color?: string; dataKey?: string | number }>
  label?: string
  unit?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded border border-slate-200 bg-white px-2.5 py-2 text-left shadow-sm">
      {label && <p className="mb-1 text-[11px] text-slate-500">{label}</p>}
      {payload.map((p) => (
        <p key={String(p.dataKey ?? p.name)} className="flex items-center gap-1.5 text-[12px] text-slate-800">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color ?? BLUE }} />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-semibold tabular-nums">
            {typeof p.value === 'number' ? fmtMn(p.value) : p.value}
            {unit ? ` ${unit}` : ''}
          </span>
        </p>
      ))}
    </div>
  )
}

function ChartShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3">
        <h3 className="text-[13px] font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-[11.5px] text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

/** Weekly projected pipeline — Stripe-style area */
export function PipelineTrendChart() {
  return (
    <ChartShell title="Projected pipeline" subtitle="Weekly · Mn LKR">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={PIPELINE_TREND} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="pipFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BLUE} stopOpacity={0.12} />
              <stop offset="100%" stopColor={BLUE} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
          <XAxis dataKey="week" tick={AXIS} axisLine={false} tickLine={false} />
          <YAxis
            tick={AXIS}
            axisLine={false}
            tickLine={false}
            width={44}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v))}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              const reported = (payload?.[0]?.payload as { reported?: boolean } | undefined)?.reported
              return (
                <ChartTooltip
                  active={active}
                  label={`${label}${reported === false ? ' (est.)' : ''}`}
                  payload={(payload ?? []).map((p) => ({
                    value: Number(p.value),
                    name: 'Pipeline',
                    color: BLUE,
                    dataKey: 'value',
                  }))}
                />
              )
            }}
          />
          <Area type="monotone" dataKey="value" name="Pipeline" stroke={BLUE} strokeWidth={2} fill="url(#pipFill)"
            dot={{ r: 2.5, strokeWidth: 1.5, fill: '#fff', stroke: BLUE }} activeDot={{ r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}

/** CICS vs DWS — pipeline vs submitted bids */
export function TeamSplitChart() {
  const teams = ['CICS', 'DWS'] as const
  const data = teams.map((t) => ({
    team: t,
    Pipeline: OPPORTUNITIES
      .filter((o) => o.team === t && (o.status === 'Assigned' || o.status === 'Ongoing'))
      .reduce((s, o) => s + (bestValue(o) ?? 0), 0),
    Submitted: OPPORTUNITIES
      .filter((o) => o.team === t && o.status === 'Submitted')
      .reduce((s, o) => s + (o.bid ?? 0), 0),
  }))

  return (
    <ChartShell title="CICS vs DWS" subtitle="Active pipeline vs bids sent · Mn LKR">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={4} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
          <XAxis dataKey="team" tick={AXIS} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS} axisLine={false} tickLine={false} width={44}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v))} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f8fafc' }} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#64748b' }} iconType="circle" iconSize={7} />
          <Bar dataKey="Pipeline" fill={BLUE} radius={[3, 3, 0, 0]} />
          <Bar dataKey="Submitted" fill={GREEN} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}

/** Stage mix — donut */
export function StatusMixChart() {
  const s = summary()
  const data = [
    { name: 'Assigned', value: OPPORTUNITIES.filter((o) => o.status === 'Assigned').length, color: BLUE },
    { name: 'Ongoing', value: OPPORTUNITIES.filter((o) => o.status === 'Ongoing').length, color: AMBER },
    { name: 'Submitted', value: s.submitted.length, color: GREEN },
    { name: 'Declined', value: s.declined.length, color: RED },
  ].filter((d) => d.value > 0)

  return (
    <ChartShell title="Stage mix" subtitle="Count of opportunities">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={52} outerRadius={74} paddingAngle={2} stroke="#fff" strokeWidth={2}>
            {data.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltip
                active={active}
                unit=""
                payload={(payload ?? []).map((p) => ({
                  value: Number(p.value),
                  name: String(p.name),
                  color: p.payload?.color,
                  dataKey: p.name,
                }))}
              />
            )}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={7} />
        </PieChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}

/** Funnel-style horizontal bars: Assigned → Ongoing → Submitted */
export function StageFunnelChart() {
  const counts = [
    { stage: 'Assigned', n: OPPORTUNITIES.filter((o) => o.status === 'Assigned').length },
    { stage: 'Ongoing', n: OPPORTUNITIES.filter((o) => o.status === 'Ongoing').length },
    { stage: 'Submitted', n: OPPORTUNITIES.filter((o) => o.status === 'Submitted').length },
    { stage: 'Declined', n: OPPORTUNITIES.filter((o) => o.status === 'Declined').length },
  ]
  const max = Math.max(...counts.map((c) => c.n), 1)
  const colors = [BLUE, AMBER, GREEN, RED]

  return (
    <ChartShell title="Stage volume" subtitle="How many deals sit in each stage">
      <div className="space-y-3 pt-1">
        {counts.map((c, i) => (
          <div key={c.stage}>
            <div className="mb-1 flex justify-between text-[12px]">
              <span className="font-medium text-slate-700">{c.stage}</span>
              <span className="tabular-nums text-slate-500">{c.n}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${(c.n / max) * 100}%`, background: colors[i] }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartShell>
  )
}

/** Workload: deals worked + bids per engineer */
export function EngineerWorkloadChart() {
  const data = engineerStats()
    .map((e) => ({
      name: e.name.split(' ')[0],
      Worked: e.worked,
      Bids: e.submitted,
      Pending: e.pending,
    }))
    .sort((a, b) => b.Worked - a.Worked)

  return (
    <ChartShell title="Engineer workload" subtitle="Opportunities worked vs bids sent">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={2} barSize={18}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
          <XAxis dataKey="name" tick={AXIS} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                label={String(label)}
                unit=""
                payload={(payload ?? []).map((p) => ({
                  value: Number(p.value),
                  name: String(p.name),
                  color: p.color,
                  dataKey: String(p.dataKey ?? p.name),
                }))}
              />
            )}
            cursor={{ fill: '#f8fafc' }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={7} />
          <Bar dataKey="Worked" fill={SLATE} radius={[3, 3, 0, 0]} />
          <Bar dataKey="Bids" fill={GREEN} radius={[3, 3, 0, 0]} />
          <Bar dataKey="Pending" fill={AMBER} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}

/** Prospect value by engineer */
export function EngineerValueChart() {
  const data = engineerStats()
    .map((e) => ({ name: e.name.split(' ')[0], value: e.totalValue }))
    .sort((a, b) => b.value - a.value)

  return (
    <ChartShell title="Prospect value" subtitle="Sized opportunities · Mn LKR">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }} barSize={16}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
          <XAxis type="number" tick={AXIS} axisLine={false} tickLine={false}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v))} />
          <YAxis type="category" dataKey="name" tick={AXIS} axisLine={false} tickLine={false} width={64} />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                label={String(label)}
                payload={(payload ?? []).map((p) => ({
                  value: Number(p.value),
                  name: 'Value',
                  color: BLUE,
                  dataKey: 'value',
                }))}
              />
            )}
            cursor={{ fill: '#f8fafc' }}
          />
          <Bar dataKey="value" fill={BLUE} radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  )
}

/** Data completeness — what % of fields are filled */
export function DataQualityChart() {
  const total = OPPORTUNITIES.length
  const withValue = OPPORTUNITIES.filter((o) => bestValue(o) != null).length
  const withSales = OPPORTUNITIES.filter((o) => o.sales != null).length
  const withOutcome = OPPORTUNITIES.filter((o) => o.status === 'Submitted' && o.outcome != null).length
  const submitted = OPPORTUNITIES.filter((o) => o.status === 'Submitted').length
  const stale = OPPORTUNITIES.filter(isStale).length

  const rows = [
    { label: 'Has value estimate', pct: Math.round((withValue / total) * 100), note: `${withValue}/${total}` },
    { label: 'Has salesperson', pct: Math.round((withSales / total) * 100), note: `${withSales}/${total}` },
    { label: 'Bid outcome logged', pct: submitted ? Math.round((withOutcome / submitted) * 100) : 0, note: `${withOutcome}/${submitted}` },
    { label: 'Fresh (not stale)', pct: Math.round(((total - stale) / total) * 100), note: `${total - stale}/${total}` },
  ]

  return (
    <ChartShell title="Data completeness" subtitle="What we can trust for decisions">
      <div className="space-y-3.5 pt-1">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-1 flex items-baseline justify-between gap-2 text-[12px]">
              <span className="font-medium text-slate-700">{r.label}</span>
              <span className="tabular-nums text-slate-500">{r.pct}% · {r.note}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${r.pct}%`,
                  background: r.pct < 40 ? RED : r.pct < 70 ? AMBER : GREEN,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartShell>
  )
}
