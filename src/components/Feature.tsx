interface FeatureProps {
  emoji: string
  title: string
  text: string
}

const Feature = ({ emoji, title, text }: FeatureProps) => (
  <div className="rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
    <div className="text-3xl">{emoji}</div>
    <h3 className="mt-3 text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{text}</p>
  </div>
)

export default Feature
