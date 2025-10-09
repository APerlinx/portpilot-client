export const API = import.meta.env.VITE_API_URL

export async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const json = await res.json()
    if (!res.ok) throw new Error(json?.error || res.statusText)
    return json as T
  } else {
    const text = await res.text()
    if (!res.ok) throw new Error(text || res.statusText)
    return text as T
  }
}

export async function postForm<T>(url: string, fd: FormData): Promise<T> {
  const res = await fetch(url, { method: 'POST', body: fd })
  const json = await res.json()
  if (!res.ok) throw new Error(json?.error || res.statusText)
  return json as T
}
