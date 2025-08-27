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

export interface RewriteContent {
  tagline: string
  bio: string
  highlights: string[]
  experience: string[]
  skillsLine: string
}

export interface RewriteResponse {
  ok: true
  content: RewriteContent | { raw: string }
}

export interface RewriteError {
  ok: false
  error: string
}
