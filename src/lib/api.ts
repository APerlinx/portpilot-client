import { API, postForm, postJSON } from './http'

export async function uploadResume(
  file: File
): Promise<{ ok: boolean; text?: string; error?: string }> {
  const fd = new FormData()
  fd.append('resume', file)
  return postForm<{ ok: boolean; text?: string; error?: string }>(
    `${API}/api/upload-resume`,
    fd
  )
}

export async function generateFullPage(resumeText: string): Promise<string> {
  return postJSON<string>(`${API}/api/generate-site-html`, { resumeText })
}

export async function publishSite(payload: {
  html: string
  meta?: Record<string, unknown>
}): Promise<{ ok: boolean; url?: string; notice?: string }> {
  return postJSON(`${API}/api/publish`, payload)
}
