import wave from '../assets/wave-haikei.svg'
import sideImage from '../assets/hero-image.svg'
import Feature from './Feature'
import Step from './Step'
import Testimonial from './Testimonial'

const LandingPage = () => {
  return (
    <main className="text-gray-900 antialiased">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0066FF]">
        <div className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-24 md:min-h-[100vh] md:grid-cols-2">
          {/* Left */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Turn your resume into a{' '}
              <span className="text-black">Live Portfolio</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/90 md:mx-0">
              Upload your CV and let PortPilot analyze, rewrite, and build a
              modern website version of your professional story — automatically.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:justify-start">
              <a
                href="#cta"
                className="inline-flex items-center justify-center rounded-lg bg-black px-7 py-3 text-white shadow-lg transition hover:bg-gray-800"
              >
                Generate My Site
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-lg bg-white/10 px-7 py-3 text-white ring-1 ring-white/30 transition hover:bg-white/20"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center">
            <img
              src={sideImage}
              alt="PortPilot generated portfolio preview"
              className="h-auto w-[520px] max-w-full drop-shadow-xl"
              loading="eager"
            />
          </div>
        </div>

        {/* Wave divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full translate-y-1">
          <img
            src={wave}
            alt=""
            className="block h-32 w-full select-none object-cover md:h-40"
          />
        </div>
      </section>

      {/* TRUST / LOGOS */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-center text-sm uppercase tracking-widest text-gray-500">
            Portfolios that feel professional
          </p>
          <div className="grid grid-cols-2 items-center justify-items-center gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">Features</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              emoji="📄"
              title="Smart CV Parsing"
              text="Upload PDF, DOCX or LinkedIn export — we extract roles, dates, skills, and achievements."
            />
            <Feature
              emoji="🎨"
              title="Beautiful Templates"
              text="Clean, responsive themes with smart typography and spacing out of the box."
            />
            <Feature
              emoji="🚀"
              title="Instant Publishing"
              text="Preview instantly, then deploy to a custom URL — no code needed."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">How it works</h2>
          <ol className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            <Step num={1} title="Upload">
              Drag & drop your resume (PDF/DOCX). We parse structure & content.
            </Step>
            <Step num={2} title="Polish">
              Pick a template. PortPilot rewrites blurbs for web readability.
            </Step>
            <Step num={3} title="Publish">
              Preview live, tweak details, then deploy to your URL.
            </Step>
          </ol>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">
            Loved by candidates
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Testimonial
              quote="Went from PDF to a polished site in minutes — got 2 interviews the same week."
              name="Maya K."
              role="Frontend Developer"
            />
            <Testimonial
              quote="The copy rewrite made my experience sound clear and impactful."
              name="Daniel P."
              role="Data Analyst"
            />
            <Testimonial
              quote="Publishing to a custom URL was one click. Clean, fast, professional."
              name="Avi S."
              role="Product Designer"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="bg-gray-50 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold">Ready to stand out?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Turn your static resume into a modern, mobile-friendly portfolio in
            minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-[#0066FF] px-8 py-4 font-semibold text-white shadow-lg transition hover:brightness-95"
            >
              Upload CV & Generate
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-gray-900 ring-1 ring-gray-300 transition hover:bg-gray-50"
            >
              Explore features
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
