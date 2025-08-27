import { fetchJson } from './http'
import type {
  Profile,
  ParseResponse,
  ParseError,
  RewriteResponse,
  RewriteError,
} from '../types/portfolio'

const API = import.meta.env.VITE_API_URL

export async function parseResume(text: string) {
  return fetchJson<ParseResponse | ParseError>(`${API}/api/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
}

export async function rewriteProfile(profile: Profile) {
  return fetchJson<RewriteResponse | RewriteError>(`${API}/api/rewrite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile }),
  })
}
