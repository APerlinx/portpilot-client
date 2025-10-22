import { useEffect, useState } from 'react'
import UploadFile from '../components/GenPage/UploadFile'
import Publish from '../components/GenPage/Publish'
import RetryButton from '../components/GenPage/RetryButton'
import PreviewModal from '../components/PreviewModal'
import Generate from '../components/GenPage/Generate'
import type { Phase } from '../types/ui'
import { Link } from 'react-router-dom'

export default function Gen() {
  // left panel state
  const [resumeText, setResumeText] = useState('')
  const [usePaste, setUsePaste] = useState(false)

  // global flow
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState<string | null>(null)

  // result + modal
  const [html, setHtml] = useState<string | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // progress (drives the big right panel)
  const [progress, setProgress] = useState(0)
  const [progressLabel, setProgressLabel] = useState('Waiting…')

  // build blob URL when html changes (warning-free)
  useEffect(() => {
    if (!html) {
      setBlobUrl(null)
      return
    }
    const url = URL.createObjectURL(
      new Blob([html], { type: 'text/html;charset=utf-8' })
    )
    setBlobUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [html])

  function onTryAgain() {
    setError(null)
    setHtml(null)
    setProgress(0)
    setProgressLabel('Waiting…')
    setPhase('idle')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-bg text-text">
      {/* App chrome / top bar */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-primary/5"
              aria-label="Back to home"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Home
            </Link>
            <span className="font-semibold">PortPilot</span>
            <span className="text-muted">/</span>
            <span className="text-text-weak">Generate</span>
          </div>

          <div className="text-sm text-text-weak">
            {phase === 'generate'
              ? 'Generating…'
              : html
              ? 'Preview ready'
              : 'Idle'}
          </div>
        </div>
      </header>

      {/* Main app layout */}
      <main className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* LEFT: Sticky control panel */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="sticky top-[5rem]">
            <div className="rounded-2xl border bg-white shadow-sm ring-1 ring-black/5">
              <div className="border-b px-5 py-4">
                <h1 className="text-xl font-semibold tracking-tight">
                  Build your site
                </h1>
                <p className="mt-1 text-sm text-text-weak">
                  Upload, generate, then preview & publish.
                </p>
              </div>

              <div className="space-y-6 px-5 py-5">
                <UploadFile
                  setError={setError}
                  loading={phase}
                  setLoading={setPhase}
                  setUsePaste={setUsePaste}
                  usePaste={usePaste}
                  setResumeText={setResumeText}
                />

                {usePaste && (
                  <div>
                    <label className="block text-sm font-medium">
                      Paste resume text
                    </label>
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      rows={10}
                      className="mt-1 w-full rounded-lg border px-3 py-2 font-mono text-sm"
                      placeholder="Paste your resume text here…"
                    />
                  </div>
                )}

                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Generate button */}
                <div className="pt-1">
                  <Generate
                    resumeText={resumeText}
                    phase={phase}
                    setPhase={setPhase}
                    setHtml={setHtml}
                    setError={setError}
                    setProgress={setProgress}
                    setProgressLabel={setProgressLabel}
                    setModalOpen={setModalOpen}
                  />
                </div>
              </div>
            </div>

            {/* After success: big actions (always visible while scrolling) */}
            {html && phase !== 'generate' && (
              <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-black/5">
                <h3 className="text-base font-semibold">Next steps</h3>
                <p className="mt-1 text-sm text-text-weak">
                  Open the large preview, publish, or try again.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-primary/10 px-5 py-3 text-sm font-medium text-primary shadow-sm transition hover:bg-primary/20"
                  >
                    Open Preview
                  </button>

                  <Publish
                    html={html}
                    loading={phase}
                    setError={setError}
                    setLoading={setPhase}
                  />

                  <RetryButton setHtml={setHtml} onClickOverride={onTryAgain} />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT: Spacious work surface */}
        <section className="col-span-12 lg:col-span-8">
          <div className="relative min-h-[72vh] overflow-hidden rounded-3xl border bg-white shadow-lg ring-1 ring-black/5">
            {/* Background accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -top-10 h-64 rounded-[48px] opacity-40 blur-3xl"
              style={{
                background:
                  'radial-gradient(60% 50% at 30% 20%, rgb(var(--color-main-rgb) / 0.18), transparent), radial-gradient(50% 50% at 70% 20%, rgb(var(--color-third-rgb) / 0.12), transparent)',
              }}
            />

            {/* Content states */}
            {phase === 'generate' && (
              <div className="relative grid min-h-[72vh] place-items-center p-10">
                <div className="w-full max-w-xl">
                  <div className="mb-4 text-center text-sm font-medium text-gray-700">
                    {progressLabel}
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-primary transition-[width]"
                      style={{
                        width: `${Math.max(
                          3,
                          Math.min(100, Math.round(progress))
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center text-xs text-gray-500">
                    {Math.round(progress)}%
                  </div>

                  {/* shimmering preview placeholder */}
                  <div className="mt-8 space-y-3">
                    <div className="h-10 w-2/3 animate-pulse rounded-md bg-gray-100" />
                    <div className="h-40 w-full animate-pulse rounded-xl bg-gray-100" />
                    <div className="h-40 w-full animate-pulse rounded-xl bg-gray-100" />
                  </div>
                </div>
              </div>
            )}

            {phase !== 'generate' && !html && (
              <div className="relative grid min-h-[72vh] place-items-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white shadow-lg ring-4 ring-black/5">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2.5l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4L6 8.5l4.4-1.6L12 2.5z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold">Ready when you are</h2>
                  <p className="mt-1 text-sm text-text-weak">
                    Click{' '}
                    <span className="font-medium">Generate my website</span> to
                    build a live preview.
                  </p>
                </div>
              </div>
            )}

            {phase !== 'generate' && html && (
              <div className="relative grid min-h-[72vh] place-items-center p-10">
                <div className="w-full max-w-xl text-center">
                  <h2 className="text-lg font-semibold">Preview is ready</h2>
                  <p className="mt-1 text-sm text-text-weak">
                    Open the large preview, publish, or start over with changes.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-primary/10 px-6 py-3 text-sm font-medium text-primary shadow-sm transition hover:bg-primary/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-fullscreen-icon lucide-fullscreen"
                      >
                        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                        <rect width="10" height="8" x="7" y="8" rx="1" />
                      </svg>
                      Open Preview
                    </button>

                    <Publish
                      html={html}
                      loading={phase}
                      setError={setError}
                      setLoading={setPhase}
                    />

                    <RetryButton
                      setHtml={setHtml}
                      onClickOverride={onTryAgain}
                    />
                  </div>

                  {/* Quick links */}
                  {blobUrl && (
                    <div className="mt-5 flex items-center justify-center gap-3 text-xs text-text-weak">
                      <a
                        className="underline-offset-2 hover:underline"
                        href={blobUrl}
                        target="_blank"
                        rel="noopener"
                      >
                        Open in new tab
                      </a>
                      <span>•</span>
                      <a
                        className="underline-offset-2 hover:underline"
                        href={blobUrl}
                        download="portfolio-preview.html"
                      >
                        Download HTML
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Full-screen preview modal */}
      <PreviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Portfolio Preview"
        html={html}
        blobUrl={blobUrl}
      />
    </div>
  )
}
