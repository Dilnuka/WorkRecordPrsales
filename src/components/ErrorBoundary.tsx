import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props { children: ReactNode }
interface State { hasError: boolean; message?: string }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[VSIS Presales]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh items-center justify-center bg-[#f7f7f8] p-6">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-[var(--shadow-card)]">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle size={22} />
            </span>
            <h1 className="mt-4 text-lg font-semibold text-zinc-900">Something went wrong</h1>
            <p className="mt-2 text-[13.5px] text-zinc-500">
              The dashboard hit an unexpected error. Reload to continue.
            </p>
            {this.state.message && (
              <p className="mt-3 rounded-lg bg-zinc-50 px-3 py-2 font-mono text-[11.5px] text-zinc-500">
                {this.state.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-[13.5px] font-semibold text-white transition hover:bg-indigo-700"
            >
              <RefreshCw size={15} /> Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
