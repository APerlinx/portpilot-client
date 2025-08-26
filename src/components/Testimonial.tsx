interface TestimonialProps {
  quote: string
  name: string
  role: string
}

const Testimonial = ({ quote, name, role }: TestimonialProps) => (
  <figure className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200">
    <blockquote className="text-gray-700">“{quote}”</blockquote>
    <figcaption className="mt-4 text-sm">
      <span className="font-semibold">{name}</span> —{' '}
      <span className="text-gray-500">{role}</span>
    </figcaption>
  </figure>
)

export default Testimonial
