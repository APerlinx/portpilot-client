import { useEffect, useState } from 'react'
import UploadFile from '../components/GenPage/UploadFile'
import Publish from '../components/GenPage/Publish'
import RetryButton from '../components/GenPage/RetryButton'
import PreviewModal from '../components//GenPage/PreviewModal'
import Generate from '../components/GenPage/Generate'
import type { Phase } from '../types/ui'

export default function Gen() {
  const [resumeText, setResumeText] = useState('')
  const [usePaste, setUsePaste] = useState(false)

  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState<string | null>(null)

  const [html, setHtml] = useState<string | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  const [progress, setProgress] = useState(0)
  const [progressLabel, setProgressLabel] = useState('Waiting…')

  const [modalOpen, setModalOpen] = useState(false)

  // Build blob URL when html changes (warning-free)
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
    <div className="relative mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Preview your site</h1>
        <p className="mt-2 text-gray-600">
          Upload your resume, generate a polished one-page portfolio, then
          preview and publish.
        </p>
      </header>

      <div className="rounded-2xl border bg-white shadow-sm ring-1 ring-black/5">
        <div className="grid gap-10 p-6 lg:grid-cols-2 lg:p-8">
          {/* Left controls */}
          <div className="space-y-6">
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
                  rows={8}
                  className="mt-1 w-full rounded-md border px-3 py-2 font-mono text-sm"
                  placeholder="Paste your resume text here…"
                />
              </div>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="pt-1">
              <Generate
                resumeText={resumeText}
                phase={phase}
                setPhase={setPhase}
                setHtml={setHtml}
                setError={setError}
                setProgress={setProgress}
                setProgressLabel={setProgressLabel}
                setModalOpen={setModalOpen} // auto-open modal on success (optional)
              />
            </div>
          </div>

          {/* Right status panel */}
          <div className="relative overflow-hidden rounded-xl border bg-gradient-to-b from-gray-50 to-white">
            {phase === 'generate' && (
              <div className="grid h-full place-items-center p-10">
                <div className="w-full max-w-md">
                  <div className="mb-3 text-center text-sm font-medium text-gray-700">
                    {progressLabel}
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-black transition-[width]"
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
                  <div className="mt-6 h-28 animate-pulse rounded-xl bg-gray-100" />
                </div>
              </div>
            )}

            {phase !== 'generate' && !html && (
              <div className="grid h-full place-items-center p-10 text-center">
                <div>
                  <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-black/90 text-white shadow-lg ring-4 ring-black/5">
                    <div className="grid h-full place-items-center">
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
                  </div>
                  <h3 className="text-lg font-semibold">Ready to generate</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Click{' '}
                    <span className="font-medium">Generate my website</span> to
                    build a live preview.
                  </p>
                </div>
              </div>
            )}

            {phase !== 'generate' && html && (
              <div className="grid place-items-center p-8">
                <div className="w-full max-w-xl">
                  <h3 className="text-center text-lg font-semibold">
                    Your preview is ready
                  </h3>
                  <p className="mt-1 text-center text-sm text-gray-600">
                    Open the large preview, publish, or try again with tweaks.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium shadow-sm transition hover:bg-gray-50"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="currentColor"
                      >
                        <path d="M4 5h16v14H4z" />
                        <path d="M7 8h10v8H7z" fill="white" />
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
