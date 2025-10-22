interface FeatureProps {
  emoji: string
  title: string
  text: string
  variant?: 'primary' | 'third' | 'fourth'
}

const VARIANT_CLASSES: Record<
  string,
  { bg: string; text: string; ring?: string }
> = {
  primary: {
    bg: 'bg-primary/95',
    text: 'text-white',
    ring: 'ring-1 ring-primary/30',
  },
  third: {
    bg: 'bg-third/95',
    text: 'text-white',
    ring: 'ring-1 ring-third/25',
  },
  fourth: {
    bg: 'bg-fourth/95',
    text: 'text-white',
    ring: 'ring-1 ring-fourth/25',
  },
}

const Feature = ({ emoji, title, text, variant = 'primary' }: FeatureProps) => {
  const cls = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary
  return (
    <div
      className={`rounded-2xl p-6 shadow-sm transition hover:shadow-md ${cls.bg} ${cls.ring} overflow-hidden`}
    >
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${cls.text} bg-white/10`}
      >
        {emoji}
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-tight text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-white/90">{text}</p>
    </div>
  )
}

export default Feature
