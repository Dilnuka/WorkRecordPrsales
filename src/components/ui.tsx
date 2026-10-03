import type { ReactNode, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes } from 'react'
import type { Status } from '../data/opportunities'
import { initials } from '../data/opportunities'

/** Flat bordered surface */
export function Card({
  children, className = '', interactive = false,
}: { children: ReactNode; className?: string; interactive?: boolean }) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white ${
        interactive ? 'transition-colors hover:border-slate-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function PageIntro({ children }: { children: ReactNode }) {
  return <p className="text-[13px] text-slate-500">{children}</p>
}

const STATUS_STYLES: Record<Status, string> = {
  Assigned: 'bg-blue-50 text-blue-700',
  Ongoing: 'bg-amber-50 text-amber-800',
  Submitted: 'bg-emerald-50 text-emerald-700',
  Declined: 'bg-red-50 text-red-700',
}
const STATUS_DOTS: Record<Status, string> = {
  Assigned: 'bg-blue-600',
  Ongoing: 'bg-amber-500',
  Submitted: 'bg-emerald-600',
  Declined: 'bg-red-600',
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOTS[status]}`} aria-hidden />
      {status}
    </span>
  )
}

export function StaleBadge() {
  return (
    <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100">
      Stale
    </span>
  )
}

export function NiBadge({ label = 'NI' }: { label?: string }) {
  return (
    <span title="No Information" className="inline-flex items-center rounded px-1 py-0.5 text-[10.5px] font-semibold text-red-700 bg-red-50">
      {label}
    </span>
  )
}

const AVATAR_COLORS = [
  'bg-slate-700', 'bg-blue-600', 'bg-emerald-600', 'bg-amber-600',
  'bg-cyan-700', 'bg-violet-600', 'bg-teal-700',
]

export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const color = AVATAR_COLORS[Math.abs([...name].reduce((h, c) => h * 31 + c.charCodeAt(0), 7)) % AVATAR_COLORS.length]
  const sizes = { sm: 'h-5 w-5 text-[9px]', md: 'h-7 w-7 text-[10.5px]', lg: 'h-9 w-9 text-[12px]' }
  return (
    <span title={name} aria-label={name} className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${color} ${sizes[size]}`}>
      {initials(name)}
    </span>
  )
}

export function StatCard({
  label, value, unit, sub, tone = 'default', gap, icon,
}: {
  label: string
  value: string
  unit?: string
  sub?: string
  tone?: 'default' | 'positive' | 'warning' | 'danger'
  gap?: string
  icon?: ReactNode
}) {
  const valueColor =
    tone === 'danger' ? 'text-red-600'
      : tone === 'positive' ? 'text-emerald-700'
        : tone === 'warning' ? 'text-amber-700'
          : 'text-slate-900'

  return (
    <Card className={`p-4 ${gap ? 'border-red-200' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
        {icon && <span className="text-slate-400" aria-hidden>{icon}</span>}
      </div>
      <p className={`mt-2 text-[24px] font-semibold leading-none tracking-tight tabular-nums ${valueColor}`}>
        {value}
        {unit && <span className="ml-1 text-[12px] font-medium text-slate-400">{unit}</span>}
      </p>
      {sub && <p className="mt-1.5 text-[12px] text-slate-500">{sub}</p>}
      {gap && (
        <p className="mt-2 inline-flex rounded bg-red-50 px-1.5 py-0.5 text-[11px] font-medium text-red-700">{gap}</p>
      )}
    </Card>
  )
}

export function Progress({ value, max, color = 'bg-blue-600' }: { value: number; max: number; color?: string }) {
  const pct = max === 0 ? 0 : Math.min(100, (value / max) * 100)
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function FieldSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`h-8 rounded-md border border-slate-200 bg-white px-2.5 text-[12.5px] text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${props.className ?? ''}`}
    />
  )
}

export function FieldInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-8 w-full rounded-md border border-slate-200 bg-white text-[12.5px] text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${props.className ?? ''}`}
    />
  )
}

export function SegmentButton({
  active, children, ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex h-7 items-center gap-1.5 px-2.5 text-[12px] font-medium ${
        active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
      } ${rest.className ?? ''}`}
    >
      {children}
    </button>
  )
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
      <p className="text-[13px] font-medium text-slate-600">{title}</p>
      {hint && <p className="mt-1 text-[12px] text-slate-400">{hint}</p>}
    </div>
  )
}
