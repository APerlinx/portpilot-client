import type { Profile } from '../../types/portfolio'

export function TemplateMinimal({ profile }: { profile: Profile }) {
  return (
    <article className="prose max-w-none">
      <header>
        <h1 className="mb-1 text-3xl font-extrabold">{profile.name}</h1>
        {profile.title && <p className="text-gray-600">{profile.title}</p>}
      </header>

      {profile.summary && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="text-gray-700">{profile.summary}</p>
        </section>
      )}

      {profile.experience && profile.experience.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Experience</h2>
          <ul className="space-y-2">
            {profile.experience.map((exp, i) => (
              <li key={i}>
                <strong>{exp.role}</strong> at {exp.company}
                {(exp.start || exp.end) && (
                  <>
                    {' '}
                    ({exp.start ?? '—'}–{exp.end ?? 'present'})
                  </>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc pl-6">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {profile.skills && profile.skills.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Skills</h2>
          <p>{profile.skills.join(', ')}</p>
        </section>
      )}
    </article>
  )
}
