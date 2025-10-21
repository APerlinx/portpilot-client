import { useState } from 'react'
import { uploadResume } from '../../lib/api'
import type { Phase } from '../../types/ui'

type UploadFileProps = {
  setError: React.Dispatch<React.SetStateAction<string | null>>
  loading: Phase
  setLoading: React.Dispatch<React.SetStateAction<Phase>>
  setUsePaste: React.Dispatch<React.SetStateAction<boolean>>
  usePaste: boolean
  setResumeText: React.Dispatch<React.SetStateAction<string>>
}

export default function UploadFile({
  setError,
  loading,
  setLoading,
  setUsePaste,
  usePaste,
  setResumeText,
}: UploadFileProps) {
  const [file, setFile] = useState<File | null>(null)

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

  return (
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
  )
}
