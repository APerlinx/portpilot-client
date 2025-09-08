// client/src/components/ResumeFlow.tsx
import { useState } from 'react'

/* =================== Types =================== */

type Link = { label?: string; url: string }

type Project = {
  name: string
  description?: string
  tech?: string[]
  link?: string
}
type Experience = {
  company?: string
  role?: string
  start?: string
  end?: string
  bullets?: string[]
}
type Education = {
  school?: string
  degree?: string
  start?: string
  end?: string
  details?: string[]
}
type Certification = {
  name: string
  issuer?: string
  year?: string
  link?: string
}
type Publication = {
  title: string
  outlet?: string
  year?: string
  link?: string
}
type Award = { title: string; issuer?: string; year?: string }
type Language = { name: string; level?: string }

export type Profile = {
  name: string
  title?: string
  summary?: string
  contacts?: { links?: Link[] }
  projects?: Project[]
  experience?: Experience[]
  education?: Education[]
  certifications?: Certification[]
  publications?: Publication[]
  awards?: Award[]
  languages?: Language[]
  skills?: string[]
  interests?: string[]
}

type ThemeTokens = {
  accentFrom?: string
  accentTo?: string
  headingFont?: string
  bodyFont?: string
}

type UploadRes =
  | { ok: true; text: string; links?: string[] }
  | { ok: false; error: string }
type ParseRes =
  | { ok: true; parsed: Profile | string }
  | { ok: false; error: string; issues?: unknown }

/* =================== API helpers =================== */

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function apiUploadResume(file: File): Promise<UploadRes> {
  const fd = new FormData()
  fd.append('resume', file)
  const res = await fetch(`${API}/api/upload-resume`, {
    method: 'POST',
    body: fd,
  })
  return res.json()
}

async function apiParse(text: string, links: string[] = []): Promise<ParseRes> {
  const res = await fetch(`${API}/api/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, links }),
  })
  return res.json()
}

async function apiPreviewSite(
  profile: Profile,
  theme?: ThemeTokens,
  options?: { allowResumeDownload?: boolean; resumeUrl?: string }
) {
  const res = await fetch(`${API}/api/preview-site`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, theme, options }),
  })
  if (!res.ok) throw new Error('Preview failed')
  return res.text()
}

async function apiThemeSuggest(): Promise<ThemeTokens> {
  const res = await fetch(`${API}/api/theme-suggest`)
  const json = await res.json()
  return json.theme || {}
}

/* =================== UI: Preview Modal =================== */

function PreviewModal({
  html,
  onClose,
}: {
  html: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-semibold">Preview</h3>
          <button
            onClick={onClose}
            className="rounded px-3 py-1 text-sm hover:bg-gray-100"
          >
            Close
          </button>
        </div>
        <iframe
          title="Generated Site Preview"
          className="h-[80vh] w-full"
          srcDoc={html}
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts"
        />
      </div>
    </div>
  )
}

/* =================== Main Component =================== */

type Step = 'idle' | 'uploading' | 'parsing' | 'previewing'

export default function ResumeFlow() {
  // data
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [urlHints, setUrlHints] = useState<string[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)

  // theming + resume download option
  const [theme, setTheme] = useState<ThemeTokens>({})
  const [allowResumeDownload, setAllowResumeDownload] = useState(false)
  const [resumeUrl, setResumeUrl] = useState('')

  // ui
  const [step, setStep] = useState<Step>('idle')
  const [error, setError] = useState<string | null>(null)
  const [previewHtml, setPreviewHtml] = useState<string | null>(null)

  const busy = step !== 'idle'

  /* ---------- Handlers ---------- */

  async function onExtract() {
    if (!file) return
    setError(null)
    setStep('uploading')
    setProfile(null)
    setPreviewHtml(null)

    const res = await apiUploadResume(file)
    setStep('idle')

    if (!res.ok) return setError(res.error)
    setText(res.text)
    setUrlHints(res.links ?? [])
  }

  async function onParse() {
    if (!text.trim())
      return setError('No extracted text. Upload a resume first.')
    setError(null)
    setStep('parsing')
    setProfile(null)
    setPreviewHtml(null)

    const res = await apiParse(text, urlHints)
    setStep('idle')

    if (!res.ok) {
      setError(res.error)
      // optional: console.warn("Zod issues:", res.issues);
      return
    }
    if (typeof res.parsed === 'string') {
      setError('Parser returned unstructured text. Try DOCX or a clearer PDF.')
      return
    }
    setProfile(res.parsed)
  }

  async function onPreview() {
    if (!profile) return setError('Parse a profile first.')
    setError(null)
    setStep('previewing')
    try {
      const html = await apiPreviewSite(
        profile,
        Object.keys(theme).length ? theme : undefined,
        allowResumeDownload && resumeUrl
          ? { allowResumeDownload: true, resumeUrl }
          : undefined
      )
      setPreviewHtml(html)
    } catch (e: any) {
      setError(e.message || 'Preview failed')
    } finally {
      setStep('idle')
    }
  }

  async function onSuggestTheme() {
    try {
      const t = await apiThemeSuggest()
      setTheme(t)
      // optionally auto-preview if profile ready:
      // if (profile) onPreview();
    } catch (e) {
      setError('Theme suggest failed')
    }
  }

  /* ---------- Render ---------- */

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Generate your portfolio website
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT: Controls */}
        <div className="space-y-5">
          {/* Upload */}
          <div>
            <label className="block text-sm font-medium">
              Upload resume (PDF/DOCX/TXT)
            </label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null)
                setError(null)
                setText('')
                setUrlHints([])
                setProfile(null)
                setPreviewHtml(null)
              }}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onExtract}
              disabled={!file || busy}
              className="rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
            >
              {step === 'uploading' ? 'Extracting…' : 'Extract text'}
            </button>

            <button
              onClick={onParse}
              disabled={!text || busy}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {step === 'parsing' ? 'Parsing…' : 'Parse to profile'}
            </button>

            <button
              onClick={onPreview}
              disabled={!profile || busy}
              className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {step === 'previewing' ? 'Preparing preview…' : 'Preview website'}
            </button>

            <button
              onClick={onSuggestTheme}
              disabled={busy}
              className="rounded border px-4 py-2 text-gray-700 hover:bg-gray-50"
              title="Suggest colors + fonts"
            >
              Theme Suggest
            </button>
          </div>

          {/* Options */}
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={allowResumeDownload}
                onChange={(e) => setAllowResumeDownload(e.target.checked)}
              />
              Add résumé download button to my site
            </label>
            {allowResumeDownload && (
              <input
                type="url"
                placeholder="https://example.com/your-resume.pdf"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
              />
            )}
          </div>

          {/* Status / Errors */}
          {busy && <div className="text-sm text-gray-500">Working…</div>}
          {error && (
            <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Debug panel (optional) */}
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-gray-600">
              Debug
            </summary>
            <div className="mt-3 space-y-3">
              {text && (
                <div>
                  <div className="text-xs font-semibold text-gray-500">
                    Extracted text
                  </div>
                  <pre className="mt-1 max-h-52 overflow-auto rounded border bg-gray-50 p-3 text-xs">
                    {text}
                  </pre>
                </div>
              )}
              {profile && (
                <div>
                  <div className="text-xs font-semibold text-gray-500">
                    Parsed profile (JSON)
                  </div>
                  <pre className="mt-1 max-h-52 overflow-auto rounded border bg-gray-50 p-3 text-xs">
                    {JSON.stringify(profile, null, 2)}
                  </pre>
                </div>
              )}
              {Object.keys(theme).length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-gray-500">
                    Theme
                  </div>
                  <pre className="mt-1 rounded border bg-gray-50 p-3 text-xs">
                    {JSON.stringify(theme, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </details>
        </div>

        {/* RIGHT: Simple summary panel */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          {!profile ? (
            <div className="grid h-full place-items-center text-gray-500">
              <p>No preview yet — upload → extract → parse → preview.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                Profile ready. Click{' '}
                <span className="font-semibold">Preview website</span> to see
                it.
              </div>
              <ul className="text-sm text-gray-700">
                <li>
                  • Name: <span className="font-medium">{profile.name}</span>
                </li>
                {profile.title && <li>• Title: {profile.title}</li>}
                {profile.contacts?.links?.length ? (
                  <li>
                    • Links:{' '}
                    {profile.contacts.links
                      .map((l) => l.label || l.url)
                      .join(', ')}
                  </li>
                ) : null}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Live preview modal */}
      {previewHtml && (
        <PreviewModal html={previewHtml} onClose={() => setPreviewHtml(null)} />
      )}
    </section>
  )
}
