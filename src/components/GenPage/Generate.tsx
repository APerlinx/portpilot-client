import type { RefObject } from 'react'
import { generateFullPage } from '../../lib/api'

type GenerateProps = {
  resumeText: string
  loading: 'idle' | 'extract' | 'generate' | 'publish'
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setLoading: React.Dispatch<
    React.SetStateAction<'idle' | 'extract' | 'generate' | 'publish'>
  >
  setPreviewLoading: React.Dispatch<React.SetStateAction<boolean>>
  setHtml: React.Dispatch<React.SetStateAction<string | null>>
  iframeRef: RefObject<HTMLIFrameElement | null>
}

export default function Generate({
  resumeText,
  loading,
  setError,
  setLoading,
  setPreviewLoading,
  setHtml,
  iframeRef,
}: GenerateProps) {
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

  return (
    <>
      <button
        onClick={onGenerate}
        disabled={!resumeText.trim() || loading !== 'idle'}
        className="rounded bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-50"
      >
        {loading === 'generate' ? 'Generating…' : 'Generate My Site'}
      </button>
    </>
  )
}
