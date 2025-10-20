import { useRef, useState } from 'react'
import UploadFile from '../components/GenPage/UploadFile'
import Generate from '../components/GenPage/Generate'
import Publish from '../components/GenPage/Publish'
import RetryButton from '../components/GenPage/RetryButton'

export default function Gen() {
  const [resumeText, setResumeText] = useState('')
  const [loading, setLoading] = useState<
    'idle' | 'extract' | 'generate' | 'publish'
  >('idle')
  const [error, setError] = useState<string | null>(null)
  const [html, setHtml] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [usePaste, setUsePaste] = useState(false)

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
          <UploadFile
            setError={setError}
            loading={loading}
            setLoading={setLoading}
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
                className="mt-1 w-full rounded border px-3 py-2 font-mono text-sm"
                placeholder="Paste your resume text here…"
              />
            </div>
          )}

          <div>
            <Generate
              resumeText={resumeText}
              loading={loading}
              setError={setError}
              setLoading={setLoading}
              setPreviewLoading={setPreviewLoading}
              setHtml={setHtml}
              iframeRef={iframeRef}
            />
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
                <Publish
                  html={html}
                  loading={loading}
                  setError={setError}
                  setLoading={setLoading}
                />

                <RetryButton setHtml={setHtml} iframeRef={iframeRef} />
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
              setPreviewLoading(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}
