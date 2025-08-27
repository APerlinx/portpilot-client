export interface ExperienceItem {
  company: string
  role: string
  start?: string
  end?: string
  bullets?: string[]
}

export interface Profile {
  name: string
  title?: string
  summary?: string
  experience?: ExperienceItem[]
  skills?: string[]
}

export interface ParseResponse {
  ok: true
  parsed: Profile | string
}
export interface ParseError {
  ok: false
  error: string
}
