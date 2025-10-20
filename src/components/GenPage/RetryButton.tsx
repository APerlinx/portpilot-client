import type { RefObject } from 'react'

type RetryButtonProps = {
  setHtml: React.Dispatch<React.SetStateAction<string | null>>
  iframeRef: RefObject<HTMLIFrameElement | null>
}

export default function RetryButton({ setHtml, iframeRef }: RetryButtonProps) {
  function onRetry() {
    setHtml(null)
    const doc = iframeRef.current?.contentDocument
    if (doc) {
      doc.open()
      doc.write('<!doctype html><title>…</title>')
      doc.close()
    }
  }
  return (
    <>
      <button
        onClick={onRetry}
        className="rounded border px-4 py-2"
        title="Premium"
      >
        Try again{' '}
        <span className="ml-1 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
          Premium
        </span>
      </button>
    </>
  )
}
