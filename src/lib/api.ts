type Link = { label?: string; url: string }

type Project = {
  name: string
  description?: string
  tech?: string[]
  link?: string
}

type Experience = {
  company?: string
  role?: string
  start?: string
  end?: string
  bullets?: string[]
}

type Education = {
  school?: string
  degree?: string
  start?: string
  end?: string
  details?: string[]
}

type Certification = {
  name: string
  issuer?: string
  year?: string
  link?: string
}
type Publication = {
  title: string
  outlet?: string
  year?: string
  link?: string
}
type Award = { title: string; issuer?: string; year?: string }
type Language = { name: string; level?: string }

export type Profile = {
  name: string
  title?: string
  summary?: string
  contacts?: {
    email?: string
    phone?: string
    location?: string
    links?: Link[]
  }
  projects?: Project[]
  experience?: Experience[]
  education?: Education[]
  certifications?: Certification[]
  publications?: Publication[]
  awards?: Award[]
  languages?: Language[]
  skills?: string[]
  interests?: string[]
}

export async function previewSite(profile: Profile): Promise<string> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/preview-site`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile }),
  })
  if (!res.ok) throw new Error('Preview failed')
  return res.text()
}
