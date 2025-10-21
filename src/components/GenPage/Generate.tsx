// src/components/GenPage/Generate.tsx
import React from 'react'
import type { Phase } from '../../types/ui'
import { generateFullPage } from '../../lib/api'

type Props = {
  resumeText: string
  phase: Phase
  setPhase: React.Dispatch<React.SetStateAction<Phase>>
  setHtml: React.Dispatch<React.SetStateAction<string | null>>
  setError: (msg: string | null) => void

  // progress hooks (owned by parent so the overlay can use them)
  setProgress: React.Dispatch<React.SetStateAction<number>>
  setProgressLabel: React.Dispatch<React.SetStateAction<string>>
  // optional: open modal after success
  setModalOpen?: (v: boolean) => void
}

export default function Generate({
  resumeText,
  phase,
  setPhase,
  setHtml,
  setError,
  setProgress,
  setProgressLabel,
  setModalOpen,
}: Props) {
  const busy = phase === 'generate'
  const canGenerate = !!resumeText.trim() && !busy

  async function onGenerate() {
    if (!resumeText.trim()) {
      setError('Please upload or paste your resume text first.')
      return
    }
    setError(null)
    setHtml(null)
    setPhase('generate')
    setProgress(3)
    setProgressLabel('Analyzing resume…')

    let cancelled = false
    let p = 3
    const tick = () => {
      if (cancelled) return
      const step = 1 + Math.random() * 2
      p = Math.min(p + step, 88)
      setProgress(p)
      if (p < 88) timer = window.setTimeout(tick, 420 + Math.random() * 300)
    }
    let timer = window.setTimeout(tick, 420)

    try {
      setProgressLabel('Generating site layout…')

      const htmlText = await generateFullPage(resumeText)

      setProgress(100)
      setProgressLabel('Finalizing…')

      setTimeout(() => {
        setHtml(htmlText)
        setPhase('idle')
        setModalOpen?.(true)
      }, 250)
    } catch (e: unknown) {
      setPhase('idle')
      setHtml(null)
      setProgress(0)
      setProgressLabel('Waiting…')
      const msg = e instanceof Error ? e.message : String(e)
      setError(msg || 'Generation failed')
    } finally {
      cancelled = true
      clearTimeout(timer)
    }
  }

  return (
    <button
      type="button"
      onClick={onGenerate}
      disabled={!canGenerate}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white shadow-lg transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.5l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4L6 8.5l4.4-1.6L12 2.5zM18.5 13l.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9.9-2.5zM4.6 13.5L5.3 15l1.5.7-1.5.7-.7 1.5-.7-1.5L2 15.7 3.6 15l1-1.5z" />
      </svg>
      {busy ? 'Generating…' : 'Generate my website'}
    </button>
  )
}
