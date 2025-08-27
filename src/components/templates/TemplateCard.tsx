import type { Profile } from '../../types/portfolio'

export function TemplateCard({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-extrabold">{profile.name}</h1>
        {profile.title && <p className="mt-1 text-blue-100">{profile.title}</p>}
      </div>

      {profile.summary && (
        <div className="rounded-xl border p-5">
          <h2 className="text-lg font-semibold">Summary</h2>
          <p className="mt-2 text-gray-700">{profile.summary}</p>
        </div>
      )}

      {profile.experience && profile.experience.length > 0 && (
        <div className="rounded-xl border p-5">
          <h2 className="text-lg font-semibold">Experience</h2>
          <ul className="mt-2 space-y-2 text-gray-700">
            {profile.experience.map((e, i) => (
              <li key={i} className="rounded bg-gray-50 p-3">
                <div className="font-semibold">
                  {e.role} — {e.company}
                </div>
                {(e.start || e.end) && (
                  <div className="text-sm text-gray-500">
                    {e.start ?? '—'}–{e.end ?? 'present'}
                  </div>
                )}
                {e.bullets && e.bullets.length > 0 && (
                  <ul className="mt-1 list-disc pl-5">
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {profile.skills && profile.skills.length > 0 && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Skills:</span>{' '}
          {profile.skills.join(', ')}
        </div>
      )}
    </div>
  )
}
