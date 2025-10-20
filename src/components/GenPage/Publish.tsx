import { publishSite } from '../../lib/api'

type PublishProps = {
  html: string | null
  loading: 'idle' | 'extract' | 'generate' | 'publish'
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setLoading: React.Dispatch<
    React.SetStateAction<'idle' | 'extract' | 'generate' | 'publish'>
  >
}

export default function Publish({
  html,
  loading,
  setError,
  setLoading,
}: PublishProps) {
  async function onPublish() {
    if (!html) return
    try {
      setError(null)
      setLoading('publish')
      const res = await publishSite({ html })
      if (!res.ok) throw new Error(res.notice || 'Publishing not wired yet')
      alert(res.url ? `Published at ${res.url}` : 'Publish OK')
    } catch (e) {
      if (e instanceof Error) setError(e.message || 'Publish failed')
    } finally {
      setLoading('idle')
    }
  }
  return (
    <>
      <button
        onClick={onPublish}
        disabled={loading === 'publish'}
        className="rounded bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading === 'publish' ? 'Publishing…' : 'Publish'}
      </button>
    </>
  )
}
