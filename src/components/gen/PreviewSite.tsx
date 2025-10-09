import { useRef, useState } from 'react'
import { uploadResume, generateFullPage, publishSite } from '../../lib/api'

export default function PreviewSite() {
  const [file, setFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState('')
  const [loading, setLoading] = useState<
    'idle' | 'extract' | 'generate' | 'publish'
  >('idle')
  const [error, setError] = useState<string | null>(null)
  const [html, setHtml] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [usePaste, setUsePaste] = useState(false)

  async function onExtract() {
    if (!file) return
    try {
      setError(null)
      setLoading('extract')
      const res = await uploadResume(file)
      if (!res.ok || !res.text)
        throw new Error(res.error || 'Could not extract text')
      setResumeText(res.text)
    } catch (e) {
      if (e instanceof Error) setError(e.message || 'Extraction failed')
    } finally {
      setLoading('idle')
    }
  }

  async function onGenerate() {
    const text = resumeText.trim()
    if (!text) return setError('Please upload a resume or paste text first.')
    try {
      setError(null)
      setLoading('generate')
      setPreviewLoading(true)
      const html = await generateFullPage(text)
      setHtml(html)

      const iframe = iframeRef.current
      if (iframe) {
        const doc = iframe.contentDocument
        if (doc) {
          doc.open()
          doc.write(html)
          doc.close()
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message || 'Generation failed')
      } else {
        setError('Generation failed')
      }
      setPreviewLoading(false)
    } finally {
      setLoading('idle')
    }
  }

  async function onPublish() {
    if (!html) return
    try {
      setError(null)
      setLoading('publish')
      const res = await publishSite({ html }) // your stub
      if (!res.ok) throw new Error(res.notice || 'Publishing not wired yet')
      alert(res.url ? `Published at ${res.url}` : 'Publish OK')
    } catch (e) {
      if (e instanceof Error) setError(e.message || 'Publish failed')
    } finally {
      setLoading('idle')
    }
  }

  function resetForPremiumTryAgain() {
    setHtml(null)
    const doc = iframeRef.current?.contentDocument
    if (doc) {
      doc.open()
      doc.write('<!doctype html><title>…</title>')
      doc.close()
    }
  }

  return (
    <div className="mx-auto max-w-8xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Preview your site</h1>
      <p className="mt-2 text-gray-500">
        Upload your resume, generate a one-page portfolio, preview it below,
        then publish.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Left controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium">
              Upload resume (PDF/DOCX/TXT)
            </label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 w-full rounded border px-3 py-2"
            />
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={onExtract}
                disabled={!file || loading !== 'idle'}
                className="rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
              >
                {loading === 'extract' ? 'Extracting…' : 'Extract text'}
              </button>
              <button
                type="button"
                onClick={() => setUsePaste((v) => !v)}
                className="text-sm text-gray-600 underline"
              >
                {usePaste ? 'Hide paste area' : 'Paste resume text instead'}
              </button>
            </div>
          </div>

          {usePaste && (
            <div>
              <label className="block text-sm font-medium">
                Paste resume text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={8}
                className="mt-1 w-full rounded border px-3 py-2 font-mono text-sm"
                placeholder="Paste your resume text here…"
              />
            </div>
          )}

          <div>
            <button
              onClick={onGenerate}
              disabled={!resumeText.trim() || loading !== 'idle'}
              className="rounded bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-50"
            >
              {loading === 'generate' ? 'Generating…' : 'Generate My Site'}
            </button>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {html && (
            <div className="space-y-3">
              <div className="text-sm text-gray-500">Looks good?</div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onPublish}
                  disabled={loading === 'publish'}
                  className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {loading === 'publish' ? 'Publishing…' : 'Publish'}
                </button>

                <button
                  onClick={resetForPremiumTryAgain}
                  className="rounded border px-4 py-2"
                  title="Premium"
                >
                  Try again{' '}
                  <span className="ml-1 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                    Premium
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Preview with loader overlay */}
        <div className="relative min-h-[480px] overflow-hidden rounded-xl border shadow-sm">
          {/* overlay */}
          {previewLoading && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-white/70 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-gray-700">
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 0 1 8-8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Building your preview…</span>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            title="site-preview"
            className="h-[80vh] w-full"
            sandbox="allow-same-origin allow-popups allow-forms allow-pointer-lock allow-scripts"
            onLoad={() => {
              // when new HTML is written, load fires → hide loader
              setPreviewLoading(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}
