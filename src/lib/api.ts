import { fetchJson } from './http'
import type { ParseResponse, ParseError } from '../types/portfolio'

const API = import.meta.env.VITE_API_URL

export async function uploadResume(file: File) {
  const fd = new FormData()
  fd.append('resume', file)
  const res = await fetch(`${API}/api/upload-resume`, {
    method: 'POST',
    body: fd,
  })
  return res.json() as Promise<{ ok: boolean; text?: string; error?: string }>
}

export async function parseResume(text: string) {
  return fetchJson<ParseResponse | ParseError>(`${API}/api/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
}
