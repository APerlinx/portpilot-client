// src/types/portfolio.ts
export interface ContactLink {
  label?: string
  url: string
}
export interface Contacts {
  email?: string
  phone?: string
  location?: string
  links?: ContactLink[]
}
export interface Project {
  name: string
  description?: string
  tech?: string[]
  link?: string
}
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
  contacts?: Contacts
  projects?: Project[]
  experience?: ExperienceItem[]
  skills?: string[]
}

/** Upload */
export interface UploadSuccess {
  ok: true
  text: string
  links?: string[]
}
export interface UploadError {
  ok: false
  error: string
}
export type UploadResponse = UploadSuccess | UploadError

/** Parse */
export interface ParseSuccess {
  ok: true
  parsed: Profile | string
}
export interface ParseError {
  ok: false
  error: string
  issues?: unknown
}
export type ParseResponse = ParseSuccess | ParseError
