import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PreviewModalProps = {
  html: string | null
  blobUrl?: string | null
  open: boolean
  onClose: () => void
  title?: string
}

export default function PreviewModal({
  html,
  blobUrl: externalBlobUrl,
  open,
  onClose,
  title = 'Preview',
}: PreviewModalProps) {
  const [internalBlobUrl, setInternalBlobUrl] = useState<string | null>(null)
  const blobUrl = externalBlobUrl ?? internalBlobUrl
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!open) return
    if (externalBlobUrl) {
      setLoading(true)
      return
    }
    if (!html) return
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    setInternalBlobUrl(url)
    setLoading(true)
    return () => {
      URL.revokeObjectURL(url)
      setInternalBlobUrl(null)
      setLoading(false)
    }
  }, [open, html, externalBlobUrl])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="mx-auto my-6 h-[88vh] w-[95vw] max-w-[1400px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 bg-neutral-900/70 px-5 py-3 text-white">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">{title}</h3>
            <p className="truncate text-xs text-white/70">
              Live rendering of your generated site
            </p>
          </div>
          <div className="flex items-center gap-2">
            {blobUrl && (
              <>
                <a
                  href={blobUrl}
                  target="_blank"
                  rel="noopener"
                  className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                >
                  Open in new tab
                </a>
                <a
                  href={blobUrl}
                  download="portfolio-preview.html"
                  className="rounded-lg bg-white/15 px-3 py-2 text-sm text-white hover:bg-white/25"
                >
                  Download HTML
                </a>
              </>
            )}
            <button className="rounded-lg bg-white/15 px-3 py-2 text-sm text-white hover:bg-white/25">
              Fix
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-white/15 px-3 py-2 text-sm text-white hover:bg-white/25"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative h-[calc(88vh-56px)] w-full bg-neutral-950">
          {loading && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            </div>
          )}
          {blobUrl && (
            <iframe
              title="Preview"
              src={blobUrl}
              className="h-full w-full"
              sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-pointer-lock allow-scripts"
              onLoad={() => setLoading(false)}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
